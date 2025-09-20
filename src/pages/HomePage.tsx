import React from 'react';
import { Hero } from '../components/sections/Hero/Hero';
import { Portrait } from '../components/sections/Portrait/Portrait';
import { Drama } from '../components/sections/Drama/Drama';
import { Career } from '../components/sections/Career/Career';

export function HomePage() {
  return (
    <>
      <Hero />
      <Portrait />
      <Drama />
      <Career />
    </>
  );
}
