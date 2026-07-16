/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { COMPANY } from '../lib/constants';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    mouseX.set(x);
    mouseY.set(y);
  };

  const textTranslateX = useTransform(smoothX, (value) => value * -0.2);
  const textTranslateY = useTransform(smoothY, (value) => value * -0.2);

  return (
    <section 
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center pt-40 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 flex flex-col items-center justify-center relative z-10 text-center">
        <motion.div 
          style={{ x: textTranslateX, y: textTranslateY }}
          className="w-full relative z-20 flex flex-col items-center"
        >
          <div className="relative mb-4">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[25vw] md:text-[20vw] font-black leading-[0.8] tracking-tighter text-display-gradient uppercase pointer-events-none select-none"
              >
                DCOZI
              </motion.h1>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-2xl mt-12"
          >
            <div className="flex items-center justify-center gap-6">
              <div className="h-[1px] w-12 bg-slate-300 opacity-40" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-900 whitespace-nowrap">{COMPANY.location}</span>
              <div className="h-[1px] w-12 bg-slate-300 opacity-40" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
