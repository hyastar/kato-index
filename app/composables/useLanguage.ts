import { useState } from '#app'

export type Lang = 'zh' | 'en' | 'ja'

export const useLanguage = () => {
  // 使用 useState 替代全局 ref，确保 SSR/SSG 安全性
  const currentLang = useState<Lang>('currentLang', () => 'en')

  // 仅在客户端且挂载后进行语言检测，避免水合冲突
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase()
      let detected: Lang = 'en'

      if (browserLang.startsWith('ja')) {
        detected = 'ja'
      } else if (browserLang.startsWith('zh')) {
        detected = 'zh'
      }

      // 只有在检测结果不同时更新，这样会触发一次正常的客户端重绘
      if (currentLang.value !== detected) {
        currentLang.value = detected
      }
    }
  })

  return { currentLang }
}

