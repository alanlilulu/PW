import { useState } from 'react';
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
    <div className="relative px-4 md:px-8 lg:px-16 xl:px-24">
      {/* 相册网格 */}
      <div className="overflow-hidden mt-8 relative">
        {/* 导航按钮 - 现在在相册网格内部 */}
        {rows.length > 1 && (
          <>
            <button
              onClick={handlePreviousRow}
              disabled={currentRow === 0 || isAnimating}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={handleNextRow}
              disabled={currentRow === rows.length - 1 || isAnimating}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentRow * 100}%)` }}
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto">
                {row.map((album) => (
                  <HoverCard
                    key={album.id}
                    scale={1.03}
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
                      <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={album.mainPhoto.src}
                          alt={album.mainPhoto.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center px-4">
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
        <div className="flex justify-center mt-16 space-x-4">
          {rows.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setCurrentRow(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentRow
                  ? 'bg-blue-500 scale-125 shadow-md'
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
