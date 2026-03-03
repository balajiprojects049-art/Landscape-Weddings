import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_KEY = 'lw_cookie_consent';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(COOKIE_KEY);
        if (!saved) {
            // Delay banner appearance for a better UX
            const t = setTimeout(() => setVisible(true), 1800);
            return () => clearTimeout(t);
        }
    }, []);

    const accept = () => {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        setVisible(false);
    };

    const reject = () => {
        localStorage.setItem(COOKIE_KEY, 'rejected');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99998] w-[calc(100%-2rem)] max-w-md"
                    role="dialog"
                    aria-label="Cookie Consent"
                >
                    <div
                        className="rounded-xl border px-4 py-4 shadow-2xl"
                        style={{
                            background: 'rgba(1,11,3,0.96)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            borderColor: 'rgba(212,175,55,0.25)',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08)'
                        }}
                    >
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(212,175,55,0.15)' }}>
                                    <Cookie size={13} style={{ color: '#d4af37' }} />
                                </div>
                                <div>
                                    <p className="font-cinzel font-semibold text-xs tracking-wider" style={{ color: '#d4af37' }}>
                                        We use Cookies
                                    </p>
                                    <p className="text-white/40 text-[10px] font-light mt-0.5">
                                        To enhance your browsing experience
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={reject}
                                className="text-white/30 hover:text-white/70 transition-colors mt-1 flex-shrink-0"
                                aria-label="Dismiss"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Body */}
                        <p className="text-white/55 text-[11px] leading-relaxed font-light mb-1">
                            We use cookies to personalise content, deliver social media features, and analyse traffic.
                            By clicking <strong className="text-white/80">Accept All</strong>, you consent to our use of cookies.
                            {' '}
                            <Link to="/cookies" className="underline hover:text-gold transition-colors" style={{ color: 'rgba(212,175,55,0.7)' }}>
                                Cookie Policy
                            </Link>
                            {' · '}
                            <Link to="/privacy" className="underline hover:text-gold transition-colors" style={{ color: 'rgba(212,175,55,0.7)' }}>
                                Privacy Policy
                            </Link>
                        </p>

                        {/* Details toggle */}
                        <button
                            onClick={() => setShowDetails(v => !v)}
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest mt-2 mb-3 transition-colors"
                            style={{ color: 'rgba(212,175,55,0.5)' }}
                        >
                            <Settings size={10} />
                            {showDetails ? 'Hide details' : 'Cookie details'}
                        </button>

                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                                        {[
                                            { title: 'Essential', desc: 'Required for the website to function. Cannot be disabled.', always: true },
                                            { title: 'Analytics', desc: 'Help us understand how visitors interact with the site.' },
                                            { title: 'Marketing', desc: 'Used to show you relevant ads on other platforms.' },
                                        ].map(c => (
                                            <div key={c.title} className="rounded-lg p-3"
                                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.1)' }}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/70">{c.title}</span>
                                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                                                        style={{ background: c.always ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)', color: c.always ? '#d4af37' : 'rgba(255,255,255,0.3)' }}>
                                                        {c.always ? 'Always on' : 'Optional'}
                                                    </span>
                                                </div>
                                                <p className="text-white/35 text-[10px] leading-relaxed">{c.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-2">
                            <button
                                id="cookie-accept-btn"
                                onClick={accept}
                                className="flex-1 py-2 rounded-lg font-semibold text-[10px] uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #B8962E 0%, #FFD700 50%, #B8962E 100%)', color: '#010B03' }}
                            >
                                Accept All
                            </button>
                            <button
                                id="cookie-reject-btn"
                                onClick={reject}
                                className="flex-1 py-2 rounded-lg font-medium text-[10px] uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                            >
                                Reject All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
