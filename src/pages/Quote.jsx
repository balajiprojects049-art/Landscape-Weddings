import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Clapperboard, Image, CheckCircle2, ArrowLeft, ArrowRight, Heart, Star, MapPin, User, Phone, Mail, CalendarDays, Check, ChevronDown, X, ClipboardList, Aperture, Film, Plane, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import AnimatedHeader from '../components/AnimatedHeader';
import PremiumFooter from '../components/PremiumFooter';
import { sendToWhatsApp } from '../components/WhatsAppFloat';

// ── COUNTRY LIST ────────────────────────────────────────────────────────────
const COUNTRIES = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
    { code: '+1CA', flag: '🇨🇦', name: 'Canada' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+55', flag: '🇧🇷', name: 'Brazil' },
    { code: '+27', flag: '🇿🇦', name: 'South Africa' },
    { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
    { code: '+977', flag: '🇳🇵', name: 'Nepal' },
    { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
];

// ── CUSTOM COUNTRY PICKER ───────────────────────────────────────────────────
function CountryPicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = COUNTRIES.find(c => c.code === value) || COUNTRIES[0];

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative flex-shrink-0">
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 h-full px-3 py-4 bg-white/5 border border-white/15 rounded-lg text-white text-sm hover:border-gold/50 focus:outline-none focus:border-gold/50 transition-all whitespace-nowrap min-w-[130px]"
            >
                <span className="text-lg leading-none">{selected.flag}</span>
                <span className="text-white/80 font-medium">{selected.code}</span>
                <ChevronDown size={14} className={clsx('text-gold/50 ml-auto transition-transform duration-200', open && 'rotate-180')} />
            </button>

            {/* Dropdown list */}
            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-1 z-50 w-56 max-h-64 overflow-y-auto rounded-xl border border-gold/20 bg-[#111] shadow-2xl"
                        style={{ backdropFilter: 'blur(12px)' }}
                    >
                        {COUNTRIES.map(c => (
                            <li key={c.code}>
                                <button
                                    type="button"
                                    onClick={() => { onChange(c.code); setOpen(false); }}
                                    className={clsx(
                                        'w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                                        c.code === value
                                            ? 'bg-gold/15 text-gold'
                                            : 'text-white/70 hover:bg-white/8 hover:text-white'
                                    )}
                                >
                                    <span className="text-lg leading-none">{c.flag}</span>
                                    <span className="flex-1 text-left">{c.name}</span>
                                    <span className="text-white/40 text-xs font-mono">{c.code}</span>
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}


// ── PRICE MAP ──────────────────────────────────────────────────────────────
const PRICES = {
    candid_photo: 15000,
    traditional_photo: 10000,
    candid_video: 15000,
    traditional_video: 10000,
    extra_camera: 10000,
    album_classic: 15000,
    album_premium: 20000,
    delivery_30days: 80000,
    delivery_6months: 40000,
    prewedding_photo: 20000,
    prewedding_both: 50000,
};

// ── ICON HELPERS ────────────────────────────────────────────────────────────
// Helper to use PNG images as theme-aware icons using CSS masks
const ImageIcon = ({ src, size = 24 }) => (
    <div
        style={{
            width: size,
            height: size,
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            backgroundColor: 'currentColor'
        }}
    />
);

// ── OPTION CARD ────────────────────────────────────────────────────────────
function OptionCard({ id, label, icon: Icon, selected, onToggle, price, showStepper, count, onUpdateCount }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(id)}
            className={clsx(
                'relative flex flex-col items-center justify-start gap-2 p-5 md:p-6 border rounded-xl transition-all duration-500 group cursor-pointer min-h-[220px] overflow-hidden',
                selected
                    ? 'bg-gradient-to-br from-gold/20 to-gold/5 border-gold shadow-[0_0_25px_rgba(212,175,55,0.2)] backdrop-blur-md'
                    : 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/10 hover:border-gold/40 hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]'
            )}
        >
            {selected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center"
                >
                    <Check size={10} className="text-noir" />
                </motion.div>
            )}
            <div className={clsx(
                'p-3 mt-1 rounded-2xl transition-all duration-300',
                selected ? 'bg-gold text-noir' : 'bg-white/5 text-white/50 group-hover:text-gold group-hover:bg-gold/10'
            )}>
                <Icon size={26} />
            </div>
            <span className={clsx(
                'text-[11px] md:text-xs font-bold uppercase tracking-[0.1em] text-center transition-colors',
                selected ? 'text-gold' : 'text-white/60 group-hover:text-white'
            )}>{label}</span>
            {price && (
                <span className={clsx(
                    'text-[10px] font-semibold tracking-widest transition-all duration-300',
                    selected
                        ? 'text-gold opacity-100 translate-y-0'
                        : 'text-gold/70 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
                )}>+ ₹{price.toLocaleString('en-IN')}</span>
            )}

            {/* In-Card Stepper Control */}
            <AnimatePresence>
                {(selected && showStepper) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border border-gold/40 rounded bg-noir h-8 w-full max-w-[120px] mx-auto">
                            <button
                                type="button"
                                onClick={() => onUpdateCount(Math.max(1, count - 1))}
                                disabled={count <= 1}
                                className={clsx(
                                    'w-8 h-full flex items-center justify-center text-sm font-bold transition-colors',
                                    count <= 1 ? 'text-white/15 cursor-not-allowed' : 'text-gold hover:bg-gold/20 cursor-pointer'
                                )}
                            >−</button>
                            <div className="flex-1 h-full flex items-center justify-center border-x border-gold/20 bg-gold/5 flex-col">
                                <span className="text-gold font-bold text-xs leading-none">{count}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onUpdateCount(Math.min(4, count + 1))}
                                disabled={count >= 4}
                                className={clsx(
                                    'w-8 h-full flex items-center justify-center text-sm font-bold transition-colors',
                                    count >= 4 ? 'text-white/15 cursor-not-allowed' : 'text-gold hover:bg-gold/20 cursor-pointer'
                                )}
                            >+</button>
                        </div>
                        <div className="text-center mt-1.5">
                            <span className="text-[8px] text-white/50 uppercase tracking-widest font-medium">
                                {count === 1 ? 'Camera' : 'Cameras'}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Radio-style single select card
function RadioCard({ id, label, subtitle, icon: Icon, selected, onSelect, price }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(id)}
            className={clsx(
                'relative flex flex-col items-center justify-center gap-3 p-8 border rounded-xl transition-all duration-500 group cursor-pointer w-full overflow-hidden',
                selected
                    ? 'bg-gradient-to-br from-gold/20 to-gold/5 border-gold shadow-[0_0_25px_rgba(212,175,55,0.2)] backdrop-blur-md'
                    : 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/10 hover:border-gold/40 hover:from-white/[0.08] hover:to-white/[0.03] backdrop-blur-sm hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]'
            )}
        >
            {selected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <Check size={12} className="text-noir" />
                </motion.div>
            )}
            <div className={clsx(
                'p-4 rounded-2xl transition-all duration-300',
                selected ? 'bg-gold text-noir' : 'bg-white/5 text-white/50 group-hover:text-gold group-hover:bg-gold/10'
            )}><Icon size={30} /></div>
            <span className={clsx('font-medium uppercase tracking-wider text-sm text-center', selected ? 'text-gold' : 'text-white/70 group-hover:text-white')}>{label}</span>
            {subtitle && <span className="text-white/30 text-xs text-center">{subtitle}</span>}
            {price && <span className={clsx(
                'text-xs font-semibold tracking-wider transition-all duration-300',
                selected
                    ? 'text-gold opacity-100 translate-y-0'
                    : 'text-gold/70 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
            )}>₹{price.toLocaleString('en-IN')}</span>}
        </motion.button>
    );
}

