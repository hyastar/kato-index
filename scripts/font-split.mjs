import { fontSplit } from '@konghayao/cn-font-split'
import path from 'node:path'
import fs from 'node:fs'

const root = process.cwd()

async function splitSingleFont(fileName, fontName) {
  const inputFont = path.join(root, 'public/fonts', fileName)
  const outputDir = path.join(
    root,
    'public/fonts/subsets',
    fontName.replace(/\s+/g, '-').toLowerCase()
  )

  // 确保输出目录存在
  fs.mkdirSync(outputDir, { recursive: true })

  console.log(`🚀 正在处理: ${fontName} (${fileName})...`)

  try {
    await fontSplit({
      FontPath: inputFont,

      // ✅ 关键：必须是 destFold
      destFold: outputDir,

      targetType: 'woff2',
      chunkSize: 70 * 1024,

      // ✅ 输出 css 文件名（可选）
      cssFileName: 'result.css',

      css: {
        fontFamily: fontName,
        fontWeight: 400,
        fontStyle: 'normal',
        fontDisplay: 'swap',
        localFamily: [fontName],
      },

      testHTML: false,
      reporter: true,
    })

    console.log(`✅ ${fontName} 处理完成！`)
  } catch (err) {
    console.error(`❌ ${fontName} 处理失败:`, err?.message || err)
  }
