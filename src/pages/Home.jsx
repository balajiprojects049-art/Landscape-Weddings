import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';
import LuxuryHeroSection from '../components/LuxuryHeroSection';
import PremiumFooter from '../components/PremiumFooter';
import { ArrowRight, Quote as QuoteIcon, Star, Heart, Camera, Video, Award } from 'lucide-react';

// ── Reusable animated reveal ──────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
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

// ── Gallery images ─────────────────────────────────────────────────────────
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
        label: 'Royal Ceremony',
        span: 'row-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
        label: 'Golden Hour',
        span: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1532712938730-4e36c56b1bf1?q=80&w=2070&auto=format&fit=crop',
        label: 'Sacred Moments',
        span: '',
    },
    {
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop',
        label: 'Editorial Style',
        span: 'col-span-2',
    },
];

// ── Services data ──────────────────────────────────────────────────────────
const services = [
    {
        icon: Camera,
        title: 'Candid Photography',
        desc: 'Artistic, unposed photographs that capture the raw emotion, joy, and beauty of your wedding day as it naturally unfolds.',
    },
    {
        icon: Video,
        title: 'Cinematic Films',
        desc: 'Breathtaking wedding films crafted like feature movies, scored to music that moves the soul and preserves your story forever.',
    },
    {
        icon: Award,
        title: 'Complete Coverage',
        desc: 'From intimate mehendi to grand receptions — every ritual, every emotion, every detail captured with royal precision.',
    },
];

// ── Testimonials ───────────────────────────────────────────────────────────
const testimonials = [
    {
        name: 'Priya & Arjun',
        location: 'Mumbai',
        text: '"When you hire Landscape Weddings, you are not just paying for our time and skill, but for the pure joy and positive energy they bring to your most sacred day. Our album made us cry with happiness."',
        rating: 5,
    },
    {
        name: 'Sneha & Karan',
        location: 'Hyderabad',
        text: '"They captured moments we didn\'t even know were happening. Every frame is a work of art. The cinematic film left our entire family speechless. Truly a once-in-a-lifetime experience."',
        rating: 5,
    },
    {
        name: 'Divya & Rahul',
        location: 'Bangalore',
        text: '"From our engagement shoot to the final reception, Landscape was present in every heartbeat. The photos are so cinematic and emotional. We could not have chosen better."',
        rating: 5,
    },
];

// ── WHY US data ────────────────────────────────────────────────────────────
const reasons = [
    { title: 'Emotional Storytellers', desc: 'We capture feelings, not just faces — your wedding album should make you cry happy tears every time.' },
    { title: 'Royal Aesthetic', desc: 'Every frame is composed with the eye of a fine art director, ensuring your memories are truly museum-worthy.' },
    { title: 'Dedicated Team', desc: 'The same experienced team from proposal to delivery — no strangers at your wedding.' },
    { title: 'Luxury Delivery', desc: 'Premium hand-crafted albums, offline-ready USB drives, and private online galleries for you and your family.' },
];

// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

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
            <section className="relative py-28 md:py-36 overflow-hidden">
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
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
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

            {/* ── FEEL THE MOMENT (full-width editorial) ─────────── */}
            <section className="relative h-[80vh] overflow-hidden my-4">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1974&auto=format&fit=crop)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/60 to-transparent" />
                <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto">
                    <div className="max-w-2xl">
                        <Reveal>
                            <span className="text-gold text-xs uppercase tracking-[0.5em] font-medium block mb-6">Feel The Moment</span>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-8">
                                Forever<br /><span className="text-gold italic font-light">Artistic</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.25}>
                            <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
                                Artful compositions that transcend the ordinary. Each photograph is a canvas on which your love story is painted with light, emotion and mastery.
                            </p>
                        </Reveal>
                        <Reveal delay={0.35}>
                            <Link to="/portfolio">
                                <button className="group flex items-center gap-3 text-white text-sm uppercase tracking-widest hover:text-gold transition-colors">
                                    Explore Our Artistic Work
                                    <span className="h-px w-10 bg-gold group-hover:w-20 transition-all duration-500" />
                                </button>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── GALLERY GRID ──────────────────────────────────── */}
            <section className="py-24 md:py-32 px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto">
                <SectionHeading
                    eyebrow="Our Portfolio"
                    title="Cinematic"
                    highlight="Moments"
                    subtitle="A curated selection of our finest work — each image a chapter in an eternal story."
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {galleryImages.map((img, i) => (
                        <Reveal key={i} delay={i * 0.08} className={img.span}>
                            <div className={`relative overflow-hidden rounded-lg group cursor-pointer ${img.span === 'row-span-2' ? 'row-span-2' : ''} ${img.span === 'col-span-2' ? 'col-span-2' : ''}`}>
                                <div
                                    className="w-full h-full min-h-[300px] md:min-h-[400px] bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                                    style={{ backgroundImage: `url(${img.src})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6">
                                    <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-medium mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">Editorial</span>
                                    <h4 className="font-serif text-2xl text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{img.label}</h4>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link to="/portfolio">
                        <button className="px-10 py-4 border border-gold/40 text-gold text-sm uppercase tracking-widest hover:bg-gold/10 hover:border-gold transition-all duration-300 rounded-sm">
                            View Full Portfolio
                        </button>
                    </Link>
                </div>
            </section>

            {/* ── WHY US ────────────────────────────────────────── */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <Reveal className="relative">
                        <div
                            className="w-full h-[600px] bg-cover bg-center rounded-xl overflow-hidden"
                            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop)' }}
                        />
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

            {/* ── TESTIMONIALS ─────────────────────────────────── */}
            <section className="py-24 md:py-32 relative overflow-hidden bg-noir-100">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[70vw] h-[50vh] rounded-full bg-gold/4 blur-[200px]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <SectionHeading eyebrow="Client Stories" title="Words of" highlight="Love" />

                    <div className="relative min-h-[220px] flex items-center justify-center">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 flex flex-col items-center"
                                initial={{ opacity: 0, y: 30 }}
                                animate={i === activeTestimonial ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <Star key={j} size={16} className="text-gold fill-gold" />
                                    ))}
                                </div>
                                <p className="font-serif text-xl md:text-2xl text-white/80 italic leading-relaxed mb-8 font-light">{t.text}</p>
                                <p className="font-cinzel text-gold text-sm font-semibold tracking-wider">{t.name}</p>
                                <p className="text-white/40 text-xs tracking-widest uppercase mt-1">{t.location}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-3 mt-16">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`h-px transition-all duration-500 ${i === activeTestimonial ? 'w-12 bg-gold' : 'w-4 bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BUILD QUOTE CTA BLOCK ─────────────────────────── */}
            <section className="relative py-32 md:py-40 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-30"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=2000&auto=format&fit=crop)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/80 to-noir/50" />
                <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-16">
                    <div className="max-w-3xl">
                        <Reveal>
                            <span className="text-gold text-xs uppercase tracking-[0.4em] font-medium block mb-6 flex items-center gap-3">
                                <span className="h-px w-8 bg-gold opacity-60" /> Ready to Begin?
                            </span>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-8">
                                Design Your<br /><span className="text-gold italic font-light">Royal Wedding</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-white/60 text-lg font-light leading-relaxed mb-12 max-w-xl">
                                Use our interactive quote builder to craft a completely bespoke package — tailored precisely to every event, style, and vision you have.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/quote">
                                    <button className="group flex items-center gap-3 px-10 py-5 bg-gold text-noir font-bold text-sm uppercase tracking-widest rounded-sm hover:shadow-gold-lg transition-all duration-300 hover:scale-105">
                                        Build My Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <Link to="/contact">
                                    <button className="px-10 py-5 border border-white/20 hover:border-gold/50 text-white/70 hover:text-white text-sm uppercase tracking-widest transition-all duration-300 rounded-sm">
                                        Contact Studio
                                    </button>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <PremiumFooter />
        </div>
    );
}
