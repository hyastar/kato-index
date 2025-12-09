import { makeBadge } from '~/data/badge'

export const coreSkills = [
  // --- 1. 语言根基 (The Foundation) ---
  { name: 'C', icon: 'simple-icons:c', color: '#A8B9CC', url: makeBadge('C', 'A8B9CC', 'c') },
  { name: 'C++', icon: 'simple-icons:cplusplus', color: '#00599C', url: makeBadge('C++', '00599C', 'cplusplus') },
  { name: 'Assembly', icon: 'simple-icons:assemblyscript', color: '#E94E32', url: makeBadge('Assembly', 'E94E32', 'assemblyscript') }, 
  { name: 'Golang', icon: 'simple-icons:go', color: '#00ADD8', url: makeBadge('Go', '00ADD8', 'go') },
  { name: 'Python', icon: 'simple-icons:python', color: '#3776AB', url: makeBadge('Python', '3776AB', 'python') },

  // --- 2. 操作系统与内核 (The Soul) ---
  { name: 'Embedded Linux', icon: 'simple-icons:linux', color: '#FCC624', url: makeBadge('Embedded Linux', 'FCC624', 'linux') }, 
  { name: 'RT-Thread', icon: 'simple-icons:c', color: '#3D739E', url: makeBadge('RT-Thread', '3D739E', 'c') }, 
  { name: 'FreeRTOS', icon: 'simple-icons:c', color: '#03234B', url: makeBadge('FreeRTOS', '03234B', 'c') },    

  // --- 3. 硬件平台 (The Brain) ---
  { name: 'STM32', icon: 'simple-icons:stmicroelectronics', color: '#03234B', url: makeBadge('STM32', '03234B', 'stmicroelectronics') },
  { name: 'ESP32', icon: 'simple-icons:espressif', color: '#E7352C', url: makeBadge('ESP32', 'E7352C', 'espressif') },
  { name: 'FPGA', icon: 'simple-icons:intel', color: '#005696', url: makeBadge('FPGA', '005696', 'intel') }, 

  // --- 4. 工业协议 (The Veins) ---
  { name: 'CAN Bus', icon: 'simple-icons:opel', color: '#F7CE00', url: makeBadge('CAN Bus', 'F7CE00', 'opel') }, 
  { name: 'Modbus', icon: 'simple-icons:schneiderelectric', color: '#3DCD58', url: makeBadge('Modbus', '3DCD58', 'schneiderelectric') }, 
  { name: 'MQTT', icon: 'simple-icons:mqtt', color: '#3C5280', url: makeBadge('MQTT', '3C5280', 'mqtt') },
  { name: 'Bluetooth', icon: 'simple-icons:bluetooth', color: '#0082FC', url: makeBadge('Bluetooth', '0082FC', 'bluetooth') },
  { name: 'Zigbee', icon: 'simple-icons:zigbee', color: '#EB8E00', url: makeBadge('Zigbee', 'EB8E00', 'zigbee') },

  // --- 5. 应用与全栈 (The Face) ---
  { name: 'Qt', icon: 'simple-icons:qt', color: '#41CD52', url: makeBadge('Qt', '41CD52', 'qt') },
  { name: 'Nuxt.js', icon: 'simple-icons:nuxtdotjs', color: '#00DC82', url: makeBadge('Nuxt.js', '00DC82', 'nuxt') },

  // --- 6. 工程化与工具 (The Hands) ---
  { name: 'Git', icon: 'simple-icons:git', color: '#F05032', url: makeBadge('Git', 'F05032', 'git') },
  { name: 'CMake', icon: 'simple-icons:cmake', color: '#064F8C', url: makeBadge('CMake', '064F8C', 'cmake') },
  { name: 'KiCad', icon: 'simple-icons:kicad', color: '#3145A0', url: makeBadge('KiCad', '3145A0', 'kicad') },
  { name: 'OpenCV', icon: 'simple-icons:opencv', color: '#5C3EE8', url: makeBadge('OpenCV', '5C3EE8', 'opencv') }
]

