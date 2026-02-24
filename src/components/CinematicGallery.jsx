import React from 'react';
import { motion } from 'framer-motion';

const images = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1974&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532712938730-4e36c56b1bf1?q=80&w=1920&auto=format&fit=crop',
];

const CinematicGallery = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
            <div className="flex flex-col items-center mb-16 text-center">
                <motion.p
                    className="text-royal-gold/80 uppercase tracking-[0.4em] text-xs font-semibold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Featured Works
                </motion.p>
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-serif text-white border-b-2 border-royal-gold/30 pb-4 inline-block"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="text-gold-gradient font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.2)]">Cinematic</span> Moments
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 cursor-crosshair">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        className={`relative overflow-hidden rounded-md group ${index === 0 || index === 3 ? 'md:col-span-1 md:row-span-2' : ''}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        whileHover={{ scale: 0.98 }}
                    >
                        <div
                            className="w-full h-[400px] md:h-[600px] bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:brightness-50"
                            style={{ backgroundImage: `url(${img})` }}
                        />

                        {/* Cinematic Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-royal-black/90 via-royal-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                            <p className="text-royal-gold uppercase tracking-[0.3em] text-xs font-semibold mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                Editorial Collection
                            </p>
                            <h3 className="font-serif text-3xl text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 shadow-md">
                                Royal Splendor
                            </h3>
                        </div>

                        {/* Gold frame effect */}
                        <div className="absolute inset-0 border border-royal-gold/0 group-hover:border-royal-gold/30 scale-95 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CinematicGallery;
