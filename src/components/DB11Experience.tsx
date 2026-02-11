'use client';

import { carData } from '@/data/carData';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface DB11ExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function DB11Experience({ scrollYProgress }: DB11ExperienceProps) {
    // Phase 1: Hero (0% - 33%)
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Phase 2: Design (33% - 66%)
    const designOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const designY = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [50, 0, 0, -50]);

    // Phase 3: Engine (66% - 100%)
    const engineOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
    const engineX = useTransform(scrollYProgress, [0.7, 0.8], [50, 0]);

    return (
        <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-center w-full h-full">

            {/* PHASE 1: HERO */}
            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-6"
            >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-orbitron tracking-tighter mb-4 text-white drop-shadow-2xl">
                    {carData[0].title}
                </h1>
                <div className="flex flex-col items-center gap-6">
                    <p className="text-2xl md:text-3xl font-rajdhani text-[var(--pagani-gold)] tracking-widest">
                        {carData[0].price}
                    </p>
                    <button className="pointer-events-auto px-8 py-3 border border-[var(--pagani-gold)] text-[var(--pagani-gold)] hover:bg-[var(--pagani-gold)] hover:text-black transition-all duration-300 font-rajdhani uppercase tracking-widest text-sm backdrop-blur-sm">
                        {carData[0].cta}
                    </button>
                </div>
            </motion.div>

            {/* PHASE 2: DESIGN */}
            <motion.div
                style={{ opacity: designOpacity, y: designY }}
                className="absolute top-1/2 left-8 md:left-24 max-w-lg"
            >
                <div className="border-l-2 border-[var(--pagani-gold)] pl-6 text-left bg-black/20 backdrop-blur-md p-8 rounded-r-lg">
                    <h2 className="text-4xl md:text-5xl font-orbitron mb-4 text-white">
                        {carData[1].title}
                    </h2>
                    <p className="text-lg md:text-xl font-rajdhani text-gray-300 leading-relaxed">
                        {carData[1].text}
                    </p>
                </div>
            </motion.div>

            {/* PHASE 3: ENGINE */}
            <motion.div
                style={{ opacity: engineOpacity, x: engineX }}
                className="absolute top-1/2 right-8 md:right-24 text-right"
            >
                <div className="border-r-2 border-[var(--pagani-gold)] pr-6 bg-black/20 backdrop-blur-md p-8 rounded-l-lg">
                    <h2 className="text-4xl md:text-5xl font-orbitron mb-8 text-white">
                        {carData[2].title}
                    </h2>
                    <div className="space-y-6">
                        {carData[2].specs?.map((spec, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-sm font-rajdhani text-[var(--pagani-gold)] uppercase tracking-wider">
                                    {spec.label}
                                </span>
                                <span className="text-3xl md:text-4xl font-orbitron text-white">
                                    {spec.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Progress Indicator HUD */}
            <div className="absolute bottom-10 left-10 md:left-20 flex items-center gap-4 opacity-50 font-rajdhani">
                <div className="w-24 h-[1px] bg-white/30 overflow-hidden">
                    <motion.div
                        className="h-full bg-[var(--pagani-gold)]"
                        style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    />
                </div>
                <span className="text-xs tracking-widest">SYSTEM STATUS: ONLINE</span>
            </div>
        </div>
    );
}
