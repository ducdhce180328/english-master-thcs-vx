import React from 'react';
import { Volume2, Bookmark, Check, X } from 'lucide-react';
import { VocabWord } from '../../types';
import { audioService } from '../../services/audioService';
import { storageService } from '../../services/storageService';

interface WordLookupModalProps {
  wordData: Partial<VocabWord> | null;
  isOpen: boolean;
  onClose: () => void;
  onSavedToFlashcards?: () => void;
}

export const WordLookupModal: React.FC<WordLookupModalProps> = ({
  wordData,
  isOpen,
  onClose,
  onSavedToFlashcards
}) => {
  const [isSaved, setIsSaved] = React.useState(false);
  const [accent, setAccent] = React.useState<'en-US' | 'en-GB'>('en-US');

  React.useEffect(() => {
    if (wordData?.word) {
      const saved = storageService.getSavedVocab();
      setIsSaved(saved.some((w) => w.word.toLowerCase() === wordData.word?.toLowerCase()));
    }
  }, [wordData]);

  if (!isOpen || !wordData || !wordData.word) return null;

  const handlePlayAudio = () => {
    if (wordData.word) {
      audioService.speak(wordData.word, { accent });
    }
  };

  const handleSaveFlashcard = () => {
    if (!wordData.word) return;
    const vocab: VocabWord = {
      id: 'saved-' + Date.now(),
      word: wordData.word,
      ipa: wordData.ipa || '/.../',
      partOfSpeech: wordData.partOfSpeech || 'vocabulary',
      meaningVi: wordData.meaningVi || 'Từ vựng quan trọng',
      exampleEn: wordData.exampleEn || `I learned the word "${wordData.word}" today.`,
      exampleVi: wordData.exampleVi || `Tôi đã học từ "${wordData.word}" hôm nay.`,
      topic: wordData.topic || 'General',
      grade: (wordData.grade as any) || 6,
      unit: wordData.unit || 1,
      isStarred: true
    };

    storageService.saveVocabWord(vocab);
    setIsSaved(true);
    onSavedToFlashcards?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase">
            <span>Tra cứu từ vựng THCS</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-normal">{wordData.partOfSpeech || 'Từ loại'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{wordData.word}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                <span className="font-mono text-indigo-600">{wordData.ipa || '/.../'}</span>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setAccent(accent === 'en-US' ? 'en-GB' : 'en-US')}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 underline"
                  title="Chuyển giọng US/UK"
                >
                  {accent === 'en-US' ? 'US (Mỹ)' : 'UK (Anh)'}
                </button>
              </div>
            </div>

            <button
              onClick={handlePlayAudio}
              className="p-3 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors active:scale-95"
              title="Nghe phát âm chuẩn"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Nghĩa tiếng Việt</div>
            <div className="text-base font-medium text-slate-900">{wordData.meaningVi || 'Đang cập nhật...'}</div>
          </div>

          {wordData.exampleEn && (
            <div className="space-y-1.5 text-sm">
              <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Ví dụ ngữ cảnh</div>
              <p className="text-slate-800 italic font-medium">"{wordData.exampleEn}"</p>
              {wordData.exampleVi && <p className="text-slate-600">{wordData.exampleVi}</p>}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={handleSaveFlashcard}
              disabled={isSaved}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all shadow-xs ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-98'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  Đã thêm vào Flashcards
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  Lưu vào Flashcards
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
