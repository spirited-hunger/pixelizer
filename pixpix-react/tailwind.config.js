module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {      
      colors: {
        'dark-grey': '#CACBCC',
        'light-grey': '#C7C9CA',
        'blue-grey': '#E3E3E3',
        'smooth-grey': '#C9CCD0',
        'dark-line': '#3F3F3F',

        'active-line': '#3F3F3F',
        'inactive-line': '#C7C9CA',
        'active-font': '#3F3F3F',
        'inactive-font': '#A0A0A0',
      },
      borderWidth: {
        'pix': '3px',
        'active-line': '2px',
        'inactive-line': '1px',
      },
      flex: {
        '400': '0 0 400px',
      },
      gridRow: {
        'span-13': 'span 13 / span 13',
      }
    },
  },
  plugins: [],
}
