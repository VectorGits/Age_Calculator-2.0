/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: 'hsl(259, 100%, 65%)',
      },
    },
  },
  plugins: [],
}
