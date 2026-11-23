/**
 * Theme colors are CSS variables (hex per theme), so Tailwind cannot apply `/<opacity>`
 * modifiers to them natively. Resolve the modifier with color-mix instead.
 */
const themeColor = (name) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `var(${name})`
    : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`;

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
        text: themeColor('--color-text'),
        'text-muted': themeColor('--color-text-muted'),
        bg: themeColor('--color-bg'),
        paper: themeColor('--color-paper'),
        'paper-elevated': themeColor('--color-paper-elevated'),
        'card-bg': themeColor('--color-card-bg'),
        'nav-bg': themeColor('--color-nav-bg'),
        'bg-glass': themeColor('--color-bg-glass'),
        border: themeColor('--color-border'),
        accent: {
          DEFAULT: themeColor('--color-accent'),
          hover: themeColor('--color-accent-hover'),
          2: themeColor('--color-accent-2'),
          soft: themeColor('--color-accent-soft'),
          text: themeColor('--color-accent-text'),
          subtle: themeColor('--color-accent-subtle'),
          line: themeColor('--color-accent-line'),
          ring: themeColor('--color-accent-ring'),
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
