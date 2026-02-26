import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, MapPin, Calendar, Camera, ArrowRight, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';
import PremiumFooter from '../components/PremiumFooter';

function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.12 });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >{children}</motion.div>
    );
}

// ── WEDDING STORIES DATA ──────────────────────────────────────────────────
const stories = [
    {
        id: 1,
        couple: 'Priya & Arjun',
        tagline: 'A Royal Hyderbadi Affair',
        date: 'December 2024',
        venue: 'ITC Kohenur, Hyderabad',
        type: 'Full Wedding Coverage',
        cover: '/IMG_0176.JPG.jpeg',
        cover2: '/IMG_0177.JPG.jpeg',
        story: 'A grand celebration of love that unfolded over three magnificent days. Priya and Arjun\'s wedding was nothing short of a royal saga — draped in ivory and gold, set against the backdrop of one of Hyderabad\'s most iconic properties.',
        images: [
            '/IMG_0176.JPG.jpeg',
            '/IMG_0177.JPG.jpeg',
            '/IMG_0182.JPG.jpeg',
            '/IMG_0211.JPG.jpeg',
            '/IMG_0437.JPG.jpeg',
            '/IMG_0438.JPG.jpeg',
        ],
        services: ['Candid Photography', 'Cinematic Film', 'Drone Coverage', 'Premium Album'],
        featured: true,
    },
    {
        id: 2,
        couple: 'Sneha & Karan',
        tagline: 'Destination Dream in Goa',
        date: 'January 2025',
        venue: 'Leela Palace, Goa',
        type: 'Destination Wedding',
        cover: '/IMG_0440.JPG.jpeg',
        cover2: '/IMG_0441.JPG.jpeg',
        story: 'Barefoot on the beach at sunset, surrounded by their closest loved ones — Sneha and Karan\'s Goa wedding was the definition of cinematic romance. Every frame was bathed in golden light.',
        images: [
            '/IMG_0440.JPG.jpeg',
            '/IMG_0441.JPG.jpeg',
            '/IMG_0442.JPG.jpeg',
            '/IMG_0443.JPG.jpeg',
        ],
        services: ['Candid Photography', 'Cinematic Film', 'Pre-Wedding Shoot'],
        featured: false,
    },
    {
        id: 3,
        couple: 'Divya & Rahul',
        tagline: 'Intimate Palace Wedding, Jaipur',
        date: 'November 2024',
        venue: 'Rambagh Palace, Jaipur',
        type: 'Palace Wedding',
        cover: '/IMG_0445.JPG.jpeg',
        cover2: '/IMG_0446.JPG.jpeg',
        story: 'The pink city gave them the perfect canvas. Divya and Rahul chose an intimate 100-guest affair, grand in elegance but intimate in emotion. The palace halls echoed with laughter, music and pure joy.',
        images: [
            '/IMG_0445.JPG.jpeg',
            '/IMG_0446.JPG.jpeg',
            '/IMG_0447.JPG.jpeg',
            '/IMG_0448.JPG.jpeg',
        ],
        services: ['Candid Photography', 'Traditional Videography', 'Premium Album'],
        featured: false,
    },
    {
        id: 4,
        couple: 'Ananya & Vikram',
        tagline: 'Modern Minimalist, Bangalore',
        date: 'February 2025',
        venue: 'The Oberoi Bangalore',
        type: 'Contemporary Wedding',
        cover: '/IMG_0451.JPG.jpeg',
        cover2: '/IMG_0453.JPG.jpeg',
        story: 'Clean lines, ivory florals, no-fuss elegance. Ananya and Vikram wanted a wedding that felt like them — modern, refined, deeply personal. We captured every quiet glance and stolen smile.',
        images: [
            '/IMG_0451.JPG.jpeg',
            '/IMG_0453.JPG.jpeg',
            '/IMG_0455.JPG.jpeg',
        ],
        services: ['Candid Photography', 'Cinematic Film', 'Drone Coverage'],
        featured: false,
    },
    {
        id: 5,
        couple: 'Meera & Siddharth',
        tagline: 'Traditional South Indian Grandeur',
        date: 'March 2025',
        venue: 'Sri Satya Sai Nigamagamam, Hyderabad',
        type: 'Traditional Wedding',
        cover: '/IMG_0788.JPG.jpeg',
        cover2: '/IMG_0792.JPG.jpeg',
        story: 'Every ritual, every sacred moment, every tear of joy — documented with reverence and artistry. Meera and Siddharth\'s traditional Telugu wedding was a masterclass in culture, colour and emotion.',
        images: [
            '/IMG_0788.JPG.jpeg',
            '/IMG_0792.JPG.jpeg',
            '/IMG_0853.JPG.jpeg',
            '/IMG_0876.JPG.jpeg',
        ],
        services: ['Candid Photography', 'Traditional Videography', 'Drone Coverage', 'Album'],
        featured: false,
    },
    {
        id: 6,
        couple: 'Riya & Aditya',
        tagline: 'Garden Wedding, Lonavala',
        date: 'October 2024',
        venue: 'Maaya Villas, Lonavala',
        type: 'Garden Wedding',
        cover: '/IMG_1165.JPG.jpeg',
        cover2: '/IMG_1166.JPG.jpeg',
        story: 'Lush greens, misty mornings, and love in the air. Riya and Aditya chose the scenic hills of Lonavala for their big day — and the resulting photographs feel like paintings brought to life.',
        images: [
            '/IMG_1165.JPG.jpeg',
            '/IMG_1166.JPG.jpeg',
            '/IMG_1167.JPG.jpeg',
        ],
        services: ['Candid Photography', 'Cinematic Film'],
        featured: false,
    },
];

