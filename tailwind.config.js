module.exports = {
  content: [ // replaced purge that is used to removed unused CSS in the project
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [],
}
