import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, ScrollControls, Scroll } from '@react-three/drei';
import BeverageCan from './BeverageCan';
import Hero from '../Hero';
import Benefits from '../Benefits';
import Ingredients from '../Ingredients';
import Waitlist from '../Waitlist';
import Footer from '../Footer';

const Scene = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 35 }}>
        <color attach="background" args={['#000']} />
        
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <rectAreaLight width={10} height={10} position={[-5, 5, 5]} intensity={10} color="#fff" />
        <rectAreaLight width={10} height={10} position={[5, -5, 5]} intensity={5} color="#444" />

        <Suspense fallback={null}>
          <ScrollControls pages={6.2} damping={0.2}>
            {/* 3D Content */}
            <BeverageCan />
            <Environment preset="night" />
            <ContactShadows 
              position={[0, -3.5, 0]} 
              opacity={0.5} 
              scale={20} 
              blur={2.5} 
              far={5} 
            />

            {/* DOM Content synced with scroll */}
            <Scroll html>
              <div className="w-screen">
                <Hero />
                <Benefits />
                <Ingredients />
                <Waitlist />
                <Footer />
              </div>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
