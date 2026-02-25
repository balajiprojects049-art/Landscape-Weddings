import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const HERO_IMAGES = [
    '/IMG_2811.JPG.jpeg',
    '/IMG_0182.JPG.jpeg',
    '/IMG_1182.JPG.jpeg',
    '/IMG_1172.JPG.jpeg',
    '/IMG_2835.JPG.jpeg',
    '/IMG_0444.JPG.jpeg',
    '/IMG_0887.JPG.jpeg',
    '/IMG_0176.JPG.jpeg',
    '/IMG_0900.JPG.jpeg'
];

// Scrolling ticker items
const TICKER = ['Candid Photography', '✦', 'Cinematic Films', '✦', 'Premium Albums', '✦', 'Destination Weddings', '✦', 'Drone Coverage', '✦', 'Hyderabad', '✦', 'Pan India', '✦'];

export default function LuxuryHeroSection() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 700], [0, 180]);
    const opacity = useTransform(scrollY, [0, 380], [1, 0]);
    const scale = useTransform(scrollY, [0, 700], [1, 1.1]);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 4000); // 4 seconds for faster visibility
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-noir noise-bg">

            {/* ── PARALLAX SLIDING BG ──────────────────────────── */}
            <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${HERO_IMAGES[currentIndex]})` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                </AnimatePresence>
                <div className="hero-overlay absolute inset-0 z-10 pointer-events-none" />
                {/* Extra vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/20 to-noir/20 z-10 pointer-events-none" />
            </motion.div>

            {/* ── CINEMATIC TOP BAR ────────────────────── */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-noir to-transparent z-10" />

            {/* ── BOTTOM FADE ──────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-noir via-noir/40 to-transparent z-10" />

            {/* ── DOTS INDICATOR ────────────────── */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                {HERO_IMAGES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-gold' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                    />
                ))}
            </div>

            {/* ── VERTICAL "LANDSCAPE WEDDINGS" text on right ── */}
            <motion.div
                className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                style={{ opacity }}
            >
                <div className="h-16 w-px bg-gradient-to-b from-gold to-transparent" />
                <span className="text-white/30 text-[9px] uppercase tracking-[0.5em] font-light"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    Landscape Weddings
                </span>
                <div className="h-16 w-px bg-gradient-to-t from-gold to-transparent" />
            </motion.div>

            {/* ── MAIN CONTENT ─────────────────────────── */}
            <motion.div
                className="absolute inset-0 z-20 flex flex-col items-start justify-end pb-32 px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto pointer-events-none"
                style={{ opacity }}
            >
                {/* Text Removed As Per Request */}
            </motion.div>

            {/* ── SCROLLING TICKER ─────────────────────── */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-gold/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
            >
                <div className="flex whitespace-nowrap gap-0 py-2 bg-noir/60 backdrop-blur-sm">
                    {[...TICKER, ...TICKER, ...TICKER].map((item, i) => (
                        <motion.span
                            key={i}
                            className="text-[9px] uppercase tracking-[0.4em] font-medium text-gold/50 px-6 flex-shrink-0"
                            animate={{ x: [0, '-33.333%'] }}
                            transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 0 }}
                            style={{ display: 'inline-block' }}
                        >
                            {item}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
