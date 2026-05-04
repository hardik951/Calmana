import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Mantras array for rotating display
  const mantras = [
    "Breathe deeply. Let calmness settle your mind.",
    "You are safe and supported, always.",
    "Peace begins with a single breath.",
    "Embrace the present moment with grace.",
  ];

  const [mantraIndex, setMantraIndex] = useState(0);

  // Rotate mantra every 7s
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMantraIndex((prevIndex) => (prevIndex + 1) % mantras.length);
    }, 7000);
    return () => clearInterval(intervalId);
  }, []);

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

  const items = [
    { to: '/resources', label: 'Wellness Resources', icon: '📚' },
    { to: '/faq', label: 'FAQ', icon: '❓' },
  ];

  return (
    <>
      {/* Hamburger (mobile only) */}
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

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white/80 backdrop-blur-xl
          shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 border border-emerald-50 font-inter z-50
          transform transition-transform duration-300 ease-in-out
          ${isDesktop ? 'relative sticky top-6 w-full max-w-none rounded-[2rem] transform-none' : ''}
          ${!isDesktop && (isMobileMenuOpen ? 'w-full translate-x-0' : '-translate-x-full w-0')}
        `}
      >
        {/* Close btn (mobile only) */}
        {!isDesktop && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close sidebar"
            className="mb-6 text-emerald-700 hover:text-emerald-900 focus:outline-none"
          >
            ✕ Close
          </button>
        )}

        <div className="space-y-2 overflow-y-auto h-full pb-10">
          {items.map((item, idx) => {
            const handleClick = () => {
              navigate(item.to);
              if (!isDesktop) setIsMobileMenuOpen(false);
            };

            return (
              <div
                key={idx}
                tabIndex={0}
                role="button"
                onClick={handleClick}
                onKeyPress={(e) => e.key === 'Enter' && handleClick()}
                className="w-full bg-emerald-50/50 hover:bg-emerald-100/50 rounded-2xl p-4 cursor-pointer flex items-center transition-all duration-300 group"
              >
                {item.icon && <span className="mr-4 text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>}
                <span className="text-emerald-900 text-base font-bold tracking-tight">{item.label}</span>
              </div>
            );
          })}

          {/* Subscription */}
          <div className="pt-6 mt-4 border-t border-emerald-50">
            <h3 className="text-xs font-bold text-emerald-800 mb-3 tracking-widest uppercase">Stay Updated</h3>
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
                placeholder="Your email address"
                required
                className="p-3 rounded-xl border border-emerald-100 bg-white/50 focus:bg-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-all text-sm shadow-inner"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-[0_4px_14px_0_rgb(16,185,129,0.39)] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* View Plans Button */}
          <div className="mt-6 relative">
            <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-200 to-yellow-400 text-yellow-900 text-[10px] uppercase font-extrabold px-3 py-1 rounded-full shadow-sm border border-yellow-100 z-10 tracking-wider">
              Premium
            </span>
            <button
              onClick={() => {
                navigate('/plans');
                if (!isDesktop) setIsMobileMenuOpen(false);
              }}
              className="w-full bg-slate-800 text-white font-bold py-4 px-4 rounded-2xl shadow-sm hover:shadow-lg hover:bg-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="text-xl">💎</span> View Plans
            </button>
          </div>

          {/* SOS Button */}
          <div className="mt-4">
            <button
              onClick={() => {
                navigate('/sos');
                if (!isDesktop) setIsMobileMenuOpen(false);
              }}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-xl">🚨</span> SOS Emergency
            </button>
          </div>

          {/* Rotating Daily Mantra Box */}
          <div className="mt-6 p-5 bg-emerald-50/50 border border-emerald-100 rounded-3xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-3 z-10 border border-emerald-50">
              <span className="text-2xl">🧘‍♂️</span>
            </div>
            <h4 className="text-xs font-bold text-emerald-800 mb-2 uppercase tracking-widest z-10">Daily Mantra</h4>
            <p className="text-sm italic text-emerald-700 leading-relaxed font-medium z-10">
              "{mantras[mantraIndex]}"
            </p>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
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
