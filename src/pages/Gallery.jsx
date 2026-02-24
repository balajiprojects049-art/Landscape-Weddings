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
const allImages = [
    // Weddings
    { id: 1, cat: 'Weddings', src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format&fit=crop', h: 'tall' },
    { id: 2, cat: 'Weddings', src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 3, cat: 'Weddings', src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 4, cat: 'Weddings', src: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=900&auto=format&fit=crop', h: 'tall' },
    // Pre-Wedding
    { id: 5, cat: 'Pre-Wedding', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop', h: 'tall' },
    { id: 6, cat: 'Pre-Wedding', src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 7, cat: 'Pre-Wedding', src: 'https://images.unsplash.com/photo-1532712938730-4e36c56b1bf1?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    // Candid
    { id: 8, cat: 'Candid', src: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=900&auto=format&fit=crop', h: 'tall' },
    { id: 9, cat: 'Candid', src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 10, cat: 'Candid', src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    // Engagement
    { id: 11, cat: 'Engagement', src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 12, cat: 'Engagement', src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=900&auto=format&fit=crop', h: 'tall' },
    { id: 13, cat: 'Engagement', src: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    // Ceremonies
    { id: 14, cat: 'Ceremonies', src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 15, cat: 'Ceremonies', src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=900&auto=format&fit=crop', h: 'tall' },
    { id: 16, cat: 'Ceremonies', src: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    // Editorial
    { id: 17, cat: 'Editorial', src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=900&auto=format&fit=crop', h: 'tall' },
    { id: 18, cat: 'Editorial', src: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 19, cat: 'Editorial', src: 'https://images.unsplash.com/photo-1446768500601-ac47e5ec3719?q=80&w=900&auto=format&fit=crop', h: 'normal' },
    { id: 20, cat: 'Editorial', src: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=900&auto=format&fit=crop', h: 'tall' },
];

const categories = ['All', 'Weddings', 'Pre-Wedding', 'Candid', 'Engagement', 'Ceremonies', 'Editorial'];

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
                    {/* Ambient glow */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[60vw] h-[40vh] rounded-full bg-gold/5 blur-[180px]" />
                    </div>
                    <Reveal>
                        <span className="text-gold text-[10px] uppercase tracking-[0.6em] font-medium flex items-center justify-center gap-3 mb-5">
                            <span className="h-px w-8 bg-gold/60" /> Our Clicks <span className="h-px w-8 bg-gold/60" />
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-5">
                            Every Frame a<br />
                            <span className="italic font-light text-gold">Memory Forever</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed px-4">
                            A handpicked collection of our finest candid captures, editorial portraits, and cinematic wedding photographs.
                        </p>
                    </Reveal>
                    <div className="gold-divider w-24 mx-auto mt-8" />
                </section>

                {/* ── CATEGORY FILTER ───────────────────────────────── */}
                <div className="sticky top-16 z-40 bg-noir/90 backdrop-blur-md border-b border-gold/8 py-4">
                    <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap px-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`px-5 py-2 text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300 rounded-sm border ${active === cat
                                        ? 'bg-gold text-noir border-gold'
                                        : 'border-white/10 text-white/40 hover:border-gold/40 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── MASONRY GRID ───────────────────────────────────── */}
                <div className="px-3 md:px-6 py-8 max-w-[1600px] mx-auto">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            layout
                            className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-0"
                        >
                            {filtered.map((img, i) => (
                                <motion.div
                                    key={img.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5, delay: i * 0.03 }}
                                    className="relative overflow-hidden rounded-xl cursor-pointer group mb-3 md:mb-4 break-inside-avoid"
                                    onClick={() => setLightbox(img)}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.cat}
                                        className={`w-full object-cover ${hClass[img.h]} transition-transform duration-[2s] group-hover:scale-110`}
                                        loading="lazy"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/50 transition-all duration-500 flex items-center justify-center">
                                        <ZoomIn
                                            size={32}
                                            className="text-gold opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400"
                                        />
                                    </div>
                                    {/* Category label */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-noir/90 to-transparent">
                                        <span className="text-gold text-[9px] uppercase tracking-[0.4em] font-medium">{img.cat}</span>
                                    </div>
                                    {/* Gold border on hover */}
                                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-600 rounded-xl pointer-events-none" />
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
                        className="fixed inset-0 z-[9999] bg-noir/97 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
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
