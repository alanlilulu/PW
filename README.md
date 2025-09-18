# 🖼️ Portrait Photography Website

一个现代化的摄影作品展示网站，支持多种图片存储服务。

## ✨ 主要特性

- 🎨 响应式设计，支持移动端和桌面端
- 🌍 多语言支持（中文/英文）
- 🚀 高性能图片加载和优化
- 🔧 多种图片存储服务支持
- 📱 现代化的用户界面
- 🎭 戏剧作品展示
- 💼 职业经历介绍

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置图片存储服务

#### 方法 1：使用配置脚本（推荐）

```bash
node scripts/setup-storage.js
```

按照提示选择存储服务并配置相关信息。

#### 方法 2：手动配置

创建 `.env.local` 文件并配置相应的环境变量：

```bash
# 阿里云 OSS 示例
VITE_OSS_ENABLED=true
VITE_OSS_BASE_URL=https://your-bucket.oss-cn-hangzhou.aliyuncs.com
VITE_OSS_REGION=oss-cn-hangzhou
VITE_OSS_BUCKET=your-bucket-name
VITE_OSS_ACCESS_KEY=your-access-key-id
VITE_OSS_SECRET_KEY=your-access-key-secret
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 访问网站

打开浏览器访问 `http://localhost:5173`

## 🖼️ 支持的存储服务

### 1. 阿里云 OSS（推荐）
- 国内访问速度快
- 价格便宜
- 稳定性高
- 支持 CDN 加速

### 2. 腾讯云 COS
- 国内访问速度快
- 与腾讯生态集成好
- 价格合理

### 3. Cloudinary
- 免费额度大（25GB 存储，25GB 带宽/月）
- 自动图片优化
- 全球 CDN
- 无需服务器

### 4. AWS S3
- 全球服务
- 稳定性极高
- 功能丰富

### 5. 七牛云
- 国内 CDN 服务
- 价格合理
- 功能完善

### 6. GitHub（备用）
- 免费使用
- 适合小项目
- 存在访问限制

## 🔧 配置说明

### 环境变量

所有配置都通过环境变量进行管理，支持以下前缀：

- `VITE_OSS_*` - 阿里云 OSS 配置
- `VITE_COS_*` - 腾讯云 COS 配置
- `VITE_S3_*` - AWS S3 配置
- `VITE_CLOUDINARY_*` - Cloudinary 配置
- `VITE_QINIU_*` - 七牛云配置
- `VITE_GITHUB_*` - GitHub 配置

### 存储优先级

系统会按照配置的优先级自动选择可用的存储源：

1. 阿里云 OSS（优先级 1）
2. 腾讯云 COS（优先级 2）
3. AWS S3（优先级 3）
4. Cloudinary（优先级 4）
5. 七牛云（优先级 5）
6. GitHub（优先级 6）

## 📱 使用说明

### 1. 开启 Debug 模式

在页面右上角找到 Debug 开关，点击开启。

### 2. 管理存储服务

开启 Debug 模式后，右上角会出现"存储管理"按钮，点击可以：

- 查看当前使用的存储源
- 查看所有可用的存储源
- 手动切换存储源
- 验证存储源配置

### 3. 配置 GitHub Token

如果使用 GitHub 存储，可以在右上角配置 GitHub Personal Access Token：

1. 访问 [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. 生成新的 Token，选择 `repo` 权限
3. 复制 Token 到网站配置中
4. 点击"验证"按钮确认 Token 有效

## 🚀 部署

### 构建生产版本

```bash
npm run build
```

### 部署到服务器

将 `dist` 目录中的文件部署到你的 Web 服务器。

### 环境变量配置

在生产环境中，确保配置了正确的环境变量：

```bash
# 生产环境配置示例
VITE_OSS_ENABLED=true
VITE_OSS_BASE_URL=https://your-production-bucket.oss-cn-hangzhou.aliyuncs.com
VITE_OSS_ACCESS_KEY=your-production-access-key
VITE_OSS_SECRET_KEY=your-production-secret-key
```

## 🛠️ 开发

### 项目结构

```
src/
├── components/          # React 组件
│   ├── layout/         # 布局组件
│   ├── sections/       # 页面区块组件
│   └── ui/            # 通用 UI 组件
├── hooks/              # 自定义 Hooks
├── contexts/           # React Context
├── config/             # 配置文件
├── types/              # TypeScript 类型定义
└── utils/              # 工具函数
```

### 添加新的存储服务

1. 在 `src/config/storage.ts` 中添加新的配置
2. 在 `src/hooks/useImageStorage.ts` 中实现相应的逻辑
3. 更新 `src/components/StorageManager.tsx` 中的显示逻辑

### 代码规范

- 使用 TypeScript 进行类型检查
- 使用 ESLint 进行代码规范检查
- 使用 Prettier 进行代码格式化
- 遵循 React Hooks 最佳实践

## 📚 相关文档

- [存储配置指南](./STORAGE_SETUP.md) - 详细的存储服务配置说明
- [API 文档](./docs/api.md) - API 接口文档
- [组件文档](./docs/components.md) - 组件使用说明

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 🆘 支持

如果遇到问题，请：

1. 查看 [常见问题](./docs/faq.md)
2. 搜索现有的 Issue
3. 创建新的 Issue 并描述问题

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

