import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Scene from './components/3d/Scene';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-sans">
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="h-screen w-full"
          >
            <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
              <div className="text-3xl font-black tracking-tighter pointer-events-auto cursor-pointer">SŌM</div>
              <div className="text-xs uppercase tracking-[0.4em] font-bold pointer-events-auto">Experience 2026</div>
            </nav>
            
            <Scene />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
