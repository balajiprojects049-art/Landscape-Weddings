import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Clapperboard, Image, CheckCircle2, ArrowLeft, ArrowRight, Heart, Star, MapPin, User, Phone, Mail, CalendarDays, Check, ChevronDown, X, ClipboardList } from 'lucide-react';
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
    candid_photo: 25000,
    traditional_photo: 15000,
    candid_video: 35000,
    traditional_video: 20000,
    drone: 10000,
    extra_camera: 10000,
    album_synthetic: 8000,
    album_metallic: 12000,
    album_glossy: 10000,
};

// ── OPTION CARD ────────────────────────────────────────────────────────────
function OptionCard({ id, label, icon: Icon, selected, onToggle, price, showStepper, count, onUpdateCount }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToggle(id)}
            className={clsx(
                'relative flex flex-col items-center justify-start gap-2 p-5 md:p-6 border rounded-xl transition-all duration-400 group cursor-pointer min-h-[220px]',
                selected
                    ? 'bg-gold/10 border-gold shadow-gold'
                    : 'bg-white/2 border-white/10 hover:border-gold/30 hover:bg-white/5'
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
                'relative flex flex-col items-center justify-center gap-3 p-8 border rounded-xl transition-all duration-400 group cursor-pointer w-full',
                selected
                    ? 'bg-gold/10 border-gold shadow-gold'
                    : 'bg-white/2 border-white/10 hover:border-gold/30 hover:bg-white/5'
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
function EventStep({ title, stepKey, selections, onToggle, cameraCount, onCameraCount }) {
    const options = [
        { id: 'candid_photo', label: 'Candid Photo', icon: Camera, price: PRICES.candid_photo },
        { id: 'traditional_photo', label: 'Traditional Photo', icon: Image, price: PRICES.traditional_photo },
        { id: 'candid_video', label: 'Candid Video', icon: Video, price: PRICES.candid_video },
        { id: 'traditional_video', label: 'Traditional Video', icon: Clapperboard, price: PRICES.traditional_video },
        { id: 'drone', label: 'Drone Coverage', icon: Star, price: PRICES.drone },
    ];

    const eventSel = selections[stepKey] || [];

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-2 text-center">{title}</h2>
            <p className="text-gold/60 uppercase tracking-widest text-xs mb-10">Select all that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full max-w-[1000px] mb-8">
                {options.map((opt) => {
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
        </div>
    );
}

// ── STEP DEFINITIONS ───────────────────────────────────────────────────────
const STEPS = [
    'photography',
    'engagement',
    'bride_haldi',
    'groom_haldi',
    'mehendi',
    'sangeeth',
    'wedding',
    'reception',
    'album',
    'details',
];

const STEP_LABELS = {
    photography: 'Photography Style',
    engagement: 'Engagement',
    bride_haldi: 'Bride Haldi Ceremony',
    groom_haldi: 'Groom Haldi Ceremony',
    mehendi: 'Mehendi ',
    sangeeth: 'Sangeeth ',
    wedding: 'The Big Day',
    reception: 'Reception',
    album: 'Album Selection',
    details: 'Your Details',
};

// ── MAIN QUOTE PAGE ────────────────────────────────────────────────────────
export default function QuotePage() {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [cameraCount, setCameraCount] = useState({});  // { engagement: 1, haldi: 2, ... }
    const [form, setForm] = useState({
        brideName: '', groomName: '',
        countryCode: '+91', phone: '',
        email: '', events: '', date: '', location: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

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
    const total = servicesTotal + cameraTotal;

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
        const dark = [15, 15, 15];
        const mid = [80, 80, 80];
        const light = [200, 200, 200];
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
            docObj.setFillColor(...dark);
            docObj.rect(6.5, H - 24.5, W - 13, 18, 'F');
            docObj.setFont('helvetica', 'normal');
            docObj.setFontSize(8);
            docObj.setTextColor(...light);
            docObj.text('Thank you for considering Landscape Weddings to capture your forever moments.', W / 2, H - 17, { align: 'center' });
            docObj.setTextColor(...gold);
            docObj.text('landscapeweddings.in  |  +91 9115994999', W / 2, H - 11, { align: 'center' });
        };

        drawPageOverlay(doc);

        // ── HEADER BAND ──────────────────────────────────────────────────────
        doc.setFillColor(...dark);
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
            'Ph: +91 9115994999   |   landscapeweddings.in   |   info@landscapeweddings.in',
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

        // ── COUPLE DETAILS ───────────────────────────────────────────────────
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

        // ── SERVICE BREAKDOWN ────────────────────────────────────────────────
        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...gold);
        doc.text('SERVICE BREAKDOWN & INVESTMENT', 16, y);
        y += 4;

        const SVC_LABEL = {
            candid_photo: 'Candid Photography',
            traditional_photo: 'Traditional Photography',
            candid_video: 'Candid Video',
            traditional_video: 'Traditional Video',
            drone: 'Drone Coverage',
        };

        const tableRows = [];

        // Photography style
        if (selections.photography) {
            tableRows.push([
                'Photography Style',
                selections.photography === 'candid' ? 'Candid Photography' : 'Traditional Photography',
                '-',
                '-',
            ]);
        }

        // Event coverage
        ['engagement', 'bride_haldi', 'groom_haldi', 'mehendi', 'sangeeth', 'wedding', 'reception'].forEach(ev => {
            const evSel = selections[ev] || [];
            if (!evSel.length) return;

            evSel.forEach(svc => {
                const isPhotoVideo = svc.includes('photo') || svc.includes('video');
                const camCount = isPhotoVideo ? (cameraCount[`${ev}_${svc}`] || 1) : 1;
                const extraCamCost = (camCount - 1) * PRICES.extra_camera;
                const price = PRICES[svc] || 0;

                const svcName = SVC_LABEL[svc] || svc;
                const camString = isPhotoVideo ? `${camCount} Cam${camCount > 1 ? 's' : ''}` : '-';

                tableRows.push([
                    STEP_LABELS[ev].toUpperCase(),
                    svcName,
                    camString,
                    `Rs. ${(price + extraCamCost).toLocaleString('en-IN')}`,
                ]);
            });
        });

        // Album
        if (selections.album) {
            const albumPrices = { album_synthetic: 8000, album_metallic: 12000, album_glossy: 10000 };
            const albumNames = { album_synthetic: 'Synthetic Finish Premium Album', album_metallic: 'Metallic Finish Premium Album', album_glossy: 'Glossy Print Premium Album' };
            tableRows.push([
                'Album',
                albumNames[selections.album] || selections.album,
                '1',
                `Rs. ${(albumPrices[selections.album] || 0).toLocaleString('en-IN')}`,
            ]);
        }

        autoTable(doc, {
            startY: y,
            head: [['EVENT / CATEGORY', 'SERVICE TYPE', 'TOTAL CAMERAS', 'AMOUNT']],
            body: tableRows,
            theme: 'grid',
            headStyles: { fillColor: gold, textColor: dark, fontStyle: 'bold', fontSize: 8, halign: 'center' },
            bodyStyles: { fontSize: 7.5, textColor: [40, 40, 40], cellPadding: 2, fillColor: false },
            alternateRowStyles: { fillColor: [250, 248, 243, 0.4] }, // slight transparency if jsPDF accepts it, mostly it just uses light tint
            columnStyles: {
                0: { cellWidth: 45, fontStyle: 'bold', textColor: [20, 20, 20] },
                1: { cellWidth: 70 },
                2: { cellWidth: 25, halign: 'center' },
                3: { cellWidth: 35, halign: 'right', fontStyle: 'bold', textColor: [20, 20, 20] },
            },
            margin: { left: 16, right: 16 },
            styles: { lineColor: [220, 210, 190], lineWidth: 0.1 }
        });

        // ── TOTAL SUMMARY BOX ────────────────────────────────────────────────
        let finalY = doc.lastAutoTable.finalY + 8;

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

        // ── TERMS & CONDITIONS ───────────────────────────────────────────────
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7.5);
        doc.setTextColor(...mid);
        doc.text('* Pricing is an estimate and valid for 14 days. Final pricing confirmed after consultation. Taxes may apply as per government regulations.', 16, finalY + 28);

        // Download
        const fileName = `LandscapeWeddings_Quote_${form.brideName || 'Bride'}_${form.groomName || 'Groom'}.pdf`;
        doc.save(fileName);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneFormatted = `${form.countryCode} ${form.phone}`;
        const albumLabel = { album_synthetic: 'Synthetic (Rs.8,000)', album_metallic: 'Metallic Finish (Rs.12,000)', album_glossy: 'Glossy Print (Rs.10,000)' }[selections.album] || 'Not selected';

        const serviceLabel = { candid_photo: 'Candid Photography', traditional_photo: 'Traditional Photography', candid_video: 'Candid Video', traditional_video: 'Traditional Video', drone: 'Drone Coverage (Rs.10,000)' };
        const eventLines = ['engagement', 'bride_haldi', 'groom_haldi', 'mehendi', 'sangeeth', 'wedding', 'reception']
            .map(ev => {
                const evSel = (selections[ev] || []);
                if (!evSel.length) return null;

                const svcs = evSel.map(svc => {
                    const isPhotoVideo = svc.includes('photo') || svc.includes('video');
                    const camCount = isPhotoVideo ? (cameraCount[`${ev}_${svc}`] || 1) : 1;
                    const extraCost = (camCount - 1) * PRICES.extra_camera;
                    const camNote = camCount > 1 ? ` [${camCount} Cameras +Rs.${extraCost.toLocaleString('en-IN')}]` : '';
                    return (serviceLabel[svc] || svc) + camNote;
                }).join(', ');

                return `  * ${STEP_LABELS[ev]}: ${svcs}`;
            })
            .filter(Boolean)
            .join('\n') || '  * None selected';

        const msg =
            `*New Quote Request - Landscape Weddings*\n\n` +
            `Bride: ${form.brideName}\n` +
            `Groom: ${form.groomName}\n` +
            `Phone: ${phoneFormatted}\n` +
            `Email: ${form.email}\n` +
            `Wedding Date: ${form.date || 'Not specified'}\n` +
            `Location: ${form.location || 'Not specified'}\n` +
            `No. of Events: ${form.events || 'Not specified'}\n\n` +
            `Photography: ${selections.photography === 'candid' ? 'Candid' : selections.photography === 'traditional' ? 'Traditional' : 'Not selected'}\n\n` +
            `Event Coverage:\n${eventLines}\n\n` +
            `Album: ${albumLabel}\n\n` +
            `*Estimated Total: Rs.${total.toLocaleString('en-IN')}*\n` +
            `_(Final pricing confirmed after consultation)_\n\n` +
            `_Sent from Quote Builder on landscapeweddings.in_`;

        sendToWhatsApp(msg);
        generateQuotePDF();
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
                        animate={{ scale: total > 0 ? [1, 1.06, 1] : 1 }}
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
                                                <RadioCard id="traditional" label="Traditional Photography" icon={Image} subtitle="Posed & formal"
                                                    selected={selections.photography === 'traditional'} onSelect={(v) => handleSelectSingle('photography', v)} />
                                            </div>
                                        </div>
                                    )}

                                    {/* EVENT STEPS */}
                                    {['engagement', 'bride_haldi', 'groom_haldi', 'mehendi', 'sangeeth', 'wedding', 'reception'].includes(currentKey) && (
                                        <EventStep
                                            title={STEP_LABELS[currentKey]}
                                            stepKey={currentKey}
                                            selections={selections}
                                            onToggle={handleToggleMulti}
                                            cameraCount={cameraCount}
                                            onCameraCount={handleCameraCount}
                                        />
                                    )}

                                    {/* ALBUM */}
                                    {currentKey === 'album' && (
                                        <div className="flex flex-col items-center w-full gap-8">
                                            <h2 className="font-serif text-3xl md:text-5xl text-white text-center">Choose Your <span className="italic text-gold font-light">Album</span></h2>
                                            <p className="text-white/40 text-sm">12×36 Premium Album — 30 curated photos</p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
                                                <RadioCard id="album_synthetic" label="Synthetic" subtitle="Durable & elegant" icon={Star} price={8000}
                                                    selected={selections.album === 'album_synthetic'} onSelect={(v) => handleSelectSingle('album', v)} />
                                                <RadioCard id="album_metallic" label="Metallic Finish" subtitle="Vivid & luxurious" icon={Star} price={12000}
                                                    selected={selections.album === 'album_metallic'} onSelect={(v) => handleSelectSingle('album', v)} />
                                                <RadioCard id="album_glossy" label="Glossy Print" subtitle="Classic premium" icon={Star} price={10000}
                                                    selected={selections.album === 'album_glossy'} onSelect={(v) => handleSelectSingle('album', v)} />
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
                                                    <div className="flex justify-between"><span className="text-white/40">Album</span><span className="text-white text-right capitalize">{selections.album ? selections.album.replace('album_', '') : 'Not selected'}</span></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column: Events Payload */}
                                        <div className="glass p-5 rounded-xl border border-white/5 h-fit">
                                            <h4 className="text-gold text-xs uppercase tracking-[0.2em] mb-4 font-bold border-b border-gold/10 pb-2">Event Coverage</h4>
                                            <div className="flex flex-col gap-4">
                                                {['engagement', 'bride_haldi', 'groom_haldi', 'mehendi', 'sangeeth', 'wedding', 'reception'].map(ev => {
                                                    const svcs = selections[ev] || [];
                                                    if (!svcs.length) return null;
                                                    return (
                                                        <div key={ev} className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                                            <span className="text-white font-medium capitalize">{ev.replace('_', ' ')}</span>
                                                            {svcs.map(s => {
                                                                const isCam = s.includes('photo') || s.includes('video');
                                                                const cnt = isCam ? (cameraCount[`${ev}_${s}`] || 1) : null;
                                                                return (
                                                                    <div key={s} className="flex justify-between text-xs text-white/50 pl-2">
                                                                        <span className="capitalize flex items-center gap-1">• {s.replace('_', ' ')}</span>
                                                                        {cnt && <span className="text-gold/80">{cnt} Cam{cnt > 1 ? 's' : ''}</span>}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    );
                                                })}
                                                {!STEPS.some(s => ['engagement', 'bride_haldi', 'groom_haldi', 'mehendi', 'sangeeth', 'wedding', 'reception'].includes(s) && (selections[s] || []).length > 0) && (
                                                    <span className="text-white/30 text-xs italic">No event services selected.</span>
                                                )}
                                            </div>
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
