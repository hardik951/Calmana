import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('patient');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [license, setLicense] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const signupData = {
      username: fullName,
      email,
      password,
      userType,
      ...(userType === 'doctor' && { license, specialization }),
      ...(userType === 'patient' && { dob }),
    };

    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      navigate('/dashboard'); // redirected to mood page after signup
    } catch (err) {
      console.error('Signup error:', err.message);
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
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
            <span>Patient</span>
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
            <span>Doctor</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              id="signup-name"
              name="name"
              placeholder=" "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <label htmlFor="signup-name" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="signup-email"
              name="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <label htmlFor="signup-email" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              id="signup-password"
              name="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <label htmlFor="signup-password" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
              Password
            </label>
          </div>

          {/* Conditional Fields */}
          {userType === 'doctor' ? (
            <>
              <div className="relative">
                <input
                  type="text"
                  id="signup-license"
                  name="license"
                  placeholder=" "
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <label htmlFor="signup-license" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
                  Medical License Number
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="signup-specialization"
                  name="specialization"
                  placeholder=" "
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <label htmlFor="signup-specialization" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
                  Specialization
                </label>
              </div>
            </>
          ) : (
            <div className="relative">
              <label htmlFor="signup-dob" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="signup-dob"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded-full font-semibold hover:scale-105 transition-all"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-emerald-700">
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
