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
      },
      borderWidth: {
        'pix': '2px'
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