// ── STORY LIGHTBOX (shows images + couple details) ─────────────────────────
function StoryLightbox({ story, onClose }) {
    const [imgIdx, setImgIdx] = useState(0);
    const [showZenfolio, setShowZenfolio] = useState(false);

    const prev = () => setImgIdx(i => (i - 1 + story.images.length) % story.images.length);
    const next = () => setImgIdx(i => (i + 1) % story.images.length);

    return (
        <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col"
            onClick={onClose}
        >
            {/* Close */}
            <button onClick={onClose}
                className="fixed top-5 right-5 z-[10000] flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-xs uppercase tracking-widest">
                <X size={18} /> Close
            </button>

            {/* Zenfolio iframe Overlay */}
            <AnimatePresence>
                {showZenfolio && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ damping: 25, stiffness: 200 }}
                        className="absolute inset-0 z-[10010] bg-noir flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-5 border-b border-gold/10 bg-noir-200">
                            <button
                                onClick={() => setShowZenfolio(false)}
                                className="flex items-center gap-2 text-white hover:text-gold transition-colors text-xs uppercase tracking-[0.2em] font-bold"
                            >
                                <ChevronLeft size={16} /> Back to previous page
                            </button>
                            <span className="text-gold text-[9px] uppercase tracking-[0.4em] hidden md:block">Full Event Album</span>
                        </div>
                        <iframe
                            src="https://landscapephotography.zenfolio.com/p1017498226"
                            className="w-full flex-1 border-0 bg-white"
                            title="Zenfolio Album"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col lg:flex-row h-full overflow-hidden"
                onClick={e => e.stopPropagation()}>

                {/* LEFT – IMAGE SLIDER */}
                <div className="relative flex-1 flex items-center justify-center bg-noir-100 overflow-hidden min-h-[50vh]">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={imgIdx}
                            src={story.images[imgIdx]}
                            alt={story.couple}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                    {/* Gold frame */}
                    <div className="absolute inset-4 border border-gold/15 rounded-sm pointer-events-none hidden lg:block" />

                    {/* Nav arrows */}
                    {story.images.length > 1 && (
                        <>
                            <button onClick={prev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-noir/70 border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-noir text-white transition-all duration-300 z-10">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={next}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-noir/70 border border-gold/20 flex items-center justify-center hover:bg-gold hover:text-noir text-white transition-all duration-300 z-10">
                                <ChevronRight size={18} />
                            </button>
                        </>
                    )}
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {story.images.map((_, i) => (
                            <button key={i} onClick={() => setImgIdx(i)}
                                className={`rounded-full transition-all duration-300 ${i === imgIdx ? 'w-6 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/30 hover:bg-gold/70'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT – STORY DETAILS */}
                <div className="w-full lg:w-[380px] flex flex-col justify-between p-8 md:p-10 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gold/10 bg-noir-200 lg:bg-transparent">
                    <div>
                        <span className="text-gold text-[9px] uppercase tracking-[0.5em] font-medium block mb-4">{story.type}</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">{story.couple}</h2>
                        <p className="text-gold/70 italic font-light font-serif text-lg mb-6">"{story.tagline}"</p>
                        <div className="gold-divider w-16 mb-6" />

                        <div className="flex flex-col gap-3 mb-8">
                            <div className="flex items-center gap-3 text-white/50 text-sm">
                                <Calendar size={14} className="text-gold flex-shrink-0" />
                                <span>{story.date}</span>
                            </div>
                            <div className="flex items-start gap-3 text-white/50 text-sm">
                                <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
                                <span>{story.venue}</span>
                            </div>
                        </div>

                        <p className="text-white/50 font-light leading-relaxed text-sm mb-8">{story.story}</p>

                        <div className="mb-6">
                            <p className="text-gold text-[9px] uppercase tracking-[0.4em] font-medium mb-3">Services Used</p>
                            <div className="flex flex-wrap gap-2">
                                {story.services.map(s => (
                                    <span key={s} className="text-[9px] uppercase tracking-widest border border-gold/20 text-gold/70 px-3 py-1.5 rounded-full">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <motion.button
                            onClick={() => setShowZenfolio(true)}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            className="w-full py-4 border border-gold/50 text-gold font-bold text-xs uppercase tracking-[0.25em] rounded-sm hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2">
                            View Full Event Album <ArrowRight size={14} />
                        </motion.button>
                        <Link to="/quote" onClick={onClose}>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                className="w-full py-4 bg-gold text-noir font-bold text-xs uppercase tracking-[0.25em] rounded-sm hover:shadow-gold transition-all duration-300 flex items-center justify-center gap-2">
                                Book a Similar Story <ArrowRight size={14} />
                            </motion.button>
                        </Link>
                        <p className="text-white/20 text-[9px] text-center uppercase tracking-widest">
                            {imgIdx + 1} / {story.images.length} images
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ── MAIN PORTFOLIO PAGE ────────────────────────────────────────────────────
export default function Portfolio() {
    const [activeStory, setActiveStory] = useState(null);
    const [filter, setFilter] = useState('All');

    const filterTabs = ['All', 'Full Wedding', 'Destination', 'Traditional', 'Contemporary', 'Palace'];
    const typeMap = {
        'Full Wedding': s => s.type === 'Full Wedding Coverage',
        'Destination': s => s.type === 'Destination Wedding',
        'Traditional': s => s.type === 'Traditional Wedding',
        'Contemporary': s => s.type === 'Contemporary Wedding',
        'Palace': s => s.type === 'Palace Wedding',
    };

    const filtered = filter === 'All' ? stories : stories.filter(typeMap[filter] || (() => true));
    const featured = stories.find(s => s.featured);
    const rest = filtered.filter(s => !s.featured || filter !== 'All');
    const gridStories = filter === 'All' ? filtered.filter(s => !s.featured) : filtered;

    return (
        <div className="bg-noir min-h-screen text-white">
            <AnimatedHeader />

            <main>
                {/* ── PAGE HEADER ─────────────────────────── */}
                <section className="pt-36 pb-16 text-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[60vw] h-[40vh] rounded-full bg-gold/5 blur-[160px]" />
                    </div>
                    <Reveal>
                        <span className="text-gold text-[10px] uppercase tracking-[0.6em] font-medium flex items-center justify-center gap-3 mb-5">
                            <span className="h-px w-8 bg-gold/60" /> Wedding Stories <span className="h-px w-8 bg-gold/60" />
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">
                            Every Love Story<br />
                            <span className="italic font-light text-gold">Deserves a Legacy</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed">
                            Real couples, real emotions, real moments — each feature is a curated journey through one of our most cherished wedding days.
                        </p>
                    </Reveal>
                    <div className="gold-divider w-24 mx-auto mt-8" />
                </section>

                {/* ── FEATURED STORY ──────────────────────── */}
                {featured && filter === 'All' && (
                    <section className="px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto mb-10">
                        <Reveal>
                            <div
                                className="relative overflow-hidden rounded-2xl group cursor-pointer h-[60vh] md:h-[70vh]"
                                onClick={() => setActiveStory(featured)}
                            >
                                {/* BG */}
                                <img
                                    src={featured.cover}
                                    alt={featured.couple}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-noir/90 via-noir/50 to-transparent" />

                                {/* FEATURED BADGE */}
                                <div className="absolute top-6 left-6 flex items-center gap-2 bg-gold/90 text-noir px-4 py-1.5 rounded-full">
                                    <Heart size={12} className="fill-noir" />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Featured Story</span>
                                </div>

                                {/* CONTENT */}
                                <div className="absolute bottom-0 left-0 p-8 md:p-14">
                                    <span className="text-gold/70 text-xs uppercase tracking-[0.4em] font-medium block mb-3">{featured.type}</span>
                                    <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-2">{featured.couple}</h2>
                                    <p className="text-gold italic font-serif text-xl font-light mb-4 opacity-90">"{featured.tagline}"</p>
                                    <div className="flex items-center gap-6 text-white/50 text-sm mb-8">
                                        <span className="flex items-center gap-2"><Calendar size={13} className="text-gold" /> {featured.date}</span>
                                        <span className="flex items-center gap-2"><MapPin size={13} className="text-gold" /> {featured.venue}</span>
                                        <span className="flex items-center gap-2"><Camera size={13} className="text-gold" /> {featured.images.length} photographs</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-3 px-8 py-3.5 bg-gold text-noir font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:shadow-gold transition-all duration-300"
                                    >
                                        View Full Story <ArrowRight size={14} />
                                    </motion.button>
                                </div>

                                {/* Right preview image */}
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block w-72 h-48 rounded-xl overflow-hidden shadow-gold border border-gold/20">
                                    <img src={featured.cover2} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                                </div>

                                {/* Gold corner frame */}
                                <div className="absolute inset-3 border border-gold/10 group-hover:border-gold/20 transition-all duration-700 rounded-xl pointer-events-none" />
                            </div>
                        </Reveal>
                    </section>
                )}

                {/* ── FILTER TABS ─────────────────────────── */}
                <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap px-4 mb-10">
                    {filterTabs.map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)}
                            className={`px-5 py-2 text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300 rounded-sm border ${filter === tab
                                ? 'bg-gold text-noir border-gold'
                                : 'border-white/10 text-white/40 hover:border-gold/40 hover:text-white'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* ── STORY CARD GRID ─────────────────────── */}
                <div className="px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto pb-24">
                    <AnimatePresence mode="popLayout">
                        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" layout>
                            {gridStories.map((story, i) => (
                                <motion.article
                                    key={story.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                    className="group cursor-pointer rounded-xl overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500 hover:shadow-gold bg-noir-100"
                                    onClick={() => setActiveStory(story)}
                                >
                                    {/* COVER IMAGE */}
                                    <div className="relative overflow-hidden h-64">
                                        <img
                                            src={story.cover}
                                            alt={story.couple}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-108"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        {/* Type badge */}
                                        <div className="absolute top-4 left-4 bg-noir/80 backdrop-blur-sm border border-gold/20 text-gold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            {story.type}
                                        </div>
                                        {/* Photo count */}
                                        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-noir/70 backdrop-blur-sm border border-white/10 text-white/60 text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400">
                                            <Camera size={10} /> {story.images.length} photos
                                        </div>
                                    </div>

                                    {/* CARD BODY */}
                                    <div className="p-6">
                                        <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors duration-300 mb-1">{story.couple}</h3>
                                        <p className="text-gold/60 text-sm italic font-serif font-light mb-4">"{story.tagline}"</p>

                                        <div className="flex flex-col gap-2 mb-5">
                                            <div className="flex items-center gap-2 text-white/40 text-xs">
                                                <Calendar size={12} className="text-gold/60 flex-shrink-0" />
                                                <span>{story.date}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-white/40 text-xs">
                                                <MapPin size={12} className="text-gold/60 flex-shrink-0 mt-0.5" />
                                                <span>{story.venue}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {story.services.slice(0, 3).map(s => (
                                                <span key={s} className="text-[8px] uppercase tracking-wider border border-white/10 text-white/30 px-2 py-1 rounded-full">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-medium group-hover:gap-4 transition-all duration-300">
                                            <span>View Story</span>
                                            <ArrowRight size={13} />
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── BOTTOM CTA ──────────────────────────── */}
                <Reveal className="text-center py-16 px-6 border-t border-white/5">
                    <p className="text-white/40 text-sm font-light mb-4 uppercase tracking-widest">Become our next story</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
                        Your Love Deserves a<br />
                        <span className="italic text-gold font-light">Cinematic Legacy</span>
                    </h2>
                    <Link to="/quote">
                        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            className="px-12 py-5 bg-gold text-noir font-bold uppercase tracking-[0.2em] text-sm rounded-sm hover:shadow-gold-lg transition-all duration-300">
                            Start Your Story →
                        </motion.button>
                    </Link>
                </Reveal>
            </main>

            {/* ── STORY LIGHTBOX ──────────────────────── */}
            <AnimatePresence>
                {activeStory && (
                    <StoryLightbox story={activeStory} onClose={() => setActiveStory(null)} />
                )}
            </AnimatePresence>

            <PremiumFooter />
        </div>
    );
}
