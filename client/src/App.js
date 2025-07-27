// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import AnnouncementBar from './components/AnnouncementBar';
import BookTherapy from './pages/booktherapy'; // ✅ Imported correctly

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('token', 'dummy-token');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        <AnnouncementBar />
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/mood-tracker"
            element={isAuthenticated ? <MoodTracker /> : <Navigate to="/login" />}
          />
          <Route
            path="/feedback"
            element={isAuthenticated ? <Feedback /> : <Navigate to="/login" />}
          />
          <Route
            path="/mood-sender"
            element={isAuthenticated ? <MoodSender /> : <Navigate to="/login" />}
          />
          <Route
            path="/community-feed"
            element={isAuthenticated ? <CommunityFeed /> : <Navigate to="/login" />}
          />
          <Route
            path="/ai-chat"
            element={isAuthenticated ? <AIChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/book-therapy"
            element={isAuthenticated ? <BookTherapy /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
