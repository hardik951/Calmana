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
import {
  Calendar,
  MessageSquare,
  FileText,
  TrendingUp,
  Users,
  Video,
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

import { Separator } from "./ui/separator";
import YogaImage from "../assets/calmanayogaimg.png";
import { QuickInsights } from "./QuickInsights";
import { motion } from "framer-motion";

/* ----------------------------- Quotes of the Day ----------------------------- */

const quotes = [
  "Healing begins with a calm mind.",
  "You are doing better than you think.",
  "Every step forward is progress.",
  "Compassion leads to understanding.",
  "Clarity comes with stillness."
];

/* ----------------------------- Stats Data ----------------------------- */

const statsCards = [
  { title: "Total Patients", value: "234", icon: Users, change: "+12%", changeType: "positive" },
  { title: "Appointments Today", value: "8", icon: Calendar, change: "+2", changeType: "positive" },
  { title: "Unread Messages", value: "15", icon: MessageSquare, change: "+5", changeType: "neutral" },
  { title: "Pending Reports", value: "7", icon: FileText, change: "-3", changeType: "negative" },
];

const upcomingAppointments = [
  { id: 1, patient: "Emma Wilson", time: "10:30 AM", type: "Follow-up" },
  { id: 2, patient: "Michael Chen", time: "11:45 AM", type: "New Consultation" },
  { id: 3, patient: "Sarah Davis", time: "2:15 PM", type: "Therapy Session" },
];

/* ----------------------------- Animations ----------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

/* ----------------------------- Welcome Banner ----------------------------- */

function WelcomeBanner({ onStart }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full rounded-3xl bg-white/90 shadow-xl flex flex-col md:flex-row items-center justify-between px-10 py-10 mb-10"
    >
      <div className="flex-1">
        <h2 className="text-4xl font-extrabold text-green-800 mb-3">
          Calmana – <span className="text-green-600">Doctor’s Workspace</span>
        </h2>
        <p className="text-green-700 text-lg mb-6 max-w-xl leading-relaxed">
          Manage consultations, check insights, and guide users—all in a calm, focused environment.
        </p>

        <Button
          onClick={onStart}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-green-700 transition"
        >
          Start a Session
        </Button>
      </div>

      <div className="flex-shrink-0 w-40 h-40 md:w-56 md:h-56 mt-6 md:mt-0 md:ml-10">
        <img src={YogaImage} alt="" className="w-full h-full object-contain" />
      </div>
    </motion.section>
  );
}

/* ----------------------------- Main Component ----------------------------- */

export function DoctorDashboardContent({
  isSidebarOpen,
  onStartSession,
  onToggleSidebar,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 bg-[length:300%_300%] animate-gradient-move p-8 space-y-10">

      {/* -------------------- ANNOUNCEMENT BAR (Now on Top) -------------------- */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full overflow-hidden rounded-xl bg-white/60 backdrop-blur-md shadow border border-white/30"
      >
        <div className="whitespace-nowrap animate-scroll text-center py-3 text-green-800 font-medium text-sm tracking-wide">
          {quotes[Math.floor(Math.random() * quotes.length)]}
        </div>
      </motion.div>

      {/* ----------------------- SEARCH + PROFILE BAR (No main header) ----------------------- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between rounded-2xl shadow-lg mb-3"
      >
        <div className="flex items-center gap-3">
          <Button onClick={onToggleSidebar} variant="ghost" size="icon" className="rounded-lg hover:bg-green-100">
            <Menu className="h-6 w-6 text-green-700" />
          </Button>

          <h1 className="font-bold text-2xl text-green-800">
            Calmana Workspace
          </h1>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              placeholder="Search patients..."
              className="w-full rounded-full border px-12 py-2 bg-white shadow-sm focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        {/* Icons + Profile */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-green-200 text-green-700">DS</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800">Dr. Smith</p>
              <p className="text-xs text-gray-500">Psychiatrist</p>
            </div>
            <ChevronDown className="text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* -------------------- WELCOME BANNER -------------------- */}
      <WelcomeBanner onStart={onStartSession} />

      {/* -------------------- STATS SECTION --------------------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {statsCards.map((stat, i) => (
          <motion.div key={stat.title} custom={i} variants={fadeUp}>
            <Card className="rounded-3xl bg-white/95 p-4 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-green-700">{stat.title}</p>
                    <p className="text-4xl font-extrabold text-green-900">{stat.value}</p>
                  </div>

                  <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-green-500">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <p
                  className={`mt-4 flex items-center text-lg font-semibold ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "neutral"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUp className="w-5 h-5 mr-2" /> {stat.change}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      {/* -------------------- APPOINTMENTS + PLANNER + CHECKLIST -------------------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4"
      >
        {/* Appointments */}
        <Card className="rounded-3xl bg-white/95 p-7 shadow-lg hover:shadow-xl hover:scale-[1.015] transition">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Upcoming Appointments</CardTitle>
            <CardDescription className="text-green-600">Today’s Schedule</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {upcomingAppointments.map((appt, i) => (
              <motion.div
                key={appt.id}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-4 rounded-2xl bg-green-50 p-4 hover:bg-green-100 transition"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-green-800 font-bold">
                    {appt.patient[0] + appt.patient.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-bold text-lg text-green-800">{appt.patient}</p>
                  <p className="text-green-600">{appt.type}</p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-green-800">{appt.time}</p>
                  <Button
                    variant="outline"
                    className="mt-2 rounded-xl border-green-700 text-green-700 hover:bg-green-100"
                  >
                    <Video className="w-4 h-4 mr-2" /> Join
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Daily Planner */}
        <Card className="rounded-3xl bg-white/95 p-7 shadow-lg hover:shadow-xl hover:scale-[1.015] transition">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Daily Planner</CardTitle>
            <CardDescription className="text-green-600">Today’s Milestones</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="border-l-4 border-green-400 pl-4 space-y-6">
              {[["9:00 AM", "Review patient reports"],
                ["11:00 AM", "Therapy session (Michael)"],
                ["1:00 PM", "Team case discussion"],
                ["3:30 PM", "AI mood analysis review"],
                ["5:00 PM", "End-of-day notes"],
              ].map(([time, task]) => (
                <div key={time}>
                  <p className="text-green-900 font-bold">{time}</p>
                  <p className="text-green-700">{task}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card className="rounded-3xl bg-white/95 p-7 shadow-lg hover:shadow-xl hover:scale-[1.015] transition">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Today’s Checklist</CardTitle>
            <CardDescription className="text-green-600">Important tasks to complete</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {[
              "Respond to urgent messages",
              "Approve pending reports",
              "Prepare today’s session notes",
              "Review mood analytics",
            ].map((task, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-3 bg-green-50 p-4 rounded-2xl"
              >
                <input type="checkbox" className="mt-1 h-5 w-5" />
                <p className="text-green-800">{task}</p>
              </motion.div>
            ))}

            <Button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
              Mark All as Done
            </Button>
          </CardContent>
        </Card>
      </motion.section>

      {/* -------------------- Quick Insights -------------------- */}
      <motion.section variants={fadeUp} initial="hidden" animate="visible" className="mt-10">
        <QuickInsights
          patientEngagement={{ value: "92%", change: "+5%" }}
          avgSessionTime={{ value: "45min", note: "Normal range" }}
          satisfactionRate={{ value: "4.8/5", note: "Based on 500 reviews" }}
        />
      </motion.section>

    </div>
  );
}
