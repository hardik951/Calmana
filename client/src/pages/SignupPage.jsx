// src/pages/SignupPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form submitted!");
    // navigate('/dashboard'); // Uncomment after successful signup logic
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-inter">
      {/* Added shiny hover effects here */}
      <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-xl rounded-2xl p-8 md:p-10 lg:p-12 xl:p-16 w-full max-w-md md:max-w-lg lg:max-w-xl border border-white/20 animate-fade-in-up bg-[length:400%_400%]
                      hover:brightness-110 hover:shadow-2xl hover:scale-[1.005] transition-all duration-300" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-800 mb-6 md:mb-8 text-center leading-snug">Sign Up for Calmana</h2>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div>
            <label htmlFor="signup-name" className="block text-emerald-700 text-base md:text-lg lg:text-xl font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="signup-name"
              name="name"
              className="w-full p-3 md:p-4 lg:p-5 border border-emerald-300 rounded-lg bg-emerald-50 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg lg:text-xl transition-colors duration-200"
              placeholder="Your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-emerald-700 text-base md:text-lg lg:text-xl font-medium mb-2">Email</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              className="w-full p-3 md:p-4 lg:p-5 border border-emerald-300 rounded-lg bg-emerald-50 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg lg:text-xl transition-colors duration-200"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-emerald-700 text-base md:text-lg lg:text-xl font-medium mb-2">Password</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              className="w-full p-3 md:p-4 lg:p-5 border border-emerald-300 rounded-lg bg-emerald-50 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg lg:text-xl transition-colors duration-200"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 px-6 rounded-full text-lg md:text-xl lg:text-2xl font-semibold shadow-md
                       hover:from-green-600 hover:to-lime-600 hover:shadow-lg transition-all duration-300 hover:brightness-110"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 md:mt-8 text-center text-emerald-700 text-base md:text-lg">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-emerald-600 hover:underline font-medium">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}