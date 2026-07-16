'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Landmark, Truck, Headphones, Database, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */
interface UseCaseData {
  title: string
  desc: string
  metric: string
  label: string
  color: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  visual: 'finance' | 'supply' | 'customer' | 'data'
}

const USE_CASES: UseCaseData[] = [
  {
    title: 'Financial Operations',
    desc: 'Autonomous trading, risk assessment, and compliance monitoring with millisecond decision-making.',
    metric: '10x',
    label: 'FASTER',
    color: '#7C5CFC',
    icon: Landmark,
    visual: 'finance',
  },
  {
    title: 'Supply Chain',
    desc: 'Predictive logistics, demand forecasting, and automated vendor negotiations across global networks.',
    metric: '45%',
    label: 'COST REDUCTION',
    color: '#5CB8FC',
    icon: Truck,
    visual: 'supply',
  },
  {
    title: 'Customer Experience',
    desc: 'Personalized engagement, proactive support, and intelligent routing that anticipates needs.',
    metric: '98%',
    label: 'SATISFACTION',
    color: '#FC5C8C',
    icon: Headphones,
    visual: 'customer',
  },
  {
    title: 'Data Engineering',
    desc: 'Automated pipeline management, anomaly detection, and self-healing data infrastructure.',
    metric: '99.9%',
    label: 'UPTIME',
    color: '#FCCC5C',
    icon: Database,
    visual: 'data',
  },
]

/* ═══════════════════════════════════════════════
   METRIC COUNTER — animated counting via gsap + ScrollTrigger
   ═══════════════════════════════════════════════ */
