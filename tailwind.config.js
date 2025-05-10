/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        yellow: {
          50: '#FFFBEA',
          100: '#FFF8D6',
          200: '#FFF0AA',
          300: '#FFE47F',
          400: '#FFD53D',
          500: '#FFC107', 
          600: '#E0A800',
          700: '#C49000',
          800: '#A37800',
          900: '#7A5900',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};