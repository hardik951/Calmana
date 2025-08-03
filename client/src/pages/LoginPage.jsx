import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('patient');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle server-side errors (e.g., invalid credentials)
        throw new Error(data.message || 'Login failed');
      }

      // On successful login, store the token and user ID
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      // Perform any additional login actions (e.g., updating a global state)
      if (onLogin) onLogin();
      
      // Navigate to the dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
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
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="login-email"
              name="email"
              autoComplete="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="login-password"
              name="password"
              autoComplete="current-password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          
          {error && (
            <p className="text-red-500 text-sm text-center font-medium mt-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 px-6 rounded-full text-base md:text-lg font-semibold shadow-md hover:from-emerald-600 hover:to-green-500 hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="text-xl">🔒</span> Login
              </span>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-emerald-700 text-base md:text-lg">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-emerald-600 hover:underline font-medium">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
