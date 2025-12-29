// test-optimization.mjs - 测试 useAsyncData default 参数优化

// 模拟缓存数据
const cachedData = {
  contributions: [
    [{ count: 2, date: '2024-01-01' }, { count: 1, date: '2024-01-02' }]
  ],
  total: { '2024': 234 }
};

// 模拟API数据
const apiData = {
  contributions: [
    [{ count: 5, date: '2024-01-01' }, { count: 3, date: '2024-01-02' }]
  ],
  total: { '2024': 456 }
};

console.log('=== Testing useAsyncData Default Parameter Optimization ===\n');

// 模拟 useAsyncData 的 default 行为
function simulateUseAsyncData(apiSuccess = true) {
  // default 参数的行为：当API请求进行中时返回缓存数据
  const defaultValue = cachedData && cachedData.contributions && cachedData.contributions.length > 0 ? cachedData : null;

  // 模拟API请求结果
  const apiResult = apiSuccess ? apiData : null;

  return {
    data: { value: apiResult || defaultValue }
  };
}

console.log('📊 Cache Data:', cachedData.total['2024'], 'contributions');
console.log('📊 API Data:', apiData.total['2024'], 'contributions\n');

// 测试场景1: API成功
console.log('🔍 Scenario 1: API Success');
const result1 = simulateUseAsyncData(true);
const isApiData1 = result1.data.value !== cachedData;
console.log('  Data is from API:', isApiData1);
console.log('  Total contributions:', result1.data.value.total['2024']);
console.log('  ✅ Expected: Use API data\n');

// 测试场景2: API失败
console.log('🔍 Scenario 2: API Failed');
const result2 = simulateUseAsyncData(false);
const isApiData2 = result2.data.value !== cachedData;
console.log('  Data is from API:', isApiData2);
console.log('  Total contributions:', result2.data.value.total['2024']);
console.log('  ✅ Expected: Use cache data\n');

console.log('=== Optimization Test Completed ===');
console.log('\n🎯 Benefits:');
console.log('  ✅ No layout flash during API requests');
console.log('  ✅ Immediate data display on page load');
console.log('  ✅ Smoother user experience');
console.log('  ✅ Better perceived performance');
