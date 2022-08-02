import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'JOSA Community',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'Join JOSA to not only develop soft and organizational skills, but become part of a dynamic and exceptional network of geeks and agents of change by giving back to the community.',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#1a1f21' },
      ],
      link: [{ hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-healthcheck', '@nuxtjs/pwa'],
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
    COMMUNITY_API_URL: process.env.COMMUNITY_API_URL
  },
  healthcheck: {
    path: '/healthcheck',
    contentType: 'application/json',
    healthy: () => {
      return JSON.stringify({ result: `All is well in Wayne's town!!!` })
    },
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
});
