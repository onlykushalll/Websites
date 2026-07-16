import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const textItems = [
  { word: 'PRECISION', className: 'precision-text', color: '#FFFFFF' },
  { word: 'VELOCITY', className: 'velocity-text', stroke: true, strokeColor: 'rgba(0, 240, 255, 0.6)' },
  { word: 'CLARITY', className: 'clarity-text', color: '#00F0FF' },
  { word: 'INTENSITY', className: 'intensity-text', color: '#FF00AA' },
  { word: 'PURITY', className: 'purity-text', stroke: true, strokeColor: 'rgba(255, 255, 255, 0.3)' },
]

export default function Molecules() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Precision — scale and rotate approach
    const precisionEl = section.querySelector('.precision-text')
    if (precisionEl) {
      gsap.fromTo(
        precisionEl,
        { scale: 0.6, rotate: -5, opacity: 0.3 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: precisionEl,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      )
    }

    // Velocity — horizontal fly-through
    const velocityEl = section.querySelector('.velocity-text')
    if (velocityEl) {
      gsap.fromTo(
        velocityEl,
        { x: '-50vw', opacity: 0 },
        {
          x: '50vw',
          opacity: 1,
          scrollTrigger: {
            trigger: velocityEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }

    // Clarity — blur to focus
    const clarityEl = section.querySelector('.clarity-text')
    if (clarityEl) {
      gsap.fromTo(
        clarityEl,
        { filter: 'blur(20px)', opacity: 0 },
        {
          filter: 'blur(0px)',
          opacity: 1,
          scrollTrigger: {
            trigger: clarityEl,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        }
      )
    }

    // Intensity — shimmer gradient + letter-spacing
    const intensityEl = section.querySelector('.intensity-text') as HTMLElement
    if (intensityEl) {
      intensityEl.style.backgroundImage = 'linear-gradient(90deg, #FF00AA, #00F0FF, #FF00AA)'
      intensityEl.style.backgroundSize = '200% 100%'
      intensityEl.style.webkitBackgroundClip = 'text'
      intensityEl.style.backgroundClip = 'text'
      intensityEl.style.color = 'transparent'

      gsap.fromTo(
        intensityEl,
        { backgroundPosition: '0% 0%', letterSpacing: '0.2em' },
        {
          backgroundPosition: '100% 0%',
          letterSpacing: '0em',
          scrollTrigger: {
            trigger: intensityEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }

    // Purity — fade in
    const purityEl = section.querySelector('.purity-text')
    if (purityEl) {
      gsap.fromTo(
        purityEl,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: purityEl,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="molecules"
      className="relative bg-transparent py-[200px] px-6 md:px-10"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-[80px]">
        {textItems.map((item, i) => (
          <div key={i} className="relative min-h-[60vh] flex items-center justify-center w-full">

            {i > 0 && i < textItems.length && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot" style={{ boxShadow: '0 0 20px #00F0FF' }} />
              </div>
            )}

            <div
              className={`${item.className} font-display font-bold uppercase text-center leading-[0.95] tracking-[0.05em]`}
              style={{
                fontSize: 'clamp(48px, 12vw, 180px)',
                color: item.color || 'transparent',
                WebkitTextStroke: item.stroke ? `1px ${item.strokeColor}` : 'none',
              }}
            >
              {item.word}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
