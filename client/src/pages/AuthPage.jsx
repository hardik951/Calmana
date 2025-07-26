// src/pages/AuthPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6 font-inter
                    animate-gradient-green-pink-shift bg-[length:400%_400%]">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-8 md:mb-10 text-center leading-tight">
        Welcome to Calmana
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 md:mb-12 text-center max-w-xl leading-relaxed">
        Your personal oasis for wellness and calm. Join us to start your journey.
      </p>

      {/* Content box with animated gradient background and adjusted text colors */}
      {/* ADDED 'animate-gradient-green-pink-shift' HERE for the box to animate */}
      <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-lg rounded-xl p-8 lg:p-10 w-full max-w-md border border-white/20 animate-fade-in-up bg-[length:400%_400%]
                      animate-gradient-green-pink-shift /* Crucial: This makes the box animate */
                      hover:brightness-110 hover:shadow-2xl hover:scale-[1.005] transition-all duration-300" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-6 text-center">Get Started</h2>

        <div className="space-y-4">
          <button
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-full text-lg md:text-xl font-semibold shadow-md
                       hover:bg-emerald-700 hover:shadow-lg transition-all duration-300 hover:brightness-110"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <button
            className="w-full bg-green-500 text-white py-3 px-6 rounded-full text-lg md:text-xl font-semibold shadow-md
                       hover:bg-green-600 hover:shadow-lg transition-all duration-300 hover:brightness-110"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Option to go back to Welcome Page */}
      <p className="mt-8 text-center text-emerald-700 text-base md:text-lg">
        <button onClick={() => navigate('/')} className="text-emerald-600 hover:underline font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Welcome Page
        </button>
      </p>
    </div>
  );
}