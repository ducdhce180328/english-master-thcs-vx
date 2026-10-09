import React, { useEffect, useState } from 'react';
import { GradeLevel, Question } from '../../types';
import { AUTHOR_CATEGORIES, buildTeacherQuestions, MCQDraft } from '../../services/questionBankService';
import { unitService } from '../../services/unitService';
import { QuestionContext } from '../common/QuestionContext';

const emptyDraft = (): MCQDraft => ({ prompt: '', options: ['', ''], correctAnswer: 0, explanationVi: '' });
const labels = { Grammar: 'Ngữ pháp', Vocabulary: 'Từ vựng', Listening: 'Nghe', Reading: 'Đọc hiểu' };
function MCQEditor({ draft, onChange, index }: { draft: MCQDraft; onChange: (draft: MCQDraft) => void; index: number }) {
  const filled = draft.options.map((option, index) => ({ option, index })).filter(item => item.option.trim());
  useEffect(() => {
    if (filled.length && !draft.options[draft.correctAnswer]?.trim()) onChange({ ...draft, correctAnswer: filled[0].index });
  }, [draft.options, draft.correctAnswer]);
  return <div className="space-y-3 rounded-xl border border-slate-200 p-4">
    <label className="block text-sm font-semibold">Câu hỏi {index + 1}<textarea rows={2} value={draft.prompt} onChange={event => onChange({ ...draft, prompt: event.target.value })} className="mt-1 w-full rounded-lg border p-2 text-sm font-normal" /></label>
    <div className="grid gap-3 sm:grid-cols-2">{draft.options.map((option, optionIndex) => <div key={optionIndex} className="flex items-end gap-1">
      <label className="flex-1 text-xs font-semibold">Đáp án {String.fromCharCode(65 + optionIndex)}<input value={option} onChange={event => onChange({ ...draft, options: draft.options.map((value, i) => i === optionIndex ? event.target.value : value) })} className="mt-1 w-full rounded-lg border p-2 text-sm font-normal" /></label>
      {draft.options.length > 2 && <button type="button" aria-label={`Bỏ đáp án ${String.fromCharCode(65 + optionIndex)} câu ${index + 1}`} onClick={() => onChange({ ...draft, options: draft.options.filter((_, i) => i !== optionIndex), correctAnswer: draft.correctAnswer === optionIndex ? 0 : draft.correctAnswer > optionIndex ? draft.correctAnswer - 1 : draft.correctAnswer })} className="rounded-lg px-2 py-2 text-rose-600">×</button>}
    </div>)}</div>
    <button type="button" onClick={() => onChange({ ...draft, options: [...draft.options, ''] })} className="text-xs font-semibold text-indigo-600">+ Thêm đáp án</button>
    <label className="block text-xs font-semibold">Đáp án đúng<select value={draft.correctAnswer} onChange={event => onChange({ ...draft, correctAnswer: Number(event.target.value) })} className="ml-2 rounded-lg border p-2 text-sm">{filled.length ? filled.map(item => <option key={item.index} value={item.index}>{String.fromCharCode(65 + item.index)}. {item.option}</option>) : <option value={0}>Nhập đáp án trước</option>}</select></label>
    <label className="block text-xs font-semibold">Giải thích đáp án (tùy chọn)<textarea rows={2} value={draft.explanationVi} onChange={event => onChange({ ...draft, explanationVi: event.target.value })} className="mt-1 w-full rounded-lg border p-2 text-sm font-normal" /></label>
  </div>;
}

