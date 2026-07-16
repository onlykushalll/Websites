'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════
   DATA — 6 testimonials for balanced 3-column grid
   ═══════════════════════════════════════════════ */
interface TestimonialData {
  quote: string
  name: string
  role: string
  company: string
  color: string
  rating: number
  initials: string
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "Kairos transformed our entire data pipeline. What took our team weeks now happens autonomously in hours. The reasoning engine understands context at a level we didn't think was possible.",
    name: 'Sarah Chen',
    role: 'VP Engineering',
    company: 'TechScale',
    color: '#7C5CFC',
    rating: 5,
    initials: 'SC',
  },
  {
    quote: "The autonomous reasoning capability is unlike anything we've seen. It actually understands context and makes smart decisions without hand-holding.",
    name: 'Marcus Johnson',
    role: 'CTO',
    company: 'FinVault',
    color: '#5CB8FC',
    rating: 5,
    initials: 'MJ',
  },
  {
    quote: 'We deployed Kairos across our supply chain and saw a 45% cost reduction in the first quarter. The ROI was immediate.',
    name: 'Elena Rodriguez',
    role: 'Head of Operations',
    company: 'LogiFlow',
    color: '#FC5C8C',
    rating: 5,
    initials: 'ER',
  },
  {
    quote: "From prototype to production in 2 days. Kairos's adaptive agents learned our workflow patterns and started optimizing within the first hour.",
    name: 'David Kim',
    role: 'Director of AI',
    company: 'NexGen Labs',
    color: '#FCCC5C',
    rating: 5,
    initials: 'DK',
  },
  {
    quote: 'Kairos reduced our incident response time by 90%. It autonomously detects anomalies and takes corrective action before we even notice.',
    name: 'Priya Sharma',
    role: 'VP of Engineering',
    company: 'CloudScale',
    color: '#A78BFA',
    rating: 5,
    initials: 'PS',
  },
  {
    quote: 'The most impressive AI platform we have integrated. It learns, adapts, and delivers results that exceed expectations every single time.',
    name: "James O'Brien",
    role: 'Chief Innovation Officer',
    company: 'Meridian Corp',
    color: '#5CB8FC',
    rating: 5,
    initials: 'JO',
  },
]

/* ═══════════════════════════════════════════════
   STAR RATING
   ═══════════════════════════════════════════════ */
