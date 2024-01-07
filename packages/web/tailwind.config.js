/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      alt: ["Sentient", "sans-serif"],
      main: ["Satoshi", "sans-serif"],
      number: ["Figtree", "monospace"],
    },
    extend: {
      gridTemplateColumns: {
        envelopes:
          "1fr calc(34px + 1rem) calc(48px + 2rem) 4fr minmax(11rem, 1fr) 1fr 1fr",
      },
      backgroundImage: {
        "main-panel": "linear-gradient(113deg, #F3E9EA 0%, #F2F4F8 100%)",
      },
    },
  },
  plugins: [],
};
