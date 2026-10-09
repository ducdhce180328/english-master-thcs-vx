import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  Filter,
  ArrowRight,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, GradeLevel, ExamMatrix } from '../../types';
import { SAMPLE_EXAMS } from '../../data/curriculum';
import { storageService } from '../../services/storageService';
import { questionBankService, questionsForGrade } from '../../services/questionBankService';
import { QuestionContext } from '../common/QuestionContext';

interface QuizModuleProps {
  unitQuestions: Question[];
  grade: GradeLevel;
  unit: number;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  unitQuestions,
  grade,
  unit
}) => {
  const [examType, setExamType] = useState<'practice' | 'mock_exam'>('practice');
  const [selectedExamId, setSelectedExamId] = useState<string>('unit');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [bankQuestions] = useState(() => questionBankService.getQuestions());
  const availableBankQuestions = React.useMemo(() => questionsForGrade(bankQuestions, grade, undefined, unit).filter(question => question.type === 'mcq'), [bankQuestions, grade, unit]);

  // Answers & UI state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Exam timer
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Setup questions when exam selection changes
  useEffect(() => {
    if (selectedExamId === 'unit') {
      setActiveQuestions(unitQuestions);
      setTimeLeft(15 * 60);
    } else if (selectedExamId === 'bank') {
      setActiveQuestions(availableBankQuestions);
      setTimeLeft(Math.max(15, availableBankQuestions.length) * 60);
    } else {
      const foundExam = SAMPLE_EXAMS.find((e) => e.id === selectedExamId && e.grade === grade);
      if (foundExam) {
        setActiveQuestions(foundExam.questions);
        setTimeLeft(foundExam.durationMinutes * 60);
      } else {
        setSelectedExamId('unit');
        setActiveQuestions(unitQuestions);
        setTimeLeft(15 * 60);
      }
    }
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQIndex(0);
    setIsTimerRunning(examType === 'mock_exam');
  }, [selectedExamId, examType, unitQuestions, availableBankQuestions, grade]);

  useEffect(() => {
    if (activeQuestions.length === 0) setIsTimerRunning(false);
  }, [activeQuestions]);

  // Countdown timer in mock exam mode
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted, timeLeft]);

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);

    let correct = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) correct++;
    });

    const percentage = Math.round((correct / Math.max(activeQuestions.length, 1)) * 100);

    // Save attempt
    storageService.saveQuizAttempt({
      id: 'attempt-' + Date.now(),
      title: selectedExamId === 'unit' ? `Unit ${unit} Quiz` : selectedExamId === 'bank' ? `Ngân hàng Giáo viên · Lớp ${grade}` : 'Đề kiểm tra THCS',
      score: correct,
      maxScore: activeQuestions.length,
      percentage,
      timeTakenSeconds: Math.max(0, (selectedExamId === 'bank'
        ? Math.max(15, availableBankQuestions.length) * 60
        : selectedExamId === 'unit' ? 15 * 60
        : (SAMPLE_EXAMS.find(exam => exam.id === selectedExamId)?.durationMinutes || 15) * 60) - timeLeft),
      completedAt: new Date().toISOString(),
      grade
    });

    if (percentage >= 70) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const currentQ = activeQuestions[currentQIndex];
  const scoreCount = activeQuestions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
  const percentage = Math.round((scoreCount / Math.max(activeQuestions.length, 1)) * 100);

  // Group analytics by category
  const categoryStats = activeQuestions.reduce((acc: any, q) => {
    if (!acc[q.category]) acc[q.category] = { total: 0, correct: 0 };
    acc[q.category].total++;
    if (userAnswers[q.id] === q.correctAnswer) acc[q.category].correct++;
    return acc;
  }, {});

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <span>Hệ thống Khảo thí & Luyện thi THCS</span>
            <span aria-hidden="true">·</span>
            <span>GDPT 2018</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Trắc Nghiệm & Thi Thử
          </h2>
        </div>

        {/* Exam mode / Exam selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setExamType('practice')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                examType === 'practice' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Chế độ Luyện tập
            </button>
            <button
              onClick={() => setExamType('mock_exam')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                examType === 'mock_exam' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Chế độ Kiểm tra (Hẹn giờ)
            </button>
          </div>

          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="unit">Bài kiểm tra Unit {unit} ({unitQuestions.length} câu)</option>
            <option value="bank">Ngân hàng Giáo viên · Lớp {grade} · Unit {unit} ({availableBankQuestions.length} câu)</option>
            {SAMPLE_EXAMS.filter(ex => ex.grade === grade).map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title} ({ex.durationMinutes} phút)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timer Bar if in Exam Mode */}
      {examType === 'mock_exam' && !isSubmitted && activeQuestions.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Thời gian làm bài còn lại:</span>
          </div>
          <span className="font-mono text-base font-extrabold text-amber-900">
            {formatTimer(timeLeft)}
          </span>
        </div>
      )}

      {/* Main Question Card & Palette */}
      {activeQuestions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">Chưa có câu hỏi hợp lệ cho khối lớp này. Hãy chọn đề khác hoặc thêm câu hỏi trong Admin.</div>
      ) : !isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Viewer (Col 1-2) */}
          <div className="lg:col-span-2 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
            {currentQ && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Câu {currentQIndex + 1} / {activeQuestions.length} · Chủ điểm: {currentQ.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {userAnswers[currentQ.id] !== undefined ? 'Đã chọn' : 'Chưa chọn'}
                  </span>
                </div>

                <QuestionContext question={currentQ} />
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: currentQ.prompt }}
                />

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options?.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQ.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-medium border transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20 font-semibold'
                            : 'border-slate-200 bg-slate-50/50 text-slate-800 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <span className="mr-3 font-bold text-slate-400">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: opt }} />
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback in Practice Mode */}
                {examType === 'practice' && userAnswers[currentQ.id] !== undefined && (
                  <div
                    className={`p-4 rounded-xl border text-xs space-y-1 animate-in fade-in duration-150 ${
                      userAnswers[currentQ.id] === currentQ.correctAnswer
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border-rose-200'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {userAnswers[currentQ.id] === currentQ.correctAnswer ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Chính xác!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Chưa chính xác!</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed">{currentQ.explanationVi}</p>
                  </div>
                )}

                {/* Prev / Next controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQIndex === 0}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors disabled:opacity-40"
                  >
                    ← Câu trước
                  </button>

                  {currentQIndex < activeQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex((prev) => prev + 1)}
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
                    >
                      Câu tiếp theo →
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalSubmit}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-98"
                    >
                      Nộp bài ngay
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Question Navigator Palette (Col 3) */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Bảng câu hỏi</h4>
              <span className="text-xs text-slate-500">
                {Object.keys(userAnswers).length} / {activeQuestions.length} đã làm
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {activeQuestions.map((q, idx) => {
                const isCurrent = currentQIndex === idx;
                const isAnswered = userAnswers[q.id] !== undefined;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-10 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/30'
                        : isAnswered
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={handleFinalSubmit}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all active:scale-98"
              >
                Nộp bài & Chấm điểm
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results Report Screen */
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
          {/* Score Summary Card */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
            <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
            <h3 className="text-2xl font-black text-slate-900">
              {percentage >= 80 ? 'Kết quả Xuất Sắc!' : percentage >= 50 ? 'Làm bài Tốt!' : 'Cần cố gắng thêm!'}
            </h3>
            <div className="flex items-center justify-center gap-6">
              <div>
                <div className="text-3xl font-extrabold text-indigo-700">
                  {scoreCount} / {activeQuestions.length}
                </div>
                <span className="text-xs text-slate-500">Số câu đúng</span>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <div className="text-3xl font-extrabold text-emerald-600">{percentage}%</div>
                <span className="text-xs text-slate-500">Điểm quy đổi</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="max-w-md mx-auto pt-4 grid grid-cols-2 gap-2 text-xs">
              {Object.entries(categoryStats).map(([cat, stat]: any) => (
                <div key={cat} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-left">
                  <div className="text-slate-500 font-semibold">{cat}</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {stat.correct} / {stat.total} câu ({Math.round((stat.correct / stat.total) * 100)}%)
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setUserAnswers({});
                  setIsSubmitted(false);
                  setCurrentQIndex(0);
                  setTimeLeft(15 * 60);
                  setIsTimerRunning(examType === 'mock_exam');
                }}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại đề thi</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h4 className="font-bold text-slate-900 text-lg">Xem lại chi tiết từng câu hỏi:</h4>

            <div className="space-y-6">
              {activeQuestions.map((q, qIdx) => {
                const uAns = userAnswers[q.id];
                const isCorrect = uAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border ${
                      isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="font-semibold text-sm text-slate-900"
                        dangerouslySetInnerHTML={{ __html: `Câu ${qIdx + 1}: ${q.prompt}` }}
                      />
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {q.options?.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border ${
                            oIdx === q.correctAnswer
                              ? 'border-emerald-300 bg-emerald-100/60 font-bold text-emerald-900'
                              : oIdx === uAns
                              ? 'border-rose-300 bg-rose-100/60 line-through text-rose-900'
                              : 'border-slate-100 bg-white text-slate-600'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                          <span dangerouslySetInnerHTML={{ __html: opt }} />
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 p-3 rounded-xl bg-white border border-slate-100 text-xs text-slate-700 space-y-1">
                      <span className="font-semibold text-indigo-700">Giải thích:</span>
                      <p className="leading-relaxed">{q.explanationVi}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
