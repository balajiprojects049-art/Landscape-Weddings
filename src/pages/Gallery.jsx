import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';
import PremiumFooter from '../components/PremiumFooter';

function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >{children}</motion.div>
    );
}

// ── All gallery images across categories ──────────────────────────────────
// ── All gallery images with diverse sizing for a "Mosaic" look ──────────────
// ── All gallery images with natural aspect ratios for Masonry ──────────────
const allImages = [
    // Weddings
    { id: 1, cat: 'Weddings', src: '/IMG_0176.JPG.jpeg' },
    { id: 2, cat: 'Weddings', src: '/IMG_0211.JPG.jpeg' },
    { id: 3, cat: 'Weddings', src: '/IMG_0437.JPG.jpeg' },
    { id: 4, cat: 'Weddings', src: '/IMG_0442.JPG.jpeg' },
    { id: 5, cat: 'Weddings', src: '/IMG_0448.JPG.jpeg' },
    { id: 6, cat: 'Weddings', src: '/IMG_0459.JPG.jpeg' },
    { id: 7, cat: 'Weddings', src: '/IMG_0787.JPG.jpeg' },
    { id: 8, cat: 'Weddings', src: '/IMG_0792.JPG.jpeg' },
    { id: 41, cat: 'Weddings', src: '/IMG_1164.JPG.jpeg' },
    { id: 42, cat: 'Weddings', src: '/IMG_2248.JPG.jpeg' },
    { id: 43, cat: 'Weddings', src: '/IMG_2253.JPG.jpeg' },
    { id: 44, cat: 'Weddings', src: '/IMG_2277.JPG.jpeg' },

    // Pre-Wedding
    { id: 9, cat: 'Pre-Wedding', src: '/IMG_0852.JPG.jpeg' },
    { id: 10, cat: 'Pre-Wedding', src: '/IMG_0876.JPG.jpeg' },
    { id: 11, cat: 'Pre-Wedding', src: '/IMG_1164.JPG.jpeg' },
    { id: 12, cat: 'Pre-Wedding', src: '/IMG_1168.JPG.jpeg' },
    { id: 13, cat: 'Pre-Wedding', src: '/IMG_1174.JPG.jpeg' },
    { id: 14, cat: 'Pre-Wedding', src: '/IMG_1202.JPG.jpeg' },
    { id: 45, cat: 'Pre-Wedding', src: '/IMG_2303.JPG.jpeg' },
    { id: 46, cat: 'Pre-Wedding', src: '/IMG_2312.JPG.jpeg' },

    // Celebrities
    { id: 15, cat: 'Celebrities', src: '/IMG_2247.JPG.jpeg' },
    { id: 16, cat: 'Celebrities', src: '/IMG_2252.JPG.jpeg' },
    { id: 17, cat: 'Celebrities', src: '/IMG_2272.JPG.jpeg' },
    { id: 18, cat: 'Celebrities', src: '/IMG_2303.JPG.jpeg' },
    { id: 19, cat: 'Celebrities', src: '/IMG_2314.JPG.jpeg' },
    { id: 20, cat: 'Celebrities', src: '/IMG_2319.JPG.jpeg' },
    { id: 47, cat: 'Celebrities', src: '/IMG_2358.JPG.jpeg' },
    { id: 48, cat: 'Celebrities', src: '/IMG_2362.JPG.jpeg' },
    { id: 49, cat: 'Celebrities', src: '/IMG_2634.JPG.jpeg' },

    // Engagement
    { id: 21, cat: 'Engagement', src: '/IMG_2358.JPG.jpeg' },
    { id: 22, cat: 'Engagement', src: '/IMG_2634.JPG.jpeg' },
    { id: 23, cat: 'Engagement', src: '/IMG_2636.JPG.jpeg' },
    { id: 24, cat: 'Engagement', src: '/IMG_2642.JPG.jpeg' },
    { id: 50, cat: 'Engagement', src: '/IMG_2643.JPG.jpeg' },
    { id: 51, cat: 'Engagement', src: '/IMG_2748.JPG.jpeg' },

    // Ceremonies
    { id: 25, cat: 'Ceremonies', src: '/IMG_2748.JPG.jpeg' },
    { id: 26, cat: 'Ceremonies', src: '/IMG_2761.JPG.jpeg' },
    { id: 27, cat: 'Ceremonies', src: '/IMG_2811.JPG.jpeg' },
    { id: 28, cat: 'Ceremonies', src: '/IMG_2823.JPG.jpeg' },
    { id: 29, cat: 'Ceremonies', src: '/IMG_2835.JPG.jpeg' },
    { id: 30, cat: 'Ceremonies', src: '/IMG_2841.JPG.jpeg' },
    { id: 52, cat: 'Ceremonies', src: '/IMG_2846.JPG.jpeg' },
    { id: 53, cat: 'Ceremonies', src: '/IMG_2847.JPG.jpeg' },
    { id: 54, cat: 'Ceremonies', src: '/IMG_2848.JPG.jpeg' },
    { id: 55, cat: 'Ceremonies', src: '/IMG_2849.JPG.jpeg' },

    // Celebrities (formerly Editorial)
    { id: 31, cat: 'Celebrities', src: '/IMG_3894.JPG.jpeg' },
    { id: 32, cat: 'Celebrities', src: '/IMG_3846.JPG.jpeg' },
    { id: 33, cat: 'Celebrities', src: '/IMG_2850.JPG.jpeg' },
    { id: 34, cat: 'Celebrities', src: '/IMG_3901.JPG.jpeg' },
    { id: 35, cat: 'Celebrities', src: '/IMG_3907.JPG.jpeg' },
    { id: 56, cat: 'Celebrities', src: '/IMG_2851.JPG.jpeg' },
    { id: 57, cat: 'Celebrities', src: '/IMG_2852.JPG.jpeg' },
    { id: 58, cat: 'Celebrities', src: '/IMG_2853.JPG.jpeg' },
    { id: 59, cat: 'Celebrities', src: '/IMG_2854.JPG.jpeg' },
];

