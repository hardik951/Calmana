import React, { useState } from "react";

function Avatar() {
  const [isTalking, setIsTalking] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => setIsTalking(true);
    utterance.onend = () => setIsTalking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <img
        src={isTalking ? "/talking.png" : "/idle.png"}
        alt="Calmana Avatar"
        style={{ width: "200px", transition: "transform 0.2s",
                 transform: isTalking ? "scale(1.05)" : "scale(1)" }}
      />
      <button
        onClick={() =>
          speak("Hello, I'm Calmana. How are you feeling today?")
        }
        style={{ marginTop: "10px", padding: "10px" }}
      >
        🎤 Talk
      </button>
    </div>
  );
}

export default Avatar;
