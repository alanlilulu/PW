import React, { useState, useEffect } from 'react';
import { useCloudinaryManager } from '../hooks/useCloudinaryManager';
import { Trash2, Search, List, Grid, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface ImageItem {
  id: string;
  url: string;
  name: string;
  size?: string;
  uploadedAt?: string;
}

export function CloudinaryManager() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    isLoading,
    error,
    deleteImage,
    deleteMultipleImages,
    getImageList,
    searchImages,
    clearError,
  } = useCloudinaryManager();

  // 加载照片列表
  useEffect(() => {
    loadImages();
  }, [currentFolder]);

  const loadImages = async () => {
    try {
      const imageIds = await getImageList(currentFolder);
      const imageItems: ImageItem[] = imageIds.map(id => ({
        id,
        url: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1/${id}`,
        name: id.split('/').pop() || id,
      }));
      setImages(imageItems);
    } catch (err) {
      console.error('加载照片失败:', err);
    }
  };

  // 搜索照片
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadImages();
      return;
    }

    try {
      const imageIds = await searchImages(searchQuery);
      const imageItems: ImageItem[] = imageIds.map(id => ({
        id,
        url: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1/${id}`,
        name: id.split('/').pop() || id,
      }));
      setImages(imageItems);
    } catch (err) {
      console.error('搜索失败:', err);
    }
  };

  // 选择/取消选择照片
  const toggleImageSelection = (imageId: string) => {
    const newSelection = new Set(selectedImages);
    if (newSelection.has(imageId)) {
      newSelection.delete(imageId);
    } else {
      newSelection.add(imageId);
    }
    setSelectedImages(newSelection);
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map(img => img.id)));
    }
  };

  // 删除单张照片
  const handleDeleteSingle = async (imageId: string) => {
    if (confirm(`确定要删除照片 "${imageId}" 吗？此操作不可撤销。`)) {
      const result = await deleteImage(imageId);
      if (result.success) {
        setImages(prev => prev.filter(img => img.id !== imageId));
        setSelectedImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(imageId);
          return newSet;
        });
      }
    }
  };

  // 批量删除照片
  const handleBatchDelete = async () => {
    if (selectedImages.size === 0) return;

    const imageNames = Array.from(selectedImages)
      .map(id => images.find(img => img.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    if (confirm(`确定要删除选中的 ${selectedImages.size} 张照片吗？\n${imageNames}\n\n此操作不可撤销。`)) {
      const result = await deleteMultipleImages(Array.from(selectedImages));
      if (result.success) {
        setImages(prev => prev.filter(img => !selectedImages.has(img.id)));
        setSelectedImages(new Set());
        setShowDeleteConfirm(false);
      }
    }
  };

  // 刷新照片列表
  const handleRefresh = () => {
    loadImages();
    setSelectedImages(new Set());
    setSearchQuery('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Cloudinary 照片管理</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : '刷新'}
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
          <button
            onClick={clearError}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        {/* 搜索 */}
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="搜索照片..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            搜索
          </button>
        </div>

        {/* 文件夹选择 */}
        <select
          value={currentFolder}
          onChange={(e) => setCurrentFolder(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">所有文件夹</option>
          <option value="portrait">portrait</option>
          <option value="drama">drama</option>
          <option value="career">career</option>
        </select>

        {/* 视图模式 */}
        <div className="flex items-center gap-1 border border-gray-300 rounded">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'} hover:bg-blue-50 transition-colors`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'} hover:bg-blue-50 transition-colors`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* 批量操作 */}
        {selectedImages.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              已选择 {selectedImages.size} 张照片
            </span>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              批量删除
            </button>
          </div>
        )}
      </div>

      {/* 照片列表 */}
      <div className="mb-4">
        {/* 全选 */}
        {images.length > 0 && (
          <div className="mb-3 p-2 bg-gray-50 rounded border">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedImages.size === images.length}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {selectedImages.size === images.length ? '取消全选' : '全选'}
              </span>
            </label>
          </div>
        )}

        {/* 照片网格 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedImages.has(image.id)
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleImageSelection(image.id)}
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
                <div className="p-2">
                  <p className="text-xs text-gray-600 truncate">{image.name}</p>
                  <p className="text-xs text-gray-500 truncate">{image.id}</p>
                </div>
                
                {/* 选择指示器 */}
                {selectedImages.has(image.id) && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* 删除按钮 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSingle(image.id);
                  }}
                  className="absolute top-2 left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="删除照片"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* 照片列表 */
          <div className="space-y-2">
            {images.map((image) => (
              <div
                key={image.id}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedImages.has(image.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleImageSelection(image.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.has(image.id)}
                  onChange={() => toggleImageSelection(image.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
                
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-16 h-16 object-cover rounded"
                  loading="lazy"
                />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
                  <p className="text-xs text-gray-500 truncate">{image.id}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSingle(image.id);
                  }}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  title="删除照片"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 空状态 */}
        {images.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            <p>没有找到照片</p>
            <p className="text-sm">尝试选择不同的文件夹或搜索条件</p>
          </div>
        )}
      </div>

      {/* 批量删除确认 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">确认删除</h3>
            <p className="text-gray-600 mb-6">
              确定要删除选中的 {selectedImages.size} 张照片吗？此操作不可撤销。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleBatchDelete}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {isLoading ? <Loader className="w-4 h-4 animate-spin mx-auto" /> : '确认删除'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

