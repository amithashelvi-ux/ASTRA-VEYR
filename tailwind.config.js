/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 25px rgba(34, 211, 238, 0.35)',
      },
    },
  },
  plugins: [],
}

