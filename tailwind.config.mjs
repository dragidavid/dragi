import { createPreset } from "fumadocs-ui/tailwind-plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  presets: [createPreset()],
  content: [
    "./app/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    "./content/**/*.{md,mdx}",
    "./contexts/**/*.{tsx,ts}",
    "./lib/**/*.{tsx,ts}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
    "./mdx-components.tsx",
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
        3.75: "0.9375rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
        double: "200vh",
      },
      width: {
        3.75: "0.9375rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
        double: "200vw",
      },
      size: {
        3.75: "0.9375rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
        double: "200vw",
      },
      backgroundImage: {
        "vertical-dashed": `repeating-linear-gradient(0deg, hsl(var(--accent)), hsl(var(--accent)) 5px,transparent 5px,transparent 10px)`,
        "horizontal-dashed": `repeating-linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent)) 5px,transparent 5px,transparent 10px)`,
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
      transitionTimingFunction: {
        "out-quad": "cubic-bezier(0.25,0.46,0.45,0.94)",
        "in-out-quad": "cubic-bezier(0.455,0.03,0.515,0.955)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
