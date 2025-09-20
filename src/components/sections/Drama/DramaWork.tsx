import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DramaPlaceholder } from './DramaPlaceholder';
import { OptimizedImage } from '../../ui/OptimizedImage';

interface DramaWorkProps {
  title: string;
  role: string;
  year: string;
  description?: string;
  imageUrl?: string;
  emoji: string;
  isLarge?: boolean;
  onClick?: () => void;
}

export function DramaWork({ 
  title, 
  role, 
  year, 
  description, 
  imageUrl, 
  emoji, 
  isLarge = false,
  onClick
}: DramaWorkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // 添加一个短暂的延迟来展示loading效果
    setTimeout(() => {
      if (onClick) {
        onClick();
      }
      setIsLoading(false);
    }, 300);
  };

  return (
    <motion.div 
      className={`bg-transparent overflow-hidden cursor-pointer relative ${isLarge ? 'p-8' : 'p-6'}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}

      {/* Image Section */}
      <div 
        className="relative mb-6" 
        style={{ 
          boxShadow: 'none !important',
          WebkitBoxShadow: 'none',
          MozBoxShadow: 'none',
          filter: 'none'
        }}
      >
        {imageUrl ? (
          <div 
            className={`aspect-[4/3] overflow-hidden ${isLarge ? 'mb-6' : 'mb-4'}`}
            style={{ 
              clipPath: 'inset(0 round 8px)',
              WebkitClipPath: 'inset(0 round 8px)'
            }}
          >
            <OptimizedImage
              src={imageUrl}
              alt={title}
              className="w-full h-full"
              placeholder="🎭"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <DramaPlaceholder
            title={title}
            emoji={emoji}
            description={description}
            isLarge={isLarge}
          />
        )}
        
        {/* Overlay with play info */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-4"
          animate={{
            background: isHovered 
              ? "linear-gradient(to top, rgba(0,0,0,0.6), transparent)"
              : "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="text-white"
            animate={{
              y: isHovered ? -2 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`font-normal ${isLarge ? 'text-xl' : 'text-lg'} mb-1`}>
              {title}
            </h3>
            <p className={`${isLarge ? 'text-base' : 'text-sm'} opacity-70`}>
              {role}
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Content Section */}
      <motion.div 
        className="text-center mt-4"
        animate={{
          y: isHovered ? -2 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className={`font-light text-gray-800 mb-2 ${isLarge ? 'text-2xl' : 'text-xl'}`}
          animate={{
            color: isHovered ? "#1f2937" : "#374151"
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-600 mb-2 font-light"
          animate={{
            color: isHovered ? "#4b5563" : "#6b7280"
          }}
          transition={{ duration: 0.3 }}
        >
          {role}
        </motion.p>
        {description && (
          <motion.p 
            className="text-sm text-gray-500 mt-2 font-light"
            animate={{
              color: isHovered ? "#6b7280" : "#9ca3af"
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
