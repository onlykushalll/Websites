import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'glass py-4' : 'py-6'
      }`}
    >
      <div className="w-full px-8 lg:px-16 flex items-center justify-between">
        <MagneticButton strength={0.2} onClick={() => scrollTo('hero')}>
          <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-charcoal">
            AURA
          </span>
        </MagneticButton>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Collections', id: 'collections' },
            { label: 'Products', id: 'products' },
            { label: 'Editorial', id: 'editorial' },
            { label: 'About', id: 'about' },
          ].map((item) => (
            <MagneticButton
              key={item.id}
              strength={0.3}
              onClick={() => scrollTo(item.id)}
            >
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-charcoal/70 hover:text-charcoal transition-colors duration-300">
                {item.label}
              </span>
            </MagneticButton>
          ))}
        </div>

        <MagneticButton
          className="px-6 py-3 border border-charcoal/20 rounded-full hover:bg-charcoal hover:text-ivory transition-all duration-500"
          strength={0.3}
        >
          <span className="text-xs uppercase tracking-[0.15em] font-medium">
            Shop Now
          </span>
        </MagneticButton>
      </div>
    </nav>
  );
}
