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
      },
      animation: {
        'gradient-green-pink-shift': 'gradient-green-pink-shift 15s ease infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-slide-left': 'fade-slide-left 0.7s ease-out forwards',
        'typing-blink': 'typing-blink 1s step-end infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      backgroundSize: {
        '300': '300% 300%',
      },
      boxShadow: {
        'green-glow': '0 0 8px 2px rgba(52, 211, 153, 0.3), 0 0 12px 4px rgba(134, 239, 172, 0.15)',
        'welcome-glow': '0 0 12px 4px rgba(52, 211, 153, 0.4), 0 0 20px 6px rgba(134, 239, 172, 0.25)',
        'chat-bubble': '0 2px 6px rgba(0, 0, 0, 0.08)',
      },
      colors: {
        calmGreen: '#A7F3D0',
        calmPink: '#FCE7F3',
        calmText: '#374151',
        softGray: '#F9FAFB',
        grayOneHundred: '#F3F4F6',
        grayTwoHundred: '#E5E7EB',
        grayThreeHundred: '#D1D5DB',
        grayEightHundred: '#1F2937',
        softEmerald: '#6EE7B7',
        emeraldOneHundred: '#D1FAE5',
        emeraldSixHundred: '#059669',
        emeraldSevenHundred: '#047857',
        greenFiveHundred: '#22C55E',
        greenSixHundred: '#16A64A',
        limeFiveHundred: '#84CC16',
        limeSixHundred: '#65A30D',
        userBubble: '#bbf7d0',
        botBubble: '#dcfce7',
      },
      typography: (theme) => ({
        green: {
          css: {
            color: theme('colors.calmText'),
            a: { color: theme('colors.emeraldSixHundred') },
            h1: { color: theme('colors.greenSixHundred') },
            h2: { color: theme('colors.greenSixHundred') },
            h3: { color: theme('colors.greenSixHundred') },
            code: { color: theme('colors.emeraldSevenHundred') },
            strong: { color: theme('colors.greenSixHundred') },
            blockquote: {
              color: theme('colors.greenFiveHundred'),
              borderLeftColor: theme('colors.limeFiveHundred'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
