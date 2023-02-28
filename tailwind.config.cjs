/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(12 100% 4%)',
        text: 'hsl(12 100% 95%)',
        text2: 'hsl(12 100% 97%)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    backgroundOpacity: false,
    textOpacity: false,
  },
};
