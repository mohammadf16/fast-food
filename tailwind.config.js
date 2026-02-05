/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #D4AF37)',
        'primary-dark': 'var(--color-primary-dark, #B88A1E)',
        secondary: 'var(--color-secondary, #0B0B0F)',
        accent: 'var(--color-accent, #F5D06F)',
        cream: 'var(--color-cream, #111118)',
        dark: 'var(--color-dark, #050508)',
        surface: 'var(--color-surface, #111118)',
        'surface-2': 'var(--color-surface-2, #161622)',
        muted: 'var(--color-muted, #A9ABB6)',
        danger: 'var(--color-danger, #D4382C)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

