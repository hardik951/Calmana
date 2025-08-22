import requests
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# ✅ Load environment variables
load_dotenv()

# 🔑 Secure Together API key
TOGETHER_API_KEY = os.getenv("")

# 🧠 Conversation store (per user in API mode, global in CLI mode)
user_conversations = {}

# ✅ Shared function to generate questions
def generate_question(conversation_history):
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    system_message = {
        "role": "system",
        "content": (
            "You are a mental health assistant. "
            "Ask one diagnostic question at a time. Each question must have a clear question prompt, "
            "and should lead forward with the previous question. "
            "Followed by appropriate multiple-choice options labeled A), B), and C). "
            "Do NOT output only options without a question. "
            "Wait for the user to answer exactly one option (A, B, or C) or the number (1, 2, or 3). "
            "Based on the user's exact choice, ask the next relevant question. "
            "Never guess or skip ahead without user input."
        )
    }

    payload = {
        "model": "mistralai/Mistral-7B-Instruct-v0.1",
        "messages": [
            system_message,
            {"role": "user", "content": "\n".join(conversation_history)}
        ],
        "max_tokens": 300,
        "temperature": 0.7
    }

    response = requests.post(
        "https://api.together.xyz/v1/chat/completions",
        headers=headers,
        json=payload
    )

    if response.status_code != 200:
        raise Exception(f"⚠️ API Error {response.status_code}: {response.text}")

    return response.json()["choices"][0]["message"]["content"].strip()


# ==============================
# 🌐 FastAPI Backend for React
# ==============================
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(request: Request):
    """Frontend sends { user_id, message }, backend keeps memory per user."""
    data = await request.json()
    user_id = data.get("user_id")
    user_message = data.get("message", "").strip()

    if not user_id:
        return {"error": "Missing user_id"}

    if user_id not in user_conversations:
        user_conversations[user_id] = []

    # Add user input
    if user_message:
        user_conversations[user_id].append(user_message)

    # Generate bot reply
    try:
        reply = generate_question(user_conversations[user_id])
    except Exception as e:
        return {"error": str(e)}

    user_conversations[user_id].append(reply)

    return {"reply": reply}


# ==============================
# 🖥 CLI Interactive Mode
# ==============================
def run_conversation():
    conversation = []
    print("\n🧠 Welcome to the Mental Health Diagnostic Bot\n")
    print("Type 'exit' anytime to quit.\n")

    for _ in range(10):
        try:
            question = generate_question(conversation)
        except Exception as e:
            print("❌ Error:", e)
            return

        print("\n🤖", question)
        user_input = input("Your answer (A/B/C or 1/2/3, or 'exit'): ").strip()
        if user_input.lower() == "exit":
            print("\n👋 Thank you for chatting. Take care!\n")
            return

        conversation.append(question)
        conversation.append(user_input)

    print("\n🧠 Thank you for using the Mental Health Diagnostic Bot. Take care!\n")


def main():
    while True:
        run_conversation()
        again = input("Start a new session? (yes/no): ").strip().lower()
        if again not in ["yes", "y"]:
            print("\n👋 Goodbye! Take care!\n")
            break


# ==============================
# 🚀 Entry Point
# ==============================
if __name__ == "__main__":
    # Run in CLI mode
    main()
