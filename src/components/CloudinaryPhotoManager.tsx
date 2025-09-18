import React, { useState } from 'react';
import { useDynamicCloudinaryPhotos } from '../hooks/useDynamicCloudinaryPhotos';
import { RefreshCw, Folder, Image, Upload } from 'lucide-react';

export function CloudinaryPhotoManager() {
  const { photoGroups, isLoading, error, loadPhotoGroups } = useDynamicCloudinaryPhotos();
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">动态照片管理</h2>
        <button
          onClick={loadPhotoGroups}
          disabled={isLoading}
          className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          刷新
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photoGroups.map(group => (
          <div
            key={group.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedGroup === group.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedGroup(group.id)}
          >
            <div className="flex items-center gap-2 mb-2">
              <Folder className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-800">{group.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image className="w-4 h-4" />
              <span>{group.photos.length} 张照片</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              文件夹: {group.folder}
            </div>
          </div>
        ))}
      </div>

      {selectedGroup && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">选中的相册</h4>
          <p className="text-sm text-gray-600">
            {photoGroups.find(g => g.id === selectedGroup)?.title}
          </p>
        </div>
      )}

      {photoGroups.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>暂无照片组</p>
          <p className="text-sm">请在Cloudinary控制台上传照片到对应文件夹</p>
        </div>
      )}
    </div>
  );
}
