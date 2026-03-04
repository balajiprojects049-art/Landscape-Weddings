import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';
import LuxuryHeroSection from '../components/LuxuryHeroSection';
import PremiumFooter from '../components/PremiumFooter';
import { ArrowRight, Quote as QuoteIcon, Star, Heart, Camera, Video, Award, ChevronLeft, ChevronRight, Aperture, Film, Crown } from 'lucide-react';

// Preload first hero image for fast LCP
const preloadLink = document.createElement('link');
preloadLink.rel = 'preload';
preloadLink.as = 'image';
preloadLink.href = '/PC/01.jpg';
document.head.appendChild(preloadLink);

// ── Reusable animated reveal (optimized: faster, less movement) ───────────
function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

// ── Section heading component ─────────────────────────────────────────────
function SectionHeading({ eyebrow, title, highlight, subtitle }) {
    return (
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <Reveal>
                <div className="flex items-center gap-4 mb-4">
                    <span className="h-px w-8 bg-gold opacity-60" />
                    <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-medium">{eyebrow}</span>
                    <span className="h-px w-8 bg-gold opacity-60" />
                </div>
            </Reveal>
            <Reveal delay={0.1}>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                    {title} <span className="italic text-gold font-light">{highlight}</span>
                </h2>
            </Reveal>
            {subtitle && (
                <Reveal delay={0.2}>
                    <p className="text-white/50 max-w-xl leading-relaxed font-light">{subtitle}</p>
                </Reveal>
            )}
            <Reveal delay={0.3}>
                <div className="gold-divider w-24 mt-6" />
            </Reveal>
        </div>
    );
}

// ── Scroll-driven Gallery images ───────────────────────────────────────────────────
const scrollGallery = [
    {
        src: '/IMG_1164.JPG.jpeg',
        label: 'Eternal Vows',
        caption: 'Every vow, every tear, every smile — preserved for eternity.',
        tag: '01 / Ceremonies',
    },
    {
        src: '/IMG_1174.JPG.jpeg',
        label: 'Golden Hour',
        caption: 'The magic that lives between dusk and devotion.',
        tag: '02 / Portraits',
    },
    {
        src: '/IMG_2248.JPG.jpeg',
        label: 'Sacred Rituals',
        caption: 'Ancient traditions captured with a modern, artistic eye.',
        tag: '03 / Rituals',
    },
    {
        src: '/IMG_2636.JPG.jpeg',
        label: 'Candid Grace',
        caption: "The moments you didn't know were happening — we did.",
        tag: '04 / Candid',
    },
    {
        src: '/IMG_2643.JPG.jpeg',
        label: 'Editorial Art',
        caption: 'Frames composed like fine art, worthy of every wall.',
        tag: '05 / Editorial',
    },
    {
        src: '/IMG_2841.JPG.jpeg',
        label: 'The Legacy',
        caption: 'Two souls, one story — crafted to be remembered forever.',
        tag: '06 / Forever',
    },
];

// ── Scroll Gallery — Card Stack Slide-Up ──────────────────────────────────────────
function GalleryPanel({ item, index, total, scrollYProgress }) {
    const y = useTransform(
        scrollYProgress,
        [index / total - 1 / total, index / total],
        ['100%', '0%']
    );
    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: index + 1 }}>
            <motion.img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ y: index === 0 ? 0 : y }}
            />

            <div className="absolute top-20 md:top-24 left-6 md:left-16 z-20 flex items-center gap-3">
                <span className="h-px w-6 md:w-8 bg-gold opacity-60" />
                <span className="text-gold text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-medium">Our Portfolio</span>
            </div>

            <div className="absolute bottom-32 md:bottom-16 left-6 md:left-16 z-20 max-w-[85vw] md:max-w-xl pr-4">
                <p className="text-gold/80 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-medium mb-2 md:mb-3">{item.tag}</p>
                <h3 className="font-serif text-3xl md:text-6xl lg:text-7xl text-white leading-tight mb-3 md:mb-4">{item.label}</h3>
                <p className="font-serif text-sm md:text-xl text-white/55 italic font-light leading-relaxed truncate-2-lines">"{item.caption}"</p>
                <div className="mt-6 md:mt-8">
                    <Link to="/portfolio">
                        <button className="flex items-center gap-2 md:gap-3 text-white text-[10px] md:text-xs uppercase tracking-widest hover:text-gold transition-colors group">
                            View Full Portfolio
                            <span className="h-px w-6 md:w-8 bg-gold group-hover:w-16 transition-all duration-500" />
                        </button>
                    </Link>
                </div>
            </div>

            <div className="absolute right-6 md:right-12 bottom-32 md:bottom-16 z-20 flex flex-col items-center gap-2">
                <span className="font-cinzel text-gold text-xl md:text-2xl font-bold leading-none">{String(index + 1).padStart(2, '0')}</span>
                <span className="h-px w-4 bg-gold/30" />
                <span className="text-white/30 text-[10px] md:text-xs font-light">{String(total).padStart(2, '0')}</span>
            </div>

            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
                {Array.from({ length: total }).map((_, i) => (
                    <div key={i} className="w-px bg-gold rounded-full" style={{ height: i === index ? '2rem' : '0.4rem', opacity: i === index ? 1 : 0.2 }} />
                ))}
            </div>
        </div>
    );
}

