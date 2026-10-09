import React, { useState } from 'react';
import { GradeLevel, Question } from '../../types';
import { groupQuestions, questionBankService, questionsForGrade } from '../../services/questionBankService';
import { QuestionContext } from './QuestionContext';
import { TeacherResponsePractice } from './TeacherResponsePractice';

export function TeacherQuestionPractice({ grade, category, unit }: { grade: GradeLevel; category: Question['category']; unit?: number }) {
  const [questions] = useState(() => questionsForGrade(questionBankService.getQuestions(), grade, category, unit));
  const [answers, setAnswers] = useState<Record<string, number>>({});
  let questionNumber = 0;
  if (!questions.length) return null;
  return <section className="mt-8 space-y-4 rounded-3xl border border-indigo-200 bg-white p-6">
    <h2 className="text-lg font-bold text-slate-900">Bài tập từ giáo viên · {category} · Lớp {grade}{unit ? ` · Unit ${unit}` : ''}</h2>
    {groupQuestions(questions).map(group => <div key={group[0].id} className="space-y-4 border-t border-slate-100 pt-4">
      <QuestionContext question={group[0]} />
      {group.map(question => <div key={question.id} className="space-y-3">
      <p className="text-sm font-semibold text-slate-900"><span className="mr-2">{++questionNumber}.</span><span dangerouslySetInnerHTML={{ __html: question.prompt }} /></p>
      {question.type === 'speaking' || question.type === 'writing' ? <TeacherResponsePractice question={question} /> : <div className="grid gap-2 sm:grid-cols-2">{question.options?.map((option, optionIndex) => <button key={optionIndex} onClick={() => setAnswers(previous => ({ ...previous, [question.id]: optionIndex }))} className={`rounded-xl border p-3 text-left text-sm ${answers[question.id] === optionIndex ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'}`}>
        <span className="mr-2 font-bold">{String.fromCharCode(65 + optionIndex)}.</span><span dangerouslySetInnerHTML={{ __html: option }} />
      </button>)}</div>}
      {answers[question.id] !== undefined && <div className={`rounded-xl p-3 text-sm ${answers[question.id] === question.correctAnswer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
        <p className="font-semibold">{answers[question.id] === question.correctAnswer ? 'Chính xác!' : 'Chưa chính xác, hãy thử lại.'}</p>
        {question.explanationVi && <p className="mt-1">{question.explanationVi}</p>}
      </div>}
      </div>)}
    </div>)}
  </section>;
}
