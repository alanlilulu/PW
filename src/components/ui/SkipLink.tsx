import React from 'react';

interface SkipLinkProps {
  targetId?: string;
  className?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  className = ''
}) => {
  return (
    <a
      href={`#${targetId}`}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white 
        focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300
        ${className}
      `}
      onClick={(e) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      跳到主要内容
    </a>
  );
};

export default SkipLink;

