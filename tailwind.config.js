/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{tsx,ts}",
    "./pages/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    "./contexts/**/*.{tsx,ts}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        extreme: "hsl(var(--extreme) / <alpha-value>)",
        inverse: "hsl(var(--inverse) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        spotify: "hsl(var(--spotify) / <alpha-value>)",
      },
      screens: {
        xs: "448px",
      },
      height: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
        double: "200vh",
      },
      width: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
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
        screen: "100vw",
        "x-screen": ["100vw", "100vw"],
      },
      blur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
