// test-icp-config.mjs - 测试备案号配置
import { readFileSync } from 'fs';
import { resolve } from 'path';

console.log('=== 备案号配置测试 ===\n');

// 检查 .env 文件是否存在
try {
  const envPath = resolve('.env');
  const envContent = readFileSync(envPath, 'utf-8');
  console.log('✅ .env 文件存在');
  console.log('📄 内容预览:');
  console.log(envContent);
} catch (error) {
  console.log('❌ .env 文件不存在或无法读取');
}

// 模拟 Nuxt 运行时配置的读取
const mockRuntimeConfig = {
  public: {
    moeIcpCode: process.env.NUXT_PUBLIC_MOE_ICP_CODE || '20233434',
    govIcpCode: process.env.NUXT_PUBLIC_GOV_ICP_CODE || '2023037451号-3'
  }
};

console.log('\n🔧 运行时配置测试:');
console.log(`萌ICP备: ${mockRuntimeConfig.public.moeIcpCode}`);
console.log(`鲁ICP备: ${mockRuntimeConfig.public.govIcpCode}`);

console.log('\n🎯 生成的链接:');
console.log(`萌ICP备查询: https://icp.gov.moe/?keyword=${mockRuntimeConfig.public.moeIcpCode}`);
console.log(`鲁ICP备查询: https://beian.miit.gov.cn/`);

console.log('\n✅ 配置测试完成！');
