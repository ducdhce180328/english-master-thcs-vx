import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Info,
  HelpCircle
} from 'lucide-react';
import { GrammarTopic } from '../../types';
import { storageService } from '../../services/storageService';

interface GrammarModuleProps {
  grammar: GrammarTopic;
}

export const GrammarModule: React.FC<GrammarModuleProps> = ({ grammar }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleSelectAnswer = (qId: string, optIdx: number, correctIdx: number | string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));
    if (optIdx === correctIdx) {
      storageService.updateXP(15);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <span>Ngữ pháp trọng tâm GDPT 2018</span>
            <span aria-hidden="true">·</span>
            <span>Lớp {grammar.grade} - Unit {grammar.unit}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{grammar.title}</h2>
        </div>
      </div>

      {/* Grammar Formula & Usage Card */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Formula Box */}
        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            Công thức cốt lõi (Formula):
          </span>
          <pre className="text-sm sm:text-base font-mono font-bold text-indigo-950 whitespace-pre-line leading-relaxed">
            {grammar.formula}
          </pre>
        </div>

        {/* Usage & Signals */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-base">Cách dùng & Ngữ cảnh sử dụng:</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{grammar.usageVi}</p>

          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Dấu hiệu nhận biết (Signal words):
            </span>
            <div className="space-y-1.5">
              {grammar.signalsVi.map((sig, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-800">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{sig}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bilingual Examples */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-slate-900 text-base">Ví dụ minh họa chuẩn:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {grammar.examples.map((ex, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs space-y-1"
              >
                <p className="font-bold text-indigo-950 italic">"{ex.en}"</p>
                <p className="text-slate-600">{ex.vi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls of Vietnamese Students */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Lỗi học sinh THCS Việt Nam hay mắc phải:</span>
          </div>
          <div className="space-y-2 text-xs text-amber-950">
            {grammar.commonMistakesVi.map((mistake, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="leading-relaxed">{mistake}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step-by-Step Practice Drills */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Bài tập áp dụng ngay (Thực hành từng bước)</h3>
          <span className="text-xs text-slate-500">Phản hồi giải thích tức thì</span>
        </div>

        <div className="space-y-6">
          {grammar.practiceQuestions.map((q, qIndex) => {
            const userAnswer = answers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = isAnswered && userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-900 leading-snug">
                    Câu {qIndex + 1}: {q.prompt}
                  </div>
                  {isAnswered && (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options?.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx, q.correctAnswer)}
                        className={`text-left p-3.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? isCorrect
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                              : 'border-rose-600 bg-rose-50 text-rose-900 font-semibold'
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
                {showExplanation[q.id] && (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-100 text-xs text-slate-700 space-y-1 animate-in fade-in duration-150">
                    <span className="font-semibold text-indigo-700">Lời giải chi tiết:</span>
                    <p className="leading-relaxed">{q.explanationVi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
