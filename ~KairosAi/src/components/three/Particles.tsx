'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  const { positions, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2

      sizes[i] = Math.random() * 4 + 1
      speeds[i] = Math.random() * 0.5 + 0.1
    }

    return { positions, sizes, speeds }
  }, [count])

  const shaderUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#D4A853') },
      uColor2: { value: new THREE.Color('#F59E0B') },
      uColor3: { value: new THREE.Color('#FDE68A') },
    }),
    []
  )

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
          count={count}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={shaderUniforms}
        vertexShader={`
          attribute float aSize;
          attribute float aSpeed;
          uniform float uTime;
          varying float vAlpha;
          varying float vColorMix;

          void main() {
            vec3 pos = position;
            pos.x += sin(uTime * aSpeed + position.y * 0.5) * 0.3;
            pos.y += cos(uTime * aSpeed * 0.8 + position.x * 0.3) * 0.2;
            pos.z += sin(uTime * aSpeed * 0.5 + position.x * 0.2) * 0.15;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * (400.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;

            vAlpha = smoothstep(0.0, 0.5, aSize / 5.0) * 0.8;
            vColorMix = sin(position.x * 0.5 + uTime * 0.1) * 0.5 + 0.5;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying float vAlpha;
          varying float vColorMix;

          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;

            float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;

            vec3 color = mix(uColor1, uColor2, vColorMix);
            color = mix(color, uColor3, smoothstep(0.3, 0.7, vColorMix));

            gl_FragColor = vec4(color, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
