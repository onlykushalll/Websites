'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const USE_CASES = [
  { title: 'Financial Operations', desc: 'Autonomous trading, risk assessment, and compliance monitoring with millisecond decision-making.', metric: '10x', label: 'FASTER', color: '#C4A882' },
  { title: 'Supply Chain', desc: 'Predictive logistics, demand forecasting, and automated vendor negotiations across global networks.', metric: '45%', label: 'COST REDUCTION', color: '#8B7EC8' },
  { title: 'Customer Experience', desc: 'Personalized engagement, proactive support, and intelligent routing that anticipates needs.', metric: '98%', label: 'SATISFACTION', color: '#6BB8E0' },
  { title: 'Data Engineering', desc: 'Automated pipeline management, anomaly detection, and self-healing data infrastructure.', metric: '99.9%', label: 'UPTIME', color: '#6366F1' },
]

export default function UseCases() {
  const sectionRef = useScrollAnimation()

  return (
    <section id="use-cases" ref={sectionRef} className="section-reveal relative py-24 sm:py-32 px-6 overflow-hidden section-bg">
      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="type-label mb-4"
          >
            USE CASES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="type-headline text-3xl sm:text-4xl lg:text-5xl text-[#0F0F12]"
          >
            Powering <span className="gradient-text">every industry</span>
          </motion.h2>
        </div>

        {/* Use cases — 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
            >
              {/* Metric */}
              <div className="mb-6">
                <span className="type-display text-4xl sm:text-5xl" style={{ color: uc.color }}>
                  {uc.metric}
                </span>
                <span className="type-label ml-3 text-[9px]">{uc.label}</span>
              </div>

              <h3 className="type-headline text-lg sm:text-xl text-[#0F0F12] mb-3">
                {uc.title}
              </h3>

              <p className="type-body text-sm leading-relaxed text-[#3A3A4A]">
                {uc.desc}
              </p>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${uc.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
