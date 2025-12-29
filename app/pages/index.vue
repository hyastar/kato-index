<template>
  <div class="layout-container">
    <div class="bg-overlay"></div>
    <div class="layout-wrapper">
      <TheSidebar class="left-col" />
      <TheMain class="right-col" />
    </div>

    <footer class="site-footer">
      <div class="footer-badges">
        <a href="https://icp.gov.moe/?keyword=20233434" target="_blank" rel="noopener noreferrer" class="custom-badge moe-badge">
          <span class="badge-icon">
            <img src="/ICP/moe-icp.avif" alt="Moe Icon" />
          </span>
          <span class="badge-label">萌ICP备</span>
          <span class="badge-code">20233434号</span>
        </a>

        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="custom-badge gov-badge">
          <span class="badge-icon">
            <img src="/ICP/gov-icp.avif" alt="Gov Icon" />
          </span>
          <span class="badge-label">鲁ICP备</span>
          <span class="badge-code">2023037451号-3</span>
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout-container {
  min-height: 100vh;
  padding: 50px 24px;
  display: flex;

  /* 1. 将排列方向改为垂直 */
  flex-direction: column;

  /* 2. 确保内容在垂直方向上水平居中 */
  align-items: center;

  justify-content: flex-start;
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

.site-footer {
  position: relative;
  z-index: 2;
  margin-top: 40px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.footer-badges {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 通用徽章样式 */
.custom-badge {
  display: flex;
  align-items: center;
  height: 20px;
  border-radius: 3px;
  overflow: hidden;
  font-family: var(--font-main);
  font-size: 11px;
  font-weight: bold;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.custom-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

/* 图标部分 */
.badge-icon {
  background-color: #282726; /* 标签背景色 */
  display: flex;
  align-items: center;
  padding: 0 4px 0 6px;
  height: 100%;
}

.badge-icon img {
  height: 14px;
  width: auto;
}

/* 文字标签部分 */
.badge-label {
  background-color: #282726; /* 标签背景色 */
  color: #fff;
  padding-right: 6px;
  display: flex;
  align-items: center;
  height: 100%;
}

/* 代码数值部分 */
.badge-code {
  padding: 0 8px;
  display: flex;
  align-items: center;
  height: 100%;
  color: #fff;
}

/* 特定颜色配置 */
.moe-badge .badge-code {
  background-color: #fa2484; /* 萌备粉色 */
}

.gov-badge .badge-code {
  background-color: #555; /* 官方灰色 */
}

@media (max-width: 768px) {
  .footer-badges {
    flex-direction: column;
    align-items: center;
  }
}
</style>
