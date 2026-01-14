// Updated DoctorDashboardContent.jsx with professional lucide-react icons and FIXED imports

import React from "react";
import {
  // FIX: These Card components must be imported
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button"; // FIX: Button must be imported
import { Avatar, AvatarFallback } from "./ui/avatar"; // FIX: Avatar components must be imported

import { Separator } from "./ui/separator";
import YogaImage from "../assets/calmanayogaimg.png";
import { QuickInsights } from "./QuickInsights";
import { motion } from "framer-motion";

// 1. Import professional icons from lucide-react
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
} from "lucide-react";

// Quotes
const quotes = [
  "Healing begins with a calm mind.",
  "You are doing better than you think.",
  "Every step forward is progress.",
  "Compassion leads to understanding.",
  "Clarity comes with stillness.",
];

// Stats WITH professional icons
const statsCards = [
  {
    title: "Total Patients",
    value: "234",
    change: "+12%",
    changeType: "positive",
    icon: Users, // Professional Icon
  },
  {
    title: "Appointments Today",
    value: "8",
    change: "+2",
    changeType: "positive",
    icon: CalendarCheck, // Professional Icon
  },
  {
    title: "Unread Messages",
    value: "15",
    change: "+5",
    changeType: "neutral",
    icon: Bell, // Professional Icon
  },
  {
    title: "Pending Reports",
    value: "7",
    change: "-3",
    changeType: "negative",
    icon: FileText, // Professional Icon
  },
];

const upcomingAppointments = [
  { id: 1, patient: "Emma Wilson", time: "10:30 AM", type: "Follow-up" },
  { id: 2, patient: "Michael Chen", time: "11:45 AM", type: "New Consultation" },
  { id: 3, patient: "Sarah Davis", time: "2:15 PM", type: "Therapy Session" },
];

const dailyPlannerItems = [
  ["9:00 AM", "Review patient reports", Clock],
  ["11:00 AM", "Therapy session (Michael)", Timer],
  ["1:00 PM", "Team case discussion", Briefcase],
  ["3:30 PM", "AI mood analysis review", Search],
  ["5:00 PM", "End-of-day notes", FileText],
];

const checklistItems = [
  "Respond to urgent messages",
  "Approve pending reports",
  "Prepare today’s session notes",
  "Review mood analytics",
];


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
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
        <img src={YogaImage} alt="Illustration of calming yoga pose" className="w-full h-full object-contain" />
      </div>
    </motion.section>
  );
}

export function DoctorDashboardContent({ isSidebarOpen, onStartSession, onToggleSidebar }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 bg-[length:300%_300%] animate-gradient-move p-8 space-y-10">

      {/* Announcement Bar */}
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

      {/* Top Bar WITH professional icons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="bg-white/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between rounded-2xl shadow-lg mb-3"
      >
        <div className="flex items-center gap-3">
          {/* Replaced '☰' with professional Menu icon */}
          <button onClick={onToggleSidebar} className="rounded-lg p-2 text-green-800 hover:bg-green-100">
            <Menu className="w-6 h-6" />
          </button>

          <h1 className="font-bold text-2xl text-green-800">Calmana Workspace</h1>
        </div>

        {/* Simple search bar - added a subtle icon */}
        <div className="flex-1 max-w-lg mx-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            placeholder="Search patients..."
            className="w-full rounded-full border pl-10 pr-6 py-2 bg-white shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-300"
          />
        </div>

        {/* Profile only */}
        <div className="flex items-center gap-4">
          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-green-200 text-green-700">DS</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800">Dr. Smith</p>
              <p className="text-xs text-gray-500">Psychiatrist</p>
            </div>
          </div>
        </div>
      </motion.div>

      <WelcomeBanner onStart={onStartSession} />

      {/* Stats Section WITH professional icons */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {statsCards.map((stat, i) => {
          const Icon = stat.icon; // Get the professional icon component
          return (
            <motion.div key={stat.title} custom={i} variants={fadeUp}>
              <Card className="rounded-3xl bg-white/95 p-4 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-medium text-green-700">{stat.title}</p>
                      <p className="text-4xl font-extrabold text-green-900">{stat.value}</p>
                    </div>
                    {/* Render the professional icon with subtle coloring */}
                    <Icon className="w-8 h-8 text-green-500 opacity-70" />
                  </div>

                  <p
                    className={`mt-4 text-lg font-semibold ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : stat.changeType === "neutral"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Appointments / Planner / Checklist with professional icons */}

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
                  <AvatarFallback className="text-green-800 font-bold bg-green-200/70">
                    {appt.patient[0] + appt.patient.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <p className="font-bold text-lg text-green-800">{appt.patient}</p>
                  <p className="text-green-600">{appt.type}</p>
                </div>

                <div className="text-right flex items-center gap-4">
                  <p className="text-lg font-bold text-green-800 whitespace-nowrap">{appt.time}</p>
                  <Button
                    variant="outline"
                    className="rounded-full border-green-700 text-green-700 hover:bg-green-100 hover:text-green-800 transition shadow-sm"
                  >
                    Join
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Daily Planner - Added subtle icons next to each task */}
        <Card className="rounded-3xl bg-white/95 p-7 shadow-lg hover:shadow-xl hover:scale-[1.015] transition">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Daily Planner</CardTitle>
            <CardDescription className="text-green-600">Today’s Milestones</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="border-l-4 border-green-400 pl-4 space-y-6">
              {dailyPlannerItems.map(([time, task, Icon], i) => (
                <div key={time} className="relative">
                  <div className="absolute -left-[27px] top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full bg-green-400"></div>
                  <div className="flex items-start gap-2">
                    <Icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-[2px]" />
                    <div>
                      <p className="text-green-900 font-bold">{time}</p>
                      <p className="text-green-700">{task}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Checklist - Added professional icon for the task list */}
        <Card className="rounded-3xl bg-white/95 p-7 shadow-lg hover:shadow-xl hover:scale-[1.015] transition">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Today’s Checklist</CardTitle>
            <CardDescription className="text-green-600">Important tasks to complete</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {checklistItems.map((task, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                className="flex items-center gap-3 bg-green-50 p-4 rounded-2xl shadow-sm"
              >
                {/* CheckCircle icon for visual elegance next to checkbox */}
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-green-800 flex-1">{task}</p>
                <input type="checkbox" className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
              </motion.div>
            ))}

            <Button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 shadow-lg">
              Mark All as Done
            </Button>
          </CardContent>
        </Card>
      </motion.section>

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