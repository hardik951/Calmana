import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, UserCircle, Calendar, MessageSquare, Heart } from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 px-6 py-12">
      {/* Logo / Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-2">
          Calmana
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Mental Health Platform
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connecting patients with mental health resources and guidance through
          our comprehensive platform. Start your journey toward wellness today.
        </p>
      </div>

      {/* Auth Buttons */}
      <div className="flex flex-col items-center gap-3 mb-14">
        <div className="flex gap-4">
          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            <LogIn size={20} /> Login
          </button>

          {/* Sign Up */}
          <button
            onClick={() => navigate("/signup")}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            <UserPlus size={20} /> Sign Up
          </button>
        </div>

        {/* Guest Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-medium text-base transition-colors duration-300"
        >
          <UserCircle size={20} /> Continue as Guest
        </button>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center">
          <Calendar className="mx-auto text-emerald-600 mb-4" size={32} />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Easy Scheduling
          </h3>
          <p className="text-gray-600 text-sm">
            Book and manage appointments seamlessly with just a few clicks.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center">
          <MessageSquare className="mx-auto text-emerald-600 mb-4" size={32} />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Secure Messaging
          </h3>
          <p className="text-gray-600 text-sm">
            Communicate safely with your mental health support system.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center">
          <Heart className="mx-auto text-emerald-600 mb-4" size={32} />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Personal Care
          </h3>
          <p className="text-gray-600 text-sm">
            Tailored mental health support designed for your unique needs.
          </p>
        </div>
      </div>
    </div>
  );
}
