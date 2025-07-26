// src/components/Sidebar.jsx

import React from 'react';

export default function Sidebar() {
  return (
    // Changed to bg-white, softer shadow, and very subtle scale on hover
    <aside className="lg:col-span-1 bg-white shadow-lg rounded-2xl p-6 lg:p-8 h-fit sticky top-8 border border-green-50
                      hover:shadow-xl transition-all duration-300 transform hover:scale-[1.005]">
      {/* CHATROOM Section */}
      <div className="mb-7 lg:mb-10">
        <h3 className="text-lg lg:text-xl font-semibold text-green-800 mb-4 lg:mb-5 tracking-wide">CHATROOMS</h3> {/* Semibold, tracking-wide */}
        <div className="bg-green-50 rounded-lg p-3 lg:p-4 cursor-pointer hover:bg-green-100 transition-colors duration-200 flex items-center shadow-sm hover:shadow-md mb-2 border border-green-50"> {/* Added subtle border */}
          <span className="text-emerald-600 mr-3 lg:mr-4 text-xl lg:text-2xl">#</span>
          <span className="text-base lg:text-lg text-green-800 font-medium">Anxiety Support</span> {/* Medium font */}
        </div>
        <div className="bg-green-50 rounded-lg p-3 lg:p-4 cursor-pointer hover:bg-green-100 transition-colors duration-200 flex items-center shadow-sm hover:shadow-md border border-green-50">
          <span className="text-emerald-600 mr-3 lg:mr-4 text-xl lg:text-2xl">#</span>
          <span className="text-base lg:text-lg text-green-800 font-medium">Mindfulness Practice</span>
        </div>
      </div>

      {/* DIRECT MESSAGES Section */}
      <div className="mb-7 lg:mb-10">
        <h4 className="text-base lg:text-lg font-semibold text-green-700 mb-3 lg:mb-4 tracking-wide">DIRECT MESSAGES</h4> {/* Semibold, tracking-wide */}
        <div className="flex items-center space-x-3 mb-2 cursor-pointer hover:bg-green-50 p-2 lg:p-3 rounded-lg transition-colors duration-200">
          <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-green-300 flex items-center justify-center text-green-800 font-medium text-sm lg:text-base">K</div>
          <span className="text-base lg:text-lg text-green-800 font-medium">Karen</span> {/* Medium font */}
        </div>
        <div className="flex items-center space-x-3 mb-2 cursor-pointer hover:bg-green-50 p-2 lg:p-3 rounded-lg transition-colors duration-200">
          <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-lime-300 flex items-center justify-center text-lime-800 font-medium text-sm lg:text-base">A</div>
          <span className="text-base lg:text-lg text-green-800 font-medium">Alex</span>
        </div>
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-green-50 p-2 lg:p-3 rounded-lg transition-colors duration-200">
          <div className="rounded-full h-8 w-8 lg:h-9 lg:w-9 bg-emerald-300 flex items-center justify-center text-emerald-800 font-medium text-sm lg:text-base">J</div>
          <span className="text-base lg:text-lg text-green-800 font-medium">Jordan</span>
        </div>
      </div>

      {/* SIDEBAR Community Feed (mini version from image) */}
      <div>
        <h3 className="text-lg lg:text-xl font-semibold text-green-800 mb-4 lg:mb-5 tracking-wide">COMMUNITY SNAPSHOT</h3> {/* Semibold, tracking-wide */}
        <div className="flex items-start space-x-3 mb-4 bg-green-50 p-3 lg:p-4 rounded-lg shadow-sm border border-green-100">
          <div className="rounded-full h-10 w-10 lg:h-12 lg:w-12 bg-green-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-md lg:text-lg">F</div>
          <div>
            <p className="text-sm lg:text-base font-semibold text-green-800">Fiona <span className="text-xs lg:text-sm text-green-600 font-normal ml-1">2 hours ago</span></p>
            <p className="text-md lg:text-lg text-green-700 leading-snug mt-1 lg:mt-2">"Feeling so much lighter after today's meditation session! ✨"</p>
            <div className="flex items-center space-x-4 mt-2 lg:mt-3 text-green-600 text-sm lg:text-base">
              <button className="flex items-center hover:text-emerald-700 transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                12
              </button>
              <button className="flex items-center hover:text-emerald-700 transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                4
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-3 bg-green-50 p-3 lg:p-4 rounded-lg shadow-sm border border-green-100">
          <div className="rounded-full h-10 w-10 lg:h-12 lg:w-12 bg-emerald-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-md lg:text-lg">M</div>
          <div>
            <p className="text-sm lg:text-base font-semibold text-green-800">Maya <span className="text-xs lg:text-sm text-green-600 font-normal ml-1">5 hours ago</span></p>
            <p className="text-md lg:text-lg text-green-700 leading-snug mt-1 lg:mt-2">"Found a great resource for managing stress today!"</p>
            <div className="flex items-center space-x-4 mt-2 lg:mt-3 text-green-600 text-sm lg:text-base">
              <button className="flex items-center hover:text-emerald-700 transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                7
              </button>
              <button className="flex items-center hover:text-emerald-700 transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                1
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}