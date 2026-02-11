'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 181;

interface DB11ScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function DB11ScrollCanvas({ scrollYProgress }: DB11ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Filename format: ezgif-frame-001.jpg
            const paddedIndex = i.toString().padStart(3, '0');
            img.src = `/images/db11-sequence/ezgif-frame-${paddedIndex}.jpg`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, []);

    // Render frame based on scroll
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !context || !img) return;

        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate aspect ratio to contain content (object-fit: contain)
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Update on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
  if (!isLoaded || images.length === 0) return;

  const cinematicProgress = (() => {
    // 0–40% → open engine
    if (latest < 0.4) {
      return latest / 0.4;
    }

    // 40–60% → hold
    if (latest < 0.6) {
      return 1;
    }

    // 60–100% → close engine
    return Math.max(0, 1 - (latest - 0.6) / 0.4);
  })();

  const eased =
    cinematicProgress *
    cinematicProgress *
    (3 - 2 * cinematicProgress);

  const frameIndex = Math.min(
    FRAME_COUNT - 1,
    Math.floor(eased * (FRAME_COUNT - 1))
  );

  requestAnimationFrame(() => renderFrame(frameIndex));
});


    // Handle resize and initial render
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set canvas size to window size * devicePixelRatio for sharpness
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Scale context to match dpr
                // Actually, better to just keep verify drawing logic uses full width/height
                // renderFrame Logic uses canvas.width directly, so it will be high res
            }

            // Re-render current frame
            const latest = scrollYProgress.get();

const cinematicProgress = (() => {
  if (latest < 0.4) return latest / 0.4;
  if (latest < 0.6) return 1;
  return Math.max(0, 1 - (latest - 0.6) / 0.4);
})();

const eased =
  cinematicProgress *
  cinematicProgress *
  (3 - 2 * cinematicProgress);

const frameIndex = Math.min(
  FRAME_COUNT - 1,
  Math.floor(eased * (FRAME_COUNT - 1))
);

if (isLoaded) {
  renderFrame(frameIndex);
}
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, images]); // Re-run when loaded to show first frame

    return (
        <div className="fixed inset-0 w-full h-full bg-[var(--pagani-black)] z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
                style={{ width: '100%', height: '100%' }}
            />

            {/* Loading State */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white z-10 bg-black/50">
                    <div className="font-orbitron animate-pulse">LOADING ASSETS...</div>
                </div>
            )}
        </div>
    );
}
