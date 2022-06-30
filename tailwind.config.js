// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/formkit.classes.ts",
  ],
  safelist: [
    {
      pattern: /bg-(red|green|blue|gray|yellow)-(100)/,
      pattern: /text-(red|green|blue|gray|yellow)-(400|500|600|800)/,
    },
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      pink: colors.pink,
      cyan: colors.cyan,
      purple: colors.purple,
      gray: colors.slate,
      red: colors.red,
      green: colors.green,
      indigo: colors.indigo,
      yellow: colors.amber,
      blue: colors.blue,
    },
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@formkit/themes/tailwindcss"),
  ],
};
