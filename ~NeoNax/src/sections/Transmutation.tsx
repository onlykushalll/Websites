import { useEffect, useRef } from 'react'

export default function Transmutation() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.opacity = '1'
            target.style.transform = 'translateY(0)'
            videoRef.current?.play().catch(() => {})
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (contentRef.current) {
      contentRef.current.style.opacity = '0'
      contentRef.current.style.transform = 'translateY(30px)'
      contentRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToAccess = () => {
    const el = document.getElementById('access')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      id="transmutation"
      className="relative min-h-[100dvh] overflow-hidden bg-void flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.7 }}
      >
        <source src="/video-1.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[rgba(3,3,8,0.5)]" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center max-w-[800px] px-6"
      >
        <div className="font-mono text-[11px] text-cyan tracking-[0.2em] mb-6">
          THE TRANSMUTATION
        </div>

        <h2
          className="font-display font-bold text-white uppercase leading-[1.1] tracking-[0.05em] mb-8"
          style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}
        >
          FROM MIST
          <br />
          TO MATTER
        </h2>

        <p className="font-body font-light text-lg text-[rgba(234,234,234,0.7)] max-w-[520px] mx-auto leading-[1.7] mb-10">
          Witness the process. Raw botanical essence, forced through a lattice of synthetic pressure, emerges as something entirely new.
        </p>

        <button
          onClick={scrollToAccess}
          className="interactive font-mono text-[11px] uppercase tracking-[0.12em] border border-cyan/40 rounded-full px-9 py-3.5 text-[#EAEAEA] hover:bg-cyan hover:text-void transition-all duration-300"
        >
          ENTER THE LAB
        </button>
      </div>
    </section>
  )
}
