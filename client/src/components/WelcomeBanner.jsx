import React from "react";

// You can import your image asset as needed
import YogaImage from "../assets/calmanayogaimg.png"; // Use your actual path

export function WelcomeBanner({ onSessionStart }) {
  return (
    <section className="w-full rounded-2xl bg-white/80 shadow-lg flex flex-col md:flex-row items-center justify-between px-10 py-8 mb-8 mt-2 animate-fade-in-up">
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
          Calmana – <span className="text-green-600">Your Space for Peace</span>
        </h2>
        <p className="text-green-700 text-lg mb-6 max-w-xl">
          Calmana is here to help you relax, refocus, and renew. Start a calming session whenever you need a moment of peace.
        </p>
        <button
          onClick={onSessionStart}
          className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-green-700 transition"
        >
          Start Session
        </button>
      </div>
      <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-10 w-36 h-36 md:w-48 md:h-48 flex items-center justify-center">
        <img
          src={YogaImage}
          alt="Yoga Emote"
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
}
