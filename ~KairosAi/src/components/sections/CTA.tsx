'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ─── Floating geometric shapes data ─── */
const FLOATING_SHAPES = [
  { type: 'diamond', size: 12, x: '12%', y: '20%', delay: 0, driftDuration: 9, shapeDuration: 20, color: 'rgba(124,92,252,0.12)' },
  { type: 'triangle', size: 10, x: '85%', y: '25%', delay: 1.5, driftDuration: 11, shapeDuration: 7, color: 'rgba(92,184,252,0.10)' },
  { type: 'circle', size: 8, x: '8%', y: '72%', delay: 3, driftDuration: 10, shapeDuration: 4, color: 'rgba(252,92,140,0.09)' },
  { type: 'diamond', size: 9, x: '90%', y: '70%', delay: 2, driftDuration: 12, shapeDuration: 18, color: 'rgba(252,204,92,0.10)' },
  { type: 'circle', size: 6, x: '75%', y: '15%', delay: 4, driftDuration: 8, shapeDuration: 5, color: 'rgba(124,92,252,0.08)' },
] as const

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = sectionRef.current?.querySelector('.cta-card')

      if (card) {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 sm:py-44 px-6 lg:px-10 overflow-hidden"
    >
      {/* ─── Animated gradient mesh background ─── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="cta-gradient-mesh" />
      </div>

      {/* ─── 3D Wireframe Torus ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          perspective: '800px',
        }}
      >
        <div className="cta-torus-container">
          {/* Primary ring — tilted to create torus perspective */}
          <div className="cta-torus-ring cta-torus-ring-1" />
          {/* Secondary ring — offset tilt for 3D depth */}
          <div className="cta-torus-ring cta-torus-ring-2" />
          {/* Tertiary ring — opposite tilt */}
          <div className="cta-torus-ring cta-torus-ring-3" />
          {/* Inner ring for wireframe density */}
          <div className="cta-torus-ring cta-torus-ring-4" />
        </div>
      </div>

      {/* ─── Expanding pulse rings ─── */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 1,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="cta-pulse-ring cta-pulse-ring-1" />
        <div className="cta-pulse-ring cta-pulse-ring-2" />
        <div className="cta-pulse-ring cta-pulse-ring-3" />
      </div>

      {/* ─── Floating geometric shapes ─── */}
      {/* Each shape uses a nested structure: outer div handles drift, inner div handles shape-specific animation */}
      {FLOATING_SHAPES.map((shape, i) => (
        <div
          key={i}
          className="cta-float-drift"
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            zIndex: 1,
            pointerEvents: 'none',
            animationDelay: `${shape.delay}s`,
            animationDuration: `${shape.driftDuration}s`,
          }}
        >
          <div
            className={`cta-float-shape-${shape.type}`}
            style={{
              width: shape.type === 'triangle' ? 0 : shape.size,
              height: shape.type === 'triangle' ? 0 : shape.size,
              animationDuration: `${shape.shapeDuration}s`,
              ...(shape.type === 'diamond'
                ? {
                    backgroundColor: shape.color,
                    transform: 'rotate(45deg)',
                    borderRadius: '2px',
                  }
                : shape.type === 'triangle'
                ? {
                    width: 0,
                    height: 0,
                    borderLeft: `${shape.size / 2}px solid transparent`,
                    borderRight: `${shape.size / 2}px solid transparent`,
                    borderBottom: `${shape.size}px solid ${shape.color}`,
                    backgroundColor: 'transparent',
                  }
                : {
                    backgroundColor: shape.color,
                    borderRadius: '50%',
                  }),
            }}
          />
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-4xl mx-auto cta-card" style={{ opacity: 0, position: 'relative', zIndex: 10 }}>
          <div className="premium-gradient-border">
            <div className="relative rounded-[19px] p-8 sm:p-12 lg:p-16 text-center overflow-hidden bg-[#FFFFFF] backdrop-blur-xl">
              {/* Corner accent gradients */}
              <div
                className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 0% 0%, rgba(124,92,252,0.08), transparent 70%)',
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 100% 100%, rgba(92,184,252,0.06), transparent 70%)',
                }}
              />

              <div className="relative z-10">
                {/* Label with gradient lines */}
                <div className="type-label mb-8 flex items-center justify-center gap-4">
                  <span className="inline-block w-10 h-[1px] bg-gradient-to-r from-transparent to-[#7C5CFC]/30 rounded-full" />
                  DEPLOY YOUR AGENT
                  <span className="inline-block w-10 h-[1px] bg-gradient-to-l from-transparent to-[#7C5CFC]/30 rounded-full" />
                </div>

                {/* Heading */}
                <h2 className="type-display text-4xl sm:text-5xl lg:text-6xl text-[#0F0F12] mb-3">
                  Ready for
                </h2>
                <h2 className="type-display text-4xl sm:text-5xl lg:text-6xl gradient-text chromatic-intense mb-8">
                  autonomy?
                </h2>

                {/* Body */}
                <p className="type-body text-base sm:text-lg max-w-lg mx-auto mb-10 text-[#71717A]">
                  Join 500+ enterprises already transforming operations with
                  Kairos AI. Deploy your first autonomous agent in minutes.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#"
                    className="btn-primary group text-base px-8 py-4"
                    data-cursor-hover
                  >
                    <Sparkles
                      size={16}
                      className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    Request Access
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                  </a>
                  <a
                    href="#"
                    className="btn-secondary"
                    data-cursor-hover
                  >
                    View Documentation
                  </a>
                </div>

                {/* Footer label */}
                <p className="type-label mt-10 text-[#A1A1AA]">
                  NO CREDIT CARD REQUIRED · 30 DAY FREE TRIAL · CANCEL ANYTIME
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── All CSS animations via styled-jsx ─── */}
      <style jsx global>{`
        /* ═══════════════════════════════════════════
           CTA Animated Gradient Mesh
           ═══════════════════════════════════════════ */
        .cta-gradient-mesh {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 50% at 50% 50%,
            rgba(124, 92, 252, 0.10) 0%,
            rgba(92, 184, 252, 0.07) 25%,
            rgba(252, 92, 140, 0.04) 50%,
            transparent 75%
          );
          animation: cta-mesh-shift 12s ease-in-out infinite;
        }

        @keyframes cta-mesh-shift {
          0%, 100% {
            background: radial-gradient(
              ellipse 60% 50% at 50% 50%,
              rgba(124, 92, 252, 0.10) 0%,
              rgba(92, 184, 252, 0.07) 25%,
              rgba(252, 92, 140, 0.04) 50%,
              transparent 75%
            );
          }
          33% {
            background: radial-gradient(
              ellipse 65% 55% at 48% 52%,
              rgba(92, 184, 252, 0.09) 0%,
              rgba(252, 92, 140, 0.06) 25%,
              rgba(124, 92, 252, 0.05) 50%,
              transparent 75%
            );
          }
          66% {
            background: radial-gradient(
              ellipse 55% 45% at 52% 48%,
              rgba(252, 92, 140, 0.08) 0%,
              rgba(124, 92, 252, 0.07) 25%,
              rgba(92, 184, 252, 0.05) 50%,
              transparent 75%
            );
          }
        }

        /* ═══════════════════════════════════════════
           CTA 3D Wireframe Torus
           ═══════════════════════════════════════════ */
        .cta-torus-container {
          width: 520px;
          height: 520px;
          position: relative;
          transform-style: preserve-3d;
          animation: cta-torus-rotate 30s linear infinite;
        }

        @keyframes cta-torus-rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        .cta-torus-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(124, 92, 252, 0.12);
          transform-style: preserve-3d;
        }

        .cta-torus-ring-1 {
          width: 480px;
          height: 480px;
          margin-top: -240px;
          margin-left: -240px;
          transform: rotateX(72deg);
        }

        .cta-torus-ring-2 {
          width: 460px;
          height: 460px;
          margin-top: -230px;
          margin-left: -230px;
          transform: rotateX(72deg) rotateY(30deg);
          border-color: rgba(124, 92, 252, 0.09);
        }

        .cta-torus-ring-3 {
          width: 440px;
          height: 440px;
          margin-top: -220px;
          margin-left: -220px;
          transform: rotateX(72deg) rotateY(60deg);
          border-color: rgba(124, 92, 252, 0.07);
        }

        .cta-torus-ring-4 {
          width: 400px;
          height: 400px;
          margin-top: -200px;
          margin-left: -200px;
          transform: rotateX(72deg) rotateY(90deg);
          border-color: rgba(124, 92, 252, 0.06);
          border-style: dashed;
        }

        /* ═══════════════════════════════════════════
           CTA Expanding Pulse Rings
           ═══════════════════════════════════════════ */
        .cta-pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(124, 92, 252, 0.15);
          transform: translate(-50%, -50%) scale(0.3);
          opacity: 0;
        }

        .cta-pulse-ring-1 {
          width: 200px;
          height: 200px;
          animation: cta-pulse-expand 6s ease-out infinite;
        }

        .cta-pulse-ring-2 {
          width: 200px;
          height: 200px;
          animation: cta-pulse-expand 6s ease-out 2s infinite;
        }

        .cta-pulse-ring-3 {
          width: 200px;
          height: 200px;
          animation: cta-pulse-expand 6s ease-out 4s infinite;
          border-color: rgba(92, 184, 252, 0.12);
        }

        @keyframes cta-pulse-expand {
          0% {
            transform: translate(-50%, -50%) scale(0.3);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(3.5);
            opacity: 0;
          }
        }

        /* ═══════════════════════════════════════════
           CTA Floating Geometric Shapes
           — Outer wrapper handles drift (translateX/Y)
           — Inner element handles shape-specific animation (rotate/scale)
           ═══════════════════════════════════════════ */
        .cta-float-drift {
          animation: cta-float-drift 9s ease-in-out infinite;
        }

        @keyframes cta-float-drift {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-14px) translateX(8px);
          }
          50% {
            transform: translateY(-6px) translateX(-10px);
          }
          75% {
            transform: translateY(-18px) translateX(4px);
          }
        }

        /* Diamond: slow continuous spin maintaining 45° base rotation */
        .cta-float-shape-diamond {
          animation: cta-float-spin 20s linear infinite;
        }

        @keyframes cta-float-spin {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }

        /* Triangle: gentle wobble */
        .cta-float-shape-triangle {
          animation: cta-float-wobble 7s ease-in-out infinite;
        }

        @keyframes cta-float-wobble {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.08); }
        }

        /* Circle: breathing scale pulse */
        .cta-float-shape-circle {
          animation: cta-float-breathe 4s ease-in-out infinite;
        }

        @keyframes cta-float-breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.6; }
        }

        /* ═══════════════════════════════════════════
           Prefers Reduced Motion
           ═══════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .cta-gradient-mesh,
          .cta-torus-container,
          .cta-torus-ring,
          .cta-pulse-ring,
          .cta-float-drift,
          .cta-float-shape-diamond,
          .cta-float-shape-triangle,
          .cta-float-shape-circle {
            animation: none !important;
          }

          /* Show static end-state for pulse rings */
          .cta-pulse-ring {
            transform: translate(-50%, -50%) scale(1.5) !important;
            opacity: 0.15 !important;
          }

          /* Show static end-state for torus */
          .cta-torus-container {
            transform: rotateY(30deg) !important;
          }

          /* Show static end-state for floating shapes */
          .cta-float-drift {
            transform: translateY(-8px) !important;
          }

          .cta-float-shape-diamond {
            transform: rotate(45deg) !important;
          }
        }
      `}</style>
    </section>
  )
}
