import { useState, useEffect } from 'react';
import { PortraitGroup } from '../types';
import { portraitGroups as staticPortraitGroups } from '../data/portraitGroups';

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  tags: string[];
  asset_folder?: string;
  created_at: string;
}

interface CloudinaryResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

interface UseDynamicCloudinaryPortraitReturn {
  portraitGroups: PortraitGroup[];
  loading: boolean;
  error: string | null;
  debugLogs: string[];
  dataSource: 'dynamic-cloudinary' | 'static-fallback' | 'loading';
  totalPhotos: number;
  hasMore: boolean;
  loadMore: () => Promise<void>;
}

export const useDynamicCloudinaryPortrait = (): UseDynamicCloudinaryPortraitReturn => {
  const [portraitGroups, setPortraitGroups] = useState<PortraitGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<'dynamic-cloudinary' | 'static-fallback' | 'loading'>('loading');
  const [allResources, setAllResources] = useState<CloudinaryResource[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  // 通过代理获取Cloudinary数据
  const fetchCloudinaryData = async (nextCursor?: string): Promise<CloudinaryResponse> => {
    const proxyUrl = `/api/cloudinary-proxy?max_results=100${nextCursor ? `&next_cursor=${nextCursor}` : ''}`;
    
    addDebugLog(`通过代理获取数据: ${proxyUrl}`);
    
    try {
      // 添加超时处理
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
      
      const response = await fetch(proxyUrl, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        addDebugLog('请求超时，10秒后自动取消');
        throw new Error('请求超时，请检查网络连接');
      }
      addDebugLog(`代理请求失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  };

  // 将Cloudinary资源组织成PortraitGroup格式
  const organizeResourcesIntoGroups = (resources: CloudinaryResource[]): PortraitGroup[] => {
    addDebugLog(`开始组织照片组，输入资源数量: ${resources.length}`);
    
    const groupMap = new Map<string, CloudinaryResource[]>();
    
    // 去重处理 - 基于照片内容（去掉Cloudinary生成的后缀）
    // 同时过滤掉占位符图片（bytes: 0）
    const uniqueResources = resources.filter((photo, index, self) => {
      // 过滤掉占位符图片
      if (photo.bytes === 0) {
        addDebugLog(`过滤占位符图片: ${photo.public_id} (bytes: ${photo.bytes})`);
        return false;
      }
      
      // 提取照片的基础名称（去掉Cloudinary生成的后缀）
      const baseName = photo.public_id.replace(/_[a-zA-Z0-9]+$/, '');
      return index === self.findIndex(p => {
        const otherBaseName = p.public_id.replace(/_[a-zA-Z0-9]+$/, '');
        return baseName === otherBaseName;
      });
    });
    
    addDebugLog(`去重前: ${resources.length} 张照片，去重后: ${uniqueResources.length} 张照片`);
    
    // 定义分组常量
    const GROUPS = {
      UW_GRADUATION: { id: 'uw-graduation', name: 'UW毕业照' },
      CHERRY_BLOSSOM: { id: 'cherry-blossom', name: '樱花系列' },
      TULIPS: { id: 'seattle-tulips', name: '西雅图郁金香' },
      CALIFORNIA: { id: 'california-ditto', name: '加州Ditto' },
      COUPLES: { id: 'seattle-couples', name: '西雅图情侣' },
      FIRST_MEETING: { id: 'first-meeting', name: '初次见面' },
      OTHERS: { id: 'other', name: '其他照片' },
    } as const;

    // 需要排除（黑名单）的照片模式
    const EXCLUDE_PATTERNS: RegExp[] = [
      /没看过西雅图的郁金香/,      // 中文标题关键字
      /\btulips?-series\b/i,        // 英文/拼写变体
    ];

    // 允许（白名单）的精确匹配模式
    const ALLOW_TULIP_EXACT = /(^|\/)tulip-portrait(\b|$)/i;

    // 照片分类函数
    const classifyPhoto = (photo: CloudinaryResource): typeof GROUPS[keyof typeof GROUPS] => {
      const id = photo.public_id ?? '';
      
      // 1) 黑名单优先：命中则送"其他照片"
      if (EXCLUDE_PATTERNS.some((re) => re.test(id))) {
        addDebugLog(`照片 ${photo.public_id} 被排除，归类到其他照片`);
        return GROUPS.OTHERS;
      }
      
      // 2) 精确白名单：只有真正的 tulip-portrait 才进相册
      if (ALLOW_TULIP_EXACT.test(id)) {
        addDebugLog(`照片 ${photo.public_id} 被归类到 seattle-tulips`);
        return GROUPS.TULIPS;
      }
      
      // 3) 其他分组逻辑
      if (photo.public_id.includes('UW毕业') || photo.public_id.includes('毕业')) {
        return GROUPS.UW_GRADUATION;
      } else if (photo.public_id.includes('樱花') || photo.public_id.includes('cherry')) {
        return GROUPS.CHERRY_BLOSSOM;
      } else if (photo.public_id.includes('加州') || photo.public_id.includes('california')) {
        return GROUPS.CALIFORNIA;
      } else if (photo.public_id.includes('情侣') || photo.public_id.includes('couple')) {
        return GROUPS.COUPLES;
      } else if (photo.public_id.includes('第一次') || photo.public_id.includes('first')) {
        return GROUPS.FIRST_MEETING;
      }
      
      // 4) 兜底
      return GROUPS.OTHERS;
    };

    // 对每张照片进行分类
    uniqueResources.forEach(photo => {
      const group = classifyPhoto(photo);
      
      if (!groupMap.has(group.id)) {
        groupMap.set(group.id, []);
      }
      groupMap.get(group.id)!.push(photo);
    });
    
    // 调试信息：显示每个组的照片数量
    groupMap.forEach((photos, groupId) => {
      addDebugLog(`组 ${groupId}: ${photos.length} 张照片`);
      // 检查是否有重复的照片
      const uniquePhotos = photos.filter((photo, index, self) => 
        index === self.findIndex(p => p.public_id === photo.public_id)
      );
      if (uniquePhotos.length !== photos.length) {
        addDebugLog(`警告: 组 ${groupId} 有重复照片! 原始: ${photos.length}, 去重后: ${uniquePhotos.length}`);
      }
    });

    // 转换为PortraitGroup格式
    const groups: PortraitGroup[] = Array.from(groupMap.entries()).map(([groupId, photos]) => ({
      id: groupId,
      title: groupMap.get(groupId)![0] ? 
        (groupId === 'uw-graduation' ? 'UW毕业照' :
         groupId === 'cherry-blossom' ? '樱花系列' :
         groupId === 'seattle-tulips' ? '西雅图郁金香' :
         groupId === 'california-ditto' ? '加州Ditto' :
         groupId === 'seattle-couples' ? '西雅图情侣' :
         groupId === 'first-meeting' ? '初次见面' : '其他照片') : '其他照片',
      description: `${photos.length} 张照片`,
      coverImage: photos[0]?.secure_url || '',
      images: photos.map(photo => ({
        id: photo.public_id,
        url: photo.secure_url,
        alt: `${groupId} 照片`,
        width: photo.width,
        height: photo.height,
      })),
      tags: ['portrait', groupId],
      // 添加PortraitGroup需要的其他字段
      titleKey: groupId,
      mainPhoto: photos[0] ? {
        src: photos[0].secure_url,
        alt: `${groupId} 照片`,
        width: photos[0].width,
        height: photos[0].height,
      } : {
        src: '',
        alt: '无照片',
      },
      photos: photos.map(photo => ({
        src: photo.secure_url,
        alt: `${groupId} 照片`,
        width: photo.width,
        height: photo.height,
      })),
      category: '人像摄影',
      location: groupId === 'uw-graduation' ? '华盛顿大学' :
                groupId === 'cherry-blossom' ? '樱花公园' :
                groupId === 'seattle-tulips' ? '西雅图' :
                groupId === 'california-ditto' ? '加州' :
                groupId === 'seattle-couples' ? '西雅图' :
                groupId === 'first-meeting' ? '未知地点' : '未知地点',
      date: '2024-2025',
      folderPath: `image-repo/portrait/${groupId}`,
    }));

    const sortedGroups = groups.sort((a, b) => b.photos.length - a.photos.length); // 按照片数量排序
    
    addDebugLog(`最终照片组数量: ${sortedGroups.length}`);
    sortedGroups.forEach(group => {
      addDebugLog(`最终组 ${group.id}: ${group.photos.length} 张照片`);
    });
    
    return sortedGroups;
  };

  // 加载更多照片
  const loadMore = async () => {
    if (!hasMore || loading) return;
    
    try {
      addDebugLog('加载更多照片...');
      const data = await fetchCloudinaryData(nextCursor);
      
      if (data.resources.length > 0) {
        // 使用函数式更新来确保获取最新状态
        setAllResources(prev => {
          const newAllResources = [...prev, ...data.resources];
          
          // 重新组织所有照片
          const groups = organizeResourcesIntoGroups(newAllResources);
          setPortraitGroups(groups);
          
          addDebugLog(`加载了 ${data.resources.length} 张新照片，总计 ${newAllResources.length} 张`);
          
          return newAllResources;
        });
        
        setNextCursor(data.next_cursor);
        setHasMore(!!data.next_cursor);
      } else {
        setHasMore(false);
        addDebugLog('没有更多照片可加载');
      }
    } catch (error) {
      addDebugLog(`加载更多照片失败: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // 初始加载
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        addDebugLog('开始加载动态Cloudinary照片...');
        addDebugLog(`代理URL: /api/cloudinary-proxy?max_results=100`);

        const data = await fetchCloudinaryData();
        addDebugLog(`API返回数据: ${JSON.stringify(data).substring(0, 200)}...`);
        
        if (data.resources && data.resources.length > 0) {
          setAllResources(data.resources);
          setNextCursor(data.next_cursor);
          setHasMore(!!data.next_cursor);
          
          const groups = organizeResourcesIntoGroups(data.resources);
          setPortraitGroups(groups);
          setDataSource('dynamic-cloudinary');
          
          addDebugLog(`成功加载 ${data.resources.length} 张照片，组织成 ${groups.length} 个照片组`);
          addDebugLog(`照片组详情: ${groups.map(g => `${g.title}(${g.photos.length}张)`).join(', ')}`);
        } else {
          addDebugLog('未获取到Cloudinary照片，使用静态数据作为后备');
          setPortraitGroups(staticPortraitGroups);
          setDataSource('static-fallback');
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        addDebugLog(`加载失败: ${errorMessage}`);
        addDebugLog(`错误详情: ${err}`);
        setError(errorMessage);
        
        // 出错时使用静态数据作为后备
        addDebugLog('使用静态数据作为后备');
        setPortraitGroups(staticPortraitGroups);
        setDataSource('static-fallback');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return {
    portraitGroups,
    loading,
    error,
    debugLogs,
    dataSource,
    totalPhotos: allResources.length,
    hasMore,
    loadMore,
  };
};
