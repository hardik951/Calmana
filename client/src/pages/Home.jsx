import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import musicFile from "../assets/Music.mp3";
import welcomeImage from "../assets/YourImage.png"; // <-- replace with your actual image file

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
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden
                    bg-[linear-gradient(270deg,#d9f99d,#fbcfe8,#a7f3d0,#bbf7d0,#d9f99d)]
                    bg-[length:400%_400%] animate-gradient-green-pink-shift">

      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop>
        <source src={musicFile} type="audio/mpeg" />
      </audio>

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md shadow-lg hover:bg-white/30 transition z-50"
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-emerald-900" />
        ) : (
          <VolumeX className="w-6 h-6 text-emerald-900" />
        )}
      </button>

      {/* Starry Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-900/70"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
            }}
            animate={{ opacity: [0.3, 1, 0.5], scale: [1, 1.4, 1] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none text-2xl text-emerald-800/90">
        {[...Array(20)].map((_, i) => {
          const startX = Math.random() * 100;
          const endX = startX + (Math.random() * 20 - 10);
          return (
            <motion.div
              key={i}
              initial={{ y: -10, x: `${startX}vw`, opacity: 0 }}
              animate={{
                y: ["-10vh", "110vh"],
                x: [`${startX}vw`, `${endX}vw`],
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
          );
        })}
      </div>

      {/* Main Content */}
      <AnimatePresence>
        <motion.div
          key="main"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-center space-y-6 px-4 z-20"
        >
          {/* Image above the text */}
          <motion.img
            src={welcomeImage}
            alt="Welcome"
            className="w-40 md:w-60 mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <motion.h2
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif font-bold 
                       bg-clip-text text-transparent 
                       bg-gradient-to-r from-emerald-900 via-pink-800 to-emerald-900
                       drop-shadow-lg"
          >
            Welcome to CALMANA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="text-lg md:text-2xl text-emerald-700 max-w-3xl"
          >
            Your Personal Oasis for Wellness & Calm
          </motion.p>

          {/* Pulsating Enter Button */}
          <motion.button
            onClick={() => navigate("/auth")}
            className="px-10 py-4 rounded-full font-semibold text-xl shadow-lg 
                       bg-gradient-to-r from-pink-400 via-green-400 to-teal-500 text-white tracking-wide"
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0px 0px 10px #fcd34d", "0px 0px 25px #f472b6", "0px 0px 10px #fcd34d"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
          >
            Enter
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
