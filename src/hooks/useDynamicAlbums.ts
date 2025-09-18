import { useState, useEffect } from 'react';
import { PortraitGroup, PortraitPhoto } from '../data/portraitGroups';

interface UseDynamicAlbumsReturn {
  albums: PortraitGroup[];
  isLoading: boolean;
  error: string | null;
  refreshAlbums: () => void;
}

export function useDynamicAlbums(): UseDynamicAlbumsReturn {
  const [albums, setAlbums] = useState<PortraitGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 检查 debug mode 状态
  const isDebugMode = localStorage.getItem('debugMode') === 'true';

  // 调试日志函数 - 只在 debug mode 开启时输出
  const debugLog = (...args: any[]) => {
    if (isDebugMode) {
      console.log(...args);
    }
  };

  // 美化文件夹名称显示
  const formatFolderName = (folderName: string): string => {
    // 将连字符转换为空格，并首字母大写
    return folderName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // 验证 GitHub Token 是否有效
  const validateGitHubToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portrait-Website/1.0'
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  // 从 GitHub 仓库发现相册
  const discoverAlbums = async () => {
    try {
      setIsLoading(true);
      setError(null);

      debugLog('🔍 开始发现 GitHub 仓库中的相册...');
      debugLog('📁 目标仓库: lalavl/portfolio-images');
      debugLog('📂 目标路径: portrait/');

      // 检查是否有 GitHub Token
      const githubToken = localStorage.getItem('githubToken');
      if (!githubToken) {
        console.warn('⚠️ 没有找到 GitHub Token，尝试公开访问...');
        console.warn('💡 建议配置 GitHub Token 以避免 API 限制');
      }

      // 1. 获取 portrait 目录下的所有子目录（相册文件夹）
      const portraitContentsUrl = 'https://api.github.com/repos/lalavl/portfolio-images/contents/portrait';
      debugLog('🌐 请求 URL:', portraitContentsUrl);
      
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portrait-Website/1.0' // 添加 User-Agent 避免被拒绝
      };
      
      // 如果有 Token，添加到请求头
      if (githubToken) {
        headers['Authorization'] = `token ${githubToken}`;
        debugLog('🔑 使用 GitHub Token 进行认证');
      } else {
        debugLog('⚠️ 未使用 Token，可能遇到 API 限制');
      }
      
      const portraitResponse = await fetch(portraitContentsUrl, { headers });
      debugLog('📡 API 响应状态:', portraitResponse.status, portraitResponse.statusText);
      
      if (!portraitResponse.ok) {
        const errorText = await portraitResponse.text();
        console.error('❌ API 响应错误:', errorText);
        
        if (portraitResponse.status === 403) {
          const errorMessage = githubToken 
            ? 'GitHub API 访问被拒绝 (403)。Token 可能无效或权限不足。请检查 Token 是否正确。'
            : 'GitHub API 访问被拒绝 (403)。请配置 GitHub Personal Access Token 来解决此问题。';
          throw new Error(errorMessage);
        }
        
        throw new Error(`无法访问 portrait 目录: ${portraitResponse.status} - ${portraitResponse.statusText}`);
      }

      const portraitContents = await portraitResponse.json();
      debugLog('📋 API 返回内容:', portraitContents);
      
      // 过滤出目录（相册文件夹）
      const albumFolders = portraitContents.filter((item: any) => 
        item.type === 'dir' && 
        !item.name.startsWith('.') // 排除隐藏文件夹
      );

      debugLog('📁 发现的相册文件夹:', albumFolders.map((f: any) => f.name));
      debugLog('📊 文件夹总数:', albumFolders.length);

      if (albumFolders.length === 0) {
        console.warn('⚠️ 没有找到任何相册文件夹');
        debugLog('🔍 所有项目:', portraitContents.map((item: any) => ({ name: item.name, type: item.type })));
      }

      // 2. 为每个相册文件夹创建相册数据
      const discoveredAlbums: PortraitGroup[] = [];

      for (const folder of albumFolders) {
        try {
          debugLog(`📸 处理相册: ${folder.name}`);
          
          // 获取相册文件夹中的内容
          const albumContentsUrl = `https://api.github.com/repos/lalavl/portfolio-images/contents/portrait/${folder.name}`;
          const albumResponse = await fetch(albumContentsUrl);
          
          if (!albumResponse.ok) {
            console.warn(`⚠️ 无法访问相册 ${folder.name}: ${albumResponse.status}`);
            continue;
          }

          const albumContents = await albumResponse.json();
          
          // 过滤出图片文件
          const imageFiles = albumContents.filter((item: any) => 
            item.type === 'file' && 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)
          );

          if (imageFiles.length === 0) {
            console.warn(`⚠️ 相册 ${folder.name} 中没有找到图片文件`);
            continue;
          }

          debugLog(`🖼️ 相册 ${folder.name} 包含 ${imageFiles.length} 张图片`);

          // 创建相册数据
          const album: PortraitGroup = {
            id: folder.name,
            titleKey: formatFolderName(folder.name), // 使用美化后的文件夹名称
            mainPhoto: {
              src: `https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/${folder.name}/${imageFiles[0].name}`,
              alt: `${formatFolderName(folder.name)} 相册封面`
            },
            photos: imageFiles.map((file: any, index: number) => ({
              src: `https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/${folder.name}/${file.name}`,
              alt: `${formatFolderName(folder.name)} - ${file.name}`,
              description: `${formatFolderName(folder.name)} - 照片 ${index + 1}`
            })),
            category: "人像摄影",
            location: getLocationFromFolderName(folder.name),
            date: getDateFromFolderName(folder.name),
            folderPath: `portrait/${folder.name}`
          };

          discoveredAlbums.push(album);
          debugLog(`✅ 相册 ${folder.name} 创建成功`);

        } catch (albumError) {
          console.error(`❌ 处理相册 ${folder.name} 时出错:`, albumError);
          // 继续处理其他相册，不中断整个过程
        }
      }

      debugLog(`🎉 相册发现完成，共发现 ${discoveredAlbums.length} 个相册`);
      setAlbums(discoveredAlbums);

    } catch (err) {
      console.error('❌ 发现相册失败:', err);
      const errorMessage = err instanceof Error ? err.message : '发现相册失败';
      setError(errorMessage);
      
      // 如果动态发现失败，回退到静态数据
      debugLog('🔄 回退到静态相册数据');
      setAlbums(getFallbackAlbums());
    } finally {
      setIsLoading(false);
    }
  };

  // 从文件夹名称推断位置信息
  const getLocationFromFolderName = (folderName: string): string => {
    const locationMap: { [key: string]: string } = {
      'seattle-tulips': '西雅图',
      'california-ditto': '加州',
      'uw-graduation': '华盛顿大学',
      'cherry-blossom': '西雅图',
      'first-meeting': '西雅图',
      'seattle-couples': '西雅图'
    };
    
    return locationMap[folderName] || '未知地点';
  };

  // 从文件夹名称推断日期信息
  const getDateFromFolderName = (folderName: string): string => {
    const dateMap: { [key: string]: string } = {
      'seattle-tulips': '2024年春季',
      'california-ditto': '2024年夏季',
      'uw-graduation': '2024年春季',
      'cherry-blossom': '2025年春季',
      'first-meeting': '2024年秋季',
      'seattle-couples': '2024年冬季'
    };
    
    return dateMap[folderName] || '未知日期';
  };

  // 获取回退的静态相册数据
  const getFallbackAlbums = (): PortraitGroup[] => {
    debugLog('🔄 使用回退的静态相册数据');
    return [
      {
        id: 'fallback-album-1',
        titleKey: '示例相册 1',
        mainPhoto: {
          src: "https://via.placeholder.com/400x600/cccccc/666666?text=示例照片1",
          alt: "示例相册 1 封面"
        },
        photos: [
          {
            src: "https://via.placeholder.com/400x600/cccccc/666666?text=示例照片1",
            alt: "示例相册 1 - 照片 1",
            description: "示例相册 1 - 照片 1"
          }
        ],
        category: "示例摄影",
        location: "示例地点",
        date: "示例日期",
        folderPath: "portrait/fallback-album-1"
      },
      {
        id: 'fallback-album-2',
        titleKey: '示例相册 2',
        mainPhoto: {
          src: "https://via.placeholder.com/400x600/cccccc/666666?text=示例照片2",
          alt: "示例相册 2 封面"
        },
        photos: [
          {
            src: "https://via.placeholder.com/400x600/cccccc/666666?text=示例照片2",
            alt: "示例相册 2 - 照片 1",
            description: "示例相册 2 - 照片 1"
          }
        ],
        category: "示例摄影",
        location: "示例地点",
        date: "示例日期",
        folderPath: "portrait/fallback-album-2"
      }
    ];
  };

  // 刷新相册
  const refreshAlbums = () => {
    discoverAlbums();
  };

  // 初始加载
  useEffect(() => {
    discoverAlbums();
  }, []);

  return { albums, isLoading, error, refreshAlbums };
}
