/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      textColor: {
        text: 'var(--color-text)',
        navbar: 'var(--color-navbar)',
        card: 'var(--color-card)',
        'button-text': 'var(--color-button-text)',
      },
      backgroundColor: {
        bg: 'var(--color-bg)',
        'navbar-bg': 'var(--color-navbar-bg)',
        'card-bg': 'var(--color-card-bg)',
        'button-primary': 'var(--color-button-primary)',
        'button-hover': 'var(--color-button-hover)',
        'input-border': 'var(--color-input-border)',
        border: 'var(--color-border)',
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
