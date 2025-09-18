import { useState, useEffect } from 'react';
import { PortraitGroup, PortraitPhoto } from '../data/portraitGroups';

interface UsePhotoGroupReturn {
  photos: PortraitPhoto[];
  coverPhoto: PortraitPhoto | null;
  isLoading: boolean;
  error: string | null;
}

export function usePhotoGroup(group: PortraitGroup): UsePhotoGroupReturn {
  const [photos, setPhotos] = useState<PortraitPhoto[]>([]);
  const [coverPhoto, setCoverPhoto] = useState<PortraitPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 构建 GitHub API 请求 URL
        const apiUrl = `https://api.github.com/repos/lalavl/portfolio-images/contents/${group.folderPath}`;
        console.log('正在获取照片组:', group.id);
        console.log('GitHub API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('GitHub API 响应状态:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`GitHub API 请求失败: ${response.status} - ${response.statusText}`);
        }

        const contents = await response.json();
        console.log('GitHub API 返回内容:', contents);
        
        // 过滤出图片文件
        const imageFiles = contents.filter((item: any) => 
          item.type === 'file' && 
          /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)
        );
        console.log('过滤后的图片文件:', imageFiles);

        // 转换为 PortraitPhoto 格式
        const photoList: PortraitPhoto[] = imageFiles.map((file: any, index: number) => {
          const photoUrl = `https://raw.githubusercontent.com/lalavl/portfolio-images/main/${group.folderPath}/${file.name}`;
          console.log(`照片 ${index + 1}:`, photoUrl);
          return {
            src: photoUrl,
            alt: `${group.folderPath} - ${file.name}`,
            description: `${group.folderPath} - 照片 ${index + 1}`
          };
        });

        console.log('最终照片列表:', photoList);
        setPhotos(photoList);
        
        // 设置封面照片为第一张照片
        if (photoList.length > 0) {
          setCoverPhoto(photoList[0]);
          console.log('设置封面照片:', photoList[0]);
        } else {
          // 如果没有照片，使用 fallback 的 mainPhoto
          console.log('没有找到照片，使用 fallback 的 mainPhoto');
          setCoverPhoto(group.mainPhoto);
        }
      } catch (err) {
        console.error('获取照片失败:', err);
        const errorMessage = err instanceof Error ? err.message : '获取照片失败';
        console.log('GitHub API 失败，回退到静态数据');
        
        // 如果动态获取失败，立即回退到静态数据，不设置错误状态
        setError(null); // 不显示错误
        setPhotos([group.mainPhoto]);
        setCoverPhoto(group.mainPhoto);
      } finally {
        setIsLoading(false);
      }
    };

    if (group.folderPath) {
      console.log('开始获取照片组:', group.id, '路径:', group.folderPath);
      fetchPhotos();
    } else {
      // 如果没有 folderPath，使用静态数据
      console.log('没有 folderPath，使用静态数据:', group.id);
      setPhotos([group.mainPhoto]);
      setCoverPhoto(group.mainPhoto);
      setIsLoading(false);
    }
  }, [group]);

  return { photos, coverPhoto, isLoading, error };
}
