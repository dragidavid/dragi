/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{tsx,ts}",
    "./pages/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    "./contexts/**/*.{tsx,ts}",
    "./lib/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
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
    fontFamily: {
      satoshi: ["var(--font-satoshi)"],
      spaceGrotesk: ["var(--font-space-grotesk)"],
      switzer: ["var(--font-switzer)"],
      outfit: ["var(--font-outfit)"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
