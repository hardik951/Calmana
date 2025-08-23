# backend/app.py

from flask import Flask, request, jsonify, send_file, after_this_request
from flask_cors import CORS
import os, requests, re
from datetime import datetime
from dotenv import load_dotenv
import pyttsx3
import tempfile

# ──────────────────────────────────────────────────────────────────────────────
# Setup
# ──────────────────────────────────────────────────────────────────────────────
load_dotenv()
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")  # keep this only on the server!

if not MISTRAL_API_KEY:
    raise RuntimeError("MISTRAL_API_KEY not found. Create backend/.env with MISTRAL_API_KEY=...")

app = Flask(__name__)
CORS(app)

# In-memory store: { session_id: {"history": [...], "mood_counts": {...}} }
MEMORY = {}
MAX_TURNS = 16  # keep last N turns for context to avoid long payloads

# ──────────────────────────────────────────────────────────────────────────────
# Emotion detection (rule-based) + crisis detection
# ──────────────────────────────────────────────────────────────────────────────
EMOTION_KEYWORDS = {
    "happy":   ["happy", "joy", "excited", "glad", "cheerful", "grateful", "content"],
    "sad":     ["sad", "down", "depressed", "unhappy", "lonely", "tearful", "hopeless"],
    "angry":   ["angry", "mad", "furious", "annoyed", "irritated", "rage", "pissed"],
    "anxious": ["anxious", "worried", "nervous", "tense", "panic", "stressed", "overwhelmed"],
    "neutral": []
}

CRISIS_PATTERNS = [
    r"\bkill myself\b", r"\bsuicide\b", r"\bsuicidal\b", r"\bend it all\b", r"\bself[-\s]?harm\b",
    r"\bcutting\b", r"\bI don’t want to live\b", r"\bI don't want to live\b", r"\bI want to die\b"
]

CRISIS_RESPONSE = (
    "I'm really sorry you're feeling this way, and I'm glad you told me. "
    "You deserve immediate, real support. If you're in danger or planning to harm yourself, "
    "please contact your local emergency number now.\n\n"
    "You can also reach out to:\n"
    "• India: AASRA 24x7: 9820466726\n"
    "• India: Tele MANAS: 14416 or 1-800-891-4416\n"
    "• International: Find resources at the nearest crisis hotline in your country.\n\n"
    "If you can, tell a trusted person nearby how you’re feeling. I’m here to listen, "
    "but a trained professional can offer immediate help."
)

def detect_emotion(text: str) -> str:
    t = text.lower()
    for emotion, words in EMOTION_KEYWORDS.items():
        if any(w in t for w in words):
            return emotion
    return "neutral"

def is_crisis(text: str) -> bool:
    t = text.lower()
    return any(re.search(pat, t) for pat in CRISIS_PATTERNS)

# ──────────────────────────────────────────────────────────────────────────────
# Memory helpers
# ──────────────────────────────────────────────────────────────────────────────
def get_session(session_id: str):
    if session_id not in MEMORY:
        MEMORY[session_id] = {
            "history": [],                     # list of {"role": "user"/"assistant", "content": "...", "ts": ISO}
            "mood_counts": {"happy":0, "sad":0, "angry":0, "anxious":0, "neutral":0}
        }
    return MEMORY[session_id]

def append_history(session_id: str, role: str, content: str):
    sess = get_session(session_id)
    sess["history"].append({
        "role": role,
        "content": content,
        "ts": datetime.utcnow().isoformat()
    })
    # Trim to last MAX_TURNS*2 (user+assistant per turn)
    if len(sess["history"]) > MAX_TURNS * 2:
        sess["history"] = sess["history"][-MAX_TURNS*2:]

def increment_mood(session_id: str, mood: str):
    sess = get_session(session_id)
    if mood not in sess["mood_counts"]:
        sess["mood_counts"][mood] = 0
    sess["mood_counts"][mood] += 1

def build_messages(session_id: str, user_message: str):
    """
    Build a Mistral-compatible message list with system prompt + short-term memory.
    """
    persona = (
        "You are Calmana, a compassionate, trauma-informed mental health assistant.\n"
        "Speak clear, supportive English only. Use short paragraphs and 1–2 gentle questions.\n"
        "Do NOT provide medical/legal diagnoses. Encourage professional help when appropriate.\n"
        "If the user asks for non-mental-health topics, gently redirect back to well-being.\n"
        "Always validate feelings before giving suggestions. Avoid clichés; be specific and warm. Try to give back responses under 60 words."
    )

    # Pull short-term memory
    sess = get_session(session_id)
    recent_history = [{"role": h["role"], "content": h["content"]} for h in sess["history"][-MAX_TURNS*2:]]

    messages = [{"role": "system", "content": persona}]
    messages.extend(recent_history)
    messages.append({"role": "user", "content": user_message})

    return messages

