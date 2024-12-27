/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Adds Poppins as a font-family
      },
      boxShadow: {
        'inner-custom': 'inset 5px 5px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}