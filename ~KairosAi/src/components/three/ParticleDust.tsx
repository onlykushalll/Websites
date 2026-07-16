'use client'

import { Sparkles } from '@react-three/drei'

// ═══════════════════════════════════════════════════════════════
// LIGHT THEME SPARKLE PARTICLES — Subtle Violet/Cyan/Pink dust
// Reduced for light bg — smaller, subtler, better performance
// ═══════════════════════════════════════════════════════════════

export default function ParticleDust() {
  return (
    <group>
      {/* Violet sparkles */}
      <Sparkles
        count={40}
        scale={[18, 14, 8]}
        size={2}
        speed={0.3}
        color="#7C5CFC"
        opacity={0.15}
      />
      {/* Cyan sparkles */}
      <Sparkles
        count={25}
        scale={[14, 10, 6]}
        size={1.5}
        speed={0.2}
        color="#5CB8FC"
        opacity={0.1}
      />
      {/* Pink sparkles */}
      <Sparkles
        count={15}
        scale={[10, 8, 5]}
        size={1}
        speed={0.15}
        color="#FC5C8C"
        opacity={0.08}
      />
    </group>
  )
}
