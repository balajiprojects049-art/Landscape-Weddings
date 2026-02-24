import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Camera, Video, MapPin, Map, Star, CircleDollarSign } from 'lucide-react';
import clsx from 'clsx';

const stepsData = [
    {
        title: 'Event Type',
        subtitle: 'What are we celebrating?',
        options: [
            { id: 'wedding', label: 'Wedding', icon: <Star /> },
            { id: 'engagement', label: 'Engagement', icon: <Star /> },
            { id: 'prewedding', label: 'Pre-Wedding', icon: <Camera /> }
        ]
    },
    {
        title: 'Location Style',
        subtitle: 'Where is your event taking place?',
        options: [
            { id: 'destination', label: 'Destination / Resort', icon: <Map /> },
            { id: 'city', label: 'City Venue', icon: <MapPin /> },
            { id: 'outdoor', label: 'Outdoor Natural', icon: <MapPin /> }
        ]
    },
    {
        title: 'Service Style',
        subtitle: 'What captures your essence?',
        options: [
            { id: 'photo', label: 'Photography Only', icon: <Camera /> },
            { id: 'video', label: 'Cinematography Only', icon: <Video /> },
            { id: 'both', label: 'Full Team (Photo + Video)', icon: <Star /> }
        ]
    },
    {
        title: 'Estimated Budget',
        subtitle: 'Help us tailor options for you (INR)',
        options: [
            { id: '1-3', label: '₹1 Lakh - ₹3 Lakhs', icon: <CircleDollarSign /> },
            { id: '3-6', label: '₹3 Lakhs - ₹6 Lakhs', icon: <CircleDollarSign /> },
            { id: '6plus', label: '₹6 Lakhs+', icon: <CircleDollarSign /> }
        ]
    }
];

const MultiStepQuoteForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handleSelect = (stepIndex, optionId) => {
        setFormData(prev => ({ ...prev, [stepIndex]: optionId }));
        if (stepIndex < stepsData.length - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 400);
        } else {
            setTimeout(() => setCurrentStep(stepsData.length), 400);
        }
    };

    const currentData = stepsData[currentStep];

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-8">
            {/* PROGRESS BAR */}
            <div className="mb-12 relative flex items-center justify-between before:content-[''] before:absolute before:h-1 before:bg-white/10 before:w-full before:top-1/2 before:-translate-y-1/2 before:z-0">
                <motion.div
                    className="absolute h-1 bg-gold-gradient top-1/2 -translate-y-1/2 left-0 z-0 transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / stepsData.length) * 100}%` }}
                />
                {stepsData.map((_, i) => (
                    <div key={`step-${i}`} className="relative z-10 flex flex-col items-center">
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                            currentStep >= i ? "bg-royal-gold text-royal-black shadow-[0_0_15px_rgba(255,215,0,0.5)]" : "bg-royal-black border-2 border-white/20 text-white/50"
                        )}>
                            {i + 1}
                        </div>
                    </div>
                ))}
                {/* Final step circle */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                        currentStep === stepsData.length ? "bg-royal-gold text-royal-black shadow-[0_0_15px_rgba(255,215,0,0.5)]" : "bg-royal-black border-2 border-white/20 text-white/50"
                    )}>
                        ✓
                    </div>
                </div>
            </div>

            {/* FORM AREA */}
            <div className="glass-panel p-8 md:p-12 rounded-xl relative overflow-hidden min-h-[400px] flex flex-col">
                {currentStep > 0 && currentStep < stepsData.length && (
                    <button
                        onClick={() => setCurrentStep(c => c - 1)}
                        className="absolute top-6 left-6 text-white/50 hover:text-royal-gold flex items-center gap-2 text-sm uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                )}

                <div className="flex-1 flex flex-col justify-center mt-8">
                    <AnimatePresence mode="wait">
                        {currentStep < stepsData.length ? (
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                                className="flex flex-col items-center text-center w-full"
                            >
                                <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">{currentData.title}</h2>
                                <p className="text-royal-gold/80 uppercase tracking-widest text-sm mb-12">{currentData.subtitle}</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                                    {currentData.options.map((opt) => {
                                        const isSelected = formData[currentStep] === opt.id;
                                        return (
                                            <motion.button
                                                key={opt.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSelect(currentStep, opt.id)}
                                                className={clsx(
                                                    "flex flex-col items-center justify-center p-8 border rounded-lg transition-all duration-300 gap-4 group",
                                                    isSelected
                                                        ? "bg-royal-gold/10 border-royal-gold shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                                                        : "bg-black/40 border-white/10 hover:border-royal-gold/50"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "p-4 rounded-full transition-colors duration-300",
                                                    isSelected ? "bg-royal-gold text-royal-black" : "bg-white/5 text-white/70 group-hover:text-royal-gold"
                                                )}>
                                                    {React.cloneElement(opt.icon, { size: 28 })}
                                                </div>
                                                <span className={clsx(
                                                    "font-medium uppercase tracking-wider text-sm",
                                                    isSelected ? "text-royal-gold" : "text-white/80 group-hover:text-white"
                                                )}>{opt.label}</span>
                                            </motion.button>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center max-w-2xl mx-auto"
                            >
                                <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center text-royal-black shadow-[0_0_30px_rgba(255,215,0,0.4)] mb-8">
                                    <Star size={40} className="fill-current" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Your Vision is Set</h2>
                                <p className="text-white/70 text-lg mb-12 leading-relaxed font-light">
                                    We'll review your preferences and craft a custom quote that matches your exact needs. Complete your request by entering your details.
                                </p>

                                <form className="w-full flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert('Quote requested!') }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input type="text" placeholder="Your Name" className="w-full bg-black/50 border border-white/20 p-4 rounded-md text-white focus:outline-none focus:border-royal-gold focus:ring-1 focus:ring-royal-gold/50 transition-all font-light" required />
                                        <input type="email" placeholder="Email Address" className="w-full bg-black/50 border border-white/20 p-4 rounded-md text-white focus:outline-none focus:border-royal-gold focus:ring-1 focus:ring-royal-gold/50 transition-all font-light" required />
                                    </div>
                                    <input type="tel" placeholder="Phone Number" className="w-full bg-black/50 border border-white/20 p-4 rounded-md text-white focus:outline-none focus:border-royal-gold focus:ring-1 focus:ring-royal-gold/50 transition-all font-light" required />
                                    <button type="submit" className="w-full mt-4 py-5 bg-gold-gradient text-royal-black font-bold uppercase tracking-[0.2em] rounded-sm hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-300">
                                        Get My Quote
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MultiStepQuoteForm;
