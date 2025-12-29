<template>
  <aside class="sidebar">
    <div class="glass-card profile-box fade-in-up" style="animation-delay: 0.1s">
      <div class="avatar-wrapper">
        <img
          class="avatar"
          src="/avatar.avif"
          alt="Avatar Me"
          width="80"
          height="80"
          loading="eager"
          decoding="async"
        />
        <Icon :name="icons.heart" class="avatar-heart" />
        <img
          class="avatar"
          src="/kato.avif"
          alt="Avatar Kato"
          width="80"
          height="80"
          loading="eager"
          decoding="async"
        />
      </div>
      <div class="info">
        <div class="info-row">
          <Icon :name="icons.mapMarker" />
          <span>China - ShanDong</span>
        </div>
        <div class="info-row">
          <Icon :name="icons.university" />
          <span>YTU</span>
        </div>
        <div class="info-row">
          <Icon :name="icons.user" />
          <span>{{ age }} 岁</span>
        </div>
      </div>

      <div class="tags">
        <span v-for="tag in tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="glass-card timeline-box fade-in-up" style="animation-delay: 0.2s">
      <ul class="timeline" role="list">
        <li
          v-for="(item, index) in timeline"
          :key="item.date"
          class="timeline-item"
          role="listitem"
        >
          <div class="dot" :class="{ active: index === 0 }" :aria-label="index === 0 ? '当前' : undefined"></div>
          <div class="content">
            <div class="date-row">
              <span class="date">{{ formatDate(item.date) }}</span>
              <span v-if="index === 0" class="now-badge" aria-label="当前">Now</span>
            </div>
            <span class="text">{{ item.text }}</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import { icons } from '~/composables/useIcons'
import { profileTranslations, formatDate } from '~/data/profile'

const { currentLang } = useLanguage()

const BIRTHDAY = new Date('2004-08-22T00:00:00Z')

const t = computed(() => profileTranslations[currentLang.value])
const tags = computed(() => t.value.tags)
const timeline = computed(() => t.value.timeline)

const age = ref('21.4') // 服务端使用静态默认值

onMounted(() => {
  const updateAge = () => {
    const now = Date.now()
    const diffMs = now - BIRTHDAY.getTime()
    const years = diffMs / (1000 * 60 * 60 * 24 * 365.25)
    age.value = years.toFixed(1) // 仅在客户端挂载后更新准确值
  }

  updateAge()
})
</script>

<style scoped>
.sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

@media (prefers-reduced-motion: no-preference) {
  .fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }
}

.profile-box {
  padding: 28px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 16px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.6s ease;
}

.avatar-heart {
  font-size: 28px;
  color: #ff4757;
}

.profile-box:hover .avatar {
  transform: scale(1.04) rotate(2deg);
}

.info {
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 6px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.tag {
  background: rgba(255, 255, 255, 0.6);
  padding: 6px 12px;
  border-radius: 14px;
  font-size: 12px;
  color: #2d2d2d;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.timeline-box {
  padding: 20px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline-item {
  position: relative;
  padding-left: 20px;
  border-left: 2px solid rgba(255, 255, 255, 0.15);
}

.timeline-item:last-child {
  border-left: none;
}

.dot {
  position: absolute;
  left: -7px;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid var(--bg0);
  transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}

.dot.active {
  background: var(--accent-color);
  box-shadow: 0 0 8px rgba(84, 170, 233, 0.5);
  transform: scale(1.2);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date {
  font-size: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
}

.now-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.2));
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: var(--font-mono);
}

.text {
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
}
</style>

