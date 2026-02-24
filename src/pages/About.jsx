import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeader from '../components/AnimatedHeader';
import PremiumFooter from '../components/PremiumFooter';
import { Heart, Award, Camera, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function Reveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.15 });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >{children}</motion.div>
    );
}

const timeline = [
    { year: '2012', title: 'The Beginning', desc: 'Founded with a single camera and a vision to document weddings as cinematic art, not just events.' },
    { year: '2015', title: 'First Award', desc: 'Recognized at the South India Wedding Photography Awards for Best Candid Photography.' },
    { year: '2018', title: 'Studio Expansion', desc: 'Launched our full Cinematic Films division with a dedicated post-production team.' },
    { year: '2021', title: 'National Recognition', desc: 'Featured in Vogue India and named one of the Top 10 Wedding Studios in India.' },
    { year: '2024', title: 'Today & Beyond', desc: '500+ weddings documented, an international portfolio, and an unwavering commitment to royal excellence.' },
];

const team = [
    { name: 'Arjun Mehta', role: 'Lead Photographer & Creative Director', img: 'https://i.pravatar.cc/400?img=12' },
    { name: 'Priya Sharma', role: 'Cinematic Films Director', img: 'https://i.pravatar.cc/400?img=16' },
    { name: 'Karan Patel', role: 'Senior Candid Photographer', img: 'https://i.pravatar.cc/400?img=14' },
    { name: 'Divya Rao', role: 'Album Design & Client Experience', img: 'https://i.pravatar.cc/400?img=18' },
];

export default function About() {
    return (
        <div className="bg-noir min-h-screen text-white">
            <AnimatedHeader />

            <main>
                {/* HERO */}
                <section className="relative h-[70vh] overflow-hidden flex items-end pb-16">
                    <div className="absolute inset-0 bg-cover bg-center brightness-40"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=2000&auto=format&fit=crop)' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
                    <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 w-full">
                        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="text-gold text-xs uppercase tracking-[0.5em] font-medium block mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-gold" /> Our Story
                        </motion.span>
                        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}
                            className="font-serif text-5xl md:text-7xl text-white leading-tight">
                            We Are <span className="italic text-gold font-light">Landscape</span><br />Weddings
                        </motion.h1>
                    </div>
                </section>

                {/* FOUNDER SECTION */}
                <section className="py-24 md:py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <Reveal>
                            <div className="relative">
                                <div className="w-full aspect-[3/4] bg-cover bg-center rounded-2xl overflow-hidden"
                                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop)' }} />
                                <div className="absolute -bottom-4 -right-4 glass border border-gold/20 rounded-xl p-5 shadow-gold">
                                    <p className="font-cinzel text-3xl font-bold text-gold">12+</p>
                                    <p className="text-white/50 text-xs uppercase tracking-widest">Years of Legacy</p>
                                </div>
                            </div>
                        </Reveal>
                        <div className="flex flex-col gap-6">
                            <Reveal>
                                <span className="text-gold text-xs uppercase tracking-[0.5em] font-medium flex items-center gap-3">
                                    <span className="h-px w-8 bg-gold opacity-60" /> The Founder
                                </span>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
                                    A Vision Born From <span className="italic text-gold font-light">Pure Love</span>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p className="text-white/60 leading-relaxed font-light text-lg">
                                    "I started Landscape Weddings because I believed that every couple deserves to have their love story preserved as a timeless cinematic masterpiece — not a photograph album that gathers dust on a shelf."
                                </p>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-white/50 leading-relaxed font-light">
                                    Over 12 years, we have built a team of visual artists, storytellers, and emotion-catchers who bring their whole heart to every single wedding. Our philosophy is simple: <strong className="text-white font-medium">feel first, shoot second.</strong>
                                </p>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="flex gap-8 mt-4">
                                    {[
                                        { n: '500+', l: 'Weddings' },
                                        { n: '50+', l: 'Awards' },
                                        { n: '100%', l: 'Dedication' },
                                    ].map((s) => (
                                        <div key={s.n} className="flex flex-col">
                                            <span className="font-cinzel text-3xl font-bold text-gold">{s.n}</span>
                                            <span className="text-white/40 text-xs uppercase tracking-widest">{s.l}</span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* TIMELINE */}
                <section className="py-24 md:py-32 px-8 md:px-16 max-w-[900px] mx-auto">
                    <Reveal className="text-center mb-16">
                        <span className="text-gold text-xs uppercase tracking-[0.5em] font-medium flex items-center justify-center gap-3 mb-4">
                            <span className="h-px w-8 bg-gold opacity-60" /> Our Journey <span className="h-px w-8 bg-gold opacity-60" />
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-white">A Decade of <span className="italic text-gold font-light">Legacy</span></h2>
                        <div className="gold-divider w-24 mx-auto mt-6" />
                    </Reveal>

                    <div className="relative">
                        {/* Vertical gold line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent md:-translate-x-1/2" />

                        <div className="flex flex-col gap-12">
                            {timeline.map((item, i) => (
                                <Reveal key={item.year} delay={i * 0.1}>
                                    <div className={`flex items-start gap-8 relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} pl-12 md:pl-0`}>
                                        {/* Dot */}
                                        <div className="absolute left-[13px] md:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-noir shadow-gold-sm md:-translate-x-1/2 mt-1.5" />

                                        <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                                            <span className="font-cinzel text-gold font-bold text-2xl">{item.year}</span>
                                        </div>
                                        <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:text-right md:pr-12'}`}>
                                            <h3 className="font-serif text-xl text-white mb-2">{item.title}</h3>
                                            <p className="text-white/50 font-light leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TEAM */}
                <section className="py-24 md:py-32 px-8 md:px-16 max-w-[1400px] mx-auto">
                    <Reveal className="text-center mb-16">
                        <span className="text-gold text-xs uppercase tracking-[0.5em] font-medium flex items-center justify-center gap-3 mb-4">
                            <span className="h-px w-8 bg-gold opacity-60" /> The Artists <span className="h-px w-8 bg-gold opacity-60" />
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl text-white">Meet <span className="italic text-gold font-light">The Biggies</span></h2>
                        <div className="gold-divider w-24 mx-auto mt-6" />
                    </Reveal>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <Reveal key={member.name} delay={i * 0.1}>
                                <div className="group flex flex-col items-center gap-4">
                                    <div className="relative overflow-hidden rounded-2xl aspect-square w-full">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-2xl" />
                                    </div>
                                    <h4 className="font-serif text-lg text-white text-center group-hover:text-gold transition-colors">{member.name}</h4>
                                    <p className="text-white/40 text-xs text-center uppercase tracking-wider">{member.role}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* CTA STRIP */}
                <Reveal className="py-20 px-8 text-center bg-noir-100">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                        Ready to Work With <span className="italic text-gold font-light">Us?</span>
                    </h2>
                    <Link to="/quote">
                        <button className="px-12 py-5 bg-gold text-noir font-bold uppercase tracking-widest text-sm rounded-sm hover:shadow-gold-lg transition-all duration-300 hover:scale-105">
                            Build Your Quote →
                        </button>
                    </Link>
                </Reveal>
            </main>

            <PremiumFooter />
        </div>
    );
}
