import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, Music, Play, Pause, Disc } from 'lucide-react';
import { soundManager, MusicTheme } from '../utils/audio';

interface AudioPlayerProps {
  trackTitle?: string;
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  trackTitle = 'Acoustic Birthday Melody 🎵',
  autoPlay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<MusicTheme>('acoustic');
  const [volume, setVolume] = useState(0.65);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (autoPlay && !isPlaying) {
      soundManager.startBackgroundMusic(currentTheme);
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      soundManager.stopBackgroundMusic();
      setIsPlaying(false);
    } else {
      soundManager.startBackgroundMusic(currentTheme);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    soundManager.setMuted(newMuteState);
    setIsMuted(newMuteState);
  };

  const handleThemeChange = (theme: MusicTheme) => {
    setCurrentTheme(theme);
    soundManager.setTheme(theme);
    if (!isPlaying) {
      soundManager.startBackgroundMusic(theme);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundManager.setVolume(val);
    if (isMuted && val > 0) {
      soundManager.setMuted(false);
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex flex-col items-end gap-1.5">
      <div
        id="audio-player-pill"
        className="flex items-center gap-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/90 dark:border-stone-700/80 shadow-lg shadow-pink-500/10 transition-all text-xs font-medium text-stone-700 dark:text-stone-200"
      >
        {/* Play/Pause Button */}
        <button
          id="btn-toggle-bgm"
          onClick={togglePlay}
          className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400 transition-colors focus:outline-none"
          title={isPlaying ? 'Pause Song' : 'Play Louder Song'}
        >
          <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-sm shadow-pink-500/30">
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-current" />
            ) : (
              <Play className="w-3 h-3 fill-current ml-0.5" />
            )}
          </div>

          {/* Dynamic Equalizer Bars */}
          <div className="flex items-end gap-0.5 h-3.5 w-3.5 px-0.5">
            {[0.7, 1.4, 0.5, 1.0].map((height, i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-pink-500 rounded-full"
                animate={
                  isPlaying && !isMuted
                    ? { height: ['25%', `${height * 100}%`, '25%'] }
                    : { height: '25%' }
                }
                transition={{
                  repeat: Infinity,
                  duration: 0.7 + i * 0.18,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <span className="hidden sm:inline-block font-sans-ui text-[11px] text-stone-700 dark:text-stone-200 font-semibold truncate max-w-[140px]">
            {isPlaying ? `♪ ${trackTitle}` : 'Play Music 🎵'}
          </span>
        </button>

        <div className="w-px h-3.5 bg-stone-300 dark:bg-stone-700 mx-0.5" />

        {/* Volume / Settings dropdown toggle */}
        <button
          id="btn-music-settings"
          onClick={() => setShowControls(!showControls)}
          className="p-1 text-stone-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors rounded-full focus:outline-none"
          title="Adjust Volume & Song Theme"
        >
          <Disc className="w-3.5 h-3.5 text-pink-500 animate-spin-slow" />
        </button>

        {/* Mute SFX Toggle */}
        <button
          id="btn-toggle-mute"
          onClick={toggleMute}
          className="p-1 text-stone-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors rounded-full focus:outline-none"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-pink-500" />
          )}
        </button>
      </div>

      {/* Expanded Audio Controls & Volume Bar */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xl w-60 space-y-2.5 text-xs text-stone-700 dark:text-stone-200"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[11px] text-pink-600 dark:text-pink-400 uppercase tracking-wider">
              Music Volume: {Math.round(volume * 100)}% 🔊
            </span>
            <button
              onClick={() => {
                setVolume(0.9);
                soundManager.setVolume(0.9);
              }}
              className="text-[10px] bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 px-1.5 py-0.5 rounded font-semibold hover:bg-pink-200 transition-colors"
            >
              Max Boost 🚀
            </button>
          </div>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-pink-500 cursor-pointer h-1.5 bg-stone-200 dark:bg-stone-700 rounded-lg"
          />

          {/* Music Theme Selector */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
              Choose Melody Style:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'acoustic', label: '🎸 Acoustic Harmony' },
                { id: 'celebration', label: '🎉 Party Fanfare' },
                { id: 'musicbox', label: '✨ Music Box' },
                { id: 'lofi', label: '☕ Sweet Lofi' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id as MusicTheme)}
                  className={`px-2 py-1 rounded-lg text-[11px] text-left truncate transition-colors ${
                    currentTheme === t.id
                      ? 'bg-pink-500 text-white font-medium shadow-sm'
                      : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

