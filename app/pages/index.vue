<template>
  <div class="layout-container">
    <div class="bg-overlay"></div>
    <div class="layout-wrapper">
      <TheSidebar class="left-col" />
      <TheMain class="right-col" />
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  padding: 50px 24px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(255, 138, 255, 0.18), transparent 25%),
    radial-gradient(circle at 80% 10%, rgba(79, 172, 254, 0.2), transparent 25%),
    radial-gradient(circle at 70% 70%, rgba(0, 242, 254, 0.18), transparent 25%),
    linear-gradient(135deg, rgba(8, 15, 40, 0.9), rgba(7, 26, 69, 0.92));
  filter: blur(0px);
  z-index: 1;
}

.layout-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1200px;
  gap: 30px;
  position: relative;
  z-index: 2;
}

.left-col {
  order: 1;
  width: 300px;
  flex-shrink: 0;
}

.right-col {
  order: 2;
  flex-grow: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .layout-wrapper {
    flex-direction: column;
  }

  .left-col {
    width: 100%;
  }
}
</style>
