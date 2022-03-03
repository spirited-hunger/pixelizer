module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    borderWidth: {
      'lineWidth': '4px',
    },
    extend: {      
      colors: {
        'dark-grey': '#CACBCC',
        'blue-grey': '#E3E3E3',
        'smooth-grey': '#C9CCD0',
        'dark-line': '#3F3F3F',
      },
      flex: {
        '400': '0 0 400px',
      }
    },
  },
  plugins: [],
}
