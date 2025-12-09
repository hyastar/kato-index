<template>
  <main class="main-content">
    <header class="hero">
      <div class="lang-switcher">
        <button
          v-for="lang in languages"
          :key="lang"
          :class="['lang-btn', { active: currentLang === lang }]"
          @click="currentLang = lang"
        >
          {{ lang === 'zh' ? '中' : lang === 'ja' ? '日' : 'En' }}
        </button>
      </div>
      <h1 class="headline">Hi I'm <span class="name">hyastar</span></h1>
      <p class="subtitle">
        {{ t.subtitle.line1 }}
        <br />
        {{ t.subtitle.line2 }}
        <br />
        {{ t.subtitle.line3 }}
      </p>
      <div class="social-icons">
        <a
          v-for="item in social"
          :key="item.label"
          :href="item.link"
          :target="item.link.startsWith('http') || item.link.startsWith('mailto') ? '_blank' : undefined"
          :rel="item.link.startsWith('http') ? 'noopener noreferrer' : undefined"
          class="icon-button"
          :aria-label="item.label"
        >
          <Icon :name="item.icon" size="22" />
        </a>
      </div>
    </header>

    <section class="glass-card panel contributions fade-in-up" style="animation-delay: 0.1s">
      <div class="panel-title flex justify-between w-full pr-4">
        <span>{{ t.dailyActivity }}</span>
        <span class="text-xs text-gray-400 font-mono">
          {{ totalContributions }} {{ t.contributions }}
        </span>
      </div>
      <div
        class="grid"
        role="img"
        :aria-label="`${t.dailyActivity}: ${totalContributions} ${t.contributions}`"
      >
        <div
          v-for="(cell, idx) in gridCells"
          :key="idx"
          class="dot"
          :class="`dot-level-${cell.level}`"
          :title="`贡献等级 ${cell.level}`"
          :aria-label="`贡献等级 ${cell.level}`"
        ></div>
      </div>
      <div class="progress">
        <div class="bar" :style="{ width: progress + '%' }"></div>
      </div>
    </section>

    <section class="panel sites fade-in-up" style="animation-delay: 0.2s">
      <div class="panel-title">
        <Icon :name="icons.sitemap" />
        <span>{{ t.site }}</span>
      </div>
      <div class="site-grid">
        <a
          v-for="site in sites"
          :key="site.title"
          :href="site.link"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card site-card"
          :style="{ '--site-color': site.color, '--site-color-rgb': getColorRgb(site.color) }"
          :aria-label="`访问 ${site.title}: ${site.desc}`"
        >
          <div class="site-left">
            <div class="site-header">
              <div class="site-title">{{ site.title }}</div>
              <span v-if="site.status" class="site-status" :class="`status-${site.status}`">
                {{ site.statusLabel }}
              </span>
            </div>
            <div class="site-desc">{{ site.desc }}</div>
          </div>
          <div class="site-icon" :style="{ color: site.color }">
            <Icon :name="site.icon" size="24" />
          </div>
          <div class="site-accent-bar"></div>
        </a>
      </div>
    </section>

    <section class="panel skills fade-in-up" style="animation-delay: 0.3s">
      <div class="panel-title">
        <Icon :name="icons.bolt" />
        <span>{{ t.techStack }}</span>
      </div>
      <div class="skill-list">
        <img
          v-for="skill in coreSkills"
          :key="skill.name"
          :src="badgeManifest[skill.name] ?? skill.url"
          :alt="skill.name"
          loading="lazy"
          decoding="async"
          class="skill-badge-shield"
          @error="(e) => ((e.target as HTMLImageElement).src = skill.url)"
        />
      </div>
      <div class="toolbox-container">
        <div class="toolbox-track">
          <template v-for="(tool, i) in [...tools, ...tools]" :key="`${tool.type}-${tool.label}-${i}`">
            <Icon v-if="tool.type === 'icon'" :name="tool.name" class="tool-icon" :title="tool.label" />
            <img
              v-else-if="tool.type === 'img'"
              :src="tool.src"
              :alt="tool.label"
              :title="tool.label"
              class="tool-img"
            />
            <svg
              v-else-if="tool.type === 'svg'"
              class="tool-icon"
              :viewBox="tool.viewBox"
              role="img"
              :aria-label="tool.label"
              :title="tool.label"
              :style="{ color: tool.color || '#cbd5e1' }"
            >
              <path
                :d="tool.path"
                :fill-rule="tool.fillRule || undefined"
                :clip-rule="tool.clipRule || undefined"
              />
            </svg>
          </template>
        </div>
      </div>
    </section>
    <!-- 复制成功提示 -->
    <div v-if="copySuccess" class="copy-toast" role="alert" aria-live="polite">
      <Icon :name="icons.check" size="16" />
      <span>{{ copyText }}</span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { currentLang, useLanguage, type Lang } from '~/composables/useLanguage'
