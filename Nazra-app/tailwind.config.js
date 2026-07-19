/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Soft pastel palette — greens, creams, golds
        cream: {
          50: '#fbfaf5',
          100: '#f7f4ea',
          200: '#efe9d6',
          300: '#e4dcc0',
        },
        mint: {
          50: '#f3f8f3',
          100: '#eef4ec',
          200: '#dce8d8',
          300: '#c2d6bc',
          400: '#a3bd9c',
          500: '#7fa077',
          600: '#5e8058',
          700: '#4a6645',
          800: '#3b5137',
          900: '#2f402c',
        },
        gold: {
          100: '#f7efd8',
          200: '#efe0b3',
          300: '#e3cd86',
          400: '#d4b85f',
          500: '#bfa046',
          600: '#9c8038',
        },
        ink: {
          700: '#3d4a3a',
          800: '#2c382a',
          900: '#1f2a1d',
        },
        // Dark theme — deep muted charcoal-to-dark-green (not pure black)
        charcoal: {
          700: '#2a312e',
          800: '#222825',
          900: '#1a201d',
          950: '#141a17',
        },
        // High-contrast text colors for dark mode
        parchment: {
          100: '#e8e4d6',
          200: '#dfe9d8',
          300: '#cdd9c4',
        },
      },
      backgroundColor: (theme) => ({
        'dark-surface': theme('colors.charcoal.800'),
      }),
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Amiri', 'Noto Naskh Arabic', 'serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif'],
      },
      boxShadow: {
        // Neumorphism (light) — soft extruded look on the page background
        neu: '8px 8px 20px rgba(120,140,118,0.18), -8px -8px 20px rgba(255,255,255,0.9)',
        'neu-sm': '5px 5px 12px rgba(120,140,118,0.16), -5px -5px 12px rgba(255,255,255,0.85)',
        'neu-inset': 'inset 5px 5px 12px rgba(120,140,118,0.2), inset -5px -5px 12px rgba(255,255,255,0.85)',
        'neu-inset-sm': 'inset 3px 3px 8px rgba(120,140,118,0.18), inset -3px -3px 8px rgba(255,255,255,0.8)',
        glass: '0 8px 32px rgba(95,128,88,0.12)',
        // Neumorphism (dark) — lighter warm-gray top-left, near-black bottom-right
        'neu-dark': '8px 8px 20px rgba(8,12,10,0.55), -8px -8px 20px rgba(120,128,112,0.12)',
        'neu-dark-sm': '5px 5px 12px rgba(8,12,10,0.5), -5px -5px 12px rgba(120,128,112,0.1)',
        'neu-dark-inset': 'inset 5px 5px 12px rgba(8,12,10,0.6), inset -5px -5px 12px rgba(120,128,112,0.1)',
        'neu-dark-inset-sm': 'inset 3px 3px 8px rgba(8,12,10,0.55), inset -3px -3px 8px rgba(120,128,112,0.08)',
        'glass-dark': '0 8px 32px rgba(0,0,0,0.35)',
      },
      backdropBlur: {
        xs: '4px',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
};
