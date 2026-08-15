import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/audio';

interface FairyLightsProps {
  isOn: boolean;
  onHoverAnyBulb?: () => void;
}

const BULB_COLORS = [
  { main: '#FF6B81', glow: 'rgba(255, 107, 129, 0.85)', dark: '#522028' }, // Pink
  { main: '#FFA502', glow: 'rgba(255, 165, 2, 0.85)', dark: '#4a3205' },   // Warm Yellow
  { main: '#2ED573', glow: 'rgba(46, 213, 115, 0.85)', dark: '#0c381c' }, // Mint Green
  { main: '#1E90FF', glow: 'rgba(30, 144, 255, 0.85)', dark: '#0a2a4f' }, // Sky Blue
  { main: '#FF4757', glow: 'rgba(255, 71, 87, 0.85)', dark: '#4d141b' },   // Crimson
  { main: '#9B59B6', glow: 'rgba(155, 89, 182, 0.85)', dark: '#311a3d' }, // Purple
  { main: '#FFC048', glow: 'rgba(255, 192, 72, 0.85)', dark: '#4f3c0e' }, // Amber
  { main: '#26DE81', glow: 'rgba(38, 222, 129, 0.85)', dark: '#0c3b20' }, // Green
  { main: '#70A1FF', glow: 'rgba(112, 161, 255, 0.85)', dark: '#1e2f52' }, // Soft Blue
  { main: '#FF7F50', glow: 'rgba(255, 127, 80, 0.85)', dark: '#451e12' },  // Coral
  { main: '#FF6B81', glow: 'rgba(255, 107, 129, 0.85)', dark: '#522028' }, // Pink
  { main: '#FFA502', glow: 'rgba(255, 165, 2, 0.85)', dark: '#4a3205' },   // Yellow
];

export const FairyLights: React.FC<FairyLightsProps> = ({ isOn }) => {
  const [hoveredBulb, setHoveredBulb] = useState<number | null>(null);

  const handleBulbHover = (idx: number) => {
    setHoveredBulb(idx);
    soundManager.playHeartPop();
  };

  return (
    <div id="fairy-lights-garland" className="absolute top-0 left-0 right-0 z-30 pointer-events-auto select-none">
      {/* Curved Garland Wire SVG */}
      <svg
        className="w-full h-12 text-stone-700/60 pointer-events-none"
        viewBox="0 0 1200 48"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,8 Q 150,28 300,8 Q 450,28 600,8 Q 750,28 900,8 Q 1050,28 1200,8"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Hanging Bulbs */}
      <div className="absolute top-1 left-0 right-0 flex justify-around px-2 sm:px-6">
        {BULB_COLORS.map((color, index) => {
          const sagOffset = Math.sin((index / BULB_COLORS.length) * Math.PI * 4) * 6;
          const isBulbLit = isOn || hoveredBulb === index;
          
          return (
            <div
              key={index}
              className="relative flex flex-col items-center cursor-pointer group"
              style={{ marginTop: `${Math.max(0, sagOffset)}px` }}
              onMouseEnter={() => handleBulbHover(index)}
              onMouseLeave={() => setHoveredBulb(null)}
              onClick={() => handleBulbHover(index)}
              title="Hover to light up bulb ✨"
            >
              {/* Cap / Socket */}
              <div className="w-2.5 h-2 bg-stone-800 rounded-t-sm" />

              {/* Glowing Bulb */}
              <motion.div
                animate={
                  isBulbLit
                    ? {
                        opacity: [0.85, 1, 0.85],
                        scale: hoveredBulb === index ? 1.25 : [0.98, 1.04, 0.98],
                      }
                    : {
                        opacity: 0.25,
                        scale: 0.95,
                      }
                }
                whileHover={{ scale: 1.3, rotate: [0, -5, 5, 0] }}
                transition={{
                  repeat: hoveredBulb === index ? 0 : Infinity,
                  duration: 2 + (index % 3) * 0.4,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                }}
                className="w-4 h-6 sm:w-5 sm:h-7 rounded-b-full rounded-t-sm transition-all duration-300 relative"
                style={{
                  backgroundColor: isBulbLit ? color.main : color.dark,
                  boxShadow: isBulbLit
                    ? `0 0 20px 6px ${color.glow}, inset 0 0 6px rgba(255,255,255,0.8)`
                    : 'none',
                }}
              >
                {/* Filament shine */}
                {isBulbLit && (
                  <div className="w-1.5 h-2.5 bg-white/80 rounded-full mx-auto mt-1 blur-[0.5px]" />
                )}

                {/* Hover sparkle effect */}
                {hoveredBulb === index && (
                  <div className="absolute -top-3 -right-2 text-xs animate-ping">✨</div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

