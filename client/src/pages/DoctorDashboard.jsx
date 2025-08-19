// DoctorDashboard.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { DoctorDashboardContent } from '../components/DoctorDashboardContent';

export default function DoctorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100">
      {/* Main Layout */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed top-16 bottom-0 w-64 bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 border-r border-primary/20 transition-transform duration-300 ease-in-out z-10`}
        >
          <DoctorSidebar />
        </div>

        {/* Main Content with Toggle Button */}
        <main className="flex-1 overflow-y-auto relative">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-transparent border border-gray-200 rounded fixed top-20 left-4 z-20 flex items-center justify-center"
            style={{
              background: 'linear-gradient(90deg, #10B981, #F472B6, #34D399)', // Matching gradient
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" /> // Close icon
            ) : (
              <Menu className="w-6 h-6" /> // Hamburger icon
            )}
          </button>
          <div className={isSidebarOpen ? 'ml-64' : 'ml-0 transition-all duration-300'}>
            <DoctorDashboardContent isSidebarOpen={isSidebarOpen} />
          </div>
        </main>
      </div>
    </div>
  );
}
