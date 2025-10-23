import React, { useState } from 'react';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { DoctorDashboardContent } from '../components/DoctorDashboardContent';
import { DoctorSession } from './DoctorSession';

export default function DoctorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleStartSession = () => {
    setIsSessionActive(true);
    setIsSidebarOpen(false); // hide sidebar when session starts
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setIsSidebarOpen(true); // re-open sidebar when session ends
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100">
      <div className="flex flex-1 mt-16 relative">
        {/* Sidebar */}
        {!isSessionActive && isSidebarOpen && (
          <div className="fixed top-16 bottom-0 w-64 bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 border-r border-primary/20 z-20">
            <DoctorSidebar />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto relative transition-all duration-300 ${
            !isSessionActive && isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          {isSessionActive ? (
            <DoctorSession onEndSession={handleEndSession} />
          ) : (
            <DoctorDashboardContent
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={toggleSidebar}
              onStartSession={handleStartSession}
            />
          )}
        </main>
      </div>
    </div>
  );
}
