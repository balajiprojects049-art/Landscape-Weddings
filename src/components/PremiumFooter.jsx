import React from 'react';
import { Instagram, Youtube, Facebook, Diamond, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
    Studio: [
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'About Us', path: '/about' },
        { name: 'Build Quote', path: '/quote' },
        { name: 'Contact', path: '/contact' },
    ],
    Services: [
        { name: 'Candid Photography', path: '/quote' },
        { name: 'Cinematic Films', path: '/quote' },
        { name: 'Complete Coverage', path: '/quote' },
        { name: 'Premium Albums', path: '/quote' },
    ],
};

export default function PremiumFooter() {
    return (
        <footer className="w-full bg-noir-100 text-white relative overflow-hidden">
            {/* Background gold glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-gold/4 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
                {/* TOP DIVIDER */}
                <div className="gold-divider w-full mb-16 mt-0" />

                {/* MAIN FOOTER GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* BRAND COL */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="block mb-6">
                            <h2 className="font-cinzel text-2xl font-bold tracking-[0.3em] uppercase"
                                style={{ background: 'linear-gradient(135deg,#B8962E,#FFD700,#B8962E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Landscape
                            </h2>
                            <span className="text-[9px] text-gold/60 tracking-[0.5em] uppercase">Weddings</span>
                        </Link>
                        <p className="text-white/40 leading-relaxed font-light text-sm max-w-xs mb-8">
                            We are romantic visual artists who translate your love story into a cinematic masterpiece — a timeless heirloom for generations to cherish.
                        </p>
                        <div className="flex flex-col gap-3 mb-8">
                            {[
                                { icon: Phone, text: '+91 91159 94999', href: 'tel:+919115994999' },
                                { icon: Mail, text: 'info@landscapephotography.in', href: 'mailto:info@landscapephotography.in' },
                                { icon: MapPin, text: 'Madhapur, Hyderabad — 500081', href: 'https://maps.app.goo.gl/E92ZLHkmTgrUwoPc7' },
                            ].map(({ icon: Icon, text, href }) => (
                                <a key={text} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors duration-300 text-sm font-light">
                                    <Icon size={14} className="text-gold flex-shrink-0" />
                                    <span>{text}</span>
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: Instagram, href: 'https://www.instagram.com/landscapeweddings?igsh=bmt0dGEyZjlxYnh3', label: 'Instagram' },
                                { icon: Youtube, href: 'https://www.youtube.com/@LANDSCAPEWEDDINGS', label: 'YouTube' },
                                { icon: Facebook, href: 'https://www.facebook.com/landscapeweddings/', label: 'Facebook' },
                            ].map(({ icon: Icon, href, label }) => (
                                <a key={label} href={href} title={label}
                                    target="_blank" rel="noopener noreferrer"
                                    className="p-2.5 border border-white/10 rounded-full hover:border-gold hover:text-gold hover:-translate-y-1 transition-all duration-300 text-white/40">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* LINK COLS */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            <h4 className="font-cinzel text-gold font-semibold text-xs uppercase tracking-[0.3em] mb-8">{section}</h4>
                            <div className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <Link key={link.name} to={link.path}
                                        className="text-white/40 hover:text-white transition-colors duration-300 font-light text-sm gold-underline w-fit">
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM BAR */}
                <div className="gold-divider w-full mb-8" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-10 text-white/25 text-xs uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} Landscape Weddings. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/cookies" className="hover:text-gold/70 transition-colors duration-300">Cookie Policy</Link>
                        <span className="text-white/10">·</span>
                        <Link to="/privacy" className="hover:text-gold/70 transition-colors duration-300">Privacy</Link>
                        <span className="text-white/10">·</span>
                        <Link to="/terms" className="hover:text-gold/70 transition-colors duration-300">Terms</Link>
                    </div>
                    <p className="flex items-center gap-2">
                        Crafted with <Heart size={12} className="text-gold fill-gold/60 animate-pulse" /> for eternal love stories
                    </p>
                </div>
            </div>
        </footer>
    );
}
