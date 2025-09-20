import { useState, useEffect } from 'react';
import { useDebug } from '../contexts/DebugContext';

// Cloudinary资源类型
interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  asset_folder?: string;
  tags?: string[];
  context?: {
    custom?: {
      album?: string;
      title?: string;
      location?: string;
      photographer?: string;
    };
  };
}

// 相册类型
interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    width: number;
    height: number;
  }>;
  folderPath: string;
  location?: string;
  photographer?: string;
  uploadDate?: string;
}

interface UseAssetFolderAlbumsReturn {
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
  debugLogs: string[];
}

export const useAssetFolderAlbums = (): UseAssetFolderAlbumsReturn => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const { debugMode } = useDebug();

  const addDebugLog = (message: string) => {
    if (debugMode) {
      console.log(`[AssetFolderAlbums] ${message}`);
      setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    }
  };

  // 从asset_folder生成相册标题
  const generateAlbumTitle = (folderPath: string): string => {
    if (!folderPath) return '未分类';
    
    // 移除portfolio-images前缀
    const cleanPath = folderPath.replace(/^portfolio-images\//, '');
    
    // 如果路径包含斜杠，取最后一部分
    const folderName = cleanPath.split('/').pop() || cleanPath;
    
    // 将文件夹名转换为中文标题
    const titleMap: { [key: string]: string } = {
      'uw-graduation': 'UW毕业照',
      'cherry-blossom': '樱花系列',
      'california-ditto': '加州Ditto',
      'seattle-couples': '西雅图情侣',
      'first-meeting': '初次见面',
      'seattle-tulips': '西雅图郁金香',
      'photo-test': '测试相册',
      'other': '其他照片',
    };
    
    return titleMap[folderName] || folderName;
  };

  // 从asset_folder生成位置信息
  const generateLocation = (folderPath: string): string => {
    if (!folderPath) return '未知地点';
    
    const locationMap: { [key: string]: string } = {
      'uw-graduation': '华盛顿大学',
      'cherry-blossom': '樱花公园',
      'california-ditto': '加州',
      'seattle-couples': '西雅图',
      'first-meeting': '未知地点',
      'seattle-tulips': '西雅图',
      'photo-test': '测试地点',
      'other': '未知地点',
    };
    
    const folderName = folderPath.replace(/^portfolio-images\//, '').split('/').pop() || '';
    return locationMap[folderName] || '未知地点';
  };

  // 获取Cloudinary数据
  const fetchCloudinaryData = async (cursor?: string): Promise<{
    resources: CloudinaryResource[];
    nextCursor: string | null;
  }> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const url = cursor 
        ? `/api/cloudinary-proxy?max_results=50&next_cursor=${cursor}`
        : '/api/cloudinary-proxy?max_results=50';

      addDebugLog(`获取Cloudinary数据: ${url}`);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      addDebugLog(`获取到 ${data.resources?.length || 0} 张照片`);

      return {
        resources: data.resources || [],
        nextCursor: data.next_cursor || null,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('请求超时，请检查网络连接');
        }
        throw error;
      }
      throw new Error('获取数据失败');
    }
  };

  // 基于asset_folder组织照片
  const organizePhotosByAssetFolder = (resources: CloudinaryResource[]): Album[] => {
    addDebugLog(`开始基于asset_folder组织照片，输入资源数量: ${resources.length}`);

    // 过滤掉占位符图片和无效资源
    const validResources = resources.filter(photo => {
      if (photo.bytes === 0) {
        addDebugLog(`过滤占位符图片: ${photo.public_id} (bytes: ${photo.bytes})`);
        return false;
      }
      return true;
    });

    addDebugLog(`过滤后有效资源数量: ${validResources.length}`);

    // 按asset_folder分组
    const folderMap = new Map<string, CloudinaryResource[]>();

    validResources.forEach(photo => {
      let folderPath = photo.asset_folder || 'uncategorized';
      
      // 确保文件夹路径以portfolio-images开头
      if (!folderPath.startsWith('portfolio-images/')) {
        folderPath = `portfolio-images/${folderPath}`;
      }

      if (!folderMap.has(folderPath)) {
        folderMap.set(folderPath, []);
      }
      folderMap.get(folderPath)!.push(photo);
    });

    addDebugLog(`发现 ${folderMap.size} 个文件夹`);

    // 转换为相册格式
    const albums: Album[] = Array.from(folderMap.entries()).map(([folderPath, photos]) => {
      const folderName = folderPath.split('/').pop() || 'uncategorized';
      const albumId = folderName;
      
      addDebugLog(`创建相册: ${albumId} (${photos.length} 张照片)`);

      return {
        id: albumId,
        title: generateAlbumTitle(folderPath),
        description: `${photos.length} 张照片`,
        coverImage: photos[0]?.secure_url || '',
        images: photos.map(photo => ({
          id: photo.public_id,
          url: photo.secure_url,
          alt: `${generateAlbumTitle(folderPath)} - ${photo.public_id}`,
          width: photo.width,
          height: photo.height,
        })),
        folderPath,
        location: generateLocation(folderPath),
        photographer: photos[0]?.context?.custom?.photographer || '阿龙',
        uploadDate: new Date().toISOString().split('T')[0],
      };
    });

    // 按标题排序
    albums.sort((a, b) => a.title.localeCompare(b.title));

    addDebugLog(`最终创建 ${albums.length} 个相册`);
    return albums;
  };

  // 加载数据
  const loadData = async (isLoadMore = false) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isLoadMore) {
        addDebugLog('开始初始加载...');
        setAlbums([]);
        setNextCursor(null);
      } else {
        addDebugLog('开始加载更多...');
      }

      const { resources, nextCursor: newCursor } = await fetchCloudinaryData(
        isLoadMore ? nextCursor || undefined : undefined
      );

      if (resources.length === 0) {
        addDebugLog('没有获取到照片');
        if (!isLoadMore) {
          setAlbums([]);
        }
        setHasMore(false);
        return;
      }

      const newAlbums = organizePhotosByAssetFolder(resources);
      
      if (isLoadMore) {
        // 合并新相册和现有相册
        const mergedAlbums = [...albums];
        
        newAlbums.forEach(newAlbum => {
          const existingIndex = mergedAlbums.findIndex(album => album.id === newAlbum.id);
          if (existingIndex >= 0) {
            // 合并照片
            const existingAlbum = mergedAlbums[existingIndex];
            const existingPhotoIds = new Set(existingAlbum.images.map(img => img.id));
            const newImages = newAlbum.images.filter(img => !existingPhotoIds.has(img.id));
            
            mergedAlbums[existingIndex] = {
              ...existingAlbum,
              images: [...existingAlbum.images, ...newImages],
              description: `${existingAlbum.images.length + newImages.length} 张照片`,
            };
          } else {
            // 添加新相册
            mergedAlbums.push(newAlbum);
          }
        });
        
        setAlbums(mergedAlbums);
      } else {
        setAlbums(newAlbums);
      }

      setNextCursor(newCursor);
      setHasMore(!!newCursor);
      
      addDebugLog(`加载完成，当前相册数量: ${isLoadMore ? albums.length + newAlbums.length : newAlbums.length}`);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '加载失败';
      addDebugLog(`加载失败: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 加载更多
  const loadMore = () => {
    if (!isLoading && hasMore) {
      loadData(true);
    }
  };

  // 初始加载
  useEffect(() => {
    loadData(false);
  }, []);

  return {
    albums,
    isLoading,
    error,
    loadMore,
    hasMore,
    debugLogs,
  };
};
