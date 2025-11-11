class SoundManager {
  private enabled: boolean = true;
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('Audio context not available');
      }
    }
  }

  private playTone(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  click() {
    this.playTone(800, 0.1, 0.2);
  }

  correct() {
    this.playTone(523, 0.15, 0.25);
    setTimeout(() => this.playTone(659, 0.2, 0.25), 100);
  }

  success() {
    this.playTone(523, 0.15, 0.3);
    setTimeout(() => this.playTone(659, 0.15, 0.3), 150);
    setTimeout(() => this.playTone(784, 0.3, 0.3), 300);
  }

  celebrate() {
    const notes = [523, 587, 659, 784, 880];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 0.2, 0.25), i * 100);
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
