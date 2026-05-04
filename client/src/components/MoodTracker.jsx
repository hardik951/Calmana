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
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-64 bg-white/40 rounded-3xl p-4 sm:p-6 border border-emerald-100/50 shadow-inner">
        <ResponsiveContainer>
          <LineChart data={moodData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1fae5" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#047857', fontSize: 12, fontWeight: 700}} 
              dy={10} 
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[0, 1, 2, 3]}
              tick={{fill: '#047857', fontSize: 12, fontWeight: 700}}
              dx={-10}
              tickFormatter={(val) =>
                ["Anxious", "Sad", "Neutral", "Happy"][val]
              }
            />
            <Tooltip
              contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', fontWeight: 'bold', padding: '12px 16px' }}
              itemStyle={{ color: '#064e3b' }}
              formatter={(value) => [
                ["Anxious", "Sad", "Neutral", "Happy"][value],
                "Mood",
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />

            <Line
              type="monotone"
              dataKey="moodValue"
              stroke="#6ee7b7"
              strokeWidth={4}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle 
                    key={`dot-${cx}-${cy}`}
                    cx={cx} 
                    cy={cy} 
                    r={7} 
                    fill={moodColors[payload.mood]} 
                    stroke="#ffffff" 
                    strokeWidth={3}
                    style={{ filter: `drop-shadow(0px 4px 6px ${moodColors[payload.mood]}40)` }}
                  />
                );
              }}
              activeDot={{ r: 9, strokeWidth: 4, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-6 w-full">
        <button
          onClick={handleAddMood}
          className="w-full md:w-auto px-8 py-3.5 text-sm font-bold rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_4px_14px_0_rgb(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span> Log Mood
        </button>
      </div>
    </div>
  );
}
