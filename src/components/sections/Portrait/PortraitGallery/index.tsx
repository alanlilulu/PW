import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDynamicAlbums } from '../../../../hooks/useDynamicAlbums';

export function PortraitGallery() {
  const [currentRow, setCurrentRow] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { albums, isLoading } = useDynamicAlbums();
  
  // 将相册的封面照片分成每行3张的行
  const rows = [];
  if (albums.length > 0) {
    for (let i = 0; i < albums.length; i += 3) {
      rows.push(albums.slice(i, i + 3));
    }
  }

  // 当相册数据加载完成后，重置当前行
  useEffect(() => {
    if (albums.length > 0 && currentRow >= rows.length) {
      setCurrentRow(0);
    }
  }, [albums, currentRow, rows.length]);

  const handlePrevious = () => {
    if (currentRow > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRow(currentRow - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentRow < rows.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRow(currentRow + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleDotClick = (index: number) => {
    if (index !== currentRow && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRow(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* 加载状态 */}
      {isLoading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">正在加载相册...</p>
        </div>
      )}

      {/* 相册 carousel */}
      {!isLoading && albums.length > 0 && (
        <div className="relative overflow-hidden" style={{ height: '600px' }}>
          {/* 当前行显示 */}
          <div 
            className={`grid grid-cols-3 gap-6 transition-all duration-300 ease-in-out ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {rows[currentRow]?.map((album, index) => (
              <div 
                key={`${currentRow}-${index}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <img
                  src={album.mainPhoto.src}
                  alt={album.mainPhoto.alt}
                  className="w-full h-[600px] object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{album.titleKey}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 导航按钮 */}
          {currentRow > 0 && (
            <button
              onClick={handlePrevious}
              disabled={isAnimating}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {currentRow < rows.length - 1 && (
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* 行指示器 */}
          {rows.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {rows.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentRow 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 空状态 */}
      {!isLoading && albums.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-gray-600">暂无相册</p>
          <p className="text-sm text-gray-400 mt-2">请检查 GitHub 仓库中的相册文件夹</p>
        </div>
      )}
    </div>
  );
}