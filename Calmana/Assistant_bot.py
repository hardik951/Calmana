import os
import json
import requests
from datetime import datetime
from dotenv import load_dotenv
import re

# --- Load API Key from .env ---
load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
if not TOGETHER_API_KEY:
    raise ValueError("Error: TOGETHER_API_KEY not found in .env file.")

# --- Example mental health schedule ---
schedule = [
    {"time": "10:00 AM", "patient": "Riya Sharma", "issue": "Anxiety follow-up"},
    {"time": "11:30 AM", "patient": "Amit Verma", "issue": "Depression therapy"},
    {"time": "2:00 PM", "patient": "Neha Patel", "issue": "Panic attack consultation"}
]

new_request = {"patient": "Arjun Singh", "issue": "Severe insomnia", "time": "4:00 PM"}

# --- LLM Helper ---
def ask_llm(user_input):
    prompt = f"""
You are a smart assistant for a mental health doctor.
Extract the doctor's intent from their command. Return ONLY valid JSON.
Possible actions: accept, decline, reschedule, free, add, remove.

Input: "{user_input}"

Respond in this format:
{{
  "action": "accept/decline/reschedule/free/add/remove",
  "patient": "name if applicable",
  "time": "time if applicable",
  "issue": "mental health issue if applicable",
  "start": "start time if freeing block",
  "end": "end time if freeing block",
  "raw_input": "{user_input}"
}}
If information is missing, leave fields as null.
"""
    response = requests.post(
        "https://api.together.xyz/v1/chat/completions",
        headers={"Authorization": f"Bearer {TOGETHER_API_KEY}"},
        json={
            "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0,
        }
    )
    data = response.json()
    content = data["choices"][0]["message"]["content"].strip()
    try:
        return json.loads(content)
    except:
        return {"action": "unknown", "raw_input": user_input}

# --- Schedule Update Logic ---
def update_schedule(action_data):
    global schedule, new_request
    action = action_data.get("action")
    user_text = action_data.get("raw_input") or ""

    if action == "accept" and new_request:
        schedule.append(new_request)
        print(f"✅ Accepted {new_request['patient']}'s request for {new_request['issue']} at {new_request['time']}")
        new_request = None

    elif action == "decline" and new_request:
        print(f"❌ Declined {new_request['patient']}'s request for {new_request['issue']} at {new_request['time']}")
        new_request = None

    elif action == "reschedule":
        patient = action_data.get("patient")
        time = action_data.get("time")
        for appt in schedule:
            if patient and patient.lower() in appt["patient"].lower():
                old_time = appt["time"]
                appt["time"] = time
                print(f"🔄 Rescheduled {appt['patient']} from {old_time} to {time}")

    elif action == "free":
        # Try to detect time ranges using regex
        time_matches = re.findall(r'(\d{1,2}(:\d{2})?\s*(am|pm)?)', user_text, re.IGNORECASE)
        if len(time_matches) >= 2:
            start_raw = time_matches[0][0]
            end_raw = time_matches[1][0]

            def normalize_time(t):
                t = t.strip().lower().replace(" ", "")
                hour, minute = (0, 0)
                meridian = "AM"
                if "am" in t or "pm" in t:
                    meridian = t[-2:].upper()
                    t_num = t[:-2]
                else:
                    t_num = t
                if ":" in t_num:
                    hour, minute = map(int, t_num.split(":"))
                else:
                    hour = int(t_num)
                return f"{hour}:{minute:02d} {meridian}"

            try:
                start_dt = datetime.strptime(normalize_time(start_raw), "%I:%M %p")
                end_dt = datetime.strptime(normalize_time(end_raw), "%I:%M %p")
            except:
                print("⚠️ Could not parse the times.")
                start_dt, end_dt = None, None
        else:
            print("⚠️ Could not detect a time range. Please specify start and end times.")
            start_dt, end_dt = None, None

        if start_dt and end_dt:
            removed_appts = []
            new_schedule = []
            for appt in schedule:
                appt_time = datetime.strptime(appt["time"], "%I:%M %p")
                if start_dt <= appt_time <= end_dt:
                    removed_appts.append(appt)
                else:
                    new_schedule.append(appt)
            schedule[:] = new_schedule

            if removed_appts:
                print(f"🗓️ Freed up schedule from {normalize_time(start_raw)} to {normalize_time(end_raw)}")
                print("⚠️ The following appointments were removed:")
                for r in removed_appts:
                    print(f"- {r['time']} | {r['patient']} | {r['issue']}")
            else:
                print("✅ No appointments were affected in this block.")

    elif action == "add":
        patient = action_data.get("patient")
        time = action_data.get("time")
        issue = action_data.get("issue")
        if patient and time and issue:
            schedule.append({"time": time, "patient": patient, "issue": issue})
            print(f"➕ Added new appointment: {patient} | {issue} at {time}")

    elif action == "remove":
        patient = action_data.get("patient")
        if patient:
            schedule = [appt for appt in schedule if patient.lower() not in appt["patient"].lower()]
            print(f"🗑️ Removed appointment for {patient}")

    else:
        print("⚠️ Sorry, I didn’t understand that command.")

# --- Run Conversation ---
def run_bot():
    print("🧠 Mental Health Doctor's Assistant Bot\n")
    print(f"Doctor, here is your mental health schedule for {datetime.today().date()}:\n")
    for appt in schedule:
        print(f"- {appt['time']} | {appt['patient']} | {appt['issue']}")
    if new_request:
        print(f"\n⚠️ New appointment request received:\n- {new_request['patient']} | {new_request['issue']} | Requested: {new_request['time']}")

    while True:
        user_input = input("\nDoctor, what would you like to do? (type 'exit' to quit)\n> ")
        if user_input.lower() == "exit":
            break

        action_data = ask_llm(user_input)
        update_schedule(action_data)

        print("\n📅 Updated Schedule:")
        for appt in schedule:
            print(f"- {appt['time']} | {appt['patient']} | {appt['issue']}")

run_bot()
