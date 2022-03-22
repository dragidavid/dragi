const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        palette: {
          "body-light": "#FAFAFA",
          "body-dark": "#060606",
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
