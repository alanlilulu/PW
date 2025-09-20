import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortraitGroup } from '../data/portraitGroups';
import { useDynamicCloudinaryPortrait } from '../hooks/useDynamicCloudinaryPortrait';
import { Header } from '../components/layout/Header';
import { X, ChevronLeft, ChevronRight, Loader2, Bug, RefreshCw } from 'lucide-react';
import { usePhotoGroup } from '../hooks/usePhotoGroup';
import { useLanguage } from '../contexts/LanguageContext';
import { useDebug } from '../contexts/DebugContext';
import { useAssetFolderAlbums } from '../hooks/useAssetFolderAlbums';
import { useSearchParams } from 'react-router-dom';
import { SuccessIndicator } from '../components/ui/SuccessIndicator';
import { useNavigation } from '../contexts/NavigationContext';

export function PortraitPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<PortraitGroup | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { debugMode, toggleDebugMode, showPhotoCounts, showDebugUI } = useDebug();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const { setNavigating } = useNavigation();
  
  // 使用动态Cloudinary照片组
  const { 
    portraitGroups, 
    loading: groupsLoading, 
    error: groupsError, 
    totalPhotos, 
    hasMore, 
    loadMore 
  } = useDynamicCloudinaryPortrait();
  
  // 临时：强制使用静态数据来测试
  const staticGroups = [
    {
      id: 'seattle-tulips',
      titleKey: 'portrait.groups.seattleTulips',
      mainPhoto: {
        src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/tulip-portrait-1.jpg",
        alt: "西雅图郁金香人像摄影作品"
      },
      photos: [
        {
          src: "https://raw.githubusercontent.com/lalavl/portfolio-images/main/portrait/seattle-tulips/tulip-portrait-1.jpg",
          alt: "西雅图郁金香人像摄影作品"
        }
      ],
      category: "人像摄影",
      location: "西雅图",
      date: "2024",
      folderPath: "image-repo/portrait/seattle-tulips"
    }
  ];
  
  // 使用静态数据作为fallback
  const displayGroups = portraitGroups.length > 0 ? portraitGroups : staticGroups;
  
  // 使用动态相册发现（仅在Cloudinary失败时使用）
  const { albums, isLoading: albumsLoading, error: albumsError } = useAssetFolderAlbums();

  const handleGroupClick = (group: PortraitGroup) => {
    console.log('点击照片组:', t(group.titleKey));
    console.log('照片组路径:', group.folderPath);
    
    setCurrentGroup(group);
    setCurrentPhotoIndex(0);
    setIsModalOpen(true);
  };

  // 检测URL参数并自动打开对应相册
  useEffect(() => {
    const albumId = searchParams.get('album');
    if (albumId && albums.length > 0) {
      const targetAlbum = albums.find((album: any) => album.id === decodeURIComponent(albumId));
      if (targetAlbum) {
        // 将动态相册转换为PortraitGroup格式
        const portraitGroup: PortraitGroup = {
          id: targetAlbum.id,
          titleKey: targetAlbum.title, // 使用title作为titleKey
          mainPhoto: {
            src: targetAlbum.coverImage,
            alt: `${targetAlbum.title} - 封面照片`,
          },
          photos: targetAlbum.images.map(img => ({
            src: img.url,
            alt: img.alt,
            width: img.width,
            height: img.height,
          })),
          category: "人像摄影",
          location: targetAlbum.location || "未知地点",
          date: targetAlbum.uploadDate || new Date().toISOString().split('T')[0],
          folderPath: targetAlbum.folderPath,
        };
        
        setCurrentGroup(portraitGroup);
        setCurrentPhotoIndex(0);
        setIsModalOpen(true);
        
        // 显示成功指示器
        setSuccessMessage('');
        setShowSuccess(true);
        
        // 清除导航状态
        setNavigating(false);
        
        // 清除URL参数
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('album');
        window.history.replaceState({}, '', newUrl.toString());
      }
    }
  }, [albums, searchParams]);

  // 组件卸载时清除导航状态
  useEffect(() => {
    return () => {
      setNavigating(false);
    };
  }, [setNavigating]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentGroup(null);
    // 清除导航状态，确保加载遮罩消失
    setNavigating(false);
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
      {/* 使用统一的 Header 组件 */}
      <Header />

      {/* Debug Mode 开关和配置 - 仅在通过URL参数激活时显示 */}
      {showDebugUI && (
        <div className="fixed top-24 right-6 z-20 flex flex-col gap-3">
          {/* GitHub Token 配置 - 只在 debug mode 开启时显示 */}
          {debugMode && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                GitHub Token
              </label>
              <input
                type="password"
                placeholder="ghp_xxxxxxxxxxxxx"
                className="w-48 px-2 py-1 text-xs border border-gray-300 rounded"
                defaultValue={localStorage.getItem('githubToken') || ''}
                onChange={(e) => {
                  localStorage.setItem('githubToken', e.target.value);
                  console.log('🔑 GitHub Token 已保存');
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                用于访问私有仓库
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  重新获取相册
                </button>
                <button
                  onClick={async () => {
                    const token = localStorage.getItem('githubToken');
                    if (token) {
                      try {
                        const response = await fetch('https://api.github.com/user', {
                          headers: {
                            'Authorization': `token ${token}`,
                            'Accept': 'application/vnd.github.v3+json',
                            'User-Agent': 'Portrait-Website/1.0'
                          }
                        });
                        if (response.ok) {
                          alert('✅ GitHub Token 有效！');
                        } else {
                          alert('❌ GitHub Token 无效或权限不足');
                        }
                      } catch (error) {
                        alert('❌ Token 验证失败，请检查网络连接');
                      }
                    } else {
                      alert('⚠️ 请先输入 GitHub Token');
                    }
                  }}
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  title="验证 Token 是否有效"
                >
                  验证
                </button>
              </div>
            </div>
          )}
          
          {/* Debug Mode 开关 */}
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

      {/* 主要内容区域 */}
      <main className="pt-32">
        {/* 动态的页面标题 */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center justify-between">
            {/* 左侧主标题 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gray-900">
                {t('portrait.pageTitle')}
              </h1>
            </motion.div>
            
            {/* 右侧副标题和刷新按钮 */}
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-right max-w-md"
              >
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('portrait.pageDescription')}
                </p>
                {/* Debug模式下显示照片统计 */}
                {showDebugUI && (
                  <div className="mt-2 text-sm text-gray-500">
                    <p>动态加载: {totalPhotos} 张照片</p>
                    <p>照片组: {portraitGroups.length} 个</p>
                    {hasMore && <p className="text-green-600">还有更多照片可加载</p>}
                  </div>
                )}
              </motion.div>
              
              {/* 刷新按钮 - 仅在debug模式下显示 */}
              {showDebugUI && (
                <div className="flex gap-2">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onClick={() => window.location.reload()}
                    disabled={albumsLoading}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      albumsLoading 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                    }`}
                    title="刷新相册"
                  >
                    <RefreshCw className={`w-5 h-5 ${albumsLoading ? 'animate-spin' : ''}`} />
                  </motion.button>
                  
                  {/* 加载更多Cloudinary照片按钮 */}
                  {hasMore && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      onClick={loadMore}
                      disabled={groupsLoading}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        groupsLoading 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-green-500 text-white hover:bg-green-600 hover:scale-105'
                      }`}
                      title={`加载更多照片 (当前: ${totalPhotos}张)`}
                    >
                      <RefreshCw className={`w-5 h-5 ${groupsLoading ? 'animate-spin' : ''}`} />
                    </motion.button>
                  )}
                </div>
              )}
            </div>
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

          {/* 错误状态 - 只在Cloudinary失败且没有照片时显示 */}
          {groupsError && !groupsLoading && portraitGroups.length === 0 && (
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
          {!groupsLoading && !groupsError && displayGroups.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayGroups.map((group, index) => (
                <PhotoGroupCard 
                  key={group.id} 
                  group={group} 
                  index={index}
                  onGroupClick={handleGroupClick}
                  debugMode={debugMode}
                  showPhotoCounts={showPhotoCounts}
                />
              ))}
            </div>
          )}

          {/* GitHub相册网格（仅在Cloudinary失败时显示） */}
          {!groupsLoading && groupsError && !albumsLoading && !albumsError && albums.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((group: any, index: number) => (
                <PhotoGroupCard 
                  key={group.id} 
                  group={group} 
                  index={index}
                  onGroupClick={handleGroupClick}
                  debugMode={debugMode}
                  showPhotoCounts={showPhotoCounts}
                />
              ))}
            </div>
          )}

          {/* 空状态 */}
          {!groupsLoading && !albumsLoading && !groupsError && !albumsError && displayGroups.length === 0 && albums.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-600 font-medium mb-2">没有找到相册</p>
                <p className="text-gray-500 text-sm mb-4">Cloudinary 和 GitHub 都没有找到照片</p>
                {showDebugUI && (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      刷新Cloudinary
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      刷新GitHub
                    </button>
                  </div>
                )}
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

      {/* 成功跳转指示器 */}
      <SuccessIndicator 
        isVisible={showSuccess} 
        message={successMessage} 
        onComplete={() => setShowSuccess(false)} 
      />

      {/* 存储管理组件 */}
      {/* StorageManager 组件已删除 */}
    </div>
  );
}

