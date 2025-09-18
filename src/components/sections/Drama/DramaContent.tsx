import React from 'react';
import { DramaText } from './DramaText';
import { DramaImage } from './DramaImage';

export function DramaContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <DramaText />
      <DramaImage />
    </div>
  );
}