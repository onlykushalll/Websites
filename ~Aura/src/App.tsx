import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroScene from './components/HeroScene';
import ProductShowcase from './components/ProductShowcase';
import CollectionsSection from './components/CollectionsSection';
import EditorialSection from './components/EditorialSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative bg-ivory min-h-screen">
      <CustomCursor />
      <Navigation />
      <main>
        <HeroScene />
        <ProductShowcase />
        <CollectionsSection />
        <EditorialSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
