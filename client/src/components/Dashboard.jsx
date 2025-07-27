import React, { useState } from 'react';
import MoodTracker from './MoodTracker';
import CommunityFeed from './CommunityFeed';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Feedback submitted successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-4 sm:p-6 lg:p-8 xl:p-10 font-inter flex flex-col animate-gradient-green-pink-shift bg-[length:400%_400%]">
      <header className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8 animate-fade-in" style={{ animationDuration: '0.5s' }}>
        <div className="flex items-center">
          {/* Removed Calmana text */}
        </div>
      </header>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8 flex-grow max-w-screen-2xl">
        <Sidebar navigate={navigate} />

        <main className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8" role="main">
          <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-lg rounded-xl p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col sm:flex-row items-center justify-between overflow-hidden relative border border-white/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-fade-in-up" style={{ animationDuration: '0.5s' }}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-200 rounded-full opacity-20 blur-lg pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-lg pointer-events-none"></div>

            <div className="text-center sm:text-left z-10">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-emerald-800 mb-2 sm:mb-3 lg:mb-4 leading-tight tracking-wide">Welcome back to your calm space!</h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-emerald-700 mb-3 sm:mb-4 lg:mb-6 max-w-md leading-relaxed">
                Your personal space for reflection and growth — powered by AI, crafted for your emotional wellness journey.
              </p>
              <button 
                className="bg-emerald-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm lg:text-base font-semibold flex items-center justify-center hover:brightness-110 hover:-translate-y-0.5"
                aria-label="Start your new wellness session"
              >
                Start Your New Wellness Session
              </button>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0 z-10">
              <img
                src="https://via.placeholder.com/250x180/D1FAE5/10B981?text=Calm+Illustration"
                alt="Illustration of a calm scene"
                className="rounded-lg shadow-md max-h-24 sm:max-h-28 lg:max-h-32 xl:max-h-40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between border border-white/20 animate-fade-in-up" style={{ animationDuration: '0.6s' }}>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-emerald-800 mb-2 sm:mb-3 flex items-center leading-tight">
                <span className="text-lg sm:text-xl lg:text-2xl mr-1 text-emerald-600">😊</span> Mood Tracker
              </h3>
              <div className="min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] xl:min-h-[160px] flex items-center justify-center">
                <MoodTracker />
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between border border-white/20 animate-fade-in-up" style={{ animationDuration: '0.7s' }}>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-emerald-800 mb-2 sm:mb-3 flex items-center leading-tight">
                <span className="text-lg sm:text-xl lg:text-2xl mr-1 text-emerald-600">✍️</span> Recent Journal Entries
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-emerald-700 text-sm sm:text-base min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] xl:min-h-[160px] leading-relaxed">
                <li className="bg-white/10 p-2 sm:p-3 rounded-md border-l-4 border-emerald-400 cursor-pointer hover:bg-white/20 transition duration-200 shadow-sm">
                  <span className="font-semibold text-emerald-800">Mar 25:</span> <span className="text-emerald-700">Reflected on managing daily stress.</span>
                </li>
                <li className="bg-white/10 p-2 sm:p-3 rounded-md border-l-4 border-pink-400 cursor-pointer hover:bg-white/20 transition duration-200 shadow-sm">
                  <span className="font-semibold text-emerald-800">Mar 24:</span> <span className="text-emerald-700">Explored gratitude for small joys.</span>
                </li>
                <li className="bg-white/10 p-2 sm:p-3 rounded-md border-l-4 border-green-400 cursor-pointer hover:bg-white/20 transition duration-200 shadow-sm">
                  <span className="font-semibold text-emerald-800">Mar 23:</span> <span className="text-emerald-700">Acknowledged progress in mindfulness.</span>
                </li>
              </ul>
              <button className="mt-2 sm:mt-3 lg:mt-4 text-emerald-600 hover:underline text-xs sm:text-sm font-semibold self-start hover:text-emerald-700 transition-colors duration-200" aria-label="View all journal entries">View all entries</button>
            </div>

            <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between border border-white/20 animate-fade-in-up" style={{ animationDuration: '0.8s' }}>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-emerald-800 mb-2 sm:mb-3 flex items-center gap-1 leading-tight">
                <span className="text-lg sm:text-xl lg:text-2xl">🧠</span> Calmana AI Assistant
              </h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 space-y-2 text-xs sm:text-sm text-emerald-900 max-h-32 sm:max-h-36 overflow-y-auto border border-white/20 shadow-inner">
                <div className="flex items-start gap-2">
                  <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">C</div>
                  <div className="bg-white/20 rounded-xl px-2 sm:px-3 py-1 w-fit shadow-sm text-emerald-900">
                    Hey there 👋 I'm Calmana, your listening companion. How are you feeling today?
                  </div>
                </div>
                <div className="flex items-start justify-end gap-2">
                  <div className="bg-white/30 rounded-xl px-2 sm:px-3 py-1 w-fit shadow-sm text-emerald-900">
                    Feeling a bit lost and anxious lately...
                  </div>
                  <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-emerald-400 text-white flex items-center justify-center text-xs font-bold">U</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">C</div>
                  <div className="bg-white/20 rounded-xl px-2 sm:px-3 py-1 w-fit shadow-sm text-emerald-900">
                    You're not alone 🌱 Let's take a breath together. I'm here for you.
                  </div>
                </div>
              </div>
              <ul className="text-emerald-800 list-disc pl-4 space-y-1 mb-2 sm:mb-3 text-xs sm:text-sm">
                <li>Empathetic AI that listens 24/7</li>
                <li>Supports emotional awareness gently</li>
                <li>Private, safe, and soothing space</li>
              </ul>
              <button
                onClick={() => navigate('/ai-chat')}
                className="w-full bg-emerald-600 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base hover:brightness-110"
                aria-label="Start AI chat with Calmana"
              >
                <span className="mr-1">🚀</span> Start AI Chat
              </button>
            </div>

            <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between border border-white/20 animate-fade-in-up" style={{ animationDuration: '0.9s' }}>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-emerald-800 mb-2 sm:mb-3 flex items-center leading-tight">
                <span className="text-lg sm:text-xl lg:text-2xl mr-1 text-emerald-600">🌍</span> Full Community Feed
              </h3>
              <div className="min-h-[120px] sm:min-h-[150px] lg:min-h-[180px] xl:min-h-[220px] overflow-y-auto">
                <CommunityFeed />
              </div>
            </div>
          </div>

          <section className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-xl rounded-xl p-4 sm:p-6 lg:p-8 xl:p-10 border border-white/20 mt-6 sm:mt-8 lg:mt-10 xl:mt-12 animate-fade-in-slow" style={{ animationDuration: '0.8s' }}>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-emerald-800 mb-2 sm:mb-3 md:mb-4 text-center leading-tight tracking-wide">Share Your Feedback</h2>
            <p className="text-sm sm:text-base md:text-lg text-emerald-700 mb-3 sm:mb-4 md:mb-6 text-center max-w-md mx-auto leading-relaxed">
              We'd love to hear your thoughts and suggestions to help us improve Calmana.
            </p>
            <div className="space-y-4 sm:space-y-5 max-w-md mx-auto">
              <div>
                <label htmlFor="feedback-name" className="block text-emerald-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 leading-normal">Your Name</label>
                <input
                  type="text"
                  id="feedback-name"
                  name="name"
                  className="w-full p-2 sm:p-3 border border-white/30 rounded-lg bg-white/10 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base transition-colors duration-200 leading-normal"
                  placeholder="Enter your name"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="feedback-email" className="block text-emerald-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 leading-normal">Your Email</label>
                <input
                  type="email"
                  id="feedback-email"
                  name="email"
                  className="w-full p-2 sm:p-3 border border-white/30 rounded-lg bg-white/10 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base transition-colors duration-200 leading-normal"
                  placeholder="name@example.com"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="feedback-message" className="block text-emerald-700 text-sm sm:text-base font-medium mb-1 sm:mb-2 leading-normal">Your Message</label>
                <textarea
                  id="feedback-message"
                  name="message"
                  rows="4"
                  className="w-full p-2 sm:p-3 border border-white/30 rounded-lg bg-white/10 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base resize-y transition-colors duration-200 leading-normal"
                  placeholder="Type your feedback here..."
                  aria-required="true"
                ></textarea>
              </div>
              <button
                onClick={handleFeedbackSubmit}
                disabled={isSubmitting}
                className={`w-full bg-emerald-600 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
                aria-label="Submit feedback"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Feedback'}</span>
                {!isSubmitting && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </button>
            </div>
          </section>
        </main>
      </div>

      <footer className="mt-6 sm:mt-8 text-center text-emerald-700 text-xs sm:text-sm opacity-90 leading-relaxed animate-fade-in-slow" style={{ animationDuration: '0.8s' }}>
        &copy; {new Date().getFullYear()} Calmana. Your journey to inner peace begins here.
      </footer>
    </div>
  );
}