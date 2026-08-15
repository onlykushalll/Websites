import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import ValentineAsk from './components/ValentineAsk';
import CatGif from './components/CatGif';
import { ScreenState } from './types';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('asking');

  const handleAccept = () => {
    setScreen('success');
  };

  const handleReset = () => {
    setScreen('asking');
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#FFF0F2] text-rose-900 font-sans flex flex-col items-center justify-between overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 pb-8 pt-4 px-3 sm:px-4" id="app-viewport">
      
      {/* Floating dynamic background hearts streaming up during success screen state */}
      <FloatingHearts active={screen === 'success'} />

      {/* Grid subtle background dots for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffd6db_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-45" />

      {/* Elegant Header */}
      <header className="w-full max-w-lg flex items-center justify-between mb-6 z-30 px-2">
        <div className="flex items-center gap-2 select-none">
          <div className="bg-gradient-to-tr from-rose-400 to-pink-500 text-white p-2.5 rounded-2xl shadow-sm shadow-rose-200">
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <span className="font-cursive text-2xl font-bold text-rose-950">valen.time</span>
            <span className="text-xs text-rose-500 font-medium block -mt-0.5">My Valentine</span>
          </div>
        </div>
      </header>

      {/* Main Core Screens */}
      <main className="w-full max-w-lg flex-1 flex items-center justify-center relative z-25 py-2">
        <AnimatePresence mode="wait">
          {screen === 'asking' ? (
            <motion.div
              key="asking-panel"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              <ValentineAsk onAccept={handleAccept} />
            </motion.div>
          ) : (
            <motion.div
              key="success-panel"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              {/* Success celebration card */}
              <div 
                className="w-full max-w-lg mx-auto p-6 md:p-8 rounded-2xl bg-white shadow-md border-0 overflow-hidden relative text-center space-y-6"
                id="success-celebration-card"
              >
                {/* Decorative badge with burst sparkle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.1 }}
                  className="inline-block mt-2"
                >
                  <div className="bg-gradient-to-br from-rose-400 to-pink-500 text-white p-4.5 rounded-full shadow-lg shadow-rose-200">
                    <Sparkles className="w-8 h-8 fill-rose-100 animate-pulse text-white" />
                  </div>
                </motion.div>

                {/* Joyful title heading */}
                <div className="space-y-2">
                  <h2 className="font-cursive text-4xl sm:text-5xl text-rose-950 font-bold leading-normal animate-bounce" id="success-heading">
                    YAY!!! It's a Date! 🎉💖
                  </h2>
                  <p className="text-rose-600 font-semibold text-sm max-w-xs mx-auto">
                    I knew you would say yes! I'm the happiest person ever! 🥰✨
                  </p>
                </div>

                {/* Ultimate Cat Hugging & Kissing GIF Frame with multi-source fallback */}
                <div className="mx-auto h-64 w-64 bg-rose-50/40 border-4 border-rose-50 rounded-2xl shadow-inner overflow-hidden relative flex items-center justify-center">
                  <CatGif 
                    primaryUrl="https://raw.githubusercontent.com/DzarelDeveloper/Img/main/peach-goma-kiss.gif"
                    fallbacks={[
                      "https://raw.githubusercontent.com/DzarelDeveloper/Img/main/peachandgoma.gif",
                      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9yd3p4ZzBzbzRwNHIxcTZxMW81NW5tdmxmZXZoOHc0OHRwZTRvdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lq0h93752f6J9tijrh/giphy.gif"
                    ]}
                    alt="Cute Peach and Goma cats hugging and kissing happily"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Simple Replay/Reset Action */}
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="py-2.5 px-5 rounded-xl border border-rose-200/50 text-rose-600 font-bold text-xs bg-white hover:bg-rose-50/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-97"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset & Ask Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full text-center mt-10 z-20 text-rose-400 text-xs font-semibold">
        <p className="flex items-center justify-center gap-1.5">
          <span>valen.time • built with love</span>
          <span>💖</span>
        </p>
      </footer>
    </div>
  );
}
