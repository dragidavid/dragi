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
        muted: "hsl(var(--muted) / <alpha-value>)",
        spotify: "hsl(var(--spotify) / <alpha-value>)",
      },
      screens: {
        xs: "448px",
      },
      fontSize: {
        "2xs": "0.625rem",
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
      size: {
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
        "vertical-dashed": `repeating-linear-gradient(0deg, hsl(var(--accent)), hsl(var(--accent)) 4px,transparent 4px,transparent 10px)`,
        "horizontal-dashed": `repeating-linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent)) 4px,transparent 4px,transparent 10px)`,
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
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
        "mask-slide": {
          "0%": { "-webkit-mask-position": "0 0", maskPosition: "0 0" },
          "100%": {
            "-webkit-mask-position": "1000px 1000px",
            maskPosition: "1000px 1000px",
          },
        },
      },
      animation: {
        "mask-slide": "mask-slide 120s infinite linear",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
