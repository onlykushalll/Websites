'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FeatureData {
  title: string
  desc: string
  tag: string
  accent: string
}

const FEATURES: FeatureData[] = [
  {
    title: 'Autonomous Thinking',
    desc: 'Self-directed reasoning that processes complex scenarios and makes intelligent decisions without human intervention.',
    tag: 'COGNITION',
    accent: '#7C5CFC',
  },
  {
    title: 'Real-Time Adaptation',
    desc: 'Continuously learns from data streams, adapting strategies in milliseconds.',
    tag: 'VELOCITY',
    accent: '#5CB8FC',
  },
  {
    title: 'Secure Execution',
    desc: 'Enterprise-grade security with built-in guardrails and compliance controls.',
    tag: 'SECURITY',
    accent: '#FC5C8C',
  },
  {
    title: 'Seamless Integration',
    desc: 'Connects with existing tools through native APIs — zero infrastructure changes required.',
    tag: 'INTEGRATION',
    accent: '#FCCC5C',
  },
  {
    title: 'Predictive Analytics',
    desc: 'Anticipates trends and outcomes using advanced pattern recognition for proactive strategies.',
    tag: 'INTELLIGENCE',
    accent: '#7C5CFC',
  },
  {
    title: 'Scalable Deployment',
    desc: 'From single-task agents to enterprise fleets — scale autonomously with consistent performance.',
    tag: 'SCALE',
    accent: '#5CB8FC',
  },
]

/* ─────────────────────────────────────────────
   6 Unique CSS-Animated Visuals
   Each perfectly centered in the top 60% of card
   ───────────────────────────────────────────── */

