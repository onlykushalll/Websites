import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface Balloon {
  id: number;
  color: string;
  left: number;
  delay: number;
  size: number;
  speed: number;
  sway: number;
  label?: string;
}

const BALLOON_COLORS = [
  '#FF7675', // Coral pink
  '#74B9FF', // Sky blue
  '#FFEAA7', // Cream yellow
  '#55EFC4', // Mint
  '#A29BFE', // Soft lavender
  '#FD79A8', // Rose
  '#FDCB6E', // Warm Gold
  '#E84393', // Deep Pink
];

interface CelebrationBalloonsProps {
  active: boolean;
  recipientName?: string;
}

export const CelebrationBalloons: React.FC<CelebrationBalloonsProps> = ({
  active,
  recipientName = 'Bestie'
}) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (active) {
      soundManager.playBalloonWhoosh();

      // Launch confetti alongside balloons
      confetti({
        particleCount: 75,
        spread: 100,
        origin: { y: 0.85 },
        colors: ['#FF7675', '#74B9FF', '#FFEAA7', '#55EFC4', '#A29BFE', '#FD79A8'],
      });

      // Generate 16 balloons
      const newBalloons: Balloon[] = Array.from({ length: 16 }).map((_, i) => ({
        id: Date.now() + i,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        left: 5 + Math.random() * 90,
        delay: Math.random() * 1.8,
        size: 44 + Math.random() * 32,
        speed: 6 + Math.random() * 5,
        sway: 15 + Math.random() * 25,
        label: i === 2 ? `HBD ${recipientName}!` : i === 7 ? '💖' : i === 12 ? '✨' : undefined,
      }));

      setBalloons(newBalloons);
    }
  }, [active, recipientName]);

  const popBalloon = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playHeartPop();

    // Trigger mini burst at click point
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 60,
      origin: { x, y },
      colors: ['#FF7675', '#FD79A8', '#FFEAA7'],
    });

    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  if (!active || balloons.length === 0) return null;

  return (
    <div
      id="celebration-balloons-container"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    >
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', x: 0, opacity: 0.95 }}
            animate={{
              y: '-30vh',
              x: [0, b.sway, -b.sway, 0],
              opacity: [0.95, 1, 1, 0],
            }}
            transition={{
              y: { duration: b.speed, delay: b.delay, ease: 'easeOut' },
              x: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
              opacity: { duration: b.speed, delay: b.delay, times: [0, 0.1, 0.85, 1] },
            }}
            onClick={(e) => popBalloon(b.id, e)}
            className="absolute pointer-events-auto cursor-pointer flex flex-col items-center group transition-transform active:scale-90"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
            }}
          >
            {/* Balloon Body */}
            <div
              className="relative rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-lg shadow-black/10 flex items-center justify-center text-center transition-transform group-hover:scale-105"
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
                backgroundColor: b.color,
                boxShadow: `inset -6px -6px 12px rgba(0,0,0,0.15), inset 6px 6px 12px rgba(255,255,255,0.6), 0 8px 20px rgba(0,0,0,0.08)`,
              }}
            >
              {/* Highlight Shine */}
              <div className="absolute top-2 left-2.5 w-2.5 h-4 bg-white/70 rounded-full rotate-[-25deg] blur-[0.5px]" />
              
              {/* Balloon Text if any */}
              {b.label && (
                <span className="text-[10px] font-bold text-white drop-shadow-sm font-handwriting px-1 leading-tight select-none">
                  {b.label}
                </span>
              )}

              {/* Knot */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-sm"
                style={{ backgroundColor: b.color }}
              />
            </div>

            {/* String */}
            <svg
              className="w-4 h-12 -mt-0.5 text-stone-400/80"
              viewBox="0 0 16 48"
              fill="none"
            >
              <path
                d="M 8,0 Q 3,16 9,32 Q 5,40 8,48"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="2 1"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
