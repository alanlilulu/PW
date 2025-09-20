import React from 'react';
import { useDynamicCloudinaryMetadata } from '../hooks/useDynamicCloudinaryMetadata';
import { Container } from '../components/ui/Container';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const MetadataAlbumPage: React.FC = () => {
  const { portraitGroups, isLoading, error, debugLogs, loadMore, hasMore } = useDynamicCloudinaryMetadata();

  return (
    <Container className="py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          基于元数据的动态相册分类
        </h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">📋 分类优先级</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li><strong>asset_folder</strong> - Cloudinary存储文件夹（最可靠）</li>
            <li><strong>tags</strong> - 照片标签</li>
            <li><strong>context.custom</strong> - 自定义元数据字段</li>
            <li><strong>public_id路径</strong> - 从文件路径推断</li>
            <li><strong>文件名关键词</strong> - 备用方案</li>
          </ol>
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-red-800 font-semibold">❌ 错误</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* 相册网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {portraitGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={group.mainPhoto.src}
                  alt={group.mainPhoto.alt}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{group.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>📍 {group.location}</span>
                  <span>📁 {group.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多按钮 */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? '加载中...' : '加载更多'}
            </button>
          </div>
        )}

        {/* 调试日志 */}
        {debugLogs.length > 0 && (
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">🔍 调试日志</h3>
            <div className="max-h-96 overflow-y-auto">
              {debugLogs.map((log, index) => (
                <div key={index} className="text-xs font-mono text-gray-700 mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">📖 如何使用元数据分类</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">1. 使用asset_folder（推荐）</h4>
              <p className="text-sm text-gray-600">
                在Cloudinary控制台上传时，设置文件夹路径：<br/>
                <code className="bg-gray-200 px-2 py-1 rounded">portfolio-images/相册名称/</code>
              </p>
            </div>

            <div>
              <h4 className="font-semibold">2. 使用tags</h4>
              <p className="text-sm text-gray-600">
                上传时添加标签：<br/>
                <code className="bg-gray-200 px-2 py-1 rounded">相册名称, portrait</code>
              </p>
            </div>

            <div>
              <h4 className="font-semibold">3. 使用context自定义字段</h4>
              <p className="text-sm text-gray-600">
                在Cloudinary控制台设置context：<br/>
                <code className="bg-gray-200 px-2 py-1 rounded">album: 相册名称</code><br/>
                <code className="bg-gray-200 px-2 py-1 rounded">title: 相册标题</code><br/>
                <code className="bg-gray-200 px-2 py-1 rounded">location: 拍摄地点</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MetadataAlbumPage;
