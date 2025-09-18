import { useState, useEffect } from 'react';

interface LikeState {
  count: number;
  isLiked: boolean;
}

const STORAGE_PREFIX = 'portrait_likes_';

export function useLikes(photoId: string) {
  const [likeState, setLikeState] = useState<LikeState>(() => {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${photoId}`);
    return stored ? JSON.parse(stored) : { count: Math.floor(Math.random() * 50) + 10, isLiked: false };
  });

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}${photoId}`, JSON.stringify(likeState));
  }, [photoId, likeState]);

  const toggleLike = () => {
    setLikeState(prev => ({
      count: prev.count + (prev.isLiked ? -1 : 1),
      isLiked: !prev.isLiked
    }));
  };

  return { ...likeState, toggleLike };
}