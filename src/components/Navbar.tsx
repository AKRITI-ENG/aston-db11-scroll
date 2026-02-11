'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 mix-blend-difference text-white pointer-events-none"
        >
            {/* Brand Logo / Name */}
            <div className="text-xl font-bold tracking-widest uppercase font-orbitron">
                Aston Martin
            </div>

            {/* Center Model Name */}
            <div className="absolute left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] opacity-60 font-rajdhani">
                DB11 / V12
            </div>

            {/* Menu Hamburger (Visual Only) */}
            <div className="flex flex-col gap-1.5 cursor-pointer pointer-events-auto">
                <div className="w-8 h-[2px] bg-white" />
                <div className="w-5 h-[2px] bg-white ml-auto" />
            </div>
        </motion.nav>
    );
}
