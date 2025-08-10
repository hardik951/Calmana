import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5001/api";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch community posts/messages
  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/community`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not fetch posts");
      const data = await res.json();
      setPosts(data.posts || []); // adjust according to your backend's response shape
    } catch (err) {
      setError("Failed to load community posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPosts();
    // eslint-disable-next-line
  }, [token]);

  // Handle post submission
  const handlePost = async () => {
    if (!newMsg.trim()) return;
    setPosting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/community/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMsg }),
      });
      const data = await res.json();
      if (res.ok && data.post) {
        setSuccessMsg("Shared with the community!");
        setNewMsg("");
        fetchPosts();
        setTimeout(() => setSuccessMsg(""), 2000);
      } else {
        setError(data.message || "Could not post to community.");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-12 border border-gray-200 mt-8">
      <h2 className="text-3xl font-bold text-emerald-800 mb-2 text-center">
        🌍 Community Feed
      </h2>
      <p className="text-emerald-700 text-center mb-8">
        Share, connect, and support each other on your wellness journey.
      </p>

      {/* Post box */}
      <div className="mb-8">
        <textarea
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Share something with the community..."
          rows={3}
          className="w-full p-3 border rounded mb-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
        />
        <div className="flex items-center justify-between">
          <button
            onClick={handlePost}
            disabled={posting || !newMsg.trim()}
            className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-emerald-700 transition"
          >
            {posting ? "Posting..." : "Post"}
          </button>
          {successMsg && (
            <span className="text-green-700 font-semibold">{successMsg}</span>
          )}
          {error && (
            <span className="text-red-700 font-semibold">{error}</span>
          )}
        </div>
      </div>

      {/* Posts list */}
      <div className="max-h-[350px] overflow-y-auto space-y-4 border-t pt-6">
        {loading ? (
          <p className="text-center text-emerald-700">Loading community...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post, idx) => (
            <div
              key={post._id || idx}
              className="bg-emerald-100 rounded-lg px-6 py-4 shadow border-l-4 border-emerald-400"
            >
              <p className="text-emerald-900">{post.message}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>
                  {post.username
                    ? `@${post.username}`
                    : post.user
                    ? `@${post.user}`
                    : "Anonymous"}
                </span>
                <span>{post.date ? new Date(post.date).toLocaleString() :
                                  post.timestamp ? new Date(post.timestamp).toLocaleString() :
                                  ""}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
