import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle,
  XCircle,
  HelpCircle,
  Globe,
  Sliders,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { ListeningLesson, Accent, Difficulty, VocabWord } from '../../types';
import { audioService } from '../../services/audioService';
import { WordLookupModal } from '../vocabulary/WordLookupModal';
import { storageService } from '../../services/storageService';

interface ListeningModuleProps {
  lesson: ListeningLesson;
}

export const ListeningModule: React.FC<ListeningModuleProps> = ({ lesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [accent, setAccent] = useState<Accent>('en-US');
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [activeSentenceId, setActiveSentenceId] = useState<number | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);

  // Dictation mode
  const [dictationInput, setDictationInput] = useState('');
  const [dictationResult, setDictationResult] = useState<{ checked: boolean; isCorrect: boolean } | null>(null);

  // Question answers state
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Word lookup popup
  const [selectedWord, setSelectedWord] = useState<Partial<VocabWord> | null>(null);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  useEffect(() => {
    // Reset state on lesson change
    setIsPlaying(false);
    audioService.stop();
    setAnswers({});
    setIsSubmitted(false);
    setDictationInput('');
    setDictationResult(null);
  }, [lesson]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
      setActiveSentenceId(null);
    } else {
      setIsPlaying(true);
      audioService.speak(lesson.audioPrompt, {
        accent,
        rate: playbackRate,
        onEnd: () => {
          setIsPlaying(false);
          setActiveSentenceId(null);
        },
        onError: () => {
          setIsPlaying(false);
          setActiveSentenceId(null);
        }
      });
    }
  };

  const handlePlaySentence = (sentence: { id: number; text: string }) => {
    setActiveSentenceId(sentence.id);
    setIsPlaying(true);
    audioService.speak(sentence.text, {
      accent,
      rate: playbackRate,
      onEnd: () => {
        setIsPlaying(false);
        setActiveSentenceId(null);
      },
      onError: () => {
        setIsPlaying(false);
        setActiveSentenceId(null);
      }
    });
  };

  const handleCheckDictation = () => {
    const target = (lesson.sentences[0]?.text || '').trim().toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const user = dictationInput.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '');
    const isCorrect = target === user;
    setDictationResult({ checked: true, isCorrect });
    if (isCorrect) {
      storageService.updateXP(25);
    }
  };

  const handleSelectAnswer = (qId: string, val: any) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmitQuestions = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    lesson.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    storageService.updateXP(correctCount * 15);
  };

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '');
    if (!cleanWord) return;
    setSelectedWord({
      word: cleanWord,
      meaningVi: 'Bấm lưu để thêm vào danh sách ôn tập cá nhân.',
      topic: 'Listening'
    });
    setIsLookupOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Title & Metadata header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            <span>Kỹ năng Luyện Nghe</span>
            <span aria-hidden="true">·</span>
            <span>Cấp độ: {lesson.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>Lớp {lesson.grade} - Unit {lesson.unit}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{lesson.title}</h2>
        </div>

        {/* Player settings controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Accent toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setAccent('en-US')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                accent === 'en-US' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              🇺🇸 Anh - Mỹ (US)
            </button>
            <button
              onClick={() => setAccent('en-GB')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                accent === 'en-GB' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              🇬🇧 Anh - Anh (UK)
            </button>
          </div>

          {/* Speed rate toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            {[0.75, 1.0, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => setPlaybackRate(rate)}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  playbackRate === rate ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Audio Player Card */}
      <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleTogglePlay}
              className="w-14 h-14 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
              title={isPlaying ? 'Tạm dừng' : 'Phát âm thanh'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <div>
              <div className="text-sm font-semibold text-indigo-300">
                {isPlaying ? 'Đang phát hội thoại thật...' : 'Sẵn sàng phát âm thanh'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Giọng: {accent === 'en-US' ? 'American English' : 'British English'} · Tốc độ: {playbackRate}x
              </div>
            </div>
          </div>

          {/* Audio Waveform visualization */}
          <div className="flex items-center gap-1.5 h-8">
            {[40, 70, 90, 45, 80, 100, 60, 85, 50, 75, 30, 95].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlaying ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'
                }`}
                style={{ height: isPlaying ? `${h}%` : '20%' }}
              />
            ))}
          </div>
        </div>

        {/* Keywords Ribbon */}
        {lesson.keywords.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Từ khóa trọng tâm:</span>
            {lesson.keywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedWord({ word: kw.word, ipa: kw.ipa, meaningVi: kw.meaningVi });
                  setIsLookupOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-indigo-200 border border-slate-700 transition-colors"
              >
                <span>{kw.word}</span>
                <span className="text-slate-400 font-mono text-2xs">{kw.ipa}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sentence-by-sentence Transcript & Lookup */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">Lời thoại bài nghe (Transcript)</h3>
            <span className="text-xs text-slate-500">· Bấm vào từ bất kỳ để tra từ điển</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              {showTranslation ? 'Ẩn bản dịch' : 'Hiện bản dịch tiếng Việt'}
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {lesson.sentences.map((s) => (
            <div
              key={s.id}
              className={`py-3 px-3 rounded-xl transition-colors flex items-start gap-3 ${
                activeSentenceId === s.id ? 'bg-indigo-50/80' : 'hover:bg-slate-50'
              }`}
            >
              <button
                onClick={() => handlePlaySentence(s)}
                className="mt-0.5 p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white transition-colors"
                title="Nghe lại câu này"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div className="flex-1 text-sm space-y-1">
                <p className="text-slate-800 leading-relaxed font-medium">
                  {s.text.split(' ').map((word, wIdx) => (
                    <span
                      key={wIdx}
                      onClick={() => handleWordClick(word)}
                      className="cursor-pointer hover:text-indigo-600 hover:underline transition-colors mr-1"
                    >
                      {word}
                    </span>
                  ))}
                </p>
                {showTranslation && (
                  <p className="text-xs text-slate-500 leading-relaxed">{s.translationVi}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dictation Mode (Nghe chép chính tả) */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Luyện nghe chép chính tả (Dictation)</h3>
            <p className="text-xs text-slate-500">Nghe câu đầu tiên và gõ lại chính xác từng từ bằng tiếng Anh.</p>
          </div>
          <button
            onClick={() => handlePlaySentence(lesson.sentences[0])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs font-semibold hover:bg-sky-100 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Phát câu 1</span>
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={dictationInput}
            onChange={(e) => setDictationInput(e.target.value)}
            placeholder="Gõ lại câu bạn nghe được..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={handleCheckDictation}
              disabled={!dictationInput.trim()}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              Kiểm tra đáp án
            </button>

            {dictationResult?.checked && (
              <div
                className={`flex items-center gap-2 text-xs font-semibold ${
                  dictationResult.isCorrect ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {dictationResult.isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Chính xác 100%! +25 XP
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Đáp án đúng: "{lesson.sentences[0]?.text}"
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comprehension Questions */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Bài tập đọc hiểu bài nghe</h3>
          <span className="text-xs text-slate-500">{lesson.questions.length} câu hỏi</span>
        </div>

        <div className="space-y-6">
          {lesson.questions.map((q, qIndex) => {
            const userAnswer = answers[q.id];
            const isCorrect = isSubmitted && userAnswer === q.correctAnswer;
            const isWrong = isSubmitted && userAnswer !== undefined && userAnswer !== q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-rose-200 bg-rose-50/30'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-900">
                    Câu {qIndex + 1}: {q.prompt}
                  </div>
                  {isSubmitted && (
                    <div>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options?.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={`text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="mr-2 font-bold text-slate-400">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isSubmitted && (
                  <div className="mt-3 p-3 rounded-lg bg-white border border-slate-100 text-xs text-slate-700 space-y-1">
                    <span className="font-semibold text-indigo-700">Giải thích:</span>
                    <p className="leading-relaxed">{q.explanationVi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Questions Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">

          {!isSubmitted ? (
            <button
              onClick={handleSubmitQuestions}
              disabled={Object.keys(answers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 shadow-xs transition-all disabled:opacity-50"
            >
              Nộp bài kiểm tra
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
            >
              Làm lại bài này
            </button>
          )}
        </div>
      </div>

      {/* Word Lookup Popover Modal */}
      <WordLookupModal
        wordData={selectedWord}
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
      />
    </div>
  );
};
