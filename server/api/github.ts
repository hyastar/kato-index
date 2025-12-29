// server/api/github.ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // 配置缺失直接报错，不再返回模拟数据
  if (!config.githubApiUrl || !config.githubApiKey) {
    console.error('GitHub API config missing')
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error',
    })
  }

  try {
    return await $fetch(config.githubApiUrl, {
      query: { username: query.username },
      headers: {
        'x-api-key': config.githubApiKey as string,
      },
    })
  } catch (error) {
    console.error('External GitHub API failed:', error)
    // 请求失败抛出异常，触发前端的 catch 逻辑
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway from GitHub Proxy',
    })
  }
})
