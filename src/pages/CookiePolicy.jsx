import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cookie, Shield, Settings, BarChart2, Share2, ToggleLeft, Mail, ChevronRight } from 'lucide-react';
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

const cookieTypes = [
    {
        icon: Shield,
        title: 'Strictly Necessary Cookies',
        badge: 'Always Active',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        desc: 'These cookies are essential for the website to function and cannot be switched off. They are usually set as a response to actions you make — such as setting your privacy preferences, logging in, or filling in forms.',
        examples: ['Session management', 'Security tokens', 'Cart and form state'],
    },
    {
        icon: BarChart2,
        title: 'Analytics & Performance Cookies',
        badge: 'Optional',
        badgeColor: 'bg-gold/15 text-gold border-gold/30',
        desc: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They allow us to count visits, measure performance, and improve our content.',
        examples: ['Google Analytics (_ga, _gid)', 'Page view tracking', 'Session duration and bounce rate'],
    },
    {
        icon: Settings,
        title: 'Functional / Preference Cookies',
        badge: 'Optional',
        badgeColor: 'bg-gold/15 text-gold border-gold/30',
        desc: 'These cookies enable the website to remember your choices and preferences — such as your language preference, region, or any customized settings — to provide a more personalized experience.',
        examples: ['Language preferences', 'Font size and theme settings', 'Form auto-fill data'],
    },
    {
        icon: Share2,
        title: 'Marketing & Social Media Cookies',
        badge: 'Optional',
        badgeColor: 'bg-gold/15 text-gold border-gold/30',
        desc: 'These cookies may be set through our site by social media services and advertising partners (like Instagram and Facebook). They may be used to build a profile of your interests and show you relevant ads on other sites.',
        examples: ['Facebook Pixel', 'Instagram embed tracking', 'Retargeting ad cookies'],
    },
];

