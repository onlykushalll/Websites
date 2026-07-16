'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 2000

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aSpeed;
  attribute vec3 aColor;
  attribute float aOffset;

  uniform float uTime;
  uniform vec2 uMouse;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float t = uTime * aSpeed + aOffset;

    // Curl-like motion
    pos.x += sin(t * 0.7 + position.y * 0.5) * 0.4;
    pos.y += cos(t * 0.5 + position.z * 0.3) * 0.3;
    pos.z += sin(t * 0.6 + position.x * 0.4) * 0.25;

    // Mouse repulsion — particles swirl away from cursor
    vec2 toMouse = pos.xy - uMouse * 8.0;
    float mouseDist = length(toMouse);
    float repulsion = smoothstep(3.0, 0.0, mouseDist) * 0.8;
    pos.xy += normalize(toMouse) * repulsion;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float sizeAtten = 400.0 / -mvPosition.z;
    gl_PointSize = max(aSize * sizeAtten, 0.5);
    gl_Position = projectionMatrix * mvPosition;

    vColor = aColor;
    // Fade based on distance from center
    float distFromCenter = length(position) / 12.0;
    vAlpha = smoothstep(1.0, 0.3, distFromCenter) * 0.7;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft circular particle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
    
    // Slight glow at center
    vec3 color = vColor + vec3(0.1) * smoothstep(0.3, 0.0, dist);

    gl_FragColor = vec4(color, alpha);
  }
`

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
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

  const { positions, sizes, speeds, colors, offsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const speeds = new Float32Array(PARTICLE_COUNT)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const offsets = new Float32Array(PARTICLE_COUNT)

    const palette = [
      [0.77, 0.66, 0.51], // Champagne gold
      [0.72, 0.72, 0.78], // Platinum
      [0.55, 0.49, 0.78], // Lilac
      [0.42, 0.72, 0.88], // Ice blue
      [0.83, 0.72, 0.59], // Light champagne
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute in a large sphere volume
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.pow(Math.random(), 0.5) * 12

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi) - 2

      sizes[i] = Math.random() * 3 + 0.5
      speeds[i] = Math.random() * 0.4 + 0.1
      offsets[i] = Math.random() * Math.PI * 2

      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color[0]
      colors[i * 3 + 1] = color[1]
      colors[i * 3 + 2] = color[2]
    }

    return { positions, sizes, speeds, colors, offsets }
  }, [])

  const shaderUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      materialRef.current.uniforms.uMouse.value.set(mousePos.x, mousePos.y)
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={PARTICLE_COUNT} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} count={PARTICLE_COUNT} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} count={PARTICLE_COUNT} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} count={PARTICLE_COUNT} />
        <bufferAttribute attach="attributes-aOffset" args={[offsets, 1]} count={PARTICLE_COUNT} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={shaderUniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
