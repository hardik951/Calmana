import React, { useEffect, useState, useRef } from 'react';
import MoodTracker from './MoodTracker';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

// Yoga image
import YogaImage from '../assets/calmanayogaimg.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [diaryEntries, setDiaryEntries] = useState([]);
  const token = localStorage.getItem('token');
  const API_BASE = 'http://localhost:5001/api';

  // Timer state
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

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

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  // Card style for reusability
  const cardClasses =
    "bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 " +
    "rounded-2xl border border-white/20 p-6 shadow-md transition-all duration-300 " +
    "hover:shadow-2xl hover:scale-[1.02]";

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-8 font-inter flex flex-col">
      {/* Main layout */}
      <div className="container mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-4 gap-10 flex-grow">
        
        {/* Sidebar + Timer Block */}
        <div className="col-span-1 flex flex-col gap-6">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <Sidebar />
          </motion.div>

          {/* Timer Block */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={`${cardClasses} flex flex-col items-center justify-center text-center relative overflow-hidden`}
          >
            <h3 className="text-xl font-extrabold text-emerald-800 mb-2">⏱️ Timer</h3>
            <p className="text-emerald-600 text-sm mb-4">
              Use this timer to stay mindful during meditation, journaling, or focus sessions.
            </p>

            {/* Pulsating circle around timer */}
            <motion.div
              className="relative flex items-center justify-center w-32 h-32 mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute w-32 h-32 rounded-full bg-emerald-300 opacity-20"></div>
              <p className="relative text-emerald-800 text-3xl font-mono font-bold">
                {formatTime(timer)}
              </p>
            </motion.div>

            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow hover:bg-emerald-700 transition font-semibold"
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => { setTimer(0); setIsRunning(false); }}
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition font-semibold"
              >
                Reset
              </button>
            </div>
          </motion.section>
        </div> {/* ✅ properly closed left column */}

        {/* Main content */}
        <main className="lg:col-span-3 space-y-10">
          {/* Start Session Block */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={`${cardClasses} flex flex-col md:flex-row items-center justify-between`}
            style={{ minHeight: '180px' }}
          >
            <div className="flex-1 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-extrabold text-emerald-800 mb-3">Your Calm Space Awaits</h2>
              <p className="text-emerald-700 max-w-xl leading-relaxed mb-6">
                Calmana is here to help you relax, refocus, and renew. Start a calming session whenever you need a moment of peace.
              </p>
              <button
                onClick={() => navigate("/start-session")}
                className="bg-emerald-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400 transition-colors duration-300 font-semibold"
              >
                Start Session
              </button>
            </div>
            {/* Yoga image */}
            <div className="flex-shrink-0 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
              <img src={YogaImage} alt="Yoga Emote" className="w-full h-full object-contain" />
            </div>
          </motion.section>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mood Tracker */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} min-h-[220px] flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-800 flex items-center mb-1">
                  <span className="text-4xl mr-2">😊</span> Mood Tracker
                </h3>
                <p className="text-emerald-700 text-base font-medium mb-2 leading-relaxed">
                  Track your moods and visualize your emotional journey.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <MoodTracker token={token} />
              </div>
            </motion.section>

            {/* Personal Diary */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} min-h-[220px] flex flex-col cursor-pointer`}
              onClick={() => navigate('/diary')}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-800 flex items-center mb-1">
                  <span className="text-4xl mr-2">✍️</span> Personal Diary
                </h3>
                <p className="text-emerald-700 text-base mb-4 font-medium leading-relaxed">
                  Reflect on your thoughts and experiences. Your private sanctuary.
                </p>
              </div>
              <ul className="space-y-3 text-emerald-700 text-base font-medium pr-1">
                {diaryEntries.length > 0 ? (
                  diaryEntries.map((entry, index) => (
                    <li key={index} className="bg-white/20 p-3 rounded border-l-4 border-emerald-400">
                      <span className="font-semibold text-emerald-800">
                        {new Date(entry.date).toLocaleDateString()}:
                      </span>{" "}
                      {entry.content}
                    </li>
                  ))
                ) : (
                  <li className="bg-white/20 p-3 rounded border-l-4 border-gray-300">No diary entries yet.</li>
                )}
              </ul>
            </motion.section>

            {/* AI Chat */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} min-h-[160px] flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-800 flex items-center gap-2 mb-1">
                  <span className="text-3xl">🧠</span> Calmana AI Assistant
                </h3>
                <p className="text-emerald-700 mb-4">"Hello! You're now chatting with your friendly AI companion. I'm always here to help, whether you have a complex question, need a creative spark, or just want to talk.

Feel free to ask me anything. What can I help you with today?"</p>
              </div>
              <button
                onClick={() => navigate('/ai-chat')}
                className="w-full bg-emerald-600 text-white py-2.5 rounded-full shadow hover:bg-emerald-700 font-bold transition"
              >
                <span className="mr-1 text-xl">🚀</span> Start AI Chat
              </button>
            </motion.section>

            {/* Community */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} min-h-[140px] flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-800 flex items-center mb-1">
                  <span className="text-3xl mr-2">🌍</span> Community
                </h3>
                <p className="text-emerald-700 mb-4">
                  "Welcome to the community. This is your space to connect with others who understand. Share your story, learn from shared experiences, and find strength in growing together. We're glad you're here."
                </p>
              </div>
              <button
                onClick={() => navigate('/community')}
                className="bg-emerald-600 text-white px-6 py-2 rounded-full shadow hover:bg-emerald-700 font-bold transition"
              >
                Visit Community
              </button>
            </motion.section>

            {/* Feedback */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} min-h-[120px] flex flex-col justify-between cursor-pointer`}
              onClick={() => navigate('/feedback')}
            >
              <h3 className="text-2xl font-extrabold text-emerald-800 flex items-center mb-1">
                <span className="text-2xl mr-2">💬</span> Feedback
              </h3>
              <p className="text-emerald-700">Help us improve Calmana by sharing your feedback.</p>
            </motion.section>

            {/* Meet Developers */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} min-h-[120px] flex flex-col justify-between cursor-pointer`}
              onClick={() => navigate('/developers')}
            >
              <h3 className="text-2xl font-extrabold text-emerald-800 flex items-center mb-1">
                <span className="text-2xl mr-2">👩‍💻</span> Meet Developers
              </h3>
              <p className="text-emerald-700">
                Meet the team behind Calmana’s vision for well-being.
              </p>
            </motion.section>
          </div>
        </main>
      </div>

      {/* Footer */}
      <motion.footer
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-16 text-center text-emerald-700 text-base opacity-90"
      >
        &copy; {new Date().getFullYear()} Calmana. Your journey to inner peace begins here.
      </motion.footer>
    </div>
  );
};

export default Dashboard;
