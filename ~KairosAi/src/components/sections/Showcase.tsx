'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Terminal, Activity, TrendingUp, CheckCircle, Clock, Cpu } from 'lucide-react'

export default function Showcase() {
  const sectionRef = useScrollAnimation()

  return (
    <section id="showcase" ref={sectionRef} className="section-reveal relative py-24 sm:py-32 px-6 overflow-hidden section-bg-solid">
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 items-center">
          {/* Left — content */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="type-label mb-4"
            >
              PRODUCT
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="type-headline text-3xl sm:text-4xl lg:text-5xl text-[#0F0F12] mb-6"
            >
              Intelligence <span className="gradient-text">at work</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="type-body text-base sm:text-lg mb-8 text-[#3A3A4A]"
            >
              Watch your autonomous agents reason, plan, and execute in real-time. 
              Full transparency with zero complexity.
            </motion.p>

            {/* Feature list */}
            <div className="space-y-4 mb-8">
              {[
                { text: 'Real-time agent reasoning visualization', icon: Activity },
                { text: 'One-click deployment pipeline', icon: Terminal },
                { text: 'Autonomous decision audit trail', icon: Clock },
                { text: 'Live performance dashboards', icon: TrendingUp },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#8B7EC8]/8 flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-[#8B7EC8]" />
                    </div>
                    <span className="type-body text-sm text-[#3A3A4A]">{item.text}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right — UI Mockup */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-2xl p-1 relative overflow-hidden"
            >
              {/* Mockup header — browser chrome */}
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
                    <span className="type-mono text-[9px] text-[#8B8B9A]">kairos-dashboard.app</span>
                  </div>
                </div>
                <div className="w-16" /> {/* Spacer */}
              </div>

              {/* Mockup content */}
              <div className="bg-white rounded-b-xl">
                {/* Top bar */}
                <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 flex items-center justify-between border-b border-black/[0.03]">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-[#8B7EC8]" />
                    <span className="text-xs font-semibold text-[#0F0F12]">Agent #2847</span>
                    <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[8px] font-semibold tracking-wide">ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Activity size={10} className="text-[#8B8B9A]" />
                      <span className="type-mono text-[9px] text-[#8B8B9A]">12ms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={10} className="text-[#8B8B9A]" />
                      <span className="type-mono text-[9px] text-[#8B8B9A]">2m ago</span>
                    </div>
                  </div>
                </div>

                {/* Task list */}
                <div className="px-4 sm:px-6 py-4 space-y-2.5">
                  {[
                    { task: 'Analyzing Q4 revenue patterns', status: 'complete', progress: 100 },
                    { task: 'Identifying cost optimization paths', status: 'complete', progress: 100 },
                    { task: 'Generating executive summary', status: 'running', progress: 72 },
                    { task: 'Cross-referencing market data', status: 'pending', progress: 0 },
                    { task: 'Preparing board presentation', status: 'pending', progress: 0 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FAFAF8] border border-black/[0.03]"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        item.status === 'complete' ? 'bg-green-500' :
                        item.status === 'running' ? 'bg-[#8B7EC8] animate-pulse' :
                        'bg-[#D0D0DC]'
                      }`} />
                      <span className={`text-[11px] flex-1 ${
                        item.status === 'pending' ? 'text-[#8B8B9A]' : 'text-[#0F0F12]'
                      }`}>{item.task}</span>
                      {item.status === 'complete' && <CheckCircle size={12} className="text-green-500 flex-shrink-0" />}
                      {item.status === 'running' && (
                        <div className="w-14 h-1 bg-[#E8E8EC] rounded-full overflow-hidden flex-shrink-0">
                          <motion.div
                            className="h-full bg-[#8B7EC8] rounded-full"
                            initial={{ width: '0%' }}
                            whileInView={{ width: `${item.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Bottom stats */}
                <div className="px-4 sm:px-6 py-3 border-t border-black/[0.03] flex items-center gap-6 bg-[#FAFAF8]">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={11} className="text-[#C4A882]" />
                    <span className="type-mono text-[10px] text-[#5A5A6A]">+34% efficiency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={11} className="text-[#8B7EC8]" />
                    <span className="type-mono text-[10px] text-[#5A5A6A]">847 tasks/hr</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={11} className="text-green-500" />
                    <span className="type-mono text-[10px] text-[#5A5A6A]">0 errors</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
