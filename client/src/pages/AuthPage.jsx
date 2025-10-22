import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, UserPlus, UserCircle, Calendar, MessageSquare, Heart } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12
                    bg-[linear-gradient(270deg,#d9f99d,#fbcfe8,#a7f3d0,#bbf7d0,#d9f99d)]
                    bg-[length:400%_400%] animate-gradient-green-pink-shift">

      {/* Logo / Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 mb-2">Calmana</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Mental Health Platform</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Connecting patients with mental health resources and guidance through
          our comprehensive platform. Start your journey toward wellness today.
        </p>
      </motion.div>

      {/* Auth Buttons */}
      <motion.div
        className="flex flex-col items-center gap-3 mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="flex gap-4">
          {/* Login */}
          <motion.button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(16,185,129,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn size={20} /> Login
          </motion.button>

          {/* Sign Up */}
          <motion.button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus size={20} /> Sign Up
          </motion.button>
        </div>

        {/* Guest Button */}
        <motion.button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-emerald-700 font-medium text-base transition-colors duration-300 mt-2"
          whileHover={{ scale: 1.03, color: "#065f46" }}
          whileTap={{ scale: 0.97 }}
        >
          <UserCircle size={20} /> Continue as Guest
        </motion.button>
      </motion.div>

      {/* Feature Highlights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {[
          { icon: Calendar, title: "Easy Scheduling", desc: "Book and manage appointments seamlessly with just a few clicks." },
          { icon: MessageSquare, title: "Secure Messaging", desc: "Communicate safely with your mental health support system." },
          { icon: Heart, title: "Personal Care", desc: "Tailored mental health support designed for your unique needs." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-md transition p-6 text-center cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 * i }}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0 12px 30px rgba(16,185,129,0.25)" }}
          >
            <feature.icon className="mx-auto text-emerald-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
