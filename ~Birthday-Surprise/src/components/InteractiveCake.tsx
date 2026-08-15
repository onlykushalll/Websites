import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Wind } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InteractiveCakeProps {
  onCutComplete: () => void;
  recipientName?: string;
}

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  onCutComplete,
  recipientName = 'Birthday Girl'
}) => {
  const [candleBlown, setCandleBlown] = useState(false);
  const [cutProgress, setCutProgress] = useState(0); // 0 to 100
  const [isCutting, setIsCutting] = useState(false);
  const [isCutComplete, setIsCutComplete] = useState(false);
  const [smokePuff, setSmokePuff] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const smokeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cutCompleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (smokeTimeoutRef.current) clearTimeout(smokeTimeoutRef.current);
      if (cutCompleteTimeoutRef.current) clearTimeout(cutCompleteTimeoutRef.current);
    };
  }, []);

  // Handle Candle Blow Out
  const handleBlowCandle = () => {
    if (candleBlown) return;
    soundManager.playCandleBlow();
    setCandleBlown(true);
    setSmokePuff(true);
    if (smokeTimeoutRef.current) clearTimeout(smokeTimeoutRef.current);
    smokeTimeoutRef.current = setTimeout(() => setSmokePuff(false), 2000);
  };

  // Handle Drag Cutting
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isCutComplete) return;
    setIsCutting(true);
    startXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isCutting || isCutComplete || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX;
    const progress = Math.min(100, Math.max(0, ((currentX - rect.left) / rect.width) * 100));

    // Play subtle slice sound effect occasionally
    if (Math.abs(progress - cutProgress) > 15) {
      soundManager.playKnifeSlice();
    }

    setCutProgress(progress);

    if (progress >= 88 && !isCutComplete) {
      completeCut();
    }
  };

  const handlePointerUp = () => {
    setIsCutting(false);
    if (cutProgress < 85 && !isCutComplete) {
      // Don't reset to zero immediately, keep progress so it's friendly
    }
  };

  const completeCut = () => {
    if (isCutComplete) return;
    setIsCutComplete(true);
    setCutProgress(100);
    soundManager.playConfettiPop();

    // Launch celebratory confetti burst!
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#FF6B81', '#FFA502', '#2ED573', '#1E90FF', '#FD79A8', '#FFEAA7'],
    });

    if (cutCompleteTimeoutRef.current) clearTimeout(cutCompleteTimeoutRef.current);
    cutCompleteTimeoutRef.current = setTimeout(() => {
      onCutComplete();
    }, 1400);
  };

  return (
    <motion.div
      layout
      id="interactive-cake-stage"
      className="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 py-2 select-none"
    >
      {/* Step Header */}
      <div className="text-center space-y-1 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cake Time 🎂</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-800 dark:text-stone-100">
          Cut the cake & make a wish
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans-ui max-w-md mx-auto">
          {!candleBlown
            ? 'Tap the glowing candle flame to blow it out first! 🕯️'
            : 'Now drag across the highlighted path to slice your cake ✨'}
        </p>
      </div>

      {/* Interactive Cake Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full max-w-[340px] sm:max-w-[400px] h-[210px] sm:h-[240px] flex items-center justify-center cursor-ew-resize touch-none"
      >
        {/* Cake Stand Base */}
        <div className="absolute bottom-2 w-64 sm:w-72 h-4 bg-stone-300 dark:bg-stone-700 rounded-full shadow-md" />
        <div className="absolute bottom-0 w-28 sm:w-32 h-2.5 bg-stone-400 dark:bg-stone-600 rounded-b-md" />

        {/* The Birthday Cake Body */}
        <div className="relative w-56 sm:w-64 h-36 sm:h-40 flex flex-col items-center justify-end mb-3">
          
          {/* Cake Candle & Flame */}
          <div
            onClick={handleBlowCandle}
            className="absolute -top-12 z-20 flex flex-col items-center cursor-pointer group"
            title={candleBlown ? 'Candle is blown!' : 'Click to blow candle'}
          >
            {/* Flame */}
            <AnimatePresence>
              {!candleBlown ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="relative w-4 h-6 mb-0.5 animate-flame"
                >
                  {/* Outer flame */}
                  <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full rounded-t-full shadow-[0_0_16px_#f59e0b]" />
                  {/* Inner flame core */}
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-blue-300 rounded-full blur-[0.5px]" />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Smoke Puff when blown */}
            {smokePuff && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -24, scale: 1.5 }}
                transition={{ duration: 1.6 }}
                className="absolute -top-3 text-stone-400 dark:text-stone-300"
              >
                <Wind className="w-5 h-5 animate-pulse" />
              </motion.div>
            )}

            {/* Candle Wick */}
            <div className="w-0.5 h-2 bg-stone-700 dark:bg-stone-300" />
            
            {/* Candle Stick */}
            <div className="w-3 h-10 bg-gradient-to-r from-pink-300 via-white to-pink-300 rounded-t-sm shadow-sm border-t border-pink-400/50 flex flex-col justify-between py-1 items-center">
              <div className="w-2.5 h-0.5 bg-pink-400/60 rounded-full" />
              <div className="w-2.5 h-0.5 bg-pink-400/60 rounded-full" />
              <div className="w-2.5 h-0.5 bg-pink-400/60 rounded-full" />
            </div>
          </div>

          {/* Sliced Left Half Cake */}
          <motion.div
            animate={
              isCutComplete
                ? { x: -14, rotate: -2 }
                : { x: 0, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="absolute bottom-0 left-0 w-1/2 h-full overflow-hidden"
          >
            <div className="w-[224px] sm:w-[256px] h-full bg-[#fdf2f4] dark:bg-[#38222b] rounded-t-2xl border-2 border-pink-200 dark:border-pink-900/60 shadow-lg relative flex flex-col justify-between overflow-hidden">
              {/* Strawberry Glaze Top */}
              <div className="h-10 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-xl relative">
                {/* Frosting Drips */}
                <div className="absolute -bottom-2.5 left-0 right-0 flex justify-between px-1">
                  <div className="w-4 h-3 bg-rose-400 rounded-b-full shadow-sm" />
                  <div className="w-5 h-4 bg-rose-400 rounded-b-full shadow-sm" />
                  <div className="w-3.5 h-3 bg-rose-400 rounded-b-full shadow-sm" />
                  <div className="w-5 h-4.5 bg-rose-400 rounded-b-full shadow-sm" />
                </div>
              </div>

              {/* Cream Layer Inside */}
              <div className="w-full h-3 bg-white/90 dark:bg-pink-100/30 my-auto" />

              {/* Cherries / Sprinkles decoration */}
              <div className="absolute top-2 left-6 w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm" />
              <div className="absolute top-3 left-14 w-2 h-2 bg-amber-300 rounded-full rotate-45" />
              <div className="absolute top-2 left-20 w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm" />
            </div>
          </motion.div>

          {/* Sliced Right Half Cake */}
          <motion.div
            animate={
              isCutComplete
                ? { x: 14, rotate: 2 }
                : { x: 0, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="absolute bottom-0 right-0 w-1/2 h-full overflow-hidden"
          >
            <div className="w-[224px] sm:w-[256px] h-full -ml-[112px] sm:-ml-[128px] bg-[#fdf2f4] dark:bg-[#38222b] rounded-t-2xl border-2 border-pink-200 dark:border-pink-900/60 shadow-lg relative flex flex-col justify-between overflow-hidden">
              {/* Strawberry Glaze Top */}
              <div className="h-10 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-xl relative">
                {/* Frosting Drips */}
                <div className="absolute -bottom-2.5 left-0 right-0 flex justify-between px-1">
                  <div className="w-4 h-3 bg-rose-400 rounded-b-full shadow-sm" />
                  <div className="w-5 h-4 bg-rose-400 rounded-b-full shadow-sm" />
                  <div className="w-3.5 h-3 bg-rose-400 rounded-b-full shadow-sm" />
                  <div className="w-5 h-4.5 bg-rose-400 rounded-b-full shadow-sm" />
                </div>
              </div>

              {/* Cream Layer Inside */}
              <div className="w-full h-3 bg-white/90 dark:bg-pink-100/30 my-auto" />

              {/* Cherries / Sprinkles decoration */}
              <div className="absolute top-2 left-6 w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm" />
              <div className="absolute top-3 left-14 w-2 h-2 bg-amber-300 rounded-full rotate-45" />
              <div className="absolute top-2 left-20 w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm" />
            </div>
          </motion.div>

          {/* Interactive Drag-Cut Line Highlight */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 flex flex-col items-center justify-center pointer-events-none z-30">
            {/* Guide line */}
            <div className="w-0.5 h-full bg-dashed bg-gradient-to-b from-pink-400 via-rose-500 to-pink-400 opacity-60 border-l border-dashed border-pink-500" />
            
            {/* Knife / Slicer Cursor */}
            {!isCutComplete && (
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="absolute top-4 -right-3 text-2xl drop-shadow-md"
              >
                🔪
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Progress & Cut Cue */}
      <div className="w-full max-w-xs space-y-2 mt-1 text-center">
        {/* Live Cut Progress Bar */}
        <div className="relative w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden border border-stone-300/60 dark:border-stone-700">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 rounded-full"
            style={{ width: `${cutProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 font-medium px-1">
          <span>
            {isCutComplete ? (
              <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Perfectly Sliced!
              </span>
            ) : cutProgress > 0 ? (
              `Cut Progress: ${Math.round(cutProgress)}% ${cutProgress > 60 ? 'Almost there...' : 'Keep swiping!'}`
            ) : (
              '↔️ Swipe across the cake'
            )}
          </span>
          <button
            onClick={completeCut}
            className="text-pink-600 dark:text-pink-400 hover:underline text-[10px]"
          >
            Instant Cut ✨
          </button>
        </div>
      </div>
    </motion.div>
  );
};
