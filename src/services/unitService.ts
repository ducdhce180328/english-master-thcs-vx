import { GradeLevel, UnitModule } from '../types';
import { CURRICULUM_DATA } from '../data/curriculum';
import { questionBankService, questionsForGrade } from './questionBankService';

export interface TeacherUnit {
  grade: GradeLevel;
  unitNumber: number;
  title: string;
  descriptionVi: string;
}
const KEY = 'em_teacher_units';
const read = (): TeacherUnit[] => {
  try { const parsed = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(parsed) ? parsed : []; } catch { return []; }
};
const publish = () => {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('em_units_changed'));
};
export function buildTeacherUnit(unit: TeacherUnit): UnitModule {
  const { grade, unitNumber, title, descriptionVi } = unit;
  const id = `teacher-${grade}-${unitNumber}`;
  const teacherQuestions = questionsForGrade(questionBankService.getQuestions(), grade, undefined, unitNumber);
  return {
    ...unit, isCustom: true, teacherQuestions, vocabularies: [], quizQuestions: teacherQuestions.filter(question => question.type === 'mcq'),
    grammar: { id: `${id}-grammar`, title, grade, unit: unitNumber, formula: '', usageVi: '', signalsVi: [], examples: [], commonMistakesVi: [], practiceQuestions: [] },
    listening: { id: `${id}-listening`, title, grade, unit: unitNumber, difficulty: 'Easy', audioPrompt: '', sentences: [], transcriptVi: '', keywords: [], questions: [] },
    speaking: { id: `${id}-speaking`, title, grade, unit: unitNumber, targetSentence: '', ipa: '', stressGuide: '', meaningVi: '', samplePrompt: '', topic: title, items: [] },
    reading: { id: `${id}-reading`, title, grade, unit: unitNumber, wordCount: 0, topic: title, passage: '', translationVi: '', vocabularyHighlights: [], questions: [] },
    writing: { id: `${id}-writing`, title, grade, unit: unitNumber, topicPrompt: '', minWords: 1, maxWords: 100, outlineVi: [], suggestedPhrases: [], sampleEssay: '', practiceTasks: [] },
  };
}
export const unitService = {
  getUnits(grade: GradeLevel): UnitModule[] {
    const original = CURRICULUM_DATA[grade] || [];
    const custom = read().filter(unit => unit.grade === grade && !original.some(item => item.unitNumber === unit.unitNumber));
    return [...original, ...custom.map(buildTeacherUnit)].sort((a, b) => a.unitNumber - b.unitNumber);
  },
  saveUnit(unit: TeacherUnit) {
    if (![6, 7, 8, 9].includes(unit.grade) || !Number.isInteger(unit.unitNumber) || unit.unitNumber < 1 || !unit.title.trim()) throw new Error('Chọn khối lớp, nhập số Unit hợp lệ và tên chủ đề.');
    if ((CURRICULUM_DATA[unit.grade] || []).some(item => item.unitNumber === unit.unitNumber)) throw new Error('Số Unit này đã có trong học liệu gốc. Chọn số Unit khác.');
    const list = read();
    const updated = { ...unit, title: unit.title.trim(), descriptionVi: unit.descriptionVi.trim() };
    const index = list.findIndex(item => item.grade === unit.grade && item.unitNumber === unit.unitNumber);
    if (index < 0) list.push(updated); else list[index] = updated;
    localStorage.setItem(KEY, JSON.stringify(list));
    publish();
  },
  deleteUnit(grade: GradeLevel, unitNumber: number) {
    const list = read();
    if (!list.some(unit => unit.grade === grade && unit.unitNumber === unitNumber)) throw new Error('Chỉ xóa được Unit do giáo viên tạo.');
    const bank = questionBankService.getQuestions();
    const updatedBank = bank.filter(question => question.grade !== grade || (question.unit ?? 1) !== unitNumber);
    const oldBank = localStorage.getItem('em_question_bank');
    try {
      questionBankService.saveQuestions(updatedBank);
      localStorage.setItem(KEY, JSON.stringify(list.filter(unit => unit.grade !== grade || unit.unitNumber !== unitNumber)));
    } catch (error) {
      if (oldBank === null) localStorage.removeItem('em_question_bank'); else localStorage.setItem('em_question_bank', oldBank);
      throw error;
    }
    publish();
  },
};
