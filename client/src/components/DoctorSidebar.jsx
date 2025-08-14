// src/components/DoctorSidebar.jsx
import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Users, 
  Settings,
  Stethoscope,
  Bell,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, url: '/doctor-dashboard', badge: null },
  { title: 'Appointments', icon: Calendar, url: '/doctor-dashboard/appointments', badge: 3 },
  { title: 'Messages', icon: MessageSquare, url: '/doctor-dashboard/messages', badge: 8 },
  { title: 'Patient Reports', icon: FileText, url: '/doctor-dashboard/reports', badge: 5 },
  { title: 'Patients Directory', icon: Users, url: '/doctor-dashboard/patients', badge: null },
  { title: 'Settings', icon: Settings, url: '/doctor-dashboard/settings', badge: null },
];

export function DoctorSidebar() {
  return (
    <div className="border-r border-primary/20 min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-sidebar-foreground">Calmana</h2>
            <p className="text-sm text-sidebar-foreground/60">Doctor Portal</p>
          </div>
        </div>
      </div>
    
      {/* Sidebar Content */}
      <div className="p-4">
        {/* Main Menu */}
        <div>
          <div className="text-sidebar-foreground/60 text-xs font-semibold uppercase tracking-wider mb-2">
            Main Menu
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.title}>
                <button
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors flex items-center gap-3 p-3 w-full"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant="default"
                      className="ml-auto bg-primary text-primary-foreground text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              </div>
            ))}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="text-sidebar-foreground/60 text-xs font-semibold uppercase tracking-wider mb-2">
            Quick Actions
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              <Activity className="w-4 h-4" />
              Start Appointment
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 border-primary/30 text-primary hover:bg-primary/10"
            >
              <FileText className="w-4 h-4" />
              Review Report
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold">DR</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sidebar-foreground">Dr. Sarah Johnson</p>
            <p className="text-xs text-sidebar-foreground/60">Psychiatrist</p>
          </div>
          <Button variant="ghost" size="sm" className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
