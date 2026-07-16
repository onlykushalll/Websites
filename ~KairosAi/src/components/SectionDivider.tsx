'use client'

import { motion } from 'framer-motion'

export default function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'gradient' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-7xl mx-auto px-6"
    >
      <div
        className={`h-[1px] ${
          variant === 'gradient'
            ? 'bg-gradient-to-r from-transparent via-[#8B7EC8]/20 to-transparent'
            : 'bg-gradient-to-r from-transparent via-black/[0.06] to-transparent'
        }`}
      />
    </motion.div>
  )
}
