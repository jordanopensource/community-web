module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: [],
  rules: {},
}
