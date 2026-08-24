/**
 * High-quality Web Audio API Romantic Synthesizer
 * Plays soothing ambient music-box / soft acoustic piano chords
 */
class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;
  private gainNode: GainNode | null = null;

  // Gentle romantic melody notes (Frequencies in Hz)
  // Progression in F major / D minor romantic soft scales
  private melodyNotes: { freq: number; duration: number; type: 'piano' | 'bell' | 'pad' }[] = [
    { freq: 349.23, duration: 1.2, type: 'piano' }, // F4
    { freq: 440.00, duration: 0.8, type: 'bell' },  // A4
    { freq: 523.25, duration: 1.4, type: 'piano' }, // C5
    { freq: 659.25, duration: 1.0, type: 'bell' },  // E5
    { freq: 587.33, duration: 1.6, type: 'piano' }, // D5
    { freq: 440.00, duration: 0.8, type: 'bell' },  // A4
    { freq: 392.00, duration: 1.2, type: 'piano' }, // G4
    { freq: 523.25, duration: 1.5, type: 'piano' }, // C5
    { freq: 349.23, duration: 1.0, type: 'bell' },  // F4
    { freq: 392.00, duration: 1.2, type: 'piano' }, // G4
    { freq: 440.00, duration: 1.6, type: 'piano' }, // A4
    { freq: 329.63, duration: 1.8, type: 'pad' },   // E4
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTone(freq: number, duration: number, type: 'piano' | 'bell' | 'pad') {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    if (type === 'bell') {
      osc.type = 'sine';
    } else if (type === 'pad') {
      osc.type = 'triangle';
    } else {
      osc.type = 'sine';
    }

    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm envelope
    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(type === 'bell' ? 0.3 : 0.2, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  public start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNext();
  }

  private scheduleNext = () => {
    if (!this.isPlaying || !this.ctx) return;

    const current = this.melodyNotes[this.currentNoteIndex];
    this.playTone(current.freq, current.duration, current.type);

    // Occasional low bass root note for warmth
    if (this.currentNoteIndex % 4 === 0) {
      this.playTone(current.freq / 2, current.duration * 1.8, 'pad');
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
    this.timerId = window.setTimeout(this.scheduleNext, current.duration * 750);
  };

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(val: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
