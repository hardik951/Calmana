import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

// 🎵 Import your music file
import musicFile from "../assets/Music.mp3";

const leafEmojis = ["🍃", "🍂", "🌿", "🍁", "🍀", "🌱"];

export default function Home() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen 
                 bg-gradient-to-b from-green-900 via-green-700 to-pink-600 
                 text-white overflow-hidden"
    >
      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop>
        <source src={musicFile} type="audio/mpeg" />
      </audio>

      {/* 🎵 Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/20 
                   backdrop-blur-md shadow-lg hover:bg-white/30 transition z-50"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-white" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Aurora Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400 via-pink-300 to-purple-400 opacity-30 blur-3xl"
        animate={{
          background: [
            "linear-gradient(to right, #34d399, #f9a8d4, #a78bfa)",
            "linear-gradient(to right, #6ee7b7, #fbcfe8, #c4b5fd)",
            "linear-gradient(to right, #4ade80, #f472b6, #818cf8)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* ✨ Starry Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.5],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* 🍃 Floating Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none text-2xl">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: -20,
              x: `${Math.random() * 100}vw`,
              opacity: 0,
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
              opacity: [0, 1, 0.6],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            {leafEmojis[Math.floor(Math.random() * leafEmojis.length)]}
          </motion.div>
        ))}
      </div>

      {/* 🌟 Main Content */}
      <AnimatePresence>
        <motion.div
          key="main"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-center space-y-6 px-4 z-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif font-bold 
                       bg-clip-text text-transparent 
                       bg-gradient-to-r from-green-100 via-pink-200 to-white 
                       drop-shadow-lg"
          >
            Welcome to CALMANA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="text-lg md:text-2xl text-green-100 max-w-3xl"
          >
            Your Personal Oasis for Wellness & Calm
          </motion.p>

          <motion.button
            onClick={() => navigate("/auth")}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full font-semibold text-xl shadow-lg 
                       bg-gradient-to-r from-pink-400 via-green-400 to-teal-500 
                       text-white tracking-wide"
          >
            Enter
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
