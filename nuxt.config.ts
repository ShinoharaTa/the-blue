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
    title: 'The Blue - 君とみた青空の先は',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'ATPプロトコル対応 Bluesky WEBクライアント',
      },
      { name: 'format-detection', content: 'telephone=no' },
      // OGP
      { property: 'og:title', content: 'The Blue - 君とみた青空の先は' },
      {
        property: 'og:image',
        content: 'https://the-blue.shino3.net/image/og-image.png',
      },
      {
        property: 'og:description',
        content: 'ATPプロトコル対応 Bluesky WEBクライアント',
      },
      { property: 'og:url', content: 'https://the-blue.shino3.net/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'The Blue - 君とみた青空の先は' },
      // OGP: Twitter
      { name: 'twitter:site', content: 'https://the-blue.shino3.net/' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'The Blue - 君とみた青空の先は' },
      {
        name: 'twitter:image',
        content: 'https://the-blue.shino3.net/image/og-image.png',
      },
      {
        name: 'twitter:description',
        content: 'ATPプロトコル対応 Bluesky WEBクライアント',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/js/bootstrap.bundle.min.js' }],
  },

  pwa: {
    manifest: {
      name: 'The Blue - 君とみた青空の先は',
      title: 'The Blue - 君とみた青空の先は',
      short_name: 'The Blue',
      'og:title': 'The Blue',
      description: 'ATPプロトコル対応 Bluesky WEBクライアント',
      'og:description': 'ATPプロトコル対応 Bluesky WEBクライアント',
      lang: 'ja',
      theme_color: '#0089A7',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/bootstrap.min.css', '~/assets/scss/style.scss'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/atp'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/pwa',
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        suffix: true,
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

  // store: '@/store',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // buildDir: 'public',
  build: {
    transpile: [/@atproto\/api/, /typed-vuex/, /static.*/],
  },
  generate: {
    dir: 'public',
  },
}

export default nuxtConfig
