import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        if (window.innerWidth < 1024) return; // Disable on mobile/tablet for performance

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let dotX = 0, dotY = 0;
        let raf;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            // Smooth interpolation
            dotX += (mouseX - dotX) * 0.95;
            dotY += (mouseY - dotY) * 0.95;
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            }
            raf = requestAnimationFrame(animate);
        };

        const onEnterLink = () => {
            if (ringRef.current) {
                ringRef.current.classList.add('cursor-hover');
            }
        };

        const onLeaveLink = () => {
            if (ringRef.current) {
                ringRef.current.classList.remove('cursor-hover');
            }
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        raf = requestAnimationFrame(animate);

        const links = document.querySelectorAll('a, button, [data-cursor-hover]');
        links.forEach((el) => {
            el.addEventListener('mouseenter', onEnterLink);
            el.addEventListener('mouseleave', onLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            links.forEach((el) => {
                el.removeEventListener('mouseenter', onEnterLink);
                el.removeEventListener('mouseleave', onLeaveLink);
            });
        };
    }, []);

    // Only render on desktop
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

    return (
        <>
            <div ref={dotRef} className="cursor-dot" style={{ left: 0, top: 0 }} />
            <div ref={ringRef} className="cursor-ring" style={{ left: 0, top: 0 }} />
        </>
    );
};

export default CustomCursor;
