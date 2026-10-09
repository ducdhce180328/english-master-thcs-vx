import { QuestionAuthorModal } from './QuestionAuthorModal';
import { useDeleteConfirmation } from '../common/useDeleteConfirmation';
import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldCheck,
  Database,
  Plus,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  HelpCircle,
  Layers,
  FileSpreadsheet,
  FileText,
  FileCode,
  AlertCircle,
  X
} from 'lucide-react';
import { Question } from '../../types';
import { GradeLevel } from '../../types';
import { questionBankService, validateAuthorQuestion, parseCSVRows, AUTHOR_CATEGORIES, normalizeMCQ } from '../../services/questionBankService';
import { unitService } from '../../services/unitService';
import { QuestionContext } from '../common/QuestionContext';

export const QuestionManager: React.FC<{ activeGrade: GradeLevel; activeUnit?: number; onManageClasses?: () => void; onManageUnits?: () => void }> = ({ activeGrade, activeUnit = 1, onManageClasses, onManageUnits }) => {
  const { confirmDelete, confirmationDialog } = useDeleteConfirmation();
  const [questions, setQuestions] = useState<Question[]>(() => questionBankService.getQuestions());
  useEffect(() => { questionBankService.saveQuestions(questions); }, [questions]);

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterGrade, setFilterGrade] = useState<string>(String(activeGrade));
  const [filterUnit, setFilterUnit] = useState<string>(String(activeUnit));
  const [searchTerm, setSearchTerm] = useState('');

  // Add question modal (Manual)
  const [showAddModal, setShowAddModal] = useState(false);
  const [authorGrade, setAuthorGrade] = useState(activeGrade);
  const [authorUnit, setAuthorUnit] = useState(activeUnit);

  // File Upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedPreviewQuestions, setParsedPreviewQuestions] = useState<Question[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredQuestions = questions.filter((q) => {
    if (!AUTHOR_CATEGORIES.includes(q.category as typeof AUTHOR_CATEGORIES[number])) return false;
    const matchesCat = filterCategory === 'All' || q.category === filterCategory;
    const matchesSearch = q.prompt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === 'All' || (filterGrade === 'unassigned' ? q.grade === undefined : q.grade === Number(filterGrade));
    return matchesCat && matchesSearch && matchesGrade && (filterUnit === 'All' || (q.unit ?? 1) === Number(filterUnit));
  });

  const handleDelete = async (id: string) => {
    if (await confirmDelete('Bạn có chắc chắn muốn xóa câu hỏi này khỏi ngân hàng câu hỏi?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions.filter(question => AUTHOR_CATEGORIES.includes(question.category as typeof AUTHOR_CATEGORIES[number])), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'question_bank_gdpt2018.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sampleQuestions: Question[] = [
    { id: 'sample-grammar', type: 'mcq', grade: 6, unit: 1, category: 'Grammar', prompt: 'She ___ to school every day.', options: ['go', 'goes'], correctAnswer: 1, explanationVi: 'She đi với goes.' },
    { id: 'sample-vocabulary', type: 'mcq', grade: 6, unit: 1, category: 'Vocabulary', prompt: 'Students wear a school ___.', options: ['uniform', 'calculator'], correctAnswer: 0, explanationVi: 'uniform = đồng phục.' },
    { id: 'sample-listening', type: 'mcq', grade: 6, unit: 1, category: 'Listening', audioPrompt: 'Tom has English on Monday and Friday.', prompt: 'When does Tom have English?', options: ['Monday and Friday', 'Tuesday and Friday'], correctAnswer: 0, explanationVi: '' },
    { id: 'sample-reading-1', type: 'mcq', grade: 6, unit: 1, category: 'Reading', passageId: 'sample-passage', passage: 'Mai rides a bike to school every morning. Her favourite subject is English.', prompt: 'How does Mai go to school?', options: ['By bike', 'By bus'], correctAnswer: 0, explanationVi: '' },
    { id: 'sample-reading-2', type: 'mcq', grade: 6, unit: 1, category: 'Reading', passageId: 'sample-passage', passage: 'Mai rides a bike to school every morning. Her favourite subject is English.', prompt: 'What is her favourite subject?', options: ['Maths', 'English'], correctAnswer: 1, explanationVi: '' },
  ];
  const downloadSample = (name: string, text: string, type: string) => {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const link = document.createElement('a'); link.href = url; link.download = name;
    link.click(); URL.revokeObjectURL(url);
  };
  const handleDownloadSampleJSON = () => downloadSample('sample_questions_template.json', JSON.stringify(sampleQuestions, null, 2), 'application/json');
  const handleDownloadSampleCSV = () => {
    const header = 'prompt,optionA,optionB,optionC,optionD,correctAnswer,category,explanationVi,grade,passage,audioPrompt,audioUrl,type,targetSentence,sampleAnswer,minWords,maxWords,unit,passageId';
    const lines = sampleQuestions.map(question => [question.prompt, ...(question.options || []), '', '', question.correctAnswer, question.category, question.explanationVi, question.grade, question.passage || '', question.audioPrompt || '', '', 'mcq', '', '', '', '', question.unit, question.passageId || ''].map(value => '"' + String(value).replaceAll('"', '""') + '"').join(','));
    downloadSample('sample_questions_template.csv', '\uFEFF' + header + '\n' + lines.join('\n'), 'text/csv;charset=utf-8');
  };

  // Handle File Input Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    setUploadError(null);
    setParsedPreviewQuestions([]);
    setUploadSuccessMessage(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text || !text.trim()) {
          setUploadError('Tập tin trống, vui lòng chọn file có dữ liệu.');
          return;
        }

        const isJSON = file.name.endsWith('.json') || text.trim().startsWith('[') || text.trim().startsWith('{');

        if (isJSON) {
          const raw = JSON.parse(text);
          const list = Array.isArray(raw) ? raw : raw.questions || [];
          if (!Array.isArray(list) || list.length === 0) {
            setUploadError('Không tìm thấy danh sách câu hỏi hợp lệ trong file JSON.');
            return;
          }

          const parsed: Question[] = list.map((item: any, idx: number) => {
            let choices;
            try { choices = normalizeMCQ(Array.isArray(item.options) ? item.options : [], item.correctAnswer); }
            catch (error) { throw new Error(`Câu ${idx + 1}: ${(error as Error).message}`); }
            return { ...item, id: 'imp-' + crypto.randomUUID(), type: item.type || 'mcq', ...choices,
              prompt: item.prompt || '', explanationVi: item.explanationVi || '', category: item.category || 'Grammar',
              unit: item.unit === undefined ? 1 : Number(item.unit), grade: item.grade === undefined ? undefined : Number(item.grade) as GradeLevel,
            };
          });

          const invalid = parsed.map((question, index) => ({ index, error: validateAuthorQuestion(question) || (question.grade && !unitService.getUnits(question.grade).some(unit => unit.unitNumber === (question.unit ?? 1)) ? 'Unit chưa được tạo cho khối lớp này.' : null) })).find(item => item.error);
          if (invalid) { setUploadError(`Câu ${invalid.index + 1}: ${invalid.error}`); return; }
          setParsedPreviewQuestions(parsed);
        } else {
          // Parse CSV / TXT
          const lines = parseCSVRows(text);
          if (lines.length < 2) {
            setUploadError('File CSV cần ít nhất 1 dòng tiêu đề và 1 dòng câu hỏi.');
            return;
          }

          // Skip header if first line starts with prompt or "prompt"
          const startIndex = lines[0][0]?.toLowerCase().replace(/^\uFEFF/, '') === 'prompt' ? 1 : 0;
          const parsed: Question[] = [];

          for (let i = startIndex; i < lines.length; i++) {
            const cols = lines[i];
            if (cols.length < 6) {
              setUploadError(`Dòng ${i + 1}: Thiếu nội dung câu hỏi hoặc phương án trả lời.`);
              return;
            }
            if (cols.length >= 6) {
              const prompt = cols[0];
              const optA = cols[1];
              const optB = cols[2];
              const optC = cols[3] || '';
              const optD = cols[4] || '';
              let correctIdx = Number.NaN;
              const rawAns = cols[5]?.toUpperCase().trim();
              if (rawAns === 'A' || rawAns === '0') correctIdx = 0;
              else if (rawAns === 'B' || rawAns === '1') correctIdx = 1;
              else if (rawAns === 'C' || rawAns === '2') correctIdx = 2;
              else if (rawAns === 'D' || rawAns === '3') correctIdx = 3;

              const category = (cols[6]?.trim() as any) || 'Grammar';
              const explanation = cols[7]?.trim() || 'Giải thích chuẩn GDPT 2018.';

              parsed.push({
                id: 'imp-csv-' + Date.now() + '-' + i,
                prompt,
                type: (cols[12] || (category === 'Speaking' ? 'speaking' : category === 'Writing' ? 'writing' : 'mcq')) as Question['type'],
                ...normalizeMCQ([optA, optB, optC, optD], correctIdx),
                explanationVi: explanation,
                category,
                unit: cols[17] ? Number(cols[17]) : 1,
                grade: cols[8] ? Number(cols[8]) as GradeLevel : undefined,
                passage: cols[9] || undefined,
                passageId: cols[18] || undefined,
                audioPrompt: cols[10] || undefined,
                audioUrl: cols[11] || undefined,
                targetSentence: cols[13] || undefined,
                sampleAnswer: cols[14] || undefined,
                minWords: cols[15] ? Number(cols[15]) : undefined,
                maxWords: cols[16] ? Number(cols[16]) : undefined
              });
            }
          }

          if (parsed.length === 0) {
            setUploadError('Không thể phân tích các dòng trong file CSV. Vui lòng kiểm tra mẫu định dạng.');
            return;
          }

          const invalid = parsed.map((question, index) => ({ index, error: validateAuthorQuestion(question) || (question.grade && !unitService.getUnits(question.grade).some(unit => unit.unitNumber === (question.unit ?? 1)) ? 'Unit chưa được tạo cho khối lớp này.' : null) })).find(item => item.error);
          if (invalid) { setUploadError(`Câu ${invalid.index + 1}: ${invalid.error}`); return; }
          setParsedPreviewQuestions(parsed);
        }
      } catch (err: any) {
        console.error('File parsing error', err);
        setUploadError('Lỗi đọc file: Định dạng JSON hoặc CSV không hợp lệ. (' + err.message + ')');
      }
    };

    reader.onerror = () => {
      setUploadError('Không thể đọc file từ thiết bị của bạn.');
    };

    reader.readAsText(file, 'utf-8');
  };

  // Confirm Import parsed questions into bank
  const handleConfirmImport = async () => {
    if (parsedPreviewQuestions.length === 0) return;

    // Send to backend if available
    try {
      await fetch('/api/db/import-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: parsedPreviewQuestions })
      });
    } catch (e) {
      console.warn('Backend offline fallback for questions import');
    }

    setQuestions((prev) => [...parsedPreviewQuestions, ...prev]);
    setUploadSuccessMessage(`Đã nhập thành công ${parsedPreviewQuestions.length} câu hỏi mới vào ngân hàng!`);
    setTimeout(() => {
      setShowUploadModal(false);
      setParsedPreviewQuestions([]);
      setUploadedFile(null);
      setUploadSuccessMessage(null);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {confirmationDialog}
      {/* Header bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">
            <span>Học liệu của Giáo viên</span>
            <span aria-hidden="true">·</span>
            <span>Ngân hàng câu hỏi GDPT 2018</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Soạn Câu Hỏi & Học Liệu
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onManageUnits && <button onClick={onManageUnits} className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100">Tạo Unit / Chủ đề</button>}
          {onManageClasses && <button onClick={onManageClasses} className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">Tạo lớp / Quản lý lớp</button>}
          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            title="Xuất ngân hàng câu hỏi dưới dạng JSON"
          >
            <Download className="w-4 h-4" />
            <span>Xuất JSON</span>
          </button>

          {/* Import File Button */}
          <button
            onClick={() => {
              setUploadedFile(null);
              setParsedPreviewQuestions([]);
              setUploadError(null);
              setUploadSuccessMessage(null);
              setShowUploadModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs border border-purple-200 transition-colors"
            title="Tải lên tập tin câu hỏi (JSON, CSV, Excel TXT)"
          >
            <Upload className="w-4 h-4" />
            <span>Gửi / Nhập từ file</span>
          </button>

          {/* Manual Add Button */}
          <button
            onClick={() => {
              const grade = filterGrade !== 'All' && filterGrade !== 'unassigned' ? Number(filterGrade) as GradeLevel : activeGrade;
              const units = unitService.getUnits(grade);
              const preferred = Number(filterUnit) || activeUnit;
              setAuthorGrade(grade); setAuthorUnit(units.some(unit => unit.unitNumber === preferred) ? preferred : units[0].unitNumber);
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm bài tập / câu hỏi</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng câu hỏi</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{questions.filter(q => AUTHOR_CATEGORIES.includes(q.category as typeof AUTHOR_CATEGORIES[number])).length}</div>
          <span className="text-2xs text-purple-600 font-medium">Bảo đảm không trùng lặp</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ngữ pháp</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {questions.filter((q) => q.category === 'Grammar').length}
          </div>
          <span className="text-2xs text-slate-400">Các thì & Cấu trúc</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Từ vựng</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {questions.filter((q) => q.category === 'Vocabulary').length}
          </div>
          <span className="text-2xs text-slate-400">Chủ đề lớp 6-9</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nghe & Đọc hiểu</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {questions.filter((q) => ['Listening', 'Reading'].includes(q.category)).length}
          </div>
          <span className="text-2xs text-slate-400">Bài nghe & Đoạn văn</span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nội dung câu hỏi..."
            className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />

          <select aria-label="Lọc câu hỏi theo khối lớp" value={filterGrade} onChange={e => { setFilterGrade(e.target.value); setFilterUnit('All'); }} className="rounded-xl border border-slate-200 px-3 py-2 text-xs">
            <option value="All">Tất cả khối lớp</option>
            {[6, 7, 8, 9].map(grade => <option key={grade} value={grade}>Lớp {grade}</option>)}
            <option value="unassigned">Chưa chọn khối lớp</option>
          </select>
          <select aria-label="Lọc câu hỏi theo Unit" value={filterUnit} onChange={e => setFilterUnit(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs">
            <option value="All">Tất cả Unit</option>
            {[...new Set((filterGrade === 'All' || filterGrade === 'unassigned' ? [6, 7, 8, 9] : [Number(filterGrade)]).flatMap(grade => unitService.getUnits(grade as GradeLevel).map(unit => unit.unitNumber)))].sort((a,b) => a-b).map(unit => <option key={unit} value={unit}>Unit {unit}</option>)}
          </select>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['All', ...AUTHOR_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterCategory === cat
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Table */}
        <div className="divide-y divide-slate-100 border-t border-slate-100 pt-2">
          {filteredQuestions.map((q, idx) => (
            <div key={q.id} className="py-4 flex items-start justify-between gap-4 group">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                  <span className="text-2xs font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                    {q.category} · {q.grade ? `Lớp ${q.grade}` : 'Chưa chọn khối lớp'} · Unit {q.unit ?? 1}
                  </span>
                </div>
                {!q.grade && <select aria-label="Chọn khối lớp cho câu hỏi cũ" defaultValue="" onChange={event => {
                  const grade = Number(event.target.value) as GradeLevel;
                  setQuestions(previous => previous.map(question => question.id === q.id ? { ...question, grade } : question));
                }} className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-xs">
                  <option value="" disabled>Chọn khối lớp để học sinh xem</option>
                  {[6, 7, 8, 9].map(grade => <option key={grade} value={grade}>Lớp {grade}</option>)}
                </select>}
                <QuestionContext question={q} showTranscript />
                {q.sampleAnswer && <details className="text-xs"><summary className="cursor-pointer">Bài mẫu tham khảo</summary><p className="mt-2 whitespace-pre-wrap">{q.sampleAnswer}</p></details>}
                <h4
                  className="text-xs sm:text-sm font-semibold text-slate-900"
                  dangerouslySetInnerHTML={{ __html: q.prompt }}
                />
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  {q.options?.map((opt, oIdx) => (
                    <span
                      key={oIdx}
                      className={oIdx === q.correctAnswer ? 'font-bold text-emerald-700' : 'text-slate-500'}
                    >
                      {String.fromCharCode(65 + oIdx)}. <span dangerouslySetInnerHTML={{ __html: opt }} />
                      {oIdx === q.correctAnswer && ' (Đúng)'}
                    </span>
                  ))}
                </div>
                <p className="text-2xs text-slate-400 italic">Giải thích: {q.explanationVi}</p>
              </div>

              <button
                onClick={() => handleDelete(q.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                title="Xóa câu hỏi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Gửi & Nhập câu hỏi từ file</h3>
                <p className="text-xs text-slate-500">
                  Hỗ trợ định dạng file <strong>JSON</strong> và <strong>CSV (Excel)</strong> chứa trắc nghiệm Ngữ pháp, Từ vựng, Nghe và Đọc
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Template Download Row */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-purple-900 block">Tải file mẫu để điền câu hỏi:</span>
                <span className="text-2xs text-purple-700">Mỗi câu có ít nhất 2 đáp án. Chọn grade và unit; Reading dùng passage và passageId chung cho các câu cùng đoạn văn. Listening dùng audioPrompt hoặc audioUrl.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSampleCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-semibold shadow-2xs transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mẫu CSV / Excel</span>
                </button>
                <button
                  onClick={handleDownloadSampleJSON}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-purple-700 hover:bg-purple-100 border border-purple-200 text-xs font-semibold shadow-2xs transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Mẫu JSON</span>
                </button>
              </div>
            </div>

            {/* Drag and Drop Upload Box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-300 hover:border-purple-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-50 hover:bg-purple-50/30 transition-all space-y-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-800">
                  {uploadedFile ? uploadedFile.name : 'Kéo thả file vào đây hoặc bấm để chọn từ máy tính'}
                </p>
                <p className="text-2xs text-slate-400">
                  Định dạng hỗ trợ: .json, .csv, .txt (Dung lượng tối đa 10MB)
                </p>
              </div>
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Success Message */}
            {uploadSuccessMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{uploadSuccessMessage}</span>
              </div>
            )}

            {/* Parsed Preview Table */}
            {parsedPreviewQuestions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Xem trước ({parsedPreviewQuestions.length} câu hỏi hợp lệ):
                  </span>
                  <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Sẵn sàng nhập
                  </span>
                </div>

                <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 p-2 text-xs space-y-2">
                  {parsedPreviewQuestions.map((q, i) => (
                    <div key={i} className="pt-2 first:pt-0">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <span className="text-purple-700">#{i + 1}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-2xs">
                          {q.category}
                        </span>
                        <span>{q.prompt}</span>
                      </div>
                      <QuestionContext question={q} showTranscript />
                      <div className="flex flex-wrap gap-2 text-2xs text-slate-600 mt-1 pl-4">
                        {q.options?.map((opt, oIdx) => (
                          <span
                            key={oIdx}
                            className={oIdx === q.correctAnswer ? 'font-bold text-emerald-700' : ''}
                          >
                            {String.fromCharCode(65 + oIdx)}. {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Đóng
              </button>
              <button
                onClick={handleConfirmImport}
                disabled={parsedPreviewQuestions.length === 0}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition-colors disabled:opacity-50"
              >
                Xác nhận nhập {parsedPreviewQuestions.length > 0 ? `(${parsedPreviewQuestions.length} câu)` : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && <QuestionAuthorModal initialGrade={authorGrade} initialUnit={authorUnit} onClose={() => setShowAddModal(false)} onSave={added => {
        setQuestions(previous => [...added, ...previous]); setFilterCategory(added[0].category); setFilterGrade(String(added[0].grade)); setFilterUnit(String(added[0].unit)); setShowAddModal(false);
      }} />}
    </div>
  );
};
