import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Preload GLB model to prevent latency
useGLTF.preload('/cool-ayyd_soda_can.glb')

function Model({ targetHeight = 3.5 }: { targetHeight?: number }) {
  const { scene } = useGLTF('/cool-ayyd_soda_can.glb')
  
  // Calculate bounding box and scale factor to normalize height to targetHeight units
  const scaleFactor = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const currentHeight = size.y
    return currentHeight > 0 ? targetHeight / currentHeight : 1.0
  }, [scene, targetHeight])

  // Center pivot point of the model so it rotates cleanly on its center axis
  const centeredGroup = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    
    const wrapper = new THREE.Group()
    const inner = scene.clone()
    inner.position.set(-center.x, -center.y, -center.z)
    wrapper.add(inner)
    wrapper.scale.setScalar(scaleFactor)
    return wrapper
  }, [scene, scaleFactor])

  // Optimize materials inside GLB for maximum visual quality
  centeredGroup.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      
      const mesh = child as THREE.Mesh
      if (mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.metalness = 0.98
        mat.roughness = 0.04 // Highly glossy, clear, unblurred reflections
        mat.envMapIntensity = 3.5 // Boost environment reflections for maximum realism
      }
    }
  })

  return <primitive object={centeredGroup} />
}


function EnergyCan() {
  const canRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!canRef.current) return
    const t = state.clock.getElapsedTime()
    const scrollY = window.scrollY
    const height = window.innerHeight || 800
    const ratio = scrollY / height

    const { width: vpWidth } = state.viewport
    const isMobile = vpWidth < 6 // Check if screen width is narrow in 3D units

    // Smooth spin based on time + scroll
    canRef.current.rotation.y = t * 0.35 + scrollY * 0.0035

    // Scroll-bound transitions across the 6 sections
    let targetX = 0
    let targetY = -0.3
    let targetZ = 0
    let targetScale = 1.45 

    if (isMobile) {
      // Mobile/Tablet responsive layout: Center can and reduce scale to avoid overlapping copy
      targetX = 0
      targetY = -0.2
      targetZ = 0
      
      if (ratio < 0.8) {
        targetScale = 1.0
      } else if (ratio < 1.8) {
        targetScale = 0.8
      } else if (ratio < 2.8) {
        targetScale = 0.8
      } else if (ratio < 3.8) {
        targetScale = 1.1
        targetZ = 1.0
      } else if (ratio < 4.8) {
        targetScale = 0.85
      } else {
        targetScale = 0.9
      }
    } else {
      // Desktop layout: Full parallax offsets and bold sizing
      if (ratio < 0.8) {
        targetX = 0
        targetY = -0.3
        targetScale = 1.45
      } else if (ratio < 1.8) {
        targetX = 2.0
        targetY = 0
        targetScale = 1.15
      } else if (ratio < 2.8) {
        targetX = -2.0
        targetY = 0.1
        targetScale = 1.15
      } else if (ratio < 3.8) {
        targetX = 0
        targetY = -0.1
        targetZ = 1.8
        targetScale = 1.65
      } else if (ratio < 4.8) {
        targetX = 2.0
        targetY = 0
        targetScale = 1.2
      } else {
        targetX = -2.0
        targetY = 0
        targetScale = 1.3
      }
    }

    // Floating animation
    const floatY = Math.sin(t * 1.2) * 0.1

    // Mouse parallax offset (adds subtle movement based on mouse pointer)
    const mouseX = state.pointer.x * 0.4
    const mouseY = state.pointer.y * 0.4

    // Apply Lerp transitions with mouse parallax offsets
    canRef.current.position.x = THREE.MathUtils.lerp(canRef.current.position.x, targetX + mouseX, 0.08)
    canRef.current.position.y = THREE.MathUtils.lerp(canRef.current.position.y, targetY + floatY + mouseY, 0.08)
    canRef.current.position.z = THREE.MathUtils.lerp(canRef.current.position.z, targetZ, 0.08)
    
    const currentScale = canRef.current.scale.x
    canRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.08))
    
    // Dynamic tilt based on mouse offset
    canRef.current.rotation.z = THREE.MathUtils.lerp(canRef.current.rotation.z, Math.sin(t * 0.6) * 0.03 - mouseX * 0.08, 0.08)
    canRef.current.rotation.x = THREE.MathUtils.lerp(canRef.current.rotation.x, mouseY * 0.08, 0.08)
  })

  return (
    <group ref={canRef}>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.25}>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Float>
    </group>
  )
}




export default function HeroCanvas({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 50 } as any}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 5]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-5, 5, 2]} intensity={1.5} color="#7000ff" />
        <directionalLight position={[0, -5, 5]} intensity={0.8} color="#ffffff" />
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
        <EnergyCan />
      </Canvas>
    </div>
  )
}



