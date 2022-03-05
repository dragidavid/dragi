const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        palette: {
          "body-light": "#F9FAFB",
          "body-dark": "#16181D",
          "border-light": "#F0F3FC",
          "border-dark": "#2B303B",
        },
        steel: "#15181c",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
