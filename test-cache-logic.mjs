// test-cache-logic.mjs - 测试缓存逻辑

// 模拟API数据
const mockApiData = {
  contributions: [
    [
      { count: 5, date: '2024-01-01' },
      { count: 3, date: '2024-01-02' },
      { count: 8, date: '2024-01-03' }
    ]
  ],
  total: { '2024': 456 }
};

// 模拟缓存数据
const mockCacheData = {
  contributions: [
    [
      { count: 2, date: '2024-01-01' },
      { count: 1, date: '2024-01-02' },
      { count: 4, date: '2024-01-03' }
    ]
  ],
  total: { '2024': 234 }
};

console.log('=== GitHub Cache System Test ===');
console.log('');

// Test Case 1: API Success
console.log('Case 1: API fetch successful');
console.log('Expected: Use API data');
console.log('API total contributions:', mockApiData.total['2024']);
console.log('');

// Test Case 2: API Failed, Cache Exists
console.log('Case 2: API fetch failed, cache exists');
console.log('Expected: Use cached data');
console.log('Cache total contributions:', mockCacheData.total['2024']);
console.log('');

// Test Case 3: Both API and Cache Failed
console.log('Case 3: Both API and cache failed');
console.log('Expected: Use empty state');
console.log('Show empty contribution grid');

console.log('');
console.log('=== Test Completed ===');
