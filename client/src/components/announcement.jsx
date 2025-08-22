import React from 'react';

const messages = [
  "💚 'Mental health is not a destination, but a process.'",
  "🌿 'You don’t have to control your thoughts. You just have to stop letting them control you.'",
  "✨ 'Healing takes time, and asking for help is a courageous step.'",
  "🌸 'Self-care is how you take your power back.'",
];

const scrollingText = messages.join('  —  ');

const AnnouncementBar = () => {
  return (
    <div className="bg-emerald-50 text-gray-800 p-2 overflow-hidden whitespace-nowrap hover-pause">
      <div className="flex animate-marquee">
        <span className="mr-10">{scrollingText}</span>
        <span>{scrollingText}</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
