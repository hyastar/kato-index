/**
 * Profile 多语言数据
 * 
 * Timeline 日期使用 ISO 格式（YYYY-MM-DD），便于排序和格式化
 * 显示时可以在组件中格式化为需要的格式
 */
export const profileTranslations = {
  zh: {
    tags: ['IOT', 'MCU', 'FPGA', '前端', '物联网', '边缘计算'],
    timeline: [
      { date: '2025-12-01', text: 'Nuxtjs4 建立博客' },
      { date: '2025-01-10', text: '学习 STM32' },
      { date: '2024-04-01', text: '学习 C++ Vue3' },
      { date: '2023-11-15', text: '初试 虚拟货币' },
      { date: '2023-10-01', text: '使用 hexo 建立第一个网站' },
    ],
  },
  en: {
    tags: ['IOT', 'MCU', 'FPGA', 'Frontend', 'IoT', 'Edge Computing'],
    timeline: [
      { date: '2025-12-01', text: 'Built blog with Nuxtjs4' },
      { date: '2025-01-10', text: 'Learning STM32' },
      { date: '2024-04-01', text: 'Learning C++ & Vue3' },
      { date: '2023-11-15', text: 'First try at Crypto' },
      { date: '2023-10-01', text: 'Built first site with Hexo' },
    ],
  },
  ja: {
    tags: ['IOT', 'MCU', 'FPGA', 'フロントエンド', 'IoT', 'エッジコンピューティング'],
    timeline: [
      { date: '2025-12-01', text: 'Nuxtjs4でブログ構築' },
      { date: '2025-01-10', text: 'STM32を学習' },
      { date: '2024-04-01', text: 'C++とVue3を学習' },
      { date: '2023-11-15', text: '暗号資産に初挑戦' },
      { date: '2023-10-01', text: 'Hexoで初のWebサイト構築' },
    ],
  },
}

/**
 * 格式化日期显示
 * 将 ISO 格式 (YYYY-MM-DD) 转换为显示格式 (YYYY.M.D)
 */
export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  return `${year}.${parseInt(month)}.${parseInt(day)}`
}

