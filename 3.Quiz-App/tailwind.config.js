/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Monoton', 'Gloria Hallelujah', 'cursive'],
        mono: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
