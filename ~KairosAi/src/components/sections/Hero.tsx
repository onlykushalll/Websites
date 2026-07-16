'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Stat Counter Component ────────────────────────────────
function StatCounter({
  value,
  suffix,
  prefix,
  decimal,
  label,
}: {
  value: number
  suffix: string
  prefix?: string
  decimal?: string
  label: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const countedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countedRef.current) {
          countedRef.current = true
          const duration = 2000
          const startTime = performance.now()

          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(value)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref}>
      <div className="type-display text-2xl sm:text-3xl gradient-text-accent">
        {prefix}{count}{decimal}{suffix}
      </div>
      <div className="type-label text-[9px] mt-1">{label}</div>
    </div>
  )
}

// ─── Hero Component ────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Scroll Scale-Down ────────────────────────
      if (wrapperRef.current) {
        gsap.to(wrapperRef.current, {
          scale: 0.92,
          borderRadius: '24px',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=40%',
            scrub: 1.5,
          },
        })
      }

      // ─── Kinetic Typography — Character Stagger ────
      const chars = headlineRef.current?.querySelectorAll('.hero-char-inner')
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            translateY: '120%',
            rotateX: -60,
            opacity: 0,
          },
          {
            translateY: '0%',
            rotateX: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.04,
            ease: 'power3.out',
            delay: 2.6,
          }
        )
      }

      // ─── Description slide up ─────────────────────
      const desc = sectionRef.current?.querySelector('.hero-desc')
      if (desc) {
        gsap.fromTo(
          desc,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 3.4, ease: 'power3.out' }
        )
      }

      // ─── CTA buttons slide up ─────────────────────
      const cta = sectionRef.current?.querySelector('.hero-cta')
      if (cta) {
        gsap.fromTo(
          cta,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 3.6, ease: 'power3.out' }
        )
      }

      // ─── Stats fade in ────────────────────────────
      const stats = sectionRef.current?.querySelector('.hero-stats')
      if (stats) {
        gsap.fromTo(
          stats,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 3.8, ease: 'power3.out' }
        )
      }

      // ─── Scroll indicator ─────────────────────────
      const scrollInd = sectionRef.current?.querySelector('.hero-scroll-indicator')
      if (scrollInd) {
        gsap.fromTo(
          scrollInd,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 4.2, ease: 'power3.out' }
        )
        gsap.to(scrollInd.querySelector('.scroll-arrow'), {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: 'power1.inOut',
          delay: 5,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const line1 = 'KAIROS'.split('')
  const line2 = 'AI'.split('')

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={wrapperRef}
        className="hero-scale-wrapper w-full min-h-screen flex items-center relative"
      >
        {/* ─── Main Content Grid ─── */}
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 pt-24 pb-16 relative z-[2]">
          <div className="grid grid-cols-12 gap-6 items-center min-h-[80vh]">
            {/* Left column — text content (7 cols) */}
            <div className="col-span-12 lg:col-span-7">
              {/* Main headline — Kinetic Typography */}
              <h1
                ref={headlineRef}
                className="mb-8"
                style={{ perspective: '1200px' }}
              >
                {/* Line 1: KAIROS */}
                <span className="block" style={{ overflow: 'hidden' }}>
                  <span className="inline-flex">
                    {line1.map((char, i) => (
                      <span
                        key={`l1-${i}`}
                        className="split-char inline-block"
                        style={{ overflow: 'hidden' }}
                      >
                        <span
                          className="hero-char-inner inline-block type-display"
                          style={{
                            fontSize: 'clamp(4rem, 10vw, 9rem)',
                            color: '#0F0F12',
                            willChange: 'transform, opacity',
                            transform: 'translateY(120%) rotateX(-60deg)',
                          }}
                        >
                          {char}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>

                {/* Line 2: AI — gradient + chromatic */}
                <span className="block" style={{ overflow: 'hidden' }}>
                  <span className="inline-flex">
                    {line2.map((char, i) => (
                      <span
                        key={`l2-${i}`}
                        className="split-char inline-block"
                        style={{ overflow: 'hidden' }}
                      >
                        <span
                          className="hero-char-inner inline-block type-display gradient-text chromatic"
                          style={{
                            fontSize: 'clamp(4rem, 10vw, 9rem)',
                            willChange: 'transform, opacity',
                            transform: 'translateY(120%) rotateX(-60deg)',
                          }}
                        >
                          {char}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p className="hero-desc type-body text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed text-[#71717A] opacity-0">
                Autonomous agents that think, adapt, and execute —
                transforming operations with intelligence that acts on its own.
              </p>

              {/* CTA Buttons */}
              <div className="hero-cta flex items-center gap-4 flex-wrap opacity-0">
                <a href="#contact" className="btn-primary group" data-cursor-hover>
                  Deploy Agent
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
                <a href="#about" className="btn-secondary" data-cursor-hover>
                  Learn More
                </a>
              </div>

              {/* Stats Row */}
              <div className="hero-stats flex items-center gap-8 sm:gap-12 mt-14 pt-8 border-t border-black/[0.06] opacity-0">
                <StatCounter value={99} suffix="%" decimal=".9" label="Uptime" />
                <StatCounter value={50} suffix="ms" prefix="<" label="Latency" />
                <StatCounter value={10} suffix="M+" label="Tasks Done" />
              </div>
            </div>

            {/* Right column — 3D Orb Space (5 cols) */}
            <div className="hidden lg:block lg:col-span-5 relative">
              {/* The 3D orb renders via the fixed canvas layer */}
            </div>
          </div>
        </div>

        {/* ─── Scroll Indicator ─── */}
        <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0">
          <div className="flex flex-col items-center gap-2">
            <span className="type-label text-[9px] tracking-[0.25em]">SCROLL</span>
            <div className="scroll-arrow">
              <ArrowDown size={14} className="text-[#7C5CFC]/60" />
            </div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#7C5CFC]/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
