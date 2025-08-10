# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

# Initialize OpenAI client (using OpenRouter endpoint)
client = openai.OpenAI(
    api_key="",
    base_url="https://openrouter.ai/api/v1"
)

app = Flask(__name__)
CORS(app)

# Rule-based emotion detector
def detect_emotion(text):
    text = text.lower()
    emotion_keywords = {
        "happy": ["happy", "joy", "excited", "glad", "cheerful"],
        "sad": ["sad", "down", "depressed", "unhappy", "lonely"],
        "angry": ["angry", "mad", "furious", "annoyed", "irritated"],
        "anxious": ["anxious", "worried", "nervous", "tense", "scared"],
        "neutral": []
    }

    for emotion, keywords in emotion_keywords.items():
        if any(word in text for word in keywords):
            return emotion
    return "neutral"

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')

        # Emotion detection
        emotion = detect_emotion(user_message)

        # AI Response using OpenAI SDK >=1.0.0 with OpenRouter
        response = client.chat.completions.create(
            model="openai/gpt-3.5-turbo",  # Adjust model if needed
            messages=[
                {"role": "system", "content": "You are Calmna, a kind and supportive mental health assistant."},
                {"role": "user", "content": user_message}
            ]
        )

        reply = response.choices[0].message.content.strip()

        return jsonify({
            "reply": reply,
            "emotion": emotion
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
