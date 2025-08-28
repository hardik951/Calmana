import os
import requests
import datetime
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# -------------------------
# Setup
# -------------------------
load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

if not TOGETHER_API_KEY:
    raise ValueError("❌ TOGETHER_API_KEY not found in environment variables.")

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React dev server

# -------------------------
# Diagnostic bot config
# -------------------------
system_message = {
    "role": "system",
    "content": (
        "You are the MENTAL HEALTH diagnostic bot. STRICTLY follow these rules:\n"
        "1. You ONLY ask mental health diagnostic questions. Do NOT answer unrelated questions.\n"
        "2. If the user asks anything unrelated (like cooking, math, general knowledge), respond with:\n"
        "   '❌ I can only assist with mental health assessments. Please answer the assessment questions.'\n"
        "3. Ask exactly one diagnostic question at a time.\n"
        "4. Each question MUST be numbered (1., 2., 3., etc.) and have multiple-choice answers labeled A, B, C, D.\n"
        "5. DO NOT add filler words. Be concise.\n"
        "6. NEVER assume symptoms or experiences unless the user explicitly says so.\n"
        "7. Ask at least 8 questions before giving any diagnosis.\n"
        "8. After all questions, output final result as: 'Final Diagnosis: <diagnosis>'\n"
        "9. If the user types 'exit', stop immediately politely (no diagnosis).\n"
    )
}


def get_llm_response(conversation):
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "mistralai/Mistral-7B-Instruct-v0.1",
        "messages": [system_message] + conversation,
        "max_tokens": 300,
        "temperature": 0.7
    }
    response = requests.post(
        "https://api.together.xyz/v1/chat/completions",
        headers=headers, json=payload
    )
    if response.status_code != 200:
        raise Exception(f"API error {response.status_code}: {response.text}")

    reply = response.json()["choices"][0]["message"]["content"].strip()

    # Guardrail: prevent echoing user input prompts
    if "Your answer" in reply:
        reply = reply.split("Your answer")[0].strip()

    return reply

def save_final_diagnosis(diagnosis_text):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"{timestamp}_diagnosis.txt"
    with open(filename, "w", encoding="utf-8") as f:
        f.write("Final Diagnosis:\n")
        f.write(diagnosis_text)
    return filename

# -------------------------
# Supportive chat config
# -------------------------
def get_supportive_response(conversation_history, diagnosed_issue, user_message):
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    system_prompt = (
        "You are a compassionate mental health support companion. "
        "Your purpose is to listen with empathy and gently support users "
        "who are experiencing emotional or mental health struggles. "
        "Keep responses short (2–4 sentences). Avoid repeating advice. "
        "Respect boundaries if the user asks to stop. "
        "⚠️ Note: You are not a licensed professional. "
    )

    user_prompt = (
        f"The user has been diagnosed with: {diagnosed_issue}.\n"
        f"User says: \"{user_message}\"\n"
        "Provide a supportive and empathetic response."
    )

    payload = {
        "model": "mistralai/Mistral-7B-Instruct-v0.1",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "\n\n".join(conversation_history) + "\n\n" + user_prompt}
        ],
        "max_tokens": 300,
        "temperature": 0.6,
        "top_p": 0.9
    }

    response = requests.post(
        "https://api.together.xyz/v1/chat/completions",
        headers=headers, json=payload
    )
    if response.status_code != 200:
        raise Exception(f"API error {response.status_code}: {response.text}")
    return response.json()["choices"][0]["message"]["content"].strip()

# -------------------------
# Flask Routes
# -------------------------

@app.route("/diagnosis", methods=["POST"])
def diagnosis():
    """
    Diagnostic Q&A flow
    """
    data = request.get_json()
    conversation = data.get("conversation", [])

    # Ensure conversation starts properly
    if not conversation:
        conversation = [{"role": "user", "content": "Please begin the first diagnostic question."}]

    response = get_llm_response(conversation)
    conversation.append({"role": "assistant", "content": response})

    # If Final Diagnosis is reached → save and return
    if "Final Diagnosis:" in response:
        filename = save_final_diagnosis(response)
        return jsonify({"reply": response, "done": True, "file": filename})

    return jsonify({"reply": response, "done": False, "conversation": conversation})


@app.route("/chat", methods=["POST"])
def chat():
    """
    Supportive conversation after diagnosis
    """
    data = request.get_json()
    conversation_history = data.get("conversation", [])
    diagnosed_issue = data.get("diagnosed_issue", "generalized anxiety")
    user_message = conversation_history[-1] if conversation_history else ""

    reply = get_supportive_response(conversation_history, diagnosed_issue, user_message)
    return jsonify({"reply": reply})


# -------------------------
# Run
# -------------------------
if __name__ == "__main__":
    app.run(port=8000, host="0.0.0.0", debug=True)
