import { useEffect, useRef, useState } from 'react'

const products = [
  { name: 'AQUA SYNTH', desc: 'Crystalline hydration', img: '/product-1.jpg' },
  { name: 'MAGENTA RUSH', desc: 'Electric velocity', img: '/product-2.jpg' },
  { name: 'EMERALD FROST', desc: 'Arctic clarity', img: '/product-3.jpg' },
  { name: 'VIOLET VOID', desc: 'Deep space focus', img: '/product-4.jpg' },
  { name: 'SOLAR AMBER', desc: 'Warm fusion', img: '/product-5.jpg' },
]

export default function Collection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.opacity = '1'
            target.style.transform = 'translateY(0) rotateX(20deg)'
          }
        })
      },
      { threshold: 0.2 }
    )

    if (headerRef.current) {
      headerRef.current.style.opacity = '0'
      headerRef.current.style.transform = 'translateY(40px)'
      headerRef.current.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      observer.observe(headerRef.current)
    }

    if (deckRef.current) {
      deckRef.current.style.opacity = '0'
      deckRef.current.style.transform = 'translateY(120px) rotateX(40deg)'
      deckRef.current.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      observer.observe(deckRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative min-h-[100dvh] bg-transparent py-[160px] px-6 md:px-10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="font-mono text-[11px] text-cyan tracking-[0.12em] mb-4">
            COLLECTION / 05
          </div>
          <h2
            className="font-display font-bold text-white uppercase leading-[1.1] tracking-[0.05em] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            THE VIALS
          </h2>
          <p className="font-body font-light text-lg text-[rgba(234,234,234,0.6)]">
            Five formulations. Five states of matter.
          </p>
        </div>

        {/* 3D Deck */}
        <div className="flex justify-center overflow-visible">
          <div
            ref={deckRef}
            className="flex flex-col md:flex-row gap-6"
            style={{
              perspective: '2000px',
              transform: 'rotateX(20deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {products.map((product, i) => (
              <div
                key={i}
                className="interactive relative w-full md:w-[280px] aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(0, 240, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease, opacity 0.3s ease',
                  transform:
                    hoveredIndex === i
                      ? 'rotateX(-10deg) translateZ(60px) scale(1.05)'
                      : hoveredIndex !== null && hoveredIndex !== i
                      ? 'translateZ(-20px)'
                      : 'translateZ(0)',
                  boxShadow:
                    hoveredIndex === i
                      ? '0 20px 60px rgba(0, 240, 255, 0.1)'
                      : 'none',
                  borderColor: hoveredIndex === i ? '#00F0FF' : 'rgba(0, 240, 255, 0.1)',
                  opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.4 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-[60%] overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                <div className="h-[40%] p-5 flex flex-col justify-end">
                  <div className="font-display font-medium text-lg text-white mb-1">
                    {product.name}
                  </div>
                  <div className="font-body font-light text-[13px] text-[rgba(234,234,234,0.5)]">
                    {product.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
