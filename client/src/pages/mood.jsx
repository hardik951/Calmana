import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const moodMap = {
  "😊 Happy": 3,
  "😐 Neutral": 2,
  "☹️ Sad": 1,
  "😟 Anxious": 0,
};

export default function Mood() {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE = "http://localhost:5001/api";
  const token = localStorage.getItem("token");

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
        body: JSON.stringify({ mood: selectedMood, notes: note })
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
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 border">
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-700">Add Mood</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(moodMap).map(m => (
          <button
            key={m}
            onClick={() => setSelectedMood(m)}
            className={`px-5 py-2 rounded-full border-2 ${selectedMood === m
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-100"}`}
          >
            {m}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Add a note (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={4}
        className="w-full p-3 border rounded-lg mb-4"
      />
      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700"
        >
          {loading ? "Saving..." : "Submit Mood"}
        </button>
      </div>
      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </div>
  );
}
