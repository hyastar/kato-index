<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  link: string
}>()
</script>

<template>
  <a
    :href="link"
    :target="link.startsWith('http') || link.startsWith('mailto') ? '_blank' : undefined"
    :rel="link.startsWith('http') ? 'noopener noreferrer' : undefined"
    class="social-button"
    :aria-label="label"
  >
    <Icon :name="icon" class="social-button-icon" />
    <span class="social-button-text">{{ label }}</span>
  </a>
</template>

<style scoped>
.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--glass);
  border: 1px solid var(--stroke);
  color: var(--muted);
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  box-shadow: var(--shadow);
}

.social-button:hover {
  transform: translateY(-2px) scale(1.02);
  background: var(--glass-strong);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
  color: var(--text);
}

.social-button:active {
  transform: translateY(0px) scale(0.98);
}

.social-button-icon {
  width: 20px;
  height: 20px;
  transition: color 0.18s ease;
}

.social-button-text {
  font-weight: 500;
  transition: color 0.18s ease;
}
</style>

