// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('patient');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isAuthenticated", "true");
    if (onLogin) onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-inter">
      <div className="relative bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 lg:p-12 xl:p-16 w-full max-w-md md:max-w-lg lg:max-w-xl border border-emerald-200 animate-fade-in-up bg-[length:400%_400%] transition-all duration-500 hover:scale-[1.01] hover:shadow-emerald-200 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r before:from-emerald-200 before:via-pink-100 before:to-green-200 before:opacity-40 before:-z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-800 mb-8 text-center leading-snug tracking-tight drop-shadow">
          Login to Calmana
        </h2>

        {/* User Type Selection */}
        <div className="flex justify-center mb-8 gap-6">
          <button
            type="button"
            className={`flex flex-col items-center px-6 py-3 rounded-2xl font-semibold border-2 transition-all duration-200 shadow-sm text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 hover:scale-105 hover:shadow-lg ${
              userType === 'patient'
                ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-lg'
                : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
            }`}
            onClick={() => setUserType('patient')}
            aria-pressed={userType === 'patient'}
          >
            <span className="text-2xl mb-1">🧑‍🦰</span>
            <span className="transition-all duration-200">Patient</span>
          </button>

          <button
            type="button"
            className={`flex flex-col items-center px-6 py-3 rounded-2xl font-semibold border-2 transition-all duration-200 shadow-sm text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 hover:scale-105 hover:shadow-lg ${
              userType === 'doctor'
                ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-lg'
                : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
            }`}
            onClick={() => setUserType('doctor')}
            aria-pressed={userType === 'doctor'}
          >
            <span className="text-2xl mb-1">🩺</span>
            <span className="transition-all duration-200">Doctor</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Email (floating label fixed) */}
          <div className="relative">
            <input
              type="email"
              id="login-email"
              name="email"
              autoComplete="email"
              placeholder=" " /* IMPORTANT: single space for :placeholder-shown */
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
              required
            />
            <label
              htmlFor="login-email"
              className="
                pointer-events-none absolute left-3
                text-emerald-700 font-medium
                transition-all duration-200
                -top-2 text-xs bg-white/80 px-1 rounded
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-base
                peer-placeholder-shown:bg-transparent
                peer-placeholder-shown:px-0
                peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white/80 peer-focus:px-1
              "
            >
              Email
            </label>
          </div>

          {/* Password (floating label fixed) */}
          <div className="relative">
            <input
              type="password"
              id="login-password"
              name="password"
              autoComplete="current-password"
              placeholder=" "
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm hover:shadow-md"
              required
            />
            <label
              htmlFor="login-password"
              className="
                pointer-events-none absolute left-3
                text-emerald-700 font-medium
                transition-all duration-200
                -top-2 text-xs bg-white/80 px-1 rounded
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-base
                peer-placeholder-shown:bg-transparent
                peer-placeholder-shown:px-0
                peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white/80 peer-focus:px-1
              "
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 px-6 rounded-full text-base md:text-lg font-semibold shadow-md hover:from-emerald-600 hover:to-green-500 hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-xl">🔒</span> Login
          </button>
        </form>

        <p className="mt-8 text-center text-emerald-700 text-base md:text-lg">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-emerald-600 hover:underline font-medium">
            Sign Up
          </button>
        </p>

        {/* Test Button (optional) */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.setItem('isAuthenticated', 'true');
              if (onLogin) onLogin();
              navigate('/dashboard');
            }}
            className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-full text-base font-semibold shadow-md hover:bg-gray-300 hover:shadow-lg transition-all duration-300 mt-2"
          >
            Go to Dashboard (for testing)
          </button>
        </div>
      </div>
    </div>
  );
}
