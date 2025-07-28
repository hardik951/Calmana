// src/pages/FindDoctors.jsx
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Uncomment if you need navigation from this page

export default function FindDoctors() {
  // const navigate = useNavigate(); // Uncomment if you need navigation

  const [location, setLocation] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for doctors near:", location);
    // In a real app, you'd integrate with a maps API or doctor directory API here
  };

  return (
    <div className="relative w-screen h-screen min-h-screen min-w-full flex flex-col items-center justify-center overflow-hidden font-inter">
      {/* Animated Gradient Background with Subtle Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-emerald-200 via-pink-100 to-green-200 animate-gradient-green-pink-shift bg-[length:300%_300%]" />
        {/* Decorative blurred shapes for depth */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-300 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-pink-200 opacity-30 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-[30%] right-[-8%] w-[30vw] h-[30vw] bg-green-200 opacity-20 rounded-full blur-2xl animate-pulse" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-emerald-800 mb-4 text-center leading-tight drop-shadow-lg">
          📍 Find Doctors Nearby
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-6 text-center max-w-2xl leading-relaxed drop-shadow">
          Locate mental health professionals in your vicinity. Enter your location to find a specialist who can help.
        </p>
        {/* Search Input and Button */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mb-8">
          <input
            type="text"
            placeholder="Enter your location (e.g., city, postcode)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-grow p-3 md:p-4 border border-emerald-300 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm md:text-base transition-colors duration-200 shadow-md"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold shadow-lg hover:bg-emerald-700 transition duration-300 hover:scale-105"
          >
            Search Doctors
          </button>
        </form>
        {/* Placeholder for Map or Results */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 w-full max-w-3xl min-h-[220px] flex items-center justify-center text-gray-500 border border-gray-200 shadow-2xl">
          <p className="text-base md:text-lg italic">Map / Doctor listings will appear here</p>
        </div>
      </div>
    </div>
  );
}