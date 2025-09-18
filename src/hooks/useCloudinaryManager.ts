import { useState } from 'react';

interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

interface DeleteResult {
  success: boolean;
  message: string;
  deletedIds?: string[];
  error?: string;
}

export function useCloudinaryManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取配置
  const getConfig = (): CloudinaryConfig | null => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      setError('Cloudinary 配置不完整');
      return null;
    }

    return { cloudName, apiKey, apiSecret };
  };

  // 删除单张照片
  const deleteImage = async (publicId: string): Promise<DeleteResult> => {
    const config = getConfig();
    if (!config) {
      return { success: false, message: '配置不完整' };
    }

    setIsLoading(true);
    setError(null);

    try {
      // 生成时间戳和签名
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = generateSignature(publicId, timestamp, config.apiSecret);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_id: publicId,
            api_key: config.apiKey,
            timestamp: timestamp,
            signature: signature,
          }),
        }
      );

      const result = await response.json();

      if (result.result === 'ok') {
        return {
          success: true,
          message: `照片 ${publicId} 删除成功`,
          deletedIds: [publicId],
        };
      } else {
        throw new Error(result.error?.message || '删除失败');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '删除失败';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 批量删除照片
  const deleteMultipleImages = async (publicIds: string[]): Promise<DeleteResult> => {
    if (publicIds.length === 0) {
      return { success: false, message: '没有选择要删除的照片' };
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await Promise.allSettled(
        publicIds.map(id => deleteImage(id))
      );

      const successful = results
        .filter((result): result is PromiseFulfilledResult<DeleteResult> => 
          result.status === 'fulfilled' && result.value.success
        )
        .map(result => result.value);

      const failed = results
        .filter((result): result is PromiseRejectedResult | PromiseFulfilledResult<DeleteResult> => 
          result.status === 'rejected' || 
          (result.status === 'fulfilled' && !result.value.success)
        );

      if (successful.length === publicIds.length) {
        return {
          success: true,
          message: `成功删除 ${successful.length} 张照片`,
          deletedIds: publicIds,
        };
      } else if (successful.length > 0) {
        return {
          success: true,
          message: `部分删除成功：${successful.length}/${publicIds.length}`,
          deletedIds: successful.flatMap(result => result.deletedIds || []),
        };
      } else {
        throw new Error('所有照片删除都失败了');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '批量删除失败';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // 生成 Cloudinary 签名
  const generateSignature = (publicId: string, timestamp: number, apiSecret: string): string => {
    // 注意：在实际生产环境中，签名应该在服务器端生成
    // 这里只是示例，实际使用时建议通过后端 API 调用
    const params = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    
    // 简单的哈希函数（实际应使用 SHA-1）
    let hash = 0;
    for (let i = 0; i < params.length; i++) {
      const char = params.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为 32 位整数
    }
    
    return Math.abs(hash).toString(16);
  };

  // 获取照片列表
  const getImageList = async (folder?: string): Promise<string[]> => {
    const config = getConfig();
    if (!config) {
      return [];
    }

    try {
      const url = folder 
        ? `https://res.cloudinary.com/${config.cloudName}/image/list/${folder}.json`
        : `https://res.cloudinary.com/${config.cloudName}/image/list.json`;

      const response = await fetch(url);
      const result = await response.json();

      return result.resources?.map((resource: any) => resource.public_id) || [];
    } catch (err) {
      console.error('获取照片列表失败:', err);
      return [];
    }
  };

  // 搜索照片
  const searchImages = async (query: string): Promise<string[]> => {
    const config = getConfig();
    if (!config) {
      return [];
    }

    try {
      const url = `https://res.cloudinary.com/${config.cloudName}/image/search.json?expression=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const result = await response.json();

      return result.resources?.map((resource: any) => resource.public_id) || [];
    } catch (err) {
      console.error('搜索照片失败:', err);
      return [];
    }
  };

  return {
    isLoading,
    error,
    deleteImage,
    deleteMultipleImages,
    getImageList,
    searchImages,
    clearError: () => setError(null),
  };
}

