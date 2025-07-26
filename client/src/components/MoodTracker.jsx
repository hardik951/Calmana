// src/components/MoodTracker.jsx
import React, { useState } from 'react';

export default function MoodTracker() {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const moods = ['😊 Happy', '😐 Neutral', '☹️ Sad', '😟 Anxious'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return;

    setLoading(true);
    setResponseMsg('');
    setSubmitted(false);

    try {
      const res = await fetch("http://localhost:5001/api/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood,
          notes,
          timestamp: new Date(),
        }),
      });

      const data = await res.json();
      setResponseMsg(data.message || "Mood sent successfully!");
      setSubmitted(true);
      setMood('');
      setNotes('');
    } catch (err) {
      console.error("Error:", err);
      setResponseMsg("Failed to send mood. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-green-800 mb-4">How are you feeling today?</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between">
          {moods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-full border ${
                mood === m ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700'
              } hover:bg-green-400 hover:text-white transition`}
            >
              {m}
            </button>
          ))}
        </div>
        <textarea
          className="w-full p-2 border rounded resize-none mb-4"
          placeholder="Additional notes (optional)"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          type="submit"
          disabled={!mood || loading}
          className={`w-full py-2 rounded bg-green-600 text-white font-semibold ${
            !mood || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
          } transition`}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
      {responseMsg && (
        <p className={`mt-4 font-medium ${submitted ? 'text-green-700' : 'text-red-600'}`}>
          {responseMsg} 🌿
        </p>
      )}
    </div>
  );
}

