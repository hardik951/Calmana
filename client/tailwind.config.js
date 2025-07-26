/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust if your project structure differs
  ],
  theme: {
    extend: {
      colors: {
        userBubble: "#d1fae5", // soft green
        botBubble: "#fce7f3",  // soft pink
      },
      boxShadow: {
        'chat-bubble': '0 2px 6px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        'typing-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient-green-pink-shift': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      animation: {
        'typing-blink': 'typing-blink 1s step-end infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'gradient-green-pink-shift': 'gradient-green-pink-shift 8s ease infinite',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
}
