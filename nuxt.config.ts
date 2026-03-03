// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: false },
  app: {
    head: {
      title: '基於AI融入跨系科課程體驗活動鏈結師資設備產業精進技職教育人才培育',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'description', content: '宏國德霖科技大學主辦的基於AI融入跨系科課程體驗活動鏈結師資設備產業精進技職教育人才培育計畫。' },
        { name: 'keywords', content: '宏國德霖科技大學, AI 基礎應用, 創意繪圖, 人才培育營, 人工智慧, AI 競賽, AI工具實作研習' },
        { name: 'author', content: '宏國德霖科技大學餐旅學院助理蔡忠辰' }
      ],},
  },

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
