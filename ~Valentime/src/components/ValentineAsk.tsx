import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { NoButtonStage } from '../types';
import CatGif from './CatGif';

interface ValentineAskProps {
  onAccept: () => void;
}

const DEFAULT_GIF = {
  primary: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/goma.gif",
  fallbacks: [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Q3NzQwYWUxYTg2YWJkOWM2NTI2OWVhN2FhZTNhMDJmNWQzZDEwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Cmr1OMJ2FN0B2/giphy.gif",
    "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
  ]
};

const NO_STAGES: NoButtonStage[] = [
  {
    text: "Are you sure? 🥺",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/tkthao219-peach.gif",
    fallbacks: ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNndxYjE0dm05cnFtdmsxMG4xdnI0NG00enYxODZqMmh1aXJyeWh1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K1tgb1IUeBOgw/giphy.gif"],
    yesScale: 1.3,
  },
  {
    text: "Really sure?? 💔",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/peach-goma.gif",
    fallbacks: ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtN24yM3RneWVyeWFpdG52bXZ3OHMzbXFqZjhndmFnOHBnM3BhNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41JWw65ocIHKZP32/giphy.gif"],
    yesScale: 1.7,
  },
  {
    text: "Are you positive??? 👉👈",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/goma-bear.gif",
    fallbacks: ["https://media.giphy.com/media/3ORIO04354kEBuS03m/giphy.gif"],
    yesScale: 2.2,
  },
  {
    text: "Please babe... 🙏🥺",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/peachandgoma.gif",
    fallbacks: ["https://media.giphy.com/media/cLS1AC1pE388U/giphy.gif"],
    yesScale: 2.8,
  },
  {
    text: "Just think about it! 🤔❤️",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/mocha.gif",
    fallbacks: ["https://media.giphy.com/media/26hpK8935oBLx6e2c/giphy.gif"],
    yesScale: 3.5,
  },
  {
    text: "If you say no, I will be so sad... 😭",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/cat-crying.gif",
    fallbacks: ["https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif"],
    yesScale: 4.4,
  },
  {
    text: "I will be VERY sad... 😭😭",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/sad-cat.gif",
    fallbacks: ["https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif"],
    yesScale: 5.5,
  },
  {
    text: "I will be VERY VERY sad... 🥺💧",
    gifUrl: "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
    fallbacks: ["https://raw.githubusercontent.com/DzarelDeveloper/Img/main/sad-cat.gif"],
    yesScale: 6.8,
  },
  {
    text: "Ok fine, what about cookies? 🍪🧸",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/goma-cookies.gif",
    fallbacks: ["https://media.giphy.com/media/3o7TKoWXm3okO1mgHC/giphy.gif"],
    yesScale: 8.2,
  },
  {
    text: "Look at these puppy eyes! 🐶🐾",
    gifUrl: "https://media.giphy.com/media/qA9B0L56GeLPG/giphy.gif",
    fallbacks: ["https://raw.githubusercontent.com/DzarelDeveloper/Img/main/goma.gif"],
    yesScale: 9.8,
  },
  {
    text: "Don't break my heart!! 💔💔",
    gifUrl: "https://media.giphy.com/media/3o6Zt8rGMqVfch15m0/giphy.gif",
    fallbacks: ["https://raw.githubusercontent.com/DzarelDeveloper/Img/main/cat-crying.gif"],
    yesScale: 11.5,
  },
  {
    text: "You are doing this on purpose! 😤❤️",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/goma-angry.gif",
    fallbacks: ["https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif"],
    yesScale: 13.5,
  },
  {
    text: "Have mercy please! 🙏💖",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/bear-hug.gif",
    fallbacks: ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9yd3p4ZzBzbzRwNHIxcTZxMW81NW5tdmxmZXZoOHc0OHRwZTRvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lq0h93752f6J9tijrh/giphy.gif"],
    yesScale: 16.0,
  },
  {
    text: "No is not an option anymore! 🛑💝",
    gifUrl: "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/peach-goma.gif",
    fallbacks: ["https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"],
    yesScale: 20.0,
  }
];

