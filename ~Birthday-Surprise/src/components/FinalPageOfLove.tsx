import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Gift,
  RotateCcw,
  Share2,
  Check,
  Star,
  Coffee,
  Smile,
  Music,
  Award,
  Flame,
  Wand2,
  ChevronRight,
  PartyPopper
} from 'lucide-react';
import { BirthdayData } from '../types';
import { soundManager } from '../utils/audio';

interface FinalPageOfLoveProps {
  data: BirthdayData;
  onRestart: () => void;
  onOpenPersonalize: () => void;
}

interface LoveCoupon {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  redeemed: boolean;
}

export const FinalPageOfLove: React.FC<FinalPageOfLoveProps> = ({
  data,
  onRestart,
  onOpenPersonalize,
}) => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>([
    {
      id: 'c1',
      icon: '🍦',
      title: '1x Midnight Ice Cream Treat',
      desc: `A tub of your absolute favorite ice cream, on ${data.senderName.split('/')[0].trim()}!`,
      tag: 'Delicious',
      redeemed: false,
    },
    {
      id: 'c2',
      icon: '🤗',
      title: '1x Emergency Mega Hug Pass',
      desc: 'Valid anytime you feel low, stressed, or just need tight comfort.',
      tag: 'Warmth',
      redeemed: false,
    },
    {
      id: 'c3',
      icon: '🎧',
      title: '1x 24/7 Rant & Gossip Session',
      desc: 'Unlimited listening ear without any interruptions or judgment.',
      tag: 'Support',
      redeemed: false,
    },
    {
      id: 'c4',
      icon: '🤭',
      title: '1x Silly Bad Joke Delivery',
      desc: 'Instant goofy joke or meme until you burst into laughter.',
      tag: 'Giggles',
      redeemed: false,
    },
    {
      id: 'c5',
      icon: '🍕',
      title: '1x Food & Cafe Date Pass',
      desc: 'Pick your favorite cafe, snacks, and sweet treats on me.',
      tag: 'Treat',
      redeemed: false,
    },
    {
      id: 'c6',
      icon: '🌟',
      title: '1x Forever Cheerleader Card',
      desc: 'Unconditional hype and cheering for all your goals & dreams.',
      tag: 'Eternity',
      redeemed: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'vouchers' | 'reasons' | 'gift'>('vouchers');
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [giftSparkles, setGiftSparkles] = useState(false);
  const [heartSparks, setHeartSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [loveTaps, setLoveTaps] = useState(100);
  const [copied, setCopied] = useState(false);

  const loveReasons = [
    {
      id: 1,
      title: 'Your Contagious Laugh',
      desc: 'How your laughter lights up the entire room and makes everyone smile.',
      emoji: '🌸',
    },
    {
      id: 2,
      title: 'Your Golden Heart',
      desc: 'The genuine kindness, empathy, and gentleness you give to everyone around you.',
      emoji: '✨',
    },
    {
      id: 3,
      title: 'Unfiltered Late Night Talks',
      desc: 'How we can talk about the most random things for hours without getting bored.',
      emoji: '🌙',
    },
    {
      id: 4,
      title: 'Your Unmatched Energy',
      desc: 'The playful chaos, adorable antics, and authentic warmth you radiate daily.',
      emoji: '🧸',
    },
    {
      id: 5,
      title: 'Being My Safe Place',
      desc: 'Knowing that no matter how chaotic the world gets, you are always there.',
      emoji: '💖',
    },
    {
      id: 6,
      title: 'Pure Sunshine Soul',
      desc: 'Because you are truly one in eight billion and completely irreplaceable.',
      emoji: '🌟',
    },
  ];

  const handleRedeemCoupon = (id: string) => {
    soundManager.playHeartPop();
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, redeemed: !c.redeemed } : c))
    );

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#FF6B81', '#FFA502', '#FD79A8'],
    });
  };

  const handleOpenGift = () => {
    if (isGiftOpened) return;
    soundManager.playConfettiPop();
    soundManager.playChime();
    setIsGiftOpened(true);
    setGiftSparkles(true);

    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF6B81', '#FFA502', '#2ED573', '#1E90FF', '#FD79A8', '#FFD700'],
    });
  };

  const handleLoveBurst = (e: React.MouseEvent) => {
    soundManager.playHeartPop();
    setLoveTaps((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const newSpark = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2 + (Math.random() * 60 - 30),
      y: rect.top - 10,
    };

    setHeartSparks((prev) => [...prev, newSpark]);
    setTimeout(() => {
      setHeartSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1200);

    if ((loveTaps + 1) % 10 === 0) {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleShare = () => {
    soundManager.playChime();
    if (navigator.share) {
      navigator.share({
        title: `A Final Page of Love for ${data.recipientName} ✨`,
        text: `Check out this magical birthday celebration keepsake created with love!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <motion.div
      layout
      id="final-page-of-love"
      className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-2 select-none"
    >
      {/* Top Floating Badge */}
      <motion.div
        layout
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-amber-500/10 dark:from-pink-950/60 dark:to-rose-950/60 border border-pink-300/60 dark:border-pink-800/60 rounded-full text-xs font-semibold text-pink-700 dark:text-pink-300 shadow-sm mb-3"
      >
        <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
        <span>A Final Page of Love for {data.recipientName} 💖</span>
      </motion.div>

      {/* Main Container */}
      <motion.div
        layout
        className="w-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-3xl border-2 border-stone-200/90 dark:border-stone-700/80 shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header Ribbon */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-pink-50/80 to-transparent dark:from-pink-950/30 dark:to-transparent border-b border-stone-100 dark:border-stone-800 text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-display text-stone-800 dark:text-stone-100">
            Forever Cherished &amp; Celebrated ✨
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans-ui max-w-lg mx-auto">
            From <span className="font-semibold text-pink-600 dark:text-pink-400">{data.senderName}</span> to{' '}
            <span className="font-semibold text-pink-600 dark:text-pink-400">{data.nickname || data.recipientName}</span>.
            Here is a little collection of love vouchers, promises, and sweet memories.
          </p>

          {/* Navigation Pill Tabs with animated layoutId indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-3">
            {[
              { id: 'vouchers', label: '🎟️ Love Vouchers' },
              { id: 'reasons', label: '🌸 Reasons You Are Loved' },
              { id: 'gift', label: '🎁 Mystery Gift Box' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundManager.playSwitchClick();
                    setActiveTab(tab.id as any);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="final-love-tab-indicator"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-md shadow-pink-500/25"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Area with buttery AnimatePresence & layout */}
        <AnimatePresence mode="wait" initial={false}>
          {/* Tab 1: Interactive Love Vouchers */}
          {activeTab === 'vouchers' && (
            <motion.div
              key="vouchers"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-6 max-h-[48vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {coupons.map((coupon) => (
                  <motion.div
                    key={coupon.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      coupon.redeemed
                        ? 'bg-green-50/80 dark:bg-green-950/30 border-green-300 dark:border-green-800/80'
                        : 'bg-stone-50/80 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:border-pink-300 dark:hover:border-pink-800 shadow-sm'
                    }`}
                    onClick={() => handleRedeemCoupon(coupon.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-3xl">{coupon.icon}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          coupon.redeemed
                            ? 'bg-green-200 dark:bg-green-900/60 text-green-800 dark:text-green-200'
                            : 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300'
                        }`}
                      >
                        {coupon.redeemed ? '✓ Redeemed' : coupon.tag}
                      </span>
                    </div>

                    <div className="my-2">
                      <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm">
                        {coupon.title}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-snug">
                        {coupon.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-[11px] font-medium">
                      <span className="text-stone-400">Valid forever</span>
                      <span className="text-pink-600 dark:text-pink-400 font-semibold">
                        {coupon.redeemed ? 'Tap to Un-redeem' : 'Tap to Redeem ✨'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 2: Reasons Why You Are Loved */}
          {activeTab === 'reasons' && (
            <motion.div
              key="reasons"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-6 max-h-[48vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {loveReasons.map((reason, i) => (
                  <motion.div
                    key={reason.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-pink-50/70 via-white to-rose-50/70 dark:from-stone-800/80 dark:to-stone-900/80 border border-pink-200/80 dark:border-pink-900/40 shadow-sm flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 flex items-center justify-center text-xl shrink-0">
                      {reason.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm font-serif-display">
                        #{reason.id}. {reason.title}
                      </h4>
                      <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tab 3: Mystery Gift Box */}
          {activeTab === 'gift' && (
            <motion.div
              key="gift"
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 max-h-[48vh] overflow-y-auto"
            >
              {!isGiftOpened ? (
                <div className="flex flex-col items-center space-y-3 cursor-pointer" onClick={handleOpenGift}>
                  <motion.div
                    animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    className="w-32 h-32 bg-gradient-to-br from-pink-500 via-rose-500 to-amber-400 rounded-3xl shadow-2xl flex items-center justify-center text-6xl text-white relative border-4 border-white dark:border-stone-800"
                  >
                    🎁
                    {/* Glowing Pulse Aura */}
                    <div className="absolute inset-0 rounded-3xl bg-pink-400/30 blur-xl animate-pulse" />
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif-display text-stone-800 dark:text-stone-100">
                      A Mystery Gift for {data.recipientName} ✨
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Tap the gift box to unwrap your secret birthday surprise!
                    </p>
                  </div>

                  <button
                    id="btn-open-mystery-gift"
                    onClick={handleOpenGift}
                    className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs font-semibold shadow-lg shadow-pink-500/25 animate-bounce mt-2"
                  >
                    Unwrap Surprise 🎀
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center space-y-3 max-w-md bg-gradient-to-br from-amber-50 via-pink-50 to-rose-50 dark:from-stone-800 dark:via-stone-800/90 dark:to-pink-950/40 p-6 rounded-3xl border-2 border-pink-300 dark:border-pink-800 shadow-xl"
                >
                  <div className="text-6xl animate-bounce">🏆🧸✨</div>
                  <h3 className="text-xl font-bold font-serif-display text-pink-600 dark:text-pink-400">
                    Golden Soul of the Universe!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-sans-ui italic">
                    &ldquo;To {data.recipientName} ({data.nickname}): You are loved beyond words, treasured more than you know, and celebrated every single day. Keep shining and making the world magical!&rdquo;
                  </p>
                  <div className="text-xs font-mono text-pink-500 font-semibold pt-1">
                    — Forever with love, {data.senderName} 💌
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/90 border-t border-stone-200 dark:border-stone-700 flex flex-wrap items-center justify-between gap-3">
          {/* Love Burst Button */}
          <button
            id="btn-love-burst"
            onClick={handleLoveBurst}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-950/80 hover:bg-pink-200 dark:hover:bg-pink-900 text-pink-700 dark:text-pink-300 text-xs font-bold rounded-full border border-pink-200 dark:border-pink-800 shadow-sm transition-all transform active:scale-95"
            title="Send Love Sparkles"
          >
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
            <span>Love Sparks ({loveTaps}) 💖</span>
          </button>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            <button
              id="btn-personalize-final"
              onClick={onOpenPersonalize}
              className="px-3.5 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Personalize Name"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Change Name</span>
            </button>

            <button
              id="btn-share-final"
              onClick={handleShare}
              className="px-3.5 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              id="btn-replay-all"
              onClick={onRestart}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-xs font-semibold shadow-md shadow-pink-500/25 transition-all transform active:scale-95 flex items-center gap-1.5"
              title="Replay Celebration"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Experience</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating Heart Sparks Animation */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {heartSparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -90, scale: 1.4 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="fixed text-pink-500 text-2xl drop-shadow"
            style={{ left: spark.x, top: spark.y }}
          >
            💖
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
