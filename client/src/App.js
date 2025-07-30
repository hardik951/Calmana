// src/App.js

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
import StartSession from './pages/StartSession';

// Developers page (adjust the path if your file lives elsewhere)
import Developers from './pages/developers';

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
    // Hide navbar on landing & auth flows
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

        {/* SHOW the Auth chooser page (no redirect) */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Always render login/signup pages (even if already authed) */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />

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
          path="/start-session"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <StartSession />
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

        {/* Protected Developers page */}
        <Route
          path="/developers"
          element={
            isAuthenticated ? (
              <LayoutWrapper>
                <Developers />
              </LayoutWrapper>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-All */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
