import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  onClick,
  as = 'button',
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!boundingRef.current) return;
      const { left, top, width, height } = boundingRef.current;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      gsap.to(el, {
        x: distanceX * strength,
        y: distanceY * strength,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const handleMouseEnter = () => {
      boundingRef.current = el.getBoundingClientRect();
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
      boundingRef.current = null;
    };

    el.addEventListener('mousemove', handleMouseMove as EventListener);
    el.addEventListener('mouseenter', handleMouseEnter as EventListener);
    el.addEventListener('mouseleave', handleMouseLeave as EventListener);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove as EventListener);
      el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
      el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
    };
  }, [strength]);

  const baseClasses = `magnetic-wrap inline-flex items-center justify-center transition-colors duration-300 ${className}`;

  if (as === 'a') {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        onClick={onClick}
        data-cursor-hover
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={baseClasses}
      onClick={onClick}
      data-cursor-hover
    >
      {children}
    </button>
  );
}
