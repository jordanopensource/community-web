// Visit https://tailwindcss.com/docs/configuration#configuration-options for more info
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.{vue,js}',
  ],
  theme: {
    maxWidth: {
      240: '240px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        lg: '2.5rem'
      },
    },
    extend: {
      colors: {
        'josa-blue': {
          light: '#c5e1ee',
          DEFAULT: '#3897c0',
          dark: '#1a485b',
          veryDark: '#163e4e',
        },
        'josa-warm-grey': {
          light: '#f7f6f5',
          DEFAULT: '#efedec',
          dark: '#aea79f',
        },
        'josa-grey':{
          light: "#f5f5f5", // bg
          DEFAULT: '#e3e7e9' // bg boxes
        },
        'josa-red': {
          veryLight: '#fee9e2',
          light: '#f8c0ac',
          DEFAULT: '#dd4814',
          dark: '#b83b10',
        },
        'josa-green': {
          veryLight: '#e9f3de',
          light: '#cde2bb',
          DEFAULT: '#8dbd63',
          dark: '#5c813d',
        },
        'josa-black': {
          DEFAULT: '#22292c', // mainly used for banners
          darker: '#1a1f21', // mainly used for Navigation and footer background
          text: "#333"
        },
        grey90: '#e5e5e5',
      },
      padding: {
        '15px': '15px',
      },
      opacity: {
        90: '0.9',
        80: '0.8',
        70: '0.7',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
      },
      lineHeight: {
        golden: '1.1618',
        18: '1.8',
      },
      width: {
        175: '175px',
        240: '240px',
      },
      height: {
        'half-screen': '50vh',
      },
      inset: {
        12: '3rem',
      },
      backgroundImage:{
        'homeHero':"url('/images/background.svg')",
        'slashes':"url('/images/slashes.svg')"
      }
    },
  },
  variants: {
    margin: ['responsive', 'direction', 'last'],
    padding: ['responsive', 'direction'],
    textAlign: ['responsive', 'direction'],
    fontSize: ['responsive', 'direction'],
    lineHeight: ['responsive', 'direction'],
    borderRadius: ['responsive', 'direction'],
    inset: ['responsive', 'hover', 'focus', 'direction'],
  },
  plugins: [],
}
