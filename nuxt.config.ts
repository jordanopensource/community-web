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
  modules: ['@nuxtjs/tailwindcss', 'nuxt-healthcheck'],
  css: [
    '@/assets/css/typography.css',
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
    BASE_API_URL: process.env.BASE_API_URL,
    BETA_RELEASE: process.env.BETA_RELEASE
  },
  healthcheck: {
    path: '/healthcheck',
    contentType: 'application/json',
    healthy: () => {
      return JSON.stringify({ result: `All is well in Wayne's town!!!` })
    },
  },
});
