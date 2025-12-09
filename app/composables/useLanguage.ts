import { ref, computed, onMounted } from 'vue'

export type Lang = 'zh' | 'en' | 'ja'

export const currentLang = ref<Lang>('en')

export const useLanguage = () => {
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('ja')) {
        currentLang.value = 'ja'
      } else if (browserLang.startsWith('zh')) {
        currentLang.value = 'zh'
      } else {
        currentLang.value = 'en'
      }
    }
  })

  return {
    currentLang,
  }
}

