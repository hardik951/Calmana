import React, { useState } from 'react';

function MoodSender({ mood = 'happy' }) {
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  async function sendMood() {
    setLoading(true);
    setResponseMsg('');
    try {
      const res = await fetch('http://localhost:5001/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, timestamp: new Date() }),
      });
      const data = await res.json();
      setResponseMsg(data.message || 'Mood sent successfully!');
    } catch (err) {
      setResponseMsg('Failed to send mood. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-sm mx-auto">
      <h2 className="text-green-800 text-xl font-semibold mb-4">Send Mood to Backend</h2>
      <button
        onClick={sendMood}
        disabled={loading}
        className={`px-6 py-2 rounded bg-green-600 text-white font-semibold ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
        } transition`}
      >
        {loading ? 'Sending...' : `I'm ${mood} 😊`}
      </button>
      {responseMsg && <p className="mt-3 text-green-700">{responseMsg}</p>}
    </div>
  );
}

export default MoodSender;
