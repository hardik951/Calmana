// src/components/AnnouncementBar.jsx

import React from 'react';

export default function AnnouncementBar({ message, bgColor, textColor, borderColor }) {
  // Default styling for the bar
  const defaultBgColor = bgColor || 'bg-lime-100'; // Default background color
  const defaultTextColor = textColor || 'text-green-800'; // Default text color
  const defaultBorderColor = borderColor ? `border-b ${borderColor}` : ''; // Optional bottom border

  return (
    <div className={`${defaultBgColor} ${defaultTextColor} ${defaultBorderColor}
                   py-2 text-center font-semibold text-base md:text-lg lg:text-xl
                   shadow-sm`}> {/* Added shadow for a subtle lift */}
      {message}
    </div>
  );
}