import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import MoodTracker from './components/MoodTracker';
import MoodSender from './components/MoodSender';
import CommunityFeed from './components/CommunityFeed';
import Community from './pages/community';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AIChatPage from './pages/AIChatPage';
import Navbar from './components/navbar';
import BookTherapy from './pages/booktherapy';
import FindDoctors from './pages/finddoctors';
import FAQ from './pages/FAQ';
import StartSession from './pages/StartSession';
import Developers from './pages/developers';
import SOSPage from './pages/SOSPage';
import Resources from './pages/Resources';
import Mood from './pages/mood';
import DiaryPage from './pages/DiaryPage';
import DoctorDashboard from './pages/DoctorDashboard';
import Plans from './pages/Plans';
import VideoSession from './pages/VideoSession';
import DoctorAppointment from "./pages/DoctorAppointment";






//=======
//>>>>>>> 3111bb4a21d67378468795758aa84db8822eb8b4
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    console.log('Initial isAuthenticated:', stored === 'true');
    return stored === 'true';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('isAuthenticated') === 'true';
      console.log('Storage change detected, isAuthenticated should be:', stored);
      if (isAuthenticated !== stored) {
        setIsAuthenticated(stored);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Add a periodic check to ensure sync
    const interval = setInterval(() => {
      const stored = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuthenticated !== stored) {
        console.log('Periodic sync, isAuthenticated updated to:', stored);
        setIsAuthenticated(stored);
      }
    }, 1000); // Check every second
    handleStorageChange(); // Initial check
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [isAuthenticated]); // Keep dependency to react to state changes

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    console.log('Logged in, isAuthenticated set to true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    console.log('Logged out, isAuthenticated set to false');
  };

  const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    const noHeaderPaths = ['/', '/auth', '/login', '/signup'];
    const shouldShowHeader = !noHeaderPaths.includes(location.pathname);
    return (
      <>
        {shouldShowHeader && (
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        )}
        {children}
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <LayoutWrapper><Dashboard /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/doctor-dashboard"
          element={isAuthenticated ? (
            <DoctorDashboard />
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/mood-tracker"
          element={isAuthenticated ? (
            <LayoutWrapper><MoodTracker /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
  path="/plans"
  element={isAuthenticated ? (
    <LayoutWrapper><Plans /></LayoutWrapper>
  ) : <Navigate to="/login" replace />}
/>


        <Route
          path="/mood-sender"
          element={isAuthenticated ? (
            <LayoutWrapper><MoodSender /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/feedback"
          element={isAuthenticated ? (
            <LayoutWrapper><Feedback /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/community-feed"
          element={isAuthenticated ? (
            <LayoutWrapper><CommunityFeed /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/community"
          element={isAuthenticated ? (
            <LayoutWrapper><Community /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/ai-chat"
          element={isAuthenticated ? (
            <LayoutWrapper><AIChatPage /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        /> 

        <Route
          path="/video-session"
          element={isAuthenticated ? (
            <LayoutWrapper><VideoSession /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/book-therapy"
          element={isAuthenticated ? (
            <LayoutWrapper><BookTherapy /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/find-doctors"
          element={isAuthenticated ? (
            <LayoutWrapper><FindDoctors /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/start-session"
          element={isAuthenticated ? (
            <LayoutWrapper><StartSession /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/faq"
          element={isAuthenticated ? (
            <LayoutWrapper><FAQ /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/developers"
          element={isAuthenticated ? (
            <LayoutWrapper><Developers /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/resources"
          element={isAuthenticated ? (
            <LayoutWrapper><Resources /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/sos"
          element={isAuthenticated ? (
            <LayoutWrapper><SOSPage /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/mood"
          element={isAuthenticated ? (
            <LayoutWrapper><Mood /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/diary"
          element={isAuthenticated ? (
            <LayoutWrapper><DiaryPage /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="/doctor-appointment"
          element={isAuthenticated ? (
            <LayoutWrapper><DoctorAppointment /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;