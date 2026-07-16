import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 pointer-events-none">
      <div className="text-center max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18vw] md:text-[15vw] font-black leading-[0.8] tracking-tighter uppercase mix-blend-difference"
        >
          SŌM<br />STATE
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <p className="text-sm md:text-base font-bold uppercase tracking-[0.5em] text-white/50">
            Engineered for the modern mind
          </p>
          <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-20" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
