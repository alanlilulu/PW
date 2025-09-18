import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader, Copy } from 'lucide-react';

interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export function CloudinaryUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('portfolio-images/seattle-tulips');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

  const folderOptions = [
    { value: 'portfolio-images/seattle-tulips', label: '西雅图郁金香' },
    { value: 'portfolio-images/california-ditto', label: '加州阳光' },
    { value: 'portfolio-images/uw-graduation', label: '毕业季' },
    { value: 'portfolio-images/cherry-blossom', label: '樱花季' },
    { value: 'portfolio-images/first-meeting', label: '初次见面' },
    { value: 'portfolio-images/seattle-couples', label: '情侣时光' }
  ];

  const handleUpload = async (files: FileList) => {
    if (!cloudName) {
      alert('请先配置 Cloudinary Cloud Name');
      return;
    }

    setIsUploading(true);
    setUploadResults([]);

    const results: UploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', selectedFolder);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const result = await response.json();

        if (result.secure_url) {
          results.push({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
          });
        } else {
          results.push({
            success: false,
            error: result.error?.message || '上传失败',
          });
        }
      } catch (error) {
        results.push({
          success: false,
          error: error instanceof Error ? error.message : '上传失败',
        });
      }
    }

    setUploadResults(results);
    setIsUploading(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  const clearResults = () => {
    setUploadResults([]);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Cloudinary 照片上传</h2>
        {uploadResults.length > 0 && (
          <button
            onClick={clearResults}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 文件夹选择 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          选择目标文件夹
        </label>
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {folderOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* 配置状态 */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          {cloudName ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-sm">
            {cloudName ? `Cloudinary已配置 (${cloudName})` : 'Cloudinary未配置'}
          </span>
        </div>
      </div>

      {/* 上传区域 */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          拖拽照片到这里，或点击选择文件
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={!cloudName}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          选择照片
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* 上传进度 */}
      {isUploading && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-center gap-2">
          <Loader className="w-5 h-5 text-blue-500 animate-spin" />
          <span className="text-blue-700">正在上传...</span>
        </div>
      )}

      {/* 上传结果 */}
      {uploadResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">上传结果</h3>
          <div className="space-y-2">
            {uploadResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg flex items-center gap-2 ${
                  result.success ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <div className="flex-1">
                  {result.success ? (
                    <div>
                      <p className="text-green-700 font-medium">上传成功</p>
                      <p className="text-sm text-gray-600 break-all">
                        {result.url}
                      </p>
                      {result.publicId && (
                        <p className="text-xs text-gray-500">
                          Public ID: {result.publicId}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-700">{result.error}</p>
                  )}
                </div>
                {result.success && result.url && (
                  <button
                    onClick={() => copyToClipboard(result.url!)}
                    className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    复制
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
