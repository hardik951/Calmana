import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const moodMap = {
  '😊 Happy': 3,
  '😐 Neutral': 2,
  '☹️ Sad': 1,
  '😟 Anxious': 0,
};

export default function MoodTracker({ onMoodSubmit }) {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('');

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const fetchMoodHistory = async () => {
    try {
      const res = await fetch(`/api/moods/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.moods)) {
        setMoodHistory(
          data.moods.map(m => ({
            date: new Date(m.date).toLocaleDateString(),
            moodValue: moodMap[m.mood] ?? 0,
            moodLabel: m.mood,
          }))
        );
      } else {
        setMoodHistory([]);
      }
    } catch (err) {
      console.error('Error fetching mood history:', err);
      setMoodHistory([]);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchMoodHistory();
    }
  }, [userId, token]);

  const handleMoodSubmit = async () => {
    if (!selectedMood) {
      setSubmitStatus('Please select a mood.');
      return;
    }

    try {
      const res = await fetch('/api/moods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          mood: selectedMood,
          notes: note,
        }),
      });

      const data = await res.json();

      if (res.ok && data.mood) {
        setSubmitStatus('Mood submitted successfully!');
        setSelectedMood('');
        setNote('');
        fetchMoodHistory();
        if (onMoodSubmit) onMoodSubmit();
      } else {
        setSubmitStatus(data.message || 'Error submitting mood.');
      }
    } catch (err) {
      console.error('Error submitting mood:', err);
      setSubmitStatus('Server error. Try again.');
    }
  };

  return (
    <div className="mood-tracker max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200
      transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-700 tracking-wide">Mood Tracker</h2>

      {/* Mood Selection */}
      <div className="mood-options flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(moodMap).map(mood => (
          <button
            key={mood}
            type="button"
            onClick={() => setSelectedMood(mood)}
            className={`flex items-center justify-center px-5 py-2 rounded-full font-medium text-lg cursor-pointer
              border-2 transition-colors duration-300
              ${
                selectedMood === mood
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400'
              }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Mood Note */}
      <textarea
        placeholder="Add a note (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={4}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400
          transition-shadow duration-300 resize-none mb-6 text-gray-700 placeholder-gray-400"
      />

      {/* Submit Button */}
      <div className="text-center mb-6">
        <button
          type="button"
          onClick={handleMoodSubmit}
          className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold tracking-wide shadow-md
            hover:bg-emerald-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-400
            transition-colors duration-300"
        >
          Submit Mood
        </button>
      </div>
      {submitStatus && (
        <p className="text-center text-sm text-gray-600 mb-6 select-none">{submitStatus}</p>
      )}

      {/* Mood Chart */}
      <h3 className="text-xl font-semibold mb-4 text-center text-emerald-700 tracking-wide">Mood Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={moodHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
          <XAxis dataKey="date" tick={{ fill: '#065f46', fontWeight: '600' }} />
          <YAxis
            ticks={[0, 1, 2, 3]}
            domain={[0, 3]}
            tick={{ fill: '#065f46', fontWeight: '600' }}
            label={{ value: 'Mood', angle: -90, position: 'insideLeft', fill: '#065f46', fontWeight: '700' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#ecfdf5', borderRadius: 10, borderColor: '#34d399' }}
            labelStyle={{ fontWeight: '600', color: '#065f46' }}
            formatter={(value, name, props) => [`${props.payload.moodLabel}`, 'Mood']}
          />
          <Line type="monotone" dataKey="moodValue" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* View All Entries Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/diary')}
          type="button"
          className="text-emerald-600 font-semibold hover:underline text-lg transition-colors duration-300"
        >
          Track Yourself →
        </button>
      </div>
    </div>
  );
}
