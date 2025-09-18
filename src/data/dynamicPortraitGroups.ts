import { useDynamicCloudinaryPhotos } from '../hooks/useDynamicCloudinaryPhotos';

export function useDynamicPortraitGroups() {
  const { photoGroups, isLoading, error, getOptimizedPhotoUrl } = useDynamicCloudinaryPhotos();

  // 转换为原有的PortraitGroup格式
  const portraitGroups = photoGroups.map(group => ({
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
  }));

  return {
    portraitGroups,
    isLoading,
    error
  };
}
