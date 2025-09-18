import React, { useState } from 'react';
import { useImageStorage } from '../hooks/useImageStorage';
import { Settings, RefreshCw, CheckCircle, AlertCircle, Cloud, Database } from 'lucide-react';

export function StorageManager() {
  const { currentStorage, getStorageStatus, switchStorage, isLoading } = useImageStorage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState<string>('');

  const storageStatus = getStorageStatus();

  const handleStorageSwitch = async () => {
    if (!selectedStorage) return;
    
    try {
      await switchStorage(selectedStorage);
      setSelectedStorage('');
    } catch (error) {
      console.error('切换存储源失败:', error);
      alert(`切换失败: ${error}`);
    }
  };

  const getStorageIcon = (type: string) => {
    switch (type) {
      case 'oss': return <Cloud className="w-4 h-4" />;
      case 'cloudinary': return <Database className="w-4 h-4" />;
      case 'github': return <Database className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getStorageName = (type: string) => {
    switch (type) {
      case 'oss': return '阿里云 OSS';
      case 'cos': return '腾讯云 COS';
      case 's3': return 'AWS S3';
      case 'cloudinary': return 'Cloudinary';
      case 'qiniu': return '七牛云';
      case 'github': return 'GitHub';
      default: return type;
    }
  };

  return (
    <div className="fixed top-24 right-6 z-20">
      {/* 主按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300"
        title="存储管理"
      >
        <Settings className="w-5 h-5 text-gray-700" />
      </button>

      {/* 展开面板 */}
      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">存储管理</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* 当前状态 */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-700">当前存储源:</span>
              {currentStorage ? (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  {getStorageName(currentStorage.type)}
                </span>
              ) : (
                <span className="text-sm text-red-600">未配置</span>
              )}
            </div>
            {currentStorage && (
              <p className="text-xs text-gray-500 break-all">
                {currentStorage.baseUrl}
              </p>
            )}
          </div>

          {/* 存储源列表 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">可用存储源:</h4>
            <div className="space-y-2">
              {storageStatus.available.map((storage) => (
                <div
                  key={storage.type}
                  className={`flex items-center justify-between p-2 rounded border ${
                    storage.type === currentStorage?.type
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getStorageIcon(storage.type)}
                    <span className="text-sm text-gray-700">
                      {getStorageName(storage.type)}
                    </span>
                    <span className="text-xs text-gray-500">
                      (优先级: {storage.priority})
                    </span>
                  </div>
                  {storage.type === currentStorage?.type && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 切换存储源 */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">切换存储源:</h4>
            <div className="flex gap-2">
              <select
                value={selectedStorage}
                onChange={(e) => setSelectedStorage(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">选择存储源</option>
                {storageStatus.available
                  .filter(storage => storage.type !== currentStorage?.type)
                  .map(storage => (
                    <option key={storage.type} value={storage.type}>
                      {getStorageName(storage.type)}
                    </option>
                  ))}
              </select>
              <button
                onClick={handleStorageSwitch}
                disabled={!selectedStorage || isLoading}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  '切换'
                )}
              </button>
            </div>
          </div>

          {/* 配置说明 */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>💡 建议配置多个存储源以提高可用性</p>
            <p>🔑 需要在环境变量中配置相应的 API 密钥</p>
            <p>📱 系统会自动选择可用的最佳存储源</p>
          </div>
        </div>
      )}
    </div>
  );
}

