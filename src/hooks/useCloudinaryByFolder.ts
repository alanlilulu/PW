import { useState, useEffect } from 'react';
import { PortraitGroup } from '../types';
import { portraitGroups as staticPortraitGroups } from '../data/portraitGroups';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  folder?: string;
}

interface CloudinaryFolderResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

interface UseCloudinaryByFolderReturn {
  portraitGroups: PortraitGroup[];
  loading: boolean;
  error: string | null;
  debugLogs: string[];
  dataSource: 'cloudinary-folder' | 'static-fallback' | 'loading';
}

export const useCloudinaryByFolder = (): UseCloudinaryByFolderReturn => {
  const [portraitGroups, setPortraitGroups] = useState<PortraitGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<'cloudinary-folder' | 'static-fallback' | 'loading'>('loading');

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // 使用Admin API获取特定文件夹的资源
  const fetchFolderResources = async (folderPath: string): Promise<CloudinaryResource[]> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary配置不完整');
    }

    addDebugLog(`尝试获取文件夹 "${folderPath}" 的资源`);
    
    // 注意：这个应该在后端调用，这里仅用于演示
    const auth = btoa(`${apiKey}:${apiSecret}`);
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${folderPath}&max_results=100`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: CloudinaryFolderResponse = await response.json();
    addDebugLog(`文件夹 "${folderPath}" 返回 ${data.resources?.length || 0} 张照片`);
    
    return data.resources || [];
  };

  // 使用公开的transformation URL（无需API密钥）
  const fetchByTransformationList = async (): Promise<CloudinaryResource[]> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    
    if (!cloudName) {
      throw new Error('Cloudinary cloud name未配置');
    }

    // 尝试通过已知的公开URL模式获取资源
    const knownFolders = [
      'image-repo/portrait/seattle-tulips',
      'image-repo/portrait/cherry-blossom',
      'image-repo/portrait/california-ditto',
      'image-repo/portrait/uw-graduation',
      'image-repo/portrait/seattle-couples',
      'image-repo/portrait/first-meeting'
    ];

    const allResources: CloudinaryResource[] = [];

    for (const folder of knownFolders) {
      try {
        // 尝试获取文件夹中的第一张图片来验证文件夹存在
        const testUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/`;
        addDebugLog(`测试文件夹: ${folder}`);
        
        // 由于我们无法直接列出文件夹内容，我们使用已知的文件名模式
        // 这需要根据你的实际文件命名规律调整
        const commonFileNames = [
          'photo1', 'photo2', 'photo3', 'photo4', 'photo5',
          'image1', 'image2', 'image3', 'image4', 'image5',
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ];

        const folderResources: CloudinaryResource[] = [];
        
        for (const fileName of commonFileNames) {
          try {
            const fullPath = `${folder}/${fileName}`;
            const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${fullPath}.jpg`;
            
            // 测试图片是否存在
            const response = await fetch(imageUrl, { method: 'HEAD' });
            if (response.ok) {
              folderResources.push({
                public_id: fullPath,
                secure_url: imageUrl,
                url: imageUrl.replace('https://', 'http://'),
                format: 'jpg',
                width: 1920, // 默认值，实际应该从API获取
                height: 1080,
                bytes: 0,
                created_at: new Date().toISOString(),
                folder: folder
              });
            }
          } catch (err) {
            // 忽略单个文件的错误
          }
        }

        if (folderResources.length > 0) {
          allResources.push(...folderResources);
          addDebugLog(`文件夹 "${folder}" 找到 ${folderResources.length} 张照片`);
        }
      } catch (err) {
        addDebugLog(`文件夹 "${folder}" 获取失败: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    return allResources;
  };

  const organizePhotosByFolder = (photos: CloudinaryResource[]): PortraitGroup[] => {
    const folderMap = new Map<string, CloudinaryResource[]>();
    
    photos.forEach(photo => {
      // 从public_id中提取文件夹信息
      const pathParts = photo.public_id.split('/');
      let folderName = 'uncategorized';
      
      if (pathParts.length >= 3 && pathParts[0] === 'image-repo' && pathParts[1] === 'portrait') {
        folderName = pathParts[2];
      } else if (pathParts.length >= 2) {
        folderName = pathParts[pathParts.length - 2] || 'uncategorized';
      }
      
      if (!folderMap.has(folderName)) {
        folderMap.set(folderName, []);
      }
      folderMap.get(folderName)!.push(photo);
    });

    const groups: PortraitGroup[] = [];
    folderMap.forEach((photos, folderName) => {
      if (photos.length > 0) {
        // 生成中文标题
        const titleMap: { [key: string]: string } = {
          'seattle-tulips': '西雅图郁金香',
          'cherry-blossom': '樱花季节',
          'california-ditto': '加州Ditto',
          'uw-graduation': 'UW毕业照',
          'seattle-couples': '西雅图情侣',
          'first-meeting': '初次见面',
        };
        
        const group: PortraitGroup = {
          id: folderName,
          title: titleMap[folderName] || folderName,
          description: `${photos.length} 张照片`,
          coverImage: photos[0].secure_url,
          images: photos.map(photo => ({
            id: photo.public_id,
            url: photo.secure_url,
            alt: `${folderName} 照片`,
            width: photo.width,
            height: photo.height,
          })),
          tags: ['portrait', folderName],
        };
        
        groups.push(group);
      }
    });

    return groups.sort((a, b) => a.title.localeCompare(b.title));
  };

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        addDebugLog('开始加载Cloudinary文件夹照片...');

        let allPhotos: CloudinaryResource[] = [];

        // 方法1：尝试使用Admin API（需要后端支持）
        try {
          const adminPhotos = await fetchFolderResources('image-repo/portrait');
          if (adminPhotos.length > 0) {
            allPhotos = adminPhotos;
            addDebugLog(`Admin API成功获取 ${adminPhotos.length} 张照片`);
          }
        } catch (err) {
          addDebugLog(`Admin API失败: ${err instanceof Error ? err.message : String(err)}`);
        }

        // 方法2：如果Admin API失败，尝试公开URL方法
        if (allPhotos.length === 0) {
          try {
            const publicPhotos = await fetchByTransformationList();
            if (publicPhotos.length > 0) {
              allPhotos = publicPhotos;
              addDebugLog(`公开URL方法获取 ${publicPhotos.length} 张照片`);
            }
          } catch (err) {
            addDebugLog(`公开URL方法失败: ${err instanceof Error ? err.message : String(err)}`);
          }
        }

        if (allPhotos.length > 0) {
          const groups = organizePhotosByFolder(allPhotos);
          setPortraitGroups(groups);
          setDataSource('cloudinary-folder');
          addDebugLog(`成功组织成 ${groups.length} 个照片组`);
        } else {
          // 没有获取到照片，使用静态数据作为后备
          addDebugLog('未获取到Cloudinary照片，使用静态数据作为后备');
          setPortraitGroups(staticPortraitGroups);
          setDataSource('static-fallback');
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        addDebugLog(`加载失败: ${errorMessage}`);
        setError(errorMessage);
        
        // 出错时使用静态数据作为后备
        addDebugLog('使用静态数据作为后备');
        setPortraitGroups(staticPortraitGroups);
        setDataSource('static-fallback');
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  return {
    portraitGroups,
    loading,
    error,
    debugLogs,
    dataSource,
  };
};
