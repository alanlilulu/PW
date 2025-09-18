# 🖼️ 图片存储服务配置指南

## 🚨 GitHub 存储的问题

GitHub 存储图片存在以下不稳定性：
- **API 限制**：403 错误、速率限制
- **CDN 不稳定**：raw.githubusercontent.com 访问慢
- **仓库大小限制**：单个仓库有 1GB 软限制
- **网络问题**：某些地区访问 GitHub 不稳定

## 🎯 推荐解决方案

### 方案 1：阿里云 OSS（国内推荐）

#### 优势：
- 国内访问速度快
- 价格便宜
- 稳定性高
- 支持 CDN 加速

#### 配置步骤：
1. 注册阿里云账号
2. 开通 OSS 服务
3. 创建 Bucket
4. 获取 AccessKey 和 SecretKey

#### 环境变量配置：
```bash
VITE_OSS_ENABLED=true
VITE_OSS_BASE_URL=https://your-bucket.oss-cn-hangzhou.aliyuncs.com
VITE_OSS_REGION=oss-cn-hangzhou
VITE_OSS_BUCKET=your-bucket-name
VITE_OSS_ACCESS_KEY=your-access-key-id
VITE_OSS_SECRET_KEY=your-access-key-secret
```

### 方案 2：腾讯云 COS

#### 优势：
- 国内访问速度快
- 与腾讯生态集成好
- 价格合理

#### 配置步骤：
1. 注册腾讯云账号
2. 开通 COS 服务
3. 创建 Bucket
4. 获取 SecretId 和 SecretKey

#### 环境变量配置：
```bash
VITE_COS_ENABLED=true
VITE_COS_BASE_URL=https://your-bucket.cos.ap-beijing.myqcloud.com
VITE_COS_REGION=ap-beijing
VITE_COS_BUCKET=your-bucket-name
VITE_COS_SECRET_ID=your-secret-id
VITE_COS_SECRET_KEY=your-secret-key
```

### 方案 3：Cloudinary（国际推荐）

#### 优势：
- 免费额度大（25GB 存储，25GB 带宽/月）
- 自动图片优化
- 全球 CDN
- 无需服务器

#### 配置步骤：
1. 注册 Cloudinary 账号
2. 获取 Cloud Name
3. 获取 API Key 和 API Secret

#### 环境变量配置：
```bash
VITE_CLOUDINARY_ENABLED=true
VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/your-cloud-name/image/upload/v1
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_API_SECRET=your-api-secret
```

### 方案 4：AWS S3

#### 优势：
- 全球服务
- 稳定性极高
- 功能丰富

#### 配置步骤：
1. 注册 AWS 账号
2. 创建 S3 Bucket
3. 创建 IAM 用户
4. 获取 Access Key 和 Secret Key

#### 环境变量配置：
```bash
VITE_S3_ENABLED=true
VITE_S3_BASE_URL=https://your-bucket.s3.us-east-1.amazonaws.com
VITE_S3_REGION=us-east-1
VITE_S3_BUCKET=your-bucket-name
VITE_S3_ACCESS_KEY=your-access-key-id
VITE_S3_SECRET_KEY=your-secret-access-key
```

## 🔧 配置步骤

### 1. 创建环境配置文件
在项目根目录创建 `.env.local` 文件：

```bash
# 复制 .env.example 为 .env.local
cp .env.example .env.local
```

### 2. 编辑配置文件
根据你选择的存储服务，编辑 `.env.local` 文件：

```bash
# 例如，配置阿里云 OSS
VITE_OSS_ENABLED=true
VITE_OSS_BASE_URL=https://your-bucket.oss-cn-hangzhou.aliyuncs.com
VITE_OSS_REGION=oss-cn-hangzhou
VITE_OSS_BUCKET=your-bucket-name
VITE_OSS_ACCESS_KEY=your-access-key-id
VITE_OSS_SECRET_KEY=your-access-key-secret
```

### 3. 重启开发服务器
```bash
npm run dev
```

### 4. 验证配置
在浏览器中：
1. 开启 Debug 模式
2. 点击右上角的"存储管理"按钮
3. 查看存储源状态
4. 测试切换存储源

## 📁 图片上传流程

### 1. 准备图片
- 建议使用 WebP 格式（体积小，质量高）
- 图片尺寸建议：1920x1080 或 1200x800
- 单张图片大小：建议小于 500KB

### 2. 上传到存储服务
根据选择的存储服务，使用相应的工具或 SDK 上传图片

### 3. 更新图片路径
在代码中更新图片路径，使用新的存储服务 URL

## 🚀 性能优化建议

### 1. 图片格式
- **WebP**：现代浏览器支持，体积小
- **JPEG**：兼容性好，适合照片
- **PNG**：适合需要透明度的图片

### 2. 图片尺寸
- 根据显示需求选择合适的尺寸
- 使用响应式图片技术
- 实现懒加载

### 3. CDN 配置
- 启用存储服务的 CDN 功能
- 配置合适的缓存策略
- 监控 CDN 性能

## 🔒 安全注意事项

### 1. 访问控制
- 使用私有 Bucket 时配置正确的访问权限
- 定期轮换 Access Key
- 使用最小权限原则

### 2. 环境变量
- 不要将 `.env.local` 文件提交到版本控制
- 在生产环境使用环境变量或密钥管理服务
- 定期检查密钥是否泄露

### 3. 图片安全
- 验证上传的图片格式和大小
- 防止恶意文件上传
- 配置防盗链策略

## 📊 成本对比

| 服务 | 存储费用 | 流量费用 | 请求费用 | 免费额度 |
|------|----------|----------|----------|----------|
| 阿里云 OSS | ¥0.12/GB/月 | ¥0.50/GB | ¥0.01/万次 | 40GB/月 |
| 腾讯云 COS | ¥0.10/GB/月 | ¥0.50/GB | ¥0.01/万次 | 50GB/月 |
| AWS S3 | $0.023/GB/月 | $0.09/GB | $0.0004/千次 | 5GB/月 |
| Cloudinary | 免费 | 免费 | 免费 | 25GB/月 |
| 七牛云 | ¥0.12/GB/月 | ¥0.50/GB | ¥0.01/万次 | 10GB/月 |

## 🆘 故障排除

### 常见问题：

1. **403 错误**
   - 检查 Access Key 和 Secret Key 是否正确
   - 确认 Bucket 权限设置
   - 验证网络访问策略

2. **图片加载慢**
   - 检查 CDN 配置
   - 确认图片格式和大小
   - 使用图片压缩工具

3. **存储费用过高**
   - 检查图片访问频率
   - 优化图片大小和格式
   - 配置生命周期策略

### 获取帮助：
- 查看浏览器控制台错误信息
- 检查网络请求状态
- 参考存储服务官方文档
- 联系技术支持

## 📝 总结

推荐配置优先级：
1. **阿里云 OSS**：国内用户首选，性价比高
2. **Cloudinary**：国际用户首选，免费额度大
3. **腾讯云 COS**：国内备选方案
4. **GitHub**：仅作为备用方案

通过配置多个存储源，可以实现高可用性和更好的用户体验。

