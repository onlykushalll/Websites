'use client'

import { useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════
// PREMIUM CUSTOM CURSOR — Ring + Dot, fast & smooth
// - Dot: nearly instant tracking (lerp 0.65)
// - Ring: fast but smooth follow (lerp 0.18) — stays close, never separates
// - All sizing via JS lerp (no CSS transition on width/height = no glitch)
// - Uses transform for GPU-accelerated positioning
// ═══════════════════════════════════════════════════════════════

const RING_SIZE = 40
const DOT_SIZE = 6

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  // Positions
  const ringPos = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const targetPos = useRef({ x: -100, y: -100 })

  // Scale (driven by JS lerp, not CSS transitions)
  const ringScale = useRef(1)
  const targetRingScale = useRef(1)
  const dotScale = useRef(1)
  const targetDotScale = useRef(1)

  // State
  const isVisible = useRef(false)
  const isHovering = useRef(false)
  const isClicking = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    if (ringRef.current) ringRef.current.style.display = 'block'
    if (dotRef.current) dotRef.current.style.display = 'block'

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }

      if (!isVisible.current) {
        isVisible.current = true
        // Jump both to cursor on first move — no sweep-in
        ringPos.current = { x: e.clientX, y: e.clientY }
        dotPos.current = { x: e.clientX, y: e.clientY }
        if (ringRef.current) ringRef.current.style.opacity = '1'
        if (dotRef.current) dotRef.current.style.opacity = '1'
      }
    }

    const handleMouseDown = () => {
      isClicking.current = true
      targetRingScale.current = 0.8
      targetDotScale.current = 0.6
    }

    const handleMouseUp = () => {
      isClicking.current = false
      targetRingScale.current = isHovering.current ? 1.8 : 1
      targetDotScale.current = isHovering.current ? 1.4 : 1
    }

    const handleMouseLeave = () => {
      isVisible.current = false
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      isVisible.current = true
      if (ringRef.current) ringRef.current.style.opacity = '1'
      if (dotRef.current) dotRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Hover detection — elementFromPoint every frame
    let lastHoverTarget: HTMLElement | null = null

    const checkHover = () => {
      const { x, y } = targetPos.current
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      const hoverEl = el?.closest('a, button, [data-cursor-hover]') as HTMLElement | null

      if (hoverEl !== lastHoverTarget) {
        lastHoverTarget = hoverEl
        isHovering.current = !!hoverEl

        if (!isClicking.current) {
          targetRingScale.current = hoverEl ? 1.8 : 1
          targetDotScale.current = hoverEl ? 1.4 : 1
        }
      }
    }

    // Lerp helper
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    let rafId: number

    const animate = () => {
      // Fast position lerp — dot is snappier, ring follows closely
      ringPos.current.x = lerp(ringPos.current.x, targetPos.current.x, 0.18)
      ringPos.current.y = lerp(ringPos.current.y, targetPos.current.y, 0.18)
      dotPos.current.x = lerp(dotPos.current.x, targetPos.current.x, 0.65)
      dotPos.current.y = lerp(dotPos.current.y, targetPos.current.y, 0.65)

      // Smooth scale interpolation
      ringScale.current = lerp(ringScale.current, targetRingScale.current, 0.2)
      dotScale.current = lerp(dotScale.current, targetDotScale.current, 0.2)

      // Apply via transform (GPU-accelerated, no layout thrashing)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - RING_SIZE / 2}px, ${ringPos.current.y - RING_SIZE / 2}px) scale(${ringScale.current})`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - DOT_SIZE / 2}px, ${dotPos.current.y - DOT_SIZE / 2}px) scale(${dotScale.current})`
      }

      checkHover()
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        className="hidden lg:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: RING_SIZE,
          height: RING_SIZE,
          border: '1.5px solid rgba(15, 15, 18, 0.25)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          display: 'none',
          willChange: 'transform, opacity',
          transition: 'opacity 0.25s ease, border-color 0.3s ease',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="hidden lg:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: DOT_SIZE,
          height: DOT_SIZE,
          background: '#7C5CFC',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          display: 'none',
          willChange: 'transform, opacity',
          transition: 'opacity 0.25s ease',
        }}
      />
    </>
  )
}
