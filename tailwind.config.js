/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4382C',
        'primary-dark': '#B42E24',
        secondary: '#1A1A2E',
        accent: '#F5A623',
        cream: '#FFF8F0',
        dark: '#0F0F1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

