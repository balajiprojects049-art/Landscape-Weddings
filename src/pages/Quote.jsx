import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Clapperboard, Image, CheckCircle2, ArrowLeft, ArrowRight, Heart, Star, MapPin, User, Phone, Mail, CalendarDays, Check, ChevronDown } from 'lucide-react';
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
function OptionCard({ id, label, icon: Icon, selected, onToggle, price }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onToggle(id)}
            className={clsx(
                'relative flex flex-col items-center justify-center gap-4 p-8 md:p-10 border rounded-xl transition-all duration-400 group cursor-pointer',
                selected
                    ? 'bg-gold/10 border-gold shadow-gold'
                    : 'bg-white/2 border-white/10 hover:border-gold/30 hover:bg-white/5'
            )}
        >
            {selected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gold flex items-center justify-center"
                >
                    <Check size={12} className="text-noir" />
                </motion.div>
            )}
            <div className={clsx(
                'p-4 rounded-2xl transition-all duration-300',
                selected ? 'bg-gold text-noir' : 'bg-white/5 text-white/50 group-hover:text-gold group-hover:bg-gold/10'
            )}>
                <Icon size={32} />
            </div>
            <span className={clsx(
                'text-sm font-medium uppercase tracking-wider text-center transition-colors',
                selected ? 'text-gold' : 'text-white/60 group-hover:text-white'
            )}>{label}</span>
            {price && (
                <span className={clsx(
                    'text-xs font-semibold tracking-wider transition-all duration-300',
                    selected
                        ? 'text-gold opacity-100 translate-y-0'
                        : 'text-gold/70 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'
                )}>+ ₹{price.toLocaleString('en-IN')}</span>
            )}
        </motion.button>
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
    const hasPhoto = eventSel.some(s => s.includes('photo') || s.includes('video'));
    const cameras = cameraCount[stepKey] || 1;

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-2 text-center">{title}</h2>
            <p className="text-gold/60 uppercase tracking-widest text-xs mb-10">Select all that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl">
                {options.map((opt) => (
                    <OptionCard
                        key={opt.id}
                        id={opt.id}
                        label={opt.label}
                        icon={opt.icon}
                        price={opt.price}
                        selected={eventSel.includes(opt.id)}
                        onToggle={(id) => onToggle(stepKey, id)}
                    />
                ))}
            </div>
            {/* Camera Count Stepper — shows when any service is selected */}
            <AnimatePresence>
                {hasPhoto && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.4 }}
                        className="mt-8 flex flex-col items-center gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <Camera size={16} className="text-gold/60" />
                            <span className="text-white/40 text-xs uppercase tracking-widest">Cameras</span>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-0 border border-gold/30 rounded-xl overflow-hidden bg-white/3">
                            {/* Minus */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onCameraCount(stepKey, Math.max(1, cameras - 1))}
                                disabled={cameras <= 1}
                                className={clsx(
                                    'w-12 h-12 flex items-center justify-center text-xl font-bold transition-all duration-200',
                                    cameras <= 1
                                        ? 'text-white/15 cursor-not-allowed'
                                        : 'text-gold hover:bg-gold/10 cursor-pointer'
                                )}
                            >
                                −
                            </motion.button>

                            {/* Count Display */}
                            <div className="w-16 h-12 flex flex-col items-center justify-center border-x border-gold/20">
                                <span className="text-gold font-bold text-xl leading-none">{cameras}</span>
                                <span className="text-white/30 text-[9px] uppercase tracking-wider mt-0.5">
                                    {cameras === 1 ? 'Camera' : 'Cameras'}
                                </span>
                            </div>

                            {/* Plus */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onCameraCount(stepKey, Math.min(4, cameras + 1))}
                                disabled={cameras >= 4}
                                className={clsx(
                                    'w-12 h-12 flex items-center justify-center text-xl font-bold transition-all duration-200',
                                    cameras >= 4
                                        ? 'text-white/15 cursor-not-allowed'
                                        : 'text-gold hover:bg-gold/10 cursor-pointer'
                                )}
                            >
                                +
                            </motion.button>
                        </div>

                        {/* Cost note */}
                        <AnimatePresence>
                            {cameras > 1 && (
                                <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="text-gold/70 text-xs"
                                >
                                    +₹{((cameras - 1) * PRICES.extra_camera).toLocaleString('en-IN')} for extra {cameras - 1} camera{cameras > 2 ? 's' : ''}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

// ── STEP DEFINITIONS ───────────────────────────────────────────────────────
const STEPS = [
    'photography',
    'engagement',
    'haldi',
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
    haldi: 'Haldi Ceremony',
    mehendi: 'Mehendi',
    sangeeth: 'Sangeeth / Sangeet',
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

    const totalSteps = STEPS.length;
    const progress = ((step) / (totalSteps - 1)) * 100;

    // Compute total price (services + extra cameras)
    const servicesTotal = Object.values(selections).reduce((acc, val) => {
        if (Array.isArray(val)) {
            return acc + val.reduce((a, k) => a + (PRICES[k] || 0), 0);
        }
        return acc + (PRICES[val] || 0);
    }, 0);
    const cameraTotal = Object.entries(cameraCount).reduce((acc, [key, cnt]) => {
        const hasSel = (selections[key] || []).some(s => s.includes('photo') || s.includes('video'));
        return acc + (hasSel && cnt > 1 ? (cnt - 1) * PRICES.extra_camera : 0);
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const coupleNames = `${form.brideName} & ${form.groomName}`;
        const phoneFormatted = `${form.countryCode} ${form.phone}`;
        const albumLabel = { album_synthetic: 'Synthetic (₹8,000)', album_metallic: 'Metallic Finish (₹12,000)', album_glossy: 'Glossy Print (₹10,000)' }[selections.album] || 'Not selected';

        const serviceLabel = { candid_photo: 'Candid Photography', traditional_photo: 'Traditional Photography', candid_video: 'Candid Video', traditional_video: 'Traditional Video', drone: 'Drone Coverage (₹10,000)' };
        const eventLines = ['engagement', 'haldi', 'mehendi', 'sangeeth', 'wedding', 'reception']
            .map(ev => {
                const evSel = (selections[ev] || []);
                if (!evSel.length) return null;
                const camCount = cameraCount[ev] || 1;
                const extraCost = (camCount - 1) * PRICES.extra_camera;
                const camNote = camCount > 1 ? ` [${camCount} Cameras +₹${extraCost.toLocaleString('en-IN')}]` : '';
                return `  • ${STEP_LABELS[ev]}: ${evSel.map(s => serviceLabel[s] || s).join(', ')}${camNote}`;
            })
            .filter(Boolean)
            .join('\n') || '  • None selected';

        const msg =
            `💍 *New Quote Request — Landscape Weddings*

� *Bride:* ${form.brideName}
🤵 *Groom:* ${form.groomName}
📞 *Phone:* ${phoneFormatted}
✉️ *Email:* ${form.email}
📅 *Wedding Date:* ${form.date || 'Not specified'}
📍 *Location:* ${form.location || 'Not specified'}
🎉 *No. of Events:* ${form.events || 'Not specified'}

📸 *Photography Style:* ${selections.photography === 'candid' ? 'Candid (₹25,000)' : selections.photography === 'traditional' ? 'Traditional (₹15,000)' : 'Not selected'}

🎉 *Event Coverage:*
${eventLines}

📓 *Album:* ${albumLabel}

✨ *Estimated Total: ₹${total.toLocaleString('en-IN')}*
_(Final pricing confirmed after consultation)_

_Sent from Quote Builder on landscapeweddings.in_`;

        sendToWhatsApp(msg);
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

                {/* PRICE BUBBLE */}
                <motion.div
                    className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-16 h-16 rounded-full bg-gold flex flex-col items-center justify-center shadow-gold-lg cursor-default">
                        <span className="text-noir text-[8px] font-semibold uppercase tracking-widest leading-none">₹ Total</span>
                        <span className="text-noir font-bold text-xs leading-tight">
                            {total > 0 ? (total / 1000).toFixed(0) + 'K' : '0'}
                        </span>
                    </div>
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
                                                <RadioCard id="candid" label="Candid Photography" icon={Camera} subtitle="Artistic & unposed" price={25000}
                                                    selected={selections.photography === 'candid'} onSelect={(v) => handleSelectSingle('photography', v)} />
                                                <RadioCard id="traditional" label="Traditional Photography" icon={Image} subtitle="Posed & formal" price={15000}
                                                    selected={selections.photography === 'traditional'} onSelect={(v) => handleSelectSingle('photography', v)} />
                                            </div>
                                        </div>
                                    )}

                                    {/* EVENT STEPS */}
                                    {['engagement', 'haldi', 'mehendi', 'sangeeth', 'wedding', 'reception'].includes(currentKey) && (
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
                                            <p className="text-white/40 text-sm">12×18 Premium Album — 40 curated photos</p>
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

                                                <motion.button
                                                    type="submit"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="w-full py-5 bg-gold text-noir font-bold uppercase tracking-[0.2em] text-sm rounded-lg hover:shadow-gold-lg transition-all duration-300 mt-2"
                                                >
                                                    ❖ Submit My Quote Request
                                                </motion.button>
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
                                    <p className="text-white/60 leading-relaxed font-light mb-6">
                                        We have received your royal quote request. Our team will review your selections and reach out with a personalized proposal within 24 hours.
                                    </p>
                                    <p className="font-cinzel text-gold text-3xl font-bold mb-2">₹{total.toLocaleString('en-IN')}</p>
                                    <p className="text-white/30 text-xs uppercase tracking-widest">Estimated Package Value</p>
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
            </main>

            <PremiumFooter />
        </div>
    );
}
