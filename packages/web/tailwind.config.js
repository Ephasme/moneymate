/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      alt: ["Sentient", "sans-serif"],
      main: ["Satoshi", "sans-serif"],
      number: ["Figtree", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
