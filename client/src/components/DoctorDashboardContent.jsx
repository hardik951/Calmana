import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  Activity,
  AlertCircle,
  Video,
  Send
} from 'lucide-react';

const statsCards = [
  {
    title: 'Total Patients',
    value: '234',
    icon: Users,
    change: '+12%',
    changeType: 'positive',
  },
  {
    title: 'Appointments Today',
    value: '8',
    icon: Calendar,
    change: '+2',
    changeType: 'positive',
  },
  {
    title: 'Unread Messages',
    value: '15',
    icon: MessageSquare,
    change: '+5',
    changeType: 'neutral',
  },
  {
    title: 'Pending Reports',
    value: '7',
    icon: FileText,
    change: '-3',
    changeType: 'positive',
  },
];

const upcomingAppointments = [
  {
    id: 1,
    patient: 'Emma Wilson',
    time: '10:30 AM',
    type: 'Follow-up',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 2,
    patient: 'Michael Chen',
    time: '11:45 AM',
    type: 'Initial Consultation',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: 3,
    patient: 'Sarah Davis',
    time: '2:15 PM',
    type: 'Therapy Session',
    avatar: '/api/placeholder/32/32',
  },
];

const recentMessages = [
  {
    id: 1,
    patient: 'John Smith',
    message: 'Thank you for the session yesterday. I feel much better...',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    patient: 'Lisa Johnson',
    message: 'Could we reschedule tomorrow\'s appointment?',
    time: '15 min ago',
    unread: true,
  },
  {
    id: 3,
    patient: 'David Brown',
    message: 'The medication is working well. No side effects so far.',
    time: '1 hr ago',
    unread: false,
  },
];

const pendingReports = [
  {
    id: 1,
    patient: 'Alice Cooper',
    type: 'Lab Results',
    date: 'Today',
    priority: 'high',
  },
  {
    id: 2,
    patient: 'Bob Wilson',
    type: 'Psychological Assessment',
    date: 'Yesterday',
    priority: 'medium',
  },
  {
    id: 3,
    patient: 'Carol Martinez',
    type: 'Progress Report',
    date: '2 days ago',
    priority: 'low',
  },
];

export function DoctorDashboardContent() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6 space-y-6 overflow-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-calmText">Dashboard Overview</h1>
          <p className="text-grayThreeHundred mt-1">Welcome back, Dr. Sarah Johnson</p>
        </div>
        <div className="flex gap-3">
          <Button className="gradient-primary shadow-calmana-medium hover:scale-105 transition-transform">
            <Activity className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={stat.title} className="glass-morphism border-grayTwoHundred hover:shadow-calmana-medium transition-all duration-200 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-grayThreeHundred">{stat.title}</p>
                  <p className="text-2xl font-bold text-calmText">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className={`w-4 h-4 mr-1 ${stat.changeType === 'positive' ? 'text-greenFiveHundred' : 'text-grayThreeHundred'}`} />
                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-greenFiveHundred' : 'text-grayThreeHundred'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-grayThreeHundred ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="glass-morphism border-grayTwoHundred">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-calmText" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Today's scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center gap-3 p-3 rounded-lg bg-softGray hover:bg-grayOneHundred transition-colors">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                  <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-calmText">{appointment.patient}</p>
                  <p className="text-xs text-grayThreeHundred">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-calmText">{appointment.time}</p>
                  <Button size="sm" variant="outline" className="mt-1">
                    <Video className="w-3 h-3 mr-1 text-calmText" />
                    Join
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 text-calmText">
              <Calendar className="w-4 h-4 mr-2 text-calmText" />
              View All Appointments
            </Button>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="glass-morphism border-grayTwoHundred">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-calmText" />
              Recent Messages
            </CardTitle>
            <CardDescription>Latest patient communications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg bg-softGray hover:bg-grayOneHundred transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-calmText">{message.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-calmText">{message.patient}</p>
                    {message.unread && <div className="w-2 h-2 rounded-full bg-emeraldSixHundred animate-pulse-soft" />}
                  </div>
                  <p className="text-xs text-grayThreeHundred truncate">{message.message}</p>
                  <p className="text-xs text-grayThreeHundred mt-1">{message.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 text-calmText">
              <Send className="w-4 h-4 mr-2 text-calmText" />
              View All Messages
            </Button>
          </CardContent>
        </Card>

        {/* Pending Reports */}
        <Card className="glass-morphism border-grayTwoHundred">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-calmText" />
              Pending Reports
            </CardTitle>
            <CardDescription>Reports awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingReports.map((report) => (
              <div key={report.id} className="flex items-center gap-3 p-3 rounded-lg bg-softGray hover:bg-grayOneHundred transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-calmText">{report.patient}</p>
                  <p className="text-xs text-grayThreeHundred">{report.type}</p>
                  <p className="text-xs text-grayThreeHundred">{report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={report.priority === 'high' ? 'destructive' : report.priority === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {report.priority}
                  </Badge>
                  {report.priority === 'high' && <AlertCircle className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 text-calmText">
              <FileText className="w-4 h-4 mr-2 text-calmText" />
              Review All Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <Card className="glass-morphism border-grayTwoHundred">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions for efficient workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 border-grayTwoHundred hover:bg-grayOneHundred text-calmText">
              <Activity className="w-6 h-6 text-calmText" />
              <span className="text-sm">Start Session</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 border-grayTwoHundred hover:bg-grayOneHundred text-calmText">
              <MessageSquare className="w-6 h-6 text-calmText" />
              <span className="text-sm">Send Message</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 border-grayTwoHundred hover:bg-grayOneHundred text-calmText">
              <Calendar className="w-6 h-6 text-calmText" />
              <span className="text-sm">Schedule Appointment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 border-grayTwoHundred hover:bg-grayOneHundred text-calmText">
              <FileText className="w-6 h-6 text-calmText" />
              <span className="text-sm">Create Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
