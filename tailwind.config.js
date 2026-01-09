/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        school: {
          red: '#8B0000',
          gold: '#C5A059',
          navy: '#1B2A4A',
        }
      }
    },
  },
  plugins: [],
}