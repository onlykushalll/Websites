import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const BeverageCan = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const offset = scroll.offset;
    
    // Smooth rotation based on scroll
    groupRef.current.rotation.y = offset * Math.PI * 6;
    
    // Position and Scale transitions
    if (offset < 0.2) {
      // Hero: Center & Large
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.5, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.2, 0.1));
    } else if (offset < 0.45) {
      // Benefits: Left & Smaller
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -2.5, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.9, 0.1));
    } else if (offset < 0.7) {
      // Ingredients: Right & Zoomed
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 2.5, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.2, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.35, 0.1));
    } else {
      // Waitlist: Center & Dramatic
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.5, 0.1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1.5, 0.1));
    }

    // Floating effect
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y += Math.sin(t * 1.5) * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Can Body */}
        <mesh castShadow>
          <cylinderGeometry args={[1, 1, 3.2, 64]} />
          <meshStandardMaterial 
            color="#050505" 
            metalness={1} 
            roughness={0.05} 
            envMapIntensity={2}
          />
        </mesh>

        {/* Top Cap */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[1.02, 0.9, 0.15, 64]} />
          <meshStandardMaterial color="#444" metalness={1} roughness={0.1} />
        </mesh>

        {/* Bottom Cap */}
        <mesh position={[0, -1.6, 0]}>
          <cylinderGeometry args={[0.9, 1.02, 0.15, 64]} />
          <meshStandardMaterial color="#444" metalness={1} roughness={0.1} />
        </mesh>

        {/* Brand Text */}
        <Text
          position={[0, 0, 1.01]}
          fontSize={0.7}
          color="white"
          fontWeight="900"
          anchorX="center"
          anchorY="middle"
        >
          SŌM
        </Text>
        
        <Text
          position={[0, -0.6, 1.01]}
          fontSize={0.12}
          color="white"
          fontWeight="500"
          letterSpacing={0.3}
          anchorX="center"
          anchorY="middle"
        >
          STATE OF MIND
        </Text>
      </Float>
    </group>
  );
};

export default BeverageCan;
