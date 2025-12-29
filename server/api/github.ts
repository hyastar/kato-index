// server/api/github.ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // 调试用：如果报错，可以在控制台看这两个值是否存在
  console.log('API URL:', config.githubApiUrl)

  if (!config.githubApiUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Runtime configuration "githubApiUrl" is missing.',
    })
  }

  return await $fetch(config.githubApiUrl, {
    query: { username: query.username },
    headers: {
      'x-api-key': config.githubApiKey as string,
    },
  })
})
