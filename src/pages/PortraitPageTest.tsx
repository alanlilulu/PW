import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { useHybridPortraitGroups } from '../hooks/useHybridPortraitGroups';

export function PortraitPageTest() {
  const { portraitGroups, isLoading, error, dataSource, loadHybridData } = useHybridPortraitGroups();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Portrait Page Test
          </h1>
          
          {isLoading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">加载照片中...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-20 text-red-600">
              <p>加载照片失败: {error}</p>
            </div>
          )}
          
          {!isLoading && !error && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  找到 {portraitGroups.length} 个照片组
                </p>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    dataSource === 'cloudinary' ? 'bg-green-100 text-green-800' :
                    dataSource === 'mixed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {dataSource === 'cloudinary' ? '☁️ Cloudinary数据' :
                     dataSource === 'mixed' ? '🔄 混合数据' :
                     '📁 静态数据'}
                  </span>
                  <button
                    onClick={loadHybridData}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    🔄 刷新数据
                  </button>
                </div>
              </div>
              
              {portraitGroups.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    📸 没有找到照片数据
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    请检查以下事项：
                  </p>
                  <ul className="text-yellow-700 text-sm space-y-2 ml-4">
                    <li>• 确保照片已上传到Cloudinary</li>
                    <li>• 检查文件夹路径是否正确</li>
                    <li>• 确认Cloudinary配置是否正确</li>
                    <li>• 可以访问 <a href="/photo-management" className="text-blue-600 underline">照片管理页面</a> 上传照片</li>
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portraitGroups.map((group) => (
                  <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={group.mainPhoto.src}
                      alt={group.mainPhoto.alt}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {group.titleKey}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {group.photos.length} 张照片
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        文件夹: {group.folderPath}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
