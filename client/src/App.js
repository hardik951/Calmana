// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoodTracker from './components/MoodTracker'; 
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import AIChat from './components/AIChat';
import MoodSender from './components/MoodSender';
import CommunityFeed from './components/CommunityFeed';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />  
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/mood-sender" element={<MoodSender />} />
        <Route path="/community-feed" element={<CommunityFeed />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
