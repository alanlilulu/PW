import { useState } from 'react';
import { motion } from 'framer-motion';
import { portraitImages } from '../../../data/portraitImages';
import { X, ChevronLeft, ChevronRight, Heart, Share2, Download } from 'lucide-react';

interface PhotographyDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhotographyDetails({ isOpen, onClose }: PhotographyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : portraitImages.length - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev < portraitImages.length - 1 ? prev + 1 : 0));
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 主要内容区域 */}
      <div 
        className="relative bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部工具栏 */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">摄影作品集详情</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* 左侧图片展示区 */}
          <div className="flex-1 relative bg-black flex items-center justify-center">
            {/* 主图片 */}
            <img
              src={portraitImages[currentImageIndex].src}
              alt={portraitImages[currentImageIndex].alt}
              className="max-h-full max-w-full object-contain"
            />
            
            {/* 导航按钮 */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* 图片计数器 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {portraitImages.length}
            </div>
          </div>

          {/* 右侧信息面板 */}
          <div className="w-80 bg-gray-50 p-6 overflow-y-auto">
            {/* 当前图片信息 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {portraitImages[currentImageIndex].alt}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                这是一张精心拍摄的人像摄影作品，展现了独特的视角和精湛的摄影技巧。
                通过光影的巧妙运用，捕捉到了人物最真实自然的状态。
              </p>
            </div>

            {/* 技术参数 */}
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">技术参数</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>拍摄设备：</span>
                  <span>Canon EOS R5</span>
                </div>
                <div className="flex justify-between">
                  <span>镜头：</span>
                  <span>RF 85mm f/1.2L</span>
                </div>
                <div className="flex justify-between">
                  <span>光圈：</span>
                  <span>f/1.2</span>
                </div>
                <div className="flex justify-between">
                  <span>快门速度：</span>
                  <span>1/200s</span>
                </div>
                <div className="flex justify-between">
                  <span>ISO：</span>
                  <span>100</span>
                </div>
                <div className="flex justify-between">
                  <span>拍摄时间：</span>
                  <span>2024年春季</span>
                </div>
                <div className="flex justify-between">
                  <span>拍摄地点：</span>
                  <span>西雅图市中心</span>
                </div>
              </div>
            </div>

            {/* 创作理念 */}
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-800 mb-3">创作理念</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                这张作品旨在通过自然光线的运用，展现人物内心世界的真实情感。
                选择在黄昏时分拍摄，利用温暖的侧光营造出温馨而富有层次感的画面效果。
                构图上采用三分法则，让主体人物在画面中更加突出。
              </p>
            </div>

            {/* 缩略图网格 */}
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-3">所有作品</h4>
              <div className="grid grid-cols-3 gap-2">
                {portraitImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'ring-2 ring-blue-500 scale-105' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-20 object-cover"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
