import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  Search,
  Plus,
  X,
  GraduationCap,
  Sparkles,
  Zap,
  Flame,
  Award,
  Check,
  ChevronRight,
  School,
  UserPlus
} from 'lucide-react';
import { UserProfile, StudentRecord, ClassRoom, GradeLevel } from '../../types';
import { storageService } from '../../services/storageService';

interface ClassStudentSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectStudent: (student: StudentRecord) => void;
  onSelectGrade?: (grade: GradeLevel) => void;
}

export const ClassStudentSelectorModal: React.FC<ClassStudentSelectorModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectStudent,
  onSelectGrade
}) => {
  const [classes, setClasses] = useState<ClassRoom[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>(currentUser.classId || 'cls-6a1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'roster' | 'add_student'>('roster');

  // Form for adding new student
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGender, setNewStudentGender] = useState<'male' | 'female'>('male');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadClasses();
    }
  }, [isOpen]);

  const loadClasses = async () => {
    setIsLoading(true);
    try {
      const clsList = await storageService.fetchClasses();
      setClasses(clsList);
      if (clsList.length > 0 && !selectedClassId) {
        setSelectedClassId(clsList[0].id);
      }
    } catch (err) {
      console.error('Error loading classes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const students = currentClass?.students || [];

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      (s.studentCode && s.studentCode.toLowerCase().includes(q)) ||
      String(s.rollNumber) === q
    );
  });

  const handleChooseStudent = (student: StudentRecord) => {
    const updated = storageService.switchStudent(student);
    if (onSelectGrade && student.grade) {
      onSelectGrade(student.grade);
    }
    onSelectStudent(student);
    onClose();
  };

  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !currentClass) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/db/classes/${currentClass.id}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStudentName.trim(),
          gender: newStudentGender
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMsg(`Đã thêm học sinh ${newStudentName} vào ${currentClass.name}!`);
        setNewStudentName('');
        await loadClasses();
        if (data.student) {
          setTimeout(() => {
            handleChooseStudent(data.student);
          }, 600);
        }
      }
    } catch (err) {
      console.error('Error adding student:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Chọn Lớp & Tên Học Sinh Để Vào Học
              </h2>
              <p className="text-xs text-indigo-100 mt-0.5">
                Chỉ cần chọn đúng lớp và đúng tên của em — bài tập và điểm số sẽ được lưu riêng cho em!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Class Selection Pills - Step 1 */}
        <div className="p-4 sm:px-6 bg-slate-50/90 border-b border-slate-200/70">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">1</span>
              Bước 1: Chọn đúng lớp học của em:
            </span>
            <span className="text-xs text-slate-500">
              Lớp đang chọn: <strong className="text-indigo-600 font-bold">{currentClass?.name}</strong> ({currentClass?.students?.length || 0} HS)
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {classes.map((cls) => {
              const isSelected = cls.id === selectedClassId;
              return (
                <button
                  key={cls.id}
                  onClick={() => {
                    setSelectedClassId(cls.id);
                    if (onSelectGrade && cls.grade) {
                      onSelectGrade(cls.grade);
                    }
                  }}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 ring-2 ring-indigo-400/40'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200/80'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`} />
                  <span>{cls.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-600'}`}>
                    {cls.students?.length || cls.studentCount || 0} em
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Active Student Indicator Bar */}
        <div className="px-6 py-2.5 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-indigo-900">
            <span className="text-slate-500">Học sinh đang chọn hiện tại:</span>
            <strong className="font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              {currentUser.name} (STT {currentUser.rollNumber || '01'} - {currentUser.className || currentClass?.name})
            </strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'roster'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-indigo-600 hover:bg-indigo-100/60'
              }`}
            >
              Danh sách cả lớp ({students.length})
            </button>
            <button
              onClick={() => setActiveTab('add_student')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                activeTab === 'add_student'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-indigo-600 hover:bg-indigo-100/60'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Tự thêm tên em</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'roster' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold flex items-center justify-center">2</span>
                  Bước 2: Bấm vào đúng tên của em để vào học:
                </span>
                <span className="text-xs text-slate-500">
                  (Tìm thấy {filteredStudents.length} / {students.length} học sinh)
                </span>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Gõ họ tên hoặc STT của em để tìm nhanh (VD: Dương Hữu Quy, 01, HS-601)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Students Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredStudents.map((student) => {
                  const isCurrent = currentUser.name.toLowerCase() === student.name.toLowerCase();
                  return (
                    <div
                      key={student.id}
                      onClick={() => handleChooseStudent(student)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left group ${
                        isCurrent
                          ? 'bg-indigo-50/90 border-indigo-400 shadow-xs ring-2 ring-indigo-500/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative flex-shrink-0">
                          <img
                            src={student.avatar || (student.gender === 'female'
                              ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
                              : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')}
                            alt={student.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          />
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-900 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                            {student.rollNumber}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 flex items-center gap-1">
                            <span>{student.name}</span>
                            {isCurrent && <span className="text-[10px] text-emerald-600 font-semibold">(Đang học)</span>}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-0.5 text-indigo-600 font-semibold">
                              <Zap className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                              {student.xp} XP
                            </span>
                            <span className="flex items-center gap-0.5 text-amber-600">
                              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                              {student.streak}d
                            </span>
                            {student.averageScore > 0 && (
                              <span className="text-slate-600 font-medium">
                                ĐTB: {student.averageScore}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-200">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Đang học</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                          >
                            <span>Vào học</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-10 text-slate-500 text-sm">
                  Không tìm thấy học sinh nào khớp với "{searchQuery}".
                  <div className="mt-2">
                    <button
                      onClick={() => setActiveTab('add_student')}
                      className="text-indigo-600 font-semibold hover:underline text-xs"
                    >
                      + Thêm học sinh này vào lớp ngay
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'add_student' && (
            <form onSubmit={handleAddStudentSubmit} className="space-y-4 max-w-md mx-auto py-2">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Thêm học sinh mới vào {currentClass?.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Học sinh mới sẽ được thêm vào danh sách sĩ số của lớp và có hồ sơ học tập riêng biệt.
                </p>
              </div>

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Họ và tên học sinh *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Dương Hữu Quy, Lê Minh Khang..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Giới tính</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewStudentGender('male')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      newStudentGender === 'male'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Nam 👦
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewStudentGender('female')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      newStudentGender === 'female'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 font-bold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Nữ 👧
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('roster')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy / Quay lại
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newStudentName.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Đang thêm...' : 'Thêm học sinh & Vào học'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Mỗi học sinh trong lớp lưu trữ điểm, bài nộp và XP độc lập.</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
