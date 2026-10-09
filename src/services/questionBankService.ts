import { GradeLevel, Question } from '../types';
import { SAMPLE_EXAMS } from '../data/curriculum';

export const QUESTION_CATEGORIES = ['Grammar', 'Vocabulary', 'Pronunciation', 'Listening', 'Speaking', 'Reading', 'Writing'] as const;
export const AUTHOR_CATEGORIES = ['Grammar', 'Vocabulary', 'Listening', 'Reading'] as const;

export interface MCQDraft { prompt: string; options: string[]; correctAnswer: number; explanationVi: string; }
export function normalizeMCQ(options: string[], correctAnswer: number) {
  const filled = options.map((text, index) => ({ text: text.trim(), index })).filter(option => option.text);
  if (filled.length < 2) throw new Error('Nhập ít nhất 2 đáp án.');
  const remapped = filled.findIndex(option => option.index === correctAnswer);
  if (remapped < 0) throw new Error('Chọn đáp án đúng trong các đáp án đã nhập.');
  return { options: filled.map(option => option.text), correctAnswer: remapped };
}
export function validateAuthorQuestion(question: Partial<Question>): string | null {
  if (!AUTHOR_CATEGORIES.includes(question.category as typeof AUTHOR_CATEGORIES[number]) || question.type !== 'mcq') return 'Chỉ nhập trắc nghiệm Ngữ pháp, Từ vựng, Nghe và Đọc.';
  return validateQuestion(question);
}
export function buildTeacherQuestions(input: { category: typeof AUTHOR_CATEGORIES[number]; grade: GradeLevel; unit: number; passage?: string; audioPrompt?: string; audioUrl?: string; drafts: MCQDraft[] }, makeId: () => string = () => crypto.randomUUID()): Question[] {
  if (!AUTHOR_CATEGORIES.includes(input.category)) throw new Error('Chỉ tạo câu hỏi Ngữ pháp, Từ vựng, Nghe hoặc Đọc.');
  if (!input.drafts.length) throw new Error('Thêm ít nhất một câu hỏi.');
  const passageId = input.category === 'Reading' ? `passage-${makeId()}` : undefined;
  return input.drafts.map((draft, index) => {
    let answers;
    try { answers = normalizeMCQ(draft.options, draft.correctAnswer); }
    catch (error) { throw new Error(`Câu ${index + 1}: ${(error as Error).message}`); }
    const question: Question = {
      id: `custom-q-${makeId()}`, type: 'mcq', grade: input.grade, unit: input.unit, category: input.category,
      prompt: draft.prompt.trim(), explanationVi: draft.explanationVi.trim(), ...answers,
      ...(input.category === 'Reading' ? { passage: input.passage?.trim(), passageId } : {}),
      ...(input.category === 'Listening' ? { audioPrompt: input.audioPrompt?.trim(), audioUrl: input.audioUrl?.trim() } : {}),
    };
    const error = validateQuestion(question);
    if (error) throw new Error(`Câu ${index + 1}: ${error}`);
    return question;
  });
}
export function groupQuestions(questions: Question[]): Question[][] {
  const groups: Question[][] = [];
  const passages = new Map<string, Question[]>();
  for (const question of questions) {
    if (question.category !== 'Reading') { groups.push([question]); continue; }
    const key = JSON.stringify([question.grade, question.unit ?? 1, question.passageId ?? '', question.passage]);
    const group = passages.get(key);
    if (group) group.push(question);
    else { const fresh = [question]; passages.set(key, fresh); groups.push(fresh); }
  }
  return groups;
}

