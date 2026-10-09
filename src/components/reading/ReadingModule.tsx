import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
  HelpCircle,
  Highlighter,
  Volume2
} from 'lucide-react';
import { ReadingLesson, VocabWord } from '../../types';
import { WordLookupModal } from '../vocabulary/WordLookupModal';
import { audioService } from '../../services/audioService';
import { storageService } from '../../services/storageService';

interface ReadingModuleProps {
  lesson: ReadingLesson;
}

export const ReadingModule: React.FC<ReadingModuleProps> = ({ lesson }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [highlightEvidence, setHighlightEvidence] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  // Word lookup popup
  const [selectedWord, setSelectedWord] = useState<Partial<VocabWord> | null>(null);
  const [isLookupOpen, setIsLookupOpen] = useState(false);

  const handleSelectAnswer = (qId: string, val: any) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    lesson.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    storageService.updateXP(correctCount * 20);
  };

  const handleWordClick = (rawWord: string) => {
    const cleanWord = rawWord.replace(/[^a-zA-Z]/g, '');
    if (!cleanWord) return;

    // Check if it's one of the highlighted vocab
    const found = lesson.vocabularyHighlights.find(
      (v) => v.word.toLowerCase() === cleanWord.toLowerCase()
    );

    setSelectedWord({
      word: cleanWord,
      ipa: found?.ipa || '/.../',
      meaningVi: found?.meaningVi || 'Bấm lưu để thêm vào Flashcard cá nhân.',
      topic: lesson.topic,
      grade: lesson.grade,
      unit: lesson.unit
    });
    setIsLookupOpen(true);
  };

  const handlePlayReadingAloud = () => {
    audioService.speak(lesson.passage, { rate: 0.95 });
  };

  // Render passage with clickable words and potential evidence highlight
  const renderPassageWithInteractions = () => {
    const words = lesson.passage.split(' ');
    return (
      <div className="text-base text-slate-800 leading-relaxed font-normal selection:bg-indigo-100">
        {words.map((word, idx) => {
          const clean = word.toLowerCase().replace(/[^a-z]/g, '');
          const isEvidenceMatch =
            highlightEvidence &&
            highlightEvidence.toLowerCase().includes(clean) &&
            clean.length > 2;

          return (
            <span
              key={idx}
              onClick={() => handleWordClick(word)}
              className={`cursor-pointer transition-colors mr-1 inline-block hover:text-indigo-600 hover:underline ${
                isEvidenceMatch
                  ? 'bg-amber-200 text-amber-950 font-medium px-1 rounded-sm'
                  : ''
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <span>Kỹ năng Luyện Đọc (Reading)</span>
            <span aria-hidden="true">·</span>
            <span>Độ dài: {lesson.wordCount} từ</span>
            <span aria-hidden="true">·</span>
            <span>Lớp {lesson.grade} - Unit {lesson.unit}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{lesson.title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayReadingAloud}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            title="Đọc to bài đọc"
          >
            <Volume2 className="w-4 h-4 text-slate-600" />
            <span>Nghe giọng đọc</span>
          </button>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-xs hover:bg-emerald-100 transition-colors"
          >
            {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showTranslation ? 'Ẩn bản dịch' : 'Bản dịch tiếng Việt'}</span>
          </button>
        </div>
      </div>

      {/* Main Reading Passage Card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
          <span>💡 <strong>Mẹo đọc hiểu:</strong> Bấm vào bất kỳ từ nào để tra nhanh từ điển & lưu vào thẻ nhớ!</span>
          {highlightEvidence && (
            <button
              onClick={() => setHighlightEvidence(null)}
              className="text-amber-700 font-semibold hover:underline"
            >
              Tắt đánh dấu dẫn chứng
            </button>
          )}
        </div>

        {/* English Passage with Clickable Tokens */}
        <div className="p-6 rounded-2xl bg-slate-50/60 border border-slate-100">
          {renderPassageWithInteractions()}
        </div>

        {/* Translation Card if toggled */}
        {showTranslation && (
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 animate-in fade-in duration-200">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Bản dịch tiếng Việt tham khảo:
            </span>
            <p className="text-sm text-slate-700 leading-relaxed">{lesson.translationVi}</p>
          </div>
        )}

        {/* Key Vocabulary Highlights */}
        {lesson.vocabularyHighlights.length > 0 && (
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Từ vựng quan trọng trong bài:
            </span>
            <div className="flex flex-wrap gap-2">
              {lesson.vocabularyHighlights.map((v, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedWord(v);
                    setIsLookupOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-xs font-medium text-slate-800 hover:text-indigo-700 border border-slate-200/80 transition-colors"
                >
                  <span className="font-bold">{v.word}</span>{' '}
                  <span className="text-slate-500 font-mono text-2xs">{v.ipa}</span>: {v.meaningVi}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comprehension Questions */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Câu hỏi đọc hiểu chi tiết</h3>
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
                className={`p-5 rounded-2xl border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-rose-200 bg-rose-50/30'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold text-slate-900 leading-snug">
                    Câu {qIndex + 1}: {q.prompt}
                  </div>
                  {isSubmitted && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options?.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={`text-left p-3.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold shadow-xs'
                            : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300'
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

                {/* Evidence Highlight Button & Explanation */}
                {isSubmitted && (
                  <div className="mt-4 space-y-3 pt-3 border-t border-slate-100 text-xs">
                    {q.passageEvidence && (
                      <button
                        onClick={() => setHighlightEvidence(q.passageEvidence || null)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 font-semibold border border-amber-200 hover:bg-amber-100 transition-colors"
                      >
                        <Highlighter className="w-3.5 h-3.5" />
                        <span>Xem vị trí dẫn chứng trong bài đọc</span>
                      </button>
                    )}

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 space-y-1">
                      <span className="font-semibold text-indigo-700 block">Lời giải chi tiết:</span>
                      <p className="leading-relaxed">{q.explanationVi}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Reset actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 shadow-xs transition-all disabled:opacity-50"
            >
              Nộp bài đọc
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
                setHighlightEvidence(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
            >
              Làm lại bài
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
