import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) { // Accept onLogin prop
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted! Attempting to navigate to /dashboard");
    // Simulate successful login
    if (onLogin) {
      onLogin(); // Call the parent function to update authentication state
    }
    navigate('/dashboard'); // Navigate after state update
  };

  const handleDashboardClick = () => {
    console.log("Test button clicked! Navigating to /dashboard");
    if (onLogin) {
      onLogin(); // Update authentication state for testing
    }
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-inter">
      <div className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-xl rounded-2xl p-8 md:p-10 lg:p-12 xl:p-16 w-full max-w-md md:max-w-lg lg:max-w-xl border border-white/20 animate-fade-in-up bg-[length:400%_400%]" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-800 mb-6 md:mb-8 text-center leading-snug">Login to Calmana</h2>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div>
            <label htmlFor="login-email" className="block text-emerald-700 text-base md:text-lg lg:text-xl font-medium mb-2">Email</label>
            <input
              type="email"
              id="login-email"
              name="email"
              className="w-full p-3 md:p-4 lg:p-5 border border-emerald-300 rounded-lg bg-emerald-50 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg lg:text-xl transition-colors duration-200"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-emerald-700 text-base md:text-lg lg:text-xl font-medium mb-2">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              className="w-full p-3 md:p-4 lg:p-5 border border-emerald-300 rounded-lg bg-emerald-50 text-emerald-800 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg lg:text-xl transition-colors duration-200"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-full text-lg md:text-xl lg:text-2xl font-semibold shadow-md
                      hover:from-emerald-700 hover:to-green-700 hover:shadow-lg transition-all duration-300 hover:brightness-110"
          >
            Login
          </button>
        </form>

        <p className="mt-6 md:mt-8 text-center text-emerald-700 text-base md:text-lg">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-emerald-600 hover:underline font-medium">
            Sign Up
          </button>
        </p>

        {/* NEW: Button to redirect to Dashboard for testing */}
        <div className="mt-6 md:mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleDashboardClick}
            className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-full text-lg md:text-xl lg:text-2xl font-semibold shadow-md
                      hover:bg-gray-300 hover:shadow-lg transition-all duration-300 hover:brightness-105"
          >
            Go to Dashboard (for testing)
          </button>
        </div>
      </div>
    </div>
  );
}