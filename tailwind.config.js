/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#f9f6fa',
          100: '#f0e8f3',
          200: '#e3d2e8',
          300: '#d1b3d9',
          400: '#CBA1D4', // The provided Lavender
          500: '#a76aab',
          600: '#894f8b',
          700: '#713e71',
          800: '#5e345e',
          900: '#4e2d4e',
          950: '#301830',
        },
        butter: {
          50: '#fffdf5',
          100: '#fff9e6',
          200: '#fff1cd',
          300: '#FEEB9C', // The provided Butter Yellow
          400: '#fcd365',
          500: '#fbbf24',
          600: '#d99406',
          700: '#b46f09',
          800: '#92570e',
          900: '#78480f',
          950: '#452603',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        dark: {
          bg: '#0a0f1d',
          card: '#12192c',
          border: '#1e293b',
          text: '#f8fafc',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        amiri: ['var(--font-amiri)', 'Amiri', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
