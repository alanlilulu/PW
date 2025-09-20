import React, { useState } from 'react';
import { Tag, Folder, Info, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { useDynamicCloudinaryPortrait } from '../hooks/useDynamicCloudinaryPortrait';
import { useAssetFolderAlbums } from '../hooks/useAssetFolderAlbums';

export const CloudinaryOptionsPage: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<'tag' | 'folder' | 'tagger'>('tag');
  
  const tagResults = useDynamicCloudinaryPortrait();
  const folderResults = useAssetFolderAlbums();

  const methods = [
    {
      id: 'tag' as const,
      title: 'Tag-based List API（推荐）',
      icon: Tag,
      description: '使用Cloudinary标签系统，前端安全，CDN缓存',
      pros: [
        '前端安全调用',
        'CDN缓存，速度快',
        '官方推荐方案',
        '支持复杂查询'
      ],
      cons: [
        '需要为照片添加标签',
        '需要启用Resource list设置'
      ],
      needsTags: true,
      results: tagResults
    },
    {
      id: 'folder' as const,
      title: 'Folder-based API',
      icon: Folder,
      description: '基于文件夹路径，无需标签',
      pros: [
        '无需添加标签',
        '基于现有文件夹结构',
        '直观的组织方式'
      ],
      cons: [
        '需要Admin API（后端调用）',
        '或需要已知文件名模式',
        '安全性考虑'
      ],
      needsTags: false,
      results: folderResults
    }
  ];

  const currentMethod = methods.find(m => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Cloudinary 照片获取方案选择
          </h1>
          
          {/* 方案选择 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {methods.map((method) => {
              const Icon = method.icon;
              const isActive = selectedMethod === method.id;
              
              return (
                <div
                  key={method.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    isActive 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-start mb-4">
                    <Icon className={`w-6 h-6 mr-3 mt-1 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                        {method.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* 优缺点 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">✅ 优点</h4>
                      <ul className="space-y-1">
                        {method.pros.map((pro, index) => (
                          <li key={index} className="text-green-700">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">❌ 缺点</h4>
                      <ul className="space-y-1">
                        {method.cons.map((con, index) => (
                          <li key={index} className="text-red-700">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 标签需求提示 */}
                  <div className={`mt-4 p-3 rounded-lg ${method.needsTags ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
                    <div className="flex items-center">
                      {method.needsTags ? (
                        <Tag className="w-4 h-4 text-yellow-600 mr-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      )}
                      <span className={`text-sm font-medium ${method.needsTags ? 'text-yellow-800' : 'text-green-800'}`}>
                        {method.needsTags ? '需要标签' : '无需标签'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 当前方案详情 */}
          {currentMethod && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                当前方案：{currentMethod.title}
              </h2>
              
              {/* 方案状态 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900">加载状态</h3>
                  <p className="text-gray-700">
                    {currentMethod.results.isLoading ? '加载中...' : '已完成'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900">数据源</h3>
                  <p className="text-gray-700">
                    {currentMethod.results.dataSource === 'dynamic-cloudinary' && '🟢 Cloudinary动态'}
                    {currentMethod.results.dataSource === 'static-fallback' && '🟡 静态数据'}
                    {currentMethod.results.dataSource === 'loading' && '⏳ 加载中'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900">照片组数量</h3>
                  <p className="text-gray-700">
                    {selectedMethod === 'folder' ? 
                      (currentMethod.results as any).albums?.length || 0 : 
                      currentMethod.results.portraitGroups?.length || 0
                    } 个组
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900">状态</h3>
                  <div className="flex items-center">
                    {currentMethod.results.error ? (
                      <XCircle className="w-4 h-4 text-red-500 mr-1" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    )}
                    <span className={currentMethod.results.error ? 'text-red-700' : 'text-green-700'}>
                      {currentMethod.results.error ? '有错误' : '正常'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 错误信息 */}
              {currentMethod.results.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-red-900 mb-2">错误信息</h3>
                  <p className="text-red-700">{currentMethod.results.error}</p>
                </div>
              )}

              {/* 调试日志 */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">调试日志</h3>
                <div className="max-h-32 overflow-y-auto">
                  {currentMethod.results.debugLogs.map((log, index) => (
                    <div key={index} className="text-sm text-gray-600 mb-1 font-mono">
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* 照片组预览 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  照片组预览 ({
                    selectedMethod === 'folder' ? 
                      (currentMethod.results as any).albums?.length || 0 : 
                      currentMethod.results.portraitGroups?.length || 0
                  })
                </h3>
                
                {(selectedMethod === 'folder' ? 
                  (currentMethod.results as any).albums?.length === 0 : 
                  currentMethod.results.portraitGroups?.length === 0) ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">没有找到照片组</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(selectedMethod === 'folder' ? 
                      (currentMethod.results as any).albums?.slice(0, 6) || [] : 
                      currentMethod.results.portraitGroups?.slice(0, 6) || []
                    ).map((group: any) => (
                      <div key={group.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={selectedMethod === 'folder' ? group.coverImage : group.mainPhoto?.src}
                          alt={group.title || group.titleKey}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {group.title || group.titleKey}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {group.description || `${selectedMethod === 'folder' ? group.images?.length || 0 : group.photos?.length || 0} 张照片`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 标签管理工具 */}
          {selectedMethod === 'tag' && (
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center mb-4">
                <Info className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  需要为照片添加标签？使用批量标签工具
                </h3>
              </div>
              <a
                href="/tag-manager"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                打开标签管理工具
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          )}
        </div>


        {/* 快速链接 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">相关测试页面</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/cloudinary-tag-test"
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50"
            >
              <h3 className="font-medium text-gray-900">Tag API 测试</h3>
              <p className="text-sm text-gray-600 mt-1">测试标签API功能</p>
            </a>
            <a
              href="/portrait-test"
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50"
            >
              <h3 className="font-medium text-gray-900">Portrait 测试</h3>
              <p className="text-sm text-gray-600 mt-1">测试人像页面</p>
            </a>
            <a
              href="/cloudinary-debug-detail"
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50"
            >
              <h3 className="font-medium text-gray-900">详细调试</h3>
              <p className="text-sm text-gray-600 mt-1">查看详细调试信息</p>
            </a>
            <a
              href="/photo-management"
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50"
            >
              <h3 className="font-medium text-gray-900">照片管理</h3>
              <p className="text-sm text-gray-600 mt-1">上传和管理照片</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
