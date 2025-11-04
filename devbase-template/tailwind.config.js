/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B111c',
        secondary: '#1e2939',
        accent: '#00c951',
        card: '#1e2939',
        'card-hover': '#2a3544',
      },
    },
  },
  plugins: [],
}