import { useState, useEffect, Key } from 'react';
import { motion } from 'motion/react';

interface CatGifProps {
  key?: Key;
  primaryUrl: string;
  fallbacks?: string[];
  alt?: string;
  className?: string;
}

export default function CatGif({ primaryUrl, fallbacks = [], alt = "Valentine Cat", className = "" }: CatGifProps) {
  const [sources, setSources] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedAll, setFailedAll] = useState(false);

  useEffect(() => {
    const all = [primaryUrl, ...fallbacks].filter(Boolean);
    setSources(all);
    setCurrentIndex(0);
    setFailedAll(false);
  }, [primaryUrl, JSON.stringify(fallbacks)]);

  const handleError = () => {
    if (currentIndex + 1 < sources.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFailedAll(true);
    }
  };

  if (failedAll || sources.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 bg-rose-100/60 rounded-2xl text-rose-500 font-bold ${className}`}>
        <motion.div 
          animate={{ scale: [1, 1.08, 1], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative w-36 h-36 flex items-center justify-center"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <path d="M25 45 C25 25, 45 25, 45 45 C45 65, 25 65, 25 45 Z" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2" />
            <polygon points="25,30 20,15 32,25" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2" />
            <polygon points="42,28 47,13 38,22" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2" />
            <ellipse cx="30" cy="42" rx="2" ry="3" fill="#1E293B" />
            <ellipse cx="40" cy="42" rx="2" ry="3" fill="#1E293B" />
            <ellipse cx="28" cy="46" rx="3" ry="2" fill="#FDA4AF" />
            <ellipse cx="42" cy="46" rx="3" ry="2" fill="#FDA4AF" />

            <path d="M50 48 C50 28, 70 28, 70 48 C70 68, 50 68, 50 48 Z" fill="#FFEDD5" stroke="#F43F5E" strokeWidth="2" />
            <polygon points="52,32 48,17 60,26" fill="#FFEDD5" stroke="#F43F5E" strokeWidth="2" />
            <polygon points="68,30 73,15 64,24" fill="#FFEDD5" stroke="#F43F5E" strokeWidth="2" />
            <ellipse cx="58" cy="44" rx="2" ry="3" fill="#1E293B" />
            <ellipse cx="66" cy="44" rx="2" ry="3" fill="#1E293B" />
            <ellipse cx="55" cy="48" rx="3" ry="2" fill="#FDA4AF" />
            <ellipse cx="68" cy="48" rx="3" ry="2" fill="#FDA4AF" />

            <path d="M45 20 C45 15, 50 12, 53 17 C56 12, 61 15, 61 20 C61 26, 53 30, 53 30 C53 30, 45 26, 45 20 Z" fill="#E11D48" />
          </svg>
        </motion.div>
        <span className="text-xs text-rose-600 font-semibold mt-1">🐱 Peach & Goma 💕</span>
      </div>
    );
  }

  return (
    <img
      src={sources[currentIndex]}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
