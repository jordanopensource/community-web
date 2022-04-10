// Visit https://tailwindcss.com/docs/configuration#configuration-options for more info
module.exports = {
  content: [ 
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    maxWidth: {
      240: '240px',
    },
    container: {
      center: true,
      padding: '15px',
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
        'josa-black':{
          DEFAULT:'#2e3436',
          darker: '#282e30'
        },
        grey90: '#e5e5e5',
      },
      fontFamily: {
        IBMPlexSansArabic: 'IBM Plex Sans Arabic',
        IBMPlexMono: 'IBM Plex Mono',
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
