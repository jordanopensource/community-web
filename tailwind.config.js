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
        'community-blue': {
          DEFAULT: '#0B96AB',
        },
        'community-turquoise': {
          DEFAULT: '#00B199',
        },
        'community-magenta': {
          DEFAULT: '#EE4D7A',
        },
        'community-fuchsia': {
          DEFAULT: '#A066A9',
        },
        'community-orange': {
          DEFAULT: '#F59232',
        },
        'community-purple': {
          DEFAULT: '#4F72B7',
        },
        'community-white': {
          DEFAULT: '#F9F9F9',
        },
        'community-grey': {
          light: '#f7f6f5',
          DEFAULT: '#efedec',
          dark: '#aea79f',
          text: '#808080',
        },
        'josa-grey': {
          light: "#f5f5f5", // bg
          DEFAULT: '#e3e7e9' // bg boxes
        },
        'community-red': {
          DEFAULT: '#F26F54',
        },
        'community-green': {
          DEFAULT: '#6DB981',
        },
        'community-black': {
          DEFAULT: '#22292c', // mainly used for banners
          darker: '#1a1f21', // mainly used for Navigation and footer background
          text: "#333333"
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
      backgroundImage: {
        'homeHero': "url('/images/background.svg')",
        'divider-slashes': "url('/images/divider-slash.svg')",
        'slashes': "url('/images/slashes.svg')",
        'editIcon': "url('/icons/edit.svg')",
        'editIconWhite': "url('/icons/edit-white.svg')",
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
