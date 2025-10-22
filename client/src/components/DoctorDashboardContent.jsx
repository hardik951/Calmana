import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Calendar,
  MessageSquare,
  FileText,
  TrendingUp,
  Activity,
  AlertCircle,
  Video,
  Send,
  LayoutDashboard,
  Search,
  Bell,
  ChevronDown,
  Users, // <-- Added Users
  Menu,   // <-- Added Menu
} from "lucide-react";
import { Separator } from "./ui/separator"; // <-- Added Separator
import { QuickInsights } from "./QuickInsights";

// Optional: Your image asset path
import YogaImage from "../assets/calmanayogaimg.png";

// Data arrays for stats, appointments, messages, reports
const statsCards = [
  {
    title: "Total Patients",
    value: "234",
    icon: Users, // <-- Fixed icon
    change: "+12%",
    changeType: "positive",
  },
  {
    title: "Appointments Today",
    value: "8",
    icon: Calendar,
    change: "+2",
    changeType: "positive",
  },
  {
    title: "Unread Messages",
    value: "15",
    icon: MessageSquare,
    change: "+5",
    changeType: "neutral",
  },
  {
    title: "Pending Reports",
    value: "7",
    icon: FileText,
    change: "-3",
    changeType: "positive",
  },
];

// ... (upcomingAppointments, recentMessages, pendingReports arrays remain the same) ...
const upcomingAppointments = [
  {
    id: 1,
    patient: "Emma Wilson",
    time: "10:30 AM",
    type: "Follow-up",
    avatar: "/api/placeholder/32/32",
  },
  {
    id: 2,
    patient: "Michael Chen",
    time: "11:45 AM",
    type: "Initial Consultation",
    avatar: "/api/placeholder/32/32",
  },
  {
    id: 3,
    patient: "Sarah Davis",
    time: "2:15 PM",
    type: "Therapy Session",
    avatar: "/api/placeholder/32/32",
  },
];

const recentMessages = [
  {
    id: 1,
    patient: "John Smith",
    message: "Thank you for the session yesterday. I feel much better...",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    patient: "Lisa Johnson",
    message: "Could we reschedule tomorrow's appointment?",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    patient: "David Brown",
    message: "The medication is working well. No side effects so far.",
    time: "1 hr ago",
    unread: false,
  },
];

const pendingReports = [
  {
    id: 1,
    patient: "Alice Cooper",
    type: "Lab Results",
    date: "Today",
    priority: "high",
  },
  {
    id: 2,
    patient: "Bob Wilson",
    type: "Psychological Assessment",
    date: "Yesterday",
    priority: "medium",
  },
  {
    id: 3,
    patient: "Carol Martinez",
    type: "Progress Report",
    date: "2 days ago",
    priority: "low",
  },
];


