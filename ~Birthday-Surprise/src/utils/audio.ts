// Audio synthesizer and rich sound effects using Web Audio API

export type MusicTheme = 'acoustic' | 'lofi' | 'musicbox' | 'celebration';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volumeLevel: number = 0.55; // Louder, clear default volume (was 0.12)
  private currentTheme: MusicTheme = 'acoustic';
  private bgmPlaying: boolean = false;
  private bgmGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private bgmTimeout: any = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.volumeLevel;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : this.volumeLevel;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volumeLevel = Math.max(0, Math.min(1, vol));
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.value = this.volumeLevel;
    }
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public setTheme(theme: MusicTheme) {
    this.currentTheme = theme;
    if (this.bgmPlaying) {
      this.stopBackgroundMusic();
      this.startBackgroundMusic(theme);
    }
  }

  public getTheme(): MusicTheme {
    return this.currentTheme;
  }

  // Light Switch Click with richer depth
  public playSwitchClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.07);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Candle Blow / Air Puff
  public playCandleBlow() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start();
  }

  // Knife Slice Swoosh
  public playKnifeSlice() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Confetti Pop / Cheerful Party Poppers with rich fanfare
  public playConfettiPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Pop thump
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.12);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.13);

    // Sparkling celebration fanfare arpeggio (C5 -> E5 -> G5 -> C6 -> E6)
    const ctx = this.ctx;
    const masterGain = this.masterGain;
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      const chimeTime = now + 0.04 + i * 0.07;

      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(freq, chimeTime);

      chimeGain.gain.setValueAtTime(0.35, chimeTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, chimeTime + 0.5);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(masterGain);

      chimeOsc.start(chimeTime);
      chimeOsc.stop(chimeTime + 0.52);
    });
  }

  // Card Flip Sound
  public playCardFlip() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.1);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.11);
  }

  // Magical Chime / Wish Made (Rich Pentatonic Shimmer)
  public playChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const ctx = this.ctx;
    const masterGain = this.masterGain;
    const now = ctx.currentTime;
    const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98, 1760.00];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.38, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.8);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(noteTime);
      osc.stop(noteTime + 0.85);
    });
  }

  // Heart Tap / Hug Pop
  public playHeartPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const randomFreq = 520 + Math.random() * 180;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(randomFreq, now);
    osc.frequency.exponentialRampToValueAtTime(randomFreq * 1.6, now + 0.09);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Balloon Float Sound
  public playBalloonWhoosh() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.4);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Rich Polyphonic Birthday Melody Synthesizer with chords & bass
  public startBackgroundMusic(theme: MusicTheme = this.currentTheme) {
    if (this.bgmPlaying) return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;

    this.bgmPlaying = true;
    this.currentTheme = theme;

    if (this.bgmGain) {
      try {
        this.bgmGain.disconnect();
      } catch {
        // ignore
      }
    }

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    this.bgmGain.connect(this.masterGain);

    // Full Happy Birthday melody sheet with chords & bass notes
    // Frequencies: C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, Bb4=466.16, C5=523.25, D5=587.33, E5=659.25, F5=698.46
    const score = [
      // Measure 1: "Happy Birthday to you" (C Major / F Major)
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.35, pause: 0.05 },
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.30, pause: 0.05 },
      { lead: 293.66, bass: 146.83, chord: [349.23, 440.00], dur: 0.65, pause: 0.08 },
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.65, pause: 0.08 },
      { lead: 349.23, bass: 174.61, chord: [440.00, 523.25], dur: 0.70, pause: 0.08 },
      { lead: 329.63, bass: 164.81, chord: [392.00, 493.88], dur: 1.25, pause: 0.20 },

      // Measure 2: "Happy Birthday to you" (C -> G -> C)
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.35, pause: 0.05 },
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.30, pause: 0.05 },
      { lead: 293.66, bass: 146.83, chord: [349.23, 440.00], dur: 0.65, pause: 0.08 },
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.65, pause: 0.08 },
      { lead: 392.00, bass: 196.00, chord: [493.88, 587.33], dur: 0.70, pause: 0.08 },
      { lead: 349.23, bass: 174.61, chord: [440.00, 523.25], dur: 1.25, pause: 0.20 },

      // Measure 3: "Happy Birthday dear Siya" (High Climax!)
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.35, pause: 0.05 },
      { lead: 261.63, bass: 130.81, chord: [329.63, 392.00], dur: 0.30, pause: 0.05 },
      { lead: 523.25, bass: 261.63, chord: [659.25, 783.99], dur: 0.75, pause: 0.08 }, // High C5
      { lead: 440.00, bass: 220.00, chord: [554.37, 659.25], dur: 0.65, pause: 0.08 },
      { lead: 349.23, bass: 174.61, chord: [440.00, 523.25], dur: 0.65, pause: 0.08 },
      { lead: 329.63, bass: 164.81, chord: [392.00, 493.88], dur: 0.65, pause: 0.08 },
      { lead: 293.66, bass: 146.83, chord: [349.23, 440.00], dur: 1.30, pause: 0.20 },

      // Measure 4: "Happy Birthday to you!" (Grand Finish)
      { lead: 466.16, bass: 233.08, chord: [587.33, 698.46], dur: 0.35, pause: 0.05 },
      { lead: 466.16, bass: 233.08, chord: [587.33, 698.46], dur: 0.30, pause: 0.05 },
      { lead: 440.00, bass: 220.00, chord: [554.37, 659.25], dur: 0.65, pause: 0.08 },
      { lead: 349.23, bass: 174.61, chord: [440.00, 523.25], dur: 0.65, pause: 0.08 },
      { lead: 392.00, bass: 196.00, chord: [493.88, 587.33], dur: 0.75, pause: 0.08 },
      { lead: 349.23, bass: 174.61, chord: [440.00, 523.25], dur: 1.60, pause: 0.40 },
    ];

    let currentStep = 0;

    const playStep = () => {
      if (!this.bgmPlaying || !this.ctx || !this.bgmGain) return;

      const item = score[currentStep];
      const now = this.ctx.currentTime;

      // 1. LEAD VOICE (Warm electric piano / bell / acoustic guitar tone)
      const leadOsc = this.ctx.createOscillator();
      const leadGain = this.ctx.createGain();

      if (theme === 'musicbox') {
        leadOsc.type = 'sine';
      } else if (theme === 'celebration') {
        leadOsc.type = 'triangle';
      } else {
        // Acoustic / Lofi Rich Tone (triangle + subtle warmth)
        leadOsc.type = 'triangle';
      }

      leadOsc.frequency.setValueAtTime(item.lead, now);
      leadGain.gain.setValueAtTime(0.42, now);
      leadGain.gain.exponentialRampToValueAtTime(0.002, now + item.dur * 1.3);

      leadOsc.connect(leadGain);
      leadGain.connect(this.bgmGain);
      leadOsc.start(now);
      leadOsc.stop(now + item.dur * 1.35);

      // 2. WARM HARMONY CHORDS (adds richness and musical body)
      if (item.chord) {
        item.chord.forEach((chordFreq) => {
          const chordOsc = this.ctx!.createOscillator();
          const chordGain = this.ctx!.createGain();

          chordOsc.type = 'sine';
          chordOsc.frequency.setValueAtTime(chordFreq, now);

          chordGain.gain.setValueAtTime(0.16, now);
          chordGain.gain.exponentialRampToValueAtTime(0.001, now + item.dur * 1.4);

          chordOsc.connect(chordGain);
          chordGain.connect(this.bgmGain!);
          chordOsc.start(now);
          chordOsc.stop(now + item.dur * 1.45);
        });
      }

      // 3. WARM ACOUSTIC BASS NOTE (for full, soothing music foundation)
      if (item.bass) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();

        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(item.bass, now);

        bassGain.gain.setValueAtTime(0.25, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + item.dur * 1.5);

        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmGain);
        bassOsc.start(now);
        bassOsc.stop(now + item.dur * 1.55);
      }

      currentStep = (currentStep + 1) % score.length;
      const totalDelay = (item.dur + item.pause) * 1000;
      this.bgmTimeout = setTimeout(playStep, totalDelay);
    };

    playStep();
  }

  public stopBackgroundMusic() {
    this.bgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
    if (this.bgmGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.bgmGain.gain.setValueAtTime(this.bgmGain.gain.value, now);
        this.bgmGain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        const oldGain = this.bgmGain;
        setTimeout(() => {
          try {
            oldGain.disconnect();
          } catch {
            // ignore
          }
        }, 100);
      } catch {
        // ignore
      }
    }
  }

  public isMusicPlaying(): boolean {
    return this.bgmPlaying;
  }
}

export const soundManager = new SoundManager();

