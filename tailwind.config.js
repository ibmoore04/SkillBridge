/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#ff9500',
      },
      fontFamily: {
        'be-vietnam': ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'sans': ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};