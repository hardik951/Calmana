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

  // Optimized Timer Effect to prevent re-render glitches
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const cardClasses =
    "bg-white/95 backdrop-blur-xl rounded-[2rem] border border-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-out " +
    "hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1";

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6 sm:p-10 font-inter flex flex-col relative overflow-hidden">
      <div className="container mx-auto max-w-screen-xl grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow relative z-10">
        
        {/* Sidebar + Timer Block */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Sidebar is kept outside of motion.div here to ensure the 
              Profile Icon stays persistent and doesn't re-animate on every timer tick.
          */}
          <div className="w-full">
            <Sidebar />
          </div>

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

            <motion.div
              className="relative flex items-center justify-center w-32 h-32 mb-4"
              animate={isRunning ? { scale: [1, 1.05, 1] } : {}}
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
        </div>

        {/* Main content */}
        <main className="lg:col-span-3 space-y-10">
          {/* Start Session Block */}
          <motion.section
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className={`${cardClasses} flex flex-col md:flex-row items-center justify-between !p-10 relative overflow-hidden`}
            style={{ minHeight: '180px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent pointer-events-none rounded-[2rem]"></div>
            <div className="flex-1 mb-6 md:mb-0 md:pr-8 relative z-10">
              <h2 className="text-4xl font-extrabold tracking-tight text-emerald-800 mb-4">Your Calm Space Awaits</h2>
              <p className="text-emerald-700 max-w-xl leading-relaxed mb-8 text-lg">
                Calmana is here to help you relax, refocus, and renew. Start a calming session whenever you need a moment of peace.
              </p>
              <button
                onClick={() => navigate("/start-session")}
                className="bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:bg-emerald-700 transition-all duration-300 font-bold text-lg flex items-center gap-2 group"
              >
                Start Session <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
            <div className="hidden md:flex flex-shrink-0 w-48 h-48 items-center justify-center relative z-10">
              <div className="absolute inset-0 bg-emerald-100/30 rounded-full filter blur-2xl"></div>
              <img src={YogaImage} alt="Yoga Emote" className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
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
                <h3 className="text-2xl font-extrabold tracking-tight text-emerald-800 flex items-center mb-2">
                  <span className="text-3xl mr-3">😊</span> Mood Tracker
                </h3>
                <p className="text-emerald-700 text-sm font-medium mb-2">
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
                <h3 className="text-2xl font-extrabold tracking-tight text-emerald-800 flex items-center mb-2">
                  <span className="text-3xl mr-3">✍️</span> Personal Diary
                </h3>
                <p className="text-emerald-700 text-sm mb-6 font-medium">
                  Reflect on your thoughts and experiences. Your private sanctuary.
                </p>
              </div>
              <ul className="space-y-4 text-emerald-800 text-sm font-medium">
                {diaryEntries.length > 0 ? (
                  diaryEntries.slice(0, 2).map((entry, index) => (
                    <li key={index} className="bg-white/20 p-4 rounded-xl border border-white/30 flex flex-col gap-1">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                      <span className="leading-relaxed text-emerald-900">{entry.content}</span>
                    </li>
                  ))
                ) : (
                  <li className="bg-white/20 p-3 rounded border-l-4 border-gray-300">No diary entries yet.</li>
                )}
              </ul>
            </motion.section>

            {/* ✅ My Appointments Card */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} cursor-pointer min-h-[160px] flex flex-col justify-between`}
              onClick={() => navigate("/patient/appointments")}
            >
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-emerald-800 mb-2">
                  📅 My Appointments
                </h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  View your pending, accepted, or past appointments. Stay on top of your schedule.
                </p>
              </div>
              <div className="mt-6">
                <p className="text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:text-emerald-700 transition-colors">
                  Click to view details <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
                </p>
              </div>
            </motion.section>

            {/* AI Chat */}
            <motion.section
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={`${cardClasses} min-h-[160px] flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-emerald-800 flex items-center gap-2 mb-2">
                  <span className="text-3xl">🧠</span> AI Assistant
                </h3>
                <p className="text-emerald-700 text-sm leading-relaxed mb-6">Chat with your AI companion, always here to help!</p>
              </div>
              <button
                onClick={() => navigate('/ai-chat')}
                className="w-full bg-emerald-600 text-white py-3 rounded-2xl shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:bg-emerald-700 transition-all font-bold flex items-center justify-center gap-2"
              >
                <span className="text-xl">🚀</span> Start AI Chat
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
              <p className="text-emerald-700">Meet the team behind Calmana’s vision for well-being.</p>
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