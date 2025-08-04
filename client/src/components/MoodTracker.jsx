import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const moodMap = {
  '😊 Happy': 3,
  '😐 Neutral': 2,
  '☹️ Sad': 1,
  '😟 Anxious': 0,
};

export default function MoodTracker({ onMoodSubmit }) {
  const [moodHistory, setMoodHistory] = useState([]);
  const [detailedHistory, setDetailedHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const fetchMoodHistory = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      const res = await fetch(`http://localhost:5001/api/moods/${userId}`);
      const data = await res.json();

      const chartData = data.map((entry) => ({
        date: new Date(entry.timestamp).toLocaleDateString(),
        mood: moodMap[entry.mood],
      }));

      setMoodHistory(chartData);
      setDetailedHistory(data.reverse());
    } catch (err) {
      console.error('Error fetching mood history:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setSubmitStatus('User not logged in.');
      return;
    }

    if (!selectedMood) {
      setSubmitStatus('Please select a mood.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/moods/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: selectedMood, userId, notes: note }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error submitting mood');
      }

      setSubmitStatus('Mood submitted successfully!');
      setSelectedMood('');
      setNote('');
      onMoodSubmit && onMoodSubmit(); // Call parent updater
    } catch (err) {
      console.error(err);
      setSubmitStatus('Failed to submit mood.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-8">
      {/* Mood Submission */}
      <form onSubmit={handleMoodSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-green-800">How are you feeling today?</h2>

        <select
          className="w-full p-3 border border-emerald-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
          value={selectedMood}
          onChange={(e) => setSelectedMood(e.target.value)}
          required
        >
          <option value="">Select a mood</option>
          <option value="😊 Happy">😊 Happy</option>
          <option value="😐 Neutral">😐 Neutral</option>
          <option value="☹️ Sad">☹️ Sad</option>
          <option value="😟 Anxious">😟 Anxious</option>
        </select>

        <textarea
          className="w-full p-3 border border-emerald-300 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500"
          placeholder="Optional note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all"
        >
          Submit Mood
        </button>

        {submitStatus && (
          <p className="text-center text-sm text-emerald-700 mt-2">{submitStatus}</p>
        )}
      </form>

      {/* Mood Graph */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Mood Trend (Last 21 Days)</h4>
        {moodHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moodHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 3]} tickFormatter={(v) => Object.keys(moodMap).find(k => moodMap[k] === v)} />
              <Tooltip formatter={(value) => Object.keys(moodMap).find(k => moodMap[k] === value)} />
              <Line type="monotone" dataKey="mood" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-gray-500">No mood entries yet. Log your mood to get started!</p>
        )}
      </div>

      {/* Mood History */}
      {detailedHistory.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Mood Journal</h4>
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {detailedHistory.map((entry, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded">
                <div className="text-sm text-gray-700"><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</div>
                <div className="text-sm text-gray-700"><strong>Mood:</strong> {entry.mood}</div>
                {entry.notes && <div className="text-sm text-gray-700"><strong>Note:</strong> {entry.notes}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
