import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
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
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      if (onLogin) onLogin();

      const destination = userType === 'doctor' ? '/doctor-dashboard' : '/dashboard';
      navigate(destination);
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-inter">
      <div className="relative bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 lg:p-12 xl:p-16 w-full max-w-md md:max-w-lg lg:max-w-xl border border-emerald-200">
        <h2 className="text-3xl font-bold text-emerald-800 mb-8 text-center">Login to Calmana</h2>

        <div className="flex justify-center mb-8 gap-6">
          {['patient', 'doctor'].map((type) => (
            <button
              key={type}
              type="button"
              className={`flex flex-col items-center px-6 py-3 rounded-2xl font-semibold border-2 transition-all duration-200 shadow-sm text-base focus:outline-none ${
                userType === type
                  ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-lg'
                  : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
              }`}
              onClick={() => setUserType(type)}
              aria-pressed={userType === type}
            >
              <span className="text-2xl mb-1">{type === 'patient' ? '🧑‍🦰' : '🩺'}</span>
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-3 border border-emerald-300 rounded-xl bg-white/80 focus:ring-2 focus:ring-emerald-500"
            />
            <label className="absolute left-3 -top-2 text-xs bg-white px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-3 border border-emerald-300 rounded-xl bg-white/80 focus:ring-2 focus:ring-emerald-500"
            />
            <label className="absolute left-3 -top-2 text-xs bg-white px-1 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent">
              Password
            </label>
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-400 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all"
          >
            {loading ? 'Logging in...' : '🔒 Login'}
          </button>
        </form>

        <form onSubmit={handleSubmit} className="space-y-6"></form>
        {process.env.NODE_ENV === 'development' && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              console.log('Navigating to /doctor-dashboard');
              localStorage.setItem('isAuthenticated', 'true');
              navigate('/doctor-dashboard');
            }}
            className="w-full mt-3 bg-gray-300 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-400 transition-all"
          >
            🚀 For Development Dashboard
          </button>
        )}

        <p className="mt-6 text-center text-emerald-700">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-emerald-600 hover:underline font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}