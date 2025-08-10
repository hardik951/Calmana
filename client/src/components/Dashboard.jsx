import React, { useEffect, useState } from 'react';
import MoodTracker from './MoodTracker';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [diaryEntries, setDiaryEntries] = useState([]);
  const token = localStorage.getItem('token');

  const API_BASE = 'http://localhost:5001/api';

  useEffect(() => {
    if (!token) return;
    const fetchDiary = async () => {
      try {
        const res = await axios.get(`${API_BASE}/diary`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDiaryEntries(res.data.diaries || []);
      } catch (err) {
        console.error('Error fetching diary entries:', err);
      }
    };
    fetchDiary();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-8 font-inter flex flex-col animate-gradient-green-pink-shift bg-[length:400%_400%]">
      <div className="container mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-4 gap-10 flex-grow">
        <Sidebar />

        <main className="lg:col-span-3 space-y-10">
          {/* === Place your welcome section here if you have one === */}

          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mood Tracker */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 p-8 border border-white/20 animate-fade-in-up min-h-[280px]"
              style={{ animationDelay: '0.6s' }}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-2 flex items-center">
                <span className="text-5xl mr-3 text-emerald-600">😊</span> Mood Tracker
              </h3>
              <p className="text-emerald-700 mb-6">
                Track your moods daily and watch your emotional journey unfold with intuitive visualizations and thoughtful insights.
              </p>
              <div className="flex-1 flex items-center justify-center">
                <MoodTracker token={token} />
              </div>
            </section>

            {/* Personal Diary */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 p-8 border border-white/20 animate-fade-in-up cursor-pointer min-h-[280px]"
              style={{ animationDelay: '0.7s' }}
              onClick={() => navigate('/diary')}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-2 flex items-center">
                <span className="text-5xl mr-3 text-emerald-600">✍️</span> Personal Diary
              </h3>
              <p className="text-emerald-700 text-base mb-2">
                Reflect on your thoughts, feelings, and experiences. Your diary is your private sanctuary.
              </p>
              <ul className="space-y-3 text-emerald-700 text-base overflow-y-auto max-h-[140px] pr-2">
                {diaryEntries.length > 0 ? (
                  diaryEntries.slice(0, 3).map((entry, index) => (
                    <li
                      key={index}
                      className="bg-white/10 p-3 rounded-md border-l-4 border-emerald-400 break-words"
                    >
                      <span className="font-semibold text-emerald-800">
                        {new Date(entry.date).toLocaleDateString()}:
                      </span>{" "}
                      {entry.content.length > 80
                        ? entry.content.substring(0, 80) + "..."
                        : entry.content}
                    </li>
                  ))
                ) : (
                  <li className="bg-white/10 p-3 rounded-md border-l-4 border-gray-300">
                    No diary entries yet.
                  </li>
                )}
              </ul>
              <span className="mt-4 text-emerald-600 hover:underline text-sm font-semibold self-start">
                View all entries
              </span>
            </section>

            {/* AI Chat */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 p-8 border border-white/20 animate-fade-in-up min-h-[200px]"
              style={{ animationDelay: '0.8s' }}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-3 flex items-center gap-3">
                <span className="text-4xl">🧠</span> Calmana AI Assistant
              </h3>
              <p className="text-emerald-700 mb-6">
                Your personal AI companion, ready to listen, guide, and support you anytime, anywhere.
              </p>
              <button
                onClick={() => navigate('/ai-chat')}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg hover:brightness-110"
              >
                <span className="mr-2 text-xl">🚀</span> Start AI Chat
              </button>
            </section>

            {/* Community Section (Button Only) */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 p-8 border border-white/20 animate-fade-in-up min-h-[180px]"
              style={{ animationDelay: '0.9s' }}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-4 flex items-center">
                <span className="text-4xl mr-3 text-emerald-600">🌍</span> Community
              </h3>
              <p className="text-emerald-700 mb-6">
                Connect with a supportive community. Share, learn, and grow together.
              </p>
              <button
                onClick={() => navigate('/community')}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 focus:outline-none"
              >
                Visit Community
              </button>
            </section>

            {/* Feedback Section */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 p-8 border border-white/20 cursor-pointer animate-fade-in-up min-h-[160px]"
              style={{ animationDelay: '1.0s' }}
              onClick={() => navigate('/feedback')}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-3 flex items-center">
                <span className="text-4xl mr-3 text-emerald-600">💬</span> Feedback
              </h3>
              <p className="text-emerald-700">
                Help us improve Calmana by sharing your thoughts and ideas.
              </p>
            </section>

            {/* Meet Developers */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 p-8 border border-white/20 cursor-pointer animate-fade-in-up min-h-[160px]"
              style={{ animationDelay: '1.1s' }}
              onClick={() => navigate('/developers')}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-3 flex items-center">
                <span className="text-4xl mr-3 text-emerald-600">👩‍💻</span> Meet Developers
              </h3>
              <p className="text-emerald-700">
                Get to know the passionate team behind Calmana’s journey to your inner peace.
              </p>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-emerald-700 text-base opacity-90">
        &copy; {new Date().getFullYear()} Calmana. Your journey to inner peace begins here.
      </footer>
    </div>
  );
};

export default Dashboard;