// ── EVENT STEP (multi-select toggles) ─────────────────────────────────────
function EventStep({ title, stepKey, selections, onToggle, cameraCount, onCameraCount, options: customOptions }) {
    const defaultOptions = [
        { id: 'candid_photo', label: 'Cinematic Photo', icon: Camera, price: PRICES.candid_photo },
        { id: 'traditional_photo', label: 'Traditional Photo', icon: Aperture, price: PRICES.traditional_photo },
        { id: 'candid_video', label: 'Cinematic Video', icon: Video, price: PRICES.candid_video },
        { id: 'traditional_video', label: 'Traditional Video', icon: Film, price: PRICES.traditional_video },
    ];

    const eventSel = selections[stepKey] || [];
    const displayOptions = customOptions || defaultOptions;
    const isSmallGrid = displayOptions.length <= 2;

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-2 text-center">{title}</h2>
            <p className="text-gold/60 uppercase tracking-widest text-xs mb-10">Select all that apply</p>
            <div className={clsx(
                "grid gap-4 md:gap-6 w-full",
                isSmallGrid ? "grid-cols-1 md:grid-cols-2 max-w-2xl" : "grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-5xl"
            )}>
                {displayOptions.map((opt) => {
                    const isSelected = eventSel.includes(opt.id);
                    const isPhotoVideo = opt.id.includes('photo') || opt.id.includes('video');
                    const camKey = `${stepKey}_${opt.id}`;
                    return (
                        <OptionCard
                            key={opt.id}
                            id={opt.id}
                            label={opt.label}
                            icon={opt.icon}
                            price={opt.price}
                            selected={isSelected}
                            onToggle={(id) => onToggle(stepKey, id)}
                            showStepper={isPhotoVideo}
                            count={cameraCount[camKey] || 1}
                            onUpdateCount={(val) => onCameraCount(camKey, val)}
                        />
                    );
                })}
            </div>

            <div className="mt-10 flex items-start gap-4 p-5 md:p-6 bg-gold/5 border border-gold/20 rounded-2xl w-full max-w-3xl text-left">
                <Star className="text-gold flex-shrink-0 mt-0.5 fill-gold" size={18} />
                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    <span className="text-gold font-medium">Please Note: </span>
                    Coverage time is strictly <span className="text-white/80 font-medium">6 to 8 hours</span> per event.
                </p>
            </div>
        </div>
    );
}

// ── STEP DEFINITIONS ───────────────────────────────────────────────────────
const STEPS = [
    'photography',
    'engagement',
    'bride_haldi',
    'bride',
    'groom_haldi',
    'groom',
    'mehendi',
    'sangeeth',
    'wedding',
    'vratham',
    'reception',
    'prewedding',
    'drone',
    'weblive',
    'delivery',
    'album',
    'deliverables_info',
    'details',
];

const STEP_LABELS = {
    photography: 'Photography Style',
    engagement: 'Engagement',
    'bride_haldi': 'Bride Haldi Ceremony',
    bride: 'Bride',
    'groom_haldi': 'Groom Haldi Ceremony',
    groom: 'Groom',
    mehendi: 'Mehendi ',
    sangeeth: 'Sangeeth ',
    wedding: 'The Big Day',
    vratham: 'Vratham',
    reception: 'Reception',
    prewedding: 'Pre-Wedding Shoot',
    album: 'Album Selection',
    deliverables_info: 'Deliverables',
    drone: 'Drone Coverage',
    weblive: 'Web Live',
    delivery: 'Delivery Timeline',
    details: 'Your Details',
};

const TERMS = [
    'Coverage time is strictly 6 to 8 hours per event.',
    'Transportation is included only for wedding and formal events, not for pre-wedding shoots.',
    'Accommodation must be provided by the client.',
    'Advance payment is non-refundable.',
    'Once the advance is paid, no negotiations on the final price will be entertained.',
    'Any changes to dates or venues must be informed 15–20 days in advance.',
    'The remaining 10% balance must be paid on or before delivery.',
    'In case of event cancellation, the price remains unchanged (no reduction).',
    'Any additional events will be charged extra.',
    'Food coverage is not included; coverage is strictly based on time with the same team.',
    'The client must provide two 4TB external hard drives before the event begins.',
    'For Pellikuthuru & Pellikoduku events, the team will cover both traditional and candid photography.',
    'Pre-Wedding Shoot: Any location charges, travel expenses, or team accommodation for pre/post-wedding shoots must be borne by the client.',
    'Pre-Wedding Shoot: Costumes and makeup artist charges are not included and must be borne by the client.',
];

// ── DELIVERABLES ────────────────────────────────────────────────────────────
const getDeliverables = (selections) => {
    const list = [
        'Approximately 200 colour-corrected images (soft copies)',
        'All remaining images provided on the client’s hard drive',
        'Online gallery hosted on our website with password protection',
        '4K edited wedding video (provided on client’s hard drive)',
    ];
    if ((selections.engagement || []).length > 0) {
        list.push('3–4 minute engagement teaser');
    }
    list.push(
        '7–10 minute wedding highlights video',
        'Instant wedding reel based on the wedding date (50% probability)',
        'One reel per event based on available content',
        'WhatsApp invitation video (using our templates only)',
        'Two pen drives'
    );
    return list;
};

