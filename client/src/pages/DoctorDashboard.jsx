import React, { useState } from "react";
import { DoctorSidebar } from "../components/DoctorSidebar";
import { DoctorDashboardContent } from "../components/DoctorDashboardContent";
import { DoctorSession } from "./DoctorSession";
import { motion } from "framer-motion";

export default function DoctorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleStartSession = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSessionActive(true);
      setIsSidebarOpen(false);
    }, 600);
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setIsSidebarOpen(true);
  };

  // Smooth fade-up animation
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-pink-50 to-green-100 pb-10">

      {/* ---- MAIN LAYOUT ---- */}
      <div className="flex flex-grow px-4 md:px-6 pt-6">

        {/* LEFT SIDEBAR */}
        {!isSessionActive && isSidebarOpen && (
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="
              sticky top-6 h-full 
              max-h-[calc(100vh-60px)] w-64
              bg-white/60 backdrop-blur-xl 
              border border-white/40 shadow-lg rounded-2xl
              overflow-hidden mr-4 z-20
            "
          >
            <DoctorSidebar />
          </motion.aside>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 transition-all duration-300">

          {/* LOADING SPINNER */}
          {isLoading && (
            <div className="flex items-center justify-center h-[60vh]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full"
              />
            </div>
          )}

          {/* CONTENT SWITCH */}
          {!isLoading &&
            (isSessionActive ? (
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <DoctorSession onEndSession={handleEndSession} />
              </motion.div>
            ) : (
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <DoctorDashboardContent
                  isSidebarOpen={isSidebarOpen}
                  onToggleSidebar={toggleSidebar}
                  onStartSession={handleStartSession}
                />
              </motion.div>
            ))}
        </main>
      </div>
    </div>
  );
}
