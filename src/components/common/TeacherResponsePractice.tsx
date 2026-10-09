import React, { useEffect, useRef, useState } from 'react';
import { Question } from '../../types';
import { audioService } from '../../services/audioService';
import { SpeechRecognitionService } from '../../services/speechRecognitionService';
import { storageService } from '../../services/storageService';

export function TeacherResponsePractice({ question }: { question: Question }) {
  const storageKey = `em_teacher_practice_${storageService.getUserProfile().id}_${question.id}`;
  const [response, setResponse] = useState(() => {
    try { return localStorage.getItem(storageKey) || ''; } catch { return ''; }
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [comparison, setComparison] = useState<{ accuracy: number; missingWords: string[] } | null>(null);
  const recognition = useRef<SpeechRecognitionService | null>(null);
  const finalized = useRef('');
  const isSpeaking = question.type === 'speaking';
  const wordCount = response.trim().split(/\s+/).filter(Boolean).length;
  useEffect(() => {
    recognition.current = new SpeechRecognitionService();
    return () => { recognition.current?.stopListening(); audioService.stop(); };
  }, []);
  const updateResponse = (value: string) => {
    setResponse(value); setSaved(false); setComparison(null); setError('');
    try { localStorage.setItem(storageKey, value); } catch { setError('Không thể lưu bài trên trình duyệt này.'); }
  };
  const startSpeaking = () => {
    setError('');
    if (!recognition.current?.isSupported()) { setError('Trình duyệt chưa hỗ trợ nhận diện giọng nói. Em có thể luyện theo mẫu và nhập lại câu đã nói.'); return; }
    audioService.stop();
    finalized.current = '';
    setListening(true);
    recognition.current.startListening({
      onResult: result => {
        if (result.isFinal) finalized.current = `${finalized.current} ${result.transcript}`.trim();
        updateResponse(result.isFinal ? finalized.current : `${finalized.current} ${result.transcript}`.trim());
      },
      onError: message => { setError(message); setListening(false); },
      onEnd: () => setListening(false),
    });
  };
  const saveResponse = () => {
    setError('');
    if (!response.trim()) { setError('Em hãy hoàn thành bài trước khi lưu.'); return; }
    if (!isSpeaking && (wordCount < question.minWords! || wordCount > question.maxWords!)) { setError(`Bài viết cần từ ${question.minWords} đến ${question.maxWords} từ.`); return; }
    try { localStorage.setItem(storageKey, response); setSaved(true); }
    catch { setError('Không thể lưu bài trên trình duyệt này.'); return; }
    if (isSpeaking) setComparison(recognition.current!.compareSpeech(response, question.targetSentence!));
  };
  return <div className="space-y-3">
    {isSpeaking && <>
      <p className="whitespace-pre-wrap rounded-xl bg-purple-50 p-4 text-sm leading-relaxed">{question.targetSentence}</p>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setError(''); audioService.speak(question.targetSentence!, { onError: () => setError('Không thể phát giọng đọc mẫu trên trình duyệt này.') }); }} disabled={listening} className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">Nghe mẫu</button>
        <button onClick={() => audioService.stop()} className="rounded-lg border px-3 py-2 text-xs">Dừng mẫu</button>
        <button onClick={listening ? () => { recognition.current?.stopListening(); setListening(false); } : startSpeaking} className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white">{listening ? 'Dừng nói' : 'Bắt đầu nói'}</button>
      </div>
    </>}
    <label htmlFor={`response-${question.id}`} className="block text-xs font-semibold text-slate-700">{isSpeaking ? 'Nội dung nhận diện từ giọng nói (có thể chỉnh sửa):' : `Bài viết tiếng Anh · yêu cầu ${question.minWords}–${question.maxWords} từ:`}</label>
    <textarea id={`response-${question.id}`} rows={isSpeaking ? 3 : 7} value={response} onChange={event => updateResponse(event.target.value)} className="w-full rounded-xl border border-slate-200 p-3 text-sm" placeholder={isSpeaking ? 'Bấm Bắt đầu nói để luyện theo mẫu...' : 'Viết bài của em tại đây...'} />
    {!isSpeaking && <p className="text-xs text-slate-500">Số từ: {wordCount}</p>}
    <div className="flex gap-2">
      <button onClick={saveResponse} disabled={listening || !response.trim()} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">{isSpeaking ? 'Lưu & đối chiếu nội dung' : 'Lưu bài luyện tập'}</button>
      <button onClick={() => { recognition.current?.stopListening(); setListening(false); updateResponse(''); setError(''); }} className="rounded-lg border px-3 py-2 text-xs">Xóa làm lại</button>
    </div>
    {saved && <p role="status" className="text-xs text-emerald-700">Đã lưu bài luyện tập trên trình duyệt.</p>}
    {comparison && <p className="text-sm text-slate-700">Nội dung nhận diện trùng {comparison.accuracy}% số từ trong mẫu.{comparison.missingWords.length > 0 && ` Từ chưa nhận diện: ${comparison.missingWords.join(', ')}.`}</p>}
    {saved && (question.sampleAnswer || question.explanationVi) && <details className="rounded-xl bg-slate-50 p-3"><summary className="cursor-pointer text-xs font-semibold">Xem bài mẫu & hướng dẫn của giáo viên</summary><p className="mt-2 whitespace-pre-wrap text-sm">{question.sampleAnswer}</p><p className="mt-2 text-xs text-slate-600">{question.explanationVi}</p></details>}
    {error && <p role="alert" className="text-xs text-rose-700">{error}</p>}
  </div>;
}
