/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary:"rgb(16,24,40)",
        secondary:"#00DBF2",
       banner:  "rgb(229, 220, 211)",
       
      },
      gridTemplateColumns: {
        home: "1fr 0.4fr",
        widget: "0.5fr 1fr",
        about: "1fr 0.4fr",
        footer: "1fr 1fr 1.2fr",
        footerstyle2: "1fr 1fr",
        nav: "1fr 310px 1fr",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
