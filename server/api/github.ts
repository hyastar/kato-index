// server/api/github.ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // 如果配置缺失或不完整，返回模拟数据
  if (!config.githubApiUrl || !config.githubApiKey) {
    console.log('GitHub API config missing or incomplete, returning mock data')
    return {
      contributions: Array.from({ length: 52 }, () =>
        Array.from({ length: 7 }, () => ({
          count: Math.floor(Math.random() * 10),
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }))
      ),
      total: {
        '2024': Math.floor(Math.random() * 1000) + 500
      }
    }
  }

  try {
    return await $fetch(config.githubApiUrl, {
      query: { username: query.username },
      headers: {
        'x-api-key': config.githubApiKey as string,
      },
    })
  } catch (error) {
    console.error('External GitHub API failed, returning mock data:', error)
    // 即使外部 API 失败，也返回模拟数据确保 SSR 稳定性
    return {
      contributions: Array.from({ length: 52 }, () =>
        Array.from({ length: 7 }, () => ({
          count: Math.floor(Math.random() * 10),
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }))
      ),
      total: {
        '2024': Math.floor(Math.random() * 1000) + 500
      }
    }
  }
})
