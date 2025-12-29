// test-icp-labels.mjs - 测试备案标签配置
import { readFileSync } from 'fs';
import { resolve } from 'path';

console.log('=== 备案标签配置测试 ===\n');

// 检查 .env 文件是否存在并读取配置
try {
  const envPath = resolve('.env');
  const envContent = readFileSync(envPath, 'utf-8');
  console.log('✅ .env 文件存在');

  // 提取备案相关的配置
  const lines = envContent.split('\n').filter(line => line.includes('ICP'));
  console.log('📋 备案配置:');
  lines.forEach(line => console.log(`  ${line}`));
} catch (error) {
  console.log('❌ .env 文件不存在或无法读取');
}

// 模拟 Nuxt 运行时配置的读取（基于默认值）
const mockRuntimeConfig = {
  public: {
    moeIcpCode: process.env.NUXT_PUBLIC_MOE_ICP_CODE || '20233434',
    moeIcpLabel: process.env.NUXT_PUBLIC_MOE_ICP_LABEL || '萌ICP备',
    moeIcpSuffix: process.env.NUXT_PUBLIC_MOE_ICP_SUFFIX || '号',
    govIcpCode: process.env.NUXT_PUBLIC_GOV_ICP_CODE || '2023037451号-3',
    govIcpLabel: process.env.NUXT_PUBLIC_GOV_ICP_LABEL || '鲁ICP备'
  }
};

console.log('\n🔧 运行时配置测试:');
console.log(`萌ICP备: ${mockRuntimeConfig.public.moeIcpLabel} ${mockRuntimeConfig.public.moeIcpCode}${mockRuntimeConfig.public.moeIcpSuffix}`);
console.log(`鲁ICP备: ${mockRuntimeConfig.public.govIcpLabel} ${mockRuntimeConfig.public.govIcpCode}`);

console.log('\n🎨 渲染效果预览:');
console.log('萌ICP备徽章: [萌ICP备] [20233434号]');
console.log('鲁ICP备徽章: [鲁ICP备] [2023037451号-3]');
console.log('萌ICP备链接: https://icp.gov.moe/?keyword=20233434');
console.log('鲁ICP备链接: https://beian.miit.gov.cn/');

console.log('\n✅ 标签配置测试完成！');
