import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';
import PremiumFooter from '../components/PremiumFooter';
import { Shield } from 'lucide-react';

function Section({ title, children }) {
    return (
        <div className="mb-10">
            <h2 className="font-cinzel text-lg font-semibold uppercase tracking-widest mb-4" style={{ color: '#d4af37' }}>
                {title}
            </h2>
            <div className="text-white/55 leading-relaxed font-light text-sm space-y-3">
                {children}
            </div>
        </div>
    );
}

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-noir text-white">
            <AnimatedHeader />

            {/* Hero */}
            <section className="relative pt-40 pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] rounded-full blur-[180px]"
                        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
                </div>
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)' }}>
                        <Shield size={22} style={{ color: '#d4af37' }} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.5em] font-medium mb-4 block" style={{ color: 'rgba(212,175,55,0.7)' }}>
                        Legal · Privacy
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
                        Privacy <span className="italic font-light" style={{ color: '#d4af37' }}>Policy</span>
                    </h1>
                    <p className="text-white/40 font-light text-sm">Last updated: March 2025</p>
                    <div className="h-px w-24 mx-auto mt-6" style={{ background: 'linear-gradient(to right, transparent, #d4af37, transparent)' }} />
                </div>
            </section>

            {/* Content */}
            <section className="max-w-3xl mx-auto px-6 pb-28">
                <Section title="1. Who We Are">
                    <p>
                        Landscape Weddings ("we", "our", "us") is a professional wedding photography and videography studio based in
                        Madhapur, Hyderabad — 500081, India. We operate the website <strong className="text-white/80">www.landscapephotography.in</strong>.
                    </p>
                    <p>
                        This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website
                        or use our services.
                    </p>
                </Section>

                <Section title="2. Information We Collect">
                    <p>We may collect the following types of personal information:</p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li><strong className="text-white/70">Contact Details</strong> — Name, phone number, email address when you fill out forms.</li>
                        <li><strong className="text-white/70">Event Details</strong> — Wedding date, venue, city, and service preferences.</li>
                        <li><strong className="text-white/70">Usage Data</strong> — Pages visited, time spent, browser type (via analytics cookies).</li>
                        <li><strong className="text-white/70">Communications</strong> — Messages you send us via contact forms or WhatsApp.</li>
                    </ul>
                </Section>

                <Section title="3. How We Use Your Information">
                    <p>Your information is used solely to:</p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>Respond to your enquiries and quotation requests.</li>
                        <li>Plan and deliver our photography and videography services.</li>
                        <li>Send booking confirmations and service-related communications.</li>
                        <li>Improve our website and marketing (with analytics, only if consent is given).</li>
                    </ul>
                    <p>We <strong className="text-white/70">never sell</strong> your personal data to third parties.</p>
                </Section>

                <Section title="4. Cookies">
                    <p>
                        Our website uses cookies to improve your experience. You can manage your cookie preferences at any time
                        via the cookie banner or by visiting our{' '}
                        <Link to="/cookies" className="underline transition-colors hover:text-gold" style={{ color: 'rgba(212,175,55,0.7)' }}>
                            Cookie Policy
                        </Link>.
                    </p>
                </Section>

                <Section title="5. Data Retention">
                    <p>
                        We retain your personal data only as long as necessary to fulfil the purpose it was collected for —
                        typically the duration of our contract with you plus a period of 3 years thereafter for record-keeping.
                    </p>
                </Section>

                <Section title="6. Your Rights">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>Access the personal data we hold about you.</li>
                        <li>Request correction of inaccurate data.</li>
                        <li>Request deletion of your data ("right to be forgotten").</li>
                        <li>Withdraw consent at any time.</li>
                    </ul>
                    <p>
                        To exercise these rights, contact us at{' '}
                        <a href="mailto:info@landscapephotography.in" className="underline" style={{ color: 'rgba(212,175,55,0.7)' }}>
                            info@landscapephotography.in
                        </a>.
                    </p>
                </Section>

                <Section title="7. Data Security">
                    <p>
                        We implement appropriate technical and organisational measures to protect your personal information
                        against unauthorised access, loss, or misuse. However, no method of internet transmission is 100% secure.
                    </p>
                </Section>

                <Section title="8. Third-Party Links">
                    <p>
                        Our website may contain links to third-party websites (e.g., Instagram, YouTube, Google Maps).
                        We are not responsible for the privacy practices of those sites and encourage you to review their policies.
                    </p>
                </Section>

                <Section title="9. Changes to This Policy">
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
                        updated revision date. Continued use of our website after such changes constitutes acceptance of the
                        updated policy.
                    </p>
                </Section>

                <Section title="10. Contact Us">
                    <p>If you have any questions about this Privacy Policy, please contact:</p>
                    <div className="mt-3 p-4 rounded-xl text-white/60" style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)' }}>
                        <p className="font-cinzel text-white/80 font-semibold">Landscape Weddings</p>
                        <p>Madhapur, Hyderabad — 500081, India</p>
                        <p>📞 <a href="tel:+919115994999" className="hover:text-gold transition-colors">+91 91159 94999</a></p>
                        <p>✉️ <a href="mailto:info@landscapephotography.in" className="hover:text-gold transition-colors">info@landscapephotography.in</a></p>
                    </div>
                </Section>

                <div className="flex flex-wrap gap-4 mt-8">
                    <Link to="/terms" className="text-xs uppercase tracking-widest hover:text-gold transition-colors" style={{ color: 'rgba(212,175,55,0.5)' }}>
                        Terms & Conditions →
                    </Link>
                    <Link to="/cookies" className="text-xs uppercase tracking-widest hover:text-gold transition-colors" style={{ color: 'rgba(212,175,55,0.5)' }}>
                        Cookie Policy →
                    </Link>
                </div>
            </section>

            <PremiumFooter />
        </div>
    );
}
