/**
 * 统一的 Badge 生成函数
 * 用于生成 shields.io badge URL
 * 
 * @param label - Badge 标签文本
 * @param color - Badge 背景颜色（十六进制，不含 #）
 * @param logo - 可选的 logo 图标名称（simple-icons 格式）
 * @returns shields.io badge URL
 */
export const makeBadge = (label: string, color: string, logo?: string): string => {
  const q = new URLSearchParams({
    style: 'flat-square',
    labelColor: '0b1220',
  })

  if (logo) {
    q.set('logo', logo)
    // 不设置 logoColor，让每个 logo 使用自己的原始颜色
  }

  return `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(color)}?${q.toString()}`
}

