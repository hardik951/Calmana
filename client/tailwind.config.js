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
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'typing-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '20%, 22%, 24%, 55%': {
            opacity: '0.8',
            transform: 'scale(0.98)',
          },
        },
        // marquee keyframes updated for seamless scroll
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'gradient-green-pink-shift': 'gradient-green-pink-shift 15s ease infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-slide-left': 'fade-slide-left 0.7s ease-out forwards',
        'typing-blink': 'typing-blink 1s step-end infinite',
        'flicker': 'flicker 3s linear infinite',
        marquee: 'marquee 35s linear infinite',
      },
      // ... existing colors, shadows, typography, etc.
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
