import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ArrowRight, Wand2, RotateCcw, X, ZoomIn, Shuffle } from 'lucide-react';
import { BirthdayData, MemoryPhoto } from '../types';
import { soundManager } from '../utils/audio';

interface HeartfeltLetterProps {
  data: BirthdayData;
  onRestart?: () => void;
  onOpenPersonalize?: () => void;
  onOpenFinalLove?: () => void;
}

export const HeartfeltLetter: React.FC<HeartfeltLetterProps> = ({
  data,
  onRestart,
  onOpenPersonalize,
  onOpenFinalLove,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [isFanned, setIsFanned] = useState(false);
  const [photoList, setPhotoList] = useState<MemoryPhoto[]>([]);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const defaultPhotos: MemoryPhoto[] = [
    {
      id: 'p1',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      caption: 'Main character energy ✨',
      rotation: -6,
      date: 'Memory 01'
    },
    {
      id: 'p2',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      caption: 'That radiant smile 🌸',
      rotation: 3,
      date: 'Memory 02'
    },
    {
      id: 'p3',
      url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
      caption: 'Pure sunshine moments ☀️',
      rotation: -3,
      date: 'Memory 03'
    },
    {
      id: 'p4',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
      caption: 'Forever best friends 💫',
      rotation: 7,
      date: 'Memory 04'
    }
  ];

  useEffect(() => {
    if (data.photos && data.photos.length > 0) {
      setPhotoList(data.photos);
    } else {
      setPhotoList(defaultPhotos);
    }
  }, [data.photos]);

  const handleShuffle = () => {
    soundManager.playSwitchClick();
    setPhotoList((prev) => {
      const copy = [...prev];
      // Rotate array items for instant tactile stack shuffle
      const first = copy.shift();
      if (first) copy.push(first);
      return copy;
    });
  };

  const handleMouseEnter = (photo: MemoryPhoto) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      soundManager.playChime();
      setSelectedPhoto(photo);
    }, 4500); // Auto zoom after 4.5s hover
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handlePhotoClick = (photo: MemoryPhoto) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    soundManager.playChime();
    setSelectedPhoto(photo);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  // Natural messy stack layout coordinates for up to 4 polaroids
  const stackConfigs = [
    { x: -110, y: 6, rot: -7, z: 1 },
    { x: -35, y: -4, rot: 2, z: 2 },
    { x: 45, y: 8, rot: -4, z: 3 },
    { x: 120, y: -2, rot: 8, z: 4 },
  ];

  const fannedConfigs = [
    { x: -160, y: -10, rot: -10, z: 4 },
    { x: -55, y: 2, rot: -3, z: 3 },
    { x: 55, y: 2, rot: 3, z: 3 },
    { x: 160, y: -10, rot: 10, z: 4 },
  ];

  return (
    <motion.div
      layout
      id="heartfelt-letter-container"
      className="flex flex-col items-center justify-center gap-6 w-full max-w-4xl mx-auto px-4 py-2 select-none relative"
    >
      {/* TOP / MAIN: Elegant Letter Window */}
      <motion.div
        layout
        className="w-full max-w-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border-2 border-stone-200/90 dark:border-stone-700/80 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Window Title Bar - Clean & Aesthetic */}
        <div className="bg-stone-100/90 dark:bg-stone-800/90 px-4 py-3 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/40" />
            <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/40" />
          </div>

          <div className="flex items-center gap-1.5 font-sans-ui text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-semibold tracking-wide">
            <span>💌</span>
            <span>{data.letterTitle || `A Birthday Letter for ${data.recipientName}`}</span>
          </div>

          <div className="flex items-center gap-1 text-pink-500">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* Note Content Area */}
        <div className="p-6 sm:p-8 max-h-[48vh] sm:max-h-[50vh] overflow-y-auto space-y-4 font-sans-ui text-stone-700 dark:text-stone-200 text-sm sm:text-base leading-relaxed">
          {/* Greeting */}
          <div className="border-b border-pink-100 dark:border-pink-950/60 pb-3">
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-pink-600 dark:text-pink-400">
              {data.letterGreeting || `Dear ${data.nickname || data.recipientName},`}
            </h3>
            <span className="text-xs text-stone-400 font-mono">
              Date: {data.birthdayDate || 'Today & Always'} • For: {data.recipientName}
            </span>
          </div>

          {/* Letter Body */}
          <div className="whitespace-pre-line text-stone-700 dark:text-stone-300 leading-relaxed font-sans-ui text-sm sm:text-base">
            {data.letterBody}
          </div>

          {/* Signoff */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-right">
            <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 dark:text-pink-400 whitespace-pre-line leading-tight">
              {data.letterSignoff || `Loads of love,\n${data.senderName}`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM: Aesthetic Messy Polaroid Cards Bundle */}
      <motion.div
        layout
        className="w-full max-w-2xl flex flex-col items-center gap-2 mt-1"
      >
        {/* Section Header with Shuffle & Status */}
        <div className="w-full flex items-center justify-between px-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>Memories Scrapbook ({photoList.length})</span>
            <span className="text-[10px] lowercase text-stone-400 font-normal hidden sm:inline">• hover or click to inspect</span>
          </div>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/80 dark:bg-stone-800/80 hover:bg-pink-50 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 hover:text-pink-600 rounded-full border border-stone-200/90 dark:border-stone-700 text-xs font-medium shadow-xs transition-all active:scale-95"
            title="Shuffle polaroid stack"
          >
            <Shuffle className="w-3 h-3 text-pink-500" />
            <span>Shuffle</span>
          </button>
        </div>

        {/* Messy Polaroid Bundle Stage */}
        <div
          onMouseEnter={() => setIsFanned(true)}
          onMouseLeave={() => {
            setIsFanned(false);
            handleMouseLeave();
          }}
          className="relative w-full h-56 sm:h-64 flex items-center justify-center overflow-visible py-4"
        >
          {photoList.slice(0, 4).map((photo, index) => {
            const config = isFanned
              ? (fannedConfigs[index] || { x: (index - 1.5) * 80, y: 0, rot: (index - 1.5) * 5, z: index + 1 })
              : (stackConfigs[index] || { x: (index - 1.5) * 50, y: 0, rot: photo.rotation || 0, z: index + 1 });

            return (
              <motion.div
                key={photo.id || index}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: config.x,
                  y: config.y,
                  rotate: config.rot,
                  zIndex: config.z,
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: 0,
                  y: -15,
                  zIndex: 30,
                  transition: { duration: 0.2 },
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 220 }}
                onMouseEnter={() => handleMouseEnter(photo)}
                onClick={() => handlePhotoClick(photo)}
                className="absolute cursor-pointer group"
                style={{ transformOrigin: 'bottom center' }}
              >
                {/* Washi Tape Header */}
                <div
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-4 sm:h-5 bg-pink-200/90 dark:bg-pink-800/80 backdrop-blur-xs z-20 shadow-xs border border-pink-300/60 rounded-xs transition-transform group-hover:scale-105"
                  style={{
                    transform: `translateX(-50%) rotate(${index % 2 === 0 ? '-3deg' : '3deg'})`,
                  }}
                />

                {/* Polaroid Frame */}
                <div className="w-36 sm:w-44 bg-white dark:bg-stone-800 p-2.5 sm:p-3 pb-3.5 sm:pb-4 rounded-xl shadow-xl border border-stone-200/90 dark:border-stone-700 flex flex-col items-center transition-all group-hover:shadow-2xl group-hover:border-pink-400/80">
                  {/* Portrait Image (3:4 ratio) */}
                  <div className="w-full aspect-[3/4] bg-stone-100 dark:bg-stone-900 rounded-lg overflow-hidden relative shadow-inner">
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Birthday memory'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {photo.date && (
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono rounded">
                        {photo.date}
                      </span>
                    )}

                    {/* Quick Zoom Indicator */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="p-1.5 rounded-full bg-white/95 text-pink-600 shadow-md">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="mt-2 text-center w-full px-1">
                    <p className="font-handwriting text-base sm:text-lg text-stone-800 dark:text-stone-100 leading-tight truncate">
                      {photo.caption || `Memory #${index + 1}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Navigation & Actions */}
      <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-3 pt-2 px-1">
        <div className="flex items-center gap-2">
          {onOpenPersonalize && (
            <button
              id="btn-letter-personalize"
              onClick={() => {
                soundManager.playSwitchClick();
                onOpenPersonalize();
              }}
              className="px-3.5 py-2 bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-full text-xs font-medium border border-stone-200/80 dark:border-stone-700 transition-all flex items-center gap-1.5 shadow-sm"
              title="Personalize Letter & Memories"
            >
              <Wand2 className="w-3.5 h-3.5 text-pink-500" />
              <span>Personalize</span>
            </button>
          )}

          {onRestart && (
            <button
              id="btn-letter-replay"
              onClick={() => {
                soundManager.playSwitchClick();
                onRestart();
              }}
              className="px-3.5 py-2 bg-white/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-full text-xs font-medium border border-stone-200/80 dark:border-stone-700 transition-all flex items-center gap-1.5 shadow-sm"
              title="Replay Celebration"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Replay</span>
            </button>
          )}
        </div>

        {onOpenFinalLove && (
          <button
            id="btn-letter-to-final-love"
            onClick={() => {
              soundManager.playChime();
              onOpenFinalLove();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-pink-500/25 transition-all transform active:scale-95 flex items-center gap-2 animate-bounce"
          >
            <span>Final Page of Love 💖</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* FULLSCREEN / ZOOMED POLAROID POPUP (on click or 5s hover) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundManager.playSwitchClick();
              setSelectedPhoto(null);
            }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.7, y: 40, rotate: selectedPhoto.rotation || -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.7, y: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playSwitchClick();
                setSelectedPhoto(null);
              }}
              className="relative max-w-sm sm:max-w-md w-full bg-white dark:bg-stone-900 p-4 sm:p-5 pb-6 rounded-2xl shadow-2xl border-2 border-stone-200/90 dark:border-stone-700 flex flex-col items-center cursor-pointer"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(null);
                }}
                className="absolute -top-3 -right-3 p-2 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-transform active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-200/90 dark:bg-pink-800/80 backdrop-blur-xs -rotate-2 z-20 shadow-md border border-pink-300 rounded-xs" />

              {/* Enlarged Photo Container */}
              <div className="w-full aspect-[3/4] max-h-[60vh] bg-stone-100 dark:bg-stone-800 rounded-xl overflow-hidden shadow-inner relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || 'Birthday memory'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {selectedPhoto.date && (
                  <span className="absolute bottom-2.5 right-2.5 px-3 py-1 bg-black/70 backdrop-blur-xs text-white text-xs font-mono rounded-md shadow-sm">
                    {selectedPhoto.date}
                  </span>
                )}
              </div>

              {/* Caption */}
              <div className="mt-4 text-center w-full px-2">
                <p className="font-handwriting text-2xl sm:text-3xl text-stone-800 dark:text-stone-100 leading-tight">
                  {selectedPhoto.caption}
                </p>
                <p className="text-xs text-stone-400 font-sans-ui mt-1.5">
                  Tap anywhere to close ✨
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

