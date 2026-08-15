import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  scale: number;
}

export default function FloatingHearts({ active = true }: { active?: boolean }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (!active) {
      setHearts([]);
      return;
    }

    const initialHearts: Heart[] = Array.from({ length: 25 }).map((_, i) => createHeart(i));
    setHearts(initialHearts);

    const interval = setInterval(() => {
      setHearts((prev) => {
        const keeps = prev.filter((h) => h.y > -100);
        return [...keeps, createHeart(Date.now())];
      });
    }, 450);

    return () => clearInterval(interval);
  }, [active]);

  function createHeart(id: number): Heart {
    const colors = [
      'text-rose-400', 'text-rose-500', 'text-pink-400', 
      'text-pink-500', 'text-red-400', 'text-red-500', 
      'text-rose-300', 'text-pink-300'
    ];
    return {
      id,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: 15 + Math.random() * 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      duration: 3 + Math.random() * 4,
      scale: 0.5 + Math.random() * 0.8,
    };
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              x: `${heart.x}%`, 
              y: `100%`, 
              opacity: 0, 
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              y: `-10vh`, 
              opacity: [0, 0.9, 0.9, 0],
              scale: heart.scale,
              rotate: Math.random() * 360 - 180,
              x: `${heart.x + (Math.sin(heart.id) * 8)}%`
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'absolute', 
              fontSize: `${heart.size}px` 
            }}
            className={`${heart.color} drop-shadow-sm`}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
