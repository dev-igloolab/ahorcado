/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', 'index.html'],
  theme: {
    extend: {
      backgroundImage: {
        'main': "url('/fondo.webp')",
        'codigo-oculto': "url('/fondo-codigo-oculto.webp')",
        'linterna': "url('/fondo-linterna.webp')",
        'puzzle': "url('/fondo-puzzle.webp')",
        'palabrasorden': "url('/fondo-palabrasorden.webp')",
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
    }
  },
  plugins: []
};