import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import MoodTracker from './components/MoodTracker';
import CommunityFeed from './components/CommunityFeed';
import Community from './pages/community'; // <-- NEW: import your Community page
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <LayoutWrapper><Dashboard /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Mood tracker - shows chart only */}
        <Route
          path="/mood-tracker"
          element={isAuthenticated ? (
            <LayoutWrapper><MoodTracker /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Mood submission page */}
        <Route
          path="/mood"
          element={isAuthenticated ? (
            <LayoutWrapper><Mood /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Feedback */}
        <Route
          path="/feedback"
          element={isAuthenticated ? (
            <LayoutWrapper><Feedback /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Community Feed (old preview page, optional) */}
        <Route
          path="/community-feed"
          element={isAuthenticated ? (
            <LayoutWrapper><CommunityFeed /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* NEW: Full Community page */}
        <Route
          path="/community"
          element={isAuthenticated ? (
            <LayoutWrapper><Community /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* AI Chat */}
        <Route
          path="/ai-chat"
          element={isAuthenticated ? (
            <LayoutWrapper><AIChatPage /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Book therapy */}
        <Route
          path="/book-therapy"
          element={isAuthenticated ? (
            <LayoutWrapper><BookTherapy /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Doctors search */}
        <Route
          path="/find-doctors"
          element={isAuthenticated ? (
            <LayoutWrapper><FindDoctors /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Session */}
        <Route
          path="/start-session"
          element={isAuthenticated ? (
            <LayoutWrapper><StartSession /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* FAQ */}
        <Route
          path="/faq"
          element={isAuthenticated ? (
            <LayoutWrapper><FAQ /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Developers */}
        <Route
          path="/developers"
          element={isAuthenticated ? (
            <LayoutWrapper><Developers /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Resources */}
        <Route
          path="/resources"
          element={isAuthenticated ? (
            <LayoutWrapper><Resources /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* SOS */}
        <Route
          path="/sos"
          element={isAuthenticated ? (
            <LayoutWrapper><SOSPage /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Diary */}
        <Route
          path="/diary"
          element={isAuthenticated ? (
            <LayoutWrapper><DiaryPage /></LayoutWrapper>
          ) : <Navigate to="/login" replace />}
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
