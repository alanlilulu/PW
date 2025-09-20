import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortraitGroup } from '../data/portraitGroups';
import { useDynamicCloudinaryPortrait } from '../hooks/useDynamicCloudinaryPortrait';
import { Header } from '../components/layout/Header';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PortraitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<PortraitGroup | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { t } = useLanguage();
  
  // 使用动态Cloudinary照片组
  const { 
    portraitGroups, 
    loading: groupsLoading, 
    error: groupsError, 
    totalPhotos, 
    hasMore, 
    loadMore 
  } = useDynamicCloudinaryPortrait();

  const handleGroupClick = (group: PortraitGroup) => {
    setCurrentGroup(group);
    setCurrentPhotoIndex(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentGroup(null);
  };

  const handlePrevious = (totalPhotos: number) => {
    if (totalPhotos > 0) {
      setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1));
    }
  };

  const handleNext = (totalPhotos: number) => {
    if (totalPhotos > 0) {
      setCurrentPhotoIndex((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0));
    }
  };

  const handleThumbnailClick = (index: number, totalPhotos: number) => {
    if (index >= 0 && index < totalPhotos) {
      setCurrentPhotoIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32">
        {/* 页面标题 */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-bold text-gray-900">
              Portrait Photography
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              Through the lens, I capture authentic emotions and unique moments, each frame a profound observation and artistic expression of life.
            </p>
          </div>
        </section>

        {/* 照片组网格 */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          {/* 加载状态 */}
          {groupsLoading && (
            <div className="text-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600">正在从 Cloudinary 加载照片...</p>
              <p className="text-sm text-gray-400 mt-2">这可能需要几秒钟时间</p>
            </div>
          )}

          {/* 错误状态 */}
          {groupsError && !groupsLoading && (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 font-medium mb-2">Cloudinary照片加载失败</p>
                <p className="text-red-500 text-sm mb-4">{groupsError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  重试
                </button>
              </div>
            </div>
          )}

          {/* 相册网格 */}
          {!groupsLoading && !groupsError && portraitGroups.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portraitGroups.map((group, index) => (
                <PhotoGroupCard 
                  key={group.id} 
                  group={group} 
                  index={index}
                  onGroupClick={handleGroupClick}
                />
              ))}
            </div>
          )}

          {/* 空状态 */}
          {!groupsLoading && !groupsError && portraitGroups.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-600 font-medium mb-2">没有找到相册</p>
                <p className="text-gray-500 text-sm mb-4">Cloudinary 中没有找到照片</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  刷新
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2025 AL Photography. All rights reserved.</p>
        </div>
      </footer>

      {/* 照片组 Modal */}
      <AnimatePresence>
        {isModalOpen && currentGroup && (
          <PhotoGroupModal
            group={currentGroup}
            currentPhotoIndex={currentPhotoIndex}
            onClose={handleCloseModal}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onThumbnailClick={handleThumbnailClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// 照片组卡片组件
function PhotoGroupCard({ 
  group, 
  index, 
  onGroupClick
}: { 
  group: PortraitGroup; 
  index: number; 
  onGroupClick: (group: PortraitGroup) => void;
}) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => onGroupClick(group)}
    >
      {/* 图片容器 */}
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 mb-4">
        {group.mainPhoto ? (
          <img
            src={group.mainPhoto.src}
            alt={group.mainPhoto.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-gray-500 text-sm text-center">
              <p>无照片</p>
            </div>
          </div>
        )}
      </div>
      
      {/* 照片组标题 */}
      <h4 className="text-lg font-medium text-gray-900 text-center mb-2">
        {group.titleKey}
      </h4>
    </motion.div>
  );
}

// 照片组 Modal 组件
function PhotoGroupModal({
  group,
  currentPhotoIndex,
  onClose,
  onPrevious,
  onNext,
  onThumbnailClick
}: {
  group: PortraitGroup;
  currentPhotoIndex: number;
  onClose: () => void;
  onPrevious: (totalPhotos: number) => void;
  onNext: (totalPhotos: number) => void;
  onThumbnailClick: (index: number, totalPhotos: number) => void;
}) {
  const photos = group.photos;

  if (photos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <div className="text-center text-white">
          <p className="text-red-400 mb-2 text-lg">没有照片</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            关闭
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50"
      onClick={onClose}
    >
      {/* Modal 内容 */}
      <div
        className="relative w-full h-full bg-black/40 backdrop-blur-sm flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮和计数器 */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
          {/* 照片计数器 */}
          <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm font-medium">
            {currentPhotoIndex + 1} / {photos.length}
          </div>
          
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 主图片展示区 */}
        <div className="flex-1 relative overflow-hidden bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center pt-4 pb-2">
          {/* 主图片 */}
          {photos[currentPhotoIndex] && (
            <img
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].alt}
              className="max-w-[99%] max-h-[94%] object-contain rounded-2xl"
            />
          )}

          {/* 导航按钮 */}
          {photos.length > 1 && (
            <>
              <button
                onClick={() => onPrevious(photos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => onNext(photos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* 底部信息区域 */}
        <div className="bg-black/40 backdrop-blur-sm p-2 pb-6">
          {/* 照片组信息 */}
          <div className="text-center text-white mb-1">
            <p className="text-base text-gray-300">
              {group.location} • {group.date}
            </p>
          </div>

          {/* 底部缩略图导航 */}
          <div className="flex justify-center">
            <div className="flex gap-2 max-w-full overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => onThumbnailClick(index, photos.length)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-200 flex-shrink-0 ${
                    index === currentPhotoIndex
                      ? 'ring-2 ring-white scale-110'
                      : 'hover:scale-105'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-14 h-14 object-cover"
                  />
                  {index === currentPhotoIndex && (
                    <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}