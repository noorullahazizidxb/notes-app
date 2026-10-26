/** @type {import('tailwindcss').Config} */
const token = (name) => `var(--color-${name})`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: token('accent'),
          hover: token('accent-hover'),
          soft: token('accent-soft'),
          2: token('accent-2'),
        },
        'on-accent': token('on-accent'),
        muted: token('muted'),
        focus: token('focus'),
      },
      textColor: {
        text: token('text'),
      },
      backgroundColor: {
        bg: token('bg'),
        paper: token('paper'),
        'paper-elevated': token('paper-elevated'),
        'card-bg': token('card-bg'),
        'nav-bg': token('nav-bg'),
      },
      borderColor: {
        border: token('border'),
      },
      boxShadow: {
        elevated: 'var(--shadow-elevated)',
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
