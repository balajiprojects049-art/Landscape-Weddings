import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedHeader from '../components/AnimatedHeader';
import PremiumFooter from '../components/PremiumFooter';
import { FileText } from 'lucide-react';

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

export default function TermsAndConditions() {
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
                        <FileText size={22} style={{ color: '#d4af37' }} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.5em] font-medium mb-4 block" style={{ color: 'rgba(212,175,55,0.7)' }}>
                        Legal · Terms
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
                        Terms &amp; <span className="italic font-light" style={{ color: '#d4af37' }}>Conditions</span>
                    </h1>
                    <p className="text-white/40 font-light text-sm">Last updated: March 2025</p>
                    <div className="h-px w-24 mx-auto mt-6" style={{ background: 'linear-gradient(to right, transparent, #d4af37, transparent)' }} />
                </div>
            </section>

            {/* Content */}
            <section className="max-w-3xl mx-auto px-6 pb-28">
                <Section title="1. Overview">
                    <p>
                        These Terms & Conditions govern your engagement with Landscape Weddings ("we", "our", "us"), a professional
                        wedding photography and videography studio based in Hyderabad, India. By enquiring about or booking our
                        services, you agree to be bound by these terms.
                    </p>
                </Section>

                <Section title="2. Booking & Confirmation">
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>A booking is only confirmed upon receipt of the advance payment and a signed agreement.</li>
                        <li>We reserve the right to decline any booking at our discretion.</li>
                        <li>Dates are held exclusively for your event only after confirmation payment is received.</li>
                    </ul>
                </Section>

                <Section title="3. Payment Terms">
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>A non-refundable advance of <strong className="text-white/70">50%</strong> of the total package value is required to confirm the booking.</li>
                        <li>The remaining balance must be settled <strong className="text-white/70">before the event date</strong>, unless otherwise agreed in writing.</li>
                        <li>All payments are to be made via bank transfer, UPI, or other mutually agreed methods.</li>
                        <li>Prices quoted are inclusive of the team, equipment, and agreed deliverables. Travel and accommodation for outstation events are billed separately.</li>
                    </ul>
                </Section>

                <Section title="4. Cancellation & Rescheduling">
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>Cancellations must be notified in writing via email or WhatsApp.</li>
                        <li>The advance payment is <strong className="text-white/70">non-refundable</strong> under all circumstances.</li>
                        <li>Rescheduling is permitted subject to availability and must be requested at least <strong className="text-white/70">30 days</strong> before the original event date.</li>
                        <li>If we are unable to attend due to emergencies, we will endeavour to provide an equally qualified team or offer a refund.</li>
                    </ul>
                </Section>

                <Section title="5. Deliverables">
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>Edited photographs and/or films will be delivered within the agreed timeline (typically 4–8 weeks post-event).</li>
                        <li>Delivery is made via an online gallery link. Physical prints or albums are subject to separate pricing.</li>
                        <li>The number of edited images delivered is at our professional discretion and is not guaranteed as a minimum count.</li>
                        <li>RAW (unedited) files are <strong className="text-white/70">not</strong> delivered under any circumstances.</li>
                    </ul>
                </Section>

                <Section title="6. Copyright & Usage">
                    <p>
                        All photographs and videos produced by Landscape Weddings remain our <strong className="text-white/70">intellectual property</strong>.
                        We grant clients a personal, non-commercial licence to use the images for personal sharing, printing, and social media.
                    </p>
                    <p>
                        We reserve the right to use images/videos for our portfolio, website, social media, and marketing materials,
                        unless the client requests otherwise in writing before the event.
                    </p>
                </Section>

                <Section title="7. Client Responsibilities">
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>Clients must ensure our team has safe and adequate access to all event locations.</li>
                        <li>Meal and refreshment provisions for the team during extended coverage are the client's responsibility.</li>
                        <li>Any guests or family members who interfere with our photography may affect the quality of results; we are not liable for such situations.</li>
                    </ul>
                </Section>

                <Section title="8. Liability">
                    <p>
                        While we take every precaution, Landscape Weddings shall not be held liable for:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 pl-2">
                        <li>Loss or damage caused by equipment failure, venue restrictions, or circumstances beyond our control.</li>
                        <li>Failure to capture specific moments if access was not provided or conditions were inadequate.</li>
                        <li>Any consequential, indirect, or special damages arising from the services.</li>
                    </ul>
                    <p>Our liability is limited to the amount paid for the service.</p>
                </Section>

                <Section title="9. Force Majeure">
                    <p>
                        Neither party shall be in breach of these terms if performance is prevented by circumstances beyond reasonable
                        control, including natural disasters, government restrictions, strikes, or public health emergencies.
                    </p>
                </Section>

                <Section title="10. Governing Law">
                    <p>
                        These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive
                        jurisdiction of the courts of Hyderabad, Telangana.
                    </p>
                </Section>

                <Section title="11. Contact">
                    <p>For any queries regarding these terms, please reach us at:</p>
                    <div className="mt-3 p-4 rounded-xl text-white/60" style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)' }}>
                        <p className="font-cinzel text-white/80 font-semibold">Landscape Weddings</p>
                        <p>Madhapur, Hyderabad — 500081, India</p>
                        <p>📞 <a href="tel:+919115994999" className="hover:text-gold transition-colors">+91 91159 94999</a></p>
                        <p>✉️ <a href="mailto:info@landscapephotography.in" className="hover:text-gold transition-colors">info@landscapephotography.in</a></p>
                    </div>
                </Section>

                <div className="flex flex-wrap gap-4 mt-8">
                    <Link to="/privacy" className="text-xs uppercase tracking-widest hover:text-gold transition-colors" style={{ color: 'rgba(212,175,55,0.5)' }}>
                        Privacy Policy →
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
