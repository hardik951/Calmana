import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-200 p-4">
      <div className="flex items-center mb-8">
        <span className="text-5xl mr-5">🌿</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 tracking-tight text-center">
          Welcome to Calmana
        </h1>
      </div>
      <p className="text-lg md:text-xl text-green-700 font-medium mb-12 text-center max-w-2xl">
        Your personal oasis for wellness and calm
      </p>
      <button
        className="bg-gradient-to-r from-green-500 via-emerald-500 to-lime-400 text-white px-8 py-4 rounded-full shadow-xl hover:from-emerald-600 hover:to-green-400 transition duration-200 text-lg font-semibold tracking-wide flex items-center transform hover:scale-105"
        onClick={() => navigate('/auth')}
      >
        <span className="mr-3 text-2xl">🍃</span>
        Enter Calmana
      </button>
    </div>
  );
}