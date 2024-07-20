/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-left': 'spinLeft 800ms linear infinite',
        'spin-right': 'spinRight 800ms linear infinite',
      },
      keyframes: {
        spinLeft: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(720deg)' },
        },
        spinRight: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      colors: {
        "TVBlue": '#113E5F', 
        "TVsecondaryColor": '#cccccc',
        'TVred': '#B6122A',
        'TVgray': '#fafafa'
      }
    },
  },
  plugins: [],
});

