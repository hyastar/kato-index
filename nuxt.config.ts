// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  routeRules: {
    '/**': { swr: true },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/icon'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: '/fonts/lxgw-wenkai-screen-webfont/style.css',
        },
        {
          rel: 'stylesheet',
          href: '/fonts/lxgw-wenkai-webfont/style.css',
        },
      ]
    }
  },

  ssr: true,
  runtimeConfig: {
    // 明确从环境变量读取值
    githubApiUrl: process.env.NUXT_GITHUB_API_URL || '',
    githubApiKey: process.env.NUXT_GITHUB_API_KEY || '',
  }
})
