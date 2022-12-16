/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            theme: '#4285f4'
        },
        boxShadow: {
            mainShadow: 'rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px',
        },
        screens: {
            xs: '480px'
        }
    },
  },
  plugins: [],
}
