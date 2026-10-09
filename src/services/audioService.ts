import { Accent } from '../types';

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public getAvailableVoices(accent: Accent): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    const targetLang = accent === 'en-GB' ? 'en-GB' : 'en-US';
    return this.voices.filter((v) => v.lang.includes(targetLang) || (targetLang === 'en-US' && v.lang.startsWith('en')));
  }

  public speak(
    text: string,
    options: {
      accent?: Accent;
      rate?: number; // 0.75, 1, 1.25
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
      onBoundary?: (charIndex: number) => void;
    } = {}
  ) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      options.onError?.(new Error('Trình duyệt chưa hỗ trợ phát âm thanh trực tiếp.'));
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const accent = options.accent || 'en-US';
    utterance.rate = options.rate || 1.0;
    utterance.pitch = 1.0;
    utterance.lang = accent;

    // Pick best matching voice
    const matchingVoices = this.getAvailableVoices(accent);
    if (matchingVoices.length > 0) {
      // Prefer Google or Natural voices if available
      const preferred = matchingVoices.find((v) => v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('English')) || matchingVoices[0];
      utterance.voice = preferred;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      options.onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      options.onError?.(e);
    };

    if (options.onBoundary) {
      utterance.onboundary = (e) => {
        options.onBoundary?.(e.charIndex);
      };
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public pause() {
    if (this.synth) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth) {
      this.synth.resume();
    }
  }

  public getIsSpeaking() {
    return this.isSpeaking;
  }
}

export const audioService = new AudioService();
