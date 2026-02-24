import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let raf;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.left = mouseX + 'px';
                dotRef.current.style.top = mouseY + 'px';
            }
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.left = ringX + 'px';
                ringRef.current.style.top = ringY + 'px';
            }
            raf = requestAnimationFrame(animate);
        };

        const onEnterLink = () => {
            if (ringRef.current) {
                ringRef.current.style.width = '60px';
                ringRef.current.style.height = '60px';
                ringRef.current.style.borderColor = 'rgba(255,215,0,0.9)';
            }
        };

        const onLeaveLink = () => {
            if (ringRef.current) {
                ringRef.current.style.width = '36px';
                ringRef.current.style.height = '36px';
                ringRef.current.style.borderColor = 'rgba(255,215,0,0.6)';
            }
        };

        window.addEventListener('mousemove', onMove);
        raf = requestAnimationFrame(animate);
        document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
            el.addEventListener('mouseenter', onEnterLink);
            el.addEventListener('mouseleave', onLeaveLink);
        });

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" style={{ transform: 'translate(-50%, -50%)' }} />
            <div ref={ringRef} className="cursor-ring" style={{ transform: 'translate(-50%, -50%)' }} />
        </>
    );
};

export default CustomCursor;
