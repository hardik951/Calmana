import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, CreditCard, Stethoscope, Calendar, Award, Upload, Loader2, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [license, setLicense] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const url = userType === "doctor" ? "http://localhost:5001/api/doctor/signup" : "http://localhost:5001/api/signup";
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("aadhaar", aadhaar);
      if (userType === "doctor") {
        formData.append("name", fullName);
        formData.append("specialization", specialization);
        formData.append("license", license);
        formData.append("aadhaarImage", aadhaarImage);
        formData.append("licenseImage", licenseImage);
      } else {
        formData.append("username", fullName);
        formData.append("dob", dob);
      }
      const response = await fetch(url, { method: "POST", body: formData });
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } catch { throw new Error("Invalid response."); }
      if (!response.ok) throw new Error(data.message || "Signup failed");
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", userType);
      }
      navigate(userType === "doctor" ? "/doctor-dashboard" : "/dashboard");
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-6 overflow-hidden
                    bg-[linear-gradient(270deg,#d9f99d,#fbcfe8,#a7f3d0,#bbf7d0,#d9f99d)]
                    bg-[length:400%_400%] animate-gradient-green-pink-shift">
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-xl">
        <div className="bg-white/60 backdrop-blur-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-12 border border-white/40">
          <h2 className="text-3xl font-bold text-emerald-950 text-center mb-8">Create Calmana Account</h2>

          <div className="relative flex p-1.5 mb-8 bg-black/5 rounded-2xl">
            <motion.div layoutId="signupTab" animate={{ x: userType === "patient" ? 0 : "100%" }} className="absolute w-[calc(50%-6px)] h-[calc(100%-12px)] bg-white rounded-xl shadow-sm" />
            <button onClick={() => setUserType("patient")} className={`relative z-10 w-1/2 py-2 text-sm font-bold flex items-center justify-center gap-2 ${userType === "patient" ? "text-emerald-700" : "text-gray-500"}`}><User size={18} /> Patient</button>
            <button onClick={() => setUserType("doctor")} className={`relative z-10 w-1/2 py-2 text-sm font-bold flex items-center justify-center gap-2 ${userType === "doctor" ? "text-emerald-700" : "text-gray-500"}`}><Stethoscope size={18} /> Doctor</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-2xl outline-none focus:border-emerald-500 transition-all" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-2xl outline-none focus:border-emerald-500 transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-2xl outline-none focus:border-emerald-500 transition-all" />
              <input type="text" placeholder="Aadhaar (12 digits)" value={aadhaar} maxLength="12" onChange={(e) => setAadhaar(e.target.value)} required className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-2xl outline-none focus:border-emerald-500 transition-all" />
            </div>

            <AnimatePresence mode="wait">
              {userType === "doctor" ? (
                <motion.div key="doctor" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="License No" value={license} onChange={(e) => setLicense(e.target.value)} required className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-2xl outline-none focus:border-emerald-500 transition-all" />
                    <input type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-2xl outline-none focus:border-emerald-500 transition-all" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col items-center p-3 border-2 border-dashed border-emerald-200 rounded-2xl bg-white/30 cursor-pointer hover:bg-white/50 transition-all">
                      <Upload size={16} className="text-emerald-600 mb-1" />
                      <span className="text-[10px] text-emerald-800 truncate w-full text-center">{aadhaarImage ? aadhaarImage.name : "Aadhaar Image"}</span>
                      <input type="file" className="hidden" onChange={(e) => setAadhaarImage(e.target.files[0])} required />
                    </label>
                    <label className="flex flex-col items-center p-3 border-2 border-dashed border-emerald-200 rounded-2xl bg-white/30 cursor-pointer hover:bg-white/50 transition-all">
                      <Upload size={16} className="text-emerald-600 mb-1" />
                      <span className="text-[10px] text-emerald-800 truncate w-full text-center">{licenseImage ? licenseImage.name : "License Image"}</span>
                      <input type="file" className="hidden" onChange={(e) => setLicenseImage(e.target.files[0])} required />
                    </label>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="patient" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="relative overflow-hidden">
                  <label className="text-xs font-semibold text-emerald-900/60 ml-2">Date of Birth</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-2xl outline-none focus:border-emerald-500 transition-all" />
                </motion.div>
              )}
            </AnimatePresence>

            {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 transition-all mt-4">
              {loading ? <Loader2 className="animate-spin" /> : <>Get Started <ArrowRight size={18}/></>}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}