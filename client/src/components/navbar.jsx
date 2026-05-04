// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Announcement from './announcement'; // If your file is 'Announcement.jsx', change to './Announcement'

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    setIsLoggedIn(auth === 'true');
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/auth');
    window.location.reload();
  };

  return (
    <>
      <Announcement />

      <nav className="bg-gradient-to-r from-green-100/90 via-green-200/90 to-green-300/90 backdrop-blur-md border-b border-green-300 shadow-sm py-4 px-6 sm:px-10 flex items-center justify-between font-inter z-50 sticky top-0 transition-all duration-300">

        {/* Logo */}
        <div
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-800 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate('/dashboard')}
        >
          <span className="text-emerald-600 drop-shadow-sm">🌿</span>
          <span>Calmana</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-emerald-700 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-emerald-800">
            {isLoggedIn && (
              <>
                <Link to="/find-doctors" className="hover:text-emerald-600 transition-colors duration-200">
                  Find Doctors
                </Link>
                <Link to="/ai-chat" className="hover:text-emerald-600 transition-colors duration-200">
                  AI Therapy
                </Link>
                <Link to="/book-therapy" className="hover:text-emerald-600 transition-colors duration-200">
                  Book an Appointment
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-emerald-800 hover:text-emerald-900 font-bold px-4 py-2 transition-colors duration-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-full shadow-[0_4px_14px_0_rgb(16,185,129,0.3)] hover:bg-emerald-700 transition-all duration-200 hover:-translate-y-0.5"
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
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Logout</button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Dropdown */}
          <div
            className={`md:hidden absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            {!isLoggedIn ? (
              <div className="flex flex-col p-2">
                <button
                  onClick={() => { navigate('/login'); toggleMobileMenu(); }}
                  className="bg-white text-emerald-600 font-semibold px-4 py-2 rounded-full border border-emerald-400 shadow-md hover:bg-emerald-50 mb-2"
                >
                  Log In
                </button>
                <button
                  onClick={() => { navigate('/signup'); toggleMobileMenu(); }}
                  className="bg-emerald-500 text-white font-semibold px-4 py-2 rounded-full shadow-md hover:bg-emerald-600"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex flex-col p-2">
                <Link to="/find-doctors" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Find Doctors</Link>
                <Link to="/ai-chat" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">AI Chat</Link>
                <Link to="/book-therapy" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Book Therapy</Link>
                <div className="border-t border-gray-200 my-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}></div>
                <Link to="/profile" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Profile</Link>
                <Link to="/settings" onClick={toggleMobileMenu} className="block px-4 py-2 text-gray-700 hover:bg-emerald-50">Settings</Link>
                <button onClick={() => { handleLogout(); toggleMobileMenu(); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
