import React, { useState, useEffect } from "react";
import axios from "axios";

const DiaryPage = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const API_BASE = "http://localhost:5001/api";

  // Fetch all diary entries
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE}/diary`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntries(data.diaries || []);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
        setError("Failed to load diary entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Save a new diary entry
  const saveEntry = async () => {
    if (!newEntry.trim()) return;

    const optimisticEntry = {
      date: new Date().toISOString(),
      content: newEntry.trim()
    };

    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    // Optimistic UI update
    setEntries((prev) => [optimisticEntry, ...prev]);
    setNewEntry("");

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_BASE}/diary/add`,
        { content: optimisticEntry.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setEntries((prev) => [data.diary, ...prev.slice(1)]);
        setSuccessMsg("Entry saved successfully!");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        throw new Error(data.message || "Save failed");
      }
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      setError("Failed to save entry.");
      setEntries((prev) => prev.slice(1)); // rollback
      setNewEntry(optimisticEntry.content);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-pink-50 to-green-50 p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8 flex flex-col">
        <h1 className="text-4xl font-extrabold text-emerald-700 mb-8 flex items-center gap-3 select-none">
          📔 Personal Diary
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5 font-semibold shadow-sm">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-5 font-semibold shadow-sm">
            {successMsg}
          </div>
        )}

        <textarea
          className="w-full p-5 border border-emerald-300 rounded-2xl shadow-inner resize-y text-gray-700 placeholder:italic placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition"
          rows={6}
          placeholder="Write your thoughts here..."
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          disabled={saving}
        />

        <button
          onClick={saveEntry}
          disabled={saving || !newEntry.trim()}
          className={`mt-6 py-3 rounded-xl font-bold transition-all text-lg ${
            saving || !newEntry.trim()
              ? "bg-emerald-300 cursor-not-allowed text-emerald-700"
              : "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-md"
          }`}
        >
          {saving ? "Saving..." : "Save Entry"}
        </button>

        <div className="mt-12">
          {loading ? (
            <p className="text-center text-gray-500 text-lg font-medium animate-pulse select-none">
              Loading entries...
            </p>
          ) : entries.length === 0 ? (
            <p className="text-center text-gray-400 italic text-lg select-none">
              No diary entries yet.
            </p>
          ) : (
            <div className="grid gap-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-transparent pr-1">
              {entries.map((entry, index) => (
                <div
                  key={(entry._id || entry.date) + index}
                  className="bg-emerald-50 rounded-2xl p-6 shadow-md border-l-8 border-emerald-500 hover:scale-[1.02] transform transition-transform cursor-default duration-200"
                >
                  <p className="text-sm text-emerald-500 font-semibold">
                    {new Date(entry.date).toLocaleString()}
                  </p>
                  <p className="mt-3 text-emerald-900 whitespace-pre-wrap leading-relaxed font-medium select-text">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
