import React, { useState, useEffect } from "react";
import axios from "axios";

const DiaryPage = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const userId = localStorage.getItem("userId");
  const API_BASE = "http://localhost:5001/api";

  useEffect(() => {
    const fetchEntries = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(`${API_BASE}/diary/${userId}`);
        setEntries(data);
      } catch (err) {
        if (axios.isAxiosError && axios.isAxiosError(err)) {
          console.error(err.response?.data || err.message);
        } else {
          console.error(err);
        }
        setError("Failed to load diary entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [userId]);

  const saveEntry = async () => {
    if (!newEntry.trim() || !userId) return;

    const entryData = {
      date: new Date().toISOString(),
      content: newEntry.trim(),
    };

    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    // Optimistic update
    setEntries((prev) => [entryData, ...prev]);
    setNewEntry("");

    try {
      const { data } = await axios.post(`${API_BASE}/diary/add`, {
        userId,
        content: entryData.content,
        date: entryData.date,
      });

      // Replace optimistic entry with saved one from backend
      setEntries((prev) => [data, ...prev.slice(1)]);
      setSuccessMsg("Entry saved successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error("Error saving diary entry:", err);
      setError("Failed to save entry.");
      // Rollback optimistic update
      setEntries((prev) => prev.slice(1));
      setNewEntry(entryData.content);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6">
      <h1 className="text-3xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
        📔 Personal Diary
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">{error}</div>
      )}

      {successMsg && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
          {successMsg}
        </div>
      )}

      <textarea
        className="w-full p-4 border rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        rows={5}
        placeholder="Write your thoughts here..."
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
      />

      <button
        onClick={saveEntry}
        disabled={saving || !newEntry.trim()}
        className={`mt-3 px-5 py-2 rounded-lg transition-all ${
          saving || !newEntry.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 text-white hover:brightness-110"
        }`}
      >
        {saving ? "Saving..." : "Save Entry"}
      </button>

      {loading && <p className="mt-6 text-gray-600">Loading entries...</p>}

      <div className="mt-8 space-y-4 max-h-[500px] overflow-y-auto pr-1">
        {!loading && entries.length > 0 ? (
          entries.map((entry, index) => (
            <div
              key={entry.date + index}
              className="bg-white/80 rounded-lg p-4 shadow border-l-4 border-emerald-500"
            >
              <p className="text-sm text-gray-500">
                {new Date(entry.date).toLocaleString()}
              </p>
              <p className="mt-2 text-emerald-900 whitespace-pre-line">{entry.content}</p>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-600 italic">No diary entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default DiaryPage;
