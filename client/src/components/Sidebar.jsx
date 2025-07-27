import React, { useState, useEffect } from 'react';

export default function Sidebar({ navigate }) {
  const [isOpen, setIsOpen] = useState({
    chatrooms: false,
    directMessages: false,
    communitySnapshot: false,
    doctors: false,
    medical: false,
    locator: false,
    notifications: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle window resize to reset mobile menu state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsOpen({
          chatrooms: true,
          directMessages: true,
          communitySnapshot: true,
          doctors: true,
          medical: true,
          locator: true,
          notifications: true,
        }); // Open all on desktop
      } else {
        setIsMobileMenuOpen(false);
        setIsOpen({
          chatrooms: false,
          directMessages: false,
          communitySnapshot: false,
          doctors: false,
          medical: false,
          locator: false,
          notifications: false,
        }); // Close all on mobile
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false); // Close mobile menu when opening a section
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (!isMobileMenuOpen) {
      setIsOpen({
        chatrooms: true,
        directMessages: true,
        communitySnapshot: true,
        doctors: true,
        medical: true,
        locator: true,
        notifications: true,
      }); // Open all when mobile menu opens
    } else {
      setIsOpen({
        chatrooms: false,
        directMessages: false,
        communitySnapshot: false,
        doctors: false,
        medical: false,
        locator: false,
        notifications: false,
      }); // Close all when mobile menu closes
    }
  };

  return (
    <aside className="lg:col-span-1 bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-lg rounded-xl p-4 lg:p-8 h-fit sticky top-8 border border-white/20
                     hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-slow font-inter bg-[length:400%_400%] animate-gradient-green-pink-shift"
           style={{ animationDelay: '0.2s' }}>
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-emerald-800">Menu</h2>
        <button
          onClick={toggleMobileMenu}
          className="text-emerald-700 hover:text-emerald-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="space-y-8">
        {/* CHATROOMS Section */}
        <div>
          <button
            onClick={() => toggleSection('chatrooms')}
            className="w-full text-left text-lg lg:text-xl font-bold text-emerald-800 mb-3 lg:mb-4 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200"
            aria-expanded={isOpen.chatrooms}
          >
            CHATROOMS
            <span>{isOpen.chatrooms ? '▲' : '▼'}</span>
          </button>
          <div className={`${(isOpen.chatrooms || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024) ? 'block' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}
               style={{ maxHeight: isOpen.chatrooms || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024 ? '1000px' : '0' }}>
            <div className="bg-white/10 rounded-lg p-3 lg:p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200 flex items-center shadow-sm hover:shadow-md mb-2 border border-white/20"
                 onClick={() => navigate('/chatroom/anxiety-support')}>
              <span className="text-emerald-400 mr-3 lg:mr-4 text-xl lg:text-2xl">#</span>
              <span className="text-emerald-700 lg:text-lg font-medium leading-normal">Anxiety Support</span>
            </div>
            <div className="bg-white/10 rounded-lg p-3 lg:p-4 cursor-pointer hover:bg-white/20 transition-colors duration-200 flex items-center shadow-sm hover:shadow-md border border-white/20"
                 onClick={() => navigate('/chatroom/mindfulness-practice')}>
              <span className="text-emerald-400 mr-3 lg:mr-4 text-xl lg:text-2xl">#</span>
              <span className="text-emerald-700 lg:text-lg font-medium leading-normal">Mindfulness Practice</span>
            </div>
          </div>
        </div>

        {/* DIRECT MESSAGES Section */}
        <div>
          <button
            onClick={() => toggleSection('directMessages')}
            className="w-full text-left text-base lg:text-lg font-bold text-emerald-700 mb-3 lg:mb-4 flex justify-between items-center hover:text-emerald-600 transition-colors duration-200"
            aria-expanded={isOpen.directMessages}
          >
            DIRECT MESSAGES
            <span>{isOpen.directMessages ? '▲' : '▼'}</span>
          </button>
          <div className={`${(isOpen.directMessages || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024) ? 'block' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}
               style={{ maxHeight: isOpen.directMessages || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024 ? '1000px' : '0' }}>
            <div className="flex items-center space-x-3 mb-2 cursor-pointer hover:bg-white/10 p-2 lg:p-3 rounded-lg transition-colors duration-200"
                 onClick={() => navigate('/dm/karen')}>
              <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-emerald-300 flex items-center justify-center text-emerald-800 font-semibold text-sm lg:text-base">K</div>
              <span className="text-emerald-700 lg:text-lg font-medium leading-normal">Karen</span>
            </div>
            <div className="flex items-center space-x-3 mb-2 cursor-pointer hover:bg-white/10 p-2 lg:p-3 rounded-lg transition-colors duration-200"
                 onClick={() => navigate('/dm/alex')}>
              <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-green-300 flex items-center justify-center text-green-800 font-semibold text-sm lg:text-base">A</div>
              <span className="text-emerald-700 lg:text-lg font-medium leading-normal">Alex</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer hover:bg-white/10 p-2 lg:p-3 rounded-lg transition-colors duration-200"
                 onClick={() => navigate('/dm/jordan')}>
              <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-lime-300 flex items-center justify-center text-lime-800 font-semibold text-sm lg:text-base">J</div>
              <span className="text-emerald-700 lg:text-lg font-medium leading-normal">Jordan</span>
            </div>
          </div>
        </div>

        {/* COMMUNITY SNAPSHOT Section */}
        <div>
          <button
            onClick={() => toggleSection('communitySnapshot')}
            className="w-full text-left text-lg lg:text-xl font-bold text-emerald-800 mb-3 lg:mb-4 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200"
            aria-expanded={isOpen.communitySnapshot}
          >
            COMMUNITY SNAPSHOT
            <span>{isOpen.communitySnapshot ? '▲' : '▼'}</span>
          </button>
          <div className={`${(isOpen.communitySnapshot || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024) ? 'block' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}
               style={{ maxHeight: isOpen.communitySnapshot || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024 ? '1000px' : '0' }}>
            <div className="flex items-start space-x-3 mb-4 bg-white/10 p-3 lg:p-4 rounded-lg shadow-sm border border-white/20 hover:shadow-md transition-shadow duration-300">
              <div className="rounded-full h-10 w-10 lg:h-12 lg:w-12 bg-emerald-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-md lg:text-lg">F</div>
              <div>
                <p className="text-sm lg:text-base font-semibold text-emerald-800 leading-snug">Fiona <span className="text-xs lg:text-sm text-emerald-600 font-normal ml-1">2 hours ago</span></p>
                <p className="text-md lg:text-lg text-emerald-700 leading-relaxed mt-1 lg:mt-2">"Took a big step forward in my healing journey today! ✨"</p>
                <div className="flex items-center space-x-4 mt-2 lg:mt-3 text-emerald-600 text-sm lg:text-base">
                  <button className="flex items-center hover:text-emerald-700 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    12
                  </button>
                  <button className="flex items-center hover:text-emerald-700 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    4
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 mb-4 bg-white/10 p-3 lg:p-4 rounded-lg shadow-sm border border-white/20 hover:shadow-md transition-shadow duration-300">
              <div className="rounded-full h-10 w-10 lg:h-12 lg:w-12 bg-green-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-md lg:text-lg">M</div>
              <div>
                <p className="text-sm lg:text-base font-semibold text-emerald-800 leading-snug">Maya <span className="text-xs lg:text-sm text-emerald-600 font-normal ml-1">5 hours ago</span></p>
                <p className="text-md lg:text-lg text-emerald-700 leading-relaxed mt-1 lg:mt-2">"Found a great resource for managing stress today!"</p>
                <div className="flex items-center space-x-4 mt-2 lg:mt-3 text-emerald-600 text-sm lg:text-base">
                  <button className="flex items-center hover:text-emerald-700 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    7
                  </button>
                  <button className="flex items-center hover:text-emerald-700 transition duration-150">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    1
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DOCTORS Section */}
        <div>
          <button
            onClick={() => toggleSection('doctors')}
            className="w-full text-left text-lg lg:text-xl font-bold text-emerald-800 mb-3 lg:mb-4 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200"
            aria-expanded={isOpen.doctors}
          >
            DOCTORS
            <span>{isOpen.doctors ? '▲' : '▼'}</span>
          </button>
          <div className={`${(isOpen.doctors || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024) ? 'block' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}
               style={{ maxHeight: isOpen.doctors || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024 ? '1000px' : '0' }}>
            <ul className="space-y-2">
              <li className="text-emerald-700 text-sm lg:text-base">Dr. Smith - Cardiologist</li>
              <li className="text-emerald-700 text-sm lg:text-base">Dr. Jones - General Physician</li>
            </ul>
          </div>
        </div>

        {/* MEDICAL Section */}
        <div>
          <button
            onClick={() => toggleSection('medical')}
            className="w-full text-left text-lg lg:text-xl font-bold text-emerald-800 mb-3 lg:mb-4 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200"
            aria-expanded={isOpen.medical}
          >
            MEDICAL
            <span>{isOpen.medical ? '▲' : '▼'}</span>
          </button>
          <div className={`${(isOpen.medical || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024) ? 'block' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}
               style={{ maxHeight: isOpen.medical || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024 ? '1000px' : '0' }}>
            <p className="text-emerald-700 text-sm lg:text-base">General health tips and resources...</p>
          </div>
        </div>

        {/* LOCATOR Section */}
        <div>
          <button
            onClick={() => toggleSection('locator')}
            className="w-full text-left text-lg lg:text-xl font-bold text-emerald-800 mb-3 lg:mb-4 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200"
            aria-expanded={isOpen.locator}
          >
            LOCATOR
            <span>{isOpen.locator ? '▲' : '▼'}</span>
          </button>
          <div className={`${(isOpen.locator || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024) ? 'block' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}
               style={{ maxHeight: isOpen.locator || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024 ? '1000px' : '0' }}>
            <p className="text-emerald-700 text-sm lg:text-base">Find a clinic near you...</p>
          </div>
        </div>

        {/* NOTIFICATIONS Section */}
        <div>
          <button
            onClick={() => toggleSection('notifications')}
            className="w-full text-left text-lg lg:text-xl font-bold text-emerald-800 mb-3 lg:mb-4 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200"
            aria-expanded={isOpen.notifications}
          >
            NOTIFICATIONS
            <span>{isOpen.notifications ? '▲' : '▼'}</span>
          </button>
          <div className={`${(isOpen.notifications || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024) ? 'block' : 'hidden'} overflow-hidden transition-max-height duration-300 ease-in-out`}
               style={{ maxHeight: isOpen.notifications || (isMobileMenuOpen && window.innerWidth < 1024) || window.innerWidth >= 1024 ? '1000px' : '0' }}>
            <div className="bg-white/10 rounded-lg p-3 lg:p-4 mb-2 border border-white/20 hover:bg-white/20 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div>
                  <p className="text-sm lg:text-base font-semibold text-emerald-800">New Message from Karen <span className="text-xs lg:text-sm text-emerald-600 ml-1">10 min ago</span></p>
                  <p className="text-emerald-700 text-xs lg:text-sm mt-1">Hey, let’s catch up soon!</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 lg:p-4 border border-white/20 hover:bg-white/20 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div>
                  <p className="text-sm lg:text-base font-semibold text-emerald-800">Community Update <span className="text-xs lg:text-sm text-emerald-600 ml-1">1 hour ago</span></p>
                  <p className="text-emerald-700 text-xs lg:text-sm mt-1">New mindfulness session added!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}