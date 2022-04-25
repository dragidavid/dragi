const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    "./contexts/**/*.{tsx,ts}",
    "./lib/**/*.{tsx,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
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
  plugins: [],
};
