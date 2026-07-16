import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    name: 'The Essentials',
    subtitle: 'Foundation of Beauty',
    description: 'Timeless staples for the modern woman',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&h=1000&fit=crop',
    count: 12,
  },
  {
    id: 2,
    name: 'Golden Hour',
    subtitle: 'Limited Edition',
    description: 'Warm, luminous tones for sun-kissed radiance',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop',
    count: 8,
  },
  {
    id: 3,
    name: 'Midnight Bloom',
    subtitle: 'Evening Collection',
    description: 'Dramatic, sophisticated shades for after dark',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&h=1000&fit=crop',
    count: 15,
  },
];

export default function CollectionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('.collections-title'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 bg-ivory"
    >
      <div className="w-full px-8 lg:px-16">
        <div className="collections-title mb-20">
          <span className="block text-xs uppercase tracking-[0.3em] text-charcoal/50 font-medium mb-6">
            Curated For You
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-charcoal leading-[0.95]">
            Our
            <span className="italic"> Collections</span>
          </h2>
        </div>

        {/* Collections showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Active collection image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {collections.map((collection, index) => (
                <div
                  key={collection.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === activeIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-medium">
                      {collection.subtitle}
                    </span>
                    <h3 className="font-serif text-4xl md:text-5xl text-white mt-2">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Collection list */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-0">
              {collections.map((collection, index) => (
                <div
                  key={collection.id}
                  className={`group border-t border-charcoal/10 py-8 cursor-pointer transition-all duration-500 ${
                    index === activeIndex ? 'pl-4' : 'pl-0 hover:pl-4'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className={`font-serif text-2xl lg:text-3xl transition-colors duration-300 ${
                          index === activeIndex
                            ? 'text-charcoal'
                            : 'text-charcoal/40'
                        }`}
                      >
                        {collection.name}
                      </h3>
                      <p
                        className={`text-sm mt-2 transition-colors duration-300 ${
                          index === activeIndex
                            ? 'text-charcoal/60'
                            : 'text-charcoal/30'
                        }`}
                      >
                        {collection.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          index === activeIndex
                            ? 'text-charcoal'
                            : 'text-charcoal/30'
                        }`}
                      >
                        {collection.count} items
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          index === activeIndex
                            ? 'border-charcoal bg-charcoal text-ivory'
                            : 'border-charcoal/20 text-charcoal/30'
                        }`}
                      >
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-charcoal/10" />
            </div>

            <div className="mt-10">
              <MagneticButton
                className="group px-8 py-4 bg-charcoal text-ivory rounded-full hover:bg-gold transition-colors duration-500"
                strength={0.3}
              >
                <span className="text-sm uppercase tracking-[0.15em] font-medium flex items-center gap-3">
                  Shop Collections
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
