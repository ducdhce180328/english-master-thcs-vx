import React, { useState } from 'react';
import { GradeLevel, UnitModule } from '../../types';
import { unitService } from '../../services/unitService';
import { questionBankService } from '../../services/questionBankService';
import { useDeleteConfirmation } from '../common/useDeleteConfirmation';

export function UnitManager({ activeGrade, onCreateQuestions }: { activeGrade: GradeLevel; onCreateQuestions: (grade: GradeLevel, unit: number) => void }) {
  const [grade, setGrade] = useState(activeGrade);
  const [units, setUnits] = useState(() => unitService.getUnits(activeGrade));
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [number, setNumber] = useState(2);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { confirmDelete, confirmationDialog } = useDeleteConfirmation();
  const openForm = (unit?: UnitModule) => {
    setError(''); setEditing(Boolean(unit));
    setNumber(unit?.unitNumber ?? Math.max(0, ...units.map(item => item.unitNumber)) + 1);
    setTitle(unit?.title || ''); setDescription(unit?.descriptionVi || ''); setShowForm(true);
  };
  const save = () => {
    setError('');
    if (!editing && unitService.getUnits(grade).some(unit => unit.unitNumber === number)) { setError('Số Unit đã tồn tại trong khối lớp này.'); return; }
    try {
      unitService.saveUnit({ grade, unitNumber: number, title, descriptionVi: description });
      setUnits(unitService.getUnits(grade)); setShowForm(false);
    } catch (err) { setError(err instanceof Error ? err.message : 'Không thể lưu Unit.'); }
  };
  const remove = async (unit: UnitModule) => {
    const count = questionBankService.getQuestions().filter(question => question.grade === grade && (question.unit ?? 1) === unit.unitNumber).length;
    if (!await confirmDelete(`Xóa Unit ${unit.unitNumber} của lớp ${grade} và ${count} bài tập/câu hỏi thuộc Unit này?`)) return;
    try { unitService.deleteUnit(grade, unit.unitNumber); setUnits(unitService.getUnits(grade)); setError(''); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể xóa Unit.'); }
  };
  return <div className="space-y-6">
    {confirmationDialog}
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div><h1 className="text-xl font-bold text-slate-900">Quản lý Unit theo khối lớp</h1><p className="mt-1 text-sm text-slate-500">Tạo chủ đề, sau đó thêm trắc nghiệm Ngữ pháp, Từ vựng, Nghe và Đọc cho từng Unit.</p></div>
      <div className="flex gap-2"><select aria-label="Khối lớp quản lý Unit" value={grade} onChange={event => { const next = Number(event.target.value) as GradeLevel; setGrade(next); setUnits(unitService.getUnits(next)); setShowForm(false); setError(''); }} className="rounded-xl border px-3 py-2 text-sm">{[6, 7, 8, 9].map(value => <option key={value} value={value}>Lớp {value}</option>)}</select>
      <button onClick={() => openForm()} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Tạo Unit mới</button></div>
    </div>
    {error && !showForm && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
    <div className="grid gap-4 sm:grid-cols-2">{units.map(unit => <div key={unit.unitNumber} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-bold text-indigo-600">Lớp {grade} · Unit {unit.unitNumber} · {unit.isCustom ? 'Giáo viên tạo' : 'Học liệu có sẵn'}</p>
      <h2 className="font-bold text-slate-900">{unit.title}</h2><p className="text-sm text-slate-500">{unit.descriptionVi}</p>
      <div className="flex flex-wrap gap-2"><button onClick={() => onCreateQuestions(grade, unit.unitNumber)} className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-purple-700">Soạn bài cho Unit này</button>
      {unit.isCustom && <><button onClick={() => openForm(unit)} className="rounded-lg border px-3 py-2 text-xs">Sửa Unit</button><button onClick={() => remove(unit)} className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">Xóa Unit</button></>}</div>
    </div>)}</div>
    {showForm && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"><div role="dialog" aria-modal="true" aria-labelledby="unit-title" className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
      <h2 id="unit-title" className="text-lg font-bold">{editing ? 'Sửa Unit' : 'Tạo Unit mới'} · Lớp {grade}</h2>
      <label className="block text-sm">Số Unit<input type="number" min={1} disabled={editing} value={number} onChange={event => setNumber(Number(event.target.value))} className="mt-1 w-full rounded-xl border px-3 py-2" /></label>
      <label className="block text-sm">Tên chủ đề<input value={title} onChange={event => setTitle(event.target.value)} placeholder="VD: My House" className="mt-1 w-full rounded-xl border px-3 py-2" /></label>
      <label className="block text-sm">Mô tả nội dung<textarea rows={3} value={description} onChange={event => setDescription(event.target.value)} className="mt-1 w-full rounded-xl border px-3 py-2" /></label>
      {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
      <div className="flex justify-end gap-2"><button onClick={() => setShowForm(false)} className="rounded-xl border px-4 py-2 text-sm">Hủy</button><button onClick={save} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">Lưu Unit</button></div>
    </div></div>}
  </div>;
}
