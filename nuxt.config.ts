import { NuxtConfig } from '@nuxt/types'
import * as FontAwesome from './libs/fontawesome'

const nuxtConfig: NuxtConfig = {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: false,
  target: 'static',

  publicRuntimeConfig: {
    env: process.env.ENV || '',
    email: process.env.TEST_EMAIL,
    pass: process.env.TEST_PASSWORD,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Aozora - bluesky web client (unofficial)',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      // OGP
      { property: 'og:title', content: 'Aozora' },
      {
        property: 'og:image',
        content: 'https://aozora.shino3.net/image/og-image.png',
      },
      {
        property: 'og:description',
        content: 'Aozora - bluesky web client (unofficial)',
      },
      { property: 'og:url', content: 'https://aozora.shino3.net/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Aozora' },
      // OGP: Twitter
      { name: 'twitter:site', content: 'https://aozora.shino3.net/' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Aozora' },
      {
        name: 'twitter:image',
        content: 'https://aozora.shino3.net/image/og-image.png',
      },
      {
        name: 'twitter:description',
        content: 'Aozora - bluesky web client (unofficial)',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/js/bootstrap.bundle.min.js' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/bootstrap.min.css',
    '~/assets/scss/style.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/atp'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
      },
    ],
    [
      '@nuxtjs/moment',
      {
        defaultLocale: 'ja',
        locales: ['ja'],
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  buildDir: 'public',
  build: {
    transpile: [/@atproto\/api/, /typed-vuex/],
  },
  generate: {
    dir: 'public',
  },
}

export default nuxtConfig
