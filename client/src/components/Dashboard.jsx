// src/components/Dashboard.jsx

import React from 'react';
import MoodTracker from './MoodTracker';

import CommunityFeed from './CommunityFeed';
import Sidebar from './Sidebar';
import AnnouncementBar from './AnnouncementBar';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    // Dashboard Background: Animated Green and Pink Gradient (consistent with auth pages)
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-inter flex flex-col
                    animate-gradient-green-pink-shift bg-[length:400%_400%]">
      {/* Announcement Bar - Adjusted colors for professionalism */}
      <AnnouncementBar
        message="✨ Daily Dose of Calm: 'The mind is everything. What you think you become.'"
        bgColor="bg-gray-100"
        textColor="text-gray-700"
        borderColor="border-gray-200"
      />

      {/* Header Section - Fades in slightly */}
      <header className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center">
          <span className="text-4xl lg:text-5xl xl:text-6xl mr-3 lg:mr-4 text-emerald-600">🌿</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-800 tracking-wide leading-tight">Calmana Dashboard</h2>
        </div>
        {/* User profile or settings icon */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          <span className="text-lg lg:text-xl xl:text-2xl text-gray-700 hidden sm:block font-medium">Hi, User!</span>
          <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-semibold text-lg lg:text-xl xl:text-2xl shadow-md">U</div>
        </div>
      </header>

      {/* Main Content Area: Grid for Sidebar + Dashboard Modules */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 xl:gap-10 flex-grow max-w-screen-2xl">
        {/* Sidebar Component - Animated */}
        {/* Sidebar's background and text colors are handled in Sidebar.jsx */}
        <Sidebar />

        {/* Dashboard Modules (occupies remaining 3 columns on large screens) */}
        <main className="lg:col-span-3 space-y-7 lg:space-y-10 xl:space-y-12">
          {/* Welcome Back Section: Subtle gradient background, crisper shadow, enhanced hover */}
          <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-lg rounded-xl p-8 lg:p-10 xl:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative border border-white/20
                      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-200 rounded-full opacity-30 blur-xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-xl pointer-events-none"></div>

            <div className="text-center md:text-left z-10">
              {/* Text colors adjusted for visibility on animated background */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-emerald-800 mb-3 lg:mb-4 xl:mb-5 leading-snug tracking-wide">Welcome back to your calm space!</h1>
              <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-emerald-700 mb-6 lg:mb-8 xl:mb-10 max-w-xl leading-relaxed">
                Your personalized AI-powered mental health dashboard. Take a deep breath and explore your journey towards greater well-being.
              </p>
              <button className="bg-emerald-600 text-white px-8 py-3 lg:px-10 lg:py-4 xl:px-12 xl:py-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-lg lg:text-xl xl:text-2xl font-semibold flex items-center justify-center
                              hover:brightness-110 hover:-translate-y-0.5">
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

            {/* Mood Tracker Card: Now with full animated gradient background */}
            <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-white/20 transform animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-emerald-800 mb-4 lg:mb-5 flex items-center leading-snug">
                <span className="text-2xl lg:text-3xl xl:text-4xl mr-2 text-emerald-600">😊</span> Mood Tracker
              </h3>
              <div className="min-h-[150px] lg:min-h-[180px] xl:min-h-[220px] flex items-center justify-center">
                <MoodTracker />
              </div>
            </div>

            {/* Recent Journal Entries: Now with full animated gradient background */}
            <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-white/20 transform animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-emerald-800 mb-4 lg:mb-5 flex items-center leading-snug">
                <span className="text-2xl lg:text-3xl xl:text-4xl mr-2 text-emerald-600">✍️</span> Recent Journal Entries
              </h3>
              <ul className="space-y-3 lg:space-y-4 xl:space-y-5 text-emerald-700 text-base lg:text-lg xl:text-xl min-h-[150px] lg:min-h-[180px] xl:min-h-[220px] leading-relaxed">
                <li className="bg-white/10 p-3 lg:p-4 xl:p-5 rounded-md border-l-4 border-emerald-400 cursor-pointer hover:bg-white/20 transition duration-200 shadow-sm">
                  <span className="font-semibold text-emerald-800">Mar 25:</span> <span className="text-emerald-700">Reflected on managing daily stress.</span>
                </li>
                <li className="bg-white/10 p-3 lg:p-4 xl:p-5 rounded-md border-l-4 border-pink-400 cursor-pointer hover:bg-white/20 transition duration-200 shadow-sm">
                  <span className="font-semibold text-emerald-800">Mar 24:</span> <span className="text-emerald-700">Explored gratitude for small joys.</span>
                </li>
                <li className="bg-white/10 p-3 lg:p-4 xl:p-5 rounded-md border-l-4 border-green-400 cursor-pointer hover:bg-white/20 transition duration-200 shadow-sm">
                  <span className="font-semibold text-emerald-800">Mar 23:</span> <span className="text-emerald-700">Acknowledged progress in mindfulness.</span>
                </li>
              </ul>
              <button className="mt-4 lg:mt-5 xl:mt-6 text-emerald-600 hover:underline text-sm lg:text-base xl:text-lg font-semibold self-start hover:text-emerald-700 transition-colors duration-200">View all entries</button>
            </div>

            {/* AI Chat Card: Now with full animated gradient background */}
            {/* AI Chat Preview Card */}
{/* AI Chat Preview Card */}
{/* AI Chat Preview Card */}
{/* AI Chat Preview Card */}
<div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-white/20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
  <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-emerald-800 mb-4 lg:mb-5 flex items-center gap-2 leading-snug">
    <span className="text-2xl lg:text-3xl">🧠</span> Calmana AI Assistant
  </h3>

  {/* Chat Bubble Preview - No Scroll */}
  <div className="bg-white/40 backdrop-blur-md rounded-xl p-4 mb-4 space-y-3 text-sm text-emerald-900 border border-white/20 shadow-inner">
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">C</div>
      <div className="bg-white/60 rounded-xl px-4 py-2 w-fit shadow-sm">
        Hey there 👋 I'm Calmana, your listening companion. How are you feeling today?
      </div>
    </div>
    <div className="flex items-start justify-end gap-2">
      <div className="bg-white/70 rounded-xl px-4 py-2 w-fit shadow-sm">
        Feeling a bit lost and anxious lately...
      </div>
      <div className="w-6 h-6 rounded-full bg-emerald-400 text-white flex items-center justify-center text-xs font-bold">U</div>
    </div>
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">C</div>
      <div className="bg-white/60 rounded-xl px-4 py-2 w-fit shadow-sm">
        You're not alone 🌱 Let's take a breath together. I'm here for you.
      </div>
    </div>
  </div>

  {/* Calmana AI Features */}
  <ul className="text-emerald-800 list-disc pl-5 space-y-1 mb-4 text-sm lg:text-base">
    <li>Empathetic AI that listens 24/7</li>
    <li>Supports emotional awareness gently</li>
    <li>Private, safe, and soothing space</li>
  </ul>

  {/* CTA Button */}
  <button
    onClick={() => navigate('/ai-chat')}
    className="bg-emerald-600 text-white py-2.5 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-base lg:text-lg"
  >
    Launch AI Chat →
  </button>
</div>



            {/* Community Feed Card: Now with full animated gradient background */}
            <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 lg:p-8 flex flex-col justify-between border border-white/20 transform animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-emerald-800 mb-4 lg:mb-5 flex items-center leading-snug">
                <span className="text-2xl lg:text-3xl xl:text-4xl mr-2 text-emerald-600">🌍</span> Full Community Feed
              </h3>
              <div className="min-h-[200px] lg:min-h-[250px] xl:min-h-[300px] overflow-y-auto">
                <CommunityFeed />
              </div>
            </div>
          </div> {/* End of the 2x2 grid */}


          {/* NEW: Share Your Feedback Section (Full Width, now with full animated gradient) */}
          <section className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-xl rounded-xl p-8 lg:p-12 xl:p-16 border border-white/20 mt-10 lg:mt-16 xl:mt-20 animate-fade-in-slow" style={{ animationDelay: '1.0s' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 mb-4 md:mb-6 text-center leading-snug tracking-wide">Share Your Feedback</h2>
            <p className="text-lg md:text-xl text-emerald-700 mb-8 md:mb-10 text-center max-w-2xl mx-auto leading-relaxed">
              We'd love to hear your thoughts and suggestions to help us improve Calmana.
            </p>

            <form className="space-y-6 md:space-y-8 max-w-xl mx-auto">
              <div>
                <label htmlFor="feedback-name" className="block text-emerald-700 text-base md:text-lg font-medium mb-2 leading-normal">Your Name</label>
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  className="w-full p-3 md:p-4 border border-white/30 rounded-lg bg-white/10 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-colors duration-200 leading-normal"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="feedback-email" className="block text-emerald-700 text-base md:text-lg font-medium mb-2 leading-normal">Your Email</label>
                <input
                  type="email"
                  id="feedback-email"
                  name="email"
                  className="w-full p-3 md:p-4 border border-white/30 rounded-lg bg-white/10 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-colors duration-200 leading-normal"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label htmlFor="feedback-message" className="block text-emerald-700 text-base md:text-lg font-medium mb-2 leading-normal">Your Message</label>
                <textarea
                  id="feedback-message"
                  name="message"
                  rows="5"
                  className="w-full p-3 md:p-4 border border-white/30 rounded-lg bg-white/10 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg resize-y transition-colors duration-200 leading-normal"
                  placeholder="Type your feedback here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-semibold py-2.5 lg:py-3 xl:py-4 px-5 lg:px-6 xl:px-7 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-base lg:text-lg xl:text-xl hover:brightness-110">
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
      <footer className="mt-12 text-center text-emerald-700 text-sm lg:text-base xl:text-lg opacity-90 leading-relaxed animate-fade-in-slow" style={{ animationDelay: '1.2s' }}>
        &copy; {new Date().getFullYear()} Calmana. Your journey to inner peace begins here.
      </footer>
    </div>
  );
}