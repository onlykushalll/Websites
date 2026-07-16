'use client'

import React from 'react'
import Scene from '@/components/three/Scene'
import KairosOrb from '@/components/three/KairosOrb'
import CameraRig from '@/components/three/CameraRig'

// ═══════════════════════════════════════════════
// WebGL Error Boundary — catches WebGL context creation failures
// so the page still renders even if WebGL isn't available
// ═══════════════════════════════════════════════
class WebGLBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.warn('WebGL failed to initialize:', error.message, info)
  }

  render() {
    if (this.state.hasError) {
      return null // Graceful fallback — just don't render 3D
    }
    return this.props.children
  }
}

export default function SceneWrapper() {
  return (
    <WebGLBoundary>
      <Scene>
        <CameraRig />
        <KairosOrb />
      </Scene>
    </WebGLBoundary>
  )
}
