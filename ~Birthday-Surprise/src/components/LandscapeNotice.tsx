import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Smartphone, Monitor } from 'lucide-react';

interface LandscapeNoticeProps {
  onForceLandscape?: () => void;
  isSimulatedLandscape?: boolean;
}

export const LandscapeNotice: React.FC<LandscapeNoticeProps> = ({
  onForceLandscape,
  isSimulatedLandscape
}) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // If mobile width < 768 and height > width
      const isMobile = window.innerWidth < 768;
      const portrait = isMobile && window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait || dismissed || isSimulatedLandscape) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        id="landscape-orientation-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#1e1322]/95 backdrop-blur-md text-white flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="max-w-xs flex flex-col items-center space-y-5">
          {/* Animated Rotating Phone */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 90, 90, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              className="text-pink-400 p-4 bg-pink-500/10 rounded-2xl border border-pink-500/30"
            >
              <Smartphone className="w-12 h-12" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 text-amber-300"
            >
              <RotateCw className="w-6 h-6 animate-spin" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-pink-200 font-serif-display">
              Rotate to Landscape
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed font-sans-ui">
              For the most magical, movie-like surprise experience, please turn your phone sideways 🔄✨
            </p>
          </div>

          <div className="flex flex-col w-full gap-2.5 pt-2">
            <button
              id="btn-dismiss-landscape-warning"
              onClick={() => setDismissed(true)}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-medium text-sm rounded-full shadow-lg shadow-pink-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Continue in Portrait</span>
            </button>
            {onForceLandscape && (
              <button
                id="btn-simulate-landscape"
                onClick={() => {
                  setDismissed(true);
                  onForceLandscape();
                }}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/15 text-stone-200 text-xs rounded-full border border-white/10 transition-all flex items-center justify-center gap-1.5"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Simulate Landscape Canvas</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
