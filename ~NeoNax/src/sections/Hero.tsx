import { useEffect, useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [
      { ref: labelRef, delay: 1000, y: 20 },
      { ref: line1Ref, delay: 1300, y: 60 },
      { ref: line2Ref, delay: 1450, y: 60 },
      { ref: line3Ref, delay: 1600, y: 60 },
      { ref: subtitleRef, delay: 2000, y: 30 },
      { ref: ctaRef, delay: 2400, y: 30 },
    ]

    elements.forEach(({ ref, delay, y }) => {
      if (!ref.current) return
      const el = ref.current
      el.style.opacity = '0'
      el.style.transform = `translateY(${y}px)`
      el.style.transition = 'none'

      setTimeout(() => {
        el.style.transition = `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)`
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, delay)
    })

    // Scroll indicator fade out
    const onScroll = () => {
      if (!scrollIndicatorRef.current) return
      const scrollY = window.scrollY
      scrollIndicatorRef.current.style.opacity = scrollY > 100 ? '0' : '1'
      scrollIndicatorRef.current.style.transition = 'opacity 0.3s ease'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 text-center px-6 pointer-events-none">

        {/* Main headline */}
        <div className="space-y-2 mb-8">
          <div
            ref={line1Ref}
            className="font-display font-bold text-white uppercase leading-[0.95] tracking-[0.08em]"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
          >
            CRYSTALLIZED
          </div>
          <div
            ref={line2Ref}
            className="font-display font-bold uppercase leading-[0.95] tracking-[0.08em] text-gradient-cyan-magenta"
            style={{ fontSize: 'clamp(48px, 8vw, 120px)' }}
          >
            ENERGY
          </div>
          <div
            ref={line3Ref}
            className="font-display font-medium text-[#EAEAEA] uppercase leading-[0.95] tracking-[0.05em]"
            style={{ fontSize: 'clamp(32px, 5vw, 72px)' }}
          >
            FOR THE BRAVE
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body font-light text-lg max-w-[480px] mx-auto text-[rgba(234,234,234,0.6)] leading-[1.7]"
        >
          A precision-engineered botanical elixir, forged from bioluminescent extracts and synthetic clarity.
        </p>

        {/* CTA Group */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 pointer-events-auto"
        >
          <button
            onClick={() => scrollToSection('access')}
            className="interactive font-display font-medium text-sm uppercase tracking-[0.1em] bg-violet text-white rounded px-10 py-4 hover:shadow-[0_0_40px_rgba(112,0,255,0.5)] hover:scale-[1.02] transition-all duration-300"
          >
            SECURE YOUR VIAL
          </button>
          <button
            onClick={() => scrollToSection('transmutation')}
            className="interactive font-display font-medium text-sm uppercase tracking-[0.1em] border border-white/20 text-white rounded px-10 py-4 hover:border-magenta hover:text-magenta transition-all duration-300"
          >
            WATCH THE TRANSMUTATION
          </button>
        </div>
      </div>
    </section>
  )
}
