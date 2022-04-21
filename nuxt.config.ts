import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'JOSA Community',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            '',
        },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
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
  },
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL
  },
});
