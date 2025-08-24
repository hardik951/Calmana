import os
import requests
import datetime
from dotenv import load_dotenv

# ✅ Load API key from .env file
load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

if not TOGETHER_API_KEY:
    raise ValueError("❌ TOGETHER_API_KEY not found. Please add it to your .env file.")

# 🔹 System message (shared context for the model)
system_message = {
    "role": "system",
    "content": (
        "You are the MENTAL HEALTH diagnostic bot. Follow these rules STRICTLY:\n"
        "1. You MUST ask exactly one diagnostic question at a time.\n"
        "2. Each question MUST be numbered (1., 2., 3., etc.).\n"
        "3. Each question MUST have multiple-choice answers labeled A, B, C, D (and more if needed).\n"
        "4. DO NOT add filler words like 'Great!' or 'Excellent!'. Be concise.\n"
        "5. NEVER assume symptoms or experiences unless the user explicitly says so.\n"
        "6. You MUST ask at least 8 questions before giving any diagnosis.\n"
        "7. After completing all questions, output the final result with the exact format:\n"
        "   Final Diagnosis: <your diagnosis here>\n"
        "8. Do NOT ask follow-up questions after giving the Final Diagnosis.\n"
        "9. If the user types 'exit', stop immediately with a polite message (no diagnosis).\n"
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

    return response.json()["choices"][0]["message"]["content"].strip()


def save_final_diagnosis(diagnosis_text):
    # Save only the final diagnosis
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"{timestamp}_log.txt"
    with open(filename, "w", encoding="utf-8") as f:
        f.write("Final Diagnosis:\n")
        f.write(diagnosis_text)
    print(f"\n📝 Final diagnosis saved to {filename}\n")


def run_conversation():
    print("\n🧠 Welcome to the Mental Health Diagnostic Bot\n")
    print("Type 'exit' anytime to quit.\n")

    # 🔹 Start conversation with a seed message so API input is never empty
    conversation = [{"role": "user", "content": "Please begin the first diagnostic question."}]

    # First LLM response
    response = get_llm_response(conversation)
    print(f"\n🤖 {response}\n")
    conversation.append({"role": "assistant", "content": response})

    while True:
        user_input = input("Your answer (A/B/C/D or exit): ").strip()

        if user_input.lower() == "exit":
            print("👋 Ending the diagnostic session. Take care!")
            break

        # Append user input
        conversation.append({"role": "user", "content": user_input})

        # Get bot response
        response = get_llm_response(conversation)

        # Guardrail: prevent bot from echoing "Your answer" stuff
        if "Your answer" in response:
            response = response.split("Your answer")[0].strip()

        print(f"\n🤖 {response}\n")
        conversation.append({"role": "assistant", "content": response})

        # End when diagnosis is given
        if "Final Diagnosis:" in response:
            save_final_diagnosis(response)
            break


def main():
    while True:
        run_conversation()
        again = input("Would you like to start a new session? (yes/no): ").strip().lower()
        if again not in ['yes', 'y']:
            print("\n👋 Goodbye! Take care!\n")
            break


if __name__ == "__main__":
    main()
