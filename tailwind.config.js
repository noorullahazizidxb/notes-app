/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textColor: {
        text: 'var(--color-text)',
      },
      backgroundColor: {
        bg: 'var(--color-bg)',
        paper: 'var(--color-paper)',
        'card-bg': 'var(--color-card-bg)',
        'nav-bg': 'var(--color-nav-bg)',
      },
      borderColor: {
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Work Sans', 'Segoe UI', 'sans-serif'],
        display: ['Newsreader', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
