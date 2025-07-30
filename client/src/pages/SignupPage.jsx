// src/pages/SignupPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('patient');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted!");
    // navigate('/dashboard'); // Uncomment after successful signup logic
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-inter">
      <div className="relative bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 lg:p-12 xl:p-16 w-full max-w-md md:max-w-lg lg:max-w-xl border border-emerald-200 animate-fade-in-up bg-[length:400%_400%] transition-all duration-500 hover:scale-[1.01] hover:shadow-emerald-200 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r before:from-emerald-200 before:via-pink-100 before:to-green-200 before:opacity-40 before:-z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-800 mb-8 text-center leading-snug tracking-tight drop-shadow">
          Sign Up for Calmana
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
          {/* Full Name (floating label fixed) */}
          <div className="relative">
            <input
              type="text"
              id="signup-name"
              name="name"
              autoComplete="name"
              placeholder=" " /* IMPORTANT: single space for :placeholder-shown */
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-all duration-200 shadow-sm hover:shadow-md"
              required
            />
            <label
              htmlFor="signup-name"
              className="
                pointer-events-none absolute left-3
                text-emerald-700 font-medium
                transition-all duration-200
                /* Default: floated (small, top) */
                -top-2 text-xs bg-white/80 px-1 rounded
                /* When empty (placeholder visible): drop down to field */
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-base
                peer-placeholder-shown:bg-transparent
                peer-placeholder-shown:px-0
                /* On focus, ensure floated */
                peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white/80 peer-focus:px-1
              "
            >
              Full Name
            </label>
          </div>

          {/* Email (floating label fixed) */}
          <div className="relative">
            <input
              type="email"
              id="signup-email"
              name="email"
              autoComplete="email"
              placeholder=" "
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-all duration-200 shadow-sm hover:shadow-md"
              required
            />
            <label
              htmlFor="signup-email"
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
              id="signup-password"
              name="password"
              autoComplete="new-password"
              placeholder=" "
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-all duration-200 shadow-sm hover:shadow-md"
              required
            />
            <label
              htmlFor="signup-password"
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

          {/* Additional fields for Doctor or Patient */}
          {userType === 'doctor' ? (
            <>
              {/* License (floating label fixed) */}
              <div className="relative">
                <input
                  type="text"
                  id="signup-license"
                  name="license"
                  placeholder=" "
                  className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  required
                />
                <label
                  htmlFor="signup-license"
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
                  Medical License Number
                </label>
              </div>

              {/* Specialization (floating label fixed) */}
              <div className="relative">
                <input
                  type="text"
                  id="signup-specialization"
                  name="specialization"
                  placeholder=" "
                  className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  required
                />
                <label
                  htmlFor="signup-specialization"
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
                  Specialization
                </label>
              </div>
            </>
          ) : (
            // Date of Birth (chip label above; no overlap)
            <div className="relative">
              <label
                htmlFor="signup-dob"
                className="absolute -top-3 left-3 bg-white/80 px-2 rounded text-emerald-700 text-xs md:text-sm font-medium"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="signup-dob"
                name="dob"
                className="w-full p-3 md:p-4 pt-3 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-all duration-200 shadow-sm hover:shadow-md appearance-none pr-10"
                required
              />
              {/* Calendar icon */}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="3" y="4" width="18" height="18" rx="4" className="fill-none" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4m8-4v4M3 10h18" />
                </svg>
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 px-6 rounded-full text-base md:text-lg font-semibold shadow-md hover:from-green-600 hover:to-lime-600 hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-xl">📝</span> Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-emerald-700 text-base md:text-lg">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-emerald-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
