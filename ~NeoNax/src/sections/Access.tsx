import { useEffect, useRef } from 'react'

export default function Access() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = (entry.target as HTMLElement).querySelectorAll('.stagger-item')
            children.forEach((child, i) => {
              const el = child as HTMLElement
              setTimeout(() => {
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
              }, i * 100)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (contentRef.current) {
      const children = contentRef.current.querySelectorAll('.stagger-item')
      children.forEach((child) => {
        const el = child as HTMLElement
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      })
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="access"
      className="relative min-h-[80dvh] bg-transparent py-[160px] px-6 md:px-10 overflow-hidden"
    >
      {/* Breathing glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.08) 0%, transparent 60%)',
          backgroundSize: '200% 200%',
          animation: 'breathe 20s linear infinite',
        }}
      />

      <div ref={contentRef} className="relative z-10 max-w-[800px] mx-auto text-center">
        <div className="stagger-item font-mono text-[11px] text-cyan tracking-[0.12em] mb-6">
          ACCESS / 06
        </div>

        <h2
          className="stagger-item font-display font-bold text-white uppercase leading-[1.1] tracking-[0.05em] mb-6"
          style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            textShadow: '0 0 40px rgba(0, 240, 255, 0.3)',
          }}
        >
          SECURE
          <br />
          YOUR BATCH
        </h2>

        <p className="stagger-item font-body font-light text-lg text-[rgba(234,234,234,0.7)] max-w-[480px] mx-auto leading-[1.7] mb-10">
          Batch 001 is limited to 2,000 units. Each vial is serialized and delivered in a vacuum-sealed containment case.
        </p>

        <div className="stagger-item font-display font-medium text-2xl text-cyan mb-10">
          €89 / VIAL
        </div>

        <div className="stagger-item flex flex-col items-center gap-4 mb-16">
          <button className="interactive w-full max-w-[360px] font-display font-bold text-base uppercase tracking-[0.12em] bg-violet text-white rounded px-12 py-5 hover:shadow-[0_0_50px_rgba(112,0,255,0.6)] hover:scale-[1.03] transition-all duration-300">
            PRE-ORDER NOW
          </button>
          <button className="interactive font-body text-sm text-[rgba(234,234,234,0.5)] hover:text-cyan hover:underline transition-all duration-300">
            Join the priority waitlist
          </button>
        </div>

        <div className="stagger-item flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {['FREE SHIPPING', '30-DAY RETURN', 'SECURE CHECKOUT'].map((item) => (
            <div key={item} className="font-mono text-[10px] text-[rgba(234,234,234,0.4)] uppercase tracking-[0.1em]">
              {item}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
