/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ramen: {
          red: '#C0392B',
          orange: '#E67E22',
          gold: '#F39C12',
          cream: '#FDF6EC',
          brown: '#7D4E2A',
          dark: '#2C1A0E',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
