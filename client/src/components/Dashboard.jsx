import React from 'react';
import MoodTracker from './MoodTracker';
import AIChat from './AIChat';
import Feedback from './Feedback';
import CommunityFeed from './CommunityFeed';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-lime-100 p-6">
      <header className="flex items-center mb-8">
        <span className="text-3xl mr-2">🌿</span>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">Calmana Dashboard</h2>
      </header>

      {/* <-- Add the grid below here */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <MoodTracker />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <AIChat />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <Feedback />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <CommunityFeed />
        </div>
      </div>
    </div>
  );
}
