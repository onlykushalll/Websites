'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useAnimatedCounter } from '@/hooks/usePremiumEffects'
import { TrendingUp, Activity, BarChart3, Zap } from 'lucide-react'

/** Sparkline mini-chart — Vercel dashboard style */
function Sparkline({
  data,
  color = '#8B7EC8',
  width = 80,
  height = 28,
}: {
  data: number[]
  color?: string
  width?: number
  height?: number
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height * 0.8 - height * 0.1
      return `${x},${y}`
    })
    .join(' ')

  const gradId = `grad-${color.replace('#', '')}`
  // Build the area path (filled region under the line)
  const firstX = 0
  const lastX = width
  const pointsArray = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height * 0.8 - height * 0.1
    return { x, y }
  })
  const linePath = pointsArray.map((p) => `L${p.x},${p.y}`).join(' ')
  const areaPath = `M${firstX},${height} L${firstX},${pointsArray[0].y} ${linePath} L${lastX},${height} Z`

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Metric display with animated counter, sparkline, and trend indicator */
function MetricCard({
  label,
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  color,
  trend,
  trendLabel,
  sparkData,
  icon: Icon,
  delay = 0,
}: {
  label: string
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  color: string
  trend?: string
  trendLabel?: string
  sparkData: number[]
  icon: React.ElementType
  delay?: number
}) {
  const { count, ref } = useAnimatedCounter(value, 2200, decimals)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative rounded-2xl p-[1px] group"
      style={{
        background: 'linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02), rgba(0,0,0,0.04))',
      }}
    >
      <div
        className="relative rounded-[15px] p-6 sm:p-7 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        }}
      >
        {/* Top row: label + icon */}
        <div className="flex items-center justify-between mb-4">
          <span className="type-label text-[9px]">{label}</span>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}10` }}
          >
            <Icon size={15} style={{ color }} />
          </div>
        </div>

        {/* Big number with gradient */}
        <div className="flex items-baseline gap-1.5 mb-3">
          {prefix && (
            <span className="type-body text-sm text-[#8B8B9A]">{prefix}</span>
          )}
          <span
            ref={ref}
            className="font-bold text-3xl sm:text-4xl tracking-tight"
            style={{
              fontFamily: 'var(--font-syne), Syne, sans-serif',
              fontVariantNumeric: 'tabular-nums',
              background: `linear-gradient(135deg, ${color}, ${color}CC)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {count}
          </span>
          {suffix && (
            <span className="type-body text-sm text-[#8B8B9A]">{suffix}</span>
          )}
        </div>

        {/* Bottom row: sparkline + trend */}
        <div className="flex items-center justify-between">
          <Sparkline data={sparkData} color={color} width={72} height={24} />
          {trend && (
            <div className="flex items-center gap-1.5">
              <TrendingUp size={11} className="text-green-500" />
              <span className="type-mono text-[10px] text-green-600 font-medium">
                {trend}
              </span>
              {trendLabel && (
                <span className="type-mono text-[9px] text-[#8B8B9A]">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const METRICS = [
  {
    label: 'TASKS PROCESSED',
    value: 847,
    suffix: 'K',
    color: '#8B7EC8',
    trend: '+34%',
    trendLabel: 'this month',
    sparkData: [20, 35, 28, 45, 52, 48, 65, 72, 68, 80, 85, 92],
    icon: Activity,
  },
  {
    label: 'UPTIME',
    value: 99.9,
    suffix: '%',
    decimals: 1,
    color: '#C4A882',
    trend: '+0.2%',
    trendLabel: 'vs prev',
    sparkData: [99, 99.5, 99.3, 99.7, 99.8, 99.6, 99.9, 99.9, 99.8, 99.9, 100, 99.9],
    icon: Zap,
  },
  {
    label: 'DECISIONS / HR',
    value: 12400,
    prefix: '',
    color: '#6BB8E0',
    trend: '+18%',
    trendLabel: 'this week',
    sparkData: [100, 120, 115, 140, 155, 148, 170, 185, 178, 195, 210, 225],
    icon: BarChart3,
  },
  {
    label: 'COST REDUCTION',
    value: 45,
    suffix: '%',
    color: '#6366F1',
    trend: '+12%',
    trendLabel: 'this quarter',
    sparkData: [15, 22, 28, 32, 35, 38, 40, 42, 43, 44, 44.5, 45],
    icon: TrendingUp,
  },
]

export default function Showcase() {
  const sectionRef = useScrollAnimation()

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="section-reveal relative py-24 sm:py-32 px-6 overflow-hidden section-bg-solid"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="type-label mb-4"
          >
            PERFORMANCE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="type-headline text-3xl sm:text-4xl lg:text-5xl text-[#0F0F12]"
          >
            Intelligence <span className="gradient-text">at work</span>
          </motion.h2>
        </div>

        {/* Premium metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.label} {...metric} delay={i * 0.1} />
          ))}
        </div>

        {/* Secondary row: Mini dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 relative rounded-2xl p-[1px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(139,126,200,0.15), rgba(0,0,0,0.02), rgba(107,184,224,0.15))',
          }}
        >
          <div
            className="rounded-[15px] p-1 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Browser chrome */}
            <div className="bg-[#F5F4F2] rounded-t-xl px-4 py-2.5 flex items-center gap-2 border-b border-black/[0.04]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white/80 rounded-md px-3 py-0.5 border border-black/[0.04] flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full border border-[#8B8B9A]/40 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#8B8B9A]/40" />
                  </div>
                  <span className="type-mono text-[9px] text-[#8B8B9A]">
                    kairos-dashboard.app
                  </span>
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Dashboard content */}
            <div className="bg-white rounded-b-xl p-4 sm:p-5">
              {/* Mini bar chart visualization */}
              <div className="flex items-end gap-2 h-24">
                {[40, 55, 35, 70, 85, 60, 75, 90, 65, 95, 80, 100].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        background: `linear-gradient(to top, #8B7EC8, #A78BFA)`,
                        opacity: 0.15 + (h / 100) * 0.85,
                      }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5 + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )
                )}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="type-mono text-[9px] text-[#8B8B9A]">
                  Jan
                </span>
                <span className="type-mono text-[9px] text-[#8B8B9A]">
                  Dec
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
