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

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fundoClaro: "#f9fafb",
        fundoEscuro: "#111827",
        textoClaro: "#111827",
        textoEscuro: "#f9fafb",
      },
    },
  },
  plugins: [],
};
