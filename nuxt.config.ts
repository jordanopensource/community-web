import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    // '@/assets/css/typography.css',
    // '@/assets/css/fonts/ibm-plex.css',
    '@/assets/css/layout.css',
    '@/assets/css/form.css',
    '@/assets/css/global.css'
  ],
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  }
});
