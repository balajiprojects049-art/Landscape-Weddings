import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            type: 'spring',
            bounce: 0.3
        }
    }
};

const SectionWrapper = ({ children, className, id }) => {
    return (
        <motion.section
            id={id}
            className={clsx('w-full py-24 md:py-32 relative overflow-hidden', className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInVariants}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
