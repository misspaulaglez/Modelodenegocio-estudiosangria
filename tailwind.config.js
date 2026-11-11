/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rosa: '#D8B5B5',   // Rosa empolvado
        vino: '#762F43',   // Vino Ribeiro (identidad y jerarquía)
        verde: '#78816A',  // Verde Galicia
        agua: '#B9D7E8',   // Azul agua
        marfil: '#E9DFD4', // Marfil
        papel: '#F6F1EB',  // Marfil aclarado: solo para el fondo de página
        carbon: '#49433F', // Carbón
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"DM Sans Variable"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
