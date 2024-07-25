// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
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
      link: [
        {
          hid: 'icon',
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@kevinmarrec/nuxt-pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@sidebase/nuxt-auth',
  ],
  css: [
    '@/assets/css/typography.css',
    '@/assets/css/form.css',
    '@/assets/css/global.css',
  ],
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  plugins: [
    {
      src: '~/plugins/matomo-plugin.client.js',
      ssr: false,
    },
  ],
  // REF: https://v3.nuxtjs.org/guide/going-further/runtime-config/
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      communityApiUrl: 'https://community.api.josa.dev/v2',
      targetEnv: '',
      buildCommitSha: '',
      buildCommitLink: '',
      buildNumber: '',
      buildLink: '',
      buildRepoLink: '',
      buildTimestamp: '',
      debug: '',
      sessionCookieName: 'access_token',
      matomoSiteId: 13,
      matomoHost: 'https://analytics.josa.ngo',
    },
  },
  pwa: {
    meta: {
      name: 'JOSA Community',
    },
    manifest: {
      lang: 'en',
    },
  },
  auth: {
    baseURL: 'https://community.api.josa.dev/v2/auth',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'get' },
        getSession: { path: '/', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/access_token',
        cookieName: 'access_token',
        type: 'Bearer',
        maxAgeInSeconds: 60 * 60 * 24,
      },
      sessionDataType: {
        id: 'string',
        username: 'string',
        iat: 'number',
        exp: 'number',
      },
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
})
