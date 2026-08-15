import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Lightbulb,
  Music,
  ChevronRight,
  PartyPopper
} from 'lucide-react';
import { StepId, BirthdayData } from './types';
import { initialBirthdayData } from './data/defaultData';
import { soundManager } from './utils/audio';
import { generateBirthdayProfile, detectPersona } from './utils/personas';
import { FairyLights } from './components/FairyLights';
import { AudioPlayer } from './components/AudioPlayer';
import { CelebrationBalloons } from './components/CelebrationBalloons';
import { InteractiveCake } from './components/InteractiveCake';
import { FlipCardDeck } from './components/FlipCardDeck';
import { HeartfeltLetter } from './components/HeartfeltLetter';
import { FinalPageOfLove } from './components/FinalPageOfLove';
import { LandscapeNotice } from './components/LandscapeNotice';
import { PersonalizeModal } from './components/PersonalizeModal';

export default function App() {
  const [data, setData] = useState<BirthdayData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('birthday_surprise_data') || localStorage.getItem('cutiepage_birthday_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.recipientName) {
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Could not parse saved birthday profile, using default', e);
      }
    }
    return generateBirthdayProfile('');
  });

  const [currentStep, setCurrentStep] = useState<StepId>('intro');
  const [isLightsOn, setIsLightsOn] = useState(false);
  const [isBalloonsActive, setIsBalloonsActive] = useState(false);
  const [bgmAutoPlay, setBgmAutoPlay] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonText, setNoButtonText] = useState('No 🙈');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing birthday surprise...');
  
  // Interactive Dark Room Torch Cursor Position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isBulbHovered, setIsBulbHovered] = useState(false);
  const [isHangingHovered, setIsHangingHovered] = useState(false);

  // Name Input on Intro screen - initialize from saved data if present
  const [nameInput, setNameInput] = useState(() => data.recipientName || '');

  // Save changes to local storage
  const handleSavePersonalization = (updatedData: BirthdayData) => {
    setData(updatedData);
    setNameInput(updatedData.recipientName);
    try {
      localStorage.setItem('birthday_surprise_data', JSON.stringify(updatedData));
    } catch (e) {
      console.warn('Failed to save birthday data to localStorage', e);
    }
  };

  // Quick name setter from intro screen
  const handleSetName = (newName: string) => {
    setNameInput(newName);
    const updatedProfile = generateBirthdayProfile(newName);
    setData(updatedProfile);
    try {
      localStorage.setItem('birthday_surprise_data', JSON.stringify(updatedProfile));
    } catch (e) {
      console.warn('Failed to save birthday data to localStorage', e);
    }
  };

  // Evasive "No" button logic
  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 120;
    setNoButtonPos({ x: randomX, y: randomY });
    const playfulTexts = ['Are you sure? 😉', 'Try Yes! 💖', 'No way! 🤭', 'Pleaseee! 🥺'];
    setNoButtonText(playfulTexts[Math.floor(Math.random() * playfulTexts.length)]);
  };

  // Step Transitions
  const handleStartSurprise = () => {
    soundManager.playSwitchClick();
    const effectiveName = nameInput.trim();
    if (effectiveName) {
      handleSetName(effectiveName);
    } else {
      if (!data.recipientName || data.recipientName === 'Siya') {
        handleSetName('');
      }
    }
    setCurrentStep('loading');
  };

  // Loading Progress Bar Effect
  useEffect(() => {
    if (currentStep === 'loading') {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setCurrentStep('dark_room');
            }, 500);
            return 100;
          }
          const next = prev + 4;
          if (next > 25 && next < 55) {
            setLoadingText(`Sprinkling sparkles & candles for ${data.recipientName || 'you'}... ✨`);
          } else if (next >= 55 && next < 85) {
            setLoadingText(`Writing secret birthday notes from ${data.senderName ? data.senderName.split('/')[0].trim() : 'ice-cream 🍦'}... 💌`);
          } else if (next >= 85) {
            setLoadingText('Ready for the magic! 💖');
          }
          return next;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [currentStep, data.recipientName, data.senderName]);

  // Turn On Lights (Can be triggered via hover or click)
  const handleTurnOnLights = () => {
    if (isLightsOn && currentStep !== 'dark_room') return;
    soundManager.playSwitchClick();
    soundManager.playChime();
    setIsLightsOn(true);
    setCurrentStep('lights_on');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#FFD700', '#FFA502', '#FF6B81'],
    });
  };

  // Set the mood (Start Music)
  const handleSetMood = () => {
    soundManager.playChime();
    setBgmAutoPlay(true);
    soundManager.startBackgroundMusic();
    setCurrentStep('celebration');
  };

  // Release Balloons
  const handleReleaseBalloons = () => {
    setIsBalloonsActive(true);
    setTimeout(() => {
      setCurrentStep('cake');
    }, 2800);
  };

  // After Cake Cut
  const handleCakeCutComplete = () => {
    setCurrentStep('make_wish');
  };

  // Make a Wish
  const handleWishMade = () => {
    soundManager.playChime();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#FF6B81', '#FFA502', '#2ED573', '#1E90FF', '#FD79A8'],
    });
    setCurrentStep('wishes_deck');
  };

  // Open Final Letter
  const handleOpenLetter = () => {
    soundManager.playChime();
    setCurrentStep('letter');
  };

  // Open Final Page of Love
  const handleOpenFinalLove = () => {
    soundManager.playChime();
    setCurrentStep('final_love');
  };

  // Restart celebration
  const handleRestart = () => {
    soundManager.playSwitchClick();
    setIsLightsOn(false);
    setIsBalloonsActive(false);
    setCurrentStep('intro');
    setNoButtonPos({ x: 0, y: 0 });
    setNoButtonText('No 🙈');
  };

  // Track mouse movement in dark room for flashlight torch effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (currentStep === 'dark_room') {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  // Background Theme based on step
  const isDarkPhase = currentStep === 'dark_room';

  return (
    <div
      id="birthday-surprise-app"
      onMouseMove={handleMouseMove}
      className={`relative w-full min-h-screen overflow-x-hidden flex flex-col justify-between transition-colors duration-1000 select-none ${
        isDarkPhase
          ? 'bg-[#120a1c] text-stone-100 bg-dot-pattern-dark'
          : 'bg-[#FAF7F5] dark:bg-[#1f1620] text-stone-800 dark:text-stone-100 bg-grid-pattern'
      }`}
    >
      {/* Fairy Lights at Top (Hovering any bulb will also turn on lights in dark mode) */}
      <FairyLights
        isOn={isLightsOn}
        onHoverAnyBulb={() => {
          if (currentStep === 'dark_room') {
            handleTurnOnLights();
          }
        }}
      />

      {/* Floating Audio Player */}
      <AudioPlayer
        trackTitle={
          data.recipientName && data.recipientName !== 'Birthday Star'
            ? `${data.recipientName}’s Song 🎵`
            : 'Birthday Melody 🎵'
        }
        autoPlay={bgmAutoPlay}
      />

      {/* Floating Balloon Particle Engine */}
      <CelebrationBalloons active={isBalloonsActive} recipientName={data.recipientName} />

      {/* Mobile Landscape Notice Overlay */}
      <LandscapeNotice />

      {/* Top Left Branding & Personalize Button */}
      <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40 flex items-center gap-2">
        <button
          id="btn-open-personalize-top"
          onClick={() => setIsPersonalizeOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/85 dark:bg-stone-900/85 backdrop-blur-md text-stone-700 dark:text-stone-200 hover:text-pink-600 dark:hover:text-pink-400 rounded-full border border-stone-200/80 dark:border-stone-700/60 shadow-sm text-xs font-medium transition-all transform active:scale-95"
          title="Edit Birthday Wishes & Memories"
        >
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
          <span className="hidden sm:inline">
            {data.recipientName && data.recipientName !== 'Birthday Star'
              ? `Made with love for ${data.recipientName}`
              : 'Made with love 🌸'}
          </span>
          <span className="sm:hidden">
            {data.recipientName && data.recipientName !== 'Birthday Star'
              ? `${data.recipientName} 🌸`
              : 'Surprise 🌸'}
          </span>
        </button>
      </div>

      {/* Flashlight Torch Glow Overlay in Dark Room */}
      {isDarkPhase && (
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 230, 150, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Main Interactive Stage */}
      {/* Main Content View with buttery-smooth step transitions and layout interpolation */}
      <motion.main
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
        className="relative flex-1 flex items-center justify-center w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 z-10 overflow-visible"
      >
        <AnimatePresence mode="wait" initial={false}>
          
          {/* STEP 1: INTRO PROMPT ("Do you want to see it?" + Name Inserter) */}
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-col items-center text-center space-y-4 max-w-md w-full"
            >
              {/* Cute Cat / Birthday Sticker */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                  className="text-6xl filter drop-shadow-md select-none cursor-pointer"
                  onClick={() => soundManager.playHeartPop()}
                >
                  🐱💖
                </motion.div>
                <div className="absolute -top-1 -right-1 text-xl animate-bounce">✨</div>
              </div>

              {/* Headings */}
              <div className="space-y-1">
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                  Special Surprise 🎁
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-800 dark:text-stone-100">
                  Do you want to see it?
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans-ui max-w-xs mx-auto leading-relaxed">
                  {nameInput.trim()
                    ? `A tiny celebration page created with lots of love for ${data.recipientName} ✨`
                    : 'A tiny celebration page created with lots of love ✨'}
                </p>
              </div>

              {/* Insert / Select Birthday Star Name Section */}
              <div className="w-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm p-3.5 rounded-2xl border border-pink-200/80 dark:border-pink-900/50 shadow-md space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider flex items-center gap-1">
                    <span>👑 Birthday Star Name:</span>
                  </label>
                  {nameInput.trim() && data.nickname && (
                    <span className="text-[11px] text-pink-600 dark:text-pink-400 font-medium">
                      ({data.nickname})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="input-birthday-name"
                    type="text"
                    value={nameInput}
                    onChange={(e) => handleSetName(e.target.value)}
                    placeholder="Type name here..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 focus:outline-pink-500 font-medium"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 pt-1 relative">
                {/* YES Button */}
                <button
                  id="btn-intro-yes"
                  onClick={handleStartSurprise}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold text-sm sm:text-base rounded-full shadow-lg shadow-pink-500/25 transition-all transform active:scale-95 flex items-center gap-2"
                >
                  <span>Yes 💖</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Playful Evasive NO Button */}
                <motion.button
                  id="btn-intro-no"
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  className="px-6 py-3 bg-stone-200/80 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 font-medium text-sm rounded-full transition-colors border border-stone-300/60 dark:border-stone-700"
                >
                  <span>{noButtonText}</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LOADING SCREEN */}
          {currentStep === 'loading' && (
            <motion.div
              key="loading"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-col items-center text-center space-y-5 max-w-md w-full"
            >
              <div className="text-5xl animate-bounce">🎁✨</div>
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-stone-800 dark:text-stone-100">
                  Come on! have a look at it
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-sans-ui">
                  {loadingText}
                </p>
              </div>

              {/* Pink Gradient Loading Bar */}
              <div className="w-full max-w-xs space-y-2">
                <div className="w-full h-3 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden border border-stone-300/70 dark:border-stone-700 shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 rounded-full shadow-sm"
                    style={{ width: `${loadingProgress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  <span>+ HAPPY-BIRTHDAYYY.NEXT +</span>
                  <span>{loadingProgress}%</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DARK ROOM ("SHHH... The room is dark" -> Hover or Click to turn on) */}
          {currentStep === 'dark_room' && (
            <motion.div
              key="dark_room"
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-col items-center text-center space-y-5 max-w-md w-full"
            >
              {/* Interactive Swinging Hanging Light Bulb on wire */}
              <div
                className="relative flex flex-col items-center cursor-pointer group pt-2 pb-1"
                onMouseEnter={() => {
                  setIsHangingHovered(true);
                  soundManager.playHeartPop();
                }}
                onMouseLeave={() => setIsHangingHovered(false)}
                onClick={handleTurnOnLights}
                title="Hover to light up bulb, tap to turn on the room! ✨"
              >
                {/* Hanging wire */}
                <div className="w-0.5 h-12 bg-amber-200/40 rounded-full" />
                {/* Socket */}
                <div className="w-4 h-3 bg-stone-700 rounded-t-sm border border-stone-600" />
                {/* Hanging Bulb */}
                <motion.div
                  animate={{
                    rotate: isHangingHovered ? [-8, 8, -5, 5, 0] : [0, 2, -2, 0],
                    scale: isHangingHovered ? 1.25 : [1, 1.05, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="w-12 h-16 rounded-b-full rounded-t-sm bg-gradient-to-b from-amber-200/60 to-yellow-400/80 border-2 border-yellow-300/80 shadow-2xl flex items-center justify-center relative"
                  style={{
                    boxShadow: isHangingHovered
                      ? '0 0 45px 18px rgba(255, 215, 0, 0.7), inset 0 0 12px rgba(255, 255, 255, 0.9)'
                      : '0 0 25px 8px rgba(255, 215, 0, 0.35), inset 0 0 8px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <Lightbulb className="w-7 h-7 text-amber-950 animate-pulse" />
                  <div className="absolute -top-1 -right-1 text-xs animate-ping">✨</div>
                </motion.div>

                {/* Floating prompt */}
                <span className="text-[11px] font-mono text-amber-300/90 mt-2 animate-bounce flex items-center gap-1">
                  <span>💡 Tap bulb or click button to turn ON 💡</span>
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-display text-pink-200 tracking-wide">
                  SHHH... 🤫
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-sans-ui max-w-xs mx-auto">
                  The room is dark. Hover over bulbs to peek, then tap to light up the celebration!
                </p>
              </div>

              <button
                id="btn-turn-on-lights"
                onClick={handleTurnOnLights}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-stone-900 font-bold text-sm sm:text-base rounded-full shadow-xl shadow-amber-400/30 transition-all transform active:scale-95 flex items-center gap-2.5 animate-bounce"
              >
                <Lightbulb className="w-5 h-5 fill-stone-900" />
                <span>Turn on the lights 💡</span>
              </button>
            </motion.div>
          )}

          {/* STEP 4: LIGHTS ON & MOOD SETTING */}
          {currentStep === 'lights_on' && (
            <motion.div
              key="lights_on"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-col items-center text-center space-y-6 max-w-md w-full"
            >
              <div className="text-6xl animate-float">🎉🌟</div>

              <div className="space-y-2">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Illuminated ✨
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-stone-800 dark:text-stone-100">
                  That&apos;s much better!
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300 font-sans-ui max-w-xs mx-auto">
                  Now let&apos;s set the party mood with sweet melodies...
                </p>
              </div>

              <button
                id="btn-set-mood"
                onClick={handleSetMood}
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base rounded-full shadow-xl shadow-pink-500/25 transition-all transform active:scale-95 flex items-center gap-2.5"
              >
                <Music className="w-5 h-5" />
                <span>Set the mood 🎵</span>
              </button>
            </motion.div>
          )}

          {/* STEP 5: CELEBRATION MODE & BALLOON RELEASE */}
          {currentStep === 'celebration' && (
            <motion.div
              key="celebration"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-col items-center text-center space-y-6 max-w-md w-full"
            >
              <div className="text-6xl animate-bounce">🎈🥳</div>

              <div className="space-y-2">
                <span className="px-3.5 py-1 bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 rounded-full text-xs font-bold uppercase tracking-widest">
                  CELEBRATION MODE
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-display text-stone-800 dark:text-stone-100">
                  Happy Birthday {data.recipientName}! 🎂
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300 font-sans-ui max-w-xs mx-auto">
                  A tiny celebration page made with lots of love &amp; smiles ✨
                </p>
              </div>

              <button
                id="btn-release-balloons"
                onClick={handleReleaseBalloons}
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base rounded-full shadow-xl shadow-pink-500/30 transition-all transform active:scale-95 flex items-center gap-2.5"
              >
                <PartyPopper className="w-5 h-5" />
                <span>Release the balloons 🎈</span>
              </button>
            </motion.div>
          )}

          {/* STEP 6: CAKE CUTTING (DRAG TO CUT & BLOW CANDLE) */}
          {currentStep === 'cake' && (
            <motion.div
              key="cake"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="w-full flex items-center justify-center overflow-visible"
            >
              <InteractiveCake
                recipientName={data.recipientName}
                onCutComplete={handleCakeCutComplete}
              />
            </motion.div>
          )}

          {/* STEP 7: MAKE A WISH */}
          {currentStep === 'make_wish' && (
            <motion.div
              key="make_wish"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="flex flex-col items-center text-center space-y-6 max-w-md w-full"
            >
              {/* Cute Celebration Sticker */}
              <div className="relative w-28 h-28 flex items-center justify-center text-6xl animate-float">
                🎂🌟🎀
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider">
                  MAKE A WISH 🌟
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-stone-800 dark:text-stone-100">
                  Close your eyes &amp; make a wish
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-300 font-sans-ui max-w-xs mx-auto">
                  Think of everything your heart dreams of for this coming year, {data.recipientName}...
                </p>
              </div>

              <button
                id="btn-wish-made"
                onClick={handleWishMade}
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm sm:text-base rounded-full shadow-xl shadow-pink-500/25 transition-all transform active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>I Made My Wish ✨</span>
              </button>
            </motion.div>
          )}

          {/* STEP 8: 3D FLIP CARDS WISHES DECK (5 Personalized Cards) */}
          {currentStep === 'wishes_deck' && (
            <motion.div
              key="wishes_deck"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="w-full flex items-center justify-center overflow-visible"
            >
              <FlipCardDeck
                wishes={data.wishes}
                onCompleteAll={handleOpenLetter}
                recipientName={data.recipientName}
              />
            </motion.div>
          )}

          {/* STEP 9: HEARTFELT LETTER & POLAROID MEMORIES */}
          {currentStep === 'letter' && (
            <motion.div
              key="letter"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="w-full flex items-center justify-center overflow-visible"
            >
              <HeartfeltLetter
                data={data}
                onRestart={handleRestart}
                onOpenPersonalize={() => setIsPersonalizeOpen(true)}
                onOpenFinalLove={handleOpenFinalLove}
              />
            </motion.div>
          )}

          {/* STEP 10: A FINAL PAGE OF LOVE (Love Coupons, Reasons, Mystery Box & Sparks) */}
          {currentStep === 'final_love' && (
            <motion.div
              key="final_love"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="w-full flex items-center justify-center overflow-visible"
            >
              <FinalPageOfLove
                data={data}
                onRestart={handleRestart}
                onOpenPersonalize={() => setIsPersonalizeOpen(true)}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </motion.main>

      {/* Bottom Footer */}
      <footer className="w-full py-3 px-4 flex items-center justify-between z-20 text-xs text-stone-500 dark:text-stone-400 select-none bg-white/30 dark:bg-stone-950/30 backdrop-blur-xs border-t border-stone-200/30 dark:border-stone-800/30">
        <div className="flex items-center gap-1.5 font-sans-ui text-[11px]">
          <span>© Birthday Surprise Keepsake</span>
          <span>•</span>
          <span className="text-pink-600 dark:text-pink-400 font-medium">
            {data.recipientName && data.recipientName !== 'Birthday Star'
              ? `For ${data.recipientName} ${data.nickname ? `(${data.nickname})` : ''}`
              : 'For Birthday Star ✨'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium">
          <span>Made with love 💖</span>
        </div>
      </footer>

      {/* Personalization Studio Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        data={data}
        onSave={handleSavePersonalization}
      />
    </div>
  );
}
