import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedHeader from '../components/AnimatedHeader';
import PremiumFooter from '../components/PremiumFooter';
import { sendToWhatsApp } from '../components/WhatsAppFloat';
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, Send } from 'lucide-react';

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

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const msg =
            `*New Inquiry — Landscape Weddings Website*

👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}
✉️ *Email:* ${form.email}

💬 *Message:*
${form.message}

_Sent from the Contact Form on landscapeweddings.in_`;
        sendToWhatsApp(msg);
        setSent(true);
    };

    return (
        <div className="bg-noir min-h-screen text-white">
            <AnimatedHeader />

            <main className="pt-32 pb-24">
                {/* HEADER */}
                <div className="text-center px-6 mb-20">
                    <Reveal>
                        <span className="text-gold text-xs uppercase tracking-[0.5em] font-medium block mb-4 flex items-center justify-center gap-3">
                            <span className="h-px w-8 bg-gold opacity-60" /> Get In Touch
                        </span>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">
                            Let&apos;s Create Your <span className="italic text-gold font-light">Story</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-white/50 max-w-xl mx-auto font-light leading-relaxed">
                            We&apos;d love to be a part of your celebration. Reach out to us and let&apos;s begin crafting your royal legacy.
                        </p>
                    </Reveal>
                    <div className="gold-divider w-24 mx-auto mt-8" />
                </div>

                <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* CONTACT INFO */}
                    <div className="flex flex-col gap-8">
                        <Reveal>
                            <h2 className="font-serif text-3xl text-white mb-2">Our Studio</h2>
                            <p className="text-white/50 font-light leading-relaxed">
                                Walk in, call us, or simply fill out the form. We respond to every inquiry within 24 hours.
                            </p>
                        </Reveal>

                        <div className="flex flex-col gap-6">
                            {[
                                { icon: Phone, label: 'Phone', value: '+91 91159 94999', href: 'tel:+919115994999' },
                                { icon: Mail, label: 'Email', value: 'info@landscapephotography.in', href: 'mailto:info@landscapephotography.in' },
                                { icon: MapPin, label: 'Studio', value: 'Flat No 501, B Block, Sri Sai Nilayam\nIdea Clinic Line, 100 Feet Rd, Madhapur\nHyderabad, Telangana — 500081', href: 'https://maps.app.goo.gl/E92ZLHkmTgrUwoPc7' },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <Reveal key={item.label} delay={i * 0.1}>
                                        <a href={item.href} className="flex items-start gap-5 group">
                                            <div className="p-3 rounded-full bg-gold/10 border border-gold/20 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300 flex-shrink-0">
                                                <Icon size={18} className="text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-gold text-xs uppercase tracking-widest font-medium mb-1">{item.label}</p>
                                                <p className="text-white/70 font-light whitespace-pre-line">{item.value}</p>
                                            </div>
                                        </a>
                                    </Reveal>
                                );
                            })}
                        </div>

                        {/* SOCIAL ICONS */}
                        <Reveal delay={0.4}>
                            <div className="mt-4">
                                <p className="text-gold text-xs uppercase tracking-widest font-medium mb-4">Follow Our Work</p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: Instagram, href: 'https://www.instagram.com/landscapeweddings?igsh=bmt0dGEyZjlxYnh3', label: '@landscapeweddings' },
                                        { icon: Youtube, href: 'https://www.youtube.com/@LANDSCAPEWEDDINGS', label: 'YouTube' },
                                        { icon: Facebook, href: 'https://www.facebook.com/landscapeweddings/', label: 'Facebook' },
                                    ].map(({ icon: Icon, href, label }) => (
                                        <a key={label} href={href} title={label}
                                            target="_blank" rel="noopener noreferrer"
                                            className="p-3 border border-white/15 rounded-full hover:border-gold hover:text-gold hover:-translate-y-1 transition-all duration-300 text-white/50">
                                            <Icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        {/* MAP */}
                        <Reveal delay={0.5} className="mt-4">
                            <div className="relative">
                                <div className="overflow-hidden rounded-xl border border-gold/15 h-60 bg-noir-200 relative group">
                                    <iframe
                                        title="Landscape Weddings Studio Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1683270083257!2d78.38629727516073!3d17.453389983337757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb916f6f2f0d41%3A0xdd497f1986077fef!2sLANDSCAPE%20WEDDINGS!5e0!3m2!1sen!2sin!4v1740370000000!5m2!1sen!2sin"
                                        width="100%" height="100%" style={{ border: 0, filter: 'invert(85%) hue-rotate(180deg) saturate(0.9) contrast(1.05)' }}
                                        allowFullScreen loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/25 transition-all duration-500 rounded-xl pointer-events-none" />
                                </div>
                                {/* Get Directions button */}
                                <a
                                    href="https://maps.app.goo.gl/E92ZLHkmTgrUwoPc7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 flex items-center gap-2 text-gold/70 hover:text-gold text-xs uppercase tracking-[0.3em] font-medium transition-colors duration-300 group"
                                >
                                    <MapPin size={13} className="group-hover:animate-bounce" />
                                    Get Directions on Google Maps
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    {/* CONTACT FORM */}
                    <Reveal delay={0.15} className="h-full">
                        {!sent ? (
                            <form onSubmit={handleSubmit} className="glass border border-gold/10 rounded-2xl p-8 md:p-10 flex flex-col gap-6 h-full">
                                <h2 className="font-serif text-3xl text-white">Send Us a Message</h2>
                                <div className="gold-divider w-16" />

                                {[
                                    { key: 'name', placeholder: 'Your Full Name', type: 'text', label: 'Name' },
                                    { key: 'email', placeholder: 'your@email.com', type: 'email', label: 'Email' },
                                    { key: 'phone', placeholder: '+91 00000 00000', type: 'tel', label: 'Phone' },
                                ].map((f) => (
                                    <div key={f.key} className="flex flex-col gap-2">
                                        <label className="text-gold/60 text-xs uppercase tracking-widest font-medium">{f.label}</label>
                                        <input
                                            required
                                            type={f.type}
                                            placeholder={f.placeholder}
                                            value={form[f.key]}
                                            onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                                            className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all"
                                        />
                                    </div>
                                ))}

                                <div className="flex flex-col gap-2">
                                    <label className="text-gold/60 text-xs uppercase tracking-widest font-medium">Your Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Tell us about your event date, location, and vision..."
                                        value={form.message}
                                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                                        className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-all resize-none"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center justify-center gap-3 w-full py-5 bg-gold text-noir font-bold uppercase tracking-[0.2em] text-sm rounded-lg hover:shadow-gold-lg transition-all duration-300 mt-auto"
                                >
                                    Send Message <Send size={16} />
                                </motion.button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass border border-gold/20 rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full gap-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-gold-lg animate-pulse-gold">
                                    <Send size={32} className="text-noir" />
                                </div>
                                <h3 className="font-serif text-3xl text-white">Message Received!</h3>
                                <p className="text-white/60 font-light leading-relaxed max-w-sm">
                                    Thank you for reaching out. We&apos;ll be in touch within 24 hours with all the details you need.
                                </p>
                                <span className="text-gold text-sm font-cinzel font-semibold tracking-wider">✦ Landscape Weddings ✦</span>
                            </motion.div>
                        )}
                    </Reveal>
                </div>
            </main>

            <PremiumFooter />
        </div>
    );
}
