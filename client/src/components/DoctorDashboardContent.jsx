// DoctorDashboardContent.jsx — FINAL (with Logout)

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import YogaImage from "../assets/calmanayogaimg.png";
import { QuickInsights } from "./QuickInsights";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔥 NEW

import {
  Users,
  CalendarCheck,
  Bell,
  FileText,
  Menu,
  Timer,
  CheckCircle,
  Clock,
  Briefcase,
  Search,
  LogOut, // 🔥 NEW ICON
} from "lucide-react";

const API_BASE = "http://localhost:5001";

const quotes = [
  "Healing begins with a calm mind.",
  "You are doing better than you think.",
  "Every step forward is progress.",
  "Compassion leads to understanding.",
  "Clarity comes with stillness.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
};

function WelcomeBanner({ onStart }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full rounded-3xl bg-white/90 shadow-xl flex flex-col md:flex-row items-center justify-between px-10 py-10 mb-10"
    >
      <div>
        <h2 className="text-4xl font-extrabold text-green-800 mb-3">
          Calmana – Doctor’s Workspace
        </h2>
        <p className="text-green-700 text-lg mb-6 max-w-xl">
          Review appointment requests and manage sessions calmly.
        </p>
        <Button
          onClick={onStart}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold"
        >
          Start a Session
        </Button>
      </div>
      <img src={YogaImage} alt="Yoga" className="w-48 mt-6 md:mt-0" />
    </motion.section>
  );
}

export function DoctorDashboardContent({
  onStartSession,
  onToggleSidebar,
  appointments,
  setAppointments,
}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // 🔥 NEW

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  // ================= ACCEPT / REJECT =================
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/api/appointments/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? res.data : a))
      );
    } catch (err) {
      console.error("Failed to update appointment", err);
    }
  };

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending"
  );

  return (
    <div className="p-8 space-y-10">
      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between bg-white/80 px-6 py-4 rounded-2xl shadow">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar}>
            <Menu className="w-6 h-6 text-green-800" />
          </button>
          <h1 className="text-2xl font-bold text-green-800">
            Appointment Requests
          </h1>
        </div>

        {/* 🔥 LOGOUT BUTTON */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2 border-red-400 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      <WelcomeBanner onStart={onStartSession} />

      {/* ================= APPOINTMENT REQUESTS ================= */}
      <Card className="rounded-3xl bg-white p-7 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-green-800">
            Pending Appointment Requests
          </CardTitle>
          <CardDescription>
            Accept or reject patient requests
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {pendingAppointments.length === 0 && (
            <p className="text-gray-500 text-center">
              No pending appointment requests
            </p>
          )}

          {pendingAppointments.map((appt, i) => (
            <motion.div
              key={appt._id}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate="visible"
              className="flex items-center justify-between bg-green-50 p-4 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-green-200 text-green-800">
                    {appt.patient.username[0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-bold text-green-800">
                    {appt.patient.username}
                  </p>
                  <p className="text-sm text-green-600">
                    {appt.date} at {appt.time}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => updateStatus(appt._id, "accepted")}
                  className="bg-green-600 text-white"
                >
                  Accept
                </Button>

                <Button
                  onClick={() => updateStatus(appt._id, "rejected")}
                  variant="outline"
                  className="border-red-400 text-red-600"
                >
                  Reject
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <QuickInsights
        patientEngagement={{ value: "92%", change: "+5%" }}
        avgSessionTime={{ value: "45min", note: "Normal range" }}
        satisfactionRate={{ value: "4.8/5", note: "Based on 500 reviews" }}
      />
    </div>
  );
}
