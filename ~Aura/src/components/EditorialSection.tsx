import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxImage from './ParallaxImage';
import MagneticButton from './MagneticButton';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textBlocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      textBlocksRef.current.forEach((block) => {
        if (!block) return;
        const elements = block.querySelectorAll('.reveal-item');
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textBlocksRef.current.includes(el)) {
      textBlocksRef.current.push(el);
    }
  };

  return (
    <section
      id="editorial"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 bg-ivory"
    >
      {/* Editorial Block 1 */}
      <div className="w-full px-8 lg:px-16 mb-32 lg:mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div ref={addToRefs}>
              <span className="reveal-item block text-xs uppercase tracking-[0.3em] text-charcoal/50 font-medium mb-6">
                The Philosophy
              </span>
              <h2 className="reveal-item font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1] mb-8">
                Beauty is an
                <span className="italic text-gold"> Art</span>
              </h2>
              <p className="reveal-item text-base lg:text-lg text-charcoal/60 leading-relaxed mb-8">
                Every product in our collection is meticulously crafted with the
                finest ingredients sourced from around the world. We believe that
                true luxury lies in the details — the weight of a compact in your
                hand, the glide of a lipstick across your lips, the subtle
                fragrance that lingers.
              </p>
              <p className="reveal-item text-base lg:text-lg text-charcoal/60 leading-relaxed mb-10">
                Our formulations are developed in collaboration with leading
                dermatologists and cosmetic scientists, ensuring that every
                product not only looks beautiful but nurtures your skin.
              </p>
              <div className="reveal-item">
                <MagneticButton
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] font-medium text-charcoal hover:text-gold transition-colors duration-300"
                  strength={0.3}
                >
                  Read Our Story
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </MagneticButton>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&h=1100&fit=crop"
              alt="Luxury makeup artistry"
              className="aspect-[4/5] rounded-2xl"
              speed={0.8}
            />
          </div>
        </div>
      </div>

      {/* Editorial Block 2 - Full width */}
      <div className="relative w-full mb-32 lg:mb-48">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&h=900&fit=crop"
          alt="Beauty editorial"
          className="aspect-[21/9] w-full"
          speed={0.5}
          scale={1.15}
        />
        <div className="absolute inset-0 bg-charcoal/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div ref={addToRefs} className="text-center px-8">
            <span className="reveal-item block text-xs uppercase tracking-[0.4em] text-white/70 font-medium mb-6">
              New Arrivals
            </span>
            <h2 className="reveal-item font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[0.95] mb-8">
              The Golden
              <br />
              <span className="italic">Hour Collection</span>
            </h2>
            <div className="reveal-item">
              <MagneticButton
                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white hover:text-charcoal transition-all duration-500"
                strength={0.3}
              >
                <span className="text-sm uppercase tracking-[0.2em] font-medium text-white">
                  Explore Collection
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Block 3 */}
      <div className="w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&h=1100&fit=crop"
              alt="Skincare ritual"
              className="aspect-[4/5] rounded-2xl"
              speed={0.6}
            />
          </div>
          <div className="lg:col-span-5">
            <div ref={addToRefs}>
              <span className="reveal-item block text-xs uppercase tracking-[0.3em] text-charcoal/50 font-medium mb-6">
                The Ritual
              </span>
              <h2 className="reveal-item font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-charcoal leading-[1.1] mb-8">
                Your Daily
                <span className="italic text-gold"> Ceremony</span>
              </h2>
              <p className="reveal-item text-base lg:text-lg text-charcoal/60 leading-relaxed mb-8">
                Transform your daily routine into a moment of indulgence. Our
                products are designed to engage all your senses — from the
                satisfying click of a compact to the velvety texture of our
                foundations.
              </p>
              <div className="reveal-item space-y-6 mb-10">
                {[
                  { step: '01', title: 'Cleanse & Prep', desc: 'Begin with our gentle cleansing balm' },
                  { step: '02', title: 'Treat & Nourish', desc: 'Apply the Luminous Serum with gentle strokes' },
                  { step: '03', title: 'Perfect & Define', desc: 'Finish with our signature complexion products' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <span className="font-serif text-2xl text-gold/60">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-medium text-charcoal mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-charcoal/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reveal-item">
                <MagneticButton
                  className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] font-medium text-charcoal hover:text-gold transition-colors duration-300"
                  strength={0.3}
                >
                  View Full Ritual
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
