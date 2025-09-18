import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useImageColor } from '../../../hooks/useImageColor';
import { useLikes } from '../../../hooks/useLikes';
import { CardFlip } from '../../ui/CardFlip';
import { LikeButton } from '../../ui/LikeButton';

interface PortraitCardProps {
  src: string;
  alt: string;
  description: string;
}

export function PortraitCard({ src, alt, description }: PortraitCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const dominantColor = useImageColor(src);
  const { count, isLiked, toggleLike } = useLikes(src);

  return (
    <div className="aspect-[3/4] relative w-full max-w-sm mx-auto">
      <CardFlip isFlipped={isFlipped} onFlip={() => setIsFlipped(!isFlipped)}>
        {/* Front side - Portrait */}
        <div className="w-full h-full relative group">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          
          {/* Like button */}
          <div className="absolute bottom-4 left-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            <LikeButton 
              count={count}
              isLiked={isLiked}
              onToggle={toggleLike}
            />
          </div>
        </div>

        {/* Back side - Description */}
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 backdrop-blur-xl"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.3) blur(8px)',
              transform: 'scale(1.1)',
            }}
          />
          <div className="relative z-10 h-full flex items-center justify-center p-8 text-center text-white">
            <div>
              <h3 className="font-serif text-xl mb-4">{alt}</h3>
              <p className="text-sm leading-relaxed opacity-90">{description}</p>
            </div>
          </div>
        </div>
      </CardFlip>
    </div>
  );
}