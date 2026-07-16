'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Use Cases', href: '#use-cases' },
]

interface MagneticLinkProps {
  children: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
}

function MagneticLink({ children, href, className = '', onClick }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic ${className}`}
      data-cursor-hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
    >
      {children}
    </a>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-2xl border-b border-black/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" data-cursor-hover>
              <div
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#5CB8FC] flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(124,92,252,0.35)] group-hover:scale-105"
              >
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>K</span>
              </div>
              <span
                className="text-base font-semibold tracking-tight text-[#0F0F12]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Kairos
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <MagneticLink
                  key={link.href}
                  href={link.href}
                  className="relative text-[13px] font-medium text-[#71717A] hover:text-[#0F0F12] transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#7C5CFC] to-[#5CB8FC] group-hover:w-full transition-all duration-300 rounded-full" />
                </MagneticLink>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-[13px] font-semibold rounded-full transition-all duration-400 hover:shadow-[0_8px_32px_rgba(124,92,252,0.3)] hover:-translate-y-0.5"
                data-cursor-hover
                style={{
                  background: 'linear-gradient(135deg, #7C5CFC, #5CB8FC)',
                  color: '#fff',
                }}
              >
                Deploy Agent
                <ArrowUpRight size={14} />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 hover:bg-black/[0.03] rounded-lg transition-colors relative z-50"
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span
                    className={`block h-[1.5px] bg-[#0F0F12] transition-all duration-300 origin-center ${
                      mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] bg-[#0F0F12] transition-all duration-300 origin-center ${
                      mobileOpen ? '-rotate-45 -translate-y-[1.5px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            {/* Decorative gradient orbs in mobile menu — light theme */}
            <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#7C5CFC] opacity-[0.06] blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-60 h-60 rounded-full bg-[#5CB8FC] opacity-[0.06] blur-[120px] pointer-events-none" />

            <div className="flex flex-col items-start gap-1 p-8 pt-28">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setMobileOpen(false)}
                  className="type-display text-4xl sm:text-5xl text-[#0F0F12] py-3 hover:text-[#7C5CFC] transition-colors duration-300"
                  data-cursor-hover
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary"
                  data-cursor-hover
                >
                  Deploy Agent
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>

              {/* Mobile menu decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 w-full h-[1px] bg-gradient-to-r from-[#7C5CFC]/20 via-[#5CB8FC]/20 to-transparent origin-left"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
