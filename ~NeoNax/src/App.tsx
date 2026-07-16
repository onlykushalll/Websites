import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CustomCursor from './components/CustomCursor'
import HeroCanvas from './components/HeroCanvas'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Origin from './sections/Origin'
import Transmutation from './sections/Transmutation'
import Molecules from './sections/Molecules'
import Collection from './sections/Collection'
import Access from './sections/Access'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [canvasVisible, setCanvasVisible] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Keep 3D canvas visible in background across all sections
    setCanvasVisible(true)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return (
    <div className="relative bg-void min-h-[100dvh]">
      <CustomCursor />
      <HeroCanvas visible={canvasVisible} />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Origin />
        <Transmutation />
        <Molecules />
        <Collection />
        <Access />
      </main>

      <Footer />
    </div>
  )
}

export default App
