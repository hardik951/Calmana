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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 p-6 font-inter">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-700 mb-6 text-center leading-tight">
        📍 Find Doctors Nearby
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 text-center max-w-xl leading-relaxed">
        Locate mental health professionals in your vicinity. Enter your location to find a specialist who can help.
      </p>

      {/* Search Input and Button */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-10">
        <input
          type="text"
          placeholder="Enter your location (e.g., city, postcode)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-grow p-3 md:p-4 border border-emerald-300 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg transition-colors duration-200 shadow-sm"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-3 rounded-full text-base md:text-lg font-semibold shadow-md hover:bg-emerald-700 transition duration-300 hover:scale-105"
        >
          Search Doctors
        </button>
      </form>

      {/* Placeholder for Map or Results */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 w-full max-w-2xl min-h-[300px] flex items-center justify-center text-gray-500 border border-gray-200 shadow-lg">
        <p className="text-xl italic">Map / Doctor listings will appear here</p>
      </div>
    </div>
  );
}