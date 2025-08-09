import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const NavDiv = ({ to, className, children }) => (
    <div
      tabIndex={0}
      role="button"
      onClick={() => {
        navigate(to);
        if (!isDesktop) setIsMobileMenuOpen(false);
      }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          navigate(to);
          if (!isDesktop) setIsMobileMenuOpen(false);
        }
      }}
      className={className}
    >
      {children}
    </div>
  );

  const sections = [
    {
      key: 'chatrooms',
      title: 'CHATROOMS',
      items: [
        { to: '/chatroom/anxiety-support', label: 'Anxiety Support' },
        { to: '/chatroom/mindfulness-practice', label: 'Mindfulness Practice' },
      ],
      icon: '#',
    },
    {
      key: 'directMessages',
      title: 'DIRECT MESSAGES',
      items: [
        { to: '/dm/karen', label: 'Karen', colorBg: 'bg-emerald-300', colorText: 'text-emerald-800', initial: 'K' },
        { to: '/dm/alex', label: 'Alex', colorBg: 'bg-green-300', colorText: 'text-green-800', initial: 'A' },
        { to: '/dm/jordan', label: 'Jordan', colorBg: 'bg-lime-300', colorText: 'text-lime-800', initial: 'J' },
      ],
    },
    {
      key: 'communitySnapshot',
      title: 'COMMUNITY SNAPSHOT',
      items: [
        { to: '/community/fiona', label: 'Fiona', colorBg: 'bg-emerald-400', initial: 'F' },
        { to: '/community/maya', label: 'Maya', colorBg: 'bg-green-400', initial: 'M' },
      ],
    },
    {
      key: 'notifications',
      title: 'NOTIFICATIONS',
      items: [
        {
          to: '/notifications/karen',
          label: (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-emerald-800">New Message from Karen <span className="text-xs text-emerald-600 ml-1">10 min ago</span></p>
                <p className="text-emerald-700 text-xs mt-1">Hey, let’s catch up soon!</p>
              </div>
            </>
          ),
        },
        {
          to: '/notifications/community',
          label: (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-emerald-800">Community Update <span className="text-xs text-emerald-600 ml-1">1 hour ago</span></p>
                <p className="text-emerald-700 text-xs mt-1">New mindfulness session added!</p>
              </div>
            </>
          ),
        },
      ],
    },
  ];

  return (
    <>
      {/* Hamburger - show only if menu closed on mobile */}
      {!isDesktop && !isMobileMenuOpen && (
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle sidebar"
          className="fixed top-4 left-4 z-50 p-2 bg-emerald-600 rounded-md text-white shadow-lg focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      )}

      {/* Sidebar - full screen on mobile when open */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-r from-emerald-100 via-pink-100 to-green-100
          shadow-lg p-6 border border-white/20 font-inter z-50
          transform transition-transform duration-300 ease-in-out
          ${isDesktop ? 'relative sticky top-6 w-full max-w-none rounded-xl shadow-none transform-none' : ''}
          ${!isDesktop && (isMobileMenuOpen ? 'w-full translate-x-0' : '-translate-x-full w-0')}
        `}
        style={{ animationDelay: '0.2s' }}
      >
        {/* Close button on mobile */}
        {!isDesktop && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close sidebar"
            className="mb-6 text-emerald-700 hover:text-emerald-900 focus:outline-none"
          >
            ✕ Close
          </button>
        )}

        <div className="space-y-6 overflow-y-auto h-full pb-10">
          {sections.map(({ key, title, items, icon }) => (
            <div
              key={key}
              className="relative group"
              onMouseEnter={() => {
                if (!isDesktop) return;
                document.getElementById(`${key}-dropdown`)?.classList.remove('max-h-0');
                document.getElementById(`${key}-dropdown`)?.classList.add('max-h-[500px]');
              }}
              onMouseLeave={() => {
                if (!isDesktop) return;
                document.getElementById(`${key}-dropdown`)?.classList.add('max-h-0');
                document.getElementById(`${key}-dropdown`)?.classList.remove('max-h-[500px]');
              }}
            >
              <h3 className="text-base lg:text-lg font-bold text-emerald-800 mb-2 flex justify-between items-center cursor-pointer group-hover:text-emerald-700 transition-colors duration-200">
                {title}
                <span className="hidden lg:inline"></span>
              </h3>

              <div
                id={`${key}-dropdown`}
                className={`overflow-hidden transition-all duration-300 ease-in-out
                  ${isDesktop ? 'max-h-0 group-hover:max-h-[500px]' : 'max-h-[500px]'}
                `}
              >
                <div className="space-y-1">
                  {items.map((item, idx) => {
                    const labelContent = typeof item.label === 'string' ? (
                      <span className="text-emerald-700 text-sm lg:text-base font-medium">{item.label}</span>
                    ) : (
                      item.label
                    );

                    if (key === 'directMessages') {
                      return (
                        <div
                          key={idx}
                          tabIndex={0}
                          role="button"
                          onClick={() => {
                            navigate(item.to);
                            if (!isDesktop) setIsMobileMenuOpen(false);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              navigate(item.to);
                              if (!isDesktop) setIsMobileMenuOpen(false);
                            }
                          }}
                          className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-center shadow-sm hover:shadow-md mb-1 border border-white/20"
                        >
                          <div
                            className={`${item.colorBg} flex-shrink-0 rounded-full h-6 w-6 lg:h-7 lg:w-7 flex items-center justify-center font-semibold text-xs lg:text-sm ${item.colorText}`}
                          >
                            {item.initial}
                          </div>
                          <span className="ml-2 text-emerald-700 text-sm lg:text-base font-medium">{item.label}</span>
                        </div>
                      );
                    } else if (key === 'communitySnapshot') {
                      return (
                        <div
                          key={idx}
                          tabIndex={0}
                          role="button"
                          onClick={() => {
                            navigate(item.to);
                            if (!isDesktop) setIsMobileMenuOpen(false);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              navigate(item.to);
                              if (!isDesktop) setIsMobileMenuOpen(false);
                            }
                          }}
                          className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-start shadow-sm hover:shadow-md mb-1 border border-white/20"
                        >
                          <div
                            className={`${item.colorBg} flex-shrink-0 rounded-full h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center text-white font-bold text-sm lg:text-base`}
                          >
                            {item.initial}
                          </div>
                          <div className="ml-2">
                            <p className="text-xs lg:text-sm font-semibold text-emerald-800 leading-snug">{item.label}</p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={idx}
                          tabIndex={0}
                          role="button"
                          onClick={() => {
                            navigate(item.to);
                            if (!isDesktop) setIsMobileMenuOpen(false);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              navigate(item.to);
                              if (!isDesktop) setIsMobileMenuOpen(false);
                            }
                          }}
                          className="w-full bg-white/10 rounded-lg p-2 lg:p-3 cursor-pointer hover:bg-white/20 flex items-center shadow-sm hover:shadow-md mb-1 border border-white/20"
                        >
                          {icon && <span className="text-emerald-400 mr-2 lg:mr-3 text-lg lg:text-xl">{icon}</span>}
                          {labelContent}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Subscription */}
          <div className="pt-4 border-t border-white/30">
            <h3 className="text-base lg:text-lg font-bold text-emerald-800 mb-3">Subscribe</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks for subscribing!');
                if (!isDesktop) setIsMobileMenuOpen(false);
              }}
              className="flex flex-col space-y-3"
            >
              <input
                type="email"
                placeholder="Your email"
                required
                className="p-2 rounded border border-gray-300 focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* SOS Button */}
          <div className="mt-6">
            <button
              onClick={() => {
                navigate('/sos');
                if (!isDesktop) setIsMobileMenuOpen(false);
              }}
              className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
            >
              🚨 SOS
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay backdrop */}
      {!isDesktop && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          aria-hidden="true"
        />
      )}
    </>
  );
}