function ScrollGallery() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
    return (
        <section ref={containerRef} style={{ height: `${scrollGallery.length * 100}vh` }} className="relative">
            {scrollGallery.map((item, index) => (
                <GalleryPanel key={index} item={item} index={index} total={scrollGallery.length} scrollYProgress={scrollYProgress} />
            ))}
        </section>
    );
}

// ── Marquee Gallery images ───────────────────────────────────────────────────
const marqueeRow1 = [
    { src: '/IMG_2854.JPG.jpeg', label: 'Royal Ceremony' },
    { src: '/IMG_0211.JPG.jpeg', label: 'Golden Hour' },
    { src: '/IMG_1167.JPG.jpeg', label: 'Sacred Rituals' },
    { src: '/IMG_2643.JPG.jpeg', label: 'Editorial' },
    { src: '/IMG_2279.JPG.jpeg', label: 'Forever Together' },
    { src: '/IMG_2846.JPG.jpeg', label: 'Candid Emotions' },
];
const marqueeRow2 = [
    { src: '/IMG_0449.JPG.jpeg', label: 'Romantic Portraits' },
    { src: '/IMG_0887.JPG.jpeg', label: 'Bridal Moments' },
    { src: '/IMG_2319.JPG.jpeg', label: 'Grand Reception' },
    { src: '/IMG_2831.JPG.jpeg', label: 'The First Dance' },
    { src: '/IMG_3846.JPG.jpeg', label: 'Love & Joy' },
    { src: '/IMG_1181.JPG.jpeg', label: 'Mehendi Glow' },
];

