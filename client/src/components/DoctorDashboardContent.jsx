import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Users,
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
  MessageCircle,
  Bell,
  ChevronDown,
} from "lucide-react";
import { QuickInsights } from "./QuickInsights";

const statsCards = [
  {
    title: "Total Patients",
    value: "234",
    icon: Users,
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

export function DoctorDashboardContent({ isSidebarOpen }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-pink-100 to-green-200 p-4 space-y-4 overflow-auto w-full">
      {/* Header */}
      <div className="flex items-center w-full gap-6">
        {!isSidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white">
              <span className="text-xl">⚕️</span>
            </div>
            <h1 className="font-bold text-xl text-green-800">Calmana</h1>
          </div>
        )}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent text-gray-800 placeholder-gray-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">3</span>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">5</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-sm">
              DS
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-gray-800 text-sm">Dr. Smith</p>
              <p className="text-xs text-gray-500">Psychiatrist</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="flex items-center justify-between mt-2 w-full">
        <div>
          <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-green-800" />
            Dashboard Overview
          </h2>
          <p className="text-green-600 mt-1">Welcome back, Dr. Sarah Johnson</p>
        </div>
        <div>
          <Button className="bg-green-700 text-white hover:bg-green-800">
            <Activity className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-6 w-full">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-green-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className={`w-4 h-4 mr-1 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-green-600'}`} />
                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-500' : 'text-green-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-green-600 ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {/* Upcoming Appointments */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Calendar className="w-5 h-5 text-green-800" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription className="text-green-600">Today's scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                  <AvatarFallback className="text-green-800">
                    {appointment.patient.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-green-800">{appointment.patient}</p>
                  <p className="text-xs text-green-600">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-800">{appointment.time}</p>
                  <Button size="sm" variant="outline" className="mt-1 text-green-700 border-green-700 hover:bg-green-100">
                    <Video className="w-3 h-3 mr-1 text-green-700" />
                    Join
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 text-green-700 border-green-700 hover:bg-green-100">
              <Calendar className="w-4 h-4 mr-2 text-green-700" />
              View All Appointments
            </Button>
          </CardContent>
        </Card>
        {/* Recent Messages */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <MessageSquare className="w-5 h-5 text-green-800" />
              Recent Messages
            </CardTitle>
            <CardDescription className="text-green-600">Latest patient communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-green-800">
                    {message.patient.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-green-800">{message.patient}</p>
                    {message.unread && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />}
                  </div>
                  <p className="text-xs text-green-600 truncate">{message.message}</p>
                  <p className="text-xs text-green-600 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 text-green-700 border-green-700 hover:bg-green-100">
              <Send className="w-4 h-4 mr-2 text-green-700" />
              View All Messages
            </Button>
          </CardContent>
        </Card>
        {/* Pending Reports */}
        <Card className="bg-white/80 backdrop-blur-sm border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <FileText className="w-5 h-5 text-green-800" />
              Pending Reports
            </CardTitle>
            <CardDescription className="text-green-600">Reports awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingReports.map((report) => (
              <div key={report.id} className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-green-800">{report.patient}</p>
                  <p className="text-xs text-green-600">{report.type}</p>
                  <p className="text-xs text-green-600">{report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={report.priority === "high" ? "destructive" : report.priority === "medium" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {report.priority}
                  </Badge>
                  {report.priority === "high" && <AlertCircle className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 text-green-700 border-green-700 hover:bg-green-100">
              <FileText className="w-4 h-4 mr-2 text-green-700" />
              Review All Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights Section */}
      <QuickInsights
        patientEngagement={{ value: "92%", change: "+5%" }}
        avgSessionTime={{ value: "45min", note: "Within target range" }}
        satisfactionRate={{ value: "4.8/5", note: "Based on 500 reviews" }}
      />
    </div>
  );
}
