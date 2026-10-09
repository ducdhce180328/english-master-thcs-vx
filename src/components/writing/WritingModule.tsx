import React, { useState } from 'react';
import {
  PenTool,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Send,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  Check,
  XCircle
} from 'lucide-react';
import { WritingPrompt } from '../../types';
import { storageService } from '../../services/storageService';

interface WritingModuleProps {
  prompt: WritingPrompt;
}

export const WritingModule: React.FC<WritingModuleProps> = ({
  prompt,
}) => {
  const [activeSection, setActiveSection] = useState<'practice' | 'essay'>('practice');

  // Interactive practice tasks state
  const [taskAnswers, setTaskAnswers] = useState<Record<string, string>>({});
  const [checkedTasks, setCheckedTasks] = useState<Record<string, { isChecked: boolean; isCorrect: boolean }>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Essay state
  const [content, setContent] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);
  const [previousDraft, setPreviousDraft] = useState<string | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [showOutline, setShowOutline] = useState(true);

  const tasks = prompt.practiceTasks || [];

  const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const isWordCountValid = wordCount >= prompt.minWords && wordCount <= prompt.maxWords;

  // Check interactive task
  const handleCheckTask = (taskId: string, sampleAnswer: string) => {
    const userVal = (taskAnswers[taskId] || '').trim().toLowerCase().replace(/[.,!?;]/g, '');
    const targetVal = sampleAnswer.trim().toLowerCase().replace(/[.,!?;]/g, '');
    const isCorrect = userVal === targetVal;

    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: { isChecked: true, isCorrect }
    }));

    if (isCorrect) {
      storageService.updateXP(20);
    }
  };

  const handleToggleReveal = (taskId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleEvaluateAI = async () => {
    if (!content.trim()) return;

    setIsEvaluating(true);
    setPreviousDraft(content);

    try {
      const res = await fetch('/api/ai/writing-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: prompt.grade,
          topic: prompt.topicPrompt,
          content: content,
          wordLimit: `${prompt.minWords}-${prompt.maxWords}`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult(data);
        storageService.updateXP(40);
      }
    } catch (err) {
      console.error('Writing evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header card */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
            <span>Kỹ năng Luyện Viết (Writing)</span>
            <span aria-hidden="true">·</span>
            <span>Lớp {prompt.grade}</span>
            <span aria-hidden="true">·</span>
            <span>{tasks.length} câu hỏi rèn luyện + Viết đoạn văn</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{prompt.title}</h2>
        </div>

        {/* Section switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveSection('practice')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSection === 'practice'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bài tập viết câu ({tasks.length} câu)
          </button>
          <button
            onClick={() => setActiveSection('essay')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeSection === 'essay'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Viết đoạn văn ({prompt.minWords}–{prompt.maxWords} từ)
          </button>
        </div>
      </div>

      {/* SECTION 1: Interactive Practice Questions (5 - 8 questions) */}
      {activeSection === 'practice' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Phần 1: Bài tập rèn luyện kỹ năng viết ({tasks.length} câu hỏi)
                </h3>
                <p className="text-xs text-slate-500">
                  Luyện tập sắp xếp từ thành câu, viết lại câu theo cấu trúc mới và sửa lỗi ngữ pháp.
                </p>
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg">
                +20 XP mỗi câu đúng
              </span>
            </div>

            <div className="space-y-5">
              {tasks.map((task, idx) => {
                const checkedState = checkedTasks[task.id];
                const isRevealed = revealedSolutions[task.id];
                const userVal = taskAnswers[task.id] || '';

                return (
                  <div
                    key={task.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      checkedState?.isChecked
                        ? checkedState.isCorrect
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : 'border-rose-200 bg-rose-50/30'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-rose-700">Câu {idx + 1}</span>
                          <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 uppercase">
                            {task.type === 'sentence_reorder'
                              ? 'Sắp xếp câu'
                              : task.type === 'sentence_transformation'
                              ? 'Viết lại câu'
                              : task.type === 'error_correction'
                              ? 'Sửa lỗi sai'
                              : 'Nối câu'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1 leading-relaxed">
                          {task.prompt}
                        </p>
                      </div>

                      {checkedState?.isChecked && (
                        <div className="shrink-0">
                          {checkedState.isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-2xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                              <CheckCircle className="w-3.5 h-3.5" /> Đúng +20 XP
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-2xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-lg">
                              <XCircle className="w-3.5 h-3.5" /> Chưa chính xác
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Guide */}
                    {task.guideVi && (
                      <div className="text-2xs text-slate-500 bg-white/70 p-2.5 rounded-xl border border-slate-200/60 flex items-start gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span><strong>Gợi ý:</strong> {task.guideVi}</span>
                      </div>
                    )}

                    {/* Input */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) =>
                          setTaskAnswers((prev) => ({ ...prev, [task.id]: e.target.value }))
                        }
                        placeholder="Nhập câu trả lời hoàn chỉnh của bạn tại đây..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCheckTask(task.id, task.sampleAnswer || '')}
                          disabled={!userVal.trim()}
                          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors disabled:opacity-50"
                        >
                          Kiểm tra
                        </button>
                        <button
                          onClick={() => handleToggleReveal(task.id)}
                          className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                        >
                          {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án mẫu'}
                        </button>
                      </div>
                    </div>

                    {/* Sample answer reveal */}
                    {isRevealed && (
                      <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-800 space-y-1">
                        <span className="font-semibold text-emerald-700">Đáp án chuẩn:</span>
                        <p className="font-mono text-emerald-900 font-bold">{task.sampleAnswer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => setActiveSection('essay')}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Tiếp tục: Viết đoạn văn ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Paragraph Writing with AI Scoring & Teacher Submission */}
      {activeSection === 'essay' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Prompt, Outline, Model */}
            <div className="space-y-6">
              {/* Prompt Description */}
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Đề bài luyện viết</h3>
                  <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700">
                    GDPT 2018
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {prompt.topicPrompt}
                </p>

                {/* Outline Toggle */}
                <div className="border-t border-slate-100 pt-3">
                  <button
                    onClick={() => setShowOutline(!showOutline)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-700 py-1"
                  >
                    <span>Dàn ý gợi ý (Outline)</span>
                    {showOutline ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {showOutline && (
                    <ul className="mt-2 space-y-2 text-xs text-slate-600">
                      {prompt.outlineVi.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 font-bold text-2xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Suggested phrases */}
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Cụm từ hữu ích:</span>
                  <div className="space-y-1.5">
                    {prompt.suggestedPhrases.map((item, idx) => (
                      <div key={idx} className="text-2xs bg-slate-50 p-2 rounded-xl flex items-center justify-between">
                        <span className="font-semibold text-rose-900">{item.phrase}</span>
                        <span className="text-slate-500">{item.meaningVi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Essay Button */}
                <button
                  onClick={() => setShowSample(!showSample)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{showSample ? 'Ẩn bài viết mẫu' : 'Xem bài mẫu tham khảo'}</span>
                </button>

                {showSample && (
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 font-serif leading-relaxed italic animate-in fade-in">
                    "{prompt.sampleEssay}"
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Editor & Actions */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">Khung soạn thảo bài viết</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        isWordCountValid
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      Số từ: {wordCount} / {prompt.minWords}–{prompt.maxWords} từ
                    </span>
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Bắt đầu viết đoạn văn tiếng Anh của bạn tại đây... Hãy vận dụng các cấu trúc câu và từ vựng đã học!"
                  className="w-full p-4 rounded-2xl border border-slate-200 text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />

                {/* Control bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setContent(''); setAiResult(null); setPreviousDraft(null); }}
                      className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Xóa làm lại</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleEvaluateAI}
                      disabled={isEvaluating || !content.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isEvaluating ? 'AI đang chấm bài...' : 'Chấm thử với AI'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Formative Feedback Dashboard */}
          {aiResult && (
            <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-slate-900 text-lg">
                      Kết quả nhận xét chi tiết từ AI (Tham khảo GDPT 2018)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Lưu ý: Điểm số này nhằm mục đích rèn luyện, điểm chính thức do giáo viên chấm.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold text-purple-700">
                    {aiResult.overall || 8.0} / 10
                  </div>
                  <span className="text-2xs font-bold text-slate-500">Điểm tổng quát</span>
                </div>
              </div>

              {/* 4 Rubric Criteria */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Ngữ pháp
                  </span>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    {aiResult.grammar || 8.0} / 10
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Từ vựng
                  </span>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    {aiResult.vocab || 7.5} / 10
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Mạch lạc
                  </span>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    {aiResult.coherence || 8.0} / 10
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Hoàn thành đề
                  </span>
                  <div className="text-lg font-bold text-slate-900 mt-1">
                    {aiResult.taskCompletion || 8.5} / 10
                  </div>
                </div>
              </div>

              {/* Corrections & Suggestions */}
              {aiResult.corrections && aiResult.corrections.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Các lỗi cụ thể & Hướng dẫn sửa:
                  </span>
                  <div className="space-y-2">
                    {aiResult.corrections.map((corr: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 text-xs space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="line-through text-rose-700 font-medium">"{corr.original}"</span>
                          <span className="text-slate-400">➔</span>
                          <span className="font-bold text-emerald-700">"{corr.suggestion}"</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{corr.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Model Revision (Nâng cấp đoạn văn) */}
              {aiResult.modelRevision && (
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 block">
                    Phiên bản gợi ý chỉnh sửa tốt hơn:
                  </span>
                  <p className="text-xs sm:text-sm text-indigo-950 font-serif leading-relaxed italic">
                    "{aiResult.modelRevision}"
                  </p>
                </div>
              )}

              {/* Revision Rewrite Action */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Bạn có thể sửa lại bài ở khung viết bên trên và bấm "Chấm thử với AI" lần nữa!
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
