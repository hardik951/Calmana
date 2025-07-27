// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'gradient-green-pink-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'typing-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'gradient-green-pink-shift': 'gradient-green-pink-shift 15s ease infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-in-slow': 'fade-in 1.2s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-slide-left': 'fade-slide-left 0.7s ease-out forwards',
        'typing-blink': 'typing-blink 1s step-end infinite',
      },
      boxShadow: {
        'green-glow': '0 0 8px 2px rgba(52, 211, 153, 0.3), 0 0 12px 4px rgba(134, 239, 172, 0.15)',
        'welcome-glow': '0 0 12px 4px rgba(52, 211, 153, 0.4), 0 0 20px 6px rgba(134, 239, 172, 0.25)',
        'chat-bubble': '0 2px 6px rgba(0, 0, 0, 0.08)',
      },
      colors: {
        // Primary brand colors
        calmGreen: '#A7F3D0',
        calmPink: '#FCE7F3',
        calmText: '#374151',

        // UI Neutrals
        softGray: '#F9FAFB',
        grayOneHundred: '#F3F4F6',
        grayTwoHundred: '#E5E7EB',
        grayThreeHundred: '#D1D5DB',
        grayEightHundred: '#1F2937',

        // Accent Greens
        softEmerald: '#6EE7B7',
        emeraldOneHundred: '#D1FAE5',
        emeraldSixHundred: '#059669',
        emeraldSevenHundred: '#047857',
        greenFiveHundred: '#22C55E',
        greenSixHundred: '#16A34A',

        // Accent Lime
        limeFiveHundred: '#84CC16',
        limeSixHundred: '#65A30D',

        // Chat bubble colors
        userBubble: '#bbf7d0',  // lighter green for user
        botBubble: '#dcfce7',   // soft green for bot
      },
    },
  },
  plugins: [],
};
