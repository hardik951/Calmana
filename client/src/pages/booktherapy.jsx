import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookTherapy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 p-6 font-inter">
      <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-6 text-center">
        🧠 Schedule your Appointment
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center max-w-xl">
        Ready to talk? Schedule a one-on-one therapy session. We're here to help you feel better.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        
        <button
          onClick={() => navigate('/doctor-appointment')}
          className="bg-white border border-emerald-600 text-emerald-700 px-6 py-3 rounded-full hover:bg-emerald-50 transition"
        >
          Book Doctor's Appointment
        </button>
      </div>
    </div>
  );
}
