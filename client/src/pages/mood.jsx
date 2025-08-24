import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const moodColors = {
  "😊 Happy": {
    base: "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200",
    active: "bg-amber-400 text-white border-amber-500 shadow-lg scale-105",
    bg: "bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400",
  },
  "😐 Neutral": {
    base: "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200",
    active: "bg-slate-500 text-white border-slate-600 shadow-lg scale-105",
    bg: "bg-gradient-to-r from-slate-200 via-gray-300 to-slate-400",
  },
  "☹️ Sad": {
    base: "bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200",
    active: "bg-indigo-500 text-white border-indigo-600 shadow-lg scale-105",
    bg: "bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-600",
  },
  "😟 Anxious": {
    base: "bg-rose-100 text-rose-700 border-rose-300 hover:bg-rose-200",
    active: "bg-rose-500 text-white border-rose-600 shadow-lg scale-105",
    bg: "bg-gradient-to-r from-rose-200 via-rose-400 to-rose-600",
  },
};

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE = "http://localhost:5001/api";
  const token = localStorage.getItem("token");

  const handleMoodClick = (mood) => {
    // Toggle selection
    if (selectedMood === mood) {
      setSelectedMood("");
    } else {
      setSelectedMood(mood);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMood) {
      setStatus("Please select a mood.");
      return;
    }
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/moods/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ mood: selectedMood, notes: note }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Mood saved successfully!");
        setTimeout(() => navigate("/mood-tracker"), 1200);
      } else {
        setStatus(data.message || "Failed to save mood");
      }
    } catch (err) {
      setStatus("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-700 ${
        selectedMood
          ? moodColors[selectedMood].bg
          : "bg-gradient-to-r from-green-300 via-pink-300 to-green-300 bg-[length:200%_200%] animate-gradient-green-pink-shift"
      }`}
    >
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-emerald-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-700">How are you feeling?</h2>
        
        {/* Mood Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.keys(moodColors).map((m) => (
            <button
              key={m}
              onClick={() => handleMoodClick(m)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 text-lg ${
                selectedMood === m ? moodColors[m].active : moodColors[m].base
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Notes */}
        <textarea
          placeholder="Write a note (optional)..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full p-4 border rounded-lg mb-4 focus:ring-2 focus:ring-emerald-400"
        />

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-emerald-600 text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 shadow-md disabled:opacity-60"
          >
            {loading ? "Saving..." : "Submit Mood"}
          </button>
        </div>

        {/* Status Message */}
        {status && <p className="mt-4 text-center text-gray-700 font-medium">{status}</p>}
      </div>
    </div>
  );
}
