import React from 'react';
import { useDynamicCloudinaryPhotos } from '../hooks/useDynamicCloudinaryPhotos';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface DynamicPhotoGalleryProps {
  groupId: string;
  className?: string;
}

export function DynamicPhotoGallery({ groupId, className = '' }: DynamicPhotoGalleryProps) {
  const { photoGroups, isLoading, error, getOptimizedPhotoUrl } = useDynamicCloudinaryPhotos();

  const currentGroup = photoGroups.find(group => group.id === groupId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner />
        <span className="ml-2 text-gray-600">加载照片中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>加载照片失败: {error}</p>
      </div>
    );
  }

  if (!currentGroup || currentGroup.photos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>该相册暂无照片</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {currentGroup.photos.map((photo, index) => (
        <div key={photo.public_id} className="relative group">
          <img
            src={getOptimizedPhotoUrl(photo.public_id, {
              width: 400,
              height: 300,
              quality: 'auto',
              format: 'auto'
            })}
            alt={`${currentGroup.title} - 照片 ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
              <p className="text-sm font-medium">{photo.format.toUpperCase()}</p>
              <p className="text-xs">{Math.round(photo.bytes / 1024)}KB</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
