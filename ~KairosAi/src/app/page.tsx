'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SmoothScrollProvider from '@/components/providers/GSAPProvider'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Features from '@/components/sections/Features.premium'
import Process from '@/components/sections/Process.premium'
import UseCases from '@/components/sections/UseCases.premium'
import Testimonials from '@/components/sections/Testimonials.premium'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

const Scene3D = dynamic(() => import('@/components/three/SceneWrapper'), {
  ssr: false,
})

function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = prev < 30 ? 5 : prev < 70 ? 3 : prev < 90 ? 1.5 : 0.8
        return Math.min(prev + increment + Math.random() * 3, 100)
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#FAFAF8] flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <div className="type-label mb-10 flex items-center justify-center gap-4">
          <span className="inline-block w-8 h-[1px] bg-[#7C5CFC]/30 rounded-full" />
          INITIALIZING
          <span className="inline-block w-8 h-[1px] bg-[#7C5CFC]/30 rounded-full" />
        </div>

        <h2 className="type-display text-6xl sm:text-8xl text-[#0F0F12] mb-2 chromatic">
          KAIROS
        </h2>
        <h2 className="type-display text-6xl sm:text-8xl gradient-text mb-12">
          AI
        </h2>

        {/* Progress bar */}
        <div className="w-56 h-[1px] bg-[#E4E4E0] mx-auto mb-6 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#5CB8FC] rounded-full transition-all duration-200"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="type-label flex items-center justify-center gap-4 text-[9px]">
          <span>{Math.floor(progress)}%</span>
          <span className="inline-block w-px h-2 bg-[#D4D4D0]" />
          <span className="opacity-50">
            {progress >= 100 ? 'SYSTEM READY' : 'LOADING ASSETS'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (canvasRef.current) {
        if (window.scrollY > window.innerHeight * 0.6) {
          canvasRef.current.classList.add('scrolled-past-hero')
        } else {
          canvasRef.current.classList.remove('scrolled-past-hero')
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* 3D WebGL Canvas */}
      <div ref={canvasRef} className="canvas-container">
        <Scene3D />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden">
        <main className="relative z-10 flex-1 max-w-full overflow-x-hidden">
          <Hero />
          <Marquee />
          <About />
          <Features />
          <Process />
          <UseCases />
          <Testimonials />
          <CTA />
        </main>

        <div className="relative z-10 mt-auto">
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  )
}
