import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  css: [
    // '@/assets/css/typography.css',
    '@/assets/css/layout.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/fonts/ibm-plex.css',
    '@/assets/css/global.css'
  ]
});
