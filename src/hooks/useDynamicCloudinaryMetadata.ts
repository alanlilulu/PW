import { useState, useEffect } from 'react';
import { PortraitGroup } from '../data/portraitGroups';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  created_at: string;
  asset_folder?: string;
  tags?: string[];
  context?: {
    custom?: {
      [key: string]: string;
    };
  };
}

interface CloudinaryResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

interface UseDynamicCloudinaryMetadataReturn {
  portraitGroups: PortraitGroup[];
  isLoading: boolean;
  error: string | null;
  debugLogs: string[];
  loadMore: () => void;
  hasMore: boolean;
}

export const useDynamicCloudinaryMetadata = (): UseDynamicCloudinaryMetadataReturn => {
  const [portraitGroups, setPortraitGroups] = useState<PortraitGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const addDebugLog = (message: string) => {
    console.log(message);
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // 获取Cloudinary数据
  const fetchCloudinaryData = async (cursor?: string): Promise<CloudinaryResponse> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时

    try {
      const url = cursor 
        ? `/api/cloudinary-proxy?max_results=50&next_cursor=${cursor}`
        : '/api/cloudinary-proxy?max_results=50';

      addDebugLog(`📡 请求URL: ${url}`);

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

      const data: CloudinaryResponse = await response.json();
      addDebugLog(`📋 API返回: ${data.resources?.length || 0} 张照片`);
      
      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          throw new Error('请求超时，请检查网络连接');
        }
        throw err;
      }
      throw new Error('未知错误');
    }
  };

  // 基于元数据的智能分类
  const classifyPhotoByMetadata = (photo: CloudinaryResource): string => {
    const { public_id, asset_folder, tags, context } = photo;
    
    addDebugLog(`🔍 分析照片: ${public_id}`);
    addDebugLog(`   - asset_folder: ${asset_folder || '无'}`);
    addDebugLog(`   - tags: ${tags?.join(', ') || '无'}`);
    addDebugLog(`   - context: ${JSON.stringify(context?.custom || {})}`);

    // 优先级1: 使用asset_folder（最可靠）
    if (asset_folder) {
      const folderParts = asset_folder.split('/');
      const lastFolder = folderParts[folderParts.length - 1];
      
      // 跳过通用文件夹
      if (!['portfolio-images', 'image-repo', 'portrait'].includes(lastFolder)) {
        addDebugLog(`   ✅ 使用asset_folder: ${lastFolder}`);
        return lastFolder;
      }
    }

    // 优先级2: 使用tags
    if (tags && tags.length > 0) {
      // 查找相册相关的tag
      const albumTags = tags.filter(tag => 
        !['portrait', 'photo', 'image'].includes(tag.toLowerCase())
      );
      
      if (albumTags.length > 0) {
        const primaryTag = albumTags[0];
        addDebugLog(`   ✅ 使用tag: ${primaryTag}`);
        return primaryTag;
      }
    }

    // 优先级3: 使用context自定义字段
    if (context?.custom) {
      const customFields = context.custom;
      
      // 查找相册字段
      if (customFields.album) {
        addDebugLog(`   ✅ 使用context.album: ${customFields.album}`);
        return customFields.album;
      }
      
      if (customFields.category) {
        addDebugLog(`   ✅ 使用context.category: ${customFields.category}`);
        return customFields.category;
      }
    }

    // 优先级4: 从public_id推断（备用方案）
    const pathParts = public_id.split('/');
    if (pathParts.length > 1) {
      // 查找可能的相册文件夹
      for (let i = pathParts.length - 2; i >= 0; i--) {
        const part = pathParts[i];
        if (!['portfolio-images', 'image-repo', 'portrait'].includes(part)) {
          addDebugLog(`   ✅ 从public_id推断: ${part}`);
          return part;
        }
      }
    }

    // 兜底：使用文件名关键词
    const fileName = pathParts[pathParts.length - 1];
    if (fileName.includes('UW毕业') || fileName.includes('毕业')) {
      addDebugLog(`   ✅ 文件名关键词: uw-graduation`);
      return 'uw-graduation';
    } else if (fileName.includes('樱花') || fileName.includes('cherry')) {
      addDebugLog(`   ✅ 文件名关键词: cherry-blossom`);
      return 'cherry-blossom';
    } else if (fileName.includes('加州') || fileName.includes('california')) {
      addDebugLog(`   ✅ 文件名关键词: california-ditto`);
      return 'california-ditto';
    } else if (fileName.includes('情侣') || fileName.includes('couple')) {
      addDebugLog(`   ✅ 文件名关键词: seattle-couples`);
      return 'seattle-couples';
    } else if (fileName.includes('第一次') || fileName.includes('first')) {
      addDebugLog(`   ✅ 文件名关键词: first-meeting`);
      return 'first-meeting';
    } else if (fileName.includes('tulip-portrait')) {
      addDebugLog(`   ✅ 文件名关键词: seattle-tulips`);
      return 'seattle-tulips';
    }

    addDebugLog(`   ⚠️ 无法分类，使用默认: other`);
    return 'other';
  };

  // 生成相册标题
  const generateAlbumTitle = (albumId: string, photos: CloudinaryResource[]): string => {
    // 尝试从第一张照片的元数据获取标题
    const firstPhoto = photos[0];
    
    // 优先级1: 使用context中的title
    if (firstPhoto.context?.custom?.title) {
      return firstPhoto.context.custom.title;
    }

    // 优先级2: 使用context中的album_name
    if (firstPhoto.context?.custom?.album_name) {
      return firstPhoto.context.custom.album_name;
    }

    // 优先级3: 使用预定义映射
    const titleMap: { [key: string]: string } = {
      'uw-graduation': 'UW毕业照',
      'cherry-blossom': '樱花系列',
      'seattle-tulips': '西雅图郁金香',
      'california-ditto': '加州Ditto',
      'seattle-couples': '西雅图情侣',
      'first-meeting': '初次见面',
      'other': '其他照片',
    };

    return titleMap[albumId] || albumId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // 生成相册位置
  const generateAlbumLocation = (albumId: string, photos: CloudinaryResource[]): string => {
    // 尝试从第一张照片的元数据获取位置
    const firstPhoto = photos[0];
    
    if (firstPhoto.context?.custom?.location) {
      return firstPhoto.context.custom.location;
    }

    // 使用预定义映射
    const locationMap: { [key: string]: string } = {
      'uw-graduation': '华盛顿大学',
      'cherry-blossom': '樱花公园',
      'seattle-tulips': '西雅图',
      'california-ditto': '加州',
      'seattle-couples': '西雅图',
      'first-meeting': '未知地点',
      'other': '未知地点',
    };

    return locationMap[albumId] || '未知地点';
  };

  // 组织资源为相册
  const organizeResourcesIntoAlbums = (resources: CloudinaryResource[]): PortraitGroup[] => {
    addDebugLog(`开始组织相册，输入资源数量: ${resources.length}`);
    
    // 过滤掉占位符图片
    const validResources = resources.filter(photo => {
      if (photo.bytes === 0) {
        addDebugLog(`过滤占位符图片: ${photo.public_id} (bytes: ${photo.bytes})`);
        return false;
      }
      return true;
    });

    addDebugLog(`有效资源数量: ${validResources.length}`);

    const albumMap = new Map<string, CloudinaryResource[]>();
    
    // 对每张照片进行分类
    validResources.forEach(photo => {
      const albumId = classifyPhotoByMetadata(photo);
      
      if (!albumMap.has(albumId)) {
        albumMap.set(albumId, []);
      }
      albumMap.get(albumId)!.push(photo);
    });

    // 调试信息：显示每个相册的照片数量
    albumMap.forEach((photos, albumId) => {
      addDebugLog(`相册 ${albumId}: ${photos.length} 张照片`);
    });

    // 转换为PortraitGroup格式
    const albums: PortraitGroup[] = Array.from(albumMap.entries()).map(([albumId, photos]) => ({
      id: albumId,
      title: generateAlbumTitle(albumId, photos),
      description: `${photos.length} 张照片`,
      coverImage: photos[0]?.secure_url || '',
      images: photos.map(photo => ({
        id: photo.public_id,
        url: photo.secure_url,
        alt: `${albumId} 照片`,
        width: photo.width,
        height: photo.height,
      })),
      tags: ['portrait', albumId],
      titleKey: albumId,
      mainPhoto: photos[0] ? {
        src: photos[0].secure_url,
        alt: `${albumId} 照片`,
        width: photos[0].width,
        height: photos[0].height,
      } : {
        src: '',
        alt: '无照片',
      },
      photos: photos.map(photo => ({
        src: photo.secure_url,
        alt: `${albumId} 照片`,
        width: photo.width,
        height: photo.height,
      })),
      category: '人像摄影',
      location: generateAlbumLocation(albumId, photos),
      date: '2024-2025',
      folderPath: `image-repo/portrait/${albumId}`,
    }));

    const sortedAlbums = albums.sort((a, b) => b.photos.length - a.photos.length);
    addDebugLog(`相册组织完成，共 ${sortedAlbums.length} 个相册`);
    
    return sortedAlbums;
  };

  // 加载更多数据
  const loadMore = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchCloudinaryData(nextCursor || undefined);
      
      if (data.resources && data.resources.length > 0) {
        const newAlbums = organizeResourcesIntoAlbums(data.resources);
        
        setPortraitGroups(prev => {
          // 合并新相册和现有相册
          const mergedMap = new Map<string, PortraitGroup>();
          
          // 添加现有相册
          prev.forEach(album => {
            mergedMap.set(album.id, album);
          });
          
          // 合并新相册
          newAlbums.forEach(newAlbum => {
            if (mergedMap.has(newAlbum.id)) {
              // 合并照片
              const existing = mergedMap.get(newAlbum.id)!;
              const mergedPhotos = [...existing.photos, ...newAlbum.photos];
              const uniquePhotos = mergedPhotos.filter((photo, index, self) => 
                index === self.findIndex(p => p.src === photo.src)
              );
              
              mergedMap.set(newAlbum.id, {
                ...existing,
                photos: uniquePhotos,
                description: `${uniquePhotos.length} 张照片`,
                mainPhoto: uniquePhotos[0] || existing.mainPhoto,
              });
            } else {
              mergedMap.set(newAlbum.id, newAlbum);
            }
          });
          
          return Array.from(mergedMap.values()).sort((a, b) => b.photos.length - a.photos.length);
        });
      }

      setNextCursor(data.next_cursor || null);
      setHasMore(!!data.next_cursor);

    } catch (err) {
      console.error('加载更多数据失败:', err);
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setDebugLogs([]);

        addDebugLog('🚀 开始基于元数据的动态分类...');
        
        const data = await fetchCloudinaryData();
        
        if (data.resources && data.resources.length > 0) {
          const albums = organizeResourcesIntoAlbums(data.resources);
          setPortraitGroups(albums);
        } else {
          addDebugLog('⚠️ 没有找到照片资源');
        }

        setNextCursor(data.next_cursor || null);
        setHasMore(!!data.next_cursor);

      } catch (err) {
        console.error('加载数据失败:', err);
        setError(err instanceof Error ? err.message : '加载失败');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return {
    portraitGroups,
    isLoading,
    error,
    debugLogs,
    loadMore,
    hasMore,
  };
};
