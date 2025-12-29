// scripts/fetch-github.mjs

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_PATH = path.join(__dirname, '../app/data/github-data.json')

async function fetchGithub() {
  const url = process.env.NUXT_GITHUB_API_URL
  const key = process.env.NUXT_GITHUB_API_KEY
  const username = 'hyastar'

  if (!url || !key) {
    console.error('缺少 API 配置，跳过更新')
    process.exit(0)
  }

  try {
    const response = await fetch(`${url}?username=${username}`, {
      headers: { 'x-api-key': key }
    })

    if (!response.ok) throw new Error('API 响应错误')

    const data = await response.json()

    // 只有当数据包含有效贡献记录时才写入
    if (data && data.contributions) {
      fs.writeFileSync(CACHE_PATH, JSON.stringify(data, null, 2))
      console.log('GitHub 数据更新成功')
    }
  } catch (error) {
    console.warn('抓取失败，将保持旧数据:', error.message)
    // 失败时不报错退出，确保后续构建流程继续
  }
}

fetchGithub()
