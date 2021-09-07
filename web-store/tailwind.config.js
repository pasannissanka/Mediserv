const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.yellow,
      warn: colors.red,
      blue: colors.blue,
      gray: colors.gray,
      green: colors.green,
      white: colors.white,
      black: colors.black,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
