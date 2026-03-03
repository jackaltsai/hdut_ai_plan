// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: false },

  srcDir: 'app/',

  css: [
    '~/assets/css/timeline.css'
  ],

  modules: [
    '@nuxt/icon'
  ],

  nitro: {
    preset: 'cloudflare-pages',
  },
})
