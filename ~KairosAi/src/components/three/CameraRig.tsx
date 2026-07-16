'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════
// CAMERA RIG — Mouse parallax + gentle scroll movement
// Very smooth, subtle, not distracting
// ═══════════════════════════════════════════════════════════════

export default function CameraRig() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)
  const targetPos = useRef(new THREE.Vector3(0, 0, 8))
  const currentPos = useRef(new THREE.Vector3(0, 0, 8))

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        scrollRef.current = window.scrollY / scrollHeight
      }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useFrame(() => {
    const mouse = mouseRef.current
    const scroll = scrollRef.current

    // Subtle parallax: camera shifts slightly with mouse
    // Also slightly pull back as user scrolls down
    const targetX = mouse.x * 0.25
    const targetY = mouse.y * 0.12 - scroll * 0.5
    const targetZ = 8 - scroll * 0.8

    targetPos.current.set(targetX, targetY, targetZ)

    // Smooth interpolation — slow and elegant
    currentPos.current.lerp(targetPos.current, 0.015)
    camera.position.copy(currentPos.current)
    camera.lookAt(0, -scroll * 0.2, 0)
  })

  return null
}