/* 0 — Autonomous Thinking — Neural Network (SVG) */
function NeuralVisual({ accent }: { accent: string }) {
  const s = { '--a': accent } as React.CSSProperties
  /* Nodes: 3 layers — input(2), hidden(3), output(2) */
  const nodes = [
    { x: 35, y: 50, id: 'i1' },
    { x: 35, y: 120, id: 'i2' },
    { x: 90, y: 25, id: 'h1' },
    { x: 90, y: 85, id: 'h2' },
    { x: 90, y: 145, id: 'h3' },
    { x: 145, y: 50, id: 'o1' },
    { x: 145, y: 120, id: 'o2' },
  ]
  const connections = [
    ['i1', 'h1'], ['i1', 'h2'], ['i1', 'h3'],
    ['i2', 'h1'], ['i2', 'h2'], ['i2', 'h3'],
    ['h1', 'o1'], ['h1', 'o2'],
    ['h2', 'o1'], ['h2', 'o2'],
    ['h3', 'o1'], ['h3', 'o2'],
  ]
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <div className="feat-vis" style={s}>
      <svg viewBox="0 0 180 170" className="feat-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines */}
        {connections.map(([from, to], i) => (
          <line
            key={`c${i}`}
            x1={nodeMap[from].x} y1={nodeMap[from].y}
            x2={nodeMap[to].x} y2={nodeMap[to].y}
            stroke="var(--a)" strokeWidth="1" opacity="0.35"
            className="neural-line"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
        {/* Glows behind nodes */}
        {nodes.map(n => (
          <circle key={`g${n.id}`} cx={n.x} cy={n.y} r="14" fill="var(--a)" opacity="0.12" className="neural-node-glow" />
        ))}
        {/* Node dots */}
        {nodes.map((n, i) => (
          <circle key={n.id} cx={n.x} cy={n.y} r="5" fill="var(--a)" opacity="0.7" className="neural-node-dot" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
        {/* Traveling signal dots */}
        {[0, 4, 8].map((ci, i) => {
          const from = nodeMap[connections[ci][0]]
          const to = nodeMap[connections[ci][1]]
          return (
            <circle key={`sig${i}`} r="2.5" fill="var(--a)" opacity="1" className="neural-signal">
              <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${i * 0.8}s`} path={`M${from.x},${from.y} L${to.x},${to.y}`} />
            </circle>
          )
        })}
      </svg>
    </div>
  )
}

/* 1 — Real-Time Adaptation — Pulsing Radar */
function RadarVisual({ accent }: { accent: string }) {
  const s = { '--a': accent } as React.CSSProperties
  return (
    <div className="feat-vis" style={s}>
      <div className="radar-container">
        <div className="radar-ring rr-1" />
        <div className="radar-ring rr-2" />
        <div className="radar-ring rr-3" />
        <div className="radar-sweep" />
        <div className="radar-center-dot" />
        <div className="radar-blip rb-1" />
        <div className="radar-blip rb-2" />
        <div className="radar-blip rb-3" />
      </div>
    </div>
  )
}

/* 2 — Secure Execution — Rotating Hex Shield */
function ShieldVisual({ accent }: { accent: string }) {
  const s = { '--a': accent } as React.CSSProperties
  return (
    <div className="feat-vis" style={s}>
      <div className="shield-container">
        <div className="hex-glow-bg" />
        <div className="hex-layer hex-outer-ring" />
        <div className="hex-layer hex-mid-ring" />
        <div className="hex-layer hex-inner-ring" />
        <div className="hex-core-dot" />
      </div>
    </div>
  )
}

/* 3 — Seamless Integration — Connected Nodes with Flowing Dots */
function FlowVisual({ accent }: { accent: string }) {
  const s = { '--a': accent } as React.CSSProperties
  return (
    <div className="feat-vis" style={s}>
      <div className="flow-container">
        <div className="flow-track-line" />
        <div className="flow-node fn-a" />
        <div className="flow-node fn-b" />
        <div className="flow-node fn-c" />
        <div className="flow-node fn-d" />
        <div className="flow-traveler ft-1" />
        <div className="flow-traveler ft-2" />
        <div className="flow-traveler ft-3" />
        <div className="flow-pulse-ring fp-a" />
        <div className="flow-pulse-ring fp-b" />
      </div>
    </div>
  )
}

/* 4 — Predictive Analytics — Animated Bar Chart with Trend */
function ChartVisual({ accent }: { accent: string }) {
  const s = { '--a': accent } as React.CSSProperties
  return (
    <div className="feat-vis" style={s}>
      <div className="chart-container">
        <div className="chart-gridline cgl-1" />
        <div className="chart-gridline cgl-2" />
        <div className="chart-gridline cgl-3" />
        <div className="chart-bar vb-1" />
        <div className="chart-bar vb-2" />
        <div className="chart-bar vb-3" />
        <div className="chart-bar vb-4" />
        <div className="chart-bar vb-5" />
        <div className="chart-trend-line" />
        <div className="chart-data-dot cdd-1" />
        <div className="chart-data-dot cdd-2" />
        <div className="chart-data-dot cdd-3" />
      </div>
    </div>
  )
}

/* 5 — Scalable Deployment — Globe Wireframe with Ripples */
function GlobeVisual({ accent }: { accent: string }) {
  const s = { '--a': accent } as React.CSSProperties
  return (
    <div className="feat-vis" style={s}>
      <div className="globe-container">
        <div className="globe-circle gc-1" />
        <div className="globe-circle gc-2" />
        <div className="globe-circle gc-3" />
        <div className="globe-meridian gm-h" />
        <div className="globe-meridian gm-v" />
        <div className="globe-center-dot" />
        <div className="globe-surface-dot gsd-1" />
        <div className="globe-surface-dot gsd-2" />
        <div className="globe-surface-dot gsd-3" />
        <div className="globe-ripple grp-1" />
        <div className="globe-ripple grp-2" />
      </div>
    </div>
  )
}

const VISUALS = [NeuralVisual, RadarVisual, ShieldVisual, FlowVisual, ChartVisual, GlobeVisual]

/* ─────────────────────────────────────────────
   Main Features Component
   ───────────────────────────────────────────── */

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const setCardRef = useCallback((el: HTMLDivElement | null, idx: number) => {
    cardsRef.current[idx] = el
  }, [])

  /* 3D Tilt on mouse move */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const mouseX = e.clientX - (rect.left + rect.width / 2)
    const mouseY = e.clientY - (rect.top + rect.height / 2)
    const rotateY = (mouseX / (rect.width / 2)) * 8
    const rotateX = -(mouseY / (rect.height / 2)) * 8
    card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.015,1.015,1.015)`
  }, [])

  const handleMouseLeave = useCallback((idx: number) => {
    const card = cardsRef.current[idx]
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }, [])

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.section-header')
      if (header) {
        gsap.fromTo(
          header,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: header, start: 'top 85%' } }
        )
      }
      const cards = sectionRef.current?.querySelectorAll('.feature-card')
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: cards[0], start: 'top 85%' } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative py-32 sm:py-44 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="section-header mb-16">
          <div className="type-label mb-4 flex items-center gap-3">
            <span className="inline-block w-6 h-[1px] bg-[#7C5CFC]/40 rounded-full" />
            CAPABILITIES
          </div>
          <h2 className="type-headline text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
            Built for <span className="gradient-text">autonomous</span> action
          </h2>
        </div>

        {/* ── Clean 3×2 Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, idx) => {
            const Visual = VISUALS[idx]
            return (
              <div key={feature.title} className="feature-card-wrapper">
                <div
                  ref={(el) => setCardRef(el, idx)}
                  className="feature-card relative overflow-hidden rounded-2xl h-[400px] cursor-pointer group"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    background: '#FFFFFF',
                  }}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  data-cursor-hover
                >
                  {/* Card background — subtle accent gradient */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(145deg, ${feature.accent}12 0%, ${feature.accent}28 50%, ${feature.accent}12 100%)`,
                    }}
                  />

                  {/* Radial glow behind visual area */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 55% at 50% 28%, ${feature.accent}25 0%, transparent 70%)`,
                    }}
                  />

                  {/* ── Visual Area (top 60%) ── */}
                  <Visual accent={feature.accent} />

                  {/* White gradient overlay — fades visual into content area */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0.8) 58%, #FFFFFF 100%)',
                      zIndex: 2,
                    }}
                  />

                  {/* Noise texture */}
                  <div className="absolute inset-0 noise-img pointer-events-none" style={{ zIndex: 3 }} />

                  {/* Hover brighten */}
                  <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ zIndex: 4 }} />

                  {/* Subtle glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 60px ${feature.accent}08, 0 20px 50px -12px ${feature.accent}10`,
                      zIndex: 5,
                    }}
                  />

                  {/* ── Content Area (bottom 40%) ── */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    {/* Icon dot + Tag */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div
                        className="w-[11px] h-[11px] rounded-lg flex-shrink-0"
                        style={{ backgroundColor: `${feature.accent}20`, border: `1.5px solid ${feature.accent}40` }}
                      />
                      <span
                        className="type-label text-[9px] tracking-widest"
                        style={{ color: feature.accent }}
                      >
                        {feature.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="type-headline text-xl text-[#0F0F12] mb-1.5">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="type-body text-sm leading-relaxed text-[#71717A]">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Bottom accent line — 2px, scales on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20 overflow-hidden">
                    <div
                      className="h-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                      }}
                    />
                  </div>

                  {/* Shimmer on hover */}
                  <div className="shimmer-on-hover absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
         VISUAL ANIMATIONS — styled-jsx
         ══════════════════════════════════════════════════ */}
      <style jsx global>{`
        /* ── Shared visual container — positioned in top 60%, centered ── */
        .feat-vis {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }

        /* ── SVG sizing ── */
        .feat-svg {
          width: min(200px, 70%);
          height: auto;
        }

        /* ═══════════════════════════════════════════════════
           0 — NEURAL NETWORK
           ═══════════════════════════════════════════════════ */
        .neural-line {
          stroke-dasharray: 6 4;
          animation: neuralFlow 3s linear infinite;
        }
        .neural-node-glow {
          animation: neuralGlow 3.5s ease-in-out infinite;
        }
        .neural-node-dot {
          animation: neuralDotPulse 3.5s ease-in-out infinite;
        }

        @keyframes neuralFlow {
          from { stroke-dashoffset: 20; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes neuralGlow {
          0%, 100% { opacity: 0.12; }
          50%      { opacity: 0.3; }
        }
        @keyframes neuralDotPulse {
          0%, 100% { opacity: 0.7; transform-origin: center; transform: scale(1); }
          50%      { opacity: 1;  transform-origin: center; transform: scale(1.15); }
        }

        /* ═══════════════════════════════════════════════════
           1 — RADAR
           ═══════════════════════════════════════════════════ */
        .radar-container {
          position: relative;
          width: min(180px, 65%);
          aspect-ratio: 1;
        }

        .radar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--a);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .rr-1 { width: 100%; height: 100%; opacity: 0.18; animation: radarRingPulse 3.5s ease-in-out infinite; }
        .rr-2 { width: 66%;  height: 66%;  opacity: 0.25; animation: radarRingPulse 3.5s ease-in-out infinite 0.5s; }
        .rr-3 { width: 33%;  height: 33%;  opacity: 0.32; animation: radarRingPulse 3.5s ease-in-out infinite 1s; }

        .radar-sweep {
          position: absolute;
          top: 50%; left: 50%;
          width: 50%;
          height: 2px;
          transform-origin: left center;
          background: linear-gradient(90deg, var(--a), transparent);
          opacity: 0.6;
          animation: radarSweepSpin 3s linear infinite;
        }
        .radar-sweep::after {
          content: '';
          position: absolute;
          top: -16px; left: 0;
          width: 100%; height: 34px;
          transform-origin: left center;
          background: conic-gradient(from 0deg, var(--a), transparent 30%);
          opacity: 0.2;
          border-radius: 0 100% 100% 0;
        }

        .radar-center-dot {
          position: absolute;
          top: 50%; left: 50%;
          width: 6px; height: 6px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 8px var(--a);
          opacity: 0.9;
          animation: radarCenterPulse 2.5s ease-in-out infinite;
        }

        .radar-blip {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 4px var(--a);
          opacity: 0;
        }
        .rb-1 { top: 22%; left: 62%; animation: radarBlip 3.5s ease-out infinite 0.6s; }
        .rb-2 { top: 38%; left: 25%; animation: radarBlip 3.5s ease-out infinite 1.6s; }
        .rb-3 { top: 18%; left: 45%; animation: radarBlip 3.5s ease-out infinite 2.4s; }

        @keyframes radarRingPulse {
          0%, 100% { opacity: 0.18; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.3; transform: translate(-50%, -50%) scale(1.04); }
        }
        @keyframes radarSweepSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes radarCenterPulse {
          0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.3); }
        }
        @keyframes radarBlip {
          0%  { opacity: 0;   transform: scale(0.5); }
          15% { opacity: 0.8; transform: scale(1.2); }
          100%{ opacity: 0;   transform: scale(0.3); }
        }

        /* ═══════════════════════════════════════════════════
           2 — HEX SHIELD
           ═══════════════════════════════════════════════════ */
        .shield-container {
          position: relative;
          width: min(160px, 60%);
          aspect-ratio: 1;
        }

        .hex-glow-bg {
          position: absolute;
          top: 50%; left: 50%;
          width: 120px; height: 120px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--a);
          opacity: 0.15;
          filter: blur(30px);
          animation: hexGlowPulse 4s ease-in-out infinite;
        }

        .hex-layer {
          position: absolute;
          top: 50%; left: 50%;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        /* Outer hex */
        .hex-outer-ring {
          width: 100%; height: 100%;
          transform: translate(-50%, -50%) rotate(0deg);
          animation: hexSpinCW 20s linear infinite;
        }
        .hex-outer-ring::before {
          content: '';
          position: absolute; inset: 0;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--a);
          opacity: 0.18;
        }
        .hex-outer-ring::after {
          content: '';
          position: absolute; inset: 2px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: white;
          opacity: 0.9;
        }

        /* Mid hex */
        .hex-mid-ring {
          width: 68%; height: 68%;
          transform: translate(-50%, -50%) rotate(0deg);
          animation: hexSpinCCW 14s linear infinite;
        }
        .hex-mid-ring::before {
          content: '';
          position: absolute; inset: 0;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--a);
          opacity: 0.25;
        }
        .hex-mid-ring::after {
          content: '';
          position: absolute; inset: 2px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: white;
          opacity: 0.85;
        }

        /* Inner hex */
        .hex-inner-ring {
          width: 38%; height: 38%;
          transform: translate(-50%, -50%) rotate(0deg);
          animation: hexSpinCW 9s linear infinite;
        }
        .hex-inner-ring::before {
          content: '';
          position: absolute; inset: 0;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: var(--a);
          opacity: 0.35;
        }

        .hex-core-dot {
          position: absolute;
          top: 50%; left: 50%;
          width: 8px; height: 8px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 8px var(--a), 0 0 18px var(--a);
          opacity: 0.8;
          animation: hexCorePulse 3s ease-in-out infinite;
        }

        @keyframes hexGlowPulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.2; transform: translate(-50%, -50%) scale(1.12); }
        }
        @keyframes hexSpinCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes hexSpinCCW {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @keyframes hexCorePulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.35); }
        }

        /* ═══════════════════════════════════════════════════
           3 — CONNECTED FLOW
           ═══════════════════════════════════════════════════ */
        .flow-container {
          position: relative;
          width: min(240px, 80%);
          height: 50px;
        }

        .flow-track-line {
          position: absolute;
          top: 50%; left: 5%; right: 5%;
          height: 2px;
          transform: translateY(-50%);
          background: var(--a);
          opacity: 0.25;
          border-radius: 1px;
        }
        .flow-track-line::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, var(--a), transparent);
          opacity: 0.35;
          animation: flowTrackPulse 3s ease-in-out infinite;
        }

        .flow-node {
          position: absolute;
          top: 50%;
          width: 12px; height: 12px;
          border-radius: 50%;
          border: 2px solid var(--a);
          background: white;
          opacity: 0.7;
          transform: translate(-50%, -50%);
        }
        .flow-node::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 4px; height: 4px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--a);
          opacity: 0.8;
        }
        .fn-a { left: 8%;  animation: flowNodePulse 3s ease-in-out infinite; }
        .fn-b { left: 36%; animation: flowNodePulse 3s ease-in-out infinite 0.5s; }
        .fn-c { left: 64%; animation: flowNodePulse 3s ease-in-out infinite 1s; }
        .fn-d { left: 92%; animation: flowNodePulse 3s ease-in-out infinite 1.5s; }

        .flow-traveler {
          position: absolute;
          top: 50%;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 6px var(--a);
          opacity: 0;
          transform: translate(-50%, -50%);
          animation: flowDotTravel 3.5s linear infinite;
        }
        .ft-1 { animation-delay: 0s; }
        .ft-2 { animation-delay: 1.15s; }
        .ft-3 { animation-delay: 2.3s; }

        .flow-pulse-ring {
          position: absolute;
          top: 50%;
          width: 12px; height: 12px;
          border-radius: 50%;
          border: 1px solid var(--a);
          opacity: 0;
          transform: translate(-50%, -50%) scale(1);
        }
        .fp-a { left: 36%; animation: flowPulseExpand 3s ease-out infinite; }
        .fp-b { left: 64%; animation: flowPulseExpand 3s ease-out infinite 1.5s; }

        @keyframes flowTrackPulse {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.65; }
        }
        @keyframes flowNodePulse {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes flowDotTravel {
          0%   { left: 5%;  opacity: 0; }
          8%   { opacity: 0.8; }
          88%  { opacity: 0.8; }
          100% { left: 95%; opacity: 0; }
        }
        @keyframes flowPulseExpand {
          0%   { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0;    transform: translate(-50%, -50%) scale(2.5); }
        }

        /* ═══════════════════════════════════════════════════
           4 — BAR CHART
           ═══════════════════════════════════════════════════ */
        .chart-container {
          position: relative;
          width: min(200px, 70%);
          height: min(130px, 55%);
        }

        .chart-gridline {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: var(--a);
          opacity: 0.15;
        }
        .cgl-1 { top: 20%; }
        .cgl-2 { top: 45%; }
        .cgl-3 { top: 70%; }

        .chart-bar {
          position: absolute;
          bottom: 0;
          width: 18px;
          border-radius: 3px 3px 0 0;
          background: var(--a);
          opacity: 0.18;
          transform-origin: bottom center;
          transform: scaleY(0);
          animation: chartBarGrow 1.8s ease-out forwards;
        }
        .vb-1 { left: 5%;  height: 40%; animation-delay: 0.1s; opacity: 0.22; }
        .vb-2 { left: 22%; height: 55%; animation-delay: 0.25s; opacity: 0.3; }
        .vb-3 { left: 39%; height: 32%; animation-delay: 0.4s; opacity: 0.22; }
        .vb-4 { left: 56%; height: 72%; animation-delay: 0.55s; opacity: 0.2; }
        .vb-5 { left: 73%; height: 60%; animation-delay: 0.7s; opacity: 0.3; }

        .chart-trend-line {
          position: absolute;
          top: 24%;
          left: 5%;
          width: 85%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--a));
          opacity: 0.45;
          transform: scaleX(0) rotate(-7deg);
          transform-origin: left center;
          animation: chartTrendGrow 1.8s ease-out 0.9s forwards;
        }
        .chart-trend-line::after {
          content: '';
          position: absolute;
          right: -3px; top: -3px;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 8px var(--a);
          opacity: 0.55;
        }

        .chart-data-dot {
          position: absolute;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 4px var(--a);
          opacity: 0;
          animation: chartDotIn 0.5s ease-out forwards;
        }
        .cdd-1 { top: 32%; left: 14%;  animation-delay: 1.1s; }
        .cdd-2 { top: 22%; left: 48%;  animation-delay: 1.3s; }
        .cdd-3 { top: 14%; left: 82%;  animation-delay: 1.5s; }

        @keyframes chartBarGrow {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes chartTrendGrow {
          from { transform: scaleX(0) rotate(-7deg); }
          to   { transform: scaleX(1) rotate(-7deg); }
        }
        @keyframes chartDotIn {
          from { opacity: 0; transform: scale(0); }
          to   { opacity: 0.65; transform: scale(1); }
        }

        /* ═══════════════════════════════════════════════════
           5 — GLOBE WIREFRAME
           ═══════════════════════════════════════════════════ */
        .globe-container {
          position: relative;
          width: min(170px, 65%);
          aspect-ratio: 1;
        }

        .globe-circle {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid var(--a);
          transform: translate(-50%, -50%);
        }
        .gc-1 { width: 100%; height: 100%; opacity: 0.2; animation: globeRingPulse 4s ease-in-out infinite; }
        .gc-2 { width: 66%;  height: 66%;  opacity: 0.17; animation: globeRingPulse 4s ease-in-out infinite 0.7s; }
        .gc-3 { width: 32%;  height: 32%;  opacity: 0.22; animation: globeRingPulse 4s ease-in-out infinite 1.4s; }

        /* Meridians — ellipses for 3D feel */
        .globe-meridian {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid var(--a);
          opacity: 0.18;
          transform: translate(-50%, -50%);
        }
        .gm-h { width: 100%; height: 40%; }
        .gm-v { width: 40%;  height: 100%; opacity: 0.14; }

        .globe-center-dot {
          position: absolute;
          top: 50%; left: 50%;
          width: 7px; height: 7px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 8px var(--a), 0 0 18px var(--a);
          opacity: 0.75;
          animation: globeCorePulse 3s ease-in-out infinite;
        }

        .globe-surface-dot {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--a);
          box-shadow: 0 0 4px var(--a);
          opacity: 0.45;
        }
        .gsd-1 { top: 20%; left: 56%; animation: globeNodePulse 3s ease-in-out infinite; }
        .gsd-2 { top: 42%; left: 28%; animation: globeNodePulse 3s ease-in-out infinite 1s; }
        .gsd-3 { top: 54%; left: 70%; animation: globeNodePulse 3s ease-in-out infinite 2s; }

        .globe-ripple {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          border: 1px solid var(--a);
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.3);
          width: 60px; height: 60px;
        }
        .grp-1 { animation: globeRipple 4s ease-out infinite; }
        .grp-2 { animation: globeRipple 4s ease-out infinite 2s; }

        @keyframes globeRingPulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.22; transform: translate(-50%, -50%) scale(1.04); }
        }
        @keyframes globeCorePulse {
          0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.3); }
        }
        @keyframes globeNodePulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        @keyframes globeRipple {
          0%   { opacity: 0.35; transform: translate(-50%, -50%) scale(0.3); }
          100% { opacity: 0;    transform: translate(-50%, -50%) scale(1.8); }
        }

        /* ═══════════════════════════════════════════════════
           REDUCED MOTION
           ═══════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .neural-line, .neural-node-glow, .neural-node-dot,
          .radar-ring, .radar-sweep, .radar-center-dot, .radar-blip,
          .hex-glow-bg, .hex-outer-ring, .hex-mid-ring, .hex-inner-ring, .hex-core-dot,
          .flow-track-line::after, .flow-node, .flow-traveler, .flow-pulse-ring,
          .chart-bar, .chart-trend-line, .chart-data-dot,
          .globe-circle, .globe-meridian, .globe-center-dot, .globe-surface-dot, .globe-ripple {
            animation: none !important;
          }
          .chart-bar { transform: scaleY(1) !important; }
          .chart-trend-line { transform: scaleX(1) rotate(-7deg) !important; }
          .chart-data-dot { opacity: 0.5 !important; }
        }
      `}</style>
    </section>
  )
}
