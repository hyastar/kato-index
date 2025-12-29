// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  routeRules: {
    '/**': { swr: true },
    '/': { prerender: true }, // 开启首页预渲染以支持 SSG
  },
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image'], // 必须添加 image 模块
  css: ['~/assets/css/main.css'],

  nitro: {
    compressPublicAssets: true, // 开启静态资源压缩优化
  },

  image: {
    provider: 'static', // 设置为静态 provider 以适配 SSG 部署
  },

  app: {
    head: {
      title: 'hyastar - 物联网全栈开发者',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: 'hyastar的个人网站 - 物联网全栈开发者，分享技术博客、开发工具和创意项目。专注于嵌入式开发、物联网应用和全栈技术。'
        },
        {
          name: 'keywords',
          content: 'hyastar,物联网,嵌入式开发,全栈开发者,技术博客,Vue,React,物联网工具'
        },
        {
          name: 'author',
          content: 'hyastar'
        },
        {
          property: 'og:title',
          content: 'hyastar - 物联网全栈开发者'
        },
        {
          property: 'og:description',
          content: 'hyastar的个人网站 - 物联网全栈开发者，分享技术博客、开发工具和创意项目。'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:title',
          content: 'hyastar - 物联网全栈开发者'
        },
        {
          name: 'twitter:description',
          content: 'hyastar的个人网站 - 物联网全栈开发者，分享技术博客、开发工具和创意项目。'
        }
      ],
      link: [
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/lxgw-wenkai-screen-webfont/files/lxgwwenkaigbscreen-subset-91.woff2',
          crossorigin: 'anonymous',
        },
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
    githubApiUrl: '',
    githubApiKey: '',
  }
})
