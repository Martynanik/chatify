/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula"],
  },
};

