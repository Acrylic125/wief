/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      "night",
      {
        night: {
          ...require("daisyui/src/colors/themes")["[data-theme=night]"],
          neutral: "#3C5277",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
