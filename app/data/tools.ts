export type IconTool = { type: 'icon'; name: string; label: string }
export type ImgTool = { type: 'img'; src: string; label: string }
export type SvgTool = {
  type: 'svg'
  label: string
  viewBox: string
  color?: string
  path: string
  fillRule?: 'evenodd' | 'inherit' | 'nonzero'
  clipRule?: 'evenodd' | 'inherit' | 'nonzero'
}
export type Tool = IconTool | ImgTool | SvgTool

// 开发工具 / 工作流（跑马灯），保留现有 Iconify 图标并追加本地图与内联 SVG
export const tools: Tool[] = [
  // --- 1. 编辑器 & 生产力 ---
  { type: 'icon', name: 'logos:visual-studio-code', label: 'VS Code' },
  { type: 'icon', name: 'logos:clion', label: 'CLion' },
  { type: 'icon', name: 'logos:vim', label: 'Vim' },
  { type: 'icon', name: 'logos:obsidian-icon', label: 'Obsidian' },
  { type: 'icon', name: 'simple-icons:c', label: 'C' },
  { type: 'icon', name: 'simple-icons:cplusplus', label: 'C++' },
  { type: 'icon', name: 'simple-icons:assemblyscript', label: 'Assembly' },
  { type: 'icon', name: 'simple-icons:go', label: 'Golang' },
  { type: 'icon', name: 'simple-icons:python', label: 'Python' },

  // --- 2. 基础设施 / 容器 / Web 部署 ---
  { type: 'icon', name: 'logos:docker-icon', label: 'Docker' },
  { type: 'icon', name: 'logos:nginx', label: 'Nginx' },
  { type: 'icon', name: 'logos:vercel-icon', label: 'Vercel' },
  { type: 'icon', name: 'simple-icons:cloudflare', label: 'Cloudflare' },
  { type: 'img', src: '/ICON/edgeone-logo.avif', label: 'Tencent EdgeOne' },
  { type: 'icon', name: 'simple-icons:tailscale', label: 'Tailscale' },
  { type: 'icon', name: 'simple-icons:termius', label: 'Termius' },
  { type: 'icon', name: 'simple-icons:mqtt', label: 'MQTT' },
  { type: 'icon', name: 'simple-icons:bluetooth', label: 'Bluetooth' },
  { type: 'icon', name: 'simple-icons:zigbee', label: 'Zigbee' },

  // --- 3. 数据库 / 数据存储 ---
  { type: 'icon', name: 'logos:redis', label: 'Redis' },
  { type: 'icon', name: 'logos:mongodb-icon', label: 'MongoDB' },
  { type: 'icon', name: 'logos:sqlite', label: 'SQLite' },
  {
    type: 'svg',
    label: 'TDengine',
    viewBox: '0 0 100 100',
    color: '#1890ff',
    path: 'm48.8 11.8c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6c.1-3.1 2.5-5.6 5.6-5.6zm-37 26.7c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6c.1-3.1 2.6-5.6 5.6-5.6zm14.5 43.6c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6zm45 0c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6zm-14.3-37.2h-16.4l-5 15.5 13.2 9.6 13.2-9.5zm-15.9-1.3 5.7-17.6c-.4-.1-.9-.2-1.3-.4l-5.8 18h-19v.5.8h18.5l-4.8 14.7-15-10.9c-.2.4-.5.7-.8 1.1l12.8 9.3 2.6 1.9-.9 2.5-5 15.5c.4.1.9.2 1.3.4l5.7-17.5 12.5 9.1-14.7 10.7c.3.3.6.7.8 1l15.1-11 15.1 11c.2-.4.5-.7.8-1l-14.8-10.8 12.5-9.1.6 1.7 5.2 15.9c.4-.2.8-.3 1.3-.4l-5.8-18 2.6-1.9 12.7-9.3c-.3-.3-.5-.7-.8-1.1l-12.4 9-.4.3-2.3 1.6-4.8-14.7h18.5c0-.3 0-.6 0-.9 0-.2 0-.3 0-.5h-19l-5.8-18c-.4.2-.8.3-1.3.4l5.7 17.6zm-22.2-5 22.5-16.4c.2.4.5.7.8 1l-22.6 16.5c-.2-.4-.5-.7-.7-1.1zm4 40.8-8.7-26.8c.4-.1.8-.3 1.2-.4l8.8 26.8c-.5.1-.9.3-1.3.4zm39.6 8.6h-27.3c0-.1 0-.2 0-.4 0-.3 0-.6 0-1h27.3v1c-.1.2-.1.3 0 .4zm21-35.3-8.7 26.8c-.4-.2-.8-.3-1.2-.4l8.7-26.8c.3.1.7.3 1.2.4zm-27.2-30.5 22.5 16.4c-.3.3-.5.7-.7 1.1l-22.7-16.4c.3-.4.6-.7.9-1.1zm29.5 16.3c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6z',
    fillRule: 'evenodd',
    clipRule: 'evenodd',
  },

  // --- 4. 嵌入式 / 硬件 ---
  { type: 'icon', name: 'logos:arduino', label: 'Arduino' },
  { type: 'icon', name: 'logos:raspberry-pi', label: 'Raspberry Pi' },
  { type: 'img', src: '/ICON/altera-logo-tm-alterablue-3000.avif', label: 'Quartus' },
  { type: 'img', src: '/ICON/jlc-eda-logo.avif', label: '嘉立创EDA' },
  { type: 'icon', name: 'simple-icons:multisim', label: 'Multisim' },
  { type: 'icon', name: 'simple-icons:linux', label: 'Embedded Linux' },
  { type: 'icon', name: 'simple-icons:stmicroelectronics', label: 'STM32' },
  { type: 'icon', name: 'simple-icons:espressif', label: 'ESP32' },
  { type: 'icon', name: 'simple-icons:intel', label: 'FPGA' },

  // --- 5. 工程建模 / 设计 ---
  { type: 'img', src: '/ICON/Solidworks-logo_red.avif', label: 'SOLIDWORKS' },
  { type: 'img', src: '/ICON/mathworks-logo.svg', label: 'MATLAB' },
  { type: 'icon', name: 'logos:blender', label: 'Blender' },
  { type: 'icon', name: 'simple-icons:adobephotoshop', label: 'Photoshop' },
  { type: 'icon', name: 'simple-icons:adobepremierepro', label: 'Premiere Pro' },
  { type: 'icon', name: 'simple-icons:adobeillustrator', label: 'Illustrator' },
  { type: 'icon', name: 'simple-icons:inkscape', label: 'Inkscape' },
  { type: 'icon', name: 'simple-icons:qt', label: 'Qt' },
  { type: 'icon', name: 'simple-icons:nuxtdotjs', label: 'Nuxt.js' },

  // --- 6. 操作系统 & 基础 ---
  { type: 'icon', name: 'logos:debian', label: 'Debian' },
  { type: 'icon', name: 'logos:ubuntu', label: 'Ubuntu' },
  { type: 'icon', name: 'simple-icons:vmware', label: 'VMware' },

  // --- 7. JetBrains 全家桶 (IDE) ---
  { type: 'icon', name: 'logos:webstorm', label: 'WebStorm' },
  { type: 'icon', name: 'logos:pycharm', label: 'PyCharm' },
  { type: 'icon', name: 'logos:datagrip', label: 'DataGrip' },
  { type: 'icon', name: 'logos:goland', label: 'GoLand' },
  { type: 'icon', name: 'logos:jetbrains', label: 'JetBrains' },

  // --- 8. 开发工具 & 版本控制 ---
  { type: 'icon', name: 'logos:git-icon', label: 'Git' },
  { type: 'icon', name: 'logos:github-icon', label: 'GitHub' },
  { type: 'icon', name: 'simple-icons:cmake', label: 'CMake' },
  { type: 'icon', name: 'simple-icons:anaconda', label: 'Anaconda' },
  { type: 'icon', name: 'simple-icons:latex', label: 'LaTeX' },
  { type: 'icon', name: 'simple-icons:kicad', label: 'KiCad' },
  { type: 'icon', name: 'simple-icons:opencv', label: 'OpenCV' },

  // --- 9. 云平台 & 社区 & 设计 ---
  { type: 'icon', name: 'logos:azure-icon', label: 'Azure' },
  { type: 'icon', name: 'logos:stackoverflow-icon', label: 'Stack Overflow' },
  { type: 'icon', name: 'logos:figma', label: 'Figma' },
]

