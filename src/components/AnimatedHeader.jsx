import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
];

export default function AnimatedHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const stickyState = scrolled || !isHome;

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 w-full z-[900]"
                animate={{
                    backgroundColor: stickyState ? 'rgba(5,5,5,0.92)' : 'rgba(0,0,0,0)',
                    borderBottomColor: stickyState ? 'rgba(255,215,0,0.15)' : 'rgba(255,215,0,0)',
                    height: stickyState ? '70px' : '100px',
                }}
                style={{ backdropFilter: stickyState ? 'blur(20px)' : 'none', borderBottomWidth: 1, borderBottomStyle: 'solid' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between relative">

                    {/* LOGO — CENTER on hero, LEFT after scroll */}
                    <motion.div
                        className="absolute cursor-pointer"
                        animate={{
                            left: stickyState ? '48px' : '50%',
                            x: stickyState ? '0%' : '-50%',
                        }}
                        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                    >
                        <Link to="/" className="flex flex-col items-center group">
                            <motion.span
                                className="font-cinzel font-bold tracking-[0.3em] uppercase leading-none"
                                animate={{ fontSize: stickyState ? '1.1rem' : '1.5rem' }}
                                style={{
                                    background: 'linear-gradient(135deg, #B8962E 0%, #FFD700 50%, #B8962E 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Landscape
                            </motion.span>
                            <span className="text-[9px] tracking-[0.5em] font-light uppercase text-gold-light/70 mt-0.5">
                                Weddings
                            </span>
                        </Link>
                    </motion.div>

                    {/* NAV LINKS — Right fade-in after scroll */}
                    <div className="hidden lg:flex flex-1 justify-end items-center gap-10 pr-48">
                        <AnimatePresence>
                            {stickyState && navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={clsx(
                                            'text-xs font-medium uppercase tracking-[0.2em] transition-colors gold-underline',
                                            location.pathname === link.path ? 'text-gold' : 'text-white/60 hover:text-white'
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* CTA BUTTON — Right */}
                    <AnimatePresence>
                        {stickyState && (
                            <motion.div
                                className="hidden lg:block absolute right-6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link to="/quote">
                                    <button className="px-6 py-2.5 bg-gold text-noir font-semibold text-xs uppercase tracking-widest rounded-sm hover:shadow-gold transition-all duration-300 hover:scale-105 active:scale-95">
                                        Build Quote
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* HAMBURGER — ALWAYS RIGHT */}
                    <div className={clsx('absolute right-6 lg:hidden z-50')}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 text-gold flex flex-col gap-1.5 group"
                        >
                            <motion.span
                                className="block h-[1.5px] bg-current origin-left"
                                animate={{ width: menuOpen ? '20px' : '24px', rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                                style={{ width: 24 }}
                            />
                            <motion.span
                                className="block h-[1.5px] bg-current w-5"
                                animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
                            />
                            <motion.span
                                className="block h-[1.5px] bg-current origin-left"
                                animate={{ width: menuOpen ? '20px' : '18px', rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                                style={{ width: 18 }}
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* FULLSCREEN MOBILE MENU */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ clipPath: 'circle(0% at calc(100% - 40px) 55px)' }}
                        animate={{ clipPath: 'circle(150% at calc(100% - 40px) 55px)' }}
                        exit={{ clipPath: 'circle(0% at calc(100% - 40px) 55px)' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[800] bg-noir flex flex-col items-center justify-center gap-10"
                    >
                        {/* Gold orb background */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[60vw] h-[60vw] rounded-full bg-gold/5 blur-[100px]" />
                        </div>

                        {[...navLinks, { name: 'Home', path: '/' }].map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ delay: 0.2 + i * 0.08 }}
                            >
                                <Link
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="font-serif text-4xl md:text-5xl text-white hover:text-gold transition-all duration-300 block text-center"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-8"
                        >
                            <Link to="/quote" onClick={() => setMenuOpen(false)}>
                                <button className="px-10 py-4 bg-gold text-noir font-bold text-sm uppercase tracking-[0.3em] rounded-sm">
                                    Build Your Quote →
                                </button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center gap-2 text-white/40 text-sm mt-4"
                        >
                            <Phone size={14} className="text-gold" />
                            <span>+91 91159 94999</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
