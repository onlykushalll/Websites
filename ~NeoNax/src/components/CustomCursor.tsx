import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        dotRef.current?.classList.add('hovered')
        ringRef.current?.classList.add('hovered')
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        dotRef.current?.classList.remove('hovered')
        ringRef.current?.classList.remove('hovered')
      }
    }

    let rafId: number

    const animateCursor = () => {
      const dot = dotRef.current
      const ring = ringRef.current

      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.12
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.12

      if (dot) {
        dot.style.transform = `translate(${cursorPos.current.x - 4}px, ${cursorPos.current.y - 4}px)`
      }
      if (ring) {
        ring.style.transform = `translate(${cursorPos.current.x - 16}px, ${cursorPos.current.y - 16}px)`
      }

      rafId = requestAnimationFrame(animateCursor)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    rafId = requestAnimationFrame(animateCursor)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
