// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
    window.location.reload();
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 shadow-md py-4 px-6 flex items-center justify-between font-inter z-50 relative">
      {/* Logo */}
      <div className="text-3xl font-extrabold tracking-tight text-emerald-700 flex items-center gap-1">
        <span className="text-emerald-600">🌿</span>
        <span>Cal</span><span className="text-green-800">mana</span>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-emerald-700 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Nav + Auth */}
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-base font-medium text-gray-700">
          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="hover:text-emerald-700 transition duration-200">Dashboard</Link>
              <Link to="/mood-tracker" className="hover:text-emerald-700 transition duration-200">Mood Tracker</Link>
              <Link to="/ai-chat" className="hover:text-emerald-700 transition duration-200">AI Chat</Link>
              <Link to="/feedback" className="hover:text-emerald-700 transition duration-200">Feedback</Link>
              <Link to="/book-therapy" className="hover:text-emerald-700 transition duration-200">Book Therapy</Link>
            </>
          )}
        </div>

        {/* Auth Buttons / User Avatar (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate('/auth')}
                className="bg-white text-emerald-600 font-semibold px-5 py-2 rounded-full border border-emerald-400 shadow-md hover:bg-emerald-50 hover:scale-105 transition-all duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signin')}
                className="bg-emerald-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:bg-emerald-600 hover:scale-105 transition-all duration-200"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-all duration-200">
                U
              </div>
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-50">
                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Settings</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          {!isLoggedIn ? (
            <div className="flex flex-col p-2">
              <button
                onClick={() => {
                  navigate('/auth');
                  toggleMobileMenu();
                }}
                className="bg-white text-emerald-600 font-semibold px-4 py-2 rounded-full border border-emerald-400 shadow-md hover:bg-emerald-50 mb-2"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  navigate('/signin');
                  toggleMobileMenu();
                }}
                className="bg-emerald-500 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-emerald-600"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="flex flex-col p-2">
              <Link to="/dashboard" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Dashboard</Link>
              <Link to="/mood-tracker" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Mood Tracker</Link>
              <Link to="/ai-chat" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">AI Chat</Link>
              <Link to="/feedback" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Feedback</Link>
              <Link to="/book-therapy" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Book Therapy</Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link to="/profile" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Profile</Link>
              <Link to="/settings" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Settings</Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
