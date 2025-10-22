const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        playfair: ['"Playfair Display"', 'serif'],
        dancing: ['"Dancing Script"', 'cursive'],
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
            opacity: '0.85',
            transform: 'scale(0.98)',
          },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 8px rgba(139,92,246,0.6), 0 0 15px rgba(99,102,241,0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(139,92,246,0.9), 0 0 35px rgba(99,102,241,0.6)' },
        },
        float: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
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
        shimmer: 'shimmer 3s linear infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
