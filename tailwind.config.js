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
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "almost-black": "rgb(var(--almost-black) / <alpha-value>)",
        "subtle-grey": "rgb(var(--subtle-grey) / <alpha-value>)",
      },
      screens: {
        xs: "448px",
      },
      height: {
        double: "200vh",
      },
      width: {
        double: "200vw",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        noise: "url('/static/images/noise.png')",
      },
      inset: {
        0.75: "3px",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
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
  },
  plugins: [require("tailwindcss-animate")],
};