export function validateQuestion(question: Partial<Question>): string | null {
  if (!question || typeof question !== 'object') return 'Dữ liệu câu hỏi không hợp lệ.';
  if (typeof question.prompt !== 'string' || !question.prompt.trim()) return 'Vui lòng nhập nội dung câu hỏi.';
  if (!question.category || !QUESTION_CATEGORIES.includes(question.category)) return 'Phân loại câu hỏi không hợp lệ.';
  if (!question.grade || ![6, 7, 8, 9].includes(question.grade)) return 'Câu hỏi cần được chọn khối lớp từ 6 đến 9.';
  if (question.unit !== undefined && (!Number.isInteger(question.unit) || question.unit < 1)) return 'Số Unit phải là số nguyên từ 1 trở lên.';
  for (const field of ['passage', 'audioPrompt', 'audioUrl', 'targetSentence', 'sampleAnswer'] as const) {
    if (question[field] !== undefined && typeof question[field] !== 'string') return `${field} phải là văn bản.`;
  }
  if (question.category === 'Speaking') {
    if (question.type !== 'speaking') return 'Bài Nói cần dùng dạng luyện nói.';
    if (!question.targetSentence?.trim()) return 'Nhập câu hoặc đoạn tiếng Anh mẫu để luyện nói.';
  } else if (question.category === 'Writing') {
    if (question.type !== 'writing') return 'Bài Viết cần dùng dạng tự viết.';
    if (!Number.isInteger(question.minWords) || !Number.isInteger(question.maxWords) || question.minWords! < 1 || question.maxWords! < question.minWords!) return 'Số từ tối thiểu phải từ 1 và không vượt số từ tối đa.';
  } else {
    if (question.type !== 'mcq') return 'Phần này cần dùng câu hỏi trắc nghiệm lựa chọn.';
    if (!Array.isArray(question.options) || question.options.length < 2 || question.options.some(option => typeof option !== 'string' || !option.trim())) return 'Nhập ít nhất 2 phương án, không để trống phương án.';
    if (typeof question.correctAnswer !== 'number' || !Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer >= question.options.length) return 'Đáp án đúng phải trỏ tới một phương án đã nhập.';
  }
  if (question.category === 'Reading' && !question.passage?.trim()) return 'Câu hỏi Reading cần có đoạn đọc.';
  if (question.category === 'Listening' && !question.audioPrompt?.trim() && !question.audioUrl?.trim()) return 'Câu hỏi Listening cần nội dung bài nghe hoặc đường dẫn âm thanh.';
  if (question.audioUrl) {
    try { if (!['http:', 'https:'].includes(new URL(question.audioUrl).protocol)) return 'Đường dẫn âm thanh phải bắt đầu bằng http:// hoặc https://.'; }
    catch { return 'Đường dẫn âm thanh không hợp lệ.'; }
  }
  return null;
}

export const questionBankService = {
  getQuestions(): Question[] {
    try {
      const saved = localStorage.getItem('em_question_bank');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const sampleGrades = new Map(SAMPLE_EXAMS.flatMap(exam => exam.questions.map(question => [question.id, exam.grade] as const)));
          return parsed.map(question => ({ ...question, grade: question.grade ?? sampleGrades.get(question.id) }));
        }
      }
    } catch {}
    return SAMPLE_EXAMS.flatMap(exam => exam.questions.map(question => ({ ...question, grade: exam.grade })));
  },
  saveQuestions(questions: Question[]) {
    localStorage.setItem('em_question_bank', JSON.stringify(questions));
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('em_question_bank_changed'));
  },
};

export function questionsForGrade(questions: Question[], grade: GradeLevel, category?: Question['category'], unit?: number): Question[] {
  return questions.filter(question => question.grade === grade && (!category || question.category === category) && (unit === undefined || (question.unit ?? 1) === unit) && !validateQuestion(question));
}

// Keep line breaks inside quoted passages when importing CSV.
export function parseCSVRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], value = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) { row.push(value.trim()); value = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(value.trim()); if (row.some(Boolean)) rows.push(row);
      row = []; value = '';
    } else value += char;
  }
  if (quoted) throw new Error('Dấu ngoặc kép trong CSV chưa được đóng.');
  row.push(value.trim()); if (row.some(Boolean)) rows.push(row);
  return rows;
}
