'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote: "Kairos transformed our entire data pipeline. What took our team weeks now happens autonomously in hours.",
    name: 'Sarah Chen',
    role: 'VP Engineering',
    company: 'TechScale',
    color: '#C4A882',
    featured: true,
  },
  {
    quote: "The autonomous reasoning capability is unlike anything we've seen. It actually understands context and makes smart decisions.",
    name: 'Marcus Johnson',
    role: 'CTO',
    company: 'FinVault',
    color: '#8B7EC8',
    featured: false,
  },
  {
    quote: "We deployed Kairos across our supply chain and saw a 45% cost reduction in the first quarter. The ROI was immediate.",
    name: 'Elena Rodriguez',
    role: 'Head of Operations',
    company: 'LogiFlow',
    color: '#6BB8E0',
    featured: false,
  },
]

export default function Testimonials() {
  const sectionRef = useScrollAnimation()

  return (
    <section id="testimonials" ref={sectionRef} className="section-reveal relative py-24 sm:py-32 px-6 overflow-hidden section-bg-solid">
      {/* Subtle gradient background */}
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
            TESTIMONIALS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="type-headline text-3xl sm:text-4xl lg:text-5xl text-[#0F0F12]"
          >
            Trusted by <span className="gradient-text">leaders</span>
          </motion.h2>
        </div>

        {/* Testimonials grid — Featured + 2 smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 sm:p-10 relative group md:row-span-2"
          >
            <Quote size={32} className="text-[#E8E8EC] mb-6 group-hover:text-[#8B7EC8]/30 transition-colors duration-500" />

            <p className="type-serif text-lg sm:text-xl leading-relaxed text-[#0F0F12] mb-8">
              &ldquo;{TESTIMONIALS[0].quote}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-6 border-t border-black/[0.04]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${TESTIMONIALS[0].color}15` }}>
                <span className="text-sm font-bold" style={{ color: TESTIMONIALS[0].color }}>
                  {TESTIMONIALS[0].name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0F0F12]">{TESTIMONIALS[0].name}</div>
                <div className="type-label text-[8px]">{TESTIMONIALS[0].role} · {TESTIMONIALS[0].company}</div>
              </div>
            </div>

            {/* Accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${TESTIMONIALS[0].color}, transparent)` }} />
          </motion.div>

          {/* Smaller testimonials */}
          {TESTIMONIALS.slice(1).map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8 relative group"
            >
              <Quote size={20} className="text-[#E8E8EC] mb-4 group-hover:text-[#8B7EC8]/30 transition-colors duration-500" />

              <p className="type-body text-sm sm:text-base leading-relaxed text-[#3A3A4A] mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-black/[0.04]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${testimonial.color}15` }}>
                  <span className="text-[10px] font-bold" style={{ color: testimonial.color }}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#0F0F12]">{testimonial.name}</div>
                  <div className="type-label text-[7px]">{testimonial.role} · {testimonial.company}</div>
                </div>
              </div>

              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${testimonial.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
