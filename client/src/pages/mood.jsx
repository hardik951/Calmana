import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import MoodTracker from "../components/MoodTracker";

const moodMap = {
  "😊 Happy": 3,
  "😐 Neutral": 2,
  "☹️ Sad": 1,
  "😟 Anxious": 0,
};

export default function Mood() {
  const navigate = useNavigate();
  const [moodHistory, setMoodHistory] = useState([]);
  const [detailedHistory, setDetailedHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const fetchMoodHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/moods/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch mood history");
      }

      const data = await res.json();

      // Prepare data for chart (last 21 days or all if less)
      const chartData = data
        .slice(0, 21)
        .map((entry) => ({
          date: new Date(entry.timestamp).toLocaleDateString(),
          mood: moodMap[entry.mood] ?? null,
        }))
        .reverse();

      setMoodHistory(chartData);
      setDetailedHistory(data.reverse());
    } catch (err) {
      setError(err.message || "Error fetching mood history");
      console.error("Error fetching mood history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Mood Dashboard 🌿
      </h2>

      <MoodTracker onMoodSubmit={fetchMoodHistory} />

      {error && (
        <p className="text-red-600 mt-4 font-semibold text-center">{error}</p>
      )}

      <div className="mt-10">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          Mood Trend (Last 21 Days)
        </h4>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : moodHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moodHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[0, 3]}
                tickFormatter={(v) =>
                  Object.keys(moodMap).find((k) => moodMap[k] === v) ?? ""
                }
              />
              <Tooltip
                formatter={(value) =>
                  Object.keys(moodMap).find((k) => moodMap[k] === value) ?? ""
                }
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-gray-500">No mood entries yet.</p>
        )}
      </div>

      {detailedHistory.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Mood Journal
          </h4>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {detailedHistory.map((entry, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded">
                <div className="text-sm text-gray-700">
                  <strong>Date:</strong>{" "}
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
                <div className="text-sm text-gray-700">
                  <strong>Mood:</strong> {entry.mood}
                </div>
                {entry.notes && (
                  <div className="text-sm text-gray-700">
                    <strong>Note:</strong> {entry.notes}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
