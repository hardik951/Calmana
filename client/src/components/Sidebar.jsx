import React, { useState, useEffect } from 'react';

export default function Sidebar({ navigate }) {
  const [isOpen, setIsOpen] = useState({
    chatrooms: false,
    directMessages: false,
    communitySnapshot: false,
    notifications: false,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen({
          chatrooms: false,
          directMessages: false,
          communitySnapshot: false,
          notifications: false,
        });
      } else {
        setIsOpen({
          chatrooms: false,
          directMessages: false,
          communitySnapshot: false,
          notifications: false,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderDropdown = (section, children) => (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen[section] ? 'max-h-[500px]' : 'max-h-0'}`}>{children}</div>
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (!isMobileMenuOpen) {
      setIsOpen({
        chatrooms: false,
        directMessages: false,
        communitySnapshot: false,
        notifications: false,
      });
    } else {
      setIsOpen({
        chatrooms: false,
        directMessages: false,
        communitySnapshot: false,
        notifications: false,
      });
    }
  };

  return (
    <aside className="lg:col-span-1 bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100 shadow-lg rounded-xl p-4 lg:p-6 h-fit sticky top-6 border border-white/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-slow font-inter bg-[length:400%_400%] animate-gradient-green-pink-shift" style={{ animationDelay: '0.2s' }}>

      <div className="lg:hidden flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-emerald-800">Menu</h2>
        <button
          onClick={toggleMobileMenu}
          className="text-emerald-700 hover:text-emerald-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">

        {/* CHATROOMS */}
        <div>
          <button onClick={() => toggleSection('chatrooms')} className="w-full text-left text-base lg:text-lg font-bold text-emerald-800 mb-2 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200">
            CHATROOMS
            <span>{isOpen.chatrooms ? '▲' : '▼'}</span>
          </button>
          {renderDropdown('chatrooms', (
            <>
              <button onClick={() => navigate('/chatroom/anxiety-support')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-center shadow-sm hover:shadow-md mb-1 border border-white/20">
                <span className="text-emerald-400 mr-2 lg:mr-3 text-lg lg:text-xl">#</span>
                <span className="text-emerald-700 text-sm lg:text-base font-medium">Anxiety Support</span>
              </button>
              <button onClick={() => navigate('/chatroom/mindfulness-practice')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-center shadow-sm hover:shadow-md border border-white/20">
                <span className="text-emerald-400 mr-2 lg:mr-3 text-lg lg:text-xl">#</span>
                <span className="text-emerald-700 text-sm lg:text-base font-medium">Mindfulness Practice</span>
              </button>
            </>
          ))}
        </div>

        {/* DIRECT MESSAGES */}
        <div>
          <button onClick={() => toggleSection('directMessages')} className="w-full text-left text-base lg:text-lg font-bold text-emerald-700 mb-2 flex justify-between items-center hover:text-emerald-600 transition-colors duration-200">
            DIRECT MESSAGES
            <span>{isOpen.directMessages ? '▲' : '▼'}</span>
          </button>
          {renderDropdown('directMessages', (
            <>
              <button onClick={() => navigate('/dm/karen')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-center shadow-sm hover:shadow-md mb-1 border border-white/20">
                <div className="rounded-full h-6 w-6 lg:h-7 lg:w-7 bg-emerald-300 flex items-center justify-center text-emerald-800 font-semibold text-xs lg:text-sm">K</div>
                <span className="text-emerald-700 text-sm lg:text-base font-medium ml-2">Karen</span>
              </button>
              <button onClick={() => navigate('/dm/alex')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-center shadow-sm hover:shadow-md mb-1 border border-white/20">
                <div className="rounded-full h-6 w-6 lg:h-7 lg:w-7 bg-green-300 flex items-center justify-center text-green-800 font-semibold text-xs lg:text-sm">A</div>
                <span className="text-emerald-700 text-sm lg:text-base font-medium ml-2">Alex</span>
              </button>
              <button onClick={() => navigate('/dm/jordan')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-center shadow-sm hover:shadow-md border border-white/20">
                <div className="rounded-full h-6 w-6 lg:h-7 lg:w-7 bg-lime-300 flex items-center justify-center text-lime-800 font-semibold text-xs lg:text-sm">J</div>
                <span className="text-emerald-700 text-sm lg:text-base font-medium ml-2">Jordan</span>
              </button>
            </>
          ))}
        </div>

        {/* COMMUNITY SNAPSHOT */}
        <div>
          <button onClick={() => toggleSection('communitySnapshot')} className="w-full text-left text-base lg:text-lg font-bold text-emerald-800 mb-2 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200">
            COMMUNITY SNAPSHOT
            <span>{isOpen.communitySnapshot ? '▲' : '▼'}</span>
          </button>
          {renderDropdown('communitySnapshot', (
            <>
              <button onClick={() => navigate('/community/fiona')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-start shadow-sm hover:shadow-md mb-1 border border-white/20">
                <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-emerald-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm lg:text-base">F</div>
                <div className="ml-2">
                  <p className="text-xs lg:text-sm font-semibold text-emerald-800 leading-snug">Fiona</p>
                </div>
              </button>
              <button onClick={() => navigate('/community/maya')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-start shadow-sm hover:shadow-md border border-white/20">
                <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-green-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm lg:text-base">M</div>
                <div className="ml-2">
                  <p className="text-xs lg:text-sm font-semibold text-emerald-800 leading-snug">Maya</p>
                </div>
              </button>
            </>
          ))}
        </div>

        {/* NOTIFICATIONS */}
        <div>
          <button onClick={() => toggleSection('notifications')} className="w-full text-left text-base lg:text-lg font-bold text-emerald-800 mb-2 flex justify-between items-center hover:text-emerald-700 transition-colors duration-200">
            NOTIFICATIONS
            <span>{isOpen.notifications ? '▲' : '▼'}</span>
          </button>
          {renderDropdown('notifications', (
            <>
              <button onClick={() => navigate('/notifications/karen')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 mb-1 border border-white/20 hover:bg-white/20 transition-colors duration-200">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-emerald-800">New Message from Karen <span className="text-xs text-emerald-600 ml-1">10 min ago</span></p>
                    <p className="text-emerald-700 text-xs mt-1">Hey, let’s catch up soon!</p>
                  </div>
                </div>
              </button>
              <button onClick={() => navigate('/notifications/community')} className="w-full bg-white/10 rounded-lg p-2 lg:p-3 border border-white/20 hover:bg-white/20 transition-colors duration-200">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-emerald-800">Community Update <span className="text-xs text-emerald-600 ml-1">1 hour ago</span></p>
                    <p className="text-emerald-700 text-xs mt-1">New mindfulness session added!</p>
                  </div>
                </div>
              </button>
            </>
          ))}
        </div>
      </div>
    </aside>
  );
}