const categories = ['All', 'Weddings', 'Pre-Wedding', 'Engagement', 'Ceremonies', 'Celebrities'];

// Height classes for masonry feel
const hClass = { tall: 'h-80 md:h-96', normal: 'h-60 md:h-72' };

export default function Gallery() {
    const [active, setActive] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = active === 'All' ? allImages : allImages.filter(img => img.cat === active);

    return (
        <div className="bg-noir min-h-screen text-white">
            <AnimatedHeader />

            <main>
                {/* ── PAGE HERO ─────────────────────────────────────── */}
                <section className="relative pt-36 pb-16 text-center overflow-hidden">
                    {/* Royal Background Ornament */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
                        <svg width="600" height="600" viewBox="0 0 100 100" fill="currentColor" className="text-gold">
                            <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" />
                        </svg>
                    </div>

                    {/* Ambient glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[60vw] h-[40vh] rounded-full bg-gold/5 blur-[180px]" />
                    </div>
                    <Reveal>
                        <span className="text-gold text-[10px] uppercase tracking-[0.6em] font-medium flex items-center justify-center gap-4 mb-5">
                            ✦ <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold/60 to-transparent" /> Gallery <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold/60 to-transparent" /> ✦
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-5">
                            Every Frame a<br />
                            <span className="italic font-light text-gold">Memory Forever</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-white/40 max-w-xl mx-auto font-light italic leading-relaxed px-4 font-serif text-lg">
                            "A handpicked collection of our finest candid captures, editorial portraits, and cinematic wedding photographs."
                        </p>
                    </Reveal>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
                        <div className="text-gold opacity-60">✦</div>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
                    </div>
                </section>

                {/* ── CATEGORY FILTER ───────────────────────────────── */}
                <div className="sticky top-16 z-40 bg-noir/90 backdrop-blur-md border-b border-gold/10 py-6">
                    <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap px-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.3em] font-cinzel font-semibold transition-all duration-500 rounded-sm ${active === cat
                                    ? 'text-gold border-b-2 border-gold pb-1.5'
                                    : 'text-white/30 hover:text-white/80'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── PREMIUM MASONRY REVEAL ───────────────────────────────────── */}
                <div className="px-3 md:px-8 py-12 max-w-[1800px] mx-auto">
                    {/* Floating Brand Card Header */}
                    <Reveal className="mb-12">
                        <div className="bg-noir-200 border border-gold/15 p-10 md:p-16 text-center relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gold/[0.03] pointer-events-none" />
                            <img src="/LOGO.png" alt="Landscape Weddings" className="h-16 md:h-20 mx-auto mb-6 opacity-90 brightness-150" />
                            <p className="font-serif italic text-white/50 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                                "Capturing your love story today, for your legacy tomorrow."
                            </p>
                            <div className="mt-8 flex items-center justify-center gap-4">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
                                <span className="text-gold text-[10px] uppercase tracking-[0.6em] font-medium">Fine Art Studio</span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
                            </div>
                        </div>
                    </Reveal>

                    <AnimatePresence mode="popLayout">
                        <motion.div
                            layout
                            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6"
                        >
                            {filtered.map((img, i) => (
                                <motion.div
                                    key={img.id}
                                    layout
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative break-inside-avoid overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-700 bg-noir-100 group shadow-2xl"
                                    onClick={() => setLightbox(img)}
                                >
                                    {/* Subtle Royal Frame */}
                                    <div className="absolute inset-2 border border-gold/5 pointer-events-none z-20 group-hover:border-gold/20 transition-all duration-700" />

                                    <img
                                        src={img.src}
                                        alt={img.cat}
                                        className="w-full h-auto object-contain block transition-transform duration-[4s] ease-out group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Hover overlay with detail */}
                                    <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-all duration-700 flex flex-col items-center justify-center">
                                        <div className="p-4 rounded-full border border-gold/30 bg-noir/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 mb-2">
                                            <ZoomIn size={24} className="text-gold" />
                                        </div>
                                        <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-cinzel font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none">{img.cat}</span>
                                    </div>

                                    {/* Bottom Info bar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-noir/60 backdrop-blur-md border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-between items-center z-10">
                                        <span className="text-[8px] text-white/40 uppercase tracking-widest font-medium">Landscape Weddings</span>
                                        <span className="text-gold text-[8px] uppercase tracking-widest leading-none">✦ 2024</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── BOOKING BANNER ─────────────────────────────────── */}
                <Reveal className="mx-4 md:mx-8 my-12 rounded-2xl overflow-hidden">
                    <div className="relative bg-noir-200 border border-gold/15 rounded-2xl overflow-hidden">
                        {/* Background glow effect */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-48 bg-gold/8 blur-[80px] rounded-full" />
                            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-48 bg-gold/5 blur-[80px] rounded-full" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-16 py-14">
                            <div>
                                <p className="text-gold text-xs uppercase tracking-[0.4em] font-medium mb-3 flex items-center gap-2">
                                    <span className="h-px w-6 bg-gold/60" /> Now Taking Bookings
                                </p>
                                <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
                                    We Are Booking For<br />
                                    <span className="text-gold italic font-light">2025 &amp; 2026</span>
                                </h2>
                                <p className="text-white/40 mt-3 font-light text-sm max-w-sm leading-relaxed">
                                    Our work is unique and we work on a first-come, first-served basis. Limited dates remain for this season.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                                <Link to="/quote">
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="flex items-center gap-3 px-10 py-5 bg-gold text-noir font-bold text-sm uppercase tracking-[0.2em] rounded-sm hover:shadow-gold-lg transition-all duration-300"
                                    >
                                        Talk To Us Now! <ArrowRight size={16} />
                                    </motion.button>
                                </Link>
                                <Link to="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="flex items-center gap-3 px-10 py-5 border border-white/20 hover:border-gold/50 text-white/60 hover:text-white text-sm uppercase tracking-[0.2em] rounded-sm transition-all duration-300"
                                    >
                                        Contact Studio
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </main>

            {/* ── LIGHTBOX ─────────────────────────────────────────── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={() => setLightbox(null)}
                    >
                        {/* Close btn */}
                        <button
                            onClick={() => setLightbox(null)}
                            className="fixed top-6 right-6 z-[10000] flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm uppercase tracking-widest"
                        >
                            <X size={20} /> Close
                        </button>

                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative max-w-5xl max-h-[90vh] w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={lightbox.src}
                                alt={lightbox.cat}
                                className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                            />
                            {/* Gold frame */}
                            <div className="absolute inset-0 border border-gold/20 rounded-xl pointer-events-none" />
                            <div className="mt-4 flex items-center gap-4 justify-center">
                                <span className="text-gold text-xs uppercase tracking-[0.4em] font-medium">{lightbox.cat}</span>
                                <span className="h-px w-6 bg-gold/40" />
                                <span className="text-white/40 text-xs uppercase tracking-widest">Landscape Weddings</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <PremiumFooter />
        </div>
    );
}
