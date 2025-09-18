import React, { useEffect, useRef, useState } from 'react';

interface SwipeHandlerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  children: React.ReactNode;
}

export function SwipeHandler({ onSwipeLeft, onSwipeRight, children }: SwipeHandlerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent | MouseEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchEnd(null);
    setTouchStart(x);
  };

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchEnd(x);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onSwipeLeft();
    } else if (isRightSwipe) {
      onSwipeRight();
    }
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('touchstart', onTouchStart);
    element.addEventListener('touchmove', onTouchMove);
    element.addEventListener('touchend', onTouchEnd);
    element.addEventListener('mousedown', onTouchStart);
    element.addEventListener('mousemove', onTouchMove);
    element.addEventListener('mouseup', onTouchEnd);

    return () => {
      element.removeEventListener('touchstart', onTouchStart);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchend', onTouchEnd);
      element.removeEventListener('mousedown', onTouchStart);
      element.removeEventListener('mousemove', onTouchMove);
      element.removeEventListener('mouseup', onTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
    </div>
  );
}