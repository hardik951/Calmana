from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

# ✅ Load environment variables from .env file
load_dotenv()

app = FastAPI()

# ✅ Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # change to your React URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔑 Secure Together API key (loaded from .env)
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

def generate_question(conversation_history: str):
    """Send conversation history to Together API and get next AI reply."""
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
            "Followed by appropriate amount of multiple-choice options labeled A), B), and C) and so on. "
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
            {"role": "user", "content": conversation_history}
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
        return f"⚠️ API Error {response.status_code}: {response.text}"

    return response.json()["choices"][0]["message"]["content"].strip()

@app.post("/chat")
async def chat(request: Request):
    """Endpoint React will call with conversation history."""
    data = await request.json()
    conversation = data.get("conversation", "")
    reply = generate_question(conversation)
    return {"reply": reply}
