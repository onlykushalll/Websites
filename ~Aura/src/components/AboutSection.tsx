import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Heart, Award, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Leaf,
    title: 'Clean Beauty',
    description:
      'Every formula is free from parabens, sulfates, and phthalates. We source only the purest ingredients.',
  },
  {
    icon: Heart,
    title: 'Cruelty Free',
    description:
      'We never test on animals. Our commitment to ethical beauty is unwavering and certified by Leaping Bunny.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description:
      'Recognized by leading beauty publications worldwide for innovation, quality, and exceptional performance.',
  },
  {
    icon: Globe,
    title: 'Sustainable',
    description:
      'Our packaging is 100% recyclable and made from post-consumer materials. Beauty that respects the planet.',
  },
];

const stats = [
  { value: '50+', label: 'Countries' },
  { value: '2M+', label: 'Happy Clients' },
  { value: '15', label: 'Years of Excellence' },
  { value: '100%', label: 'Clean Formulas' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const statsEl = statsRef.current;
    if (!section || !statsEl) return;

    const ctx = gsap.context(() => {
      // Animate values cards
      gsap.fromTo(
        section.querySelectorAll('.value-card'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.values-grid'),
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate stats
      gsap.fromTo(
        statsEl.querySelectorAll('.stat-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsEl,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 bg-charcoal text-ivory overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <span className="block text-xs uppercase tracking-[0.3em] text-ivory/50 font-medium mb-6">
            About AURA
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] mb-8">
            Redefining
            <span className="italic text-gold"> Luxury</span>
          </h2>
          <p className="text-lg lg:text-xl text-ivory/60 leading-relaxed max-w-2xl">
            Founded in 2010, AURA has become synonymous with uncompromising
            quality and timeless elegance. We believe that beauty should be an
            experience — one that engages the senses and elevates the everyday.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-32 py-12 border-y border-ivory/10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center lg:text-left">
              <span className="block font-serif text-4xl md:text-5xl lg:text-6xl text-gold mb-2">
                {stat.value}
              </span>
              <span className="text-sm uppercase tracking-[0.2em] text-ivory/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="value-card group p-8 rounded-2xl border border-ivory/10 hover:border-gold/30 transition-all duration-500 hover:bg-ivory/5"
              >
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-xl text-ivory mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-ivory/50 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
