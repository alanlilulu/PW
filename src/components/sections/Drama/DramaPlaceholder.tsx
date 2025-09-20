import React from 'react';

interface DramaPlaceholderProps {
  title: string;
  emoji: string;
  description?: string;
  isLarge?: boolean;
}

export function DramaPlaceholder({ title, emoji, description, isLarge = false }: DramaPlaceholderProps) {
  return (
    <div 
      className={`aspect-[4/3] bg-gray-100 flex items-center justify-center ${isLarge ? 'mb-6' : 'mb-4'}`}
      style={{ 
        clipPath: 'inset(0 round 8px)',
        WebkitClipPath: 'inset(0 round 8px)'
      }}
    >
      <div className="text-center text-gray-500">
        <div className={`${isLarge ? 'text-8xl' : 'text-6xl'} mb-4`}>{emoji}</div>
        <p className={`${isLarge ? 'text-lg' : 'text-base'} opacity-80`}>
          {title}
        </p>
        <p className="text-sm opacity-60 mt-2">
          {description || '剧照即将上传'}
        </p>
      </div>
    </div>
  );
}
