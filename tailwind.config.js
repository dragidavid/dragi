/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{tsx,ts}",
    "./pages/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    "./contexts/**/*.{tsx,ts}",
    "./lib/**/*.{tsx,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "almost-black": "#0d0d0d",
        primary: "#e1e1e1",
        secondary: "#9d9d9d",
        "subtle-border": "#232323",
      },
      backgroundImage: {
        noise: "url('/static/images/noise.png')",
      },
      inset: {
        0.75: "3px",
      },
      fontFamily: {
        sans: ["var(--font-mona)"],
      },
      keyframes: {
        flash: {
          "0%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.2" },
        },
      },
      animation: {
        flash: "flash 1.4s infinite linear",
      },
    },
    fontFamily: {
      hubot: ["var(--font-hubot)"],
    },
  },
  plugins: [],
};
