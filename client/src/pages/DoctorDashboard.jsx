import React, { useState } from 'react';
<<<<<<< HEAD
// We no longer need Menu or X here as the button is removed
import { DoctorSidebar } from '../components/DoctorSidebar';
import { DoctorDashboardContent } from '../components/DoctorDashboardContent';
import { DoctorSession } from './DoctorSession';
export default function DoctorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSessionActive, setIsSessionActive] = useState(false); // <-- 2. Add session state
=======
import { Menu, X } from 'lucide-react';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { DoctorDashboardContent } from '../components/DoctorDashboardContent';

export default function DoctorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default
>>>>>>> 3111bb4a21d67378468795758aa84db8822eb8b4

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

<<<<<<< HEAD
  // 3. Function to start the session, passed to DoctorDashboardContent
  const handleStartSession = () => {
    setIsSessionActive(true);
    setIsSidebarOpen(false); // Automatically hide sidebar when session starts
  };

  // 4. Function to end the session, passed to DoctorSession
  const handleEndSession = () => {
    setIsSessionActive(false);
    setIsSidebarOpen(true); // Re-open sidebar when session ends
  };

=======
>>>>>>> 3111bb4a21d67378468795758aa84db8822eb8b4
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100">
      {/* Main Layout */}
      <div className="flex flex-1 mt-16 relative">
<<<<<<< HEAD
        
        {/* Sidebar - Now conditionally rendered */}
        {!isSessionActive && (
          <div
            className={`
              fixed top-16 bottom-0 w-64 bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 border-r border-primary/20 
              transition-transform duration-300 ease-in-out z-20
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <DoctorSidebar />
          </div>
        )}

        {/* 5. Removed the floating toggle button */}
=======
        {/* Sidebar */}
        <div
          className={`
            fixed top-16 bottom-0 w-64 bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 border-r border-primary/20 
            transition-transform duration-300 ease-in-out z-20
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <DoctorSidebar />
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full fixed top-20 left-4 z-30 flex items-center justify-center 
            bg-transparent border border-gray-200 shadow-md
            hover:shadow-lg focus:outline-none"
          style={{
            background: 'linear-gradient(90deg, #10B981, #F472B6, #34D399)', // Matching gradient
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" /> // Close icon
          ) : (
            <Menu className="w-6 h-6" /> // Hamburger icon
          )}
        </button>
>>>>>>> 3111bb4a21d67378468795758aa84db8822eb8b4

        {/* Main Content Container */}
        <main
          className={`
            flex-1 overflow-y-auto relative transition-margin duration-300
<<<<<<< HEAD
            {/* 6. Margin is now conditional on BOTH sidebar and session state */}
            ${isSessionActive ? 'ml-0' : (isSidebarOpen ? 'ml-64' : 'ml-0')}
          `}
        >
          {/* 7. Conditionally render session or dashboard */}
          {isSessionActive ? (
            <DoctorSession onEndSession={handleEndSession} />
          ) : (
            <DoctorDashboardContent 
              isSidebarOpen={isSidebarOpen} 
              onToggleSidebar={toggleSidebar}
              onStartSession={handleStartSession} // <-- Pass the start function
            />
          )}
=======
            ${isSidebarOpen ? 'ml-64' : 'ml-0'}
          `}
        >
          <DoctorDashboardContent isSidebarOpen={isSidebarOpen} />
>>>>>>> 3111bb4a21d67378468795758aa84db8822eb8b4
        </main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3111bb4a21d67378468795758aa84db8822eb8b4