export function QuestionAuthorModal({ initialGrade, initialUnit, onClose, onSave }: { initialGrade: GradeLevel; initialUnit: number; onClose: () => void; onSave: (questions: Question[]) => void }) {
  const [category, setCategory] = useState<typeof AUTHOR_CATEGORIES[number]>('Grammar');
  const [grade, setGrade] = useState(initialGrade);
  const [unit, setUnit] = useState(initialUnit);
  const [passage, setPassage] = useState('');
  const [audioPrompt, setAudioPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [drafts, setDrafts] = useState<MCQDraft[]>([emptyDraft()]);
  const [error, setError] = useState('');
  const units = unitService.getUnits(grade);
  const save = () => {
    try {
      if (!units.some(item => item.unitNumber === unit)) throw new Error('Chọn Unit đã tạo cho khối lớp này.');
      const questions = buildTeacherQuestions({ category, grade, unit, passage, audioPrompt, audioUrl, drafts });
      onSave(questions);
    } catch (err) { setError(err instanceof Error ? err.message : 'Không thể lưu câu hỏi.'); }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"><div role="dialog" aria-modal="true" aria-labelledby="author-title" className="max-h-[90vh] w-full max-w-2xl space-y-4 overflow-y-auto rounded-2xl bg-white p-6">
    <h2 id="author-title" className="text-lg font-bold">Soạn câu hỏi trắc nghiệm</h2>
    <p className="text-xs text-slate-500">Mỗi câu cần ít nhất 2 đáp án và một đáp án đúng. Đáp án để trống sẽ không được lưu.</p>
    <div className="grid gap-3 sm:grid-cols-3">
      <label className="text-xs font-semibold">Phần học<select value={category} onChange={event => { setCategory(event.target.value as typeof category); setError(''); }} className="mt-1 w-full rounded-lg border p-2">{AUTHOR_CATEGORIES.map(value => <option key={value} value={value}>{labels[value]}</option>)}</select></label>
      <label className="text-xs font-semibold">Khối lớp<select value={grade} onChange={event => { const next = Number(event.target.value) as GradeLevel; setGrade(next); setUnit(unitService.getUnits(next)[0].unitNumber); }} className="mt-1 w-full rounded-lg border p-2">{[6,7,8,9].map(value => <option key={value} value={value}>Lớp {value}</option>)}</select></label>
      <label className="text-xs font-semibold">Unit<select value={unit} onChange={event => setUnit(Number(event.target.value))} className="mt-1 w-full rounded-lg border p-2">{units.map(value => <option key={value.unitNumber} value={value.unitNumber}>Unit {value.unitNumber}: {value.title}</option>)}</select></label>
    </div>
    {category === 'Reading' && <label className="block text-sm font-semibold">Đoạn văn dùng chung cho các câu hỏi<textarea rows={7} value={passage} onChange={event => setPassage(event.target.value)} placeholder="Nhập đoạn văn tiếng Anh..." className="mt-1 w-full rounded-xl border p-3 text-sm font-normal" /></label>}
    {category === 'Listening' && <div className="space-y-3 rounded-xl bg-indigo-50 p-4">
      <p className="text-xs text-indigo-800">Nhập nội dung để máy đọc hoặc đường dẫn trực tiếp đến tệp âm thanh.</p>
      <label className="block text-xs font-semibold">Nội dung bài nghe<textarea rows={4} value={audioPrompt} onChange={event => setAudioPrompt(event.target.value)} className="mt-1 w-full rounded-lg border p-2 text-sm font-normal" /></label>
      <label className="block text-xs font-semibold">Đường dẫn âm thanh (tùy chọn)<input type="url" value={audioUrl} onChange={event => setAudioUrl(event.target.value)} placeholder="https://.../bai-nghe.mp3" className="mt-1 w-full rounded-lg border p-2 text-sm font-normal" /></label>
      {(audioPrompt || audioUrl) && <QuestionContext question={{ id: 'author-audio', prompt: '', category: 'Listening', type: 'mcq', correctAnswer: 0, explanationVi: '', audioPrompt, audioUrl }} />}
    </div>}
    {drafts.map((draft, index) => <div key={index} className="space-y-2"><MCQEditor draft={draft} index={index} onChange={value => setDrafts(previous => previous.map((item, i) => i === index ? value : item))} />
      {drafts.length > 1 && <button type="button" onClick={() => setDrafts(previous => previous.filter((_, i) => i !== index))} className="text-xs text-rose-600">Bỏ câu hỏi {index + 1}</button>}
    </div>)}
    <button type="button" onClick={() => setDrafts(previous => [...previous, emptyDraft()])} className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">+ Thêm câu hỏi{category === 'Reading' ? ' cho đoạn văn này' : ''}</button>
    {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
    <div className="flex justify-end gap-2 border-t pt-4"><button onClick={onClose} className="rounded-xl border px-4 py-2 text-sm">Hủy</button><button onClick={save} className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white">Lưu {drafts.length} câu hỏi</button></div>
  </div></div>;
}
