import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookSession() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', datetime: '', description: '' });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Placeholder for booking logic
    alert('Session booked!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 p-6 font-inter animate-gradient-green-pink-shift bg-[length:400%_400%]">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 text-center leading-tight">
        Book a Session
      </h1>
      {/* Subheading */}
      <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 text-center max-w-xl leading-relaxed">
        Schedule a session and start your journey to better mental health. Fill out the form below to book your session.
      </p>
      {/* Booking Form */}
      <form onSubmit={handleFormSubmit} className="bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-lg rounded-xl p-8 w-full max-w-md border border-white/20 mb-8 animate-fade-in-up bg-[length:400%_400%] animate-gradient-green-pink-shift">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4 text-center">Book Your Session</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="datetime-local"
            name="datetime"
            value={form.datetime}
            onChange={handleFormChange}
            className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Briefly describe your concern"
            className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            rows={3}
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all duration-300 hover:brightness-110"
          >
            Book Session
          </button>
        </div>
      </form>
      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="text-emerald-600 hover:underline font-medium flex items-center justify-center mt-4"
        aria-label="Back to Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>
    </div>
  );
} 
