/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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

