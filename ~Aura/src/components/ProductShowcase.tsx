import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';
import MagneticButton from './MagneticButton';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: 'Luminous Serum',
    category: 'Skincare',
    price: '$185',
    description: 'A transformative serum infused with 24K gold particles and rare botanical extracts for radiant, youthful skin.',
    color: '#E8C7C8',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=800&fit=crop',
  },
  {
    id: 2,
    name: 'Velvet Matte Lipstick',
    category: 'Lips',
    price: '$48',
    description: 'Luxuriously creamy formula with intense pigment payoff and a weightless, velvety finish.',
    color: '#C4455A',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=800&fit=crop',
  },
  {
    id: 3,
    name: 'Radiance Compact',
    category: 'Face',
    price: '$72',
    description: 'A silky-smooth powder that blurs imperfections and leaves skin with a soft, luminous glow.',
    color: '#EADDCD',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop',
  },
  {
    id: 4,
    name: 'Noir Essence',
    category: 'Fragrance',
    price: '$245',
    description: 'An intoxicating blend of dark vanilla, amber, and rare oud wood. A scent of pure luxury.',
    color: '#1A1A1A',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop',
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const line = lineRef.current;
    if (!section || !title || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.querySelectorAll('.word'),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 bg-ivory"
    >
      <div className="w-full px-8 lg:px-16">
        {/* Section header */}
        <div ref={titleRef} className="mb-20">
          <div className="overflow-hidden">
            <span className="word inline-block text-xs uppercase tracking-[0.3em] text-charcoal/50 font-medium">
              The Collection
            </span>
          </div>
          <div className="overflow-hidden mt-4">
            <h2 className="word font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-charcoal leading-[0.95]">
              Signature
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="word font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-charcoal leading-[0.95] italic">
              Essentials
            </h2>
          </div>
        </div>

        <div
          ref={lineRef}
          className="w-full h-px bg-charcoal/10 mb-20 origin-left"
        />

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              delay={index * 0.15}
              className={index % 2 === 1 ? 'md:mt-24' : ''}
            >
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-700">
                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs uppercase tracking-[0.15em] font-medium text-charcoal">
                      {product.category}
                    </span>
                  </div>

                  {/* Quick add button */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <MagneticButton
                      className="w-14 h-14 bg-charcoal rounded-full flex items-center justify-center text-ivory hover:bg-gold transition-colors duration-300"
                      strength={0.5}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </MagneticButton>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-2xl lg:text-3xl text-charcoal mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-gold text-gold"
                          />
                        ))}
                        <span className="ml-2 text-xs text-charcoal/50">
                          (128)
                        </span>
                      </div>
                    </div>
                    <span className="font-serif text-2xl text-charcoal">
                      {product.price}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {['#E8C7C8', '#D4A5A5', '#C4455A', '#8B4545'].map(
                        (color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-white"
                            style={{ backgroundColor: color }}
                          />
                        )
                      )}
                    </div>
                    <span className="text-xs text-charcoal/40">
                      4 shades
                    </span>
                  </div>
                </div>
              </div>
            </ProductCard>
          ))}
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-20">
          <MagneticButton
            className="group px-10 py-5 border border-charcoal/20 rounded-full hover:bg-charcoal hover:text-ivory transition-all duration-500"
            strength={0.3}
          >
            <span className="text-sm uppercase tracking-[0.2em] font-medium flex items-center gap-3">
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
