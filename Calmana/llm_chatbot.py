import requests

# 🔐 Paste your Together.ai API key here
TOGETHER_API_KEY = "key here"

def generate_question(conversation_history):
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    system_message = {
        "role": "system",
        "content": (
            "You are a mental health assistant. "
            "Ask one diagnostic question at a time. Each question must have a clear question prompt,and should lead forward with the previous question. "
            "followed by appropriate amount of multiple-choice options labeled A), B), and C)and so on. "
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

    response = requests.post("https://api.together.xyz/v1/chat/completions", headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"API error {response.status_code}: {response.text}")

    return response.json()["choices"][0]["message"]["content"].strip()

def run_conversation():
    conversation = []  # fresh conversation every run
    print("\n🧠 Welcome to the Mental Health Diagnostic Bot\n")
    print("Type 'exit' anytime to quit the conversation.\n")

    for _ in range(10):  # max 10 questions for depth
        prompt = "\n".join(conversation)
        try:
            question = generate_question(prompt)
        except Exception as e:
            print("❌ Error:", e)
            return

        if not question.strip():
            print("🤖 Sorry, I didn't receive a question. Let's try again.")
            continue

        print("\n🤖", question)
        user_input = input("Your answer (choose A/B/C or 1/2/3, or type freely, or type 'exit' to quit): ").strip()
        if user_input.lower() == 'exit':
            print("\n👋 Thank you for chatting. Take care!\n")
            return  # ends conversation, clears history

        # Append bot question and user input to conversation as raw strings (no added "Q:" or "A:")
        conversation.append(question)
        conversation.append(user_input)

    print("\n🧠 Thank you for using the Mental Health Diagnostic Bot. Take care!\n")

def main():
    while True:
        run_conversation()
        again = input("Would you like to start a new session? (yes/no): ").strip().lower()
        if again not in ['yes', 'y']:
            print("\n👋 Goodbye! Take care!\n")
            break

if __name__ == "__main__":
    main()
