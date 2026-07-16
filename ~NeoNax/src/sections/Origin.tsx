import { useEffect, useRef, useState } from 'react'

const ingredients = [
  { name: 'LUMINA CRYSTAL', img: '/img-1.jpg' },
  { name: 'AETHER ROOT', img: '/img-4.jpg' },
  { name: 'NOVA SAP', img: '/img-2.jpg' },
  { name: 'PRISM DUST', img: '/img-5.jpg' },
  { name: 'VOID ESSENCE', img: '/img-6.jpg' },
  { name: 'CHRONO BERRY', img: '/img-3.jpg' },
]

export default function Origin() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.opacity = '1'
            target.style.transform = 'translateY(0) rotateX(0)'
          }
        })
      },
      { threshold: 0.2 }
    )

    if (leftColRef.current) {
      leftColRef.current.style.opacity = '0'
      leftColRef.current.style.transform = 'translateY(40px)'
      leftColRef.current.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      observer.observe(leftColRef.current)
    }

    if (gridRef.current) {
      gridRef.current.style.opacity = '0'
      gridRef.current.style.transform = 'translateY(100px) rotateX(15deg)'
      gridRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      observer.observe(gridRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="relative min-h-[100dvh] bg-transparent py-[160px] md:py-[160px] px-6 md:px-10"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        {/* Left Column - Text */}
        <div ref={leftColRef} className="lg:w-[55%] w-full">
          <div className="font-mono text-[11px] text-cyan tracking-[0.12em] mb-6">
            ORIGIN / 01
          </div>

          <h2
            className="font-display font-bold text-white uppercase leading-[1.1] tracking-[0.05em] mb-8"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            WHERE PURE LIGHT
            <br />
            MEETS ORGANIC MATTER
          </h2>

          <p className="font-body font-light text-lg text-[rgba(234,234,234,0.7)] max-w-[480px] leading-[1.7]">
            Harvested from bioluminescent flora at the edge of synthetic reefs, each extract is crystallized under controlled atmospheric pressure. The result: a flavor profile that exists nowhere in nature.
          </p>

          <div
            className="w-[60px] h-px bg-cyan mt-12"
            style={{
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              animation: 'lineGrow 0.6s ease 0.3s forwards',
            }}
          />
        </div>

        {/* Right Column - Perspective Grid */}
        <div className="lg:w-[45%] w-full flex justify-center lg:justify-end">
          <div
            ref={gridRef}
            className="grid grid-cols-3 gap-4"
            style={{
              perspective: '1500px',
              transform: 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {ingredients.map((ingredient, i) => (
              <div
                key={i}
                className="interactive relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(0, 240, 255, 0.15)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease, opacity 0.3s ease',
                  transform: hoveredIndex === i ? 'translateZ(40px)' : 'translateZ(0)',
                  boxShadow: hoveredIndex === i ? '0 0 30px rgba(0, 240, 255, 0.15)' : 'none',
                  borderColor: hoveredIndex === i ? '#00F0FF' : 'rgba(0, 240, 255, 0.15)',
                  opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.5 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={ingredient.img}
                  alt={ingredient.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute top-3 left-3 font-mono text-[10px] text-cyan uppercase tracking-[0.1em] z-10">
                  {ingredient.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lineGrow {
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}
