'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Brain, Zap, Shield, Workflow, BarChart3, Globe } from 'lucide-react'

const FEATURES = [
  { 
    icon: Brain, 
    title: 'Autonomous Thinking', 
    desc: 'Self-directed reasoning that processes complex scenarios and makes intelligent decisions without human intervention.',
    tag: 'COGNITION',
    span: 'col-span-1 md:col-span-2',
    accent: '#8B7EC8'
  },
  { 
    icon: Zap, 
    title: 'Real-Time Adaptation', 
    desc: 'Continuously learns from data streams, adapting strategies in milliseconds.',
    tag: 'VELOCITY',
    span: 'col-span-1',
    accent: '#C4A882'
  },
  { 
    icon: Shield, 
    title: 'Secure Execution', 
    desc: 'Enterprise-grade security with built-in guardrails and compliance controls.',
    tag: 'SECURITY',
    span: 'col-span-1',
    accent: '#6BB8E0'
  },
  { 
    icon: Workflow, 
    title: 'Seamless Integration', 
    desc: 'Connects with existing tools through native APIs — zero infrastructure changes required.',
    tag: 'INTEGRATION',
    span: 'col-span-1',
    accent: '#6366F1'
  },
  { 
    icon: BarChart3, 
    title: 'Predictive Analytics', 
    desc: 'Anticipates trends and outcomes using advanced pattern recognition for proactive strategies.',
    tag: 'INTELLIGENCE',
    span: 'col-span-1 md:col-span-2',
    accent: '#8B7EC8'
  },
  { 
    icon: Globe, 
    title: 'Scalable Deployment', 
    desc: 'From single-task agents to enterprise fleets — scale autonomously with consistent performance.',
    tag: 'SCALE',
    span: 'col-span-1',
    accent: '#C4A882'
  },
]

export default function Features() {
  const sectionRef = useScrollAnimation()

  return (
    <section id="features" ref={sectionRef} className="section-reveal relative py-24 sm:py-32 px-6 overflow-hidden section-bg-solid">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="type-label mb-4"
          >
            CAPABILITIES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="type-headline text-3xl sm:text-4xl lg:text-5xl text-[#0F0F12]"
          >
            Built for <span className="gradient-text">autonomous</span> action
          </motion.h2>
        </div>

        {/* Bento grid — modern layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`glass-card rounded-2xl p-6 sm:p-8 group relative overflow-hidden ${feature.span}`}
              >
                {/* Icon with gradient background */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-500" style={{ backgroundColor: `${feature.accent}10` }}>
                  <Icon size={18} style={{ color: feature.accent }} />
                </div>

                <h3 className="type-headline text-lg sm:text-xl text-[#0F0F12] mb-3">
                  {feature.title}
                </h3>

                <p className="type-body text-sm leading-relaxed text-[#3A3A4A]">
                  {feature.desc}
                </p>

                {/* Tag — appears on hover */}
                <div className="type-label absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[8px]">
                  {feature.tag}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 rounded-full" style={{ backgroundColor: feature.accent }} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