import { icons } from '~/composables/useIcons'
import { coreSkills } from '~/data/skills'
import { tools } from '~/data/tools'
import { mainTranslations, social } from '~/data/main'

useLanguage()

// 读取 badge manifest，本地优先
const badgeManifest = ref<Record<string, string>>({})

onMounted(async () => {
  try {
    const res = await fetch('/badges/manifest.json')
    if (!res.ok) return
    badgeManifest.value = await res.json()
  } catch {}
})

// 复制功能状态
const copySuccess = ref(false)
const copyText = ref('')

const showCopyToast = (text: string) => {
  copyText.value = text
  copySuccess.value = true
  setTimeout(() => {
    copySuccess.value = false
  }, 2000)
}

const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    showCopyToast(`${label} 已复制`)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const languages: Lang[] = ['zh', 'en', 'ja']

const t = computed(() => mainTranslations[currentLang.value])
const sites = computed(() => t.value.sites)

const GRID_COLUMNS = 22
const GRID_ROWS = 7
const GRID_SIZE = GRID_COLUMNS * GRID_ROWS

const GITHUB_USERNAME = 'hyastar'

// 生成随机贡献等级 (0-4)，模拟真实 GitHub 贡献图
const generateRandomLevel = (): number => {
  const rand = Math.random()
  // 大部分是 0 或 1，少部分是 3 或 4，模拟真实提交模式
  if (rand < 0.5) return 0 // 50% 无贡献
  if (rand < 0.75) return 1 // 25% 低贡献
  if (rand < 0.9) return 2 // 15% 中贡献
  if (rand < 0.97) return 3 // 7% 高贡献
  return 4 // 3% 极高贡献
}

