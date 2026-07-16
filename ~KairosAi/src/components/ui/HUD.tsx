'use client'

import { useState, useEffect, useRef } from 'react'

export default function HUD() {
  const [mouseCoords, setMouseCoords] = useState({ x: '0.000', y: '0.000' })
  const [fps, setFps] = useState(60)
  const [scrollPercent, setScrollPercent] = useState('0.0')
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3)
      const ny = (-(e.clientY / window.innerHeight) * 2 + 1).toFixed(3)
      setMouseCoords({ x: nx, y: ny })
    }
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight * 100).toFixed(1) : '0.0'
      setScrollPercent(progress)
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // FPS counter
  useEffect(() => {
    let animId: number
    const countFrames = () => {
      frameCountRef.current++
      const now = performance.now()
      if (now - lastTimeRef.current >= 1000) {
        setFps(frameCountRef.current)
        frameCountRef.current = 0
        lastTimeRef.current = now
      }
      animId = requestAnimationFrame(countFrames)
    }
    animId = requestAnimationFrame(countFrames)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="fixed inset-0 z-40 pointer-events-none" aria-hidden="true">
      {/* Top frame line */}
      <div className="absolute top-0 left-0 right-0 hud-line" />

      {/* Bottom frame line */}
      <div className="absolute bottom-0 left-0 right-0 hud-line" />

      {/* Left vertical line */}
      <div className="absolute top-0 left-0 bottom-0 hud-line-v" />

      {/* Right vertical line */}
      <div className="absolute top-0 right-0 bottom-0 hud-line-v" />

      {/* Top-left: System status */}
      <div className="absolute top-4 left-5 hud-text" style={{ opacity: 0.5 }}>
        KAIROS v2.1 — AUTONOMOUS
      </div>

      {/* Top-right: FPS counter */}
      <div className="absolute top-4 right-5 hud-text flex items-center gap-3" style={{ opacity: 0.5 }}>
        <span>SCROLL {scrollPercent}%</span>
        <span className="inline-block w-px h-2.5 bg-gray-300" />
        <span>{fps} FPS</span>
      </div>

      {/* Bottom-left: Cursor coordinates */}
      <div className="absolute bottom-4 left-5 hud-text flex items-center gap-2" style={{ opacity: 0.5 }}>
        <span>X: {mouseCoords.x}</span>
        <span className="inline-block w-px h-2.5 bg-gray-300" />
        <span>Y: {mouseCoords.y}</span>
      </div>

      {/* Bottom-right: Branding */}
      <div className="absolute bottom-4 right-5 hud-label" style={{ opacity: 0.35 }}>
        © 2025 KAIROS AI
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(196,168,130,0.25)', borderWidth: '0.5px' }} />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(196,168,130,0.25)', borderWidth: '0.5px' }} />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l" style={{ borderColor: 'rgba(196,168,130,0.25)', borderWidth: '0.5px' }} />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r" style={{ borderColor: 'rgba(196,168,130,0.25)', borderWidth: '0.5px' }} />
    </div>
  )
}
