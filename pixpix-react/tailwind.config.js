module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      'lineWidth': '3px',
    },
    extend: {      
      colors: {
        'dark-grey': '#CACBCC',
        'light-grey': '#C7C9CA',
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
