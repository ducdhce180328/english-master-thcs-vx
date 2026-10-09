import React from 'react';
import {
  Map,
  CheckCircle,
  Circle,
  Lock,
  Headphones,
  Mic,
  BookOpen,
  PenTool,
  Bookmark,
  Layers,
  HelpCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import { UnitModule, GradeLevel } from '../../types';
import { NavTab } from '../layout/Sidebar';

interface RoadmapModuleProps {
  units: UnitModule[];
  grade: GradeLevel;
  activeUnitNumber: number;
  onSelectUnit: (unitNum: number) => void;
  onNavigateSkill: (skillTab: NavTab) => void;
}

export const RoadmapModule: React.FC<RoadmapModuleProps> = ({
  units,
  grade,
  activeUnitNumber,
  onSelectUnit,
  onNavigateSkill
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">
            <span>Bản đồ lộ trình học tập</span>
            <span aria-hidden="true">·</span>
            <span>Tiếng Anh Lớp {grade} (Global Success)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Lộ Trình Từng Unit & Kỹ Năng
          </h2>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-6">
        {units.map((unit) => {
          const isActive = unit.unitNumber === activeUnitNumber;

          return (
            <div
              key={unit.unitNumber}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isActive
                  ? 'bg-white border-indigo-300 shadow-md ring-4 ring-indigo-500/5'
                  : 'bg-white/60 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 uppercase">
                      Unit {unit.unitNumber}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <Star className="w-4 h-4 fill-amber-500" />
                      <Star className="w-4 h-4 fill-amber-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{unit.title}</h3>
                  <p className="text-xs text-slate-500 max-w-xl">{unit.descriptionVi}</p>
                </div>

                <button
                  onClick={() => onSelectUnit(unit.unitNumber)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isActive ? 'Đang học Unit này' : 'Chọn học Unit này'}
                </button>
              </div>

              {/* 7 Core Lessons in this Unit */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                <button
                  onClick={() => { onSelectUnit(unit.unitNumber); onNavigateSkill('vocabulary'); }}
                  className="p-3.5 rounded-2xl bg-indigo-50/60 hover:bg-indigo-100/80 border border-indigo-100 text-left transition-all group"
                >
                  <Bookmark className="w-4 h-4 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 block">Từ vựng</span>
                  <span className="text-2xs text-slate-500">{unit.isCustom ? `${unit.teacherQuestions?.filter(q => q.category === 'Vocabulary').length || 0} bài tập` : `${unit.vocabularies.length} từ mới`}</span>
                </button>

                <button
                  onClick={() => { onSelectUnit(unit.unitNumber); onNavigateSkill('grammar'); }}
                  className="p-3.5 rounded-2xl bg-purple-50/60 hover:bg-purple-100/80 border border-purple-100 text-left transition-all group"
                >
                  <Layers className="w-4 h-4 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 block">Ngữ pháp</span>
                  <span className="text-2xs text-slate-500">{unit.isCustom ? `${unit.teacherQuestions?.filter(q => q.category === 'Grammar').length || 0} bài tập` : 'Công thức & Ví dụ'}</span>
                </button>

                <button
                  onClick={() => { onSelectUnit(unit.unitNumber); onNavigateSkill('listening'); }}
                  className="p-3.5 rounded-2xl bg-sky-50/60 hover:bg-sky-100/80 border border-sky-100 text-left transition-all group"
                >
                  <Headphones className="w-4 h-4 text-sky-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 block">Luyện nghe</span>
                  <span className="text-2xs text-slate-500">{unit.isCustom ? `${unit.teacherQuestions?.filter(q => q.category === 'Listening').length || 0} bài nghe` : unit.listening.difficulty}</span>
                </button>



                <button
                  onClick={() => { onSelectUnit(unit.unitNumber); onNavigateSkill('reading'); }}
                  className="p-3.5 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-100 text-left transition-all group"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 block">Luyện đọc</span>
                  <span className="text-2xs text-slate-500">{unit.isCustom ? `${unit.teacherQuestions?.filter(q => q.category === 'Reading').length || 0} bài đọc` : `${unit.reading.wordCount} từ`}</span>
                </button>

                <button
                  onClick={() => { onSelectUnit(unit.unitNumber); onNavigateSkill('writing'); }}
                  className="p-3.5 rounded-2xl bg-rose-50/60 hover:bg-rose-100/80 border border-rose-100 text-left transition-all group"
                >
                  <PenTool className="w-4 h-4 text-rose-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 block">Luyện viết</span>
                  <span className="text-2xs text-slate-500">{unit.isCustom ? `${unit.teacherQuestions?.filter(q => q.category === 'Writing').length || 0} bài viết` : 'Luyện viết'}</span>
                </button>

                <button
                  onClick={() => { onSelectUnit(unit.unitNumber); onNavigateSkill('quiz'); }}
                  className="p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-100 text-left transition-all group"
                >
                  <HelpCircle className="w-4 h-4 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-900 block">Trắc nghiệm</span>
                  <span className="text-2xs text-slate-500">{unit.quizQuestions.length} câu hỏi</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
