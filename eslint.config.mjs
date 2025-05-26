import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt([eslintPluginPrettierRecommended]).override(
  'nuxt/vue/rules',
  {
    rules: {
      'vue/no-v-html': 'off',
    },
  },
)
