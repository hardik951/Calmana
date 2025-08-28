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
    <aside className="flex flex-col h-full bg-gradient-to-b from-emerald-100 via-pink-100 to-green-100 border-r border-primary/20 shadow-md">
      
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 p-6 border-b border-primary/20">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-400 via-pink-400 to-green-500 flex items-center justify-center shadow-lg">
          <Stethoscope className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-green-800 select-none">Calmana</h2>
          <p className="text-sm text-green-700 select-none">Doctor Portal</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <h3 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-4 select-none">
          Main Menu
        </h3>
        {menuItems.map(({ title, icon: Icon, badge, url }) => (
          <a
            key={title}
            href={url}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-green-800 hover:bg-green-100 hover:text-green-900 transition-colors font-medium group cursor-pointer"
          >
            <Icon className="w-5 h-5 group-hover:text-green-700" />
            <span className="flex-grow">{title}</span>
            {badge && (
              <Badge 
                variant="destructive" 
                className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full select-none"
              >
                {badge}
              </Badge>
            )}
          </a>
        ))}
      </nav>

      {/* Quick Actions */}
      <div className="px-4 py-6 border-t border-primary/20 bg-green-50">
        <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-3 select-none">Quick Actions</h4>
        <div className="space-y-3">
          
          <Button 
            variant="solid" 
            size="sm" 
            className="w-full flex items-center gap-3 justify-start bg-gradient-to-r from-pink-400 via-green-400 to-emerald-500 shadow-md hover:from-pink-500 hover:via-green-500 hover:to-emerald-600"
          >
            <MessageSquare className="w-5 h-5" />
            Send Message
          </Button>
          <Button 
            variant="solid" 
            size="sm" 
            className="w-full flex items-center gap-3 justify-start bg-gradient-to-r from-green-400 via-emerald-400 to-pink-400 shadow-md hover:from-green-500 hover:via-emerald-500 hover:to-pink-500"
          >
            <FileText className="w-5 h-5" />
            Review Report
          </Button>
        </div>
      </div>

      {/* Sidebar Footer */}
      <footer className="flex items-center gap-4 p-6 border-t border-primary/20 bg-green-100 select-none">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 via-pink-400 to-green-500 flex items-center justify-center shadow-sm text-white font-extrabold text-lg">
          DR
        </div>
        <div className="flex-grow">
          <p className="font-semibold text-green-800">Dr. Sarah Johnson</p>
          <p className="text-sm text-green-700">Psychiatrist</p>
        </div>
        <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-100 hover:text-green-900">
          <Bell className="w-5 h-5" />
        </Button>
      </footer>
    </aside>
  );
}
