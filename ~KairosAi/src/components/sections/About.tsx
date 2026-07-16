'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '500+', target: 500, suffix: '+', label: 'ENTERPRISES', color: '#7C5CFC', colorAlpha: '#7C5CFC99' },
  { value: '10M', target: 10, suffix: 'M', label: 'TASKS/DAY', color: '#5CB8FC', colorAlpha: '#5CB8FC99' },
  { value: '99.9%', target: 99.9, suffix: '%', label: 'UPTIME', color: '#FC5C8C', colorAlpha: '#FC5C8C99' },
  { value: '<50ms', target: 50, suffix: 'ms', label: 'LATENCY', color: '#FCCC5C', colorAlpha: '#FCCC5C99', prefix: '<' },
]

const CAPABILITIES = [
  'Self-directed reasoning without human oversight',
  'Real-time environmental adaptation and learning',
  'Enterprise-grade safety guardrails and compliance',
  'Seamless integration with existing infrastructure',
]

// ── Neural Network Data for Card 1 ──
const NEURAL_NODES = [
  { x: 50, y: 70, color: '#7C5CFC' },
  { x: 50, y: 190, color: '#7C5CFC' },
  { x: 50, y: 310, color: '#7C5CFC' },
  { x: 150, y: 45, color: '#9678FC' },
  { x: 150, y: 140, color: '#6CA8FC' },
  { x: 150, y: 235, color: '#6CA8FC' },
  { x: 150, y: 330, color: '#9678FC' },
  { x: 250, y: 100, color: '#5CB8FC' },
  { x: 250, y: 190, color: '#5CB8FC' },
  { x: 250, y: 280, color: '#5CB8FC' },
]

