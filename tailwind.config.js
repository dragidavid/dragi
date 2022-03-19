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
          "text-light": "#F7F8F8",
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
