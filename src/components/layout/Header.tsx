import React from 'react';
import {
  GraduationCap,
  Flame,
  Zap,
  BookOpen,
  User,
  Award,
  Users,
  Sparkles
} from 'lucide-react';
import { Role, GradeLevel, UserProfile } from '../../types';

interface HeaderProps {
  userProfile: UserProfile;
  activeGrade: GradeLevel;
  onGradeChange: (grade: GradeLevel) => void;
  onRoleChange: (role: Role) => void;
  onOpenStudentSelector?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  activeGrade,
  onGradeChange,
  onRoleChange,
  onOpenStudentSelector
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Grade selection */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900 tracking-tight leading-none block">
                  English Master THCS
                </span>
                <span className="text-xs text-indigo-700 font-semibold uppercase tracking-wider block">
                  Vĩnh Xuân
                </span>
              </div>
            </div>

            {/* Grade Switcher */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/60">
              {([6, 7, 8, 9] as GradeLevel[]).map((grade) => (
                <button
                  key={grade}
                  onClick={() => onGradeChange(grade)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${activeGrade === grade
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Lớp {grade}
                </button>
              ))}
            </div>

            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>Sách: <strong>Global Success</strong></span>
            </div>
          </div>

          {/* Gamification Stats & Role Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Class & Student Switcher Button */}
            {onOpenStudentSelector && (
              <button
                onClick={onOpenStudentSelector}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-300 text-xs transition-all shadow-2xs group"
                title="Chọn lớp hoặc chuyển học sinh trong lớp"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                  {userProfile.rollNumber || '01'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-bold text-slate-800 group-hover:text-indigo-600 truncate max-w-[120px] leading-tight text-xs">
                    {userProfile.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate max-w-[120px] leading-tight">
                    {userProfile.className ? userProfile.className.split(' - ')[0] : `Lớp ${activeGrade}A1`}
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/80 group-hover:bg-indigo-600 group-hover:text-white px-1.5 py-0.5 rounded-md transition-colors">
                  Đổi HS
                </span>
              </button>
            )}

            {/* Role Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/60">
              <button
                onClick={() => onRoleChange('student')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${userProfile.role === 'student'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
                title="Giao diện Học sinh"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Học sinh</span>
              </button>
              <button
                onClick={() => onRoleChange('teacher')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${userProfile.role === 'teacher'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
                title="Giao diện Giáo viên"
              >
                <Award className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Giáo viên</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
