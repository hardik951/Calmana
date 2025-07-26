// src/components/Dashboard.jsx

import React from 'react';
import MoodTracker from './MoodTracker';
import AIChat from './AIChat';
import CommunityFeed from './CommunityFeed';
import Sidebar from './Sidebar';
import AnnouncementBar from './AnnouncementBar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-sans flex flex-col">
      {/* Announcement Bar - Adjusted colors for a softer, more integrated look */}
      <AnnouncementBar
        message="✨ Daily Dose of Calm: 'The mind is everything. What you think you become.'"
        bgColor="bg-emerald-50" // Changed background to a softer emerald tint
        textColor="text-green-800" // Kept text color for good contrast
        borderColor="border-green-200"
      />

      {/* Header Section */}
      <header className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16">
        <div className="flex items-center">
          <span className="text-4xl lg:text-5xl xl:text-6xl mr-3 lg:mr-4 text-green-700">🌿</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-green-800 tracking-tight">Calmana Dashboard</h2>
        </div>
        <div className="flex items-center space-x-3 lg:space-x-4">
          <span className="text-lg lg:text-xl xl:text-2xl text-green-700 hidden sm:block font-medium">Hi, User!</span>
          <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-semibold text-lg lg:text-xl xl:text-2xl shadow-md">U</div>
        </div>
      </header>

      {/* Main Content Area: Grid for Sidebar + Dashboard Modules */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 xl:gap-10 flex-grow max-w-screen-2xl">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Dashboard Modules (occupies remaining 3 columns on large screens) */}
        <main className="lg:col-span-3 space-y-7 lg:space-y-10 xl:space-y-12">
          {/* Welcome Back Section: Softer, more elegant shadow and hover */}
          <div className="bg-white shadow-lg rounded-2xl p-8 lg:p-10 xl:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative border border-green-50
                      hover:shadow-welcome-glow transition-all duration-300 transform hover:scale-[1.005]">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-lime-200 rounded-full opacity-30 blur-xl pointer-events-none"></div>

            <div className="text-center md:text-left z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-green-800 mb-3 lg:mb-4 xl:mb-5 leading-tight">Welcome back to your calm space!</h1>
              <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-green-700 mb-6 lg:mb-8 xl:mb-10 max-w-xl leading-relaxed">
                Take a deep breath and explore your journey towards greater well-being.
              </p>
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 lg:px-10 lg:py-4 xl:px-12 xl:py-5 rounded-full shadow-lg hover:from-emerald-600 hover:to-green-500 transition duration-300 text-lg lg:text-xl xl:text-2xl font-semibold flex items-center justify-center">
                <span className="mr-2">🍃</span> Start a Session
              </button>
            </div>
            <div className="mt-8 md:mt-0 md:ml-10 flex-shrink-0 z-10">
              <img
                src="https://via.placeholder.com/250x180/D1FAE5/10B981?text=Calm+Illustration"
                alt="Calm illustration"
                className="rounded-lg shadow-md max-h-36 lg:max-h-48 xl:max-h-64"
              />
            </div>
          </div>

          {/* Grid for Mood Tracker, Journal Entries, AI Chat, Community Feed (2x2 structure) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 xl:gap-10">

            {/* Mood Tracker Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-green-glow transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-green-50 transform hover:scale-[1.005]">
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 mb-4 lg:mb-5 flex items-center">
                <span className="text-2xl lg:text-3xl xl:text-4xl mr-2">😊</span> Mood Tracker
              </h3>
              <div className="min-h-[150px] lg:min-h-[180px] xl:min-h-[220px] flex items-center justify-center">
                <MoodTracker />
              </div>
            </div>

            {/* Recent Journal Entries */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-green-glow transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-green-50 transform hover:scale-[1.005]">
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 mb-4 lg:mb-5 flex items-center">
                <span className="text-2xl lg:text-3xl xl:text-4xl mr-2">✍️</span> Recent Journal Entries
              </h3>
              <ul className="space-y-3 lg:space-y-4 xl:space-y-5 text-green-700 text-base lg:text-lg xl:text-xl min-h-[150px] lg:min-h-[180px] xl:min-h-[220px]">
                <li className="bg-green-50 p-3 lg:p-4 xl:p-5 rounded-md border-l-4 border-emerald-400 cursor-pointer hover:bg-green-100 transition duration-150 shadow-sm">
                  <span className="font-semibold">Mar 25:</span> Reflected on managing daily stress.
                </li>
                <li className="bg-green-50 p-3 lg:p-4 xl:p-5 rounded-md border-l-4 border-lime-400 cursor-pointer hover:bg-green-100 transition duration-150 shadow-sm">
                  <span className="font-semibold">Mar 24:</span> Explored gratitude for small joys.
                </li>
                <li className="bg-green-50 p-3 lg:p-4 xl:p-5 rounded-md border-l-4 border-green-400 cursor-pointer hover:bg-green-100 transition duration-150 shadow-sm">
                  <span className="font-semibold">Mar 23:</span> Acknowledged progress in mindfulness.
                </li>
              </ul>
              <button className="mt-4 lg:mt-5 xl:mt-6 text-emerald-600 hover:underline text-sm lg:text-base xl:text-lg font-semibold self-start hover:text-emerald-700 transition-colors">View all entries</button>
            </div>

            {/* AI Chat Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-green-glow transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-green-50 transform hover:scale-[1.005]">
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 mb-4 lg:mb-5 flex items-center">
                <span className="text-2xl lg:text-3xl xl:text-4xl mr-2">💬</span> AI Chat Assistant
              </h3>
              <div className="min-h-[150px] lg:min-h-[180px] xl:min-h-[220px] flex flex-col">
                <AIChat />
              </div>
              <p className="text-green-700 mt-2 mb-4 lg:mb-5 xl:mb-6 text-base lg:text-lg xl:text-xl">Hi Karen, how can I assist you today?</p>
              <div className="flex flex-col space-y-2 lg:space-y-3 mb-4 lg:mb-5 xl:mb-6">
                <button className="bg-green-50 text-green-800 py-2.5 lg:py-3 xl:py-4 px-4 rounded-md hover:bg-green-100 text-left transition duration-150 text-base lg:text-lg xl:text-xl font-medium shadow-sm">Vent about your day</button>
                <button className="bg-green-50 text-green-800 py-2.5 lg:py-3 xl:py-4 px-4 rounded-md hover:bg-green-100 text-left transition duration-150 text-base lg:text-lg xl:text-xl font-medium shadow-sm">Challenge negative thoughts</button>
                <button className="bg-green-50 text-green-800 py-2.5 lg:py-3 xl:py-4 px-4 rounded-md hover:bg-green-100 text-left transition duration-150 text-base lg:text-lg xl:text-xl font-medium shadow-sm">Practice mindfulness</button>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Start typing here..."
                  className="flex-grow border border-green-300 rounded-md py-2.5 lg:py-3 xl:py-4 px-3 lg:px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-green-800 bg-green-50 placeholder-green-500 text-base lg:text-lg xl:text-xl"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 lg:py-3 xl:py-4 px-5 lg:px-6 xl:px-7 rounded-md shadow transition duration-300 text-base lg:text-lg xl:text-xl">
                  Send
                </button>
              </div>
            </div>

            {/* Community Feed Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-green-glow transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-green-50 transform hover:scale-[1.005]">
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-green-800 mb-4 lg:mb-5 flex items-center">
                <span className="text-2xl lg:text-3xl xl:text-4xl mr-2">🌍</span> Full Community Feed
              </h3>
              <div className="min-h-[200px] lg:min-h-[250px] xl:min-h-[300px] overflow-y-auto">
                <CommunityFeed />
              </div>
            </div>
          </div> {/* End of the 2x2 grid */}


          {/* NEW: Share Your Feedback Section (Full Width, Transparent) */}
          <section className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-8 lg:p-12 xl:p-16 border border-green-100 mt-10 lg:mt-16 xl:mt-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-800 mb-4 md:mb-6 text-center">Share Your Feedback</h2>
            <p className="text-lg md:text-xl text-green-700 mb-8 md:mb-10 text-center max-w-2xl mx-auto leading-relaxed">
              We'd love to hear your thoughts and suggestions to help us improve Calmana.
            </p>

            <form className="space-y-6 md:space-y-8 max-w-xl mx-auto">
              <div>
                <label htmlFor="feedback-name" className="block text-green-800 text-base md:text-lg font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  className="w-full p-3 md:p-4 border border-green-300 rounded-lg bg-green-50 text-green-800 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="feedback-email" className="block text-green-800 text-base md:text-lg font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="feedback-email"
                  name="email"
                  className="w-full p-3 md:p-4 border border-green-300 rounded-lg bg-green-50 text-green-800 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-colors"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label htmlFor="feedback-message" className="block text-green-800 text-base md:text-lg font-medium mb-2">Your Message</label>
                <textarea
                  id="feedback-message"
                  name="message"
                  rows="5"
                  className="w-full p-3 md:p-4 border border-green-300 rounded-lg bg-green-50 text-green-800 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg resize-y transition-colors"
                  placeholder="Type your feedback here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 md:py-4 rounded-full shadow-lg hover:from-emerald-700 hover:to-green-600 transition duration-300 text-lg md:text-xl font-semibold flex items-center justify-center space-x-2"
              >
                <span>Send Feedback</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
            </form>
          </section> {/* End of Share Your Feedback Section */}

        </main>
      </div>

      {/* Optional Footer */}
      <footer className="mt-12 text-center text-green-700 text-sm lg:text-base xl:text-lg opacity-90">
        &copy; {new Date().getFullYear()} Calmana. Your journey to inner peace begins here.
      </footer>
    </div>
  );
}