/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', 'index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/fondo.webp')",
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
    }
  },
  plugins: []
};