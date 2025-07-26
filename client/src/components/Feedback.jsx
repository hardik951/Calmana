// src/components/Feedback.jsx
import React, { useState } from 'react';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    // Later you can post this to backend
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-green-800 mb-4">Your Feedback</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded resize-none mb-4"
          rows={4}
          placeholder="Share your thoughts or suggestions..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button
          type="submit"
          disabled={!feedback.trim()}
          className={`w-full py-2 rounded bg-green-600 text-white font-semibold ${
            feedback.trim() ? 'hover:bg-green-700' : 'opacity-50 cursor-not-allowed'
          } transition`}
        >
          Submit Feedback
        </button>
      </form>
      {submitted && (
        <p className="mt-3 text-green-700 font-medium">Thank you for your valuable feedback! 🌿</p>
      )}
    </div>
  );
}
