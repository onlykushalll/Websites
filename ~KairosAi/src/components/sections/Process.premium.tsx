'use client'

import { Command, Rocket, Cpu } from 'lucide-react'

interface StepData {
  num: string
  title: string
  desc: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  color: string
  details: string[]
}

const STEPS: StepData[] = [
  {
    num: '01',
    title: 'Define',
    desc: 'Specify your objectives and constraints. Kairos understands context, goals, and boundaries to operate within your parameters.',
    icon: Command,
    color: '#7C5CFC',
    details: [
      'Natural language objective specification',
      'Constraint boundary mapping',
      'Context-aware parameter tuning',
    ],
  },
  {
    num: '02',
    title: 'Deploy',
    desc: 'Launch your autonomous agent with one click. It immediately begins analyzing your data landscape and formulating strategies.',
    icon: Rocket,
    color: '#5CB8FC',
    details: [
      'One-click agent deployment',
      'Automatic data landscape analysis',
      'Strategy formulation engine',
    ],
  },
  {
    num: '03',
    title: 'Execute',
    desc: 'The agent operates autonomously — making decisions, taking actions, and adapting in real-time while keeping you informed.',
    icon: Cpu,
    color: '#FC5C8C',
    details: [
      'Autonomous decision-making',
      'Real-time adaptation loops',
      'Transparent audit trail',
    ],
  },
]

/* ─── Step card background layers ─── */
function StepCardBg({ color }: { color: string }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${color}06 0%, ${color}12 40%, ${color}06 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.97) 100%)',
        }}
      />
      <div className="absolute inset-0 noise-img pointer-events-none" />
    </>
  )
}

/* ─── Bottom accent line ─── */
function BottomAccent({ color }: { color: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20 overflow-hidden">
      <div
        className="h-full w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.4,
        }}
      />
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="relative py-32 sm:py-44 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="type-label mb-4 flex items-center gap-3">
            <span className="inline-block w-6 h-[1px] bg-[#7C5CFC]/40 rounded-full" />
            PROCESS
          </div>
          <h2 className="type-headline text-4xl sm:text-5xl lg:text-6xl leading-[1.1]">
            From <span className="gradient-text">definition</span> to autonomy
          </h2>
        </div>

        {/* Progress Line */}
        <div className="relative h-[2px] bg-[rgba(0,0,0,0.04)] rounded-full mb-16 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full w-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #7C5CFC, #5CB8FC, #FC5C8C)',
            }}
          />
        </div>

        {/* Vertical Stack — all screen sizes */}
        <div className="flex flex-col gap-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="relative overflow-hidden rounded-2xl"
                data-cursor-hover
              >
                <StepCardBg color={step.color} />

                {/* Large step number watermark */}
                <div
                  className="absolute top-6 right-8 type-display select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(80px, 14vw, 180px)',
                    color: step.color,
                    opacity: 0.15,
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                  {/* Top row: icon + step label */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-[rgba(0,0,0,0.06)]"
                      style={{ backgroundColor: `${step.color}10` }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <div
                      className="type-label text-[10px] tracking-[0.15em] font-semibold"
                      style={{ color: step.color }}
                    >
                      STEP {step.num}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="type-headline text-3xl sm:text-4xl text-[#0F0F12] mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="type-body text-sm sm:text-base leading-relaxed mb-8 max-w-xl text-[#71717A]">
                    {step.desc}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 pt-6 border-t border-[rgba(0,0,0,0.06)]">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: step.color }}
                        />
                        <span className="type-body text-xs sm:text-sm text-[#71717A]">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <BottomAccent color={step.color} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
