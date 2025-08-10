import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";

const moodMap = {
  "😊 Happy": 3,
  "😐 Neutral": 2,
  "☹️ Sad": 1,
  "😟 Anxious": 0,
};

export default function MoodTracker() {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE = "http://localhost:5001/api"; // backend URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMoods = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/moods`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch mood history");
        const data = await res.json();
        if (data.success && Array.isArray(data.moods)) {
          setMoodHistory(data.moods.map(m => ({
            date: new Date(m.timestamp).toLocaleDateString(),
            moodValue: moodMap[m.mood] ?? 0,
            moodLabel: m.mood
          })));
        } else setMoodHistory([]);
      } catch (err) {
        setError("Failed to load mood history");
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, [navigate, token]);

  return (
    <div className="mood-tracker max-w-xl min-h-[320px] mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-700">Mood Trend</h2>
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}
      {loading ? <p className="text-center">Loading...</p> :
        moodHistory.length === 0 ? <p className="text-center">No mood entries yet.</p> :
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
              <Tooltip formatter={(val, name, props) => [`${props.payload.moodLabel}`, "Mood"]} />
              <Line type="monotone" dataKey="moodValue" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
      }
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/mood")}
          className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-colors duration-300"
        >
          Add Mood
        </button>
      </div>
    </div>
  );
}
