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
        'light-text': 'var(--color-text-light)',
        'dark-text': 'var(--color-text-dark)',
        'light-navbar': 'var(--color-navbar-light)',
        'dark-navbar': 'var(--color-navbar-dark)',
        'light-card': 'var(--color-card-light)',
        'dark-card': 'var(--color-card-dark)',
        'light-button-text': 'var(--color-button-text-light)',
        'dark-button-text': 'var(--color-button-text-dark)',
      },
      backgroundColor: {
        'light-bg': 'var(--color-bg-light)',
        'dark-bg': 'var(--color-bg-dark)',
        'light-navbar-bg': 'var(--color-navbar-bg-light)',
        'dark-navbar-bg': 'var(--color-navbar-bg-dark)',
        'light-card-bg': 'var(--color-card-bg-light)',
        'dark-card-bg': 'var(--color-card-bg-dark)',
        'light-button-primary': 'var(--color-button-primary-light)',
        'dark-button-primary': 'var(--color-button-primary-dark)',
        'light-button-hover': 'var(--color-button-hover-light)',
        'dark-button-hover': 'var(--color-button-hover-dark)',
        'light-input-border': 'var(--color-input-border-light)',
        'dark-input-border': 'var(--color-input-border-dark)',
        'light-border': 'var(--color-border-light)',
        'dark-border': 'var(--color-border-dark)',
        'light-textfield-bg': 'var(--color-textfield-bg-light)',
        'dark-textfield-bg': 'var(--color-textfield-bg-dark)',
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
