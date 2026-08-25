/**
 * Voice Note Player for Proposal Celebration
 * Plays the romantic audio when the YES button is clicked.
 */

type Listener = (state: { isPlaying: boolean; currentTime: number; duration: number }) => void;

class ProposalVoiceEngine {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<Listener> = new Set();
  private audioSrc: string = '/proposal-yes-voice.ogg';

  constructor() {
    // Lazy init
  }

  private init() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio(this.audioSrc);
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => this.notify());
      this.audio.addEventListener('pause', () => this.notify());
      this.audio.addEventListener('ended', () => this.notify());
      this.audio.addEventListener('timeupdate', () => this.notify());
      this.audio.addEventListener('loadedmetadata', () => this.notify());
    }
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState() {
    return {
      isPlaying: this.audio ? !this.audio.paused && !this.audio.ended : false,
      currentTime: this.audio ? this.audio.currentTime : 0,
      duration: this.audio && !isNaN(this.audio.duration) ? this.audio.duration : 0,
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public play() {
    this.init();
    if (this.audio) {
      this.audio.currentTime = 0;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio play was prevented or interrupted:', err);
        });
      }
    }
  }

  public resume() {
    this.init();
    if (this.audio) {
      this.audio.play().catch(console.warn);
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  public toggle() {
    if (this.audio && !this.audio.paused) {
      this.pause();
    } else {
      if (this.audio && this.audio.ended) {
        this.play();
      } else {
        this.resume();
      }
    }
  }

  public seek(time: number) {
    if (this.audio) {
      this.audio.currentTime = time;
    }
  }
}

export const proposalVoice = new ProposalVoiceEngine();
