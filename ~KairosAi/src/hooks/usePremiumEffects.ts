'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * Animated counter hook — counts from 0 to target on scroll into view.
 * Uses ease-out cubic for natural deceleration.
 * Returns { count, ref } — attach ref to the number element.
 */
export function useAnimatedCounter(
  target: number,
  duration = 2000,
  decimals = 0
) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(parseFloat((eased * target).toFixed(decimals)))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, decimals])

  return { count, ref }
}

/**
 * 3D Tilt card hook — returns mouse handlers & transform string.
 * Vanilla JS implementation, no library dependency.
 */
export function useTilt(maxTilt = 8, scale = 1.02) {
  const [transform, setTransform] = useState('')
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
    )
    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    })
  }, [maxTilt, scale])

  const handleMouseLeave = useCallback(() => {
    setTransform(
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    )
    setShine({ x: 50, y: 50, opacity: 0 })
  }, [])

  return { cardRef, transform, shine, handleMouseMove, handleMouseLeave }
}

/**
 * Scroll progress hook — returns 0..1 for how far through an element the viewport has scrolled.
 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrolled = (viewportHeight - rect.top) / (rect.height + viewportHeight)
      setProgress(Math.max(0, Math.min(1, scrolled)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { ref, progress }
}
