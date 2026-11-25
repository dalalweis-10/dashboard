/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        teal: {
          DEFAULT: '#0AA99B',
          50: '#E6F7F5',
          100: '#C2EEEA',
          200: '#8EE0D9',
          300: '#54CFC4',
          400: '#0AA99B',
          500: '#089B8E',
          600: '#068075',
          700: '#056661',
          800: '#044D49',
          900: '#033B38',
        },
        navy: {
          DEFAULT: '#103A4E',
          50: '#E8EEF1',
          100: '#C5D3DB',
          200: '#8FA9B8',
          300: '#5A7E92',
          400: '#2E586D',
          500: '#103A4E',
          600: '#0D3243',
          700: '#0A2A38',
          800: '#08222D',
          900: '#061B24',
        },
        surface: {
          light: '#F8FAFB',
          dark: '#0E1E28',
        },
      },
    },
  },
  plugins: [],
};
