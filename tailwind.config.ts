/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f3f8",
          100: "#d9e0ed",
          200: "#b3c1db",
          300: "#8da2c9",
          400: "#6683b7",
          500: "#4064a5",
          600: "#2a4a8a",
          700: "#1a3366",
          800: "#0e1f42",
          900: "#0a1628",
        },
        gold: {
          50: "#fbf6e8",
          100: "#f5e8c4",
          200: "#edd89a",
          300: "#e4c870",
          400: "#dbb84a",
          500: "#c9a84c",
          600: "#a8883a",
          700: "#876928",
          800: "#664b18",
          900: "#452e0a",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
