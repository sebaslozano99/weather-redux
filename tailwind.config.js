/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      backgroundImage: {
        "home-page-01": "url('../../public/cloudy-01')",
      }
    },
    fontFamily: {
      sans: "Oswald",
    }
  },
  plugins: [],
}

