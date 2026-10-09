export interface RecognitionResult {
  transcript: string;
  isFinal: boolean;
  confidence: number;
}

export interface SpeechComparison {
  score: number; // 0 - 10
  accuracy: number; // 0 - 100%
  matchedWords: string[];
  missingWords: string[];
  extraWords: string[];
  wordStatuses: { word: string; status: 'correct' | 'missing' | 'mispronounced' }[];
  fluencyScore: number;
  tipsVi: string[];
}

export class SpeechRecognitionService {
  private recognition: any = null;
  private isListening = false;
  private onResultCallback: ((result: RecognitionResult) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';
          let maxConfidence = 0.8;

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
              maxConfidence = event.results[i][0].confidence || 0.85;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const currentText = finalTranscript || interimTranscript;
          if (this.onResultCallback && currentText) {
            this.onResultCallback({
              transcript: currentText.trim(),
              isFinal: Boolean(finalTranscript),
              confidence: maxConfidence
            });
          }
        };

        this.recognition.onerror = (event: any) => {
          console.warn('SpeechRecognition error:', event.error);
          this.isListening = false;
          if (this.onErrorCallback) {
            let msg = 'Lỗi nhận diện âm thanh.';
            if (event.error === 'not-allowed') {
              msg = 'Vui lòng cấp quyền truy cập Microphone trong trình duyệt để luyện nói.';
            } else if (event.error === 'no-speech') {
              msg = 'Chưa nghe thấy giọng nói. Hãy nói to và gần micro hơn nhé!';
            }
            this.onErrorCallback(msg);
          }
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.onEndCallback?.();
        };
      }
    }
  }

  public isSupported(): boolean {
    return Boolean(this.recognition);
  }

  public async requestMicrophonePermission(): Promise<boolean> {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop tracks immediately after granting permission check
        stream.getTracks().forEach((track) => track.stop());
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Mic permission error:', err);
      return false;
    }
  }

  public startListening(callbacks: {
    lang?: string;
    onResult: (result: RecognitionResult) => void;
    onError: (error: string) => void;
    onEnd: () => void;
  }) {
    if (!this.recognition) {
      callbacks.onError('Trình duyệt hiện tại chưa hỗ trợ Web Speech API nhận diện giọng nói.');
      return;
    }

    if (callbacks.lang) {
      this.recognition.lang = callbacks.lang;
    }

    this.onResultCallback = callbacks.onResult;
    this.onErrorCallback = callbacks.onError;
    this.onEndCallback = callbacks.onEnd;

    try {
      this.isListening = true;
      this.recognition.start();
    } catch (err: any) {
      console.warn('Recognition start error:', err);
      // If already started, ignore
      if (err.name !== 'InvalidStateError') {
        callbacks.onError('Không thể khởi động micro: ' + err.message);
      }
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.isListening = false;
  }

  public compareSpeech(spokenText: string, targetSentence: string): SpeechComparison {
    return this.comparePronunciation(targetSentence, spokenText);
  }

  public comparePronunciation(targetSentence: string, spokenText: string): SpeechComparison {
    const clean = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim();

    const targetWords = clean(targetSentence).split(/\s+/).filter(Boolean);
    const spokenWords = clean(spokenText).split(/\s+/).filter(Boolean);

    const matchedWords: string[] = [];
    const missingWords: string[] = [];
    const extraWords: string[] = [];

    const wordStatuses: { word: string; status: 'correct' | 'missing' | 'mispronounced' }[] = [];

    targetWords.forEach((tw) => {
      if (spokenWords.includes(tw)) {
        matchedWords.push(tw);
        wordStatuses.push({ word: tw, status: 'correct' });
      } else {
        missingWords.push(tw);
        wordStatuses.push({ word: tw, status: 'missing' });
      }
    });

    spokenWords.forEach((sw) => {
      if (!targetWords.includes(sw)) {
        extraWords.push(sw);
      }
    });

    const matchRatio = targetWords.length > 0 ? matchedWords.length / targetWords.length : 0;
    const score = Math.round(matchRatio * 10 * 10) / 10;
    const accuracy = Math.round(matchRatio * 100);

    const tipsVi: string[] = [];
    if (accuracy === 100) {
      tipsVi.push('Xuất sắc! Bạn phát âm đúng toàn bộ các từ trong câu.');
      tipsVi.push('Ngữ điệu tự nhiên và trôi chảy.');
    } else if (accuracy >= 70) {
      tipsVi.push(`Đạt kết quả tốt! Bạn đã phát âm đúng ${matchedWords.length}/${targetWords.length} từ.`);
      if (missingWords.length > 0) {
        tipsVi.push(`Lưu ý phát âm rõ hơn các từ: ${missingWords.slice(0, 3).join(', ')}`);
      }
    } else {
      tipsVi.push('Cần luyện tập thêm. Hãy nghe mẫu lại và nói chậm rãi từng từ.');
      if (missingWords.length > 0) {
        tipsVi.push(`Chú ý các từ: ${missingWords.slice(0, 3).join(', ')}`);
      }
    }

    return {
      score,
      accuracy,
      matchedWords,
      missingWords,
      extraWords,
      wordStatuses,
      fluencyScore: Math.min(10, Math.round((matchRatio * 9 + 1) * 10) / 10),
      tipsVi
    };
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
