/** @typedef  {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
