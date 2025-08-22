import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const text = "CALMANA".split("");

  // Container for staggering letter animations
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.35 },
    },
  };

  // Letters animate in then drift out right
  const letter = {
    hidden: { x: -200, opacity: 0, scale: 0.8, rotate: -15 },
    visible: {
      x: [0, 320],
      opacity: [1, 0],
      scale: [1.2, 1],
      rotate: [0, 8],
      transition: { duration: 1.8, ease: "easeInOut" },
    },
  };

  // Leaf floating gently
  const leaf = {
    hidden: { x: -100, y: 0, rotate: -15, opacity: 0 },
    visible: {
      x: ["-5%", "110%"],
      y: [0, -25, 10, -15, 0],
      rotate: [-15, 15, -8, 12, 0],
      opacity: [0, 1, 1, 0.5, 0],
      transition: {
        duration: 5.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-50 via-emerald-100 to-green-200 p-6 overflow-hidden relative">
      {/* Leaf drifting */}
      <motion.span
        className="absolute top-28 text-5xl select-none"
        variants={leaf}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        🍃
      </motion.span>

      {/* CALMANA letters */}
      <motion.div
        className="grid grid-cols-7 w-full max-w-6xl mt-20 mb-16 select-none"
        variants={container}
        initial="hidden"
        animate="visible"
        aria-label="Animated CALMANA Text"
        role="heading"
        aria-level={1}
      >
        {text.map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            className="text-7xl md:text-8xl font-extrabold text-emerald-700 drop-shadow-md flex justify-center"
            aria-hidden="false"
            aria-label={char}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-6 select-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: text.length * 0.35 + 0.5,
          ease: "easeOut",
        }}
        role="heading"
        aria-level={2}
      >
        Welcome to Calmana
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-green-700 font-medium mb-12 text-center max-w-2xl leading-relaxed select-none"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: text.length * 0.35 + 1.2,
          ease: "easeOut",
        }}
      >
        Your personal oasis for{" "}
        <span className="font-semibold text-emerald-700">wellness</span> and{" "}
        <span className="font-semibold text-green-800">calm</span>.
      </motion.p>

      {/* Enter button with smooth entrance and flicker */}
      <motion.button
        className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-400 text-white px-10 py-4 rounded-full shadow-xl text-lg font-semibold tracking-wide flex items-center gap-3 transition-transform transform focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-60 select-none justify-center"
        onClick={() => navigate("/auth")}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: [0, 1, 0.8, 1, 0.85, 1], // flicker effect
          y: 0,
        }}
        transition={{
          opacity: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 3,
            ease: "easeInOut",
            delay: text.length * 0.35 + 1.8,
          },
          y: { type: "spring", stiffness: 120, damping: 20, duration: 1 },
        }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(34,197,94,0.8)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Enter Calmana"
      >
        <span className="text-2xl" aria-hidden="true">
          🍃
        </span>{" "}
        Enter Calmana
      </motion.button>
    </div>
  );
}
