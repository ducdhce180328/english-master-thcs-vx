import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Volume2,
  RotateCw,
  Check,
  X,
  Zap,
  Clock,
  Sparkles,
  Trophy,
  Star,
  Shuffle,
  VolumeX,
  Play
} from 'lucide-react';
import { VocabWord, GradeLevel } from '../../types';
import { audioService } from '../../services/audioService';
import { storageService } from '../../services/storageService';

interface VocabularyModuleProps {
  vocabularies: VocabWord[];
  grade: GradeLevel;
  unit: number;
}

export const VocabularyModule: React.FC<VocabularyModuleProps> = ({
  vocabularies,
  grade,
  unit
}) => {
  const [activeTab, setActiveTab] = useState<'flashcards' | 'quiz' | 'speed_match' | 'notebook'>('flashcards');

  // Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [starredMap, setStarredMap] = useState<Record<string, boolean>>({});

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<string | null>(null);
  const [quizShowFeedback, setQuizShowFeedback] = useState(false);

  // Speed Match State
  const [matchPairs, setMatchPairs] = useState<{ id: string; text: string; type: 'en' | 'vi'; pairId: string }[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{ id: string; type: 'en' | 'vi'; pairId: string } | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSpeedGameActive, setIsSpeedGameActive] = useState(false);
  const [speedGameFinished, setSpeedGameFinished] = useState(false);

  // Saved Notebook
  const [savedWords, setSavedWords] = useState<VocabWord[]>([]);

  useEffect(() => {
    // load saved vocab
    const saved = storageService.getSavedVocab();
    setSavedWords(saved);
    setStarredMap(Object.fromEntries(saved.map(word => [word.id, true])));
  }, []);

  const currentWord = vocabularies[currentIndex] || vocabularies[0];

  const handlePlayAudio = (word: string) => {
    audioService.speak(word, { rate: 0.95 });
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % vocabularies.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + vocabularies.length) % vocabularies.length);
  };

  const handleRateSRS = (difficulty: 'hard' | 'medium' | 'easy') => {
    // Award XP
    const xpBonus = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 7 : 4;
    storageService.updateXP(xpBonus);
    storageService.saveVocabWord(currentWord);
    setSavedWords(storageService.getSavedVocab());
    setStarredMap(prev => ({ ...prev, [currentWord.id]: true }));
    handleNextCard();
  };

  const handleToggleStar = (w: VocabWord) => {
    const nextState = !starredMap[w.id];
    setStarredMap((prev) => ({ ...prev, [w.id]: nextState }));
    if (nextState) {
      storageService.saveVocabWord(w);
      setSavedWords(storageService.getSavedVocab());
    } else {
      storageService.removeSavedVocab(w.id);
      setSavedWords(storageService.getSavedVocab());
    }
  };

  // Setup speed game
  const startSpeedMatchGame = () => {
    const sampleWords = [...vocabularies].sort(() => 0.5 - Math.random()).slice(0, 5);
    const items: { id: string; text: string; type: 'en' | 'vi'; pairId: string }[] = [];

    sampleWords.forEach((w) => {
      items.push({ id: `en-${w.id}`, text: w.word, type: 'en', pairId: w.id });
      items.push({ id: `vi-${w.id}`, text: w.meaningVi, type: 'vi', pairId: w.id });
    });

    setMatchPairs(items.sort(() => 0.5 - Math.random()));
    setSelectedMatch(null);
    setMatchedIds([]);
    setTimeLeft(45);
    setIsSpeedGameActive(true);
    setSpeedGameFinished(false);
  };

  useEffect(() => {
    let timer: any = null;
    if (isSpeedGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsSpeedGameActive(false);
            setSpeedGameFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSpeedGameActive, timeLeft]);

  const handleSelectMatchCard = (item: { id: string; text: string; type: 'en' | 'vi'; pairId: string }) => {
    if (matchedIds.includes(item.id)) return;

    if (!selectedMatch) {
      setSelectedMatch(item);
      if (item.type === 'en') handlePlayAudio(item.text);
    } else {
      if (selectedMatch.id === item.id) {
        setSelectedMatch(null);
        return;
      }

      // Check match
      if (selectedMatch.pairId === item.pairId && selectedMatch.type !== item.type) {
        setMatchedIds((prev) => [...prev, selectedMatch.id, item.id]);
        setSelectedMatch(null);
        storageService.updateXP(15);
        if (matchedIds.length + 2 >= matchPairs.length) {
          setIsSpeedGameActive(false);
          setSpeedGameFinished(true);
          storageService.updateXP(50);
        }
      } else {
        // wrong match
        setTimeout(() => setSelectedMatch(null), 500);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <span>Kho từ vựng & Thẻ nhớ Spaced Repetition</span>
            <span aria-hidden="true">·</span>
            <span>Lớp {grade} - Unit {unit}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Học Từ Vựng & Luyện Phản Xạ
          </h2>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'flashcards' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Thẻ nhớ Flashcards
          </button>
          <button
            onClick={() => setActiveTab('speed_match')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'speed_match' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Ghép từ 45s
          </button>
          <button
            onClick={() => setActiveTab('notebook')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'notebook' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Sổ từ cá nhân ({savedWords.length})
          </button>
        </div>
      </div>

      {activeTab === 'flashcards' && currentWord && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Card Counter & Progress */}
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>
              Thẻ {currentIndex + 1} / {vocabularies.length}
            </span>
            <span>Chủ đề: {currentWord.topic}</span>
          </div>

          {/* 3D Flashcard Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[300px] p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between select-none relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {isFlipped ? 'Mặt sau: Nghĩa & Ví dụ' : 'Mặt trước: Từ vựng & Phát âm'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStar(currentWord);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                title="Đánh dấu từ quan trọng"
              >
                <Star
                  className={`w-5 h-5 ${
                    starredMap[currentWord.id] ? 'text-amber-500 fill-amber-500' : ''
                  }`}
                />
              </button>
            </div>

            {/* Card Content based on flip state */}
            {!isFlipped ? (
              <div className="my-auto text-center space-y-4">
                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {currentWord.word}
                </h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-base text-indigo-600 font-medium">
                    {currentWord.ipa}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(currentWord.word);
                    }}
                    className="p-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 italic">
                  ({currentWord.partOfSpeech}) · Bấm để lật thẻ
                </div>
              </div>
            ) : (
              <div className="my-auto text-center space-y-4 animate-in fade-in duration-200">
                <div className="text-2xl font-bold text-slate-900">
                  {currentWord.meaningVi}
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Ví dụ câu:
                  </div>
                  <p className="text-sm font-medium text-slate-800 italic">
                    "{currentWord.exampleEn}"
                  </p>
                  <p className="text-xs text-slate-500">{currentWord.exampleVi}</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-1 text-2xs text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Chạm để lật mặt thẻ</span>
            </div>
          </div>

          {/* SRS Grading Buttons (Spaced Repetition) */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleRateSRS('hard')}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold text-xs transition-colors"
            >
              Chưa nhớ (Ôn lại ngay)
            </button>
            <button
              onClick={() => handleRateSRS('medium')}
              className="flex-1 py-3 px-4 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 font-semibold text-xs transition-colors"
            >
              Tạm ổn (Sau 3 ngày)
            </button>
            <button
              onClick={() => handleRateSRS('easy')}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs transition-colors"
            >
              Đã thuộc (Sau 7 ngày)
            </button>
          </div>

          {/* Prev / Next Card Navigator */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              ← Thẻ trước
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Thẻ tiếp theo →
            </button>
          </div>
        </div>
      )}

      {/* Speed Matching Game Mode */}
      {activeTab === 'speed_match' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Thử thách ghép cặp tốc độ (45s)</h3>
              <p className="text-xs text-slate-500">Ghép từ tiếng Anh với nghĩa tiếng Việt tương ứng thật nhanh!</p>
            </div>
            {isSpeedGameActive && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 font-bold text-sm">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>

          {!isSpeedGameActive && !speedGameFinished && (
            <div className="py-12 text-center space-y-4">
              <Zap className="w-12 h-12 text-amber-500 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">Sẵn sàng phản xạ từ vựng?</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Mỗi cặp từ ghép đúng cộng ngay +15 XP. Hoàn thành toàn bộ trước khi hết giờ nhận thêm +50 XP!
              </p>
              <button
                onClick={startSpeedMatchGame}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 shadow-md transition-all active:scale-95"
              >
                Bắt đầu chơi ngay
              </button>
            </div>
          )}

          {isSpeedGameActive && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {matchPairs.map((item) => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedMatch?.id === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMatchCard(item)}
                    disabled={isMatched}
                    className={`min-h-[70px] p-3 rounded-2xl text-xs font-semibold border transition-all ${
                      isMatched
                        ? 'opacity-0 pointer-events-none'
                        : isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-slate-50/60 text-slate-800 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    {item.text}
                  </button>
                );
              })}
            </div>
          )}

          {speedGameFinished && (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">
                {matchedIds.length >= matchPairs.length ? 'Chiến Thắng Xuất Sắc!' : 'Hết thời gian rồi!'}
              </h4>
              <p className="text-xs text-slate-500">
                Bạn đã ghép được {matchedIds.length / 2} / {matchPairs.length / 2} cặp từ vựng.
              </p>
              <button
                onClick={startSpeedMatchGame}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors"
              >
                Chơi lại lượt khác
              </button>
            </div>
          )}
        </div>
      )}

      {/* Personal Saved Notebook Mode */}
      {activeTab === 'notebook' && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Sổ từ vựng cá nhân</h3>
              <p className="text-xs text-slate-500">
                Các từ bạn đã đánh dấu sao hoặc lưu từ bài đọc, bài nghe.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600">
              {savedWords.length} từ đã lưu
            </span>
          </div>

          {savedWords.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs">Bạn chưa lưu từ vựng nào. Hãy bấm vào từ khi đọc hoặc nghe để lưu nhé!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedWords.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{w.word}</span>
                      <span className="font-mono text-2xs text-indigo-600">{w.ipa}</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{w.meaningVi}</p>
                    {w.exampleEn && (
                      <p className="text-2xs text-slate-500 italic">"{w.exampleEn}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handlePlayAudio(w.word)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        storageService.removeSavedVocab(w.id);
                        setSavedWords(storageService.getSavedVocab());
                        setStarredMap(prev => ({ ...prev, [w.id]: false }));
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                      title="Xóa khỏi sổ từ"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