// 照片组卡片组件
function PhotoGroupCard({ 
  group, 
  index, 
  onGroupClick,
  debugMode,
  showPhotoCounts
}: { 
  group: PortraitGroup; 
  index: number; 
  onGroupClick: (group: PortraitGroup) => void;
  debugMode: boolean;
  showPhotoCounts: boolean;
}) {
  const { photos, coverPhoto, isLoading, error } = usePhotoGroup(group);

  // 调试信息 - 只在 debugMode 开启时显示
  if (debugMode) {
    console.log(`PhotoGroupCard ${group.id}:`, {
      photos: photos.length,
      coverPhoto: coverPhoto?.src,
      isLoading,
      error,
      folderPath: group.folderPath,
      groupPhotos: group.photos?.length || 0,
      groupMainPhoto: group.mainPhoto?.src,
      hasDynamicData: !!(group.photos && group.photos.length > 0)
    });
  }

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
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : coverPhoto ? (
          <img
            src={coverPhoto.src}
            alt={coverPhoto.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onLoad={() => {
              if (debugMode) {
                console.log('封面照片加载成功:', coverPhoto.src);
              }
            }}
            onError={(e) => {
              console.error('封面照片加载失败:', coverPhoto.src);
              if (debugMode) {
                console.log('图片加载失败，隐藏图片元素');
              }
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-gray-500 text-sm text-center">
              <p>无照片</p>
            </div>
          </div>
        )}
        
        {/* 图片加载失败时的备用显示 */}
        {coverPhoto && (
          <div className="hidden w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-gray-500 text-sm text-center">
              <p>图片加载失败</p>
              <p className="text-xs mt-1">{coverPhoto.alt}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* 照片组标题 - 移到照片下方 */}
      <h4 className="text-lg font-medium text-gray-900 text-center mb-2">
        {group.titleKey}
      </h4>
      
      {/* 调试信息 - 只在 debugMode 开启时显示 */}
      {debugMode && showPhotoCounts && (
        <div className="text-xs text-gray-400 text-center mt-2">
          <p>照片数量: {photos.length}</p>
          <p>文件夹: {group.id}</p>
          <p>数据源: 动态Cloudinary</p>
        </div>
      )}
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
  const { photos, isLoading, error } = usePhotoGroup(group);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <div className="text-center text-white">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p>正在加载照片...</p>
        </div>
      </motion.div>
    );
  }

  if (error || photos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <div className="text-center text-white">
          <p className="text-red-400 mb-2 text-lg">加载照片失败</p>
          {error && (
            <p className="text-gray-300 mb-4 text-sm max-w-md">
              错误信息: {error}
            </p>
          )}
          <p className="text-gray-300 mb-6 text-sm">
            可能的原因：网络连接问题、GitHub API 限制或照片文件不存在
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              刷新页面重试
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              关闭
            </button>
          </div>
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
          {/* 主图片 - 最大化尺寸 */}
          {photos[currentPhotoIndex] && (
            <img
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].src}
              className="max-w-[99%] max-h-[94%] object-contain rounded-2xl"
              onError={(e) => {
                console.error('图片加载失败:', photos[currentPhotoIndex].src);
                e.currentTarget.style.display = 'none';
                // 可以在这里添加图片加载失败的UI
              }}
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

        {/* 底部信息区域 - 最小化与照片的间距 */}
        <div className="bg-black/40 backdrop-blur-sm p-2 pb-6">
          {/* 照片组信息 - 最小化与照片的间距 */}
          <div className="text-center text-white mb-1">
            <p className="text-base text-gray-300">
              {group.location} • {group.date}
            </p>
          </div>

          {/* 底部缩略图导航 - 最小化与时间地点的间距 */}
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

