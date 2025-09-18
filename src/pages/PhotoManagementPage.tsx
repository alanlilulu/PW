import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Container } from '../components/ui/Container';
import { CloudinaryPhotoManager } from '../components/CloudinaryPhotoManager';
import { CloudinaryUploader } from '../components/CloudinaryUploader';
import { useDebug } from '../contexts/DebugContext';
import { Bug } from 'lucide-react';
import { StorageManager } from '../components/StorageManager';

export function PhotoManagementPage() {
  const { debugMode, toggleDebugMode, showDebugUI } = useDebug();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {showDebugUI && (
        <div className="fixed top-24 right-6 z-20 flex flex-col gap-3">
          <button
            onClick={toggleDebugMode}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              debugMode
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={debugMode ? '关闭调试模式' : '开启调试模式'}
          >
            <Bug className="w-4 h-4" />
            <span className="text-sm font-medium">
              {debugMode ? '调试开启' : '调试关闭'}
            </span>
          </button>
        </div>
      )}

      <main className="pt-32">
        <Container>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">照片管理</h1>
            <p className="text-lg text-gray-600">
              管理您的Cloudinary照片，支持动态加载和批量操作
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 照片上传 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">上传照片</h2>
              <CloudinaryUploader />
            </div>

            {/* 照片管理 */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">照片管理</h2>
              <CloudinaryPhotoManager />
            </div>
          </div>

          {/* 使用说明 */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">使用说明</h2>
            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">1. 文件夹结构</h3>
                <p>在Cloudinary控制台中创建以下文件夹结构：</p>
                <pre className="bg-gray-100 p-3 rounded mt-2 text-sm">
{`portfolio-images/
├── seattle-tulips/
├── california-ditto/
├── uw-graduation/
├── cherry-blossom/
├── first-meeting/
└── seattle-couples/`}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">2. 上传照片</h3>
                <p>使用左侧的上传工具，选择目标文件夹并上传照片。</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">3. 动态加载</h3>
                <p>照片上传后会自动在网站上显示，无需手动更新代码。</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">4. 照片优化</h3>
                <p>Cloudinary会自动优化照片，包括压缩、格式转换和尺寸调整。</p>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
      <StorageManager />
    </div>
  );
}
