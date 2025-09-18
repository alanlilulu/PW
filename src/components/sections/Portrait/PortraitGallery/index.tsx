import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../../../contexts/NavigationContext';
import { motion } from 'framer-motion';
import { HoverCard } from '../../../ui/HoverCard';

interface PortraitGroup {
  id: string;
  titleKey: string;
  mainPhoto: {
    src: string;
    alt: string;
  };
  photos: Array<{
    src: string;
    alt: string;
    description?: string;
  }>;
  category: string;
  location: string;
  date: string;
  folderPath: string;
}

interface PortraitGalleryProps {
  groups: PortraitGroup[];
}

export function PortraitGallery({ groups }: PortraitGalleryProps) {
  const [currentRow, setCurrentRow] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedAlbum, setClickedAlbum] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setNavigating } = useNavigation();
  
  // 将相册的封面照片分成每行3张的行
  const rows = [];
  if (groups.length > 0) {
    for (let i = 0; i < groups.length; i += 3) {
      rows.push(groups.slice(i, i + 3));
    }
  }

  const handleAlbumClick = (album: PortraitGroup) => {
    setClickedAlbum(album.id);
    setNavigating(true);
    
    // 延迟导航，让用户看到点击效果
    setTimeout(() => {
      navigate(`/portrait?album=${album.id}`);
    }, 300);
  };

  const handlePreviousRow = () => {
    if (currentRow > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentRow(currentRow - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleNextRow = () => {
    if (currentRow < rows.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentRow(currentRow + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  if (groups.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>暂无照片组</p>
        <p className="text-sm mt-2">请在Cloudinary控制台上传照片到对应文件夹</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 导航按钮 */}
      {rows.length > 1 && (
        <>
          <button
            onClick={handlePreviousRow}
            disabled={currentRow === 0 || isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={handleNextRow}
            disabled={currentRow === rows.length - 1 || isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}

      {/* 相册网格 */}
      <div className="overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentRow * 100}%)` }}
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {row.map((album) => (
                  <HoverCard
                    key={album.id}
                    scale={1.08}
                    shadow={true}
                    glow={true}
                    lift={true}
                    className="cursor-pointer"
                  >
                    <motion.div
                      onClick={() => handleAlbumClick(album)}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.1 }}
                      className="relative group"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg">
                        <img
                          src={album.mainPhoto.src}
                          alt={album.mainPhoto.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                          <h3 className="text-lg font-semibold mb-1">
                            {album.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                          <p className="text-sm">{album.photos.length} 张照片</p>
                        </div>
                      </div>
                    </motion.div>
                  </HoverCard>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 分页指示器 */}
      {rows.length > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {rows.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setCurrentRow(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentRow
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
