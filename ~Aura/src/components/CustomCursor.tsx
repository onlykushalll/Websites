import { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(circle, { xPercent: -50, yPercent: -50 });

    const ctx = gsap.context(() => {
      gsap.to(dot, {
        x,
        y,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(circle, {
        x,
        y,
        duration: 0.5,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, [x, y]);

  useEffect(() => {
    if (isTouch.current) return;

    const handleMouseEnter = () => {
      gsap.to(dotRef.current, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(circleRef.current, { scale: 1.5, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(dotRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(circleRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
    };

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-charcoal rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 border border-charcoal/30 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
