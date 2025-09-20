import React from 'react';
import { useAssetFolderAlbums } from '../hooks/useAssetFolderAlbums';
import { useDebug } from '../contexts/DebugContext';

const AssetFolderAlbumsPage: React.FC = () => {
  const { albums, isLoading, error, loadMore, hasMore, debugLogs } = useAssetFolderAlbums();
  const { debugMode } = useDebug();

  if (isLoading && albums.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">正在加载相册...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-red-800">加载失败</h3>
              <p className="mt-2 text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                重新加载
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            基于文件夹的动态相册
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            相册完全基于Cloudinary的asset_folder自动创建，无需在代码中预定义。
            只需在Cloudinary中设置正确的文件夹路径，相册就会自动生成。
          </p>
        </div>

        {/* 调试信息 */}
        {debugMode && debugLogs.length > 0 && (
          <div className="mb-8 bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">调试日志</h3>
            <div className="max-h-60 overflow-y-auto">
              {debugLogs.map((log, index) => (
                <div key={index} className="text-sm text-gray-700 font-mono mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 相册统计 */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">相册统计</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{albums.length}</div>
              <div className="text-gray-600">相册总数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {albums.reduce((sum, album) => sum + album.images.length, 0)}
              </div>
              <div className="text-gray-600">照片总数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {albums.filter(album => album.folderPath.startsWith('portfolio-images/')).length}
              </div>
              <div className="text-gray-600">已分类相册</div>
            </div>
          </div>
        </div>

        {/* 相册网格 */}
        {albums.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              没有找到相册。请确保在Cloudinary中设置了正确的asset_folder。
            </div>
            <div className="mt-4 text-sm text-gray-400">
              文件夹路径应该以 "portfolio-images/" 开头
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div key={album.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* 封面图片 */}
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                {/* 相册信息 */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {album.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3">
                    {album.description}
                  </p>

                  {/* 相册元数据 */}
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="font-medium">文件夹:</span>
                      <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {album.folderPath}
                      </span>
                    </div>
                    
                    {album.location && (
                      <div className="flex items-center">
                        <span className="font-medium">位置:</span>
                        <span className="ml-2">{album.location}</span>
                      </div>
                    )}
                    
                    {album.photographer && (
                      <div className="flex items-center">
                        <span className="font-medium">摄影师:</span>
                        <span className="ml-2">{album.photographer}</span>
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                      查看相册
                    </button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 加载更多按钮 */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '加载中...' : '加载更多'}
            </button>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">如何使用</h3>
          <div className="text-blue-800 space-y-2">
            <p><strong>1. 在Cloudinary中设置文件夹:</strong></p>
            <ul className="ml-4 list-disc space-y-1">
              <li>上传照片时，在"Folder"字段输入: <code className="bg-blue-100 px-1 rounded">portfolio-images/相册名称</code></li>
              <li>例如: <code className="bg-blue-100 px-1 rounded">portfolio-images/新相册</code></li>
            </ul>
            
            <p className="mt-4"><strong>2. 相册会自动创建:</strong></p>
            <ul className="ml-4 list-disc space-y-1">
              <li>系统会自动检测文件夹并创建相册</li>
              <li>相册标题会根据文件夹名称自动生成</li>
              <li>无需在代码中预定义相册</li>
            </ul>

            <p className="mt-4"><strong>3. 支持的文件夹命名:</strong></p>
            <ul className="ml-4 list-disc space-y-1">
              <li><code className="bg-blue-100 px-1 rounded">portfolio-images/uw-graduation</code> → UW毕业照</li>
              <li><code className="bg-blue-100 px-1 rounded">portfolio-images/cherry-blossom</code> → 樱花系列</li>
              <li><code className="bg-blue-100 px-1 rounded">portfolio-images/california-ditto</code> → 加州Ditto</li>
              <li><code className="bg-blue-100 px-1 rounded">portfolio-images/新相册</code> → 新相册</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetFolderAlbumsPage;