const sections = [
    {
        title: 'What Are Cookies?',
        content: `Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.\n\nCookies do not contain any information that personally identifies you as an individual, but personal information that we store about you may be linked to the information stored in and obtained from cookies.`,
    },
    {
        title: 'How We Use Cookies',
        content: `At Landscape Weddings, we use cookies to:\n\n• Ensure our website works properly and securely for all visitors\n• Remember your preferences and personalize your experience\n• Understand how visitors use our website through analytics\n• Deliver relevant marketing content on social platforms\n• Improve our website's performance and user experience over time`,
    },
    {
        title: 'Third-Party Cookies',
        content: `Some cookies on our website are placed by third-party services. These include:\n\n• Google Analytics — for understanding visitor behavior\n• Google Maps — for embedding our studio location\n• Instagram & Facebook — for social media integration\n• YouTube — for embedded portfolio video content\n\nWe do not control these third-party cookies. Please refer to each platform's Privacy Policy to understand how they use your data.`,
    },
    {
        title: 'Cookie Duration',
        content: `Cookies can be either "session" cookies (which expire when you close your browser) or "persistent" cookies (which remain until they expire or you delete them).\n\n• Session cookies: Deleted when you close your browser\n• Persistent cookies: Stored for a defined period (typically 30 days to 2 years)\n• Third-party cookies: Duration is controlled by the respective third-party provider`,
    },
    {
        title: 'Managing Your Cookie Preferences',
        content: `You have the right to accept or refuse cookies. Most browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer.\n\nPlease note that if you disable certain cookies, some features of our website may not function properly. You can manage cookies through:\n\n• Your browser settings (Chrome, Firefox, Safari, Edge all have cookie controls)\n• Your device's privacy settings\n• Third-party opt-out tools (e.g., Google Analytics Opt-out Browser Add-on)`,
    },
    {
        title: 'Your Rights Under Applicable Law',
        content: `Depending on your location, you may have rights under applicable data protection laws (including the GDPR in Europe or the IT Act in India) regarding your personal data. These include the right to:\n\n• Know what personal data we collect\n• Request access to or deletion of your data\n• Withdraw consent at any time\n• Lodge a complaint with a supervisory authority\n\nFor any requests related to your data, please contact us at info@landscapephotography.in.`,
    },
    {
        title: 'Changes to This Cookie Policy',
        content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. We encourage you to review this page periodically.\n\nAny material changes will be noted with the "Last Updated" date at the top of this page. Your continued use of our website after any changes constitutes your acceptance of the updated policy.`,
    },
];

export default function CookiePolicy() {
    return (
        <div className="bg-noir min-h-screen text-white">
            <AnimatedHeader />

            <main className="pt-36 pb-24">

                {/* ── HERO ──────────────────────────────────── */}
                <div className="relative text-center px-6 mb-20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[50vw] h-[30vh] rounded-full bg-gold/5 blur-[140px]" />
                    </div>
                    <Reveal>
                        <div className="flex items-center justify-center mb-6">
                            <div className="p-4 rounded-full border border-gold/20 bg-gold/5">
                                <Cookie size={40} className="text-gold" />
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <span className="text-gold text-[10px] uppercase tracking-[0.6em] font-medium flex items-center justify-center gap-3 mb-4">
                            <span className="h-px w-8 bg-gold/60" /> Legal <span className="h-px w-8 bg-gold/60" />
                        </span>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">
                            Cookie <span className="italic text-gold font-light">Policy</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed text-sm">
                            We believe in full transparency. This policy explains exactly what cookies we use,
                            why we use them, and how you can control them.
                        </p>
                    </Reveal>
                    <Reveal delay={0.25}>
                        <div className="flex items-center justify-center gap-2 mt-6 text-white/25 text-xs">
                            <span>Last Updated:</span>
                            <span className="text-gold/60">February 24, 2026</span>
                            <span>·</span>
                            <span>Effective Immediately</span>
                        </div>
                    </Reveal>
                    <div className="gold-divider w-24 mx-auto mt-8" />
                </div>

                {/* ── QUICK NAV ─────────────────────────────── */}
                <Reveal className="max-w-4xl mx-auto px-6 mb-16">
                    <div className="glass border border-gold/10 rounded-2xl p-6 md:p-8">
                        <p className="text-gold text-[10px] uppercase tracking-[0.4em] font-medium mb-5 flex items-center gap-2">
                            <ToggleLeft size={14} /> Quick Navigation
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {['What Are Cookies?', 'How We Use Cookies', 'Types of Cookies', 'Third-Party Cookies',
                                'Managing Preferences', 'Your Rights', 'Policy Changes'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-300 text-sm font-light cursor-pointer py-1.5">
                                        <ChevronRight size={12} className="text-gold/40 flex-shrink-0" />
                                        {item}
                                    </div>
                                ))}
                        </div>
                    </div>
                </Reveal>

                {/* ── COOKIE TYPES CARDS ────────────────────── */}
                <div className="max-w-5xl mx-auto px-6 mb-20">
                    <Reveal>
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-3 text-center">
                            Types of Cookies <span className="italic text-gold font-light">We Use</span>
                        </h2>
                        <p className="text-white/40 text-center font-light text-sm mb-12 max-w-lg mx-auto">
                            We use four categories of cookies, each serving a specific purpose.
                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {cookieTypes.map((type, i) => {
                            const Icon = type.icon;
                            return (
                                <Reveal key={type.title} delay={i * 0.1}>
                                    <div className="glass border border-gold/8 hover:border-gold/20 rounded-2xl p-6 md:p-8 transition-all duration-500 group h-full">
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="p-3 rounded-xl bg-gold/8 border border-gold/15 group-hover:bg-gold/15 transition-colors duration-300">
                                                <Icon size={22} className="text-gold" />
                                            </div>
                                            <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${type.badgeColor}`}>
                                                {type.badge}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-xl text-white mb-3 leading-tight">{type.title}</h3>
                                        <p className="text-white/45 font-light text-sm leading-relaxed mb-5">{type.desc}</p>
                                        <div>
                                            <p className="text-gold/60 text-[9px] uppercase tracking-widest font-medium mb-2">Examples:</p>
                                            <ul className="flex flex-col gap-1.5">
                                                {type.examples.map(ex => (
                                                    <li key={ex} className="flex items-center gap-2 text-white/35 text-xs font-light">
                                                        <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                                                        {ex}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>

                {/* ── DETAILED POLICY SECTIONS ──────────────── */}
                <div className="max-w-3xl mx-auto px-6">
                    {sections.map((sec, i) => (
                        <Reveal key={sec.title} delay={i * 0.05} className="mb-10">
                            <div className="border-l-2 border-gold/25 pl-6 hover:border-gold/60 transition-colors duration-500">
                                <h2 className="font-serif text-2xl text-white mb-4">{sec.title}</h2>
                                <div className="text-white/50 font-light leading-[1.9] text-sm whitespace-pre-line">
                                    {sec.content}
                                </div>
                            </div>
                        </Reveal>
                    ))}

                    {/* CONTACT BLOCK */}
                    <Reveal delay={0.1}>
                        <div className="mt-12 glass border border-gold/15 rounded-2xl p-8 text-center">
                            <div className="flex items-center justify-center mb-4">
                                <div className="p-3 rounded-full bg-gold/10 border border-gold/20">
                                    <Mail size={24} className="text-gold" />
                                </div>
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-3">Have Questions?</h3>
                            <p className="text-white/45 font-light text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                                If you have any questions or concerns about this Cookie Policy or how we handle your data, please reach out to us.
                            </p>
                            <a href="mailto:info@landscapephotography.in"
                                className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium text-sm tracking-wide">
                                info@landscapephotography.in
                            </a>
                            <div className="gold-divider w-16 mx-auto mt-8 mb-6" />
                            <div className="flex items-center justify-center gap-6 text-white/25 text-xs uppercase tracking-wider">
                                <Link to="/privacy" className="hover:text-gold/70 transition-colors">Privacy Policy</Link>
                                <span>·</span>
                                <Link to="/terms" className="hover:text-gold/70 transition-colors">Terms of Service</Link>
                                <span>·</span>
                                <Link to="/" className="hover:text-gold/70 transition-colors">Back to Home</Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </main>

            <PremiumFooter />
        </div>
    );
}
