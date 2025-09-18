import { useState, useEffect } from 'react';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
  tags: string[];
}

interface PhotoGroup {
  id: string;
  title: string;
  photos: CloudinaryResource[];
  folder: string;
}

export function useDynamicCloudinaryPhotos() {
  const [photoGroups, setPhotoGroups] = useState<PhotoGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // 获取指定文件夹的所有照片
  const getPhotosFromFolder = async (folder: string): Promise<CloudinaryResource[]> => {
    try {
      const response = await fetch(
        `https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`
      );
      const result = await response.json();
      
      return result.resources || [];
    } catch (err) {
      console.error(`获取文件夹 ${folder} 的照片失败:`, err);
      return [];
    }
  };

  // 获取所有照片组
  const loadPhotoGroups = async () => {
    if (!cloudName) {
      setError('Cloudinary配置不完整');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 定义照片组配置 - 更新为实际的Cloudinary文件夹路径
      const groupConfigs = [
        {
          id: 'seattle-tulips',
          title: '西雅图郁金香',
          folder: 'image-repo/portrait/seattle-tulips'
        },
        {
          id: 'california-ditto',
          title: '加州阳光',
          folder: 'image-repo/portrait/california-ditto'
        },
        {
          id: 'uw-graduation',
          title: '毕业季',
          folder: 'image-repo/portrait/uw-graduation'
        },
        {
          id: 'cherry-blossom',
          title: '樱花季',
          folder: 'image-repo/portrait/cherry-blossom'
        },
        {
          id: 'first-meeting',
          title: '初次见面',
          folder: 'image-repo/portrait/first-meeting'
        },
        {
          id: 'seattle-couples',
          title: '情侣时光',
          folder: 'image-repo/portrait/seattle-couples'
        }
      ];

      const groups: PhotoGroup[] = [];

      for (const config of groupConfigs) {
        const photos = await getPhotosFromFolder(config.folder);
        if (photos.length > 0) {
          groups.push({
            id: config.id,
            title: config.title,
            photos,
            folder: config.folder
          });
        }
      }

      // 如果没有找到Cloudinary照片，使用静态数据作为备用
      if (groups.length === 0) {
        console.log('Cloudinary中没有找到照片，使用静态数据作为备用');
        // 这里可以添加静态数据，或者保持空数组
        setPhotoGroups([]);
      } else {
        setPhotoGroups(groups);
      }
    } catch (err) {
      console.error('Cloudinary加载失败:', err);
      setError(err instanceof Error ? err.message : '加载照片失败');
      // 即使出错也设置空数组，避免undefined
      setPhotoGroups([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取优化后的照片URL
  const getOptimizedPhotoUrl = (
    publicId: string, 
    options?: {
      width?: number;
      height?: number;
      quality?: string;
      format?: string;
    }
  ): string => {
    if (!cloudName) return '';

    let url = `https://res.cloudinary.com/${cloudName}/image/upload`;
    
    if (options) {
      const transformations = [];
      if (options.width) transformations.push(`w_${options.width}`);
      if (options.height) transformations.push(`h_${options.height}`);
      if (options.quality) transformations.push(`q_${options.quality}`);
      if (options.format) transformations.push(`f_${options.format}`);
      
      if (transformations.length > 0) {
        url += `/${transformations.join(',')}`;
      }
    }
    
    url += `/${publicId}`;
    return url;
  };

  // 组件挂载时加载照片
  useEffect(() => {
    loadPhotoGroups();
  }, []);

  return {
    photoGroups,
    isLoading,
    error,
    loadPhotoGroups,
    getOptimizedPhotoUrl,
    getPhotosFromFolder
  };
}
