import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import MoodTracker from './components/MoodTracker';
import MoodSender from './components/MoodSender';
import CommunityFeed from './components/CommunityFeed';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AIChatPage from './pages/AIChatPage';
import Navbar from './components/navbar';
import BookTherapy from './pages/booktherapy';
import FindDoctors from './pages/finddoctors';
import FAQ from './pages/FAQ';

function App() {
  // ✅ Persist login state using localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // ✅ Save to localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // ✅ Remove on logout
  };

  const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    const noHeaderPaths = ['/', '/auth', '/login', '/signup'];
    const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

    return (
      <>
        {shouldShowHeader && <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
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
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage onLogin={handleLogin} />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <Dashboard />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/mood-tracker"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <MoodTracker />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/feedback"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <Feedback />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/mood-sender"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <MoodSender />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/community-feed"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <CommunityFeed />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/ai-chat"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <AIChatPage />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/book-therapy"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <BookTherapy />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/find-doctors"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <FindDoctors />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/faq"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <FAQ />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
