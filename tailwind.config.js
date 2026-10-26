/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        bg: 'var(--color-bg)',
        paper: 'var(--color-paper)',
        'paper-elevated': 'var(--color-paper-elevated)',
        'card-bg': 'var(--color-card-bg)',
        'nav-bg': 'var(--color-nav-bg)',
        border: 'var(--color-border)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          2: 'var(--color-accent-2)',
          soft: 'var(--color-accent-soft)',
          text: 'var(--color-accent-text)',
        },
      },
      fontFamily: {
        sans: ['Work Sans', 'Inter', 'Segoe UI', 'sans-serif'],
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
