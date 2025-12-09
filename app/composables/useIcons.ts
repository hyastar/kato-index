/**
 * 统一的图标映射层
 * 避免直接使用图标集合 key，统一管理所有图标
 */
export const icons = {
  // 导航与站点
  tools: 'mdi:toolbox',
  sitemap: 'mdi:sitemap',
  globe: 'mdi:web',
  
  // 社交与联系
  github: 'mdi:github',
  email: 'mdi:email',
  telegram: 'mdi:telegram',
  bilibili: 'ri:bilibili-line',
  youtube: 'simple-icons:youtube',
  
  // 通用
  bolt: 'mdi:flash',
  heart: 'mdi:heart',
  mapMarker: 'mdi:map-marker',
  university: 'mdi:school',
  plus: 'mdi:plus',
  
  // 状态与操作
  copy: 'mdi:content-copy',
  check: 'mdi:check',
  external: 'mdi:open-in-new',
}

/**
 * 获取图标名称，如果不存在则返回默认图标
 */
export function getIcon(name: keyof typeof icons): string {
  return icons[name] || icons.plus
}