// ── MAIN QUOTE PAGE ────────────────────────────────────────────────────────
export default function QuotePage() {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [cameraCount, setCameraCount] = useState({});
    const [albumQty, setAlbumQty] = useState({ album_classic: 0, album_premium: 0 });
    const [form, setForm] = useState({
        brideName: '', groomName: '',
        countryCode: '+91', phone: '',
        email: '', events: '', date: '', location: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const totalSteps = STEPS.length;
    const progress = ((step) / (totalSteps - 1)) * 100;

    // Compute total price (services + extra cameras)
    const servicesTotal = Object.values(selections).reduce((acc, val) => {
        if (Array.isArray(val)) {
            return acc + val.reduce((a, k) => a + (PRICES[k] || 0), 0);
        }
        return acc + (PRICES[val] || 0);
    }, 0);
    const cameraTotal = STEPS.reduce((acc, stepKey) => {
        const eventSel = selections[stepKey];
        if (!Array.isArray(eventSel)) return acc;

        let stepCamTotal = 0;
        eventSel.forEach(svc => {
            if (svc.includes('photo') || svc.includes('video')) {
                const cnt = cameraCount[`${stepKey}_${svc}`] || 1;
                if (cnt > 1) {
                    stepCamTotal += (cnt - 1) * PRICES.extra_camera;
                }
            }
        });
        return acc + stepCamTotal;
    }, 0);
    // Drone total
    const droneEvents = selections.drone || [];
    const droneTotal = droneEvents.length * 10000;
    const webLiveEvents = selections.weblive || [];
    const webLiveTotal = webLiveEvents.length * 8000;
    // Album total (qty-based)
    const albumTotal = (albumQty.album_classic || 0) * PRICES.album_classic + (albumQty.album_premium || 0) * PRICES.album_premium;
    const total = servicesTotal + cameraTotal + droneTotal + webLiveTotal + albumTotal;

    const handleToggleMulti = (key, id) => {
        setSelections((prev) => {
            const current = prev[key] || [];
            return {
                ...prev,
                [key]: current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
            };
        });
    };

    const handleCameraCount = (key, count) => {
        setCameraCount((prev) => ({ ...prev, [key]: count }));
    };

    const handleSelectSingle = (key, value) => {
        setSelections((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (step < totalSteps - 1) setStep((s) => s + 1);
    };
    const handleBack = () => { if (step > 0) setStep((s) => s - 1); };

    // ── PDF GENERATOR ────────────────────────────────────────────────────────
    const generateQuotePDF = async () => {
        const { jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default;

        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const gold = [193, 155, 65];
        const headerBg = [18, 52, 32];   // deep forest green
        const dark = [15, 15, 15];
        const mid = [80, 80, 80];
        const light = [220, 220, 220];
        const W = doc.internal.pageSize.getWidth();
        const H = doc.internal.pageSize.getHeight();

        // ── WATERMARK BACKGROUND ─────────────────────────────────────────────
        let logoData = null;
        let wW = 140, wH = 80;
        try {
            const logoBlob = await fetch('/LOGO.png').then(r => r.blob());
            logoData = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(logoBlob);
            });
            const img = new Image();
            img.src = logoData;
            await new Promise(resolve => { img.onload = resolve; });

            const imgRatio = img.height / img.width;
            wH = wW * imgRatio;
        } catch (e) {
            console.error("Could not load watermark", e);
        }

        const drawPageOverlay = (docObj) => {
            // ── PREMIUM PAGE BORDER ──────────────────────────────────────────────
            docObj.setDrawColor(...gold);
            docObj.setLineWidth(0.4);
            docObj.rect(5, 5, W - 10, H - 10);
            docObj.setLineWidth(0.1);
            docObj.rect(6.5, 6.5, W - 13, H - 13); // Double line effect

            // ── WATERMARK ────────────────────────────────────────────────────────
            if (logoData) {
                docObj.setGState(new docObj.GState({ opacity: 0.15 }));
                docObj.addImage(logoData, 'PNG', (W - wW) / 2, (H - wH) / 2 + 10, wW, wH, undefined, 'FAST');
                docObj.setGState(new docObj.GState({ opacity: 1.0 }));
            }

            // ── FOOTER ───────────────────────────────────────────────────────────
            docObj.setFillColor(...headerBg);
            docObj.rect(6.5, H - 24.5, W - 13, 18, 'F');
            docObj.setFont('helvetica', 'normal');
            docObj.setFontSize(8);
            docObj.setTextColor(...light);
            docObj.text('Thank you for considering Landscape Weddings to capture your forever moments.', W / 2, H - 17, { align: 'center' });
            docObj.setTextColor(...gold);
            docObj.text('landscapeweddings.com  |  +91 9115994999', W / 2, H - 11, { align: 'center' });
        };

        drawPageOverlay(doc);

        // ── HEADER BAND ──────────────────────────────────────────────────────
        doc.setFillColor(...headerBg);
        doc.rect(6.5, 6.5, W - 13, 42, 'F');
        doc.setFillColor(...gold);
        doc.rect(6.5, 48.5, W - 13, 1.2, 'F');

        // Studio name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(...gold);
        doc.text('LANDSCAPE WEDDINGS', W / 2, 22, { align: 'center' });

        // Tagline
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        let charSpacing = 1.5;
        doc.setTextColor(220, 220, 220);
        doc.text('C I N E M A T I C   W E D D I N G   S T U D I O', W / 2, 30, { align: 'center' });

        // Contact line
        doc.setFontSize(8);
        doc.setTextColor(170, 170, 170);
        doc.text(
            'Ph: +91 9115994999   |   landscapeweddings.com   |   info@landscapeweddings.com',
            W / 2, 38, { align: 'center' }
        );
        doc.text(
            'Madhapur, Hyderabad, Telangana - 500081, India',
            W / 2, 44, { align: 'center' }
        );

        // ── QUOTE TITLE ──────────────────────────────────────────────────────
        let y = 62;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...dark);
        doc.text('WEDDING QUOTE & ITINERARY', 16, y);

        // Quote date (right-aligned)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...mid);
        const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
        doc.text(`DATE: ${today.toUpperCase()}`, W - 16, y, { align: 'right' });

        // Divider
        y += 6;
        doc.setDrawColor(...gold);
        doc.setLineWidth(0.5);
        doc.line(16, y, W - 16, y);

        // ── CLIENT DETAILS ───────────────────────────────────────────────────
        y += 6;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...gold);
        doc.text('CLIENT DETAILS', 16, y);
        y += 5;

        const detailsGrid = [
            [{ label: 'Bride:', value: form.brideName || '—' }, { label: 'Wedding Date:', value: form.date || 'Not specified' }],
            [{ label: 'Groom:', value: form.groomName || '—' }, { label: 'Location:', value: form.location || 'Not specified' }],
            [{ label: 'Mobile:', value: `${form.countryCode} ${form.phone}` }, { label: 'No. of Events:', value: form.events ? `${form.events} Events` : 'Not specified' }],
            [{ label: 'Email:', value: form.email || '—' }, { label: '', value: '' }]
        ];

        doc.setFontSize(9);
        detailsGrid.forEach(row => {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...mid);
            doc.text(row[0].label, 16, y);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(20, 20, 20);
            doc.text(row[0].value, 36, y);
            if (row[1].label) {
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...mid);
                doc.text(row[1].label, W / 2 + 10, y);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(20, 20, 20);
                doc.text(row[1].value, W / 2 + 40, y);
            }
            y += 4.5;
        });

        // ── STYLE & DELIVERABLES ──────────────────────────────────────────────
        y += 3;
        doc.setDrawColor(...gold);
        doc.setLineWidth(0.3);
        doc.line(16, y, W - 16, y);
        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...gold);
        doc.text('STYLE & DELIVERABLES', 16, y);
        y += 5;

        const styleRows = [];
        styleRows.push(['Photography', selections.photography === 'candid' ? 'Candid Photography' : selections.photography === 'traditional' ? 'Traditional Photography' : 'Not selected']);
        styleRows.push(['Delivery Timeline', selections.delivery === 'delivery_30days' ? 'Within 30 Days (Express)' : selections.delivery === 'delivery_6months' ? 'Within 6 Months (Standard)' : 'Not selected']);
        const albumSummary = [albumQty.album_classic > 0 ? `Classic ×${albumQty.album_classic}` : null, albumQty.album_premium > 0 ? `Premium ×${albumQty.album_premium}` : null].filter(Boolean).join(', ') || 'None';
        styleRows.push(['Album', albumSummary]);
        if ((selections.drone || []).length > 0) styleRows.push(['Drone Coverage', (selections.drone || []).map(ev => STEP_LABELS[ev] || ev).join(', ')]);
        if ((selections.weblive || []).length > 0) styleRows.push(['Web Live', (selections.weblive || []).map(ev => STEP_LABELS[ev] || ev).join(', ')]);

        styleRows.forEach(([label, value]) => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(...mid);
            doc.text(label + ':', 16, y);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(20, 20, 20);
            doc.text(value, 70, y);
            y += 4.5;
        });

        // ── SERVICE BREAKDOWN ────────────────────────────────────────────────
        y += 4;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...gold);
        doc.text('SERVICE BREAKDOWN & INVESTMENT', 16, y);
        y += 4;

        const SVC_LABEL = {
            candid_photo: 'Cinematic Photography',
            traditional_photo: 'Traditional Photography',
            candid_video: 'Cinematic Video',
            traditional_video: 'Traditional Video',
        };

        const tableRows = [];
        const rowMeta = []; // track row type: 'event-header' | 'service' | 'extra'

        ['engagement', 'bride_haldi', 'bride', 'groom_haldi', 'groom', 'mehendi', 'sangeeth', 'wedding', 'vratham', 'reception'].forEach(ev => {
            const evSel = selections[ev] || [];
            if (!evSel.length) return;

            // Event group header row (spans all 4 cols visually via styling)
            tableRows.push([{ content: STEP_LABELS[ev].toUpperCase(), colSpan: 4 }]);
            rowMeta.push('event-header');

            // Service sub-rows under this event
            evSel.forEach(svc => {
                const isPhotoVideo = svc.includes('photo') || svc.includes('video');
                const camCount = isPhotoVideo ? (cameraCount[`${ev}_${svc}`] || 1) : 1;
                const extraCamCost = (camCount - 1) * PRICES.extra_camera;
                const price = PRICES[svc] || 0;
                tableRows.push([
                    `  • ${SVC_LABEL[svc] || svc}`,
                    isPhotoVideo ? `${camCount} Cam${camCount > 1 ? 's' : ''}` : '-',
                    `Rs. ${(price + extraCamCost).toLocaleString('en-IN')}`,
                    '',
                ]);
                rowMeta.push('service');
            });
        });

        // Pre-Wedding
        if (selections.prewedding) {
            tableRows.push([{ content: 'PRE-WEDDING SHOOT', colSpan: 4 }]);
            rowMeta.push('event-header');
            const label = selections.prewedding === 'prewedding_photo' ? 'Photography Only' : 'Photography & Video';
            const price = selections.prewedding === 'prewedding_photo' ? 20000 : 50000;
            tableRows.push([`  • ${label}`, '-', `Rs. ${(price).toLocaleString('en-IN')}`, '']);
            rowMeta.push('service');
        }

        // Drone
        if ((selections.drone || []).length > 0) {
            tableRows.push([{ content: 'DRONE COVERAGE', colSpan: 4 }]);
            rowMeta.push('event-header');
            (selections.drone || []).forEach(ev => {
                tableRows.push([`  • ${STEP_LABELS[ev] || ev}`, '-', 'Rs. 10,000', '']);
                rowMeta.push('service');
            });
        }

        // Web Live
        if ((selections.weblive || []).length > 0) {
            tableRows.push([{ content: 'WEB LIVE STREAMING', colSpan: 4 }]);
            rowMeta.push('event-header');
            (selections.weblive || []).forEach(ev => {
                tableRows.push([`  • ${STEP_LABELS[ev] || ev}`, '-', 'Rs. 8,000', '']);
                rowMeta.push('service');
            });
        }

        // Delivery
        if (selections.delivery) {
            tableRows.push([{ content: 'DELIVERY TIMELINE', colSpan: 4 }]);
            rowMeta.push('event-header');
            tableRows.push([
                `  • ${selections.delivery === 'delivery_30days' ? 'Within 30 Days (Express)' : 'Within 6 Months (Standard)'}`,
                '-',
                `Rs. ${(PRICES[selections.delivery] || 0).toLocaleString('en-IN')}`,
                '',
            ]);
            rowMeta.push('service');
        }

        // Album
        const albumDefs2 = [{ id: 'album_classic', name: 'Classic Premium Album', price: 15000 }, { id: 'album_premium', name: 'Premium Luxury Album', price: 20000 }];
        const hasAlbum = albumDefs2.some(({ id }) => (albumQty[id] || 0) > 0);
        if (hasAlbum) {
            tableRows.push([{ content: 'ALBUM', colSpan: 4 }]);
            rowMeta.push('event-header');
            albumDefs2.forEach(({ id, name, price }) => {
                const qty = albumQty[id] || 0;
                if (qty > 0) {
                    tableRows.push([`  • ${name}`, `Qty: ${qty}`, `Rs. ${(qty * price).toLocaleString('en-IN')}`, '']);
                    rowMeta.push('service');
                }
            });
        }

        autoTable(doc, {
            startY: y,
            head: [['SERVICE / EVENT', 'CAMS / QTY', 'AMOUNT', '']],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: gold, textColor: dark, fontStyle: 'bold', fontSize: 8, halign: 'center' },
            bodyStyles: { fontSize: 7.5, textColor: [40, 40, 40], cellPadding: [2, 4, 2, 4], fillColor: false },
            alternateRowStyles: {},
            columnStyles: {
                0: { cellWidth: 90 },
                1: { cellWidth: 35, halign: 'center' },
                2: { cellWidth: 40, halign: 'right', fontStyle: 'bold' },
                3: { cellWidth: 10 },
            },
            margin: { left: 16, right: 16, bottom: 32 },
            styles: { lineColor: [220, 210, 190], lineWidth: 0.1 },
            didParseCell: ({ row, cell, section }) => {
                if (section !== 'body') return;
                const meta = rowMeta[row.index];
                if (meta === 'event-header') {
                    cell.styles.fillColor = [248, 235, 175];
                    cell.styles.textColor = [10, 10, 5];
                    cell.styles.fontStyle = 'bold';
                    cell.styles.fontSize = 8.5;
                    cell.styles.cellPadding = [3, 6, 3, 6];
                } else {
                    cell.styles.fillColor = [252, 250, 245];
                    cell.styles.textColor = [40, 40, 40];
                }
            },
        });

        // ── TOTAL SUMMARY BOX ────────────────────────────────────────────────
        let finalY = doc.lastAutoTable.finalY + 8;
        if (finalY > H - 90) { doc.addPage(); drawPageOverlay(doc); finalY = 20; }

        doc.setFillColor(252, 250, 245);
        doc.setDrawColor(...gold);
        doc.setLineWidth(0.3);
        doc.rect(16, finalY, W - 32, 20, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(15, 15, 15);
        doc.text('TOTAL ESTIMATED INVESTMENT', 22, finalY + 13);
        doc.setFontSize(15);
        doc.setTextColor(...gold);
        doc.text(`Rs. ${total.toLocaleString('en-IN')}`, W - 22, finalY + 13.5, { align: 'right' });

        // ── POST-PRODUCTION NOTE ──────────────────────────────────────────────
        finalY += 28;
        doc.setFillColor(252, 249, 240);
        doc.setDrawColor(...gold);
        doc.setLineWidth(0.2);
        doc.rect(16, finalY, W - 32, 10, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...gold);
        doc.text('★ Note:', 20, finalY + 6.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);
        doc.text('Post-production work will commence after receiving 90% payment.', 38, finalY + 6.5);

        // ── DELIVERABLES ──────────────────────────────────────────────────────
        finalY += 16;
        if (finalY > H - 100) { doc.addPage(); drawPageOverlay(doc); finalY = 20; }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...gold);
        doc.text('DELIVERABLES', 16, finalY);
        finalY += 2;
        doc.setDrawColor(...gold);
        doc.setLineWidth(0.3);
        doc.line(16, finalY + 1, W - 16, finalY + 1);
        finalY += 5;

        getDeliverables(selections).forEach((item) => {
            if (finalY > H - 30) { doc.addPage(); drawPageOverlay(doc); finalY = 20; }
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(...gold);
            doc.text(`•`, 16, finalY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(50, 50, 50);
            const lines = doc.splitTextToSize(item, W - 50);
            doc.text(lines, 22, finalY);
            finalY += (lines.length * 4) + 1;
        });

        // ── TERMS & CONDITIONS ────────────────────────────────────────────────
        finalY += 16;
        if (finalY > H - 100) { doc.addPage(); drawPageOverlay(doc); finalY = 20; }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...gold);
        doc.text('TERMS & CONDITIONS', 16, finalY);
        finalY += 2;
        doc.setDrawColor(...gold);
        doc.setLineWidth(0.3);
        doc.line(16, finalY + 1, W - 16, finalY + 1);
        finalY += 5;

        TERMS.forEach((term, i) => {
            if (finalY > H - 30) { doc.addPage(); drawPageOverlay(doc); finalY = 20; }
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            doc.setTextColor(...gold);
            doc.text(`${i + 1}.`, 16, finalY);

            const prefix = 'Pre-Wedding Shoot:';
            if (term.startsWith(prefix)) {
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(50, 50, 50);
                doc.text(prefix, 22, finalY);

                doc.setFont('helvetica', 'normal');
                const prefixWidth = doc.getTextWidth(prefix) + 1.5;
                const restText = term.substring(prefix.length).trim();
                const lines = doc.splitTextToSize(restText, W - 50 - prefixWidth);
                doc.text(lines, 22 + prefixWidth, finalY);
                finalY += lines.length * 4 + 1.5;
            } else {
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(50, 50, 50);
                const lines = doc.splitTextToSize(term, W - 50);
                doc.text(lines, 22, finalY);
                finalY += lines.length * 4 + 1.5;
            }
        });

        // ── Download ──
        const fileName = `LandscapeWeddings_Quote_${form.brideName || 'Bride'}_${form.groomName || 'Groom'}.pdf`;
        doc.save(fileName);
        return doc;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneFormatted = `${form.countryCode} ${form.phone}`;
        const albumLines = [
            albumQty.album_classic > 0 ? `Classic x${albumQty.album_classic} (Rs.${(albumQty.album_classic * 15000).toLocaleString('en-IN')})` : null,
            albumQty.album_premium > 0 ? `Premium x${albumQty.album_premium} (Rs.${(albumQty.album_premium * 20000).toLocaleString('en-IN')})` : null,
        ].filter(Boolean).join(', ') || 'None';

        const serviceLabel = { candid_photo: 'Candid Photo', traditional_photo: 'Trad Photo', candid_video: 'Cinematic Video', traditional_video: 'Trad Video' };
        const eventLines = ['engagement', 'bride_haldi', 'bride', 'groom_haldi', 'groom', 'mehendi', 'sangeeth', 'wedding', 'vratham', 'reception']
            .map(ev => {
                const evSel = (selections[ev] || []);
                if (!evSel.length) return null;

                const svcs = evSel.map(svc => {
                    const cnt = cameraCount[`${ev}_${svc}`] || 1;
                    return `${serviceLabel[svc] || svc} (x${cnt})`;
                }).join('  |  ');
                return `🔹 *${(STEP_LABELS[ev] || ev)}*\n      ${svcs}`;
            })
            .filter(Boolean);

        if (selections.prewedding) {
            const lbl = selections.prewedding === 'prewedding_photo' ? 'Photography Only' : 'Photography & Video';
            eventLines.push(`🔹 *Pre-Wedding Shoot*\n      ${lbl}`);
        }

        const eventLinesString = eventLines.join('\n\n') || '  None selected';

        const msg =
            `✨ *NEW QUOTE — LANDSCAPE WEDDINGS* ✨\n\n` +
            `*👤 CLIENT DETAILS*\n` +
            `Bride: ${form.brideName || '-'}\n` +
            `Groom: ${form.groomName || '-'}\n` +
            `📞 Phone: ${phoneFormatted}\n` +
            `✉️ Email: ${form.email || '-'}\n` +
            `📅 Date: ${form.date || '-'}\n` +
            `📍 Location: ${form.location || '-'}\n` +
            `🎉 Events: ${form.events || '-'}\n\n` +
            `*📸 PRIMARY PREFERENCE*\n` +
            `Style: ${selections.photography === 'candid' ? 'Candid Photography' : selections.photography === 'traditional' ? 'Traditional Photography' : '-'}\n\n` +
            `*🎥 EVENT COVERAGE*\n` +
            `${eventLinesString}\n\n` +
            `*🚁 ADD-ONS*\n` +
            `Drone Coverage: ${(selections.drone || []).length > 0 ? (selections.drone || []).map(ev => STEP_LABELS[ev] || ev).join(', ') : 'None'}\n` +
            `Web Live: ${(selections.weblive || []).length > 0 ? (selections.weblive || []).map(ev => STEP_LABELS[ev] || ev).join(', ') : 'None'}\n\n` +
            `*📦 FINAL DELIVERABLES*\n` +
            `Timeline: ${selections.delivery === 'delivery_30days' ? 'Within 30 Days' : selections.delivery === 'delivery_6months' ? 'Within 6 Months' : '-'}\n` +
            `Albums: ${albumLines}\n\n` +
            `*💰 ESTIMATED TOTAL*\n` +
            `*Rs. ${total.toLocaleString('en-IN')}*\n` +
            `_(Final pricing confirmed after consultation)_\n\n` +
            `_Sent from landscapeweddings.com_`;

        // ── 1. & 2. Automate: PDF & WhatsApp ──
        const doc = await generateQuotePDF();
        sendToWhatsApp(msg);

        // ── 3. Automate: Silent Send to Admin ──
        try {
            const pdfBase64 = doc.output('datauristring').split(',')[1];
            fetch('/api/send-quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pdfBase64,
                    clientName: `${form.brideName} & ${form.groomName}`,
                    totalAmount: total.toLocaleString('en-IN'),
                    details: msg.replace(/\*/g, '') // strip markdown for email body
                })
            });
        } catch (e) {
            console.error("Silent email failed", e);
        }

        setSubmitted(true);
    };

    const currentKey = STEPS[step];

    return (
        <div className="bg-noir min-h-screen text-white">
            <AnimatedHeader />

            <main className="pt-24 pb-24 min-h-screen flex flex-col items-center">
                {/* PAGE HEADER */}
                <div className="text-center px-6 mt-8 mb-12">
                    <h1 className="font-serif text-4xl md:text-6xl text-white mb-3">
                        Build Your <span className="italic text-gold font-light">Quote</span>
                    </h1>
                    <p className="text-white/50 uppercase tracking-[0.3em] text-xs">Design your bespoke coverage package</p>
                </div>

                {/* PRICE BADGE — fixed top-right */}
                <motion.div
                    className="fixed top-[110px] md:top-[120px] right-4 md:right-8 z-50"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        animate={{
                            scale: total > 0 ? [1, 1.06, 1] : 1,
                            opacity: step === 0 ? 0 : 1,
                            pointerEvents: step === 0 ? 'none' : 'auto'
                        }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="flex items-center gap-2 bg-gold text-noir pl-3 pr-4 py-2 rounded-full shadow-gold-lg cursor-default"
                    >
                        <div className="w-7 h-7 rounded-full bg-noir/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-noir text-[10px] font-bold">₹</span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[8px] font-semibold uppercase tracking-widest text-noir/60">Total</span>
                            <span className="text-noir font-bold text-sm">
                                {total > 0 ? '₹' + (total / 1000).toFixed(0) + 'K' : '₹0'}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* STEP PROGRESS */}
                <div className="w-full max-w-4xl px-6 mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-white/40 text-xs uppercase tracking-widest">Step {step + 1} of {totalSteps}</span>
                        <span className="text-gold text-xs uppercase tracking-widest font-medium">{STEP_LABELS[currentKey]}</span>
                    </div>
                    <div className="relative h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gold rounded-full"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* STEP CONTENT */}
                <div className="w-full max-w-5xl px-4 md:px-8 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="glass border border-gold/10 rounded-2xl p-8 md:p-14 flex flex-col items-center min-h-[480px] justify-center"
                        >
                            {!submitted ? (
                                <>
                                    {/* PHOTOGRAPHY */}
                                    {currentKey === 'photography' && (
                                        <div className="flex flex-col items-center w-full gap-8">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">What Photography <span className="italic text-gold font-light">Do You Want?</span></h2>
                                            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                                                <RadioCard id="candid" label="Candid Photography" icon={Camera} subtitle="Artistic & unposed"
                                                    selected={selections.photography === 'candid'} onSelect={(v) => handleSelectSingle('photography', v)} />
                                                <RadioCard id="traditional" label="Traditional Photography" icon={Aperture} subtitle="Posed & formal"
                                                    selected={selections.photography === 'traditional'} onSelect={(v) => handleSelectSingle('photography', v)} />
                                            </div>
                                        </div>
                                    )}

                                    {/* EVENT STEPS */}
                                    {['engagement', 'bride_haldi', 'bride', 'groom_haldi', 'groom', 'mehendi', 'sangeeth', 'wedding', 'vratham', 'reception'].includes(currentKey) && (
                                        <EventStep
                                            title={STEP_LABELS[currentKey]}
                                            stepKey={currentKey}
                                            selections={selections}
                                            onToggle={handleToggleMulti}
                                            cameraCount={cameraCount}
                                            onCameraCount={handleCameraCount}
                                            options={
                                                (currentKey === 'bride' || currentKey === 'groom' || currentKey === 'vratham') ? [
                                                    { id: 'traditional_photo', label: 'Traditional Photo', icon: Aperture, price: PRICES.traditional_photo },
                                                    { id: 'traditional_video', label: 'Traditional Video', icon: Film, price: PRICES.traditional_video },
                                                ] : currentKey === 'mehendi' ? [
                                                    { id: 'candid_photo', label: 'Cinematic Photo', icon: Camera, price: PRICES.candid_photo },
                                                    { id: 'candid_video', label: 'Cinematic Video', icon: Video, price: PRICES.candid_video },
                                                ] : null
                                            }
                                        />
                                    )}

                                    {/* PRE-WEDDING STEP */}
                                    {currentKey === 'prewedding' && (
                                        <div className="flex flex-col items-center w-full gap-8">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">Pre-Wedding <span className="italic text-gold font-light">Shoot</span></h2>
                                            <p className="text-gold/60 uppercase tracking-widest text-xs -mt-4">Optional add-on before your big events</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
                                                <RadioCard id="prewedding_photo" label="Photography Only" icon={Camera} price={20000}
                                                    selected={selections.prewedding === 'prewedding_photo'} onSelect={(v) => handleSelectSingle('prewedding', selections.prewedding === v ? null : v)} />
                                                <RadioCard id="prewedding_both" label="Photography & Video" icon={Video} price={50000}
                                                    selected={selections.prewedding === 'prewedding_both'} onSelect={(v) => handleSelectSingle('prewedding', selections.prewedding === v ? null : v)} />
                                            </div>

                                            <div className="mt-6 flex flex-col gap-2 p-5 border border-white/10 rounded-2xl w-full max-w-3xl text-left bg-noir/40 backdrop-blur-sm">
                                                <div className="flex items-start gap-4">
                                                    <Star className="text-gold flex-shrink-0 mt-0.5 fill-gold" size={16} />
                                                    <p className="text-white/60 text-sm leading-relaxed">
                                                        <span className="text-gold font-medium">Please Note: </span>
                                                        Any location charges, travel expenses, or team accommodation for pre/post-wedding shoots must be borne by the client.
                                                    </p>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <Star className="text-gold flex-shrink-0 mt-0.5 fill-gold" size={16} />
                                                    <p className="text-white/60 text-sm leading-relaxed">
                                                        Costumes and makeup artist charges are not included and must be borne by the client.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* DRONE STEP */}
                                    {currentKey === 'drone' && (
                                        <div className="flex flex-col items-center w-full gap-8">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">Drone <span className="italic text-gold font-light">Coverage</span></h2>
                                            <p className="text-gold/60 uppercase tracking-widest text-xs -mt-4">Select events you want drone for · ₹10,000 per event</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
                                                {['engagement', 'wedding', 'reception'].map(ev => {
                                                    const isChecked = (selections.drone || []).includes(ev);
                                                    return (
                                                        <motion.button
                                                            key={ev}
                                                            type="button"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            onClick={() => handleToggleMulti('drone', ev)}
                                                            className={clsx(
                                                                'flex items-center gap-4 p-4 border rounded-xl transition-all duration-300 text-left group',
                                                                isChecked
                                                                    ? 'bg-gold/10 border-gold shadow-gold'
                                                                    : 'bg-white/2 border-white/10 hover:border-gold/30 hover:bg-white/5'
                                                            )}
                                                        >
                                                            <div className={clsx(
                                                                'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300',
                                                                isChecked ? 'bg-gold border-gold' : 'border-white/30 group-hover:border-gold/50'
                                                            )}>
                                                                {isChecked && <Check size={12} className="text-noir" />}
                                                            </div>
                                                            <span className={clsx(
                                                                'font-medium text-sm uppercase tracking-wider flex-1',
                                                                isChecked ? 'text-gold' : 'text-white/70 group-hover:text-white'
                                                            )}>{STEP_LABELS[ev] || ev}</span>
                                                            <span className={clsx(
                                                                'text-xs font-semibold tracking-wider flex-shrink-0 transition-all duration-300',
                                                                isChecked ? 'text-gold' : 'text-gold/40 group-hover:text-gold/70'
                                                            )}>₹10K</span>
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                            {(selections.drone || []).length > 0 && (
                                                <div className="glass border border-gold/20 rounded-xl px-6 py-4 text-center">
                                                    <p className="text-white/50 text-xs uppercase tracking-widest">Drone Subtotal</p>
                                                    <p className="text-gold font-cinzel text-2xl font-bold mt-1">₹{((selections.drone || []).length * 10000).toLocaleString('en-IN')}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* WEB LIVE STEP */}
                                    {currentKey === 'weblive' && (
                                        <div className="flex flex-col items-center w-full gap-8">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">Web <span className="italic text-gold font-light">Live</span></h2>
                                            <p className="text-gold/60 uppercase tracking-widest text-xs -mt-4">Select events you want live streaming for · ₹8,000 per event</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
                                                {['engagement', 'wedding', 'reception'].map(ev => {
                                                    const isChecked = (selections.weblive || []).includes(ev);
                                                    return (
                                                        <motion.button
                                                            key={ev}
                                                            type="button"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            onClick={() => handleToggleMulti('weblive', ev)}
                                                            className={clsx(
                                                                'flex items-center gap-4 p-4 border rounded-xl transition-all duration-300 text-left group',
                                                                isChecked
                                                                    ? 'bg-gold/10 border-gold shadow-gold'
                                                                    : 'bg-white/2 border-white/10 hover:border-gold/30 hover:bg-white/5'
                                                            )}
                                                        >
                                                            <div className={clsx(
                                                                'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300',
                                                                isChecked ? 'bg-gold border-gold' : 'border-white/30 group-hover:border-gold/50'
                                                            )}>
                                                                {isChecked && <Check size={12} className="text-noir" />}
                                                            </div>
                                                            <span className={clsx(
                                                                'font-medium text-sm uppercase tracking-wider flex-1',
                                                                isChecked ? 'text-gold' : 'text-white/70 group-hover:text-white'
                                                            )}>{STEP_LABELS[ev] || ev}</span>
                                                            <span className={clsx(
                                                                'text-xs font-semibold tracking-wider flex-shrink-0 transition-all duration-300',
                                                                isChecked ? 'text-gold' : 'text-gold/40 group-hover:text-gold/70'
                                                            )}>₹8K</span>
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                            {(selections.weblive || []).length > 0 && (
                                                <div className="glass border border-gold/20 rounded-xl px-6 py-4 text-center">
                                                    <p className="text-white/50 text-xs uppercase tracking-widest">Web Live Subtotal</p>
                                                    <p className="text-gold font-cinzel text-2xl font-bold mt-1">₹{((selections.weblive || []).length * 8000).toLocaleString('en-IN')}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* DELIVERY TIMELINE */}
                                    {currentKey === 'delivery' && (
                                        <div className="flex flex-col items-center w-full gap-8">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">Delivery <span className="italic text-gold font-light">Timeline</span></h2>
                                            <p className="text-gold/60 uppercase tracking-widest text-xs -mt-4">When would you like to receive your memories?</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                                                <RadioCard
                                                    id="delivery_30days"
                                                    label="Within 30 Days"
                                                    subtitle="Premium express delivery"
                                                    icon={ClipboardList}
                                                    price={80000}
                                                    selected={selections.delivery === 'delivery_30days'}
                                                    onSelect={(v) => handleSelectSingle('delivery', v)}
                                                />
                                                <RadioCard
                                                    id="delivery_6months"
                                                    label="Within 6 Months"
                                                    subtitle="Standard delivery"
                                                    icon={ClipboardList}
                                                    price={40000}
                                                    selected={selections.delivery === 'delivery_6months'}
                                                    onSelect={(v) => handleSelectSingle('delivery', v)}
                                                />
                                            </div>
                                            <div className="flex items-start gap-3 bg-white/3 border border-white/10 rounded-xl px-5 py-4 max-w-2xl w-full">
                                                <span className="text-gold text-lg leading-none mt-0.5">★</span>
                                                <p className="text-white/55 text-sm leading-relaxed font-light">
                                                    <span className="text-gold font-medium">Please Note: </span>
                                                    The delivery timeline begins only after the completion of your <span className="text-white/80">entire event</span>. The countdown starts from the last day of your event coverage.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* ALBUM */}
                                    {currentKey === 'album' && (
                                        <div className="flex flex-col items-center w-full gap-8">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">Choose Your <span className="italic text-gold font-light">Album</span></h2>
                                            <p className="text-white/40 text-sm">12×36 Premium Album — 30 Sheets</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                                                {[
                                                    { id: 'album_classic', label: 'Classic', subtitle: 'Elegant & timeless', price: PRICES.album_classic },
                                                    { id: 'album_premium', label: 'Premium', subtitle: 'Luxurious & vivid', price: PRICES.album_premium },
                                                ].map(alb => {
                                                    const qty = albumQty[alb.id] || 0;
                                                    const isSelected = qty > 0;
                                                    return (
                                                        <div
                                                            key={alb.id}
                                                            className={clsx(
                                                                'relative flex flex-col items-center gap-4 p-6 border rounded-2xl transition-all duration-300',
                                                                isSelected ? 'bg-gold/10 border-gold shadow-gold' : 'bg-white/2 border-white/10 hover:border-gold/30'
                                                            )}
                                                        >
                                                            {isSelected && (
                                                                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                                                                    <Check size={11} className="text-noir" />
                                                                </span>
                                                            )}
                                                            <BookOpen size={32} className={isSelected ? 'text-gold' : 'text-white/30'} />
                                                            <div className="text-center">
                                                                <p className={clsx('font-semibold uppercase tracking-widest text-sm', isSelected ? 'text-gold' : 'text-white')}>{alb.label}</p>
                                                                <p className="text-white/40 text-xs mt-1">{alb.subtitle}</p>
                                                                <p className="text-gold font-cinzel text-lg font-bold mt-2">₹{alb.price.toLocaleString('en-IN')}<span className="text-white/30 text-xs font-normal"> /album</span></p>
                                                            </div>
                                                            {/* Quantity Stepper */}
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setAlbumQty(prev => ({ ...prev, [alb.id]: Math.max(0, (prev[alb.id] || 0) - 1) }))}
                                                                    className="w-8 h-8 rounded-full border border-white/20 hover:border-gold text-white/60 hover:text-gold flex items-center justify-center transition-all text-lg font-light"
                                                                >−</button>
                                                                <span className={clsx('font-cinzel text-xl font-bold w-6 text-center', isSelected ? 'text-gold' : 'text-white/40')}>{qty}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setAlbumQty(prev => ({ ...prev, [alb.id]: (prev[alb.id] || 0) + 1 }))}
                                                                    className="w-8 h-8 rounded-full border border-white/20 hover:border-gold text-white/60 hover:text-gold flex items-center justify-center transition-all text-lg font-light"
                                                                >+</button>
                                                            </div>
                                                            {isSelected && (
                                                                <p className="text-gold/70 text-xs">Subtotal: ₹{(qty * alb.price).toLocaleString('en-IN')}</p>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* DELIVERABLES INFO STEP */}
                                    {currentKey === 'deliverables_info' && (
                                        <div className="flex flex-col items-center w-full gap-8 max-w-2xl mx-auto">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">
                                                Your <span className="italic text-gold font-light">Deliverables</span>
                                            </h2>
                                            <div className="glass w-full border border-gold/20 rounded-2xl p-6 md:p-8 text-left max-h-[50vh] overflow-y-auto custom-scrollbar">
                                                <ul className="flex flex-col gap-4">
                                                    {getDeliverables(selections).map((item, i) => (
                                                        <li key={i} className="flex gap-4 text-sm md:text-base text-white/80 items-start">
                                                            <CheckCircle2 size={18} className="text-gold flex-shrink-0 mt-0.5" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* PERSONAL DETAILS */}
                                    {currentKey === 'details' && (
                                        <div className="flex flex-col items-center w-full gap-8 max-w-2xl mx-auto">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">
                                                Your <span className="italic text-gold font-light">Details</span>
                                            </h2>

                                            {/* Estimated Total Summary */}
                                            <div className="glass border border-gold/15 rounded-xl p-6 w-full text-sm">
                                                <p className="text-gold uppercase tracking-widest text-xs mb-4 font-medium">Estimated Total</p>
                                                <p className="font-cinzel text-4xl text-gold font-bold">₹{total.toLocaleString('en-IN')}</p>
                                                <p className="text-white/40 text-xs mt-1">Final pricing confirmed after consultation</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                                                {/* Row 1: Bride & Groom */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="relative">
                                                        <Heart size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                                                        <input required type="text" placeholder="Bride's Name"
                                                            value={form.brideName}
                                                            onChange={e => setForm(p => ({ ...p, brideName: e.target.value }))}
                                                            className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all" />
                                                    </div>
                                                    <div className="relative">
                                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                                                        <input required type="text" placeholder="Groom's Name"
                                                            value={form.groomName}
                                                            onChange={e => setForm(p => ({ ...p, groomName: e.target.value }))}
                                                            className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all" />
                                                    </div>
                                                </div>

                                                {/* Row 2: Phone with country code */}
                                                <div className="flex gap-2">
                                                    <CountryPicker
                                                        value={form.countryCode}
                                                        onChange={code => setForm(p => ({ ...p, countryCode: code }))}
                                                    />
                                                    <div className="relative flex-1">
                                                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                                                        <input required type="tel" placeholder="Mobile Number"
                                                            value={form.phone}
                                                            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                                            className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all" />
                                                    </div>
                                                </div>

                                                {/* Row 3: Email */}
                                                <div className="relative">
                                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                                                    <input required type="email" placeholder="Email Address"
                                                        value={form.email}
                                                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                                        className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all" />
                                                </div>

                                                {/* Row 4: No. of Events & Wedding Date */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="relative">
                                                        <Star size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                                                        <select
                                                            value={form.events}
                                                            onChange={e => setForm(p => ({ ...p, events: e.target.value }))}
                                                            className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-gold/50 transition-all appearance-none"
                                                        >
                                                            <option value="" disabled className="bg-noir">No. of Events</option>
                                                            {[1, 2, 3, 4, 5, 6, 7, '8+'].map(n => (
                                                                <option key={n} value={n} className="bg-noir">{n} Event{n !== 1 ? 's' : ''}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="relative">
                                                        <CalendarDays size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                                                        <input required type="date" placeholder="Wedding Date"
                                                            value={form.date}
                                                            onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                                                            className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all [color-scheme:dark]" />
                                                    </div>
                                                </div>

                                                {/* Row 5: Location */}
                                                <div className="relative">
                                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" />
                                                    <input type="text" placeholder="Wedding Location (City / Venue)"
                                                        value={form.location}
                                                        onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                                                        className="w-full bg-white/5 border border-white/15 rounded-lg pl-11 pr-4 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all" />
                                                </div>

                                                {/* Post-production Note */}
                                                <div className="flex items-start gap-3 bg-white/3 border border-gold/20 rounded-xl px-5 py-4 w-full">
                                                    <span className="text-gold text-lg leading-none mt-0.5">★</span>
                                                    <p className="text-white/60 text-sm leading-relaxed font-light">
                                                        <span className="text-gold font-medium">Note: </span>
                                                        Post-production work will commence after receiving <span className="text-white font-medium">90% payment</span>.
                                                    </p>
                                                </div>

                                                {/* Terms & Conditions */}
                                                <div className="w-full">
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowTerms(p => !p)}
                                                        className="flex items-center gap-2 text-gold/70 hover:text-gold text-xs uppercase tracking-widest transition-colors"
                                                    >
                                                        <span className={`transition-transform duration-300 ${showTerms ? 'rotate-90' : ''}`}>▶</span>
                                                        {showTerms ? 'Hide' : 'View'} Terms &amp; Conditions
                                                    </button>
                                                    {showTerms && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 glass border border-white/10 rounded-xl p-5"
                                                        >
                                                            <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4 border-b border-gold/10 pb-2">Terms &amp; Conditions</h4>
                                                            <ol className="flex flex-col gap-2">
                                                                {TERMS.map((t, i) => (
                                                                    <li key={i} className="flex gap-3 text-xs text-white/55 leading-relaxed">
                                                                        <span className="text-gold font-bold flex-shrink-0">{i + 1}.</span>
                                                                        <span>{t}</span>
                                                                    </li>
                                                                ))}
                                                            </ol>
                                                        </motion.div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
                                                    <motion.button
                                                        type="button"
                                                        onClick={() => setShowPreview(true)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        className="w-full py-5 border border-gold/40 text-gold font-bold uppercase tracking-[0.2em] text-sm rounded-lg hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        <ClipboardList size={18} /> Preview Selections
                                                    </motion.button>

                                                    <motion.button
                                                        type="submit"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        className="w-full py-5 bg-gold text-noir font-bold uppercase tracking-[0.2em] text-sm rounded-lg hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        Submit Quote <ArrowRight size={18} />
                                                    </motion.button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* SUCCESS STATE */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center text-center max-w-md mx-auto"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                                        className="w-24 h-24 rounded-full bg-gold flex items-center justify-center shadow-gold-lg mb-8"
                                    >
                                        <CheckCircle2 size={48} className="text-noir" />
                                    </motion.div>
                                    <h2 className="font-serif text-4xl text-white mb-4">Your Vision Is Set!</h2>
                                    <p className="text-white/60 leading-relaxed font-light mb-2">
                                        Your quote has been sent to our team on WhatsApp and your PDF has been downloaded automatically.
                                    </p>
                                    <p className="text-white/40 text-sm mb-6">We'll reach out within 24 hours with a personalized proposal.</p>
                                    <p className="font-cinzel text-gold text-3xl font-bold mb-2">Rs.{total.toLocaleString('en-IN')}</p>
                                    <p className="text-white/30 text-xs uppercase tracking-widest mb-8">Estimated Package Value</p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 w-full">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={generateQuotePDF}
                                            className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-noir font-bold uppercase tracking-widest text-sm rounded-lg hover:shadow-gold-lg transition-all"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                            Download PDF Quote
                                        </motion.button>
                                    </div>

                                    <div className="gold-divider w-24 mt-8 mb-8" />
                                    <a href="/" className="text-gold text-sm uppercase tracking-widest hover:text-white transition-colors">← Back to Home</a>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* NAVIGATION BUTTONS */}
                    {!submitted && (
                        <div className="flex items-center justify-between mt-8 px-2">
                            <button
                                onClick={handleBack}
                                disabled={step === 0}
                                className={clsx(
                                    'flex items-center gap-2 text-sm uppercase tracking-widest transition-colors',
                                    step === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/50 hover:text-white'
                                )}
                            >
                                <ArrowLeft size={16} /> Back
                            </button>

                            {currentKey !== 'details' && (
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleNext}
                                    className="flex items-center gap-3 px-8 py-3 bg-gold text-noir font-bold text-sm uppercase tracking-widest rounded-sm hover:shadow-gold transition-all duration-300"
                                >
                                    Next Step <ArrowRight size={16} />
                                </motion.button>
                            )}
                        </div>
                    )}
                </div>

                {/* PREVIEW MODAL */}
                <AnimatePresence>
                    {showPreview && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-md flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: 20 }}
                                className="bg-noir-200 border border-gold/20 w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                <div className="flex items-center justify-between p-6 border-b border-gold/10 bg-noir">
                                    <div>
                                        <h3 className="font-serif text-2xl text-gold">Quote Preview</h3>
                                        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Review your selections</p>
                                    </div>
                                    <button onClick={() => setShowPreview(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-gold hover:text-noir transition-colors text-white/50">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column: Details & General */}
                                        <div className="flex flex-col gap-6">
                                            <div className="glass p-5 rounded-xl border border-white/5">
                                                <h4 className="text-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-2">Client Details</h4>
                                                <div className="flex flex-col gap-2 text-sm">
                                                    <div className="flex justify-between"><span className="text-white/40">Bride & Groom</span><span className="text-white text-right">{form.brideName || '-'} & {form.groomName || '-'}</span></div>
                                                    <div className="flex justify-between"><span className="text-white/40">Contact</span><span className="text-white text-right">{form.countryCode} {form.phone}</span></div>
                                                    <div className="flex justify-between"><span className="text-white/40">Email</span><span className="text-white text-right truncate">{form.email || '-'}</span></div>
                                                    <div className="flex justify-between"><span className="text-white/40">Date</span><span className="text-white text-right">{form.date || '-'}</span></div>
                                                    <div className="flex justify-between"><span className="text-white/40">Location</span><span className="text-white text-right">{form.location || '-'}</span></div>
                                                </div>
                                            </div>
                                            <div className="glass p-5 rounded-xl border border-white/5">
                                                <h4 className="text-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-2">Style & Deliverables</h4>
                                                <div className="flex flex-col gap-2 text-sm">
                                                    <div className="flex justify-between"><span className="text-white/40">Photography</span><span className="text-white text-right capitalize">{selections.photography || 'Not selected'}</span></div>
                                                    <div className="flex justify-between"><span className="text-white/40">Delivery</span><span className="text-white text-right">{selections.delivery === 'delivery_30days' ? 'Within 30 Days' : selections.delivery === 'delivery_6months' ? 'Within 6 Months' : 'Not selected'}</span></div>
                                                    <div className="flex justify-between"><span className="text-white/40">Album</span><span className="text-white text-right">
                                                        {[albumQty.album_classic > 0 ? `Classic ×${albumQty.album_classic}` : null, albumQty.album_premium > 0 ? `Premium ×${albumQty.album_premium}` : null].filter(Boolean).join(', ') || 'None'}
                                                    </span></div>
                                                    {(selections.drone || []).length > 0 && <div className="flex justify-between"><span className="text-white/40">Drone</span><span className="text-white text-right">{(selections.drone || []).map(ev => STEP_LABELS[ev] || ev).join(', ')}</span></div>}
                                                    {(selections.weblive || []).length > 0 && <div className="flex justify-between"><span className="text-white/40">Web Live</span><span className="text-white text-right">{(selections.weblive || []).map(ev => STEP_LABELS[ev] || ev).join(', ')}</span></div>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column: Events Payload */}
                                        <div className="glass p-5 rounded-xl border border-white/5 h-fit">
                                            <h4 className="text-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-2">Event Coverage</h4>
                                            <div className="flex flex-col gap-4">
                                                {['engagement', 'bride_haldi', 'bride', 'groom_haldi', 'groom', 'mehendi', 'sangeeth', 'wedding', 'vratham', 'reception'].map(ev => {
                                                    const svcs = selections[ev] || [];
                                                    if (!svcs.length) return null;
                                                    const SVC_PREVIEW_LABEL = {
                                                        candid_photo: 'Cinematic Photo',
                                                        traditional_photo: 'Traditional Photo',
                                                        candid_video: 'Cinematic Video',
                                                        traditional_video: 'Traditional Video',
                                                    };
                                                    return (
                                                        <div key={ev} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                                            <p className="text-white font-semibold text-sm mb-2">{STEP_LABELS[ev] || ev}</p>
                                                            {svcs.map(s => {
                                                                const isCam = s.includes('photo') || s.includes('video');
                                                                const cnt = isCam ? (cameraCount[`${ev}_${s}`] || 1) : null;
                                                                return (
                                                                    <div key={s} className="flex justify-between items-center text-xs py-0.5 pl-3">
                                                                        <span className="text-white/50 flex items-center gap-1.5">
                                                                            <span className="text-gold/50">•</span>
                                                                            {SVC_PREVIEW_LABEL[s] || s.replace(/_/g, ' ')}
                                                                        </span>
                                                                        {cnt && <span className="text-gold font-medium">{cnt} Cam{cnt > 1 ? 's' : ''}</span>}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })}
                                                {!['engagement', 'bride_haldi', 'bride', 'groom_haldi', 'groom', 'mehendi', 'sangeeth', 'wedding', 'vratham', 'reception'].some(s => (selections[s] || []).length > 0) && (
                                                    <span className="text-white/30 text-xs italic">No event services selected.</span>
                                                )}

                                                {/* Pre Wedding Preview addition */}
                                                {selections.prewedding && (
                                                    <div className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                                        <p className="text-white font-semibold text-sm mb-2">Pre-Wedding Shoot</p>
                                                        <div className="flex justify-between items-center text-xs py-0.5 pl-3">
                                                            <span className="text-white/50 flex items-center gap-1.5">
                                                                <span className="text-gold/50">•</span>
                                                                {selections.prewedding === 'prewedding_photo' ? 'Photography Only' : 'Photography & Video'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Deliverables Preview */}
                                        <div className="glass p-5 rounded-xl border border-white/5 h-fit mt-6">
                                            <h4 className="text-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-2">Deliverables</h4>
                                            <ul className="flex flex-col gap-3">
                                                {getDeliverables(selections).map((item, i) => (
                                                    <li key={i} className="flex gap-3 text-xs text-white/70">
                                                        <span className="text-gold flex-shrink-0 mt-0.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* T&C in Preview */}
                                    <div className="px-8 pb-6">
                                        <div className="border border-white/8 rounded-xl p-5">
                                            <h4 className="text-gold text-xs uppercase tracking-widest font-bold mb-4 border-b border-gold/10 pb-2">Terms &amp; Conditions</h4>
                                            <ol className="flex flex-col gap-2">
                                                {TERMS.map((t, i) => (
                                                    <li key={i} className="flex gap-3 text-xs text-white/50 leading-relaxed">
                                                        <span className="text-gold font-bold flex-shrink-0">{i + 1}.</span>
                                                        <span>{t}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-noir border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-widest">Total Estimated Value</p>
                                        <p className="font-cinzel text-gold text-2xl font-bold">Rs. {total.toLocaleString('en-IN')}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowPreview(false);
                                            // The submit event handles WhatsApp & PDF
                                            const fakeEvent = { preventDefault: () => { } };
                                            handleSubmit(fakeEvent);
                                        }}
                                        className="w-full md:w-auto px-8 py-4 bg-gold text-noir font-bold uppercase tracking-[0.2em] text-sm rounded-lg hover:shadow-gold-lg transition-all duration-300"
                                    >
                                        Confirm & Submit Request
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <PremiumFooter />
        </div>
    );
}
