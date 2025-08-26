from flask import Flask, jsonify
from flask_cors import CORS
import cv2
from deepface import DeepFace
import sqlite3
import threading
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ───────────────────────────────────────────
# SQLite Setup
# ───────────────────────────────────────────
DB_NAME = "emotions.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS emotions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            emotion TEXT NOT NULL,
            confidence REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# ───────────────────────────────────────────
# Background Thread for Emotion Detection
# ───────────────────────────────────────────
latest_emotion = {"emotion": None, "confidence": None, "timestamp": None}

def open_camera():
    """Try multiple backends until the camera opens successfully."""
    backends = [cv2.CAP_DSHOW, cv2.CAP_MSMF, cv2.CAP_VFW, cv2.CAP_ANY]
    for backend in backends:
        cap = cv2.VideoCapture(0, backend)
        if cap.isOpened():
            print(f"✅ Camera opened using backend {backend}")
            return cap
        cap.release()
    raise RuntimeError("❌ Could not open webcam. Check camera permissions or close other apps using it.")

def emotion_detection_loop():
    global latest_emotion

    while True:
        cap = open_camera()
        ret, frame = cap.read()
        cap.release()  # 🔑 release immediately so camera isn’t locked

        if not ret:
            time.sleep(2)
            continue

        try:
            result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
            if isinstance(result, list):
                result = result[0]  # deepface returns list sometimes

            dominant_emotion = result.get('dominant_emotion', "Unknown")
            confidence = result.get('emotion', {}).get(dominant_emotion, 0.0)

            # Store in SQLite
            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()
            cursor.execute("INSERT INTO emotions (emotion, confidence) VALUES (?, ?)",
                           (dominant_emotion, float(confidence)))
            conn.commit()
            conn.close()

            # Update latest_emotion
            latest_emotion = {
                "emotion": str(dominant_emotion),
                "confidence": float(confidence) if confidence else 0.0,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }

        except Exception as e:
            print("⚠️ Emotion detection error:", str(e))

        time.sleep(2)  # Detect every 2 seconds

# Start detection in background thread
threading.Thread(target=emotion_detection_loop, daemon=True).start()

# ───────────────────────────────────────────
# API Routes
# ───────────────────────────────────────────
@app.route("/get_latest_emotion", methods=["GET"])
def get_latest_emotion():
    if latest_emotion:
        emotion_value = latest_emotion.get("emotion") or "Unknown"
        confidence_value = latest_emotion.get("confidence") or 0.0

        safe_emotion = {
            "emotion": str(emotion_value),
            "confidence": float(confidence_value)
        }
        return jsonify(safe_emotion)
    else:
        return jsonify({"emotion": "Unknown", "confidence": 0.0})


@app.route("/get_all_emotions", methods=["GET"])
def get_all_emotions():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT emotion, confidence, timestamp FROM emotions ORDER BY id DESC LIMIT 20")
    rows = cursor.fetchall()
    conn.close()

    emotions = [{"emotion": r[0], "confidence": r[1], "timestamp": r[2]} for r in rows]
    return jsonify(emotions)

# ───────────────────────────────────────────
# Run Flask App
# ───────────────────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
