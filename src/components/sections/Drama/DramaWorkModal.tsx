import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Award, Theater } from 'lucide-react';

interface DramaWorkData {
  title: string;
  role: string;
  year: string;
  description: string;
  emoji: string;
  imageUrl?: string;
  images?: string[];
  details?: {
    director?: string;
    playwright?: string;
    venue?: string;
    duration?: string;
    genre?: string;
    cast?: string[];
  };
  highlights?: string[];
  reviews?: string[];
}

interface DramaWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  work: DramaWorkData | null;
}

export function DramaWorkModal({ isOpen, onClose, work }: DramaWorkModalProps) {
  // 阻止背景页面滚动
  useEffect(() => {
    if (isOpen) {
      // 阻止背景滚动
      document.body.style.overflow = 'hidden';
      // 恢复背景滚动
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen || !work) return null;

  const images = work.images || [work.imageUrl].filter(Boolean);

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex flex-col"
          onClick={onClose}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
        {/* 主要内容区域 */}
        <motion.div 
          className="relative bg-gradient-to-br from-white/25 via-white/15 to-white/25 backdrop-blur-lg w-full h-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* 关闭按钮 */}
          <motion.div 
            className="absolute top-4 right-4 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 bg-black/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white drop-shadow-lg" />
            </motion.button>
          </motion.div>

          {/* 主要内容区域 */}
          <div className="flex-1 relative bg-gradient-to-br from-white/25 via-white/15 to-white/25 backdrop-blur-lg overflow-y-auto h-full">
            <div className="space-y-0">
              {/* 第一屏：介绍图 + 基本信息 */}
              <motion.div 
                className="min-h-screen flex flex-col lg:flex-row"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* 左侧：介绍图 */}
                <motion.div 
                  className="lg:w-1/2 bg-black flex items-center justify-center p-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {images.length > 0 ? (
                    <motion.img
                      src={images[0]}
                      alt={`${work.title} 介绍图`}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    />
                  ) : (
                    <motion.div 
                      className="text-center text-white"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <div className="text-8xl mb-4">{work.emoji}</div>
                      <p className="text-lg opacity-80">{work.title}</p>
                    </motion.div>
                  )}
                </motion.div>

                {/* 右侧：基本信息 */}
                <motion.div 
                  className="lg:w-1/2 bg-gradient-to-br from-white/20 via-white/15 to-white/20 backdrop-blur-md p-8 flex flex-col justify-center"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <motion.div 
                    className="space-y-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{work.emoji}</div>
                      <div>
                        <h1 className="text-3xl font-serif text-white drop-shadow-lg mb-2">{work.title}</h1>
                        <p className="text-white/80 drop-shadow-md text-lg">{work.role} • {work.year}</p>
                      </div>
                    </div>
                    
                    {/* 基本信息网格 */}
                    <div className="grid grid-cols-1 gap-4 text-white/90 drop-shadow-md">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-white/80" />
                        <span className="text-lg">饰演角色：{work.role}</span>
                      </div>
                      {work.details?.director && (
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-white/80" />
                          <span className="text-lg">导演：{work.details.director}</span>
                        </div>
                      )}
                      {work.details?.venue && (
                        <div className="flex items-center space-x-3">
                          <Theater className="w-5 h-5 text-white/80" />
                          <span className="text-lg">演出场地：{work.details.venue}</span>
                        </div>
                      )}
                      {work.details?.duration && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-white/80" />
                          <span className="text-lg">演出时长：{work.details.duration}</span>
                        </div>
                      )}
                      {work.details?.genre && (
                        <div className="flex items-center space-x-3">
                          <Theater className="w-5 h-5 text-white/80" />
                          <span className="text-lg">剧目类型：{work.details.genre}</span>
                        </div>
                      )}
                    </div>

                    {/* 作品简介 */}
                    <div className="pt-4">
                      <h3 className="text-xl font-medium text-white drop-shadow-lg mb-3">作品简介</h3>
                      <p className="text-white/90 drop-shadow-md leading-relaxed text-lg">{work.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* 后续内容：左右分栏布局 */}
              {images.length > 1 && images.slice(1).map((image, index) => (
                <motion.div 
                  key={index + 1} 
                  className="min-h-screen flex flex-col lg:flex-row"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  {/* 左侧：图片 */}
                  <motion.div 
                    className="lg:w-1/2 bg-black flex items-center justify-center p-4"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  >
                    <motion.img
                      src={image}
                      alt={`${work.title} 剧照 ${index + 2}`}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                    />
                  </motion.div>

                  {/* 右侧：对应信息 */}
                  <motion.div 
                    className="lg:w-1/2 bg-gradient-to-br from-white/20 via-white/15 to-white/20 backdrop-blur-md p-8 flex flex-col justify-center"
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                  >
                    <motion.div 
                      className="space-y-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    >
                      <div>
                        <h3 className="text-2xl font-medium text-white drop-shadow-lg mb-4">
                          {index === 0 && "精彩瞬间"}
                          {index === 1 && "角色特写"}
                          {index === 2 && "舞台全景"}
                          {index > 2 && `剧照 ${index + 2}`}
                        </h3>
                        
                        {/* 根据图片类型显示不同内容 */}
                        {index === 0 && (
                          <div className="space-y-4">
                            <p className="text-white/90 drop-shadow-md leading-relaxed text-lg">
                              这是我在剧中最重要的表演时刻之一。通过这个场景，我展现了角色的内心世界和情感变化。
                            </p>
                            {work.highlights && work.highlights.length > 0 && (
                              <div>
                                <h4 className="text-lg font-medium text-white drop-shadow-lg mb-2">演出亮点</h4>
                                <ul className="space-y-2 text-white/90 drop-shadow-md">
                                  {work.highlights.map((highlight, highlightIndex) => (
                                    <li key={highlightIndex} className="flex items-start">
                                      <span className="text-blue-300 mr-2 drop-shadow-md">•</span>
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {index === 1 && (
                          <div className="space-y-4">
                            <p className="text-white/90 drop-shadow-md leading-relaxed text-lg">
                              角色的深度刻画是我在表演中最注重的部分。每一个表情、每一个动作都经过精心设计。
                            </p>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                              <h4 className="text-lg font-medium text-white drop-shadow-lg mb-2">经典台词</h4>
                              <p className="text-white/90 drop-shadow-md text-lg">
                                "在这个舞台上，我不是在表演，而是在生活。"
                              </p>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="space-y-4">
                            <p className="text-white/90 drop-shadow-md leading-relaxed text-lg">
                              舞台的全景展现了整个演出的宏大场面。每一个细节都经过精心安排，营造出完美的戏剧氛围。
                            </p>
                            {work.details?.cast && work.details.cast.length > 0 && (
                              <div>
                                <h4 className="text-lg font-medium text-white drop-shadow-lg mb-2">演员阵容</h4>
                                <div className="space-y-1 text-white/90 drop-shadow-md">
                                  {work.details.cast.map((actor, actorIndex) => (
                                    <div key={actorIndex} className="flex items-center">
                                      <span className="text-white/60 mr-2">•</span>
                                      <span>{actor}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {index > 2 && (
                          <div className="space-y-4">
                            <p className="text-white/90 drop-shadow-md leading-relaxed text-lg">
                              每一张剧照都记录着演出的精彩瞬间，展现了戏剧艺术的魅力和演员的专业素养。
                            </p>
                            {work.reviews && work.reviews.length > 0 && (
                              <div>
                                <h4 className="text-lg font-medium text-white drop-shadow-lg mb-2">观众评价</h4>
                                <div className="space-y-3">
                                  {work.reviews.map((review, reviewIndex) => (
                                    <div key={reviewIndex} className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                                      <p className="text-white/90 italic drop-shadow-md">"{review}"</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
