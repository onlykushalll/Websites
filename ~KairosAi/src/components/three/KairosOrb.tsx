'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ═══════════════════════════════════════════════════════════════
// KAIROS ORB — Light theme glass crystal sphere
// Color: #F8F6FF, inner violet #D4C8F8, inner cyan #C0E0F8
// distort: 0.25, speed: 3, no particles, no dots
// Position: [2.0, 0.2, 0] — right side
// ═══════════════════════════════════════════════════════════════


export default function KairosOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const mouseSpeedRef = useRef(0)
  const prevMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = (e.clientX / window.innerWidth) * 2 - 1
      const newY = -(e.clientY / window.innerHeight) * 2 + 1
      const dx = newX - prevMouseRef.current.x
      const dy = newY - prevMouseRef.current.y
      mouseSpeedRef.current = Math.sqrt(dx * dx + dy * dy) * 10
      mouseSpeedRef.current = Math.min(mouseSpeedRef.current, 5)
      prevMouseRef.current = { x: newX, y: newY }
      mousePosRef.current = { x: newX, y: newY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(({ clock }) => {
    const _time = clock.getElapsedTime()

    // Decay mouse speed
    mouseSpeedRef.current *= 0.95

    if (meshRef.current) {
      meshRef.current.rotation.y += (mousePosRef.current.x * 0.2 - meshRef.current.rotation.y) * 0.04
      meshRef.current.rotation.x += (mousePosRef.current.y * 0.1 - meshRef.current.rotation.x) * 0.04
    }
  })

  return (
    <Float
      speed={1.0}
      rotationIntensity={0.15}
      floatIntensity={0.25}
      floatingRange={[-0.03, 0.03]}
    >
      <group position={[2.0, 0.2, 0]}>
        {/* Main light glass orb — light lavender glass for light bg (4K: 256 segments) */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.8, 256, 256]} />
          <MeshDistortMaterial
            color="#F8F6FF"
            envMapIntensity={1.8}
            clearcoat={1}
            clearcoatRoughness={0.005}
            metalness={0.15}
            roughness={0.02}
            distort={0.25}
            speed={3}
            transparent
            opacity={0.72}
            depthWrite={true}
          />
        </mesh>

        {/* Inner core glow — pastel violet */}
        <mesh scale={0.7}>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial
            color="#D4C8F8"
            emissive="#D4C8F8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>

        {/* Second inner core — pastel cyan, smaller */}
        <mesh scale={0.45}>
          <sphereGeometry args={[1.8, 48, 48]} />
          <meshStandardMaterial
            color="#C0E0F8"
            emissive="#C0E0F8"
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  )
}
