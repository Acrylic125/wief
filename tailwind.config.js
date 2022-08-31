/* eslint-disable import/no-extraneous-dependencies */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderWidth: {
        1: "1px",
      },
      colors: {
        inherit: "inherit",
        transparent: "transparent",
        base: {
          dark: "#171A21",
          default: "#1B2838",
          light: "#2A475E",
          alt: "#C7D5E0",
        },
        accent: {
          default: "#66C0F4",
        },
        dark: {
          base: {
            dark: "#171A21",
            default: "#1B2838",
            light: "#2A475E",
            alt: "#C7D5E0",
          },
          accent: {
            default: "#66C0F4",
          },
        },
      },
    },
  },
  plugins: [],
};