const NEURAL_CONNECTIONS = [
  [0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6],
  [0, 5], [2, 4],
  [3, 7], [3, 8], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [6, 7],
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])
  const imgCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const statCountersRef = useRef<(HTMLSpanElement | null)[]>([])
  const capItemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Word-by-word scroll color reveal ──
      wordsRef.current.forEach((word) => {
        if (!word) return
        const isSpecial = word.dataset.special === 'true'

        if (isSpecial) {
          gsap.fromTo(
            word,
            { opacity: 0.3 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: word,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 1.2,
              },
            }
          )
        } else {
          gsap.fromTo(
            word,
            { color: '#D4D4D0' },
            {
              color: '#0F0F12',
              scrollTrigger: {
                trigger: word,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 1.2,
              },
            }
          )
        }
      })

      // ── Image clip-path reveal on scroll ──
      imgCardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.15,
          }
        )
      })

      // ── Stats entrance animation ──
      const statCards = sectionRef.current?.querySelectorAll('.stat-card')
      if (statCards && statCards.length > 0) {
        gsap.fromTo(
          statCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statCards[0],
              start: 'top 85%',
            },
          }
        )
      }

      // ── Counter animation ──
      STATS.forEach((stat, i) => {
        const el = statCountersRef.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (stat.suffix === '%') {
              el.textContent = `${obj.val.toFixed(1)}%`
            } else if (stat.suffix === 'ms') {
              el.textContent = `<${Math.round(obj.val)}ms`
            } else if (stat.suffix === 'M') {
              el.textContent = `${Math.round(obj.val)}M`
            } else {
              el.textContent = `${Math.round(obj.val)}+`
            }
          },
        })
      })

      // ── Capabilities stagger entrance ──
      capItemsRef.current.forEach((item, i) => {
        if (!item) return
        gsap.fromTo(
          item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const headingText = "The future of AI is not autonomous — it's inevitable"

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 sm:py-44 px-6 lg:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="type-label mb-16 flex items-center gap-4">
          <span className="inline-block w-8 h-[1px] bg-[#7C5CFC]/40 rounded-full" />
          ABOUT
        </div>

        {/* Main Bento Grid: 12 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ── LEFT COLUMN (7 cols) ── */}
          <div className="lg:col-span-7">
            {/* Heading with word-by-word scroll color reveal */}
            <h2 className="type-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] mb-10 leading-[1.08]">
              {headingText.split(' ').map((word, i) => {
                const isSpecial =
                  word.toLowerCase().includes('autonomous') ||
                  word.toLowerCase().includes('inevitable')
                return (
                  <span
                    key={i}
                    ref={(el) => {
                      wordsRef.current[i] = el
                    }}
                    data-special={isSpecial ? 'true' : undefined}
                    className={`inline-block mr-[0.25em] ${
                      isSpecial ? 'gradient-text' : ''
                    }`}
                    style={{
                      color: isSpecial ? undefined : '#D4D4D0',
                      willChange: 'color',
                    }}
                  >
                    {word}
                  </span>
                )
              })}
            </h2>

            {/* Description paragraph */}
            <p className="type-body text-lg sm:text-xl max-w-2xl mb-14 leading-[1.75]">
              Kairos AI represents a fundamental shift in artificial intelligence.
              Our agents don&apos;t just respond to commands — they anticipate needs,
              reason through complexity, and execute independently. Built on the
              frontier of autonomous systems research.
            </p>

            {/* Accent line */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-[#7C5CFC] to-transparent mb-14" />

            {/* Capabilities List */}
            <div className="space-y-5 mb-16">
              {CAPABILITIES.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    capItemsRef.current[i] = el
                  }}
                  className="flex items-center gap-5 group"
                  data-cursor-hover
                >
                  <div className="w-8 h-[2px] bg-[#7C5CFC] rounded-full group-hover:w-16 transition-all duration-500 ease-out flex-shrink-0" />
                  <span className="type-body text-base sm:text-lg text-[#71717A] group-hover:text-[#0F0F12] transition-colors duration-400">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="stat-card glass-card p-5 sm:p-6 text-center group"
                  data-cursor-hover
                >
                  <div
                    className="type-display text-3xl sm:text-4xl mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.colorAlpha})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <span
                      ref={(el) => {
                        statCountersRef.current[i] = el
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <div className="type-label text-[8px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN (5 cols) ── Premium Visual Elements ── */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">

              {/* ════════════════════════════════════════════════════
                  Card 1 — Neural Architecture (Large)
                  ════════════════════════════════════════════════════ */}
              <div
                ref={(el) => {
                  imgCardsRef.current[0] = el
                }}
                className="col-span-2 row-span-2 h-72 sm:h-80 lg:h-[420px] rounded-2xl relative overflow-hidden group"
                data-cursor-hover
                style={{
                  background: 'linear-gradient(160deg, rgba(124,92,252,0.05) 0%, rgba(124,92,252,0.13) 40%, rgba(92,184,252,0.07) 100%), #FFFFFF',
                  border: '1px solid rgba(124, 92, 252, 0.12)',
                }}
              >
                {/* ── Neural Network Visualization ── */}
                <div className="neural-viz" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  <svg
                    viewBox="0 0 300 380"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  >
                    <defs>
                      <pattern id="about-neural-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="12" cy="12" r="0.5" fill="rgba(124,92,252,0.06)" />
                      </pattern>
                    </defs>
                    <rect width="300" height="380" fill="url(#about-neural-grid)" />

                    {/* Connection lines with data flow */}
                    {NEURAL_CONNECTIONS.map(([from, to], i) => (
                      <line
                        key={`conn-${i}`}
                        className="neural-line"
                        x1={NEURAL_NODES[from].x}
                        y1={NEURAL_NODES[from].y}
                        x2={NEURAL_NODES[to].x}
                        y2={NEURAL_NODES[to].y}
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}

                    {/* Node glows (soft radial behind each node) */}
                    {NEURAL_NODES.map((node, i) => (
                      <circle
                        key={`glow-${i}`}
                        className="neural-glow"
                        cx={node.x}
                        cy={node.y}
                        r="16"
                        fill={node.color}
                        style={{ animationDelay: `${i * 0.35}s` }}
                      />
                    ))}

                    {/* Solid node dots */}
                    {NEURAL_NODES.map((node, i) => (
                      <circle
                        key={`node-${i}`}
                        className="neural-node"
                        cx={node.x}
                        cy={node.y}
                        r="4"
                        fill={node.color}
                        style={{ animationDelay: `${i * 0.35}s` }}
                      />
                    ))}

                    {/* Active signal pulses traveling along select connections */}
                    <circle className="signal-dot sd-1" r="2.5" fill="#7C5CFC">
                      <animateMotion dur="3s" repeatCount="indefinite" begin="0s">
                        <mpath href="#signal-path-1" />
                      </animateMotion>
                    </circle>
                    <circle className="signal-dot sd-2" r="2" fill="#5CB8FC">
                      <animateMotion dur="4s" repeatCount="indefinite" begin="1.5s">
                        <mpath href="#signal-path-2" />
                      </animateMotion>
                    </circle>
                    <circle className="signal-dot sd-3" r="2" fill="#9678FC">
                      <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.8s">
                        <mpath href="#signal-path-3" />
                      </animateMotion>
                    </circle>

                    {/* Signal paths (invisible guide paths) */}
                    <path id="signal-path-1" d="M50,70 L150,45 L250,100" fill="none" stroke="none" />
                    <path id="signal-path-2" d="M50,190 L150,235 L250,280" fill="none" stroke="none" />
                    <path id="signal-path-3" d="M50,310 L150,140 L250,190" fill="none" stroke="none" />
                  </svg>

                  {/* Floating diamond accents */}
                  <div className="neural-diamond diamond-1" />
                  <div className="neural-diamond diamond-2" />
                  <div className="neural-diamond diamond-3" />

                  {/* Floating particles */}
                  <div className="neural-particle p1" />
                  <div className="neural-particle p2" />
                  <div className="neural-particle p3" />
                  <div className="neural-particle p4" />

                  {/* Horizontal scan line */}
                  <div className="scan-line" />
                </div>

                {/* White gradient overlay for text readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 25%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.95) 100%)',
                    zIndex: 2,
                  }}
                />

                {/* Noise texture */}
                <div className="absolute inset-0 noise-img pointer-events-none" style={{ zIndex: 3 }} />

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6" style={{ zIndex: 10 }}>
                  <div className="type-label text-[8px] mb-1.5" style={{ color: '#7C5CFC' }}>01</div>
                  <div className="type-headline text-sm sm:text-base text-[#0F0F12]">Neural Architecture</div>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════
                  Card 2 — Data Intelligence (Medium)
                  ════════════════════════════════════════════════════ */}
              <div
                ref={(el) => {
                  imgCardsRef.current[1] = el
                }}
                className="col-span-2 h-48 sm:h-56 rounded-2xl relative overflow-hidden group"
                data-cursor-hover
                style={{
                  background: 'linear-gradient(160deg, rgba(92,184,252,0.05) 0%, rgba(92,184,252,0.13) 40%, rgba(124,92,252,0.07) 100%), #FFFFFF',
                  border: '1px solid rgba(92, 184, 252, 0.12)',
                }}
              >
                {/* ── Data Intelligence Visualization ── */}
                <div className="data-viz" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  {/* Animated bar chart */}
                  <div className="data-bars-container">
                    {[35, 60, 45, 75, 40, 65, 50].map((h, i) => (
                      <div
                        key={`bar-${i}`}
                        className="data-bar"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>

                  {/* Flowing stream lines */}
                  <svg
                    viewBox="0 0 300 80"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: '8%', left: 0, width: '100%', height: '28%' }}
                  >
                    <line className="data-stream" x1="0" y1="15" x2="300" y2="15" style={{ animationDelay: '0s' }} />
                    <line className="data-stream" x1="0" y1="40" x2="300" y2="40" style={{ animationDelay: '0.8s' }} />
                    <line className="data-stream" x1="0" y1="65" x2="300" y2="65" style={{ animationDelay: '1.6s' }} />
                  </svg>

                  {/* Radar pulse element */}
                  <div className="radar-pulse">
                    <div className="radar-ring ring-1" />
                    <div className="radar-ring ring-2" />
                    <div className="radar-ring ring-3" />
                    <div className="radar-dot" />
                  </div>

                  {/* Scatter dots */}
                  <div className="data-dot d1" />
                  <div className="data-dot d2" />
                  <div className="data-dot d3" />
                </div>

                {/* White gradient overlay for text readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 20%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0.95) 100%)',
                    zIndex: 2,
                  }}
                />

                {/* Noise texture */}
                <div className="absolute inset-0 noise-img pointer-events-none" style={{ zIndex: 3 }} />

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6" style={{ zIndex: 10 }}>
                  <div className="type-label text-[8px] mb-1.5" style={{ color: '#5CB8FC' }}>02</div>
                  <div className="type-headline text-sm sm:text-base text-[#0F0F12]">Data Intelligence</div>
                </div>
              </div>

              {/* ════════════════════════════════════════════════════
                  Card 3 — Autonomous Systems (Medium)
                  ════════════════════════════════════════════════════ */}
              <div
                ref={(el) => {
                  imgCardsRef.current[2] = el
                }}
                className="col-span-2 h-48 sm:h-56 rounded-2xl relative overflow-hidden group"
                data-cursor-hover
                style={{
                  background: 'linear-gradient(160deg, rgba(252,92,140,0.05) 0%, rgba(252,92,140,0.13) 40%, rgba(252,204,92,0.07) 100%), #FFFFFF',
                  border: '1px solid rgba(252, 92, 140, 0.12)',
                }}
              >
                {/* ── 3D Cube Visualization ── */}
                <div className="cube-scene">
                  {/* Glow behind cube */}
                  <div className="cube-glow" />

                  {/* 3D Wireframe Cube */}
                  <div className="cube">
                    <div className="cube-face face-front" />
                    <div className="cube-face face-back" />
                    <div className="cube-face face-left" />
                    <div className="cube-face face-right" />
                    <div className="cube-face face-top" />
                    <div className="cube-face face-bottom" />
                  </div>

                  {/* Orbital ring 1 (pink) */}
                  <div className="orbital-container oc-1">
                    <div className="orbital-ring" />
                    <div className="orbit-dot dot-1" />
                    <div className="orbit-dot dot-2" />
                  </div>

                  {/* Orbital ring 2 (gold) */}
                  <div className="orbital-container oc-2">
                    <div className="orbital-ring ring-gold" />
                    <div className="orbit-dot dot-3" />
                  </div>
                </div>

                {/* White gradient overlay for text readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 20%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0.95) 100%)',
                    zIndex: 2,
                  }}
                />

                {/* Noise texture */}
                <div className="absolute inset-0 noise-img pointer-events-none" style={{ zIndex: 3 }} />

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6" style={{ zIndex: 10 }}>
                  <div className="type-label text-[8px] mb-1.5" style={{ color: '#FC5C8C' }}>03</div>
                  <div className="type-headline text-sm sm:text-base text-[#0F0F12]">Autonomous Systems</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── All CSS animations via styled-jsx ── */}
      <style jsx global>{`
        /* ════════════════════════════════════════════════════════
           CARD 1: Neural Architecture
           ════════════════════════════════════════════════════════ */

        .neural-viz {
          z-index: 1;
        }

        /* Connection lines — animated dash flow */
        .neural-line {
          stroke: rgba(124, 92, 252, 0.3);
          stroke-width: 1;
          stroke-dasharray: 6 10;
          stroke-linecap: round;
          fill: none;
          animation: neuralDataFlow 3s linear infinite;
        }

        @keyframes neuralDataFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -16; }
        }

        /* Node glow — soft pulsing radial */
        .neural-glow {
          opacity: 0.18;
          animation: glowPulse 3.5s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }

        /* Solid node dot */
        .neural-node {
          opacity: 0.8;
          animation: nodePulse 3.5s ease-in-out infinite;
        }

        @keyframes nodePulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Signal dots traveling along paths */
        .signal-dot {
          opacity: 0;
          animation: signalPulse 1.5s ease-in-out infinite;
        }

        .sd-1 { animation-delay: 0s; }
        .sd-2 { animation-delay: 1.5s; }
        .sd-3 { animation-delay: 0.8s; }

        @keyframes signalPulse {
          0%, 100% { opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
        }

        /* Floating diamond accents */
        .neural-diamond {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1px solid rgba(124, 92, 252, 0.35);
          border-radius: 1px;
          animation: floatDiamond 7s ease-in-out infinite;
        }

        .diamond-1 {
          top: 14%;
          left: 22%;
          animation-delay: 0s;
        }

        .diamond-2 {
          top: 48%;
          right: 12%;
          animation-delay: 2.3s;
          border-color: rgba(92, 184, 252, 0.35);
        }

        .diamond-3 {
          bottom: 28%;
          left: 38%;
          animation-delay: 4.6s;
        }

        @keyframes floatDiamond {
          0%, 100% { transform: rotate(45deg) translateY(0px); opacity: 0.4; }
          50% { transform: rotate(45deg) translateY(-10px); opacity: 0.75; }
        }

        /* Floating particles */
        .neural-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(124, 92, 252, 0.5);
          animation: particleFloat 9s ease-in-out infinite;
        }

        .p1 { top: 18%; left: 12%; animation-delay: 0s; }
        .p2 { top: 52%; left: 72%; animation-delay: 2s; background: rgba(92, 184, 252, 0.5); }
        .p3 { top: 38%; left: 48%; animation-delay: 4s; }
        .p4 { top: 72%; left: 28%; animation-delay: 6s; background: rgba(92, 184, 252, 0.5); }

        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0); opacity: 0.35; }
          25% { transform: translate(6px, -10px); opacity: 0.7; }
          50% { transform: translate(-4px, -14px); opacity: 0.4; }
          75% { transform: translate(8px, -6px); opacity: 0.65; }
        }

        /* Horizontal scan line */
        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent 5%, rgba(124, 92, 252, 0.1) 30%, rgba(92, 184, 252, 0.12) 50%, rgba(124, 92, 252, 0.1) 70%, transparent 95%);
          animation: scanDown 8s linear infinite;
          z-index: 2;
        }

        @keyframes scanDown {
          0% { top: -2%; }
          100% { top: 102%; }
        }

        /* ════════════════════════════════════════════════════════
           CARD 2: Data Intelligence
           ════════════════════════════════════════════════════════ */

        .data-viz {
          z-index: 1;
        }

        /* Bar chart container */
        .data-bars-container {
          position: absolute;
          bottom: 48px;
          left: 12%;
          right: 24%;
          top: 32%;
          display: flex;
          align-items: flex-end;
          gap: 7%;
        }

        /* Individual bar */
        .data-bar {
          flex: 1;
          max-width: 18px;
          border-radius: 2px 2px 0 0;
          background: linear-gradient(to top, rgba(92, 184, 252, 0.35), rgba(92, 184, 252, 0.55));
          border-top: 1px solid rgba(92, 184, 252, 0.5);
          transform-origin: bottom center;
          animation: barPulse 3.5s ease-in-out infinite;
        }

        @keyframes barPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.65; }
          50% { transform: scaleY(1.12); opacity: 1; }
        }

        /* Stream lines */
        .data-stream {
          stroke: rgba(92, 184, 252, 0.3);
          stroke-width: 1;
          stroke-dasharray: 10 18;
          stroke-linecap: round;
          fill: none;
          animation: streamFlow 2.5s linear infinite;
        }

        @keyframes streamFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -28; }
        }

        /* Radar pulse */
        .radar-pulse {
          position: absolute;
          top: 12%;
          right: 10%;
          width: 40px;
          height: 40px;
        }

        .radar-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(92, 184, 252, 0.35);
          animation: radarExpand 3.5s ease-out infinite;
        }

        .ring-2 { animation-delay: 1.2s; }
        .ring-3 { animation-delay: 2.4s; }

        @keyframes radarExpand {
          0% { transform: scale(0.4); opacity: 0.6; }
          100% { transform: scale(2.8); opacity: 0; }
        }

        .radar-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(92, 184, 252, 0.8);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 6px rgba(92, 184, 252, 0.4);
        }

        /* Scatter dots */
        .data-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(92, 184, 252, 0.45);
          animation: dotPulse 4.5s ease-in-out infinite;
        }

        .d1 { top: 22%; left: 16%; animation-delay: 0s; }
        .d2 { top: 42%; right: 18%; animation-delay: 1.5s; }
        .d3 { top: 58%; left: 52%; animation-delay: 3s; background: rgba(124, 92, 252, 0.45); }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }

        /* ════════════════════════════════════════════════════════
           CARD 3: Autonomous Systems
           ════════════════════════════════════════════════════════ */

        .cube-scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 500px;
          pointer-events: none;
          z-index: 1;
        }

        /* Glow behind cube */
        .cube-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(252, 92, 140, 0.18) 0%, rgba(252, 204, 92, 0.08) 40%, transparent 70%);
          animation: cubeGlowPulse 4.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes cubeGlowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.12); }
        }

        /* 3D Cube */
        .cube {
          position: relative;
          width: 68px;
          height: 68px;
          transform-style: preserve-3d;
          animation: cubeRotate 20s linear infinite;
          will-change: transform;
        }

        @keyframes cubeRotate {
          0% { transform: rotateX(-25deg) rotateY(0deg); }
          100% { transform: rotateX(-25deg) rotateY(360deg); }
        }

        /* Cube faces — wireframe look */
        .cube-face {
          position: absolute;
          width: 68px;
          height: 68px;
          border-radius: 3px;
        }

        .face-front {
          transform: translateZ(34px);
          border: 1.5px solid rgba(252, 92, 140, 0.55);
          background: rgba(252, 92, 140, 0.04);
        }

        .face-back {
          transform: rotateY(180deg) translateZ(34px);
          border: 1.5px solid rgba(252, 92, 140, 0.25);
          background: rgba(252, 92, 140, 0.02);
        }

        .face-left {
          transform: rotateY(-90deg) translateZ(34px);
          border: 1.5px solid rgba(252, 92, 140, 0.4);
          background: rgba(252, 92, 140, 0.03);
        }

        .face-right {
          transform: rotateY(90deg) translateZ(34px);
          border: 1.5px solid rgba(252, 92, 140, 0.5);
          background: rgba(252, 92, 140, 0.035);
        }

        .face-top {
          transform: rotateX(90deg) translateZ(34px);
          border: 1.5px solid rgba(252, 204, 92, 0.4);
          background: rgba(252, 204, 92, 0.03);
        }

        .face-bottom {
          transform: rotateX(-90deg) translateZ(34px);
          border: 1.5px solid rgba(252, 92, 140, 0.3);
          background: rgba(252, 92, 140, 0.02);
        }

        /* Orbital containers — centered, tilted in 3D */
        .orbital-container {
          position: absolute;
          width: 140px;
          height: 140px;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
        }

        .oc-1 {
          transform: translate(-50%, -50%) rotateX(65deg) rotateZ(20deg);
        }

        .oc-2 {
          transform: translate(-50%, -50%) rotateX(75deg) rotateZ(-35deg);
        }

        /* Orbital rings */
        .orbital-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(252, 92, 140, 0.3);
        }

        .ring-gold {
          border-color: rgba(252, 204, 92, 0.25);
        }

        /* Orbiting dots */
        .orbit-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          margin: -2.5px 0 0 -2.5px;
          animation: orbitDot 9s linear infinite;
          will-change: transform;
        }

        .dot-1 {
          background: #FC5C8C;
          box-shadow: 0 0 8px rgba(252, 92, 140, 0.5);
          animation-duration: 9s;
        }

        .dot-2 {
          background: #FC5C8C;
          box-shadow: 0 0 6px rgba(252, 92, 140, 0.4);
          animation-duration: 9s;
          animation-delay: -4.5s;
        }

        .dot-3 {
          background: #FCCC5C;
          box-shadow: 0 0 8px rgba(252, 204, 92, 0.5);
          animation-duration: 11s;
        }

        @keyframes orbitDot {
          0% { transform: rotate(0deg) translateX(70px); }
          100% { transform: rotate(360deg) translateX(70px); }
        }

        /* ════════════════════════════════════════════════════════
           Reduced Motion Support
           ════════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .neural-node,
          .neural-glow,
          .neural-line,
          .signal-dot,
          .neural-diamond,
          .neural-particle,
          .scan-line,
          .data-bar,
          .data-stream,
          .radar-ring,
          .data-dot,
          .cube,
          .orbit-dot,
          .cube-glow {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