# ──────────────────────────────────────────────────────────────────────────────
# Mistral call
# ──────────────────────────────────────────────────────────────────────────────
def call_mistral(messages, temperature=0.7, model="mistral-tiny"):
    url = "https://api.mistral.ai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": model,               # "mistral-tiny" is fast & cheap. You can switch to "mistral-small"/"mistral-large". 
        "messages": messages,
        "temperature": temperature
    }
    resp = requests.post(url, headers=headers, json=payload, timeout=45)
    if resp.status_code != 200:
        raise RuntimeError(f"Mistral API error {resp.status_code}: {resp.text}")
    data = resp.json()
    return data["choices"][0]["message"]["content"].strip()

# ──────────────────────────────────────────────────────────────────────────────
# Routes (chat/history/moods/reset/root) - unchanged
# ──────────────────────────────────────────────────────────────────────────────
@app.route("/chat", methods=["POST"])
def chat():
    try:
        body = request.get_json(force=True) or {}
        user_message = (body.get("message") or "").strip()
        session_id = (body.get("session_id") or "default-session").strip()

        if not user_message:
            return jsonify({"error": "Missing 'message'"}), 400

        # Crisis check (respond immediately without calling the model)
        if is_crisis(user_message):
            emotion = "sad"
            increment_mood(session_id, emotion)
            append_history(session_id, "user", user_message)
            append_history(session_id, "assistant", CRISIS_RESPONSE)
            return jsonify({"reply": CRISIS_RESPONSE, "emotion": emotion})

        # Emotion detection
        emotion = detect_emotion(user_message)
        increment_mood(session_id, emotion)

        # Build messages with memory
        append_history(session_id, "user", user_message)
        messages = build_messages(session_id, user_message)

        # Call Mistral
        try:
            reply = call_mistral(messages)
        except Exception as api_err:
            # Fallback if Mistral fails
            reply = (
                "Thanks for sharing that. I'm having trouble connecting right now, "
                "but I’m here to support you. You might try a brief grounding exercise: "
                "look around and name 5 things you can see, 4 you can feel, 3 you can hear, "
                "2 you can smell, and 1 you can taste. Would you like to continue talking?"
            )

        append_history(session_id, "assistant", reply)

        return jsonify({"reply": reply, "emotion": emotion})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/history", methods=["GET"])
def history():
    session_id = (request.args.get("session_id") or "default-session").strip()
    sess = get_session(session_id)
    return jsonify({
        "session_id": session_id,
        "turns": sess["history"]
    })


@app.route("/moods", methods=["GET"])
def moods():
    session_id = (request.args.get("session_id") or "default-session").strip()
    sess = get_session(session_id)
    return jsonify(sess["mood_counts"])


@app.route("/reset", methods=["POST"])
def reset():
    body = request.get_json(force=True) or {}
    session_id = (body.get("session_id") or "default-session").strip()
    MEMORY[session_id] = {
        "history": [],
        "mood_counts": {"happy":0, "sad":0, "angry":0, "anxious":0, "neutral":0}
    }
    return jsonify({"ok": True, "session_id": session_id})


@app.route("/", methods=["GET"])
def root():
    return jsonify({"ok": True, "service": "Calmana Agent API", "endpoints": ["/chat", "/history", "/moods", "/reset"]})

# ──────────────────────────────────────────────────────────────────────────────
# /speak route (pyttsx3) - moved above app.run so route is registered.
# It writes a temp WAV, sends it, and deletes the file after sending.
# ──────────────────────────────────────────────────────────────────────────────
@app.route("/speak", methods=["POST"])
def speak():
    """
    Body: { "text": "hello there", "gender": "male"|"female" }
    Returns: WAV audio file
    """
    try:
        body = request.get_json(force=True) or {}
        text = (body.get("text") or "").strip()
        gender = body.get("gender", "female").lower()

        if not text:
            return jsonify({"error": "Missing 'text'"}), 400

        engine = pyttsx3.init()
        voices = engine.getProperty("voices")

        # Pick voice by gender if available
        if gender == "male":
            for v in voices:
                if "male" in v.name.lower():
                    engine.setProperty("voice", v.id)
                    break
        else:  # default female if found
            for v in voices:
                if "female" in v.name.lower():
                    engine.setProperty("voice", v.id)
                    break

        tmpfile = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        tmp_path = tmpfile.name
        tmpfile.close()

        engine.save_to_file(text, tmp_path)
        engine.runAndWait()

        @after_this_request
        def cleanup(response):
            try:
                os.remove(tmp_path)
            except Exception:
                pass
            return response

        return send_file(tmp_path, mimetype="audio/wav", as_attachment=False)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Bind to all interfaces so mobile/same-network tests work; keep port 5000 to match your React calls
    app.run(host="0.0.0.0", port=5000, debug=True)
