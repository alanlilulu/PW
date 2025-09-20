import { useState, useEffect } from 'react';

// 图片存储配置
interface StorageConfig {
  type: 'github' | 'oss' | 'cos' | 's3' | 'cloudinary' | 'qiniu';
  baseUrl: string;
  fallbackUrl?: string;
  priority: number; // 优先级，数字越小优先级越高
}

// 图片信息
interface ImageInfo {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  storageType: string;
}

// 存储配置
const STORAGE_CONFIGS: StorageConfig[] = [
  {
    type: 'oss',
    baseUrl: 'https://your-bucket.oss-cn-hangzhou.aliyuncs.com',
    priority: 1
  },
  {
    type: 'cloudinary',
    baseUrl: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1',
    priority: 2
  },
  {
    type: 'github',
    baseUrl: 'https://raw.githubusercontent.com/lalavl/portfolio-images/main',
    fallbackUrl: 'https://your-fallback-cdn.com',
    priority: 3
  }
];

export function useImageStorage() {
  const [currentStorage, setCurrentStorage] = useState<StorageConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 测试存储源可用性
  const testStorageAvailability = async (config: StorageConfig): Promise<boolean> => {
    try {
      const testUrl = `${config.baseUrl}/test-image.jpg`;
      const response = await fetch(testUrl, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // 选择最佳存储源
  const selectBestStorage = async (): Promise<StorageConfig> => {
    // 按优先级排序
    const sortedConfigs = [...STORAGE_CONFIGS].sort((a, b) => a.priority - b.priority);
    
    for (const config of sortedConfigs) {
      const isAvailable = await testStorageAvailability(config);
      if (isAvailable) {
        console.log(`✅ 选择存储源: ${config.type} (${config.baseUrl})`);
        return config;
      }
    }
    
    // 如果都不可用，返回第一个作为默认
    console.warn('⚠️ 所有存储源都不可用，使用默认配置');
    return sortedConfigs[0];
  };

  // 初始化存储源
  useEffect(() => {
    const initStorage = async () => {
      setIsLoading(true);
      try {
        const bestStorage = await selectBestStorage();
        setCurrentStorage(bestStorage);
        setError(null);
      } catch (err) {
        setError('无法初始化图片存储服务');
        console.error('存储初始化失败:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initStorage();
  }, []);

  // 获取图片 URL
  const getImageUrl = (path: string): string => {
    if (!currentStorage) {
      return path; // 返回原始路径
    }
    
    return `${currentStorage.baseUrl}/${path}`;
  };

  // 获取图片信息
  const getImageInfo = async (path: string): Promise<ImageInfo | null> => {
    try {
      const url = getImageUrl(path);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`图片加载失败: ${response.status}`);
      }

      return {
        id: path,
        url,
        alt: path.split('/').pop() || '图片',
        width: 0, // 可以从图片元数据获取
        height: 0,
        storageType: currentStorage?.type || 'unknown'
      };
    } catch (err) {
      console.error('获取图片信息失败:', err);
      return null;
    }
  };

  // 预加载图片
  const preloadImage = (path: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`图片预加载失败: ${path}`));
      img.src = getImageUrl(path);
    });
  };

  // 批量预加载
  const preloadImages = async (paths: string[]): Promise<void> => {
    const promises = paths.map(path => preloadImage(path));
    await Promise.allSettled(promises);
  };

  // 切换存储源
  const switchStorage = async (type: string): Promise<void> => {
    const config = STORAGE_CONFIGS.find(c => c.type === type);
    if (!config) {
      throw new Error(`不支持的存储类型: ${type}`);
    }

    const isAvailable = await testStorageAvailability(config);
    if (!isAvailable) {
      throw new Error(`存储源 ${type} 不可用`);
    }

    setCurrentStorage(config);
    console.log(`🔄 切换到存储源: ${type}`);
  };

  // 获取存储状态
  const getStorageStatus = () => {
    return {
      current: currentStorage?.type,
      available: STORAGE_CONFIGS.map(config => ({
        type: config.type,
        url: config.baseUrl,
        priority: config.priority
      })),
      isLoading,
      error
    };
  };

  return {
    currentStorage,
    isLoading,
    error,
    getImageUrl,
    getImageInfo,
    preloadImage,
    preloadImages,
    switchStorage,
    getStorageStatus
  };
}



