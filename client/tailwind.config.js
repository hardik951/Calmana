// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // Softened glow for general components - less spread, less opacity
        'green-glow': '0 0 10px 3px rgba(52, 211, 153, 0.4), 0 0 15px 5px rgba(134, 239, 172, 0.2)',
        // Softer prominent glow for the "Welcome Back" section
        'welcome-glow': '0 0 15px 5px rgba(52, 211, 153, 0.5), 0 0 25px 8px rgba(134, 239, 172, 0.3)',
      },
      // You can also extend colors if you want specific hex values not in Tailwind's defaults
      colors: {
        // Define slightly more muted or specific greens if needed, e.g.,
        // 'calm-green-50': '#F7FAF7',
        // 'calm-green-100': '#EBF4EB',
      }
    },
  },
  plugins: [],
}