function MetricCounter({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const numericMatch = value.match(/^([\d.]+)(.*)$/)
        if (!numericMatch) return

        const targetNum = parseFloat(numericMatch[1])
        const suffix = numericMatch[2]
        const decimals = (numericMatch[1].split('.')[1] || '').length

        const obj = { val: 0 }
        gsap.to(obj, {
          val: targetNum,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (el) {
              el.textContent = obj.val.toFixed(decimals) + suffix
            }
          },
        })
      },
    })

    return () => {
      trigger.kill()
    }
  }, [value])

  return (
    <span
      ref={ref}
      className="type-display text-4xl sm:text-5xl lg:text-6xl"
      style={{
        background: `linear-gradient(135deg, ${color}, ${color}99)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      0
    </span>
  )
}

/* ═══════════════════════════════════════════════
   PASTEL VISUAL — Finance (bold bar chart + trend)
   ═══════════════════════════════════════════════ */
function FinanceVisual({ color }: { color: string }) {
  const bars = [
    { left: '6%',  h: 55, delay: 0 },
    { left: '15%', h: 90, delay: 0.08 },
    { left: '24%', h: 45, delay: 0.16 },
    { left: '33%', h: 110, delay: 0.24 },
    { left: '42%', h: 75, delay: 0.32 },
    { left: '51%', h: 125, delay: 0.40 },
    { left: '60%', h: 60, delay: 0.48 },
    { left: '69%', h: 95, delay: 0.56 },
    { left: '78%', h: 80, delay: 0.64 },
    { left: '87%', h: 115, delay: 0.72 },
  ]

  return (
    <div className="uc-visual-bg">
      {/* Pastel gradient wash */}
      <div className="uc-pastel-wash" style={{
        background: `radial-gradient(ellipse 120% 80% at 30% 20%, ${color}18, transparent 60%),
                     radial-gradient(ellipse 80% 60% at 80% 70%, ${color}10, transparent 50%)`
      }} />

      {/* Horizontal grid lines */}
      {[25, 45, 65].map((top) => (
        <div key={top} style={{
          position: 'absolute', top: `${top}%`, left: '5%', right: '5%',
          height: '1px', background: `${color}15`,
        }} />
      ))}

      {/* Bold bars */}
      {bars.map((bar, i) => (
        <div key={i} className={`uc-fin-bar uc-fin-bar-${i}`} style={{ left: bar.left }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '4px',
            background: `linear-gradient(180deg, ${color}CC, ${color}70)`,
            boxShadow: `0 4px 16px ${color}25, inset 0 1px 0 ${color}40`,
          }} />
        </div>
      ))}

      {/* SVG trend line + area fill */}
      <svg className="uc-svg-full" viewBox="0 0 300 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fin-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill under trend */}
        <path
          d="M 15 150 C 50 130, 70 100, 100 110 S 150 60, 180 80 S 230 35, 285 50 L 285 200 L 15 200 Z"
          fill="url(#fin-area-grad)"
        />
        {/* Trend line */}
        <path
          className="uc-fin-trend"
          d="M 15 150 C 50 130, 70 100, 100 110 S 150 60, 180 80 S 230 35, 285 50"
          fill="none" stroke={color} strokeWidth="3" strokeOpacity="0.7"
          strokeLinecap="round"
        />
        {/* Accent dots */}
        <circle className="uc-fin-dot d1" cx="100" cy="110" r="5" fill={color} fillOpacity="0.8" />
        <circle className="uc-fin-dot d2" cx="180" cy="80" r="5" fill={color} fillOpacity="0.8" />
        <circle className="uc-fin-dot d3" cx="285" cy="50" r="5" fill={color} fillOpacity="0.8" />
      </svg>

      {/* Floating accent shapes */}
      <div className="uc-float-shape fs-1" style={{
        top: '12%', right: '8%', width: '40px', height: '40px', borderRadius: '10px',
        background: `${color}15`, border: `1.5px solid ${color}25`,
        transform: 'rotate(15deg)',
      }} />
      <div className="uc-float-shape fs-2" style={{
        top: '8%', left: '10%', width: '24px', height: '24px', borderRadius: '50%',
        background: `${color}20`, border: `1px solid ${color}30`,
      }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PASTEL VISUAL — Supply Chain (bold network)
   ═══════════════════════════════════════════════ */
function SupplyVisual({ color }: { color: string }) {
  const nodes = [
    { x: 15, y: 22, size: 18 },
    { x: 40, y: 12, size: 12 },
    { x: 72, y: 25, size: 20 },
    { x: 25, y: 50, size: 14 },
    { x: 55, y: 48, size: 16 },
    { x: 85, y: 55, size: 14 },
    { x: 35, y: 78, size: 17 },
    { x: 70, y: 75, size: 13 },
  ]
  const connections = [
    [0, 1], [1, 2], [0, 3], [3, 4], [4, 2], [4, 5], [3, 6], [6, 7], [7, 5],
  ]

  return (
    <div className="uc-visual-bg">
      {/* Pastel gradient wash */}
      <div className="uc-pastel-wash" style={{
        background: `radial-gradient(ellipse 100% 70% at 60% 30%, ${color}18, transparent 60%),
                     radial-gradient(ellipse 80% 60% at 25% 75%, ${color}10, transparent 50%)`
      }} />

      <svg className="uc-svg-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connection lines — bold */}
        {connections.map(([from, to], i) => (
          <line key={`line-${i}`}
            x1={nodes[from].x} y1={nodes[from].y}
            x2={nodes[to].x} y2={nodes[to].y}
            stroke={color} strokeWidth="0.8" strokeOpacity="0.35"
            strokeLinecap="round"
          />
        ))}
        {/* Animated traveling packets */}
        {connections.slice(0, 5).map(([from, to], i) => (
          <circle key={`packet-${i}`}
            className={`uc-sup-packet uc-sup-packet-${i}`}
            r="2.2" fill={color} fillOpacity="0.85">
            <animateMotion
              dur={`${3 + i * 0.7}s`}
              repeatCount="indefinite"
              path={`M ${nodes[from].x} ${nodes[from].y} L ${nodes[to].x} ${nodes[to].y}`}
            />
          </circle>
        ))}
      </svg>

      {/* Node dots — bold pastel circles */}
      {nodes.map((node, i) => (
        <div key={`node-${i}`}>
          {/* Pulse ring */}
          <div className={`uc-sup-pulse uc-sup-pulse-${i % 3}`} style={{
            position: 'absolute', left: `${node.x}%`, top: `${node.y}%`,
            width: `${node.size * 4}px`, height: `${node.size * 4}px`,
            transform: 'translate(-50%, -50%)', borderRadius: '50%',
            border: `1.5px solid ${color}30`,
          }} />
          {/* Glow behind node */}
          <div style={{
            position: 'absolute', left: `${node.x}%`, top: `${node.y}%`,
            width: `${node.size * 3}px`, height: `${node.size * 3}px`,
            transform: 'translate(-50%, -50%)', borderRadius: '50%',
            background: `radial-gradient(circle, ${color}30, ${color}08)`,
            filter: 'blur(4px)',
          }} />
          {/* Solid node */}
          <div className={`uc-sup-node uc-sup-node-${i % 4}`} style={{
            position: 'absolute', left: `${node.x}%`, top: `${node.y}%`,
            width: `${node.size}px`, height: `${node.size}px`,
            transform: 'translate(-50%, -50%)', borderRadius: '50%',
            background: `radial-gradient(circle, ${color}90, ${color}50)`,
            border: `2px solid ${color}60`,
            boxShadow: `0 2px 10px ${color}30`,
          }} />
        </div>
      ))}

      {/* Floating accent shapes */}
      <div className="uc-float-shape fs-1" style={{
        top: '6%', right: '12%', width: '32px', height: '32px', borderRadius: '8px',
        background: `${color}12`, border: `1.5px solid ${color}20`,
        transform: 'rotate(-10deg)',
      }} />
      <div className="uc-float-shape fs-2" style={{
        bottom: '10%', left: '8%', width: '20px', height: '20px', borderRadius: '50%',
        background: `${color}18`, border: `1px solid ${color}28`,
      }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PASTEL VISUAL — Customer Experience (pulse rings + wave)
   ═══════════════════════════════════════════════ */
function CustomerVisual({ color }: { color: string }) {
  return (
    <div className="uc-visual-bg">
      {/* Pastel gradient wash */}
      <div className="uc-pastel-wash" style={{
        background: `radial-gradient(ellipse 100% 80% at 50% 35%, ${color}20, transparent 60%),
                     radial-gradient(ellipse 60% 40% at 75% 80%, ${color}10, transparent 50%)`
      }} />

      {/* Concentric pulse rings — bold pastel fills */}
      {[0, 1, 2, 3, 4].map((ring) => (
        <div key={ring}
          className={`uc-cust-ring uc-cust-ring-${ring}`}
          style={{
            position: 'absolute', left: '50%', top: '38%',
            width: `${70 + ring * 55}px`, height: `${70 + ring * 55}px`,
            transform: 'translate(-50%, -50%)', borderRadius: '50%',
            border: `1.5px solid ${color}${Math.max(45 - ring * 8, 15).toString(16).padStart(2, '0')}`,
            background: `radial-gradient(circle, ${color}${Math.max(12 - ring * 2, 4).toString(16).padStart(2, '0')}, transparent)`,
          }}
        />
      ))}

      {/* Heartbeat wave SVG — bold */}
      <svg className="uc-svg-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cust-wave-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          className="uc-cust-wave"
          d="M 0 120 L 60 120 L 80 120 L 100 55 L 120 165 L 140 85 L 155 120 L 200 120 L 220 120 L 240 45 L 260 175 L 280 75 L 295 120 L 340 120 L 400 120"
          fill="none" stroke="url(#cust-wave-grad)" strokeWidth="3" strokeLinecap="round"
        />
        <path
          className="uc-cust-wave uc-cust-wave-2"
          d="M 0 130 L 40 130 L 70 130 L 90 70 L 110 160 L 130 95 L 145 130 L 190 130 L 210 130 L 230 60 L 250 170 L 270 85 L 285 130 L 330 130 L 400 130"
          fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.3"
        />
      </svg>

      {/* Center glowing core */}
      <div className="uc-cust-core" style={{
        position: 'absolute', left: '50%', top: '38%',
        width: '22px', height: '22px',
        transform: 'translate(-50%, -50%)', borderRadius: '50%',
        background: `radial-gradient(circle, ${color}80, ${color}30)`,
        border: `2px solid ${color}60`,
        boxShadow: `0 0 20px ${color}35, 0 0 40px ${color}15`,
      }} />

      {/* Floating accent shapes */}
      <div className="uc-float-shape fs-1" style={{
        top: '10%', left: '12%', width: '28px', height: '28px', borderRadius: '7px',
        background: `${color}12`, border: `1.5px solid ${color}22`,
        transform: 'rotate(25deg)',
      }} />
      <div className="uc-float-shape fs-2" style={{
        bottom: '15%', right: '10%', width: '20px', height: '20px', borderRadius: '50%',
        background: `${color}18`, border: `1px solid ${color}28`,
      }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PASTEL VISUAL — Data Engineering (data pipeline)
   ═══════════════════════════════════════════════ */
function DataVisual({ color }: { color: string }) {
  return (
    <div className="uc-visual-bg">
      {/* Pastel gradient wash */}
      <div className="uc-pastel-wash" style={{
        background: `radial-gradient(ellipse 100% 70% at 50% 40%, ${color}18, transparent 60%),
                     radial-gradient(ellipse 70% 50% at 30% 80%, ${color}10, transparent 50%)`
      }} />

      {/* Vertical data stream lines — bold */}
      {[12, 26, 42, 58, 74, 88].map((left, i) => (
        <div key={`stream-${i}`}>
          <div className={`uc-data-stream uc-data-stream-${i % 3}`} style={{
            position: 'absolute', left: `${left}%`, top: 0, width: '2px', height: '100%',
            background: `linear-gradient(180deg, transparent, ${color}40, ${color}60, ${color}40, transparent)`,
            borderRadius: '1px',
          }} />
          {/* Flowing data particle — bigger */}
          <div className={`uc-data-particle uc-data-particle-${i % 4}`} style={{
            position: 'absolute', left: `${left}%`,
            width: '6px', height: '6px', borderRadius: '50%',
            background: `${color}AA`,
            transform: 'translateX(-50%)',
            boxShadow: `0 0 12px ${color}50`,
          }} />
        </div>
      ))}

      {/* Central database cylinder — bold pastel */}
      <div style={{
        position: 'absolute', left: '50%', top: '22%',
        transform: 'translate(-50%, -50%) perspective(200px) rotateX(25deg)',
        width: '90px', height: '80px', borderRadius: '50%',
        border: `2px solid ${color}50`,
        background: `linear-gradient(180deg, ${color}25, ${color}10)`,
        boxShadow: `0 4px 20px ${color}15`,
      }} />
      {/* Cylinder body */}
      <div style={{
        position: 'absolute', left: '50%', top: '22%',
        transform: 'translate(-50%, 0)',
        width: '90px', height: '90px', marginTop: '10px',
        borderLeft: `2px solid ${color}50`,
        borderRight: `2px solid ${color}50`,
        background: `linear-gradient(180deg, ${color}15, ${color}06)`,
      }} />
      {/* Cylinder horizontal dividers */}
      {[0.33, 0.66].map((pct, i) => (
        <div key={`cyl-${i}`} style={{
          position: 'absolute', left: '50%',
          top: `calc(22% + 10px + ${pct * 90}px)`,
          transform: 'translate(-50%, -50%) perspective(200px) rotateX(25deg)',
          width: '90px', height: '16px', borderRadius: '50%',
          border: `1.5px solid ${color}40`,
          background: `${color}12`,
        }} />
      ))}
      {/* Front cap */}
      <div className="uc-data-cap" style={{
        position: 'absolute', left: '50%', top: `calc(22% + 100px)`,
        transform: 'translate(-50%, -50%) perspective(200px) rotateX(25deg)',
        width: '90px', height: '80px', borderRadius: '50%',
        border: `2px solid ${color}55`,
        background: `linear-gradient(180deg, ${color}22, ${color}0A)`,
        boxShadow: `0 4px 16px ${color}15`,
      }} />

      {/* Bold floating data blocks */}
      {[
        { x: 18, y: 60, w: 32, h: 20, delay: 0 },
        { x: 58, y: 55, w: 36, h: 18, delay: 1 },
        { x: 32, y: 76, w: 26, h: 16, delay: 2 },
      ].map((block, i) => (
        <div key={`block-${i}`}
          className={`uc-data-block uc-data-block-${i}`}
          style={{
            position: 'absolute', left: `${block.x}%`, top: `${block.y}%`,
            width: `${block.w}px`, height: `${block.h}px`, borderRadius: '6px',
            background: `${color}22`,
            border: `1.5px solid ${color}35`,
            boxShadow: `0 2px 8px ${color}10`,
            animationDelay: `${block.delay}s`,
          }}
        />
      ))}

      {/* Floating accent shapes */}
      <div className="uc-float-shape fs-1" style={{
        top: '8%', right: '15%', width: '30px', height: '30px', borderRadius: '8px',
        background: `${color}12`, border: `1.5px solid ${color}22`,
        transform: 'rotate(20deg)',
      }} />
      <div className="uc-float-shape fs-2" style={{
        top: '14%', left: '6%', width: '18px', height: '18px', borderRadius: '50%',
        background: `${color}18`, border: `1px solid ${color}28`,
      }} />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   VISUAL ROUTER
   ═══════════════════════════════════════════════ */
function CardVisual({ type, color }: { type: UseCaseData['visual']; color: string }) {
  switch (type) {
    case 'finance':
      return <FinanceVisual color={color} />
    case 'supply':
      return <SupplyVisual color={color} />
    case 'customer':
      return <CustomerVisual color={color} />
    case 'data':
      return <DataVisual color={color} />
  }
}

/* ═══════════════════════════════════════════════
   USE CASE CARD
   ═══════════════════════════════════════════════ */
function UseCaseCard({ uc }: { uc: UseCaseData }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const Icon = uc.icon

  return (
    <div
      className="use-case-card"
      ref={cardRef}
      data-cursor-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        minHeight: '340px',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'border-color 0.5s ease',
        borderColor: isHovered ? `${uc.color}40` : 'rgba(0,0,0,0.05)',
        background: '#FFFFFF',
      }}
    >
      {/* Pastel visual background */}
      <CardVisual type={uc.visual} color={uc.color} />

      {/* Light gradient overlay — much less aggressive so visuals show */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isHovered
          ? 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.88) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.85) 100%)',
        transition: 'background 0.6s ease',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Hover glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(500px circle at 50% 80%, ${uc.color}0A, transparent 60%)`,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '28px', zIndex: 2,
      }}>
        {/* ArrowUpRight icon at top-right */}
        <div style={{
          position: 'absolute', top: '20px', right: '20px',
          width: '36px', height: '36px', borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: `${uc.color}15`,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <ArrowUpRight size={16} style={{ color: uc.color }} />
        </div>

        {/* Icon box */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: `${uc.color}15`,
          border: `1px solid ${uc.color}20`,
          marginBottom: '16px',
        }}>
          <Icon size={20} style={{ color: uc.color }} />
        </div>

        {/* Metric */}
        <div style={{ marginBottom: '4px' }}>
          <MetricCounter value={uc.metric} color={uc.color} />
        </div>

        {/* Label */}
        <div className="type-label" style={{ color: uc.color, marginBottom: '16px' }}>
          {uc.label}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display), "Outfit", sans-serif',
          fontWeight: 600, fontSize: '20px',
          letterSpacing: '-0.025em', lineHeight: 1.2,
          color: '#0F0F12', marginBottom: '8px',
        }}>
          {uc.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body), "Plus Jakarta Sans", system-ui, sans-serif',
          fontSize: '14px', lineHeight: 1.7, color: '#71717A',
        }}>
          {uc.desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', overflow: 'hidden', zIndex: 3,
      }}>
        <div style={{
          height: '100%',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          background: `linear-gradient(90deg, transparent, ${uc.color}, transparent)`,
        }} />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.section-header')
      if (header) {
        gsap.fromTo(
          header,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: header, start: 'top 80%' } }
        )
      }

      const cards = sectionRef.current?.querySelectorAll('.use-case-card')
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: cards[0], start: 'top 80%' } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section id="use-cases" ref={sectionRef} className="relative py-32 sm:py-44 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="section-header mb-16">
            <div className="type-label mb-4 flex items-center gap-3">
              <span className="inline-block w-6 h-[1px] bg-[#7C5CFC]/40 rounded-full" />
              USE CASES
            </div>
            <h2 className="type-headline text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
              Powering <span className="gradient-text">every industry</span>
            </h2>
          </div>

          {/* Use cases grid — 2x2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {USE_CASES.map((uc) => (
              <UseCaseCard key={uc.title} uc={uc} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Styled-JSX: All animations ═══ */}
      <style jsx global>{`
        /* ─── Common visual background container ─── */
        .uc-visual-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        /* ─── Pastel wash layer ─── */
        .uc-pastel-wash {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* ─── SVG full-size helper ─── */
        .uc-svg-full {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* ─── Floating accent shapes ─── */
        .uc-float-shape {
          position: absolute;
          pointer-events: none;
        }
        .fs-1 { animation: floatShape1 8s ease-in-out infinite; }
        .fs-2 { animation: floatShape2 10s ease-in-out infinite; }

        @keyframes floatShape1 {
          0%, 100% { transform: rotate(15deg) translateY(0); opacity: 0.6; }
          50%      { transform: rotate(20deg) translateY(-8px); opacity: 0.9; }
        }
        @keyframes floatShape2 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50%      { transform: translateY(-6px) scale(1.1); opacity: 0.8; }
        }

        /* ═══════════════════════════════════════════
           FINANCE — Bold bars + trend line
           ═══════════════════════════════════════════ */
        .uc-fin-bar {
          position: absolute;
          bottom: 18%;
          width: 16px;
          transform-origin: bottom center;
          animation: uc-fin-grow 1s ease-out both;
        }
        .uc-fin-bar-0  { left: 6%;  height: 55px;  animation-delay: 0.0s; }
        .uc-fin-bar-1  { left: 15%; height: 90px;  animation-delay: 0.08s; }
        .uc-fin-bar-2  { left: 24%; height: 45px;  animation-delay: 0.16s; }
        .uc-fin-bar-3  { left: 33%; height: 110px; animation-delay: 0.24s; }
        .uc-fin-bar-4  { left: 42%; height: 75px;  animation-delay: 0.32s; }
        .uc-fin-bar-5  { left: 51%; height: 125px; animation-delay: 0.40s; }
        .uc-fin-bar-6  { left: 60%; height: 60px;  animation-delay: 0.48s; }
        .uc-fin-bar-7  { left: 69%; height: 95px;  animation-delay: 0.56s; }
        .uc-fin-bar-8  { left: 78%; height: 80px;  animation-delay: 0.64s; }
        .uc-fin-bar-9  { left: 87%; height: 115px; animation-delay: 0.72s; }

        @keyframes uc-fin-grow {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }

        /* Trend line draw animation */
        .uc-fin-trend {
          animation: uc-fin-draw 2s ease-out 0.5s both;
        }
        @keyframes uc-fin-draw {
          from { stroke-dashoffset: 500; stroke-dasharray: 500; }
          to   { stroke-dashoffset: 0; stroke-dasharray: 500; }
        }

        /* Trend dots fade in */
        .uc-fin-dot {
          opacity: 0;
          animation: uc-fin-dot-in 0.5s ease-out both;
        }
        .uc-fin-dot.d1 { animation-delay: 1.2s; }
        .uc-fin-dot.d2 { animation-delay: 1.5s; }
        .uc-fin-dot.d3 { animation-delay: 1.8s; }
        @keyframes uc-fin-dot-in {
          from { opacity: 0; r: 0; }
          to   { opacity: 1; }
        }

        /* ═══════════════════════════════════════════
           SUPPLY CHAIN — Node pulses + traveling packets
           ═══════════════════════════════════════════ */
        .uc-sup-pulse {
          animation: uc-sup-ring 3s ease-in-out infinite;
        }
        .uc-sup-pulse-0 { animation-delay: 0s; }
        .uc-sup-pulse-1 { animation-delay: 1s; }
        .uc-sup-pulse-2 { animation-delay: 2s; }

        @keyframes uc-sup-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50%      { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }

        .uc-sup-node {
          animation: uc-sup-breathe 4s ease-in-out infinite;
        }
        .uc-sup-node-0 { animation-delay: 0s; }
        .uc-sup-node-1 { animation-delay: 1s; }
        .uc-sup-node-2 { animation-delay: 2s; }
        .uc-sup-node-3 { animation-delay: 3s; }

        @keyframes uc-sup-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -50%) scale(1.15); }
        }

        /* ═══════════════════════════════════════════
           CUSTOMER — Pulse rings + heartbeat wave
           ═══════════════════════════════════════════ */
        .uc-cust-ring {
          animation: uc-cust-expand 4s ease-in-out infinite;
        }
        .uc-cust-ring-0 { animation-delay: 0s; }
        .uc-cust-ring-1 { animation-delay: 0.6s; }
        .uc-cust-ring-2 { animation-delay: 1.2s; }
        .uc-cust-ring-3 { animation-delay: 1.8s; }
        .uc-cust-ring-4 { animation-delay: 2.4s; }

        @keyframes uc-cust-expand {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50%      { transform: translate(-50%, -50%) scale(1.12); opacity: 0.25; }
        }

        /* Heartbeat wave draw */
        .uc-cust-wave {
          animation: uc-cust-draw 2.5s ease-out 0.3s both;
        }
        .uc-cust-wave-2 {
          animation-delay: 0.6s !important;
        }
        @keyframes uc-cust-draw {
          from { stroke-dashoffset: 600; stroke-dasharray: 600; }
          to   { stroke-dashoffset: 0; stroke-dasharray: 600; }
        }

        /* Core dot breathing */
        .uc-cust-core {
          animation: uc-cust-pulse 2s ease-in-out infinite;
        }
        @keyframes uc-cust-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%      { transform: translate(-50%, -50%) scale(1.3); }
        }

        /* ═══════════════════════════════════════════
           DATA ENGINEERING — Streams + floating blocks
           ═══════════════════════════════════════════ */
        .uc-data-stream {
          animation: uc-data-shimmer 3s ease-in-out infinite;
        }
        .uc-data-stream-0 { animation-delay: 0s; }
        .uc-data-stream-1 { animation-delay: 0.5s; }
        .uc-data-stream-2 { animation-delay: 1s; }

        @keyframes uc-data-shimmer {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }

        /* Data particles flowing downward */
        .uc-data-particle {
          animation: uc-data-fall 3s linear infinite;
        }
        .uc-data-particle-0 { animation-delay: 0s;   animation-duration: 2.5s; }
        .uc-data-particle-1 { animation-delay: 0.8s;  animation-duration: 3.0s; }
        .uc-data-particle-2 { animation-delay: 0.3s;  animation-duration: 2.8s; }
        .uc-data-particle-3 { animation-delay: 1.2s;  animation-duration: 3.2s; }
        .uc-data-particle-4 { animation-delay: 0.5s;  animation-duration: 2.6s; }
        .uc-data-particle-5 { animation-delay: 1.5s;  animation-duration: 3.1s; }

        @keyframes uc-data-fall {
          0%   { top: -10px;  opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 10px); opacity: 0; }
        }

        /* Data blocks floating */
        .uc-data-block {
          animation: uc-data-float 6s ease-in-out infinite;
        }
        .uc-data-block-0 { animation-delay: 0s; }
        .uc-data-block-1 { animation-delay: 2s; }
        .uc-data-block-2 { animation-delay: 4s; }

        @keyframes uc-data-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25%      { transform: translateY(-6px) rotate(1deg); }
          75%      { transform: translateY(4px) rotate(-1deg); }
        }

        /* Database front cap subtle pulse */
        .uc-data-cap {
          animation: uc-data-glow 4s ease-in-out infinite;
        }
        @keyframes uc-data-glow {
          0%, 100% { filter: brightness(1); }
          50%      { filter: brightness(1.05); }
        }

        /* ═══════════════════════════════════════════
           REDUCED MOTION
           ═══════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .uc-fin-bar, .uc-fin-trend, .uc-fin-dot,
          .uc-sup-pulse, .uc-sup-node,
          .uc-cust-ring, .uc-cust-wave, .uc-cust-core,
          .uc-data-stream, .uc-data-particle, .uc-data-block, .uc-data-cap,
          .uc-float-shape {
            animation: none !important;
          }
          .uc-fin-bar {
            transform: scaleY(1) !important;
            opacity: 1 !important;
          }
          .uc-fin-trend {
            stroke-dashoffset: 0 !important;
          }
          .uc-fin-dot {
            opacity: 1 !important;
          }
          .uc-cust-wave {
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
