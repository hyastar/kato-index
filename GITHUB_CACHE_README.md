# GitHub 数据缓存系统

这个系统实现了基于持久化缓存的GitHub贡献数据获取策略，确保SSG构建的稳定性和可靠性。

## 📁 文件结构

```
app/data/github-data.json    # GitHub贡献数据缓存文件
scripts/fetch-github.mjs     # 数据抓取脚本
.github/workflows/           # GitHub Actions工作流
├── deploy.yml              # 部署工作流（包含数据更新）
└── update-github-data.yml  # 独立的数据更新工作流
```

## 🚀 工作原理

1. **构建时优先使用缓存**: 网站构建时直接读取本地JSON文件，无需API调用
2. **定期更新数据**: GitHub Actions每天自动抓取最新数据并更新缓存
3. **容错机制**: API失败时保持使用上次成功的数据，确保网站稳定

## ⚙️ 设置步骤

### 1. 配置环境变量

在GitHub仓库的Settings > Secrets and variables > Actions中添加：

```
NUXT_GITHUB_API_URL=你的API地址
NUXT_GITHUB_API_KEY=你的API密钥
```

### 2. 工作流配置

系统包含两个工作流：

- **`deploy.yml`**: 完整的部署流程，包含数据更新和构建触发
- **`update-github-data.yml`**: 仅更新GitHub数据，用于测试或单独运行

### 3. 手动测试

```bash
# 测试数据抓取脚本
node scripts/fetch-github.mjs

# 查看缓存数据
cat app/data/github-data.json
```

## 🎯 优势

✅ **绝对稳定性**: 构建时不需要外部API调用
✅ **容错性强**: API失败时显示上次成功的数据
✅ **自动化**: 数据通过git提交持久化存储
✅ **高性能**: 减少API调用，降低服务器压力

## 🔧 故障排除

### 数据没有更新
- 检查GitHub Actions的运行日志
- 确认环境变量配置正确
- 查看API服务是否正常

### 网站显示旧数据
- 检查`app/data/github-data.json`文件内容
- 运行手动更新工作流
- 查看Git提交历史

### 构建失败
- 确认缓存文件格式正确
- 检查JSON语法
- 查看构建日志中的错误信息

## 📊 监控

可以通过以下方式监控系统状态：

1. **GitHub Actions历史**: 查看工作流运行状态
2. **数据新鲜度**: 检查缓存文件的最后修改时间
3. **网站显示**: 确认贡献数据是否为最新

## 🔄 更新频率

默认配置为每天北京时间00:00自动更新一次。如需调整频率，修改`.github/workflows/update-github-data.yml`中的cron表达式：

```yaml
schedule:
  - cron: '0 16 * * *'  # 北京时间00:00 (UTC 16:00)
```
