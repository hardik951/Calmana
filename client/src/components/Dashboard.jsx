import React, { useEffect, useState } from 'react';
import MoodTracker from './MoodTracker';
import CommunityFeed from './CommunityFeed';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [diaryEntries, setDiaryEntries] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId || !token) return;

    const fetchDiary = async () => {
      try {
        const res = await axios.get(`/api/diary/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDiaryEntries(res.data.diaries || []);
      } catch (err) {
        console.error('Error fetching diary entries:', err);
      }
    };

    fetchDiary();
  }, [userId, token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-8 font-inter flex flex-col animate-gradient-green-pink-shift bg-[length:400%_400%]">
      <div className="container mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-4 gap-10 flex-grow">
        <Sidebar />

        <main className="lg:col-span-3 space-y-10">
          {/* Welcome Section */}
          <section
            className="relative bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-lg rounded-xl p-10 flex flex-col md:flex-row items-center justify-between border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 animate-fade-in-up max-h-56"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-36 h-36 bg-emerald-200 rounded-full opacity-25 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-36 h-36 bg-green-200 rounded-full opacity-25 blur-3xl pointer-events-none"></div>

            <div className="text-center md:text-left z-10 flex-1 max-w-2xl">
              <h1 className="text-3xl font-extrabold text-emerald-800 mb-3 leading-tight tracking-wide">
                Welcome back to your calm space!
              </h1>
              <p className="text-lg text-emerald-700 mb-6 leading-relaxed">
                Your personalized AI-powered mental health dashboard. Take a deep breath and explore your journey towards greater well-being.
              </p>
              <button
                className="bg-emerald-600 text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 font-semibold flex items-center justify-center hover:brightness-110 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-400"
                onClick={() => navigate('/start-session')}
              >
                <span className="mr-3 text-2xl">🍃</span> Start a Session
              </button>
            </div>

            <div className="mt-8 md:mt-0 md:ml-12 flex-shrink-0 z-10">
              <img
                src="https://via.placeholder.com/240x160/D1FAE5/10B981?text=Calm+Illustration"
                alt="Calm illustration"
                className="rounded-lg shadow-md max-w-[240px] max-h-40 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </section>

          {/* Grid for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mood Tracker */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-8 flex flex-col justify-between border border-white/20 animate-fade-in-up min-h-[280px]"
              style={{ animationDelay: '0.6s' }}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-2 flex items-center leading-snug">
                <span className="text-5xl mr-3 text-emerald-600">😊</span> Mood Tracker
              </h3>
              <p className="text-emerald-700 mb-6 max-w-lg leading-relaxed">
                Track your moods daily and watch your emotional journey unfold with intuitive visualizations and thoughtful insights.
              </p>
              <div className="flex-1 flex items-center justify-center">
                <MoodTracker userId={userId} token={token} />
              </div>
            </section>

            {/* Personal Diary */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-8 flex flex-col justify-between border border-white/20 animate-fade-in-up cursor-pointer min-h-[280px]"
              style={{ animationDelay: '0.7s' }}
              onClick={() => navigate('/diary')}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-2 flex items-center leading-snug">
                <span className="text-5xl mr-3 text-emerald-600">✍️</span> Personal Diary
              </h3>
              <p className="text-emerald-700 mb-6 max-w-lg leading-relaxed">
                Reflect on your thoughts, feelings, and experiences. Your diary is your private sanctuary.
              </p>
              <ul className="space-y-3 text-emerald-700 text-base leading-relaxed overflow-y-auto max-h-[140px] pr-2">
                {diaryEntries.length > 0 ? (
                  diaryEntries.slice(0, 3).map((entry, index) => (
                    <li
                      key={index}
                      className="bg-white/10 p-3 rounded-md border-l-4 border-emerald-400 break-words"
                    >
                      <span className="font-semibold text-emerald-800">
                        {new Date(entry.date).toLocaleDateString()}:
                      </span>{' '}
                      {entry.content.length > 80
                        ? entry.content.substring(0, 80) + '...'
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
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-8 flex flex-col justify-between border border-white/20 animate-fade-in-up min-h-[200px]"
              style={{ animationDelay: '0.8s' }}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-3 flex items-center gap-3 leading-snug">
                <span className="text-4xl">🧠</span> Calmana AI Assistant
              </h3>
              <p className="text-emerald-700 mb-6 max-w-lg leading-relaxed">
                Your personal AI companion, ready to listen, guide, and support you anytime, anywhere.
              </p>
              <button
                onClick={() => navigate('/ai-chat')}
                className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:brightness-110"
              >
                <span className="mr-3 text-xl">🚀</span> Start AI Chat
              </button>
            </section>

            {/* Community Feed */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-8 flex flex-col justify-between border border-white/20 animate-fade-in-up min-h-[280px]"
              style={{ animationDelay: '0.9s' }}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-4 flex items-center leading-snug">
                <span className="text-4xl mr-3 text-emerald-600">🌍</span> Full Community Feed
              </h3>
              <p className="text-emerald-700 mb-6 max-w-lg leading-relaxed">
                Connect with a supportive community. Share, learn, and grow together in your mental health journey.
              </p>
              <div className="overflow-y-auto max-h-[150px] pr-2">
                <CommunityFeed />
              </div>
            </section>

            {/* Feedback Section */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-8 flex flex-col justify-center items-center border border-white/20 cursor-pointer animate-fade-in-up min-h-[160px]"
              style={{ animationDelay: '1.0s' }}
              onClick={() => navigate('/feedback')}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-3 flex items-center justify-center leading-snug">
                <span className="text-4xl mr-3 text-emerald-600">💬</span> Feedback
              </h3>
              <p className="text-emerald-700 text-center text-lg leading-relaxed max-w-sm">
                Help us improve Calmana by sharing your thoughts and ideas.
              </p>
            </section>

            {/* Meet Developers Section */}
            <section
              className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-8 flex flex-col justify-center items-center border border-white/20 cursor-pointer animate-fade-in-up min-h-[160px]"
              style={{ animationDelay: '1.1s' }}
              onClick={() => navigate('/developers')}
            >
              <h3 className="text-3xl font-bold text-emerald-800 mb-3 flex items-center justify-center leading-snug">
                <span className="text-4xl mr-3 text-emerald-600">👩‍💻</span> Meet Developers
              </h3>
              <p className="text-emerald-700 text-center text-lg leading-relaxed max-w-sm">
                Get to know the passionate team behind Calmana’s journey to your inner peace.
              </p>
            </section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer
        className="mt-16 text-center text-emerald-700 text-base opacity-90 leading-relaxed animate-fade-in-slow"
        style={{ animationDelay: '1.2s' }}
      >
        &copy; {new Date().getFullYear()} Calmana. Your journey to inner peace begins here.
      </footer>
    </div>
  );
};

export default Dashboard;
