// test-data-flow.mjs - 测试新的数据流程逻辑

// 模拟不同的数据场景
const scenarios = {
  scenarioA: {
    name: 'API Success',
    apiData: {
      contributions: [
        [{ count: 5, date: '2024-01-01' }, { count: 3, date: '2024-01-02' }]
      ],
      total: { '2024': 456 }
    },
    cacheData: null,
    expected: 'Use API data'
  },
  scenarioB: {
    name: 'API Failed, Cache Valid',
    apiData: null,
    cacheData: {
      contributions: [
        [{ count: 2, date: '2024-01-01' }, { count: 1, date: '2024-01-02' }]
      ],
      total: { '2024': 234 }
    },
    expected: 'Use cache data'
  },
  scenarioC: {
    name: 'Both Failed',
    apiData: null,
    cacheData: null,
    expected: 'Use empty state'
  },
  scenarioD: {
    name: 'API Failed, Cache Empty',
    apiData: null,
    cacheData: {
      contributions: [],
      total: {}
    },
    expected: 'Use empty state'
  }
};

console.log('=== Testing New Data Flow Logic ===\n');

// 模拟数据处理函数
function processData(source, scenario) {
  const contributions = source.contributions;
  const total = source.total;
  const totalKeys = Object.keys(total || {});
  const firstKey = totalKeys.at(0);
  const totalContributions = firstKey ? total[firstKey] ?? 0 : 0;

  console.log(`  📊 ${scenario}: Total contributions = ${totalContributions}`);
  return totalContributions;
}

// 测试每个场景
Object.entries(scenarios).forEach(([key, scenario]) => {
  console.log(`🔍 ${scenario.name}:`);

  const { apiData, cacheData, expected } = scenario;
  let result = 'Unknown';

  if (apiData && apiData.contributions) {
    result = 'Use API data';
    processData(apiData, 'API Data');
  } else if (cacheData && cacheData.contributions && cacheData.contributions.length > 0) {
    result = 'Use cache data';
    processData(cacheData, 'Cache Data');
  } else {
    result = 'Use empty state';
    console.log('  📊 Empty State: Total contributions = 0');
  }

  const status = result === expected ? '✅' : '❌';
  console.log(`  ${status} Expected: ${expected}, Got: ${result}\n`);
});

console.log('=== Data Flow Test Completed ===');
