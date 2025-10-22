from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import base64
import numpy as np
from deepface import DeepFace
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_NAME = "emotions.db"

# ───────────────────────────────────────────
# SQLite Setup
# ───────────────────────────────────────────
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

latest_emotion = {"emotion": "Unknown", "confidence": 0.0, "timestamp": None}

# Warmup DeepFace model once
print("⏳ Loading DeepFace model...")
_ = DeepFace.analyze(np.zeros((100, 100, 3), dtype=np.uint8), actions=["emotion"], enforce_detection=False)
print("✅ DeepFace model loaded.")


# ───────────────────────────────────────────
# Analyze Frame
# ───────────────────────────────────────────
@app.route("/analyze_frame", methods=["POST"])
def analyze_frame():
    global latest_emotion
    try:
        data = request.json.get("image")
        if not data:
            return jsonify({"error": "No image data"}), 400

        # Decode base64 image
        img_data = base64.b64decode(data.split(",")[1])
        np_arr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        if isinstance(result, list):
            result = result[0]

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
            "confidence": float(confidence),
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

        return jsonify(latest_emotion)

    except Exception as e:
        print("⚠️ Emotion detection error:", str(e))
        return jsonify({"error": str(e), "emotion": "Unknown", "confidence": 0.0}), 500


# ───────────────────────────────────────────
# Get Latest Emotion
# ───────────────────────────────────────────
@app.route("/get_latest_emotion", methods=["GET"])
def get_latest_emotion():
    return jsonify(latest_emotion)


# ───────────────────────────────────────────
# Get All Emotions (last 20)
# ───────────────────────────────────────────
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
