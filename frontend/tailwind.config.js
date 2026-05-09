/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f5ff",
          100: "#e7ebff",
          200: "#cdd6ff",
          300: "#a7b6ff",
          400: "#7e8cff",
          500: "#5563ff",
          600: "#3b45e6",
          700: "#2e37b4",
          800: "#202778",
          900: "#141a4d"
        }
      }
    }
  },
  plugins: []
};
