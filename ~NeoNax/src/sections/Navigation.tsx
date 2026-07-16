import { useEffect, useRef, useState } from 'react'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!navRef.current) return
    const nav = navRef.current
    nav.style.opacity = '0'
    nav.style.transform = 'translateY(-20px)'

    const timer = setTimeout(() => {
      nav.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      nav.style.opacity = '1'
      nav.style.transform = 'translateY(0)'
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] h-16 flex items-center justify-between px-6 md:px-10"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'rgba(3, 3, 8, 0.7)',
        }}
      >
        <div
          className="font-display font-bold text-white text-base tracking-[0.2em] interactive cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          NEONAX
        </div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'ORIGIN', id: 'origin' },
            { label: 'FLAVORS', id: 'transmutation' },
            { label: 'MOLECULES', id: 'molecules' },
            { label: 'ACCESS', id: 'access' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-[#EAEAEA] interactive hover:text-cyan transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-cyan group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>
          ))}

          <button
            onClick={() => scrollTo('access')}
            className="font-mono text-[11px] uppercase tracking-[0.12em] border border-cyan/40 rounded-full px-6 py-2 text-[#EAEAEA] interactive hover:bg-cyan hover:text-void transition-all duration-300"
          >
            BUY NOW
          </button>
        </div>

        <button
          className="md:hidden interactive text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(3, 3, 8, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {[
          { label: 'ORIGIN', id: 'origin' },
          { label: 'FLAVORS', id: 'transmutation' },
          { label: 'MOLECULES', id: 'molecules' },
          { label: 'ACCESS', id: 'access' },
        ].map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="font-display text-2xl uppercase tracking-[0.1em] text-white interactive"
            style={{
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(40px)',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  )
}
