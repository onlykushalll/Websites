import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function SerumBottle({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.35, 0.4, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#E8C7C8"
          transmission={0.9}
          thickness={1.2}
          roughness={0.05}
          ior={1.6}
          transparent
          opacity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 32]} />
        <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.1} clearcoat={1.0} />
      </mesh>
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.25, 32]} />
        <meshPhysicalMaterial color="#D4AF37" metalness={1} roughness={0.05} clearcoat={1.0} />
      </mesh>
    </group>
  );
}

function Lipstick({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/models/lipstick.glb');
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness, 0.15);
          child.material.metalness = Math.min(child.material.metalness, 0.95);
        }
      }
    });

    // Auto-center and normalize scale dynamically
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      clonedScene.scale.setScalar(1.6 / maxDim);
    }
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.sub(center);
  }, [clonedScene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + 1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} />
    </group>
  );
}

function Compact({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.45 + 2) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0.2, 0.5, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 64]} />
        <meshPhysicalMaterial color="#D4AF37" metalness={0.95} roughness={0.15} clearcoat={1.0} />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.01, 64]} />
        <meshPhysicalMaterial color="#F9F8F6" metalness={0.95} roughness={0.02} />
      </mesh>
      <mesh position={[0, 0.4, -0.3]} rotation={[0.8, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 64]} />
        <meshPhysicalMaterial color="#EADDCD" metalness={0.1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function PerfumeBottle({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/models/perfume_bottle.glb');
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          // Enhance materials of imported perfume bottle to look glassmorphic/luxurious
          if (child.material.name?.toLowerCase().includes('glass') || child.material.transmission > 0) {
            child.material.transmission = 0.9;
            child.material.thickness = 1.5;
            child.material.roughness = 0.05;
            child.material.ior = 1.6;
          }
        }
      }
    });

    // Auto-center and normalize scale dynamically
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      clonedScene.scale.setScalar(1.5 / maxDim);
    }
    const center = box.getCenter(new THREE.Vector3());
    clonedScene.position.sub(center);
  }, [clonedScene]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + 3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} />
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#D4AF37" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function SceneContent() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    targetRef.current.x += (mouseRef.current.x * 0.5 - targetRef.current.x) * 0.03;
    targetRef.current.y += (mouseRef.current.y * 0.3 - targetRef.current.y) * 0.03;
    camera.position.x = targetRef.current.x;
    camera.position.y = targetRef.current.y;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#F9F8F6" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#E8C7C8" />
      <spotLight position={[0, 8, 0]} angle={0.5} penumbra={1} intensity={1} castShadow color="#F9F8F6" />
      <Lipstick position={[1.2, -0.3, 0.5]} />
      <PerfumeBottle position={[-1.2, 0.2, 0.0]} />
      <FloatingParticles />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial color="#F9F8F6" metalness={0.3} roughness={0.8} />
      </mesh>
    </>
  );
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-ivory">
      <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
    </div>
  );
}

export default function HeroScene() {
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power3.out' }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6');
    }

    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    }

    return () => { tl.kill(); };
  }, []);

  const brandName = 'AURA';

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-ivory">
      <div className="absolute inset-0 z-10">
        <Suspense fallback={<SceneFallback />}>
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
          >
            <SceneContent />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div ref={textRef} className="overflow-hidden">
          <h1 className="font-serif text-[15vw] md:text-[12vw] lg:text-[10vw] font-medium tracking-tight text-charcoal/90 leading-none">
            {brandName.split('').map((char, i) => (
              <span key={i} className="char inline-block" style={{ opacity: 0 }}>{char}</span>
            ))}
          </h1>
        </div>
        <div ref={subtitleRef} className="mt-6 opacity-0">
          <p className="text-sm md:text-base uppercase tracking-[0.4em] text-charcoal/60 font-light">The Art of Radiance</p>
        </div>
        <div ref={ctaRef} className="mt-10 opacity-0 pointer-events-auto">
          <button className="group relative px-8 py-4 border border-charcoal/30 rounded-full overflow-hidden transition-all duration-500 hover:border-charcoal">
            <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-medium text-charcoal group-hover:text-ivory transition-colors duration-500">Discover Collection</span>
            <div className="absolute inset-0 bg-charcoal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent z-30 pointer-events-none" />
    </section>
  );
}
