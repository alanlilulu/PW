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
    const loadPhotos = () => {
      setIsLoading(true);
      setError(null);

      console.log('正在加载照片组:', group.id);
      console.log('照片组数据:', group);

      // 检查是否有动态Cloudinary数据
      if (group.photos && group.photos.length > 0) {
        console.log('使用动态Cloudinary数据:', group.photos.length, '张照片');
        console.log('照片组ID:', group.id);
        console.log('照片URLs:', group.photos.map(p => p.src));
        
        // 使用动态Cloudinary数据
        const photoList: PortraitPhoto[] = group.photos.map((photo, index) => ({
          src: photo.src,
          alt: photo.alt || `${group.titleKey} - 照片 ${index + 1}`,
          description: `${group.titleKey} - 照片 ${index + 1}`,
          width: photo.width,
          height: photo.height,
        }));

        console.log('处理后的照片列表:', photoList.length, '张');
        setPhotos(photoList);
        
        // 设置封面照片
        if (photoList.length > 0) {
          setCoverPhoto(photoList[0]);
          console.log('设置封面照片:', photoList[0]);
        } else {
          setCoverPhoto(group.mainPhoto);
        }
        
        setIsLoading(false);
        return;
      }

      // 如果没有动态数据，尝试从GitHub获取
      const fetchFromGitHub = async () => {
        try {
          if (!group.folderPath) {
            throw new Error('没有文件夹路径');
          }

          // 构建 GitHub API 请求 URL
          const apiUrl = `https://api.github.com/repos/lalavl/portfolio-images/contents/${group.folderPath}`;
          console.log('正在从GitHub获取照片组:', group.id);
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
          console.log('GitHub API 失败，回退到静态数据');
          
          // 如果动态获取失败，立即回退到静态数据，不设置错误状态
          setError(null); // 不显示错误
          setPhotos([group.mainPhoto]);
          setCoverPhoto(group.mainPhoto);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFromGitHub();
    };

    loadPhotos();
  }, [group]);

  return { photos, coverPhoto, isLoading, error };
}
