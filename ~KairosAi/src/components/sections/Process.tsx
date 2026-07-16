'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Command, Rocket, Cpu } from 'lucide-react'

const STEPS = [
  { 
    num: '01', 
    title: 'Define', 
    desc: 'Specify your objectives and constraints. Kairos understands context, goals, and boundaries to operate within your parameters.',
    icon: Command,
    color: '#C4A882'
  },
  { 
    num: '02', 
    title: 'Deploy', 
    desc: 'Launch your autonomous agent with one click. It immediately begins analyzing your data landscape and formulating strategies.',
    icon: Rocket,
    color: '#8B7EC8'
  },
  { 
    num: '03', 
    title: 'Execute', 
    desc: 'The agent operates autonomously — making decisions, taking actions, and adapting in real-time while keeping you informed.',
    icon: Cpu,
    color: '#6BB8E0'
  },
]

export default function Process() {
  const sectionRef = useScrollAnimation()

  return (
    <section id="process" ref={sectionRef} className="section-reveal relative py-24 sm:py-32 px-6 overflow-hidden section-bg">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B7EC8]/[0.015] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="type-label mb-4"
          >
            PROCESS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="type-headline text-3xl sm:text-4xl lg:text-5xl text-[#0F0F12]"
          >
            From <span className="gradient-text">definition</span> to autonomy
          </motion.h2>
        </div>

        {/* Process steps — 3 columns with connecting lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line between steps (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-[#C4A882]/20 via-[#8B7EC8]/20 to-[#6BB8E0]/20 -translate-y-1/2 pointer-events-none" />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center relative" style={{ backgroundColor: `${step.color}12` }}>
                    <Icon size={20} style={{ color: step.color }} />
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-xl animate-ping opacity-[0.04]" style={{ backgroundColor: step.color }} />
                  </div>
                  <span className="type-display text-2xl" style={{ color: step.color }}>
                    {step.num}
                  </span>
                </div>

                <h3 className="type-headline text-xl sm:text-2xl text-[#0F0F12] mb-3">
                  {step.title}
                </h3>

                <p className="type-body text-sm leading-relaxed text-[#3A3A4A]">
                  {step.desc}
                </p>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
