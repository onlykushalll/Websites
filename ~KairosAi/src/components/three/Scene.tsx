'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Light theme lighting — brighter for light bg */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} color="#7C5CFC" />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} color="#5CB8FC" />
        <hemisphereLight args={['#ffffff', '#f0f0f0', 0.4]} />
        <pointLight position={[0, 5, -6]} intensity={0.5} color="#FC5C8C" />
        <pointLight position={[4, -3, 4]} intensity={0.2} color="#7C5CFC" />

        {/* Studio environment for reflections */}
        <Environment preset="city" environmentIntensity={0.3} />

        {children}

        {/* Post-processing — subtle bloom + vignette for light bg */}
        <EffectComposer multisampling={4}>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.8}
            luminanceSmoothing={1.0}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.15} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
