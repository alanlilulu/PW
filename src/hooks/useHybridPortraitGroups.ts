import { useState, useEffect } from 'react';
import { PortraitGroup } from '../data/portraitGroups';
import { portraitGroups as staticPortraitGroups } from '../data/portraitGroups';

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

export function useHybridPortraitGroups() {
  const [portraitGroups, setPortraitGroups] = useState<PortraitGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cloudinary' | 'static' | 'mixed'>('static');

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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

  // 获取指定文件夹的所有照片
  const getPhotosFromFolder = async (folder: string): Promise<CloudinaryResource[]> => {
    try {
      const response = await fetch(
        `https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`
      );
      
      if (!response.ok) {
        console.log(`文件夹 ${folder} 不存在或为空`);
        return [];
      }
      
      const result = await response.json();
      return result.resources || [];
    } catch (err) {
      console.error(`获取文件夹 ${folder} 的照片失败:`, err);
      return [];
    }
  };

  // 自动发现portfolio-images文件夹中的所有照片组
  const discoverPhotoGroups = async (): Promise<PhotoGroup[]> => {
    try {
      const response = await fetch(
        `https://res.cloudinary.com/${cloudName}/image/list/portfolio-images.json`
      );
      
      if (!response.ok) {
        console.log('portfolio-images文件夹不存在或为空');
        return [];
      }
      
      const result = await response.json();
      const resources = result.resources || [];
      
      // 按子文件夹分组
      const folderGroups: { [key: string]: CloudinaryResource[] } = {};
      
      resources.forEach((resource: CloudinaryResource) => {
        const publicId = resource.public_id;
        if (publicId.includes('/')) {
          const folderName = publicId.split('/')[0];
          if (!folderGroups[folderName]) {
            folderGroups[folderName] = [];
          }
          folderGroups[folderName].push(resource);
        }
      });
      
      // 转换为PhotoGroup格式
      const groups: PhotoGroup[] = [];
      Object.entries(folderGroups).forEach(([folderName, photos]) => {
        if (photos.length > 0) {
          groups.push({
            id: folderName,
            title: folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            photos,
            folder: `portfolio-images/${folderName}`
          });
        }
      });
      
      return groups;
    } catch (err) {
      console.error('自动发现照片组失败:', err);
      return [];
    }
  };

  // 转换Cloudinary照片为PortraitGroup格式
  const convertCloudinaryToPortraitGroup = (group: PhotoGroup): PortraitGroup => ({
    id: group.id,
    titleKey: `portrait.groups.${group.id}`,
    mainPhoto: {
      src: group.photos[0] 
        ? getOptimizedPhotoUrl(group.photos[0].public_id, { width: 800, quality: 'auto' })
        : '',
      alt: `${group.title} - 主图`
    },
    photos: group.photos.map((photo, index) => ({
      src: getOptimizedPhotoUrl(photo.public_id, { width: 800, quality: 'auto' }),
      alt: `${group.title} - 照片 ${index + 1}`,
      description: `${group.title}摄影作品 - 第${index + 1}张`
    })),
    category: "人像摄影",
    location: "西雅图",
    date: "2024年",
    folderPath: group.folder
  });

  // 加载混合数据
  const loadHybridData = async () => {
    if (!cloudName) {
      console.log('Cloudinary配置不完整，使用静态数据');
      setPortraitGroups(staticPortraitGroups);
      setDataSource('static');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 定义Cloudinary文件夹配置 - 更新为实际的portfolio-images文件夹
      const cloudinaryConfigs = [
        {
          id: 'seattle-tulips',
          title: '西雅图郁金香',
          folder: 'portfolio-images/seattle-tulips'
        },
        {
          id: 'california-ditto',
          title: '加州阳光',
          folder: 'portfolio-images/california-ditto'
        },
        {
          id: 'uw-graduation',
          title: '毕业季',
          folder: 'portfolio-images/uw-graduation'
        },
        {
          id: 'cherry-blossom',
          title: '樱花季',
          folder: 'portfolio-images/cherry-blossom'
        },
        {
          id: 'first-meeting',
          title: '初次见面',
          folder: 'portfolio-images/first-meeting'
        },
        {
          id: 'seattle-couples',
          title: '情侣时光',
          folder: 'portfolio-images/seattle-couples'
        }
      ];

      const cloudinaryGroups: PhotoGroup[] = [];
      const mixedGroups: PortraitGroup[] = [];

      // 首先尝试自动发现portfolio-images文件夹中的照片组
      const discoveredGroups = await discoverPhotoGroups();
      
      if (discoveredGroups.length > 0) {
        // 如果自动发现了照片组，使用它们
        cloudinaryGroups.push(...discoveredGroups);
        console.log(`自动发现了 ${discoveredGroups.length} 个照片组:`, discoveredGroups.map(g => g.id));
      } else {
        // 如果没有自动发现，尝试预定义的文件夹
        for (const config of cloudinaryConfigs) {
          const photos = await getPhotosFromFolder(config.folder);
          if (photos.length > 0) {
            cloudinaryGroups.push({
              id: config.id,
              title: config.title,
              photos,
              folder: config.folder
            });
          }
        }
      }

      // 如果有Cloudinary照片，使用Cloudinary数据
      if (cloudinaryGroups.length > 0) {
        const convertedGroups = cloudinaryGroups.map(convertCloudinaryToPortraitGroup);
        
        // 如果有部分Cloudinary照片，混合使用
        if (cloudinaryGroups.length < cloudinaryConfigs.length) {
          // 为没有Cloudinary照片的组使用静态数据
          const cloudinaryIds = new Set(cloudinaryGroups.map(g => g.id));
          const staticGroups = staticPortraitGroups.filter(g => !cloudinaryIds.has(g.id));
          
          setPortraitGroups([...convertedGroups, ...staticGroups]);
          setDataSource('mixed');
          console.log(`混合模式: ${convertedGroups.length}个Cloudinary组 + ${staticGroups.length}个静态组`);
        } else {
          // 全部使用Cloudinary数据
          setPortraitGroups(convertedGroups);
          setDataSource('cloudinary');
          console.log(`Cloudinary模式: ${convertedGroups.length}个照片组`);
        }
      } else {
        // 没有Cloudinary照片，使用静态数据
        setPortraitGroups(staticPortraitGroups);
        setDataSource('static');
        console.log(`静态模式: ${staticPortraitGroups.length}个照片组`);
      }
    } catch (err) {
      console.error('加载照片失败:', err);
      setError(err instanceof Error ? err.message : '加载照片失败');
      // 出错时使用静态数据作为备用
      setPortraitGroups(staticPortraitGroups);
      setDataSource('static');
    } finally {
      setIsLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadHybridData();
  }, []);

  return {
    portraitGroups,
    isLoading,
    error,
    dataSource,
    loadHybridData,
    getOptimizedPhotoUrl
  };
}
