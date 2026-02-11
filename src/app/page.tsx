'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import DB11ScrollCanvas from '@/components/DB11ScrollCanvas';
import DB11Experience from '@/components/DB11Experience';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Master Scroll Source
  // We use the container ref to track scroll within this specific element if it was a scroll area,
  // but for a full page scroll, we usually rely on window scroll. 
  // However, specifically "Scroll container height: 500vh".
  // So the body/main needs to be 500vh.

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="relative w-full h-[500vh]">
      <Navbar />

      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background Layer: Image Sequence */}
        <DB11ScrollCanvas scrollYProgress={scrollYProgress} />

        {/* Foreground Layer: HUD Overlay */}
        <DB11Experience scrollYProgress={scrollYProgress} />
      </div>

      {/* Scroll Indicator / Hint at the bottom of the first screen? 
          (Optional, but helpful) 
      */}
    </main>
  );
}
