import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Stethoscope, User, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const url = userType === "doctor" ? "http://localhost:5001/api/doctor/login" : "http://localhost:5001/api/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error("Server error."); }
      if (!response.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", userType);
      if (onLogin) onLogin();
      navigate(userType === "doctor" ? "/doctor-dashboard" : "/dashboard");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden
                    bg-[linear-gradient(270deg,#d9f99d,#fbcfe8,#a7f3d0,#bbf7d0,#d9f99d)]
                    bg-[length:400%_400%] animate-gradient-green-pink-shift">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/60 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-10 border border-white/40">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/50 rounded-xl mb-4 shadow-sm">
              <Sparkles className="text-emerald-600" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-emerald-950 tracking-tight">Login to Calmana</h2>
          </div>

          <div className="relative flex p-1 mb-8 bg-black/5 rounded-2xl">
            <motion.div
              animate={{ x: userType === "patient" ? "0%" : "100%" }}
              className="absolute w-1/2 h-[calc(100%-8px)] bg-white rounded-[14px] shadow-sm"
            />
            <button onClick={() => setUserType("patient")} className={`relative z-10 w-1/2 py-2.5 text-sm font-bold flex items-center justify-center gap-2 ${userType === "patient" ? "text-emerald-700" : "text-gray-500"}`}><User size={16} /> Patient</button>
            <button onClick={() => setUserType("doctor")} className={`relative z-10 w-1/2 py-2.5 text-sm font-bold flex items-center justify-center gap-2 ${userType === "doctor" ? "text-emerald-700" : "text-gray-500"}`}><Stethoscope size={16} /> Doctor</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="group relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600" size={18} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/20 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
            </div>
            <div className="group relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600" size={18} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/20 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
            </div>

            <AnimatePresence>{error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-sm text-center font-medium">{error}</motion.p>}</AnimatePresence>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <>Login <ArrowRight size={18} /></>}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-emerald-900/60 text-sm">Don’t have an account? <button onClick={() => navigate("/signup")} className="text-emerald-700 font-bold hover:underline">Sign up</button></p>
        </div>
      </motion.div>
    </div>
  );
}