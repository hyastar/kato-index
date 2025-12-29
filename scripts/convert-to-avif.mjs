import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const inputDir = './public/ICP'; // 你的图片目录
const outputDir = './public/avif'; // 输出目录

async function convert() {
  await fs.mkdir(outputDir, { recursive: true });
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    // 跳过 SVG（SVG 本身已非常轻量，通常不需要转 AVIF）
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const fileName = path.parse(file).name;
      await sharp(path.join(inputDir, file))
        .avif({ quality: 60, effort: 4 })
        .toFile(path.join(outputDir, `${fileName}.avif`));
      console.log(`✅ Converted: ${file}`);
    }
  }
}

convert();