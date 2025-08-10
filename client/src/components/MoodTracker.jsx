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
  const API_BASE = "http://localhost:5001/api";
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
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch mood history");
        const data = await res.json();
        if (data.success && Array.isArray(data.moods)) {
          setMoodHistory(
            data.moods.map((m) => ({
              date: new Date(m.timestamp).toLocaleDateString(),
              moodValue: moodMap[m.mood] ?? 0,
              moodLabel: m.mood,
            }))
          );
        } else {
          setMoodHistory([]);
        }
      } catch (err) {
        setError("Failed to load mood history");
      } finally {
        setLoading(false);
      }
    };
    fetchMoods();
  }, [navigate, token]);

  return (
    <div className="mood-tracker max-w-4xl min-h-[220px] mx-auto bg-white rounded-xl shadow-xl p-8 border border-gray-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-emerald-700 tracking-wide drop-shadow-sm">
        Mood Trend
      </h2>
      {error && (
        <p className="text-center text-red-600 mb-4 font-semibold select-none">{error}</p>
      )}
      {loading ? (
        <p className="text-center text-gray-500 font-medium select-none">Loading...</p>
      ) : moodHistory.length === 0 ? (
        <p className="text-center text-gray-600 mb-4 italic">No mood entries yet.</p>
      ) : (
        <ResponsiveContainer width="95%" height={200}>
          <LineChart data={moodHistory}>
            <CartesianGrid strokeDasharray="4 4" stroke="#d1fae5" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#065f46", fontWeight: "700", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#10b981", strokeWidth: 2 }}
            />
            <YAxis
              ticks={[0, 1, 2, 3]}
              domain={[0, 3]}
              tick={{ fill: "#065f46", fontWeight: "700", fontSize: 12 }}
              axisLine={{ stroke: "#10b981", strokeWidth: 2 }}
              label={{
                value: "Mood",
                angle: -90,
                position: "insideLeft",
                fill: "#065f46",
                fontWeight: "800",
                fontSize: 14,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ecfdf5",
                borderRadius: "12px",
                borderColor: "#34d399",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
              }}
              labelStyle={{ fontWeight: "700", color: "#065f46" }}
              formatter={(val, name, props) => [`${props.payload.moodLabel}`, "Mood"]}
              cursor={{ stroke: "#10b981", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="moodValue"
              stroke="#10b981"
              strokeWidth={4}
              dot={{ r: 6, strokeWidth: 2, fill: "#22c55e" }}
              activeDot={{ r: 8, fill: "#059669" }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/mood")}
          className="bg-emerald-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-colors duration-300 font-semibold tracking-wide select-none"
        >
          Add Mood
        </button>
      </div>
    </div>
  );
}
