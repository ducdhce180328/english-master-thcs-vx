import React, { useEffect, useState } from 'react';
import { Question } from '../../types';
import { audioService } from '../../services/audioService';

export function QuestionContext({ question, showTranscript = false }: { question: Question; showTranscript?: boolean }) {
  const [error, setError] = useState('');
  useEffect(() => {
    setError('');
    return () => audioService.stop();
  }, [question.id]);
  if (question.category === 'Reading' && question.passage) return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-2">
      <p className="text-xs font-bold text-emerald-800">Đọc đoạn văn và trả lời câu hỏi:</p>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">{question.passage}</p>
    </div>
  );
  if (question.category !== 'Listening') return null;
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 space-y-3">
      <p className="text-xs font-bold text-indigo-800">Nghe bài và chọn đáp án:</p>
      {question.audioUrl ? <audio key={question.id + question.audioUrl} controls preload="none" src={question.audioUrl} className="w-full" onError={() => setError('Không thể phát âm thanh. Vui lòng kiểm tra đường dẫn bài nghe.')} /> : question.audioPrompt ? (
        <div className="flex gap-2">
          <button type="button" onClick={() => { setError(''); audioService.speak(question.audioPrompt!, { onError: () => setError('Không thể đọc bài nghe. Kiểm tra giọng tiếng Anh của trình duyệt.') }); }} className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">Nghe bài</button>
          <button type="button" onClick={() => audioService.stop()} className="rounded-lg border border-indigo-200 px-3 py-2 text-xs">Dừng</button>
        </div>
      ) : <p className="text-xs text-rose-700">Câu hỏi chưa có bài nghe.</p>}
      {showTranscript && question.audioPrompt && <details><summary className="cursor-pointer text-xs text-indigo-700">Nội dung bài nghe</summary><p className="mt-2 whitespace-pre-wrap text-sm">{question.audioPrompt}</p></details>}
      {error && <p role="alert" className="text-xs text-rose-700">{error}</p>}
    </div>
  );
}
