import React, { useState, useEffect } from "react";

export default function CommunityDemo() {
  const [posts, setPosts] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [notes, setNotes] = useState([]);

  // Awareness Tips (Left Sidebar)
  const tips = [
    "💡 Take 5 minutes daily to practice deep breathing.",
    "🌱 A short walk can improve your mood instantly.",
    "📖 Journaling helps release stress and emotions.",
    "💤 Sleep is essential – aim for 7–8 hours.",
    "💧 Stay hydrated, it boosts mental clarity.",
  ];

  // Motivational Quotes (Right Sidebar)
  const quotes = [
    "🌸 'Your mind is a garden. Your thoughts are the seeds.'",
    "💪 'Little progress each day adds up to big results.'",
    "☀️ 'Every day is a fresh start.'",
    "🌊 'Feelings are just visitors. Let them come and go.'",
    "🌈 'You are stronger than you think.'",
  ];

  useEffect(() => {
    const dummyPosts = [
      { id: 1, username: "anonymous_1", avatar: "https://i.pravatar.cc/150?img=11", message: "🌱 Meditation done. Feeling calm today.", timestamp: new Date().toLocaleString() },
      { id: 2, username: "anonymous_2", avatar: "https://i.pravatar.cc/150?img=22", message: "💪 Morning workout done! Ready to conquer 🚀", timestamp: new Date().toLocaleString() },
      { id: 3, username: "anonymous_3", avatar: "https://i.pravatar.cc/150?img=33", message: "☕ Journaling while sipping coffee. Grateful 🙏", timestamp: new Date().toLocaleString() },
      { id: 4, username: "anonymous_4", avatar: "https://i.pravatar.cc/150?img=44", message: "🎶 Music heals the soul. Listening to Lo-fi.", timestamp: new Date().toLocaleString() },
      { id: 5, username: "anonymous_5", avatar: "https://i.pravatar.cc/150?img=55", message: "🌸 Had a long walk. Feeling refreshed!", timestamp: new Date().toLocaleString() },
      { id: 6, username: "anonymous_6", avatar: "https://i.pravatar.cc/150?img=66", message: "📖 Reading a self-help book. New insights today.", timestamp: new Date().toLocaleString() },
      { id: 7, username: "anonymous_7", avatar: "https://i.pravatar.cc/150?img=67", message: "💤 Slept early yesterday. Energy levels 💯", timestamp: new Date().toLocaleString() },
      { id: 8, username: "anonymous_8", avatar: "https://i.pravatar.cc/150?img=68", message: "🌊 Went to the beach, nature really helps me relax.", timestamp: new Date().toLocaleString() },
      { id: 9, username: "anonymous_9", avatar: "https://i.pravatar.cc/150?img=69", message: "🍵 Green tea + calm morning = perfect start.", timestamp: new Date().toLocaleString() },
      { id: 10, username: "anonymous_10", avatar: "https://i.pravatar.cc/150?img=70", message: "🧘 Breathing exercise before sleep helps a lot.", timestamp: new Date().toLocaleString() },
    ];
    setPosts(dummyPosts);

    const dummyNotes = [
      { id: 1, username: "anonymous_A", avatar: "https://i.pravatar.cc/150?img=21", note: "Grateful 🌸" },
      { id: 2, username: "anonymous_B", avatar: "https://i.pravatar.cc/150?img=22", note: "Stay positive 💡" },
      { id: 3, username: "anonymous_C", avatar: "https://i.pravatar.cc/150?img=23", note: "Chill vibes 🎶" },
      { id: 4, username: "anonymous_D", avatar: "https://i.pravatar.cc/150?img=24", note: "Keep going 🚀" },
      { id: 5, username: "anonymous_E", avatar: "https://i.pravatar.cc/150?img=25", note: "Peace ✨" },
      { id: 6, username: "anonymous_F", avatar: "https://i.pravatar.cc/150?img=26", note: "New start ☀️" },
      { id: 7, username: "anonymous_G", avatar: "https://i.pravatar.cc/150?img=27", note: "Joy 🌈" },
    ];
    setNotes(dummyNotes);
  }, []);

  const handlePost = () => {
    if (!newMsg.trim()) return;
    const newPost = {
      id: posts.length + 1,
      username: `anonymous_${posts.length + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      message: newMsg,
      timestamp: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]);
    setNewMsg("");
  };

  const handleAddNote = () => {
    const noteText = prompt("Write a short note (max 30 chars):");
    if (!noteText) return;
    const newNote = {
      id: notes.length + 1,
      username: "You",
      avatar: "https://i.pravatar.cc/150?u=you",
      note: noteText.slice(0, 30),
    };
    setNotes([newNote, ...notes]);
  };

  // Card style with gradient (matches Dashboard)
  const cardClasses =
    "bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 animate-gradient-x " +
    "rounded-2xl border border-white/20 p-4 shadow-md transition-all duration-300 hover:shadow-xl";

  return (
    <div className="grid grid-cols-12 gap-6 mt-6 px-4">
      {/* --- Left Sidebar --- */}
      <aside className={`${cardClasses} hidden lg:block col-span-3 h-fit sticky top-6`}>
        <h2 className="font-bold text-emerald-700 mb-3 text-lg">🧠 Mental Health Tips</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          {tips.map((tip, i) => (
            <li key={i} className="p-2 bg-white/30 rounded-lg border-l-4 border-emerald-400 shadow-sm">
              {tip}
            </li>
          ))}
        </ul>
      </aside>

      {/* --- Main Feed --- */}
      <main className="col-span-12 lg:col-span-6 space-y-6">
        {/* Notes Bar */}
        <div className={`${cardClasses} flex space-x-4 overflow-x-auto pb-3 no-scrollbar`}>
          <div onClick={handleAddNote} className="flex flex-col items-center cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold border-2 border-emerald-700">
              +
            </div>
            <p className="text-xs mt-1 text-gray-700">Your Note</p>
          </div>
          {notes.map((note) => (
            <div key={note.id} className="flex flex-col items-center">
              <div className="relative">
                <img src={note.avatar} alt="note-avatar" className="w-16 h-16 rounded-full border-2 border-emerald-500" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                  {note.note}
                </div>
              </div>
              <p className="text-xs mt-1 text-gray-700">@{note.username}</p>
            </div>
          ))}
        </div>

        {/* Post composer */}
        <div className={cardClasses}>
          <div className="flex items-start space-x-3">
            <img src="https://i.pravatar.cc/150?u=you" alt="your-avatar" className="w-12 h-12 rounded-full border" />
            <textarea
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Share something with the community..."
              rows={3}
              className="flex-1 p-2 border rounded-lg bg-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={handlePost}
              disabled={!newMsg.trim()}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition"
            >
              Post
            </button>
          </div>
        </div>

        {/* Feed */}
        {posts.map((post) => (
          <div key={post.id} className={cardClasses}>
            <div className="flex items-center justify-between px-2 py-3">
              <div className="flex items-center space-x-3">
                <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full border" />
                <div>
                  <p className="font-semibold text-sm">@{post.username}</p>
                  <p className="text-xs text-gray-600">{post.timestamp}</p>
                </div>
              </div>
              <span className="text-gray-500 cursor-pointer">⋮</span>
            </div>
            <div className="px-2 pb-4">
              <p className="text-gray-800 text-base">{post.message}</p>
            </div>
            <div className="flex items-center space-x-6 px-2 py-2 border-t text-gray-700 text-sm">
              <button className="hover:text-emerald-600">❤️ Like</button>
              <button className="hover:text-emerald-600">💬 Comment</button>
              <button className="hover:text-emerald-600">🔗 Share</button>
            </div>
          </div>
        ))}
      </main>

      {/* --- Right Sidebar --- */}
      <aside className={`${cardClasses} hidden lg:block col-span-3 h-fit sticky top-6`}>
        <h2 className="font-bold text-emerald-700 mb-3 text-lg">🌟 Daily Motivation</h2>
        <div className="space-y-4 text-sm text-gray-700">
          {quotes.map((quote, i) => (
            <p key={i} className="p-3 bg-white/30 rounded-lg shadow-sm italic border-l-4 border-emerald-400">
              {quote}
            </p>
          ))}
        </div>
      </aside>
    </div>
  );
}
