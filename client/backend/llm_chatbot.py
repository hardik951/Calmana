import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load the API key
load_dotenv()
TOGETHER_API_KEY = os.environ.get("TOGETHER_API_KEY")

if not TOGETHER_API_KEY:
    raise ValueError("Error: TOGETHER_API_KEY not found in environment variables.")

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React dev server

# Keep your function as is
def get_supportive_response(conversation_history, diagnosed_issue, user_message):
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    system_prompt = (
    "You are a compassionate mental health support companion. "
    "Your purpose is to listen with empathy and gently support users "
    "who are experiencing emotional or mental health struggles. "
    "Never provide recipes, technical instructions, or unrelated advice. "
    "If the user asks for unrelated content, kindly acknowledge once, then redirect back to their feelings. "
    "Keep responses short (2–4 sentences), varied in wording, and avoid repeating the same advice. "
    "If the user says 'stop' or asks to end, respect their boundary and respond briefly with kindness. "
    "Provide reassurance and coping suggestions only when relevant. "
    "Include the professional disclaimer only once at the start of the chat."
    )

    user_prompt = (
        f"The user has been diagnosed with: {diagnosed_issue}.\n"
        f"User says: \"{user_message}\"\n"
        "Provide a thoughtful, empathetic response to help them explore how they're feeling."
    )

    payload = {
        "model": "mistralai/Mistral-7B-Instruct-v0.1",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "\n\n".join(conversation_history) + "\n\n" + user_prompt}
        ],
        "max_tokens": 300,       # allow a bit longer responses
        "temperature": 0.6,      # reduce randomness to avoid rambling
        "top_p": 0.9             # add nucleus sampling for variety
    }

    response = requests.post("https://api.together.xyz/v1/chat/completions", headers=headers, json=payload)
    if response.status_code != 200:
        raise Exception(f"API error {response.status_code}: {response.text}")

    return response.json()["choices"][0]["message"]["content"].strip()


# New Flask route to handle React chat
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        conversation_history = data.get("conversation", "").split("\n")
        diagnosed_issue = data.get("diagnosed_issue", "generalized anxiety")
        user_message = conversation_history[-1] if conversation_history else ""
        reply = get_supportive_response(conversation_history, diagnosed_issue, user_message)
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
def compassionate_followup_chat(diagnosed_issue):
    """
    Runs an interactive supportive chat with the user after diagnosis.
    """
    print(f"\n—I understand you've received a diagnosis related to: {diagnosed_issue}.\n")
    print("I'm here if you'd like to talk about how you're feeling or what’s on your mind.")
    print("(Type 'exit' at any time to stop.)\n")
    print("⚠️ Note: I'm not a licensed mental health professional. "
          "If you're struggling, please consider reaching out to a trusted friend, family member, "
          "or mental health professional.\n")

    conversation_history = []
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == "exit":
            print("\nTake care of yourself—and remember, reaching out to a trusted friend or professional can be a strong next step.\n")
            break

        conversation_history.append(f"You: {user_input}")
        try:
            reply = get_supportive_response(conversation_history, diagnosed_issue, user_input)
        except Exception as e:
            print(f"Error generating response: {e}")
            break

        conversation_history.append(f"Bot: {reply}")
        print(f"\nBot: {reply}\n")

if __name__ == "__main__":
    # Example usage:
    # compassionate_followup_chat("generalized anxiety")
    diagnosed_issue = input("Enter the diagnosed issue to start follow-up chat: ").strip()
    compassionate_followup_chat(diagnosed_issue)
