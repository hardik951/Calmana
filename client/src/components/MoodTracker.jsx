import React from "react";
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

// Example data
const moodData = [
  { date: "01 Aug", mood: "Happy", moodValue: 3 },
  { date: "03 Aug", mood: "Neutral", moodValue: 2 },
  { date: "05 Aug", mood: "Sad", moodValue: 1 },
  { date: "07 Aug", mood: "Happy", moodValue: 3 },
  { date: "10 Aug", mood: "Anxious", moodValue: 0 },
  { date: "13 Aug", mood: "Neutral", moodValue: 2 },
  { date: "15 Aug", mood: "Happy", moodValue: 3 },
];

// Mood colors
const moodColors = {
  Happy: "#22c55e",   // green
  Neutral: "#3b82f6", // blue
  Sad: "#6b7280",     // gray
  Anxious: "#ef4444", // red
};

export default function MoodTracker() {
  const navigate = useNavigate();

  const handleAddMood = () => {
    navigate("/mood"); // Redirect to Mood.jsx page route
  };

  return (
    <div className="w-full flex flex-col items-center p-6 bg-gradient-to-r from-green-100 via-pink-100 to-green-100 rounded-3xl shadow-lg">

      <p className="text-gray-700 mb-6 text-center max-w-md">
        Track your moods and visualize your emotional journey.
      </p>

      <div className="w-full max-w-2xl p-6 shadow-xl rounded-2xl bg-white">
        <h3 className="text-xl font-semibold text-center mb-4">Mood Trend</h3>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-20} textAnchor="end" />
              <YAxis
                ticks={[0, 1, 2, 3]}
                tickFormatter={(val) =>
                  ["Anxious", "Sad", "Neutral", "Happy"][val]
                }
              />
              <Tooltip
                formatter={(value) => [
                  ["Anxious", "Sad", "Neutral", "Happy"][value],
                  "Mood",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />

              <Line
                type="monotone"
                dataKey="moodValue"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{
                  r: 6,
                  fill: (data) => moodColors[data.payload.mood],
                  stroke: "#333",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleAddMood}
            className="px-6 py-3 text-lg rounded-full bg-green-600 text-white hover:bg-green-700 shadow-md"
          >
            Add Mood
          </button>
        </div>
      </div>
    </div>
  );
}