// ── Marquee Gallery Component ──────────────────────────────────────────────────
function MarqueeStrip({ images, direction = 'left', speed = 40 }) {
    // Duplicate for seamless loop
    const doubled = [...images, ...images];
    return (
        <div className="overflow-hidden w-full">
            <motion.div
                className="flex gap-4"
                animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
                style={{ width: 'max-content' }}
            >
                {doubled.map((img, i) => (
                    <div
                        key={i}
                        className="relative flex-shrink-0 w-72 md:w-96 h-56 md:h-72 rounded-xl overflow-hidden group cursor-pointer"
                    >
                        <img
                            src={img.src}
                            alt={img.label}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <p className="text-gold text-[9px] uppercase tracking-[0.4em] font-medium">Landscape Weddings</p>
                            <h4 className="font-serif text-lg text-white mt-1">{img.label}</h4>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

function MarqueeGallery() {
    return (
        <section className="py-20 md:py-28 overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mb-12">
                <Reveal>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-px w-8 bg-gold opacity-60" />
                                <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-medium">Our Portfolio</span>
                            </div>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                                Cinematic <span className="italic text-gold font-light">Moments</span>
                            </h2>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-white/45 text-sm max-w-xs leading-relaxed font-light">
                                A curated selection of our finest work — each image a chapter in an eternal story.
                            </p>
                            <Link to="/portfolio">
                                <button className="flex items-center gap-3 text-gold text-xs uppercase tracking-widest hover:gap-6 transition-all duration-300 group font-medium">
                                    View Full Portfolio <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="flex flex-col gap-4">
                <MarqueeStrip images={marqueeRow1} direction="left" speed={45} />
                <MarqueeStrip images={marqueeRow2} direction="right" speed={38} />
            </div>
        </section>
    );
}


// ── Services data ──────────────────────────────────────────────────────────
const services = [
    {
        icon: Aperture,
        title: 'Candid Photography',
        desc: 'Artistic, unposed photographs that capture the raw emotion, joy, and beauty of your wedding day as it naturally unfolds.',
    },
    {
        icon: Film,
        title: 'Cinematic Films',
        desc: 'Breathtaking wedding films crafted like feature movies, scored to music that moves the soul and preserves your story forever.',
    },
    {
        icon: Crown,
        title: 'Complete Coverage',
        desc: 'From intimate mehendi to grand receptions — every ritual, every emotion, every detail captured with royal precision.',
    },
];

// ── Google Reviews (Real) ──────────────────────────────────────────────────
const testimonials = [
    {
        name: 'Chaitanya & Reshma',
        date: '20 Mar 2024',
        text: "Subba reddy & his team have done a commendable job for many events such as wedding, pre wedding, birthday party, baby shoot. We've liked the output and referred landscape to friends & family. Quality output delivered at reasonable price. Highly recommend",
        rating: 5,
        initial: 'C',
        color: '#2d6a4f',
        img: '/Reviews/01 Chaitanya & Reshma.jpg',
    },
    {
        name: 'Bindu & Shushank',
        date: '30 Dec 2024',
        text: 'The wedding photos were absolutely stunning and elegant. They captured every beautiful moment of our special day. The photographer was incredibly professional and making everyone feel comfortable through out day. The memories captured were worth every penny. I highly recommend this photography professional artist for their big day. Thank you for being part of my beautiful memories.',
        rating: 5,
        initial: 'B',
        color: '#1b4332',
        img: '/Reviews/02 Bindu & Shushank.JPG',
    },
    {
        name: 'Vinay & Ramya',
        date: '16 weeks ago',
        text: 'So professional from the beginning until the end. Very friendly. They knew how to get the best shots and photos turned out so beautiful. They respond very quickly. Delivered the albums and videos on time. Highly recommended for any event.',
        rating: 5,
        initial: 'V',
        color: '#6b3fa0',
        img: '/Reviews/03 Vinay & Ramya.JPG',
    },
    {
        name: 'Vineela & Vishnu',
        date: '9 weeks ago',
        text: "We had a wonderful experience with landscape wedding photography team for our wedding. He was very professional, friendly, and made us feel comfortable throughout. The candid, traditional, and cinematic shots were captured beautifully, and every moment was documented perfectly. We're so happy to see our wedding pictures featured here. Highly recommended! — Vineela & Vishnu",
        rating: 5,
        initial: 'V',
        color: '#7b2d8b',
        img: '/Reviews/04 Vineela & Vishnu.jpg',
    },
    {
        name: 'Akhila & Bharath',
        date: '4 weeks ago',
        text: 'The team is very good, well communicated and awesome photography skills. Videos and photos came out exceptionally well. Thanks for giving us good memories.',
        rating: 5,
        initial: 'A',
        color: '#8b4513',
        img: '/Reviews/05 Akhila & Bharath.jpg',
    },
    {
        name: 'Achuth & Varija',
        date: '15 Oct 2023',
        text: 'I had a great time working with LSP. They are all a wonderful and hard working team. Very easy to work with. I would highly recommend LSP for all your events.',
        rating: 5,
        initial: 'A',
        color: '#c0392b',
        img: '/Reviews/06 Achuth & Varija.JPG',
    },
    {
        name: 'Harsha & Anusha',
        date: '3 weeks ago',
        text: 'Amazing experience with the Landscape Photography team. All the photos came out beautifully, especially the candid shots which are our absolute favorites. The staff is incredibly friendly and made the entire process so easy for us. One of the best parts is that they provide a link containing all the wedding photos that we can access and use for a lifetime. If you want your memories captured beautifully and stored safely, go with them.',
        rating: 5,
        initial: 'H',
        color: '#1a5276',
        img: '/Reviews/07 Harsha & Lakshmi.JPG.jpeg',
    },
    {
        name: 'Roja & Kodanda',
        date: '2 days ago',
        text: "Our heartfelt thanks to Team Sathish, Gopikrishna, Chandu, Ravi, and Akhil for capturing the most precious moments of our wedding so beautifully. From the emotional muhurtam moments to the joyful celebrations, every picture reflects your dedication, creativity, and passion. You didn't just take photos — you preserved memories that we will cherish for a lifetime. Your teamwork, patience, and attention to every small detail truly made our big day even more special. We felt comfortable, guided, and confident throughout, all because of your wonderful support. We are beyond grateful for your hard work and for giving us such timeless memories. Thank you for being such an amazing team and for making our wedding unforgettable. ✨📷💛",
        rating: 5,
        initial: 'R',
        color: '#922b21',
        img: '/Reviews/08 Roja & Ajay.jpg',
    },
];

// ── WHY US data ────────────────────────────────────────────────────────────
const reasons = [
    { title: 'Emotional Storytellers', desc: 'We capture feelings, not just faces — your wedding album should make you cry happy tears every time.' },
    { title: 'Royal Aesthetic', desc: 'Every frame is composed with the eye of a fine art director, ensuring your memories are truly museum-worthy.' },
    { title: 'Dedicated Team', desc: 'The same experienced team from proposal to delivery — no strangers at your wedding.' },
    { title: 'Luxury Delivery', desc: 'Premium hand-crafted albums, offline-ready USB drives, and private online galleries for you and your family.' },
];

// ── YOUTUBE VIDEOS DATA ───────────────────────────────────────────────────
const youtubeVideos = [
    "https://www.youtube.com/embed/lO6AZZbT6Xw", // 1. Already added
    "https://www.youtube.com/embed/mwcwPh9d95E",  // 2.
    "https://www.youtube.com/embed/1DDwp6dUc6Q",  // 3.
    "https://www.youtube.com/embed/YHLg_rbTaVA",  // 4.
    "https://www.youtube.com/embed/lLHlvddKeBo",  // 5.
    "https://www.youtube.com/embed/4AimPeYr1Ac",  // 6.
    "https://www.youtube.com/embed/lO6AZZbT6Xw",  // 7. (Duplicate of 1)
    "https://www.youtube.com/embed/mwcwPh9d95E",  // 8. (Duplicate of 2)
];

// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [videoSlide, setVideoSlide] = useState(0);
    const totalVideoSlides = Math.ceil(youtubeVideos.length / 4);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-noir min-h-screen text-white">
            <AnimatedHeader />

            {/* ── HERO ──────────────────────────────────────────── */}
            <LuxuryHeroSection />

            {/* ── BRAND STATEMENT ───────────────────────────────── */}
            <section className="relative pt-10 pb-4 md:pt-16 md:pb-8 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[60vw] h-[40vh] rounded-full bg-gold/5 blur-[150px]" />
                </div>
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <Reveal>
                        <QuoteIcon size={40} className="text-gold/30 mx-auto mb-8" />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/90 leading-tight font-light italic">
                            "When you hire us, you&rsquo;re not only paying for our time and skill — but also for the added joy and{' '}
                            <span className="text-gold font-medium not-italic">positive energy</span> we bring to your wedding day."
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="mt-8 text-gold/70 uppercase tracking-[0.4em] text-xs font-medium">— The Landscape Promise</p>
                    </Reveal>
                </div>
            </section>

            {/* ── SERVICES ──────────────────────────────────────── */}
            <section className="pt-10 pb-24 md:pt-12 md:pb-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                <SectionHeading
                    eyebrow="What We Offer"
                    title="Our"
                    highlight="Services"
                    subtitle="A complete suite of royal wedding documentation — from candid moments to cinematic masterpieces."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((svc, i) => {
                        const Icon = svc.icon;
                        return (
                            <Reveal key={svc.title} delay={i * 0.12}>
                                <div className="group glass border border-gold/10 rounded-xl p-10 flex flex-col gap-6 hover:border-gold/30 hover:shadow-gold transition-all duration-500">
                                    <div className="p-4 rounded-full w-fit bg-gold/10 group-hover:bg-gold/20 transition-colors">
                                        <Icon size={28} className="text-gold" />
                                    </div>
                                    <h3 className="font-serif text-2xl text-white">{svc.title}</h3>
                                    <p className="text-white/50 leading-relaxed font-light text-sm">{svc.desc}</p>
                                    <Link to="/quote" className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest hover:gap-4 transition-all duration-300 font-medium mt-auto">
                                        Book Now <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* ── SCROLL GALLERY ────────────────────────────────────── */}
            <ScrollGallery />

            {/* ── MARQUEE GALLERY ────────────────────────────────────── */}
            <MarqueeGallery />

            {/* ── YOUTUBE VIDEOS BLOCK ─────────────────────────── */}
            <section className="pt-10 pb-24 md:pt-12 md:pb-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center">
                <SectionHeading
                    eyebrow="Cinematic Films"
                    title="Watch Our"
                    highlight="Masterpieces"
                    subtitle="Immerse yourself in the magic and emotion of our cinematic wedding videos."
                />

                <div className="relative mt-8 group/slider">
                    {/* Left Arrow */}
                    <button
                        onClick={() => setVideoSlide(prev => (prev - 1 + totalVideoSlides) % totalVideoSlides)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-10 w-12 h-12 rounded-full bg-noir border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-noir transition-all duration-300"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <div className="overflow-hidden mx-8">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${videoSlide * (100 / totalVideoSlides)}%` }}
                            transition={{ ease: "easeInOut", duration: 0.6 }}
                            style={{ width: `${totalVideoSlides * 100}%` }}
                        >
                            {Array.from({ length: totalVideoSlides }).map((_, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-2"
                                    style={{ width: `${100 / totalVideoSlides}%` }}
                                >
                                    {youtubeVideos.slice(slideIndex * 4, slideIndex * 4 + 4).map((src, i) => (
                                        <div key={i} className="min-w-0">
                                            <div className="aspect-video w-full rounded-xl overflow-hidden">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={src}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => setVideoSlide(prev => (prev + 1) % totalVideoSlides)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-10 w-12 h-12 rounded-full bg-noir border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-noir transition-all duration-300"
                    >
                        <ChevronRight size={22} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-3 mt-8">
                        {Array.from({ length: totalVideoSlides }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setVideoSlide(i)}
                                className={`h-px transition-all duration-500 ${i === videoSlide ? 'w-12 bg-gold' : 'w-4 bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY US ────────────────────────────────────────── */}
            <section className="pt-10 pb-10 md:pt-12 md:pb-16 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <Reveal className="relative">
                        <div className="w-full h-[600px] relative rounded-xl overflow-hidden">
                            <img
                                src="/IMG_3907.JPG.jpeg"
                                alt="Why Landscape Weddings"
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 hidden md:flex glass border border-gold/20 rounded-xl p-6 flex-col items-center gap-1 shadow-gold">
                            <span className="font-cinzel text-4xl font-bold text-gold">500+</span>
                            <span className="text-white/60 text-xs uppercase tracking-widest">Weddings Covered</span>
                        </div>
                    </Reveal>

                    <div className="flex flex-col gap-6">
                        <Reveal>
                            <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-medium flex items-center gap-3">
                                <span className="h-px w-8 bg-gold opacity-60" /> Why Choose Us
                            </span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                                Why Are We <span className="italic text-gold font-light">The Right Choice?</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-white/50 leading-relaxed font-light text-lg">
                                We are artists first, photographers second. Our team brings expertise, passion, and deep emotional intelligence to every single wedding we document.
                            </p>
                        </Reveal>

                        <div className="flex flex-col gap-4 mt-4">
                            {reasons.map((r, i) => (
                                <Reveal key={r.title} delay={0.3 + i * 0.1}>
                                    <div className="flex gap-5 glass border border-gold/10 rounded-lg p-5 hover:border-gold/25 transition-all duration-300 group">
                                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-gold/30 transition-colors">
                                            <Heart size={14} className="text-gold fill-gold/50" />
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-lg text-white mb-1">{r.title}</h4>
                                            <p className="text-white/45 text-sm leading-relaxed font-light">{r.desc}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.7}>
                            <Link to="/quote">
                                <button className="group flex items-center gap-3 mt-4 px-8 py-4 bg-gold text-noir font-bold text-sm uppercase tracking-widest rounded-sm hover:shadow-gold transition-all duration-300 hover:scale-105 w-fit">
                                    Schedule a Call <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── GOOGLE REVIEWS SLIDER ─────────────────────────── */}
            <section className="pt-16 pb-20 md:pt-20 md:pb-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)' }}>
                {/* Ambient glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[60vw] h-[40vh] rounded-full blur-[180px]" style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />
                </div>

                <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">
                    {/* Heading */}
                    <SectionHeading eyebrow="Google Reviews" title="Words of" highlight="Love" subtitle="Real experiences from our cherished clients — verified on Google." />

                    {/* Slider wrapper */}
                    <div className="relative">

                        {/* Card container — fixed height so all reviews look uniform */}
                        <div className="rounded-2xl overflow-hidden relative" style={{ border: '1px solid rgba(212,175,55,0.16)', height: '440px' }}>
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={false}
                                    animate={i === activeTestimonial ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
                                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: i !== activeTestimonial ? 'none' : 'auto' }}
                                    className="flex flex-col md:flex-row w-full h-full"
                                >
                                    {/* LEFT — Big full-height image + reviewer name overlaid at bottom */}
                                    <div className="relative flex-shrink-0 md:w-[40%] h-48 md:h-full overflow-hidden">
                                        <img
                                            src={t.img}
                                            alt={t.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        {/* Gradient overlay for readability */}
                                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.0) 100%)' }} />
                                        {/* Gold accent bar on the left */}
                                        <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'linear-gradient(to bottom, #d4af37, rgba(212,175,55,0.1))' }} />
                                        {/* Reviewer name + meta pinned to bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                                            <p className="font-cinzel font-bold text-xl leading-tight" style={{ color: '#d4af37' }}>{t.name}</p>
                                            <p className="text-xs mt-1.5 font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.meta}</p>
                                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Google Review</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT — Stars, Date, full review text — fills height with space-between */}
                                    <div
                                        className="flex-1 flex flex-col justify-between px-8 md:px-14 py-10 md:py-12 h-full overflow-hidden"
                                        style={{ background: 'rgba(255,255,255,0.025)', borderLeft: '1px solid rgba(212,175,55,0.1)' }}
                                    >
                                        {/* TOP: Stars + Date */}
                                        <div>
                                            <div className="flex items-center gap-4 mb-5">
                                                <div className="flex gap-1">
                                                    {Array.from({ length: t.rating }).map((_, j) => (
                                                        <Star key={j} size={20} fill="#FCC419" color="#FCC419" />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.date}</span>
                                            </div>
                                            {/* Big quote mark */}
                                            <QuoteIcon size={32} className="mb-4" style={{ color: 'rgba(212,175,55,0.2)' }} />
                                            {/* Review text — clamp to avoid overflow on very long reviews */}
                                            <p
                                                className="font-serif leading-relaxed font-light"
                                                style={{
                                                    color: 'rgba(255,255,255,0.85)',
                                                    fontSize: t.text.length > 300 ? '0.95rem' : '1.1rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: t.text.length > 300 ? 9 : 20,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {t.text}
                                            </p>
                                        </div>
                                        {/* BOTTOM: Gold accent line */}
                                        <div className="pt-6">
                                            <div className="h-px w-24" style={{ background: 'linear-gradient(to right, #d4af37, transparent)' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Prev Arrow */}
                        <button
                            id="reviews-prev"
                            onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                            style={{ background: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.35)', color: '#d4af37', left: '-22px' }}
                            className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Next Arrow */}
                        <button
                            id="reviews-next"
                            onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
                            style={{ background: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.35)', color: '#d4af37', right: '-22px' }}
                            className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-3 mt-10 items-center">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                style={{
                                    width: i === activeTestimonial ? '2.5rem' : '0.5rem',
                                    height: '4px',
                                    borderRadius: '9999px',
                                    background: i === activeTestimonial ? '#d4af37' : 'rgba(255,255,255,0.2)',
                                    transition: 'all 0.5s ease',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </div>

                    {/* Slide counter */}
                    <p className="text-center mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
                        {String(activeTestimonial + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </p>
                </div>
            </section>

            <PremiumFooter />
        </div>
    );
}