function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < rating ? '#FCCC5C' : 'transparent'}
          stroke={i < rating ? '#FCCC5C' : '#D4D4D0'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TESTIMONIAL CARD — with subtle animated accents
   ═══════════════════════════════════════════════ */
function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div
        className="test-card-outer"
        data-cursor-hover
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          '--card-accent': testimonial.color,
          position: 'relative',
          borderRadius: '17px',
          height: '100%',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        } as React.CSSProperties}
      >
        {/* ─── 1. Animated gradient border glow ─── */}
        <div className={`test-card-border-glow ${isHovered ? 'active' : ''}`}>
          <div className="test-card-border-glow-gradient" />
        </div>

        {/* ─── Inner card content ─── */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px',
            border: `1px solid ${isHovered ? `${testimonial.color}30` : 'rgba(0,0,0,0.05)'}`,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            padding: '28px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition:
              'border-color 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isHovered
              ? `0 20px 60px rgba(124, 92, 252, 0.07), 0 6px 20px rgba(0,0,0,0.03)`
              : '0 1px 3px rgba(0,0,0,0.03)',
            zIndex: 1,
          }}
        >
          {/* ─── 4. Background dot pattern ─── */}
          <svg
            className="test-card-dots"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <defs>
              <pattern
                id={`test-dots-${testimonial.initials}`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="0.4" fill="rgba(0,0,0,0.04)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#test-dots-${testimonial.initials})`} />
          </svg>

          {/* ─── 2. Floating accent dot ─── */}
          <div className={`test-card-orbit-dot ${isHovered ? 'active' : ''}`} />

          {/* Top gradient accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              borderRadius: '2px',
              background: `linear-gradient(90deg, transparent, ${testimonial.color}, transparent)`,
              opacity: isHovered ? 0.5 : 0.2,
              transition: 'opacity 0.5s ease',
              zIndex: 1,
            }}
          />

          {/* Decorative quote mark */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '18px',
              opacity: isHovered ? 0.06 : 0.04,
              transition: 'opacity 0.7s ease',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <Quote size={70} style={{ color: '#0F0F12' }} />
          </div>

          {/* Hover glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(400px circle at 50% 50%, ${testimonial.color}06, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.6s ease',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Stars */}
          <div style={{ marginBottom: '18px', position: 'relative', zIndex: 2 }}>
            <StarRating rating={testimonial.rating} />
          </div>

          {/* Quote text */}
          <p
            style={{
              fontFamily: 'var(--font-body), "Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '14px',
              lineHeight: 1.7,
              color: '#71717A',
              marginBottom: '20px',
              position: 'relative',
              zIndex: 2,
              flex: 1,
            }}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Attribution */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Avatar wrapper with pulse ring */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {/* ─── 3. Pulse ring ─── */}
              <div className={`test-card-pulse-ring ${isHovered ? 'active' : ''}`} />

              {/* Avatar with initials */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${testimonial.color}20, ${testimonial.color}40)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display), "Outfit", sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  color: testimonial.color,
                  border: `1px solid ${testimonial.color}30`,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {testimonial.initials}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0F0F12',
                  fontFamily: 'var(--font-body), "Plus Jakarta Sans", system-ui, sans-serif',
                }}
              >
                {testimonial.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: '#71717A',
                  fontWeight: 500,
                  marginTop: '2px',
                }}
              >
                {testimonial.role} ·{' '}
                <span style={{ color: testimonial.color }}>{testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ═══════════════════════════════════════════
           1. ANIMATED GRADIENT BORDER GLOW
           Rotating conic-gradient behind the card,
           clipped to rounded rect, visible only as
           a subtle border glow on hover.
           ═══════════════════════════════════════════ */
        .test-card-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 17px;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .test-card-border-glow-gradient {
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from 0deg,
            transparent 25%,
            var(--card-accent) 50%,
            transparent 75%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .test-card-border-glow.active .test-card-border-glow-gradient {
          opacity: 0.10;
          animation: test-border-spin 6s linear infinite;
        }
        @keyframes test-border-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ═══════════════════════════════════════════
           2. FLOATING ACCENT DOT
           Small glowing dot that slowly orbits
           around the top-right corner area on hover.
           ═══════════════════════════════════════════ */
        .test-card-orbit-dot {
          position: absolute;
          top: 22px;
          right: 22px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--card-accent);
          box-shadow: 0 0 4px var(--card-accent), 0 0 10px color-mix(in srgb, var(--card-accent) 40%, transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 5;
        }
        .test-card-orbit-dot.active {
          opacity: 0.45;
          animation: test-dot-orbit 5s linear infinite;
        }
        @keyframes test-dot-orbit {
          from {
            transform: rotate(0deg) translateX(14px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(14px) rotate(-360deg);
          }
        }

        /* ═══════════════════════════════════════════
           3. PULSE RING
           Subtle expanding ring emanating from the
           avatar on hover, fading as it grows.
           ═══════════════════════════════════════════ */
        .test-card-pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          margin-top: -20px;
          margin-left: -20px;
          border-radius: 50%;
          border: 1.5px solid var(--card-accent);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }
        .test-card-pulse-ring.active {
          animation: test-pulse-expand 2s ease-out infinite;
        }
        @keyframes test-pulse-expand {
          0% {
            transform: scale(1);
            opacity: 0.2;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }

        /* ═══════════════════════════════════════════
           PREFERS-REDUCED-MOTION
           Disable all animations for accessibility.
           ═══════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .test-card-border-glow.active .test-card-border-glow-gradient,
          .test-card-orbit-dot.active,
          .test-card-pulse-ring.active {
            animation: none !important;
          }
          .test-card-border-glow.active .test-card-border-glow-gradient {
            opacity: 0.10;
          }
          .test-card-orbit-dot.active {
            opacity: 0.45;
          }
          .test-card-pulse-ring.active {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT — 6 equal cards in 3-column grid
   ═══════════════════════════════════════════════ */
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.section-header')
      if (header) {
        gsap.fromTo(
          header,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 80%' },
          }
        )
      }

      const cards = sectionRef.current?.querySelectorAll('.testimonial-card')
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-32 sm:py-44 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="section-header mb-16">
          <div className="type-label mb-4 flex items-center gap-3">
            <span className="inline-block w-6 h-[1px] bg-[#7C5CFC]/40 rounded-full" />
            TESTIMONIALS
          </div>
          <h2 className="type-headline text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
            Trusted by <span className="gradient-text">leaders</span>
          </h2>
        </div>

        {/* 6 equal cards in 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.name} className="testimonial-card">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
