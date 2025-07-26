// src/components/MoodSender.js
function MoodSender() {
  function sendMood() {
    fetch("http://localhost:5001/api/mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mood: "happy", timestamp: new Date() })
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error("Error:", err));
  }

  return (
    <div>
      <h2>Send Mood to Backend</h2>
      <button onClick={sendMood}>I'm Happy 😊</button>
    </div>
  );
}

export default MoodSender;
