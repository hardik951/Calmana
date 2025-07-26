// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import MoodTracker from './components/MoodTracker';
import MoodSender from './components/MoodSender';
import CommunityFeed from './components/CommunityFeed';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AIChatPage from './pages/AIChatPage'; // ✅ Correct page import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/mood-sender" element={<MoodSender />} />
        <Route path="/community-feed" element={<CommunityFeed />} />

        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Full-page AI Chat */}
        <Route path="/ai-chat" element={<AIChatPage />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
