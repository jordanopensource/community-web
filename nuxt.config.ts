
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
  modules: ['@nuxtjs/tailwindcss', 'nuxt-healthcheck', '@kevinmarrec/nuxt-pwa',
  /**
   * this package is not the official nuxtjs device but a fork
   * this package was used due to it supported Nuxt3
   * More details about this project here:
   * https://github.com/nuxt-community/device-module/tree/4a57c2df5f9716998f35f7621fdaffa69cdd8287
   */
  '@nuxtjs/device'
],
  device: {
    refreshOnResize: true
  },
  css: [
    '@/assets/css/typography.css',
    '@/assets/css/form.css',
    '@/assets/css/global.css'
  ],
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  // REF: https://v3.nuxtjs.org/guide/going-further/runtime-config/
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      COMMUNITY_API_URL: process.env.COMMUNITY_API_URL,
      TARGET_ENV: process.env.TARGET_ENV,
      DRONE_COMMIT_SHA: process.env.DRONE_COMMIT_SHA,
      DRONE_COMMIT_LINK: process.env.DRONE_COMMIT_LINK,
      DRONE_BUILD_NUMBER: process.env.DRONE_BUILD_NUMBER,
      DRONE_BUILD_LINK: process.env.DRONE_BUILD_LINK,
      DRONE_REPO_LINK: process.env.DRONE_REPO_LINK,
      DRONE_BUILD_FINISHED: process.env.DRONE_BUILD_FINISHED,
      DEBUG: process.env.DEBUG,
      SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME
    }
  },
  healthcheck: {
    path: '/healthcheck',
    contentType: 'application/json',
    healthy: () => {
      return JSON.stringify({ result: `All is well in Wayne's town!!!` })
    },
  },
  pwa: {
    meta:{
      name: 'JOSA Community',
    },
    manifest: {
      lang: 'en',
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
});
