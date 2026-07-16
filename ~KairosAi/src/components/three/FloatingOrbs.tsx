'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Central hero element - large rotating geometric structure
function HeroElement({ mousePos }: { mousePos: { x: number; y: number } }) {
  const outerWireRef = useRef<THREE.Mesh>(null)
  const innerWireRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (outerWireRef.current) {
      outerWireRef.current.rotation.x = t * 0.12 + mousePos.y * 0.3
      outerWireRef.current.rotation.y = t * 0.18 + mousePos.x * 0.3
    }
    if (innerWireRef.current) {
      innerWireRef.current.rotation.x = -t * 0.15 - mousePos.y * 0.2
      innerWireRef.current.rotation.y = -t * 0.1 - mousePos.x * 0.2
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 0.8) * 0.1
      coreRef.current.scale.set(pulse, pulse, pulse)
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3
      ring1Ref.current.rotation.z = t * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.25
      ring2Ref.current.rotation.x = Math.PI / 3
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.2
      ring3Ref.current.rotation.y = Math.PI / 6
    }
  })

  return (
    <group position={[0, 0, -1]}>
      {/* Outer wireframe icosahedron */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[2.8, 1]} />
        <meshBasicMaterial
          color="#D4A853"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner wireframe dodecahedron */}
      <mesh ref={innerWireRef}>
        <dodecahedronGeometry args={[2.0, 0]} />
        <meshBasicMaterial
          color="#F59E0B"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Core glass sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshPhysicalMaterial
          color="#FFFBF0"
          metalness={0.05}
          roughness={0.05}
          transmission={0.9}
          thickness={3}
          ior={1.8}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.02}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.035, 16, 128]} />
        <meshStandardMaterial
          color="#D4A853"
          emissive="#D4A853"
          emissiveIntensity={1.0}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.6, 0.025, 16, 128]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <torusGeometry args={[4.0, 0.02, 16, 128]} />
        <meshStandardMaterial
          color="#FDE68A"
          emissive="#FDE68A"
          emissiveIntensity={0.6}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

// Floating ring elements
function FloatingRing({
  position,
  rotation,
  scale,
  speed,
  offset,
  mousePos,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  offset: number
  mousePos: { x: number; y: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() * speed + offset

    meshRef.current.position.x = initialPos.x + Math.sin(t * 0.4) * 0.3 + mousePos.x * 0.2
    meshRef.current.position.y = initialPos.y + Math.cos(t * 0.5) * 0.2 + mousePos.y * 0.15

    meshRef.current.rotation.x = rotation[0] + t * 0.2
    meshRef.current.rotation.y = rotation[1] + t * 0.15
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#D4A853"
        emissive="#D4A853"
        emissiveIntensity={0.8}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

function Orb({
  position,
  scale,
  color,
  speed,
  offset,
  mousePos,
}: {
  position: [number, number, number]
  scale: number
  color: string
  speed: number
  offset: number
  mousePos: { x: number; y: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() * speed + offset

    meshRef.current.position.x = initialPos.x + Math.sin(t * 0.6) * 0.5 + mousePos.x * 0.3
    meshRef.current.position.y = initialPos.y + Math.sin(t * 0.8) * 0.4 + mousePos.y * 0.2
    meshRef.current.position.z = initialPos.z + Math.cos(t * 0.5) * 0.3

    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.1}
        roughness={0.05}
        transmission={0.95}
        thickness={1.5}
        ior={1.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function SmallSphere({
  position,
  color,
  speed,
  offset,
  mousePos,
}: {
  position: [number, number, number]
  color: string
  speed: number
  offset: number
  mousePos: { x: number; y: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime() * speed + offset

    meshRef.current.position.x = initialPos.x + Math.sin(t * 0.7) * 0.3 + mousePos.x * 0.1
    meshRef.current.position.y = initialPos.y + Math.cos(t * 0.9) * 0.4 + mousePos.y * 0.05
    meshRef.current.position.z = initialPos.z + Math.sin(t * 0.5) * 0.2
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.0}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function FloatingOrbs() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const smallSpheres = useMemo(() => {
    const spheres = []
    for (let i = 0; i < 30; i++) {
      spheres.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8 - 2,
        ] as [number, number, number],
        color: i % 3 === 0 ? '#D4A853' : i % 3 === 1 ? '#F59E0B' : '#FDE68A',
        speed: 0.3 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
      })
    }
    return spheres
  }, [])

  return (
    <group>
      {/* Central hero element */}
      <HeroElement mousePos={mousePos} />

      {/* Floating rings */}
      <FloatingRing position={[4, 2, -4]} rotation={[0.5, 0.3, 0]} scale={1.5} speed={0.2} offset={0} mousePos={mousePos} />
      <FloatingRing position={[-4.5, -1.5, -3]} rotation={[0.8, 0.5, 0.2]} scale={1.1} speed={0.25} offset={2} mousePos={mousePos} />
      <FloatingRing position={[1.5, -3, -5]} rotation={[0.3, 0.7, 0.1]} scale={0.8} speed={0.3} offset={4} mousePos={mousePos} />

      {/* Glass orbs */}
      <Orb position={[5, 1.5, -3]} scale={0.5} color="#FFFBF0" speed={0.3} offset={0} mousePos={mousePos} />
      <Orb position={[-5, -0.5, -2]} scale={0.4} color="#FEF3C7" speed={0.25} offset={2} mousePos={mousePos} />
      <Orb position={[1, 3.5, -4]} scale={0.35} color="#FFFBF0" speed={0.35} offset={4} mousePos={mousePos} />
      <Orb position={[-2.5, -3.5, -3]} scale={0.3} color="#FEF3C7" speed={0.28} offset={1} mousePos={mousePos} />

      {/* Decorative small spheres */}
      {smallSpheres.map((sphere, i) => (
        <SmallSphere key={i} {...sphere} mousePos={mousePos} />
      ))}
    </group>
  )
}
