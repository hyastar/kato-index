# kato-index

> 
> **🧑‍💻 物联网全栈开发者的精致个人门户。** > 基于 Nuxt 4 + SSG 架构，追求极致的加载速度、稳定性与极客美学。 
> 
> 

## ✨ 项目亮点

* **🤖 全自动流水线 (CI/CD)**：通过 GitHub Actions 每天定时抓取真实 GitHub 数据并自动持久化至仓库，配合 EdgeOne Pages 实现内容的自动化更新。
* **🎨 极客美学设计**：
* **磨砂玻璃 (Glassmorphism)**：基于 CSS 变量的深度视觉系统，支持移动端自适应模糊降级。
* **人文排版**：内置“霞鹜文楷”屏幕版字体，针对中文字符进行精细优化。
* **高精度组件**：动态计算到小数点后一位的精准年龄计算器。


* **🌍 稳健的多语言系统**：支持 中/英/日 三语，采用 `useState` 结合客户端水合策略，完美解决 SSG 模式下的语言偏移问题。
* **⚙️ 完全配置化管理**：备案号、API 密钥、站点信息全部通过环境变量 `.env` 驱动，代码与配置彻底解耦。

## 🛠️ 技术栈

* 
**框架**: [Nuxt 4 (Future Mode)](https://nuxt.com/) & [Vue 3](https://vuejs.org/) 


* 
**部署**: [Tencent Cloud EdgeOne Pages](https://cloud.tencent.com/product/eo) (支持全球加速) 


* **样式**: 原生 CSS 变量 + Sass (Scss)
* **图标**: [@nuxt/icon](https://nuxt.com/modules/icon) (集成 Iconify 多字符集)
* 
**图片优化**: AVIF 格式支持 + [@nuxt/image](https://image.nuxt.com/) 



## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/hyastar/kato-index.git
cd kato-index

```

### 2. 安装依赖

```bash
pnpm install

```

### 3. 环境配置

在根目录创建 `.env` 文件，参考以下配置：

```env
# GitHub 数据源 (需配合你的代理 API)
NUXT_GITHUB_API_URL=https://your-proxy.com/api/github
NUXT_GITHUB_API_KEY=your_secret_key

# 备案信息 (可选)
NUXT_PUBLIC_MOE_ICP_CODE=2023xxxx
NUXT_PUBLIC_MOE_ICP_LABEL=萌ICP备
NUXT_PUBLIC_GOV_ICP_CODE=鲁ICP备2023xxxx号-x
NUXT_PUBLIC_GOV_ICP_LABEL=鲁ICP备

```

### 4. 开发与构建

```bash
# 启动开发服务器
pnpm dev

# 执行数据抓取脚本 (更新 github-data.json)
pnpm badges:fetch

# 生成静态站点 (SSG)
pnpm generate

```

## 📈 自动化数据流逻辑

本项目通过以下流程确保静态页面的贡献墙永远真实有效：

1. **Scheduled Action**: 每天凌晨触发 GitHub Action。
2. **Fetch & Sync**: 运行 `fetch-github.mjs` 抓取最新数据并写入 `app/data/github-data.json`。
3. **Git Commit**: 自动将更新后的 JSON 提交回 `main` 分支。
4. **Auto Deploy**: 强制推送至 `build` 分支，触发 EdgeOne Pages 的 SSG 构建流程，将最新数据打入静态 HTML。

## 📂 目录结构

```text
├── app/
│   ├── components/    # 核心组件 (Sidebar, Main, SocialButton)
│   ├── composables/   # 组合式函数 (图标、语言管理)
│   ├── data/          # 静态翻译与 GitHub 数据缓存
│   └── assets/css/    # 视觉一致性 Design Tokens
├── scripts/           # 数据抓取与维护脚本
├── server/api/        # 服务端代理接口
└── .github/workflows/ # 自动化部署流水线

```

## 📄 License

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) License © 2025 [hyastar](https://github.com/hyastar)

---

