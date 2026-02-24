import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2000&auto=format&fit=crop';

// Scrolling ticker items
const TICKER = ['Candid Photography', '✦', 'Cinematic Films', '✦', 'Premium Albums', '✦', 'Destination Weddings', '✦', 'Drone Coverage', '✦', 'Hyderabad', '✦', 'Pan India', '✦'];

export default function LuxuryHeroSection() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 700], [0, 180]);
    const opacity = useTransform(scrollY, [0, 380], [1, 0]);
    const scale = useTransform(scrollY, [0, 700], [1, 1.1]);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-noir noise-bg">

            {/* ── PARALLAX BG ──────────────────────────── */}
            <motion.div className="absolute inset-0" style={{ y, scale }}>
                <div className="absolute inset-0 bg-cover bg-center transition-none"
                    style={{ backgroundImage: `url(${HERO_BG})` }} />
                <div className="hero-overlay absolute inset-0" />
                {/* Extra vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/20 to-noir/20" />
            </motion.div>

            {/* ── CINEMATIC TOP BAR ────────────────────── */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-noir to-transparent z-10" />

            {/* ── BOTTOM FADE ──────────────────────────── */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-noir via-noir/40 to-transparent z-10" />

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
                className="absolute inset-0 z-20 flex flex-col items-start justify-end pb-32 px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto"
                style={{ opacity }}
            >
                {/* Eyebrow */}
                <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="h-px w-12 bg-gold/80" />
                    <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-medium">Cinematic Wedding Studio</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[110px] leading-[0.88] text-white mb-8 max-w-5xl"
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="block font-light italic text-white/90">We Are The One</span>
                    <span className="block font-bold shimmer-text">You Are Looking For</span>
                </motion.h1>

                {/* Sub */}
                <motion.p
                    className="text-white/55 text-base md:text-lg font-light max-w-lg leading-relaxed mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    Royal wedding photography and cinematic films that transform your most sacred moments into eternal visual masterpieces.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link to="/quote">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 px-9 py-4 bg-gold text-noir font-bold text-sm uppercase tracking-[0.2em] rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                        >
                            Build Your Quote
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                    </Link>

                    <Link to="/portfolio">
                        <button className="group flex items-center gap-4 text-white/70 hover:text-white text-sm uppercase tracking-wider transition-colors duration-300">
                            <span className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 group-hover:border-gold/70 transition-all duration-300 group-hover:bg-gold/10">
                                <Play size={14} className="ml-0.5 text-gold" />
                            </span>
                            <span>View Portfolio</span>
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* ── SCROLL INDICATOR ─────────────────────── */}
            <motion.div
                className="absolute bottom-14 right-10 flex flex-col items-center gap-2 z-20 hidden md:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                style={{ opacity }}
            >
                <span className="text-white/25 text-[9px] uppercase tracking-[0.5em] font-light"
                    style={{ writingMode: 'vertical-rl' }}>Scroll</span>
                <motion.div
                    className="w-px h-14 bg-gradient-to-b from-gold/70 to-transparent"
                    animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
                    style={{ originY: 0 }}
                />
            </motion.div>

            {/* ── STATS BAR ────────────────────────────── */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24 pb-10">
                    <div className="flex gap-10 md:gap-20">
                        {[
                            { n: '500+', label: 'Weddings' },
                            { n: '12+', label: 'Years' },
                            { n: '50+', label: 'Awards' },
                            { n: '100%', label: 'Happiness' },
                        ].map((s, i) => (
                            <motion.div
                                key={s.n}
                                className="flex flex-col"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8 + i * 0.1, duration: 0.7 }}
                            >
                                <span className="font-cinzel text-2xl md:text-3xl font-bold gold-text-glow"
                                    style={{ background: 'linear-gradient(135deg,#FFD700,#FCEB9E,#B8962E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                    {s.n}
                                </span>
                                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-0.5">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
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
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 0 }}
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