const getLevelFromCount = (count: number): number => {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

type GridCell = { level: number }

const gridCells = ref<GridCell[]>([])
const totalContributions = ref(0)

const { data, error } = await useFetch(
  `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
)

if (data.value && !error.value) {
  const contributions = (data.value as any).contributions
  const totals = (data.value as any).total

  const totalKeys = Object.keys(totals || {})
  const firstKey = totalKeys.at(0)
  totalContributions.value = firstKey ? totals?.[firstKey] ?? 0 : 0

  const flatDays = contributions.flat()
  const lastDays = flatDays.slice(-GRID_SIZE)

  gridCells.value = lastDays.map((day: any) => ({
    level: getLevelFromCount(day.count),
  }))
} else {
  // 生成随机但真实的贡献图数据
  gridCells.value = Array.from({ length: GRID_SIZE }, () => ({
    level: generateRandomLevel(),
  }))
  // 计算模拟的总贡献数
  totalContributions.value = gridCells.value.reduce((sum, cell) => sum + cell.level * 2, 0)
}

const progress = computed(() => {
  const target = 1000
  const p = (totalContributions.value / target) * 100
  return Math.min(p, 100)
})

// 将十六进制颜色转换为 RGB 值（用于 CSS 变量）
function getColorRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}
</script>

<style scoped>
.main-content {
  width: 100%;
  color: #f7f9fb;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

.hero {
  margin-bottom: 24px;
  text-align: left;
  color: #f7f9fb;
  position: relative;
}

.lang-switcher {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 4px;
  z-index: 10;
}

.lang-btn {
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  background: var(--glass);
  border: 1px solid var(--stroke);
  color: var(--muted);
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  font-weight: 500;
}

.lang-btn:hover {
  background: var(--glass-strong);
  transform: translateY(-1px);
}

.lang-btn.active {
  background: var(--glass-strong);
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.4);
}

.lang-btn:active {
  transform: translateY(0px) scale(0.98);
}

.headline {
  margin: 0 0 12px;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 1.2;
}

.name {
  background: linear-gradient(90deg, #ff4e8c, #ff7b36, #ffb347, #8fb3ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.7;
}


.pill {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  color: #d7e7ff;
  font-weight: 600;
}

.social-icons {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.icon-button {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--glass);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--stroke);
  box-shadow: var(--shadow);
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.icon-button:hover {
  transform: translateY(-2px);
  background: var(--glass-strong);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
}

.icon-button:active {
  transform: translateY(0px) scale(0.99);
}

/* 主 CTA 按钮 - 已注释（按钮已移除） */
/* .hero-cta {
  margin-top: 20px;
}

.primary-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: var(--radius);
  color: var(--text);
  font-weight: 600;
  font-size: 15px;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
  position: relative;
  overflow: hidden;
}

.primary-cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.primary-cta-button:hover::before {
  left: 100%;
}

.primary-cta-button:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3));
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.25);
}

.primary-cta-button:active {
  transform: translateY(0px) scale(0.98);
} */

.panel {
  margin-bottom: 26px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.3;
}

.contributions {
  padding: 18px 16px 16px;
  background: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.grid {
  display: grid;
  grid-template-columns: repeat(22, 1fr);
  gap: 4px;
  margin-bottom: 14px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* GitHub 深色模式配色 - Level 0-4 */
.dot-level-0 {
  background-color: rgba(255, 255, 255, 0.04);
}

.dot-level-1 {
  background-color: #0e4429;
  box-shadow: 0 0 3px 1px rgba(14, 68, 41, 0.4);
}

.dot-level-2 {
  background-color: #006d32;
  box-shadow: 0 0 4px 1px rgba(0, 109, 50, 0.5);
}

.dot-level-3 {
  background-color: #26a641;
  box-shadow: 0 0 5px 1px rgba(38, 166, 65, 0.6);
}

.dot-level-4 {
  background-color: #39d353;
  box-shadow: 0 0 6px 1px rgba(57, 211, 83, 0.7);
}

.dot:hover {
  transform: scale(1.3);
  z-index: 10;
  position: relative;
}

.dot-level-1:hover {
  box-shadow: 0 0 6px 2px rgba(14, 68, 41, 0.6);
}

.dot-level-2:hover {
  box-shadow: 0 0 8px 2px rgba(0, 109, 50, 0.7);
}

.dot-level-3:hover {
  box-shadow: 0 0 10px 2px rgba(38, 166, 65, 0.8);
}

.dot-level-4:hover {
  box-shadow: 0 0 12px 2px rgba(57, 211, 83, 0.9);
}

.progress {
  width: 100%;
  height: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #4bd763, #42e695);
}

.sites {
  margin-top: 6px;
}

.site-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .site-grid {
    grid-template-columns: 1fr;
  }
}

.site-card {
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text);
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  position: relative;
  background: linear-gradient(145deg, var(--glass) 0%, rgba(255, 255, 255, 0.01) 100%) !important;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  border: 1px solid var(--stroke) !important;
  overflow: hidden;
}

.site-card:hover {
  transform: translateY(-2px);
  background: var(--glass-strong) !important;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(var(--site-color-rgb, 0, 220, 130), 0.3);
  border-color: rgba(var(--site-color-rgb, 0, 220, 130), 0.4) !important;
}

.site-card:active {
  transform: translateY(0px) scale(0.99);
}

.site-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.site-status {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-online {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-developing {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.status-archived {
  background: rgba(107, 114, 128, 0.2);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.3);
}

.site-accent-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--site-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.site-card:hover .site-accent-bar {
  transform: scaleX(1);
}

.site-title {
  font-weight: 700;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.95) !important;
}

.site-desc {
  color: rgba(255, 255, 255, 0.6) !important;
  font-size: 14px;
}

.site-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.3) !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skills {
  margin-top: 4px;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
  justify-content: flex-start;
}

.skill-badge-shield {
  display: inline-block;
  height: 28px;
  width: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skill-badge-shield:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.skill-badge-left {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  height: 100%;
  color: white;
  flex-shrink: 0;
}

.skill-badge-right {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 100%;
  flex-shrink: 0;
}

.skill-badge-text {
  font-size: 12px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  letter-spacing: 0.3px;
}

.toolbox-container {
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
  position: relative;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.toolbox-track {
  display: flex;
  gap: 20px;
  width: max-content;
  animation: scroll 20s linear infinite;
}

.tool-icon {
  width: 24px;
  height: 24px;
  filter: grayscale(0.8);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.tool-icon:hover {
  filter: grayscale(0);
  transform: scale(1.2);
}

.tool-img {
  height: 24px;
  width: auto;
  filter: grayscale(0.8);
  transition: filter 0.3s ease, transform 0.3s ease;
}

.tool-img:hover {
  filter: grayscale(0);
  transform: scale(1.05);
}

.skill-badge-scroll {
  height: 28px;
  width: auto;
  border-radius: 4px;
  filter: grayscale(0.8);
  transition: filter 0.3s ease, transform 0.3s ease;
  opacity: 0.9;
}

.skill-badge-scroll:hover {
  filter: grayscale(0);
  transform: scale(1.05);
  opacity: 1;
}

.toolbox-container:hover .toolbox-track {
  animation-play-state: paused;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 复制成功提示 */
.copy-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  background: var(--glass-strong);
  border: 1px solid var(--stroke);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 14px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  z-index: 1000;
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .headline {
    font-size: 38px;
  }

  .grid {
    grid-template-columns: repeat(16, 1fr);
  }
  
  .copy-toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
    right: auto;
  }
}
</style>