// Welcome banner component
function WelcomeBanner({ onStart }) {
  return (
    <section className="w-full rounded-2xl bg-white/80 shadow-lg flex flex-col md:flex-row items-center justify-between px-10 py-8 mb-8 animate-fade-in-up">
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
          Calmana – <span className="text-green-600">Your Space to Care</span>
        </h2>
        <p className="text-green-700 text-lg mb-6 max-w-xl">
          Calmana is here to help you connect, guide, and support your patients effectively. Join our network to provide professional care in a calm, focused, and secure environment.
        </p>
        <button
          onClick={onStart} // <-- This is the correct button
          className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition"
        >
          Start your Upcoming Session
        </button>
      </div>
      <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-10 w-36 h-36 md:w-48 md:h-48 flex items-center justify-center">
        <img
          src={YogaImage}
          alt="Yoga Emote"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
}

// Renamed props to match what DoctorDashboard is sending
export function DoctorDashboardContent({ 
  isSidebarOpen, 
  onStartSession, 
  onToggleSidebar 
}) {
  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100
        bg-[length:300%_300%]
        animate-gradient-green-pink-shift
        p-8 space-y-10 w-full overflow-x-hidden
      "
    >
      {/* ===== HEADER - MORE PROFESSIONAL ===== */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-md mb-6 rounded-2xl">
        
        {/* Left Section: Toggle + Brand */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onToggleSidebar} // <-- Wired to the toggle function
            variant="ghost"
            size="icon"
            className="rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-green-700" />
            <h1 className="font-bold text-2xl text-green-800">Calmana</h1>
          </div>
        </div>

        {/* Center Section: Search Field */}
        <div className="flex-1 max-w-lg mx-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full rounded-full border border-gray-300 bg-white/90 px-12 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section: Icons + Profile */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              5
            </span>
          </Button>

          {/* Separator */}
          <Separator orientation="vertical" className="h-6" />

          {/* Profile Display */}
          <div className="flex cursor-pointer items-center gap-3 select-none">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-green-100 text-green-700 font-bold">
                DS
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="text-sm font-semibold text-gray-900">
                Dr. Smith
              </div>
              <div className="text-xs text-gray-500">Psychiatrist</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <WelcomeBanner onStart={onStartSession} /> 

      {/* Dashboard Overview */}
      <section className="flex flex-col md:flex-row justify-between gap-8">
        <div>
          <h2 className="flex items-center gap-3 text-4xl font-extrabold text-green-800">
            <LayoutDashboard className="h-10 w-10 text-green-700" />
            Dashboard Overview
          </h2>
          <p className="mt-2 text-xl text-green-600">
            Welcome back,{" "}
            <span className="font-semibold text-green-800">
              Dr. Sarah Johnson
            </span>
          </p>
        </div>
        
        {/* "GO LIVE" BUTTON - onClick prop is correctly removed */}
        <Button 
          className="rounded-2xl bg-green-700 px-8 py-4 text-lg font-semibold text-white hover:bg-green-800"
        >
          <Activity className="mr-2 h-6 w-6" />
          Go Live
        </Button>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card
            key={stat.title}
            className="rounded-3xl bg-white/95 p-3 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
          >
            <CardContent className="p-8">
              <div className="flex justify-between">
                <div>
                  <p className="mb-0 text-lg font-medium text-green-700">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-extrabold text-green-900">
                    {stat.value}
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500">
                  <stat.icon className="h-9 w-9 text-white" />
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <TrendingUp
                  className={`mr-2 h-5 w-5 ${
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : stat.changeType === "neutral"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                />
                <p
                  className={`mb-0 text-lg font-semibold ${
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : stat.changeType === "neutral"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </p>
                <p className="ml-2 text-sm text-green-600">from last week</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Upcoming Appointments */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-4">
        <Card className="col-span-1 rounded-3xl bg-white/95 p-7 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-green-800">
              <Calendar className="w-7 h-7 text-green-700" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription className="text-green-600 text-base">
              Today's scheduled sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center gap-4 rounded-2xl bg-green-50 p-4 transition-colors hover:bg-green-100"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={appointment.avatar}
                    alt={appointment.patient}
                  />
                  <AvatarFallback className="text-green-800 text-lg">
                    {appointment.patient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-lg text-green-800">
                    {appointment.patient}
                  </p>
                  <p className="text-base text-green-600">
                    {appointment.type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-800">
                    {appointment.time}
                  </p>
                  <Button
                    size="lg"
                    variant="outline"
                    className="mt-2 rounded-xl border-green-700 text-green-700 hover:bg-green-100"
                  >
                    <Video className="mr-2 w-4 h-4 text-green-700" />
                    Join
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full rounded-xl border-green-700 py-3 text-green-700 hover:bg-green-100 mt-6 text-lg"
            >
              <Calendar className="mr-3 w-5 h-5 text-green-700" />
              View All Appointments
            </Button>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="col-span-1 rounded-3xl bg-white/95 p-7 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-green-800">
              <MessageSquare className="w-7 h-7 text-green-700" />
              Recent Messages
            </CardTitle>
            <CardDescription className="text-green-600 text-base">
              Latest patient communications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-start gap-4 rounded-2xl bg-green-50 p-4 transition-colors hover:bg-green-100"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-green-800 text-lg">
                    {message.patient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-lg text-green-800">
                      {message.patient}
                    </p>
                    {message.unread && (
                      <div className="animate-pulse w-3 h-3 rounded-full bg-green-500" />
                    )}
                  </div>
                  <p className="truncate text-base text-green-700">
                    {message.message}
                  </p>
                  <p className="mt-1 text-base text-green-500">
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full rounded-xl border-green-700 py-3 text-green-700 hover:bg-green-100 mt-6 text-lg"
            >
              <Send className="mr-3 w-5 h-5 text-green-700" />
              View All Messages
            </Button>
          </CardContent>
        </Card>

        {/* Pending Reports */}
        <Card className="col-span-1 rounded-3xl bg-white/95 p-7 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-green-800">
              <FileText className="w-7 h-7 text-green-700" />
              Pending Reports
            </CardTitle>
            <CardDescription className="text-green-600 text-base">
              Reports awaiting review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {pendingReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center gap-4 rounded-2xl bg-green-50 p-4 transition-colors hover:bg-green-100"
              >
                <div className="flex-1">
                  <p className="font-semibold text-lg text-green-800">
                    {report.patient}
                  </p>
                  <p className="text-base text-green-600">{report.type}</p>
                  <p className="text-base text-green-600">{report.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      report.priority === "high"
                        ? "destructive"
                        : report.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                    className="capitalize px-2 py-1 text-base"
                  >
                    {report.priority}
                  </Badge>
                  {report.priority === "high" && (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full rounded-xl border-green-700 py-3 text-green-700 hover:bg-green-100 mt-6 text-lg"
            >
              <FileText className="mr-3 w-5 h-5 text-green-700" />
              Review All Reports
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Quick Insights Section */}
      <section className="mt-10">
        <QuickInsights
          patientEngagement={{ value: "92%", change: "+5%" }}
          avgSessionTime={{ value: "45min", note: "Within target range" }}
          satisfactionRate={{ value: "4.8/5", note: "Based on 500 reviews" }}
        />
      </section>
    </div>
  );
}