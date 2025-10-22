// src/pages/AIChatPage.jsx
import React from 'react';
import AIChat from '../components/AIChat';
import { useNavigate } from 'react-router-dom';

export default function AIChatPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-pink-100 to-green-100 bg-[length:200%_200%] animate-gradient-green-pink-shift flex flex-col items-center justify-between font-inter text-gray-800 p-4">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="text-green-700 hover:underline text-lg font-medium mb-4"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-center text-green-900 mb-6">
          Calmana AI Therapy
        </h1>
        <div className="h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar px-2">
          <AIChat />
        </div>
      </div>
    </div>
  );
}
