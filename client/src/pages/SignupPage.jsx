import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

      if (!response.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err.message);
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 sm:p-8 lg:p-10 xl:p-12 font-inter">
      <motion.div
        className="relative bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 lg:p-12 xl:p-16 w-full max-w-md md:max-w-lg lg:max-w-xl border border-emerald-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02, boxShadow: "0px 10px 25px rgba(16,185,129,0.3)" }}
      >
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-800 mb-8 text-center leading-snug tracking-tight drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sign Up for Calmana
        </motion.h2>

        {/* User Type Selection */}
        <motion.div
          className="flex justify-center mb-8 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center px-6 py-3 rounded-2xl font-semibold border-2 transition-all duration-200 shadow-sm text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              userType === 'patient'
                ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-lg'
                : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
            }`}
            onClick={() => setUserType('patient')}
          >
            <span className="text-2xl mb-1">🧑‍🦰</span>
            <span>Patient</span>
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center px-6 py-3 rounded-2xl font-semibold border-2 transition-all duration-200 shadow-sm text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              userType === 'doctor'
                ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-lg'
                : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
            }`}
            onClick={() => setUserType('doctor')}
          >
            <span className="text-2xl mb-1">🩺</span>
            <span>Doctor</span>
          </motion.button>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-8"
          initial="hidden"
          animate="visible"
        >
          {[ 
            { id: 'signup-name', type: 'text', value: fullName, setValue: setFullName, label: 'Full Name' },
            { id: 'signup-email', type: 'email', value: email, setValue: setEmail, label: 'Email' },
            { id: 'signup-password', type: 'password', value: password, setValue: setPassword, label: 'Password' },
          ].map((field, i) => (
            <motion.div key={field.id} custom={i} variants={itemVariants}>
              <div className="relative">
                <input
                  type={field.type}
                  id={field.id}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <label
                  htmlFor={field.id}
                  className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1"
                >
                  {field.label}
                </label>
              </div>
            </motion.div>
          ))}

          {/* Conditional fields */}
          {userType === 'doctor' ? (
            <>
              <motion.div custom={3} variants={itemVariants}>
                <div className="relative">
                  <input
                    type="text"
                    id="signup-license"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <label htmlFor="signup-license" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
                    Medical License Number
                  </label>
                </div>
              </motion.div>
              <motion.div custom={4} variants={itemVariants}>
                <div className="relative">
                  <input
                    type="text"
                    id="signup-specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="peer w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <label htmlFor="signup-specialization" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
                    Specialization
                  </label>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div custom={3} variants={itemVariants}>
              <div className="relative">
                <label htmlFor="signup-dob" className="absolute text-xs left-3 top-2 text-emerald-700 bg-white/80 px-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="signup-dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full p-3 md:p-4 border border-emerald-300 rounded-xl bg-white/80 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </motion.div>
          )}

          {error && <motion.p className="text-red-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.p>}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded-full font-semibold shadow-md"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-6 text-center text-emerald-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-emerald-600 hover:underline font-medium">
            Login
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
