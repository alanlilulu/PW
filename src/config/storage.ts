// 存储服务配置
export interface StorageServiceConfig {
  name: string;
  type: 'oss' | 'cos' | 's3' | 'cloudinary' | 'qiniu' | 'github' | 'gcs' | 'digitalocean';
  baseUrl: string;
  region?: string;
  bucket?: string;
  accessKey?: string;
  secretKey?: string;
  apiKey?: string;
  apiSecret?: string;
  domain?: string;
  priority: number;
  enabled: boolean;
  recommendedFor?: string[]; // 推荐使用的地区
}

// 默认存储配置 - 针对美国用户优化
export const STORAGE_CONFIGS: StorageServiceConfig[] = [
  // Cloudinary (美国用户首选)
  {
    name: 'Cloudinary',
    type: 'cloudinary',
    baseUrl: import.meta.env.VITE_CLOUDINARY_BASE_URL || 'https://res.cloudinary.com/your-cloud-name/image/upload/v1',
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
    apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || '',
    priority: 1,
    enabled: import.meta.env.VITE_CLOUDINARY_ENABLED === 'true',
    recommendedFor: ['US', 'CA', 'EU', 'Global']
  },

  // AWS S3 (美国本土服务)
  {
    name: 'AWS S3',
    type: 's3',
    baseUrl: import.meta.env.VITE_S3_BASE_URL || 'https://your-bucket.s3.us-east-1.amazonaws.com',
    region: import.meta.env.VITE_S3_REGION || 'us-east-1',
    bucket: import.meta.env.VITE_S3_BUCKET || 'your-bucket-name',
    accessKey: import.meta.env.VITE_S3_ACCESS_KEY || '',
    secretKey: import.meta.env.VITE_S3_SECRET_KEY || '',
    priority: 2,
    enabled: import.meta.env.VITE_S3_ENABLED === 'true',
    recommendedFor: ['US', 'CA', 'Global']
  },

  // Google Cloud Storage
  {
    name: 'Google Cloud Storage',
    type: 'gcs',
    baseUrl: import.meta.env.VITE_GCS_BASE_URL || 'https://storage.googleapis.com/your-bucket-name',
    bucket: import.meta.env.VITE_GCS_BUCKET || 'your-bucket-name',
    priority: 3,
    enabled: import.meta.env.VITE_GCS_ENABLED === 'true',
    recommendedFor: ['US', 'CA', 'Global']
  },

  // DigitalOcean Spaces
  {
    name: 'DigitalOcean Spaces',
    type: 'digitalocean',
    baseUrl: import.meta.env.VITE_DO_SPACES_BASE_URL || 'https://your-space.nyc3.digitaloceanspaces.com',
    bucket: import.meta.env.VITE_DO_SPACES_BUCKET || 'your-space-name',
    accessKey: import.meta.env.VITE_DO_SPACES_KEY || '',
    secretKey: import.meta.env.VITE_DO_SPACES_SECRET || '',
    priority: 4,
    enabled: import.meta.env.VITE_DO_SPACES_ENABLED === 'true',
    recommendedFor: ['US', 'CA', 'EU']
  },

  // 阿里云 OSS (国内用户)
  {
    name: '阿里云 OSS',
    type: 'oss',
    baseUrl: import.meta.env.VITE_OSS_BASE_URL || 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com',
    region: import.meta.env.VITE_OSS_REGION || 'oss-cn-hangzhou',
    bucket: import.meta.env.VITE_OSS_BUCKET || 'your-bucket-name',
    accessKey: import.meta.env.VITE_OSS_ACCESS_KEY || '',
    secretKey: import.meta.env.VITE_OSS_SECRET_KEY || '',
    priority: 5,
    enabled: import.meta.env.VITE_OSS_ENABLED === 'true',
    recommendedFor: ['CN', 'AP']
  },

  // 腾讯云 COS (国内用户)
  {
    name: '腾讯云 COS',
    type: 'cos',
    baseUrl: import.meta.env.VITE_COS_BASE_URL || 'https://your-bucket.cos.ap-beijing.myqcloud.com',
    region: import.meta.env.VITE_COS_REGION || 'ap-beijing',
    bucket: import.meta.env.VITE_COS_BUCKET || 'your-bucket-name',
    accessKey: import.meta.env.VITE_COS_SECRET_ID || '',
    secretKey: import.meta.env.VITE_COS_SECRET_KEY || '',
    priority: 6,
    enabled: import.meta.env.VITE_COS_ENABLED === 'true',
    recommendedFor: ['CN', 'AP']
  },

  // 七牛云 (国内用户)
  {
    name: '七牛云',
    type: 'qiniu',
    baseUrl: import.meta.env.VITE_QINIU_BASE_URL || 'https://your-domain.com',
    domain: import.meta.env.VITE_QINIU_DOMAIN || 'your-domain.com',
    accessKey: import.meta.env.VITE_QINIU_ACCESS_KEY || '',
    secretKey: import.meta.env.VITE_QINIU_SECRET_KEY || '',
    priority: 7,
    enabled: import.meta.env.VITE_QINIU_ENABLED === 'true',
    recommendedFor: ['CN', 'AP']
  },

  // GitHub (备用)
  {
    name: 'GitHub',
    type: 'github',
    baseUrl: import.meta.env.VITE_GITHUB_BASE_URL || 'https://raw.githubusercontent.com/lalavl/portfolio-images/main',
    priority: 8,
    enabled: import.meta.env.VITE_GITHUB_ENABLED !== 'false', // 默认启用
    recommendedFor: ['Global']
  }
];

// 获取启用的存储配置
export const getEnabledStorageConfigs = (): StorageServiceConfig[] => {
  return STORAGE_CONFIGS.filter(config => config.enabled);
};

// 获取指定类型的存储配置
export const getStorageConfigByType = (type: string): StorageServiceConfig | undefined => {
  return STORAGE_CONFIGS.find(config => config.type === type);
};

// 验证存储配置
export const validateStorageConfig = (config: StorageServiceConfig): string[] => {
  const errors: string[] = [];

  if (!config.baseUrl) {
    errors.push(`${config.name}: 缺少 baseUrl 配置`);
  }

  switch (config.type) {
    case 'oss':
    case 'cos':
    case 's3':
      if (!config.accessKey || !config.secretKey) {
        errors.push(`${config.name}: 缺少 accessKey 或 secretKey`);
      }
      if (!config.bucket) {
        errors.push(`${config.name}: 缺少 bucket 配置`);
      }
      break;
    
    case 'cloudinary':
      if (!config.apiKey || !config.apiSecret) {
        errors.push(`${config.name}: 缺少 apiKey 或 apiSecret`);
      }
      break;
    
    case 'qiniu':
      if (!config.accessKey || !config.secretKey) {
        errors.push(`${config.name}: 缺少 accessKey 或 secretKey`);
      }
      if (!config.domain) {
        errors.push(`${config.name}: 缺少 domain 配置`);
      }
      break;
  }

  return errors;
};

// 获取所有配置错误
export const getAllConfigErrors = (): string[] => {
  const enabledConfigs = getEnabledStorageConfigs();
  const allErrors: string[] = [];

  enabledConfigs.forEach(config => {
    const errors = validateStorageConfig(config);
    allErrors.push(...errors);
  });

  return allErrors;
};