export default function ValentineAsk({ onAccept }: ValentineAskProps) {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });
  const [hasTeleported, setHasTeleported] = useState(false);
  const askContainerRef = useRef<HTMLDivElement>(null);

  // Pre-load all stage GIFs so swaps look instant
  useEffect(() => {
    [DEFAULT_GIF.primary, ...DEFAULT_GIF.fallbacks].forEach(url => {
      const img = new Image();
      img.src = url;
    });
    NO_STAGES.forEach(stage => {
      [stage.gifUrl, ...(stage.fallbacks || [])].forEach(url => {
        const img = new Image();
        img.src = url;
      });
    });
  }, []);

  const getStageInfo = () => {
    if (noCount === 0) {
      return {
        text: "No",
        gifUrl: DEFAULT_GIF.primary,
        fallbacks: DEFAULT_GIF.fallbacks,
        yesScale: 1,
      };
    }
    const index = Math.min(noCount - 1, NO_STAGES.length - 1);
    return NO_STAGES[index];
  };

  const currentStage = getStageInfo();

  // Move "No" button randomly inside container with safe mobile boundary padding
  const triggerNoMovement = () => {
    setNoCount(prev => prev + 1);

    if (askContainerRef.current) {
      // Calculate safe percentage coordinates within container bounds
      const rx = Math.random() * 60 + 20;
      const ry = Math.random() * 50 + 25;

      setNoPosition({ x: rx, y: ry });
      setHasTeleported(true);
    } else {
      setNoPosition({
        x: Math.random() * 50 + 25,
        y: Math.random() * 50 + 25,
      });
      setHasTeleported(true);
    }
  };

  const handleNoInteraction = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    triggerNoMovement();
  };

  return (
    <div 
      ref={askContainerRef} 
      className="relative min-h-[520px] flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl border-0 w-full max-w-lg mx-auto text-center overflow-hidden"
      id="asking-panel-card"
    >
      <div className="space-y-6 flex flex-col items-center z-10 w-full pt-2">
        {/* Adorable Badge */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-rose-50 border border-rose-100/60 rounded-full px-3.5 py-1 flex items-center gap-1.5 text-rose-600 font-medium text-xs"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Special Inquiry</span>
        </motion.div>

        {/* Big Heading Prompt */}
        <motion.h1 
          key={noCount === 0 ? "initial" : "stage-" + noCount}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-cursive text-3xl sm:text-4.5xl text-rose-950 font-medium leading-tight max-w-sm"
          id="ask-greeting-heading"
        >
          {noCount === 0 ? "Will you be my Valentine? 💖" : "Please? Say Yes! 👉👈"}
        </motion.h1>

        {/* Center Animated Peach & Goma Cat GIF with Fallback component */}
        <div className="relative h-56 w-56 sm:h-64 sm:w-64 bg-rose-50/40 border-2 border-rose-100/50 rounded-2xl flex items-center justify-center overflow-hidden shadow-xs">
          <CatGif 
            key={currentStage.gifUrl}
            primaryUrl={currentStage.gifUrl} 
            fallbacks={currentStage.fallbacks}
            alt="Adorable Peach & Goma cat valentine" 
            className="h-full w-full object-cover"
          />
        </div>

        {/* Guild-Trip subtexts displaying when No is hovered */}
        <AnimatePresence mode="wait">
          {noCount > 0 && (
            <motion.p 
              key={noCount}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-base font-bold text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-1.5"
              id="no-warning-bubble"
            >
              {currentStage.text}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Interactive Twin Button Row */}
        <div className="mt-2 flex gap-6 items-center justify-center relative w-full min-h-24">
          
          {/* YES Button - Continuously scales up upon NO trigger */}
          <motion.button
            id="yes-btn"
            onClick={onAccept}
            style={{ 
              transform: `scale(${currentStage.yesScale})`,
              transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className={`px-8 py-3.5 rounded-full font-extrabold text-white text-base shadow-md shadow-rose-300/40 bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-105 active:scale-95 cursor-pointer z-20 flex items-center gap-1.5 ${
              noCount >= 6 ? 'relative z-30' : ''
            }`}
          >
            <Sparkles className="w-4 h-4 text-white fill-white animate-pulse" />
            Yes
          </motion.button>

          {/* NO Button - Teleports dynamically inside parent boundary */}
          {noCount < 14 && (
            <motion.button
              id="no-btn"
              key="no-button"
              onMouseEnter={triggerNoMovement}
              onTouchStart={handleNoInteraction}
              onClick={handleNoInteraction}
              style={
                hasTeleported && noPosition.x !== null && noPosition.y !== null
                  ? {
                      position: 'absolute',
                      left: `${noPosition.x}%`,
                      top: `${noPosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }
                  : {
                      position: 'relative',
                    }
              }
              className="px-6 py-2.5 rounded-full text-sm font-bold border border-rose-200 text-rose-600 bg-white hover:bg-rose-50/50 shadow-sm transition-all duration-150 cursor-pointer"
            >
              No
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
