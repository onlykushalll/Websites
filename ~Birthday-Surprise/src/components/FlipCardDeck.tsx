import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { WishCard } from '../types';
import { soundManager } from '../utils/audio';

interface FlipCardDeckProps {
  wishes: WishCard[];
  onCompleteAll: () => void;
  recipientName?: string;
}

export const FlipCardDeck: React.FC<FlipCardDeckProps> = ({
  wishes,
  onCompleteAll,
  recipientName = 'Bestie'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const currentCard = wishes[currentIndex];
  const isFlipped = !!flippedCards[currentCard.id];
  const discoveredCount = Object.keys(flippedCards).length;

  const handleFlip = () => {
    soundManager.playCardFlip();
    setFlippedCards((prev) => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id],
    }));

    if (discoveredCount + 1 >= wishes.length && !flippedCards[currentCard.id]) {
      soundManager.playChime();
    }
  };

  const handleNext = () => {
    if (currentIndex < wishes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onCompleteAll();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      layout
      id="wishes-flip-card-deck"
      className="relative flex flex-col items-center justify-center w-full max-w-lg mx-auto px-4 py-2 select-none"
    >
      {/* Header */}
      <div className="text-center space-y-1 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Birthday Wishes ({currentIndex + 1}/5) 💖</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-800 dark:text-stone-100">
          Reveal your birthday wishes
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans-ui">
          Card {currentIndex + 1} of 5 — Tap to flip & reveal ✨
        </p>
      </div>

      {/* 3D Card Display with smooth card-switching transitions */}
      <div className="relative w-[280px] sm:w-[320px] h-[340px] sm:h-[360px] perspective-1000 my-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <motion.div
              onClick={handleFlip}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              className="w-full h-full relative cursor-pointer"
            >
              {/* FRONT FACE (Cute Doodle / Meme) */}
              <div className="absolute inset-0 backface-hidden bg-[#FFFDF9] dark:bg-[#2b1f27] rounded-2xl border-2 border-stone-200/90 dark:border-stone-700/80 shadow-xl p-5 flex flex-col justify-between items-center text-center">
                {/* Top Tag */}
                <div className="w-full flex justify-between items-center text-xs text-stone-600 dark:text-stone-400">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded">
                    CARD #{currentCard.id}
                  </span>
                  <span className="text-pink-500 font-handwriting text-base font-semibold">
                    Special Wish 🌸
                  </span>
                </div>

                {/* Illustration Graphic */}
                <div className="my-auto flex flex-col items-center justify-center p-2">
                  {currentCard.frontIllustration === 'bouquet' ? (
                    <div className="relative flex flex-col items-center">
                      <div className="text-6xl animate-bounce">💐</div>
                      <div className="text-xs text-pink-700 dark:text-pink-300 font-handwriting text-lg mt-2">
                        Jaldi lelo koi dekh lega! 👀
                      </div>
                    </div>
                  ) : currentCard.frontIllustration === 'hug' ? (
                    <div className="relative flex flex-col items-center">
                      <div className="text-6xl animate-pulse">🫂</div>
                      <div className="text-xs text-pink-700 dark:text-pink-300 font-handwriting text-lg mt-2">
                        Pakdo na! Free hugs voucher 💌
                      </div>
                    </div>
                  ) : currentCard.frontIllustration === 'trophy' ? (
                    <div className="relative flex flex-col items-center">
                      <div className="text-6xl animate-float">🏆</div>
                      <div className="text-xs text-amber-600 dark:text-amber-400 font-handwriting text-lg mt-2">
                        World&apos;s #1 Best Human Award 🥇
                      </div>
                    </div>
                  ) : currentCard.frontIllustration === 'coffee' ? (
                    <div className="relative flex flex-col items-center">
                      <div className="text-6xl animate-bounce">☕</div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 font-handwriting text-lg mt-2">
                        Late night rants &amp; laughs ✨
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center">
                      <div className="text-6xl animate-pulse">🌟</div>
                      <div className="text-xs text-pink-700 dark:text-pink-300 font-handwriting text-lg mt-2">
                        Forever cheering for you! 💖
                      </div>
                    </div>
                  )}

                  <h4 className="font-bold text-stone-800 dark:text-stone-100 text-base mt-2 font-serif-display">
                    {currentCard.frontTitle}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 max-w-[200px]">
                    {currentCard.frontSubtitle}
                  </p>
                </div>

                {/* Bottom Tap Prompt */}
                <div className="w-full pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-center gap-1 text-xs text-pink-600 dark:text-pink-400 font-medium animate-pulse">
                  <span>{currentCard.frontTag || 'Tap me to reveal →'}</span>
                </div>
              </div>

              {/* BACK FACE (Heartfelt Wish Message) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-pink-50 via-[#FFFDF9] to-rose-50 dark:from-[#35202c] dark:via-[#261720] dark:to-[#3b1e2a] rounded-2xl border-2 border-pink-200 dark:border-pink-900/60 shadow-xl p-6 flex flex-col justify-between items-center text-center">
                {/* Wish Number Header */}
                <div className="w-full flex justify-between items-center">
                  <span className="text-3xl font-extrabold text-pink-400/80 font-serif-display">
                    {currentCard.backNumber}
                  </span>
                  <span className="text-xs text-pink-500 font-handwriting text-lg">
                    For {recipientName} 💌
                  </span>
                </div>

                {/* Message Body */}
                <div className="my-auto px-1">
                  <p className="text-sm sm:text-base text-stone-700 dark:text-stone-200 font-sans-ui leading-relaxed italic">
                    &ldquo;{currentCard.backText}&rdquo;
                  </p>
                </div>

                {/* Bottom Flip back prompt */}
                <div className="w-full pt-2 border-t border-pink-200/60 dark:border-pink-900/40 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                  <span className="flex items-center gap-1 text-pink-500">
                    <Heart className="w-3.5 h-3.5 fill-current" /> Made with love
                  </span>
                  <span className="text-[11px] underline">Tap to flip back</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls with 5 Card Selectors */}
      <div className="flex items-center justify-between w-full max-w-[320px] mt-2 px-2">
        <button
          id="btn-prev-wish-card"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-50 hover:text-pink-600 transition-colors"
          title="Previous Card"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 5 Card Dots / Quick Pickers */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            {wishes.map((w, idx) => (
              <button
                key={w.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  idx === currentIndex
                    ? 'bg-pink-500 text-white shadow-sm scale-110'
                    : flippedCards[w.id]
                    ? 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border border-pink-300'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-pink-200'
                }`}
                title={`Go to Card ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">
            Card {currentIndex + 1} of {wishes.length}
          </span>
        </div>

        <button
          id="btn-next-wish-card"
          onClick={handleNext}
          className="p-2 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-pink-50 hover:text-pink-600 transition-colors"
          title={currentIndex === wishes.length - 1 ? 'Go to Heartfelt Letter' : 'Next Card'}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Continue Button */}
      <div className="mt-3">
        <button
          id="btn-open-birthday-letter"
          onClick={onCompleteAll}
          className="py-2 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm rounded-full shadow-lg shadow-pink-500/25 transition-all transform active:scale-95 flex items-center gap-2"
        >
          <span>Open Heartfelt Letter &amp; Next Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
