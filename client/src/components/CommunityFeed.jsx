// src/components/CommunityFeed.jsx
import React, { useState, useEffect } from 'react';

const mockPosts = [
  { id: 1, username: 'Alice', date: '2025-07-24', message: 'Feeling great today! Meditation helped a lot 🌿' },
  { id: 2, username: 'Bob', date: '2025-07-23', message: 'Anyone has tips for handling anxiety before meetings?' },
  { id: 3, username: 'Claire', date: '2025-07-22', message: 'Just started journaling, helps clear my mind.' },
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [posting, setPosting] = useState(false);

  // Simulate fetching posts from backend on mount
  useEffect(() => {
    // Here you would fetch real data from your backend API
    setPosts(mockPosts);
  }, []);

  const handlePost = () => {
    if (!newMessage.trim()) return;

    setPosting(true);

    // Simulate backend POST request delay
    setTimeout(() => {
      const newPost = {
        id: posts.length + 1,
        username: 'You',           // Placeholder: ideally from user auth info
        date: new Date().toISOString().slice(0, 10),
        message: newMessage.trim(),
      };

      setPosts([newPost, ...posts]);
      setNewMessage('');
      setPosting(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-green-800 mb-4">Community Feed</h3>

      <textarea
        rows={3}
        className="w-full p-2 border border-green-300 rounded resize-none mb-3"
        placeholder="Share something with the community..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        disabled={posting}
      />

      <button
        onClick={handlePost}
        disabled={posting || !newMessage.trim()}
        className={`w-full py-2 rounded bg-green-600 text-white font-semibold ${
          posting || !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
        } transition mb-6`}
      >
        {posting ? 'Posting...' : 'Post'}
      </button>

      <div className="space-y-4 max-h-72 overflow-y-auto">
        {posts.length === 0 && <p className="text-green-700">No posts yet. Be the first to share!</p>}

        {posts.map(({ id, username, date, message }) => (
          <div key={id} className="border border-green-200 rounded p-3 shadow-sm">
            <div className="flex justify-between text-green-600 text-sm mb-1">
              <span className="font-semibold">{username}</span>
              <span>{date}</span>
            </div>
            <p className="text-green-800">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
