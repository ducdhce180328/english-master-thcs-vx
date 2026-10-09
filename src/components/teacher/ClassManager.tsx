import { useDeleteConfirmation } from '../common/useDeleteConfirmation';
import React, { useState, useEffect } from 'react';
import {
  Users,
  Award,
  FileText,
  Plus,
  CheckCircle,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  BookOpen,
  Edit3,
  Trash2,
  GraduationCap,
  Building,
  Mail,
  Phone,
  UserCheck,
  UserPlus,
  Search,
  Upload,
  Zap,
  Flame,
  User,
  X
} from 'lucide-react';
import { StudentRecord } from '../../types';

interface TeacherProfile {
  name: string;
  title: string;
  school: string;
  email: string;
  phone: string;
}

interface ClassItem {
  id: string;
  name: string;
  grade: number;
  studentCount: number;
  teacher: string;
  code?: string;
  academicYear?: string;
  students?: StudentRecord[];
}

export const ClassManager: React.FC = () => {
  const { confirmDelete, confirmationDialog } = useDeleteConfirmation();
  // Teacher profile
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(() => {
    try {
      const saved = localStorage.getItem('em_teacher_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Cô Mai Hương',
      title: 'Tổ trưởng Tổ Ngoại ngữ',
      school: 'Trường THCS Vĩnh Xuân',
      email: 'maihuong.english@thcs.edu.vn',
      phone: '0988 123 456'
    };
  });

  const [operationError, setOperationError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [classes, setClasses] = useState<ClassItem[]>([]);

  // Edit Teacher Profile modal
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false);
  const [editTeacherName, setEditTeacherName] = useState(teacherProfile.name);
  const [editTeacherTitle, setEditTeacherTitle] = useState(teacherProfile.title);
  const [editTeacherSchool, setEditTeacherSchool] = useState(teacherProfile.school);
  const [editTeacherEmail, setEditTeacherEmail] = useState(teacherProfile.email);
  const [editTeacherPhone, setEditTeacherPhone] = useState(teacherProfile.phone);

  // Create/Edit Class modal
  const [showClassModal, setShowClassModal] = useState(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [className, setClassName] = useState('');
  const [classGrade, setClassGrade] = useState<number>(6);
  const [classStudentCount, setClassStudentCount] = useState<number>(0);
  const [classCode, setClassCode] = useState('');
  const [classYear, setClassYear] = useState('2026 - 2027');

  // Student roster state
  const [selectedRosterClassId, setSelectedRosterClassId] = useState<string>('cls-6a1');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showBulkAddModal, setShowBulkAddModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGender, setNewStudentGender] = useState<'male' | 'female'>('male');
  const [bulkStudentNames, setBulkStudentNames] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  // Edit student modal state
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentRoll, setEditStudentRoll] = useState<number>(1);
  const [editStudentCode, setEditStudentCode] = useState('');
  const [editStudentGender, setEditStudentGender] = useState<'male' | 'female'>('male');
  const [editStudentScore, setEditStudentScore] = useState<number>(8.0);
  const [editStudentXP, setEditStudentXP] = useState<number>(300);
  const [editStudentStreak, setEditStudentStreak] = useState<number>(3);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);

  useEffect(() => {
    fetchDB();
  }, []);

  const fetchDB = async () => {
    try {
      const res = await fetch('/api/db');
      if (!res.ok) throw new Error('Không thể tải lớp học');
      if (res.ok) {
        const data = await res.json();
        setClasses(data.classes || []);
        localStorage.setItem('em_local_classes', JSON.stringify(data.classes || []));
        if (data.classes && !data.classes.some((c: ClassItem) => c.id === selectedRosterClassId)) {
          setSelectedRosterClassId(data.classes[0]?.id || '');
        }
      }
    } catch (e) {
      console.warn('Could not fetch server db, using fallback', e);
      setOperationError('Chưa tải được danh sách lớp. Kiểm tra kết nối máy chủ.');
      try {
        const cached = JSON.parse(localStorage.getItem('em_local_classes') || '[]');
        if (Array.isArray(cached)) setClasses(cached);
      } catch {}

    }
  };

  // Add single student to selected class
  const handleAddSingleStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedRosterClassId) return;
    setIsAddingStudent(true);
    try {
      const res = await fetch(`/api/db/classes/${selectedRosterClassId}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStudentName.trim(),
          gender: newStudentGender
        })
      });
      if (res.ok) {
        await fetchDB();
        setNewStudentName('');
        setShowAddStudentModal(false);
      }
    } catch (err) {
      console.error('Error adding student:', err);
    } finally {
      setIsAddingStudent(false);
    }
  };

  // Bulk add students from textarea
  const handleBulkAddStudents = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkStudentNames.trim() || !selectedRosterClassId) return;
    setIsAddingStudent(true);
    const names = bulkStudentNames
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    try {
      const res = await fetch(`/api/db/classes/${selectedRosterClassId}/students/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ names })
      });
      if (res.ok) {
        await fetchDB();
        setBulkStudentNames('');
        setShowBulkAddModal(false);
      }
    } catch (err) {
      console.error('Error bulk adding students:', err);
    } finally {
      setIsAddingStudent(false);
    }
  };

  // Delete student from class
  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (isDeleting) return;
    const classId = classes.find(c => c.students?.some(student => student.id === studentId))?.id;
    if (!classId || !await confirmDelete(`Bạn có chắc chắn muốn xóa học sinh "${studentName}" khỏi lớp?`)) return;
    setIsDeleting(true);
    setOperationError('');
    try {
      const res = await fetch(`/api/db/classes/${classId}/students/${studentId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Không thể xóa học sinh. Vui lòng thử lại.');
      await res.json();
      await fetchDB();
    } catch {
      setOperationError('Không thể xóa học sinh. Kiểm tra kết nối máy chủ và thử lại.');
    } finally { setIsDeleting(false); }
  };

  // Open Edit Student Modal
  const handleOpenEditStudent = (student: StudentRecord) => {
    setEditingStudent(student);
    setEditStudentName(student.name);
    setEditStudentRoll(student.rollNumber);
    setEditStudentCode(student.studentCode);
    setEditStudentGender(student.gender || 'male');
    setEditStudentScore(student.averageScore || 8.0);
    setEditStudentXP(student.xp || 200);
    setEditStudentStreak(student.streak || 1);
    setShowEditStudentModal(true);
  };

  // Save Edit Student
  const handleSaveEditStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editStudentName.trim() || !selectedRosterClassId) return;
    setIsAddingStudent(true);
    try {
      const res = await fetch(`/api/db/classes/${selectedRosterClassId}/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editStudentName.trim(),
          rollNumber: Number(editStudentRoll),
          studentCode: editStudentCode.trim(),
          gender: editStudentGender,
          averageScore: Number(editStudentScore),
          xp: Number(editStudentXP),
          streak: Number(editStudentStreak)
        })
      });
      if (res.ok) {
        await fetchDB();
        setShowEditStudentModal(false);
        setEditingStudent(null);
      }
    } catch (err) {
      console.error('Error updating student:', err);
    } finally {
      setIsAddingStudent(false);
    }
  };

  // Save Teacher Profile
  const handleSaveTeacherProfile = () => {
    if (!editTeacherName.trim()) {
      alert('Vui lòng nhập họ và tên giáo viên');
      return;
    }
    const updated: TeacherProfile = {
      name: editTeacherName.trim(),
      title: editTeacherTitle.trim() || 'Giáo viên Tiếng Anh',
      school: editTeacherSchool.trim() || 'Trường THCS',
      email: editTeacherEmail.trim(),
      phone: editTeacherPhone.trim()
    };
    setTeacherProfile(updated);
    try {
      localStorage.setItem('em_teacher_profile', JSON.stringify(updated));
    } catch {}
    setShowEditTeacherModal(false);
  };

  // Open Create Class Modal
  const handleOpenCreateClass = () => {
    setEditingClassId(null);
    setClassName('');
    setClassGrade(6);
    setClassStudentCount(0);
    setClassCode(`ENG-6A${classes.length + 1}`);
    setClassYear('2026 - 2027');
    setOperationError('');
    setShowClassModal(true);
  };

  // Open Edit Class Modal
  const handleOpenEditClass = (cls: ClassItem) => {
    setEditingClassId(cls.id);
    setClassName(cls.name);
    setClassGrade(cls.grade);
    setClassStudentCount(cls.studentCount);
    setClassCode(cls.code || `ENG-${cls.grade}`);
    setClassYear(cls.academicYear || '2026 - 2027');
    setShowClassModal(true);
  };

  // Submit Create or Edit Class
  const [isSavingClass, setIsSavingClass] = useState(false);
  const handleSaveClass = async () => {
    if (isSavingClass) return;
    if (!className.trim()) { setOperationError('Vui lòng nhập tên lớp học.'); return; }
    setOperationError('');
    setIsSavingClass(true);
    try {
      const res = await fetch(editingClassId ? `/api/db/class/${editingClassId}` : '/api/db/class', {
        method: editingClassId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: className.trim(), grade: classGrade, teacher: teacherProfile.name, code: classCode.trim(), academicYear: classYear.trim() })
      });
      if (!res.ok) throw new Error('Không thể lưu lớp học');
      const data = await res.json();
      const updatedClasses = editingClassId
        ? classes.map(cls => cls.id === editingClassId ? data.class : cls)
        : [...classes, data.class];
      setClasses(updatedClasses);
      localStorage.setItem('em_local_classes', JSON.stringify(updatedClasses));
      setSelectedRosterClassId(data.class.id);
      setShowClassModal(false);
    } catch {
      setOperationError('Không thể lưu lớp học. Kiểm tra kết nối máy chủ và thử lại.');
    } finally { setIsSavingClass(false); }
  };

  // Delete Class
  const handleDeleteClass = async (id: string, name: string) => {
    if (isDeleting || !await confirmDelete(`Bạn có chắc chắn muốn xóa "${name}" và danh sách học sinh của lớp?`)) return;
    setIsDeleting(true);
    setOperationError('');
    try {
      const res = await fetch(`/api/db/class/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Không thể xóa lớp học');
      await res.json();
      await fetchDB();
    } catch {
      setOperationError('Không thể xóa lớp học. Kiểm tra kết nối máy chủ và thử lại.');
    } finally { setIsDeleting(false); }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {confirmationDialog}
      {operationError && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{operationError}</p>}
      {/* Teacher Profile Card with Edit Button */}
      <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shrink-0">
              <GraduationCap className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/40 text-emerald-100 text-2xs font-semibold">
                <span>Quản lý lớp & Học sinh</span>
                <span>•</span>
                <span>GDPT 2018</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{teacherProfile.name}</h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-100 font-medium">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {teacherProfile.title}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5" />
                  {teacherProfile.school}
                </span>
                {teacherProfile.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {teacherProfile.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setEditTeacherName(teacherProfile.name);
                setEditTeacherTitle(teacherProfile.title);
                setEditTeacherSchool(teacherProfile.school);
                setEditTeacherEmail(teacherProfile.email);
                setEditTeacherPhone(teacherProfile.phone);
                setShowEditTeacherModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs backdrop-blur-xs border border-white/30 transition-all active:scale-98"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Chỉnh sửa tên giáo viên</span>
            </button>

            <button
              onClick={handleOpenCreateClass}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-sm hover:bg-emerald-50 transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo lớp học mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Class Statistics & Management Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Danh sách các lớp học phụ trách</h3>
            <p className="text-xs text-slate-500">Tạo lớp và quản lý danh sách học sinh theo khối lớp</p>
          </div>
          <button
            onClick={handleOpenCreateClass}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm lớp</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-2xs">
                  Khối {cls.grade}
                </span>
                <span className="text-2xs text-slate-400">{cls.code || `ENG-${cls.grade}`}</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base leading-snug">{cls.name}</h4>
                <p className="text-2xs text-slate-400 mt-0.5">Năm học: {cls.academicYear || '2026 - 2027'}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                <span>
                  Sĩ số: <strong>{cls.students?.length ?? cls.studentCount} HS</strong>
                </span>
                <span className="text-emerald-700 font-medium text-2xs">{cls.teacher}</span>
              </div>

              {/* Action buttons on class card */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setSelectedRosterClassId(cls.id)}
                  className={`w-full py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                    selectedRosterClassId === cls.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Xem danh sách {cls.students?.length ?? cls.studentCount} HS</span>
                </button>

                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => handleOpenEditClass(cls)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                    title="Chỉnh sửa thông tin lớp"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={() => handleDeleteClass(cls.id, cls.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Xóa lớp học"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Student Roster Management Section */}
      {(() => {
        const activeRosterClass = classes.find((c) => c.id === selectedRosterClassId) || classes[0];
        const studentList = activeRosterClass?.students || [];
        const filteredRoster = studentList.filter((s) => {
          const q = studentSearchQuery.toLowerCase().trim();
          if (!q) return true;
          return (
            s.name.toLowerCase().includes(q) ||
            s.studentCode.toLowerCase().includes(q) ||
            String(s.rollNumber) === q
          );
        });

        const totalXP = studentList.reduce((acc, s) => acc + (s.xp || 0), 0);
        const avgScore = studentList.length > 0
          ? (studentList.reduce((acc, s) => acc + (s.averageScore || 0), 0) / studentList.length).toFixed(1)
          : '0.0';

        return (
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
                    Sổ Quản Lý Học Sinh · {activeRosterClass?.name}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Sĩ số: {studentList.length} em
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Thiết kế hỗ trợ toàn bộ học sinh trong một lớp cùng học, làm bài và lưu tiến độ cá nhân riêng biệt.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Thêm 1 học sinh</span>
                </button>
                <button
                  onClick={() => setShowBulkAddModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>📋 Nhập danh sách cả lớp (35-40 em)</span>
                </button>
              </div>
            </div>

            {/* Class switcher tabs & stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedRosterClassId(cls.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedRosterClassId === cls.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cls.name.split(' - ')[0]} ({cls.students?.length ?? cls.studentCount} HS)
                  </button>
                ))}
              </div>

              {/* Class summary stats */}
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200/60 font-semibold text-amber-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Điểm TB lớp: {avgScore}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200/60 font-semibold text-indigo-800 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tổng XP: {totalXP.toLocaleString()} XP</span>
                </div>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm học sinh theo họ tên hoặc số thứ tự..."
                value={studentSearchQuery}
                onChange={(e) => setStudentSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-3 w-12 text-center">STT</th>
                    <th className="py-3 px-3">Mã HS</th>
                    <th className="py-3 px-3">Họ và tên</th>
                    <th className="py-3 px-3">Giới tính</th>
                    <th className="py-3 px-3">Kinh nghiệm</th>
                    <th className="py-3 px-3">Chuỗi học</th>
                    <th className="py-3 px-3">Điểm TB</th>
                    <th className="py-3 px-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRoster.map((student) => {
                    return (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 text-center font-bold text-slate-700">
                          {student.rollNumber}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                          {student.studentCode}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={student.avatar || (student.gender === 'female'
                                ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
                                : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')}
                              alt={student.name}
                              className="w-7 h-7 rounded-lg object-cover border border-slate-200"
                            />
                            <span className="font-bold text-slate-900">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {student.gender === 'female' ? 'Nữ 👧' : 'Nam 👦'}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="flex items-center gap-1 font-semibold text-indigo-700">
                            <Zap className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                            {student.xp} XP (Lv {student.level})
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="flex items-center gap-1 text-amber-700 font-medium">
                            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {student.streak} ngày
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                            {student.averageScore > 0 ? student.averageScore : '—'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleOpenEditStudent(student)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                              title="Chỉnh sửa thông tin học sinh"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={isDeleting}
                              onClick={() => handleDeleteStudent(student.id, student.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Xóa học sinh khỏi lớp"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredRoster.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                        Không có học sinh nào trong lớp khớp với tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* Edit Teacher Modal */}
      {showEditTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Chỉnh sửa thông tin giáo viên</h3>
                <p className="text-xs text-slate-500">Cập nhật họ tên và chức danh hiển thị trên hệ thống</p>
              </div>
              <button
                onClick={() => setShowEditTeacherModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên giáo viên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={editTeacherName}
                  onChange={(e) => setEditTeacherName(e.target.value)}
                  placeholder="VD: Cô Mai Hương, Thầy Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chức danh / Vị trí chuyên môn
                </label>
                <input
                  type="text"
                  value={editTeacherTitle}
                  onChange={(e) => setEditTeacherTitle(e.target.value)}
                  placeholder="VD: Giáo viên Tiếng Anh, Tổ trưởng Ngoại ngữ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trường THCS đang công tác
                </label>
                <input
                  type="text"
                  value={editTeacherSchool}
                  onChange={(e) => setEditTeacherSchool(e.target.value)}
                  placeholder="VD: THCS Chu Văn An - Hà Nội"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-semibold text-slate-600 mb-1">Email liên hệ</label>
                  <input
                    type="email"
                    value={editTeacherEmail}
                    onChange={(e) => setEditTeacherEmail(e.target.value)}
                    placeholder="email@thcs.edu.vn"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <div>
                  <label className="block text-2xs font-semibold text-slate-600 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={editTeacherPhone}
                    onChange={(e) => setEditTeacherPhone(e.target.value)}
                    placeholder="0988 xxx xxx"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowEditTeacherModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSaveTeacherProfile}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Class Modal */}
      {showClassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {editingClassId ? 'Chỉnh sửa thông tin lớp học' : 'Tạo lớp học mới'}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingClassId ? 'Cập nhật tên và thông số lớp học' : 'Thêm lớp học vào danh sách phụ trách'}
                </p>
              </div>
              <button
                onClick={() => setShowClassModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên lớp học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="VD: Lớp 6A3 - Global Success, Lớp 8B2..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-semibold text-slate-600 mb-1">Khối lớp (THCS)</label>
                  <select
                    value={classGrade}
                    onChange={(e) => setClassGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value={6}>Lớp 6</option>
                    <option value={7}>Lớp 7</option>
                    <option value={8}>Lớp 8</option>
                    <option value={9}>Lớp 9</option>
                  </select>
                </div>

                <div>
                  <label className="block text-2xs font-semibold text-slate-600 mb-1">Sĩ số hiện tại</label>
                  <input
                    type="number"
                    readOnly
                    value={classStudentCount}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-2xs font-semibold text-slate-600 mb-1">Mã lớp / Phòng học</label>
                  <input
                    type="text"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    placeholder="ENG-6A3"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-semibold text-slate-600 mb-1">Năm học</label>
                  <input
                    type="text"
                    value={classYear}
                    onChange={(e) => setClassYear(e.target.value)}
                    placeholder="2026 - 2027"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500">Sĩ số được tính theo danh sách học sinh. Sau khi tạo lớp, dùng Thêm học sinh hoặc Nhập danh sách cả lớp.</p>
            {operationError && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs text-rose-700">{operationError}</p>}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClassModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Hủy bỏ
              </button>
              <button
                disabled={isSavingClass}
                onClick={handleSaveClass}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors"
              >
                {isSavingClass ? 'Đang lưu...' : editingClassId ? 'Cập nhật lớp' : 'Tạo lớp ngay'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Single Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                Thêm học sinh mới vào lớp
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSingleStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên học sinh *
                </label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="VD: Dương Hữu Quy, Lê Minh Khang..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Giới tính:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewStudentGender('male')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      newStudentGender === 'male'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
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
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Nữ 👧
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isAddingStudent || !newStudentName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs disabled:opacity-50"
                >
                  {isAddingStudent ? 'Đang thêm...' : 'Lưu học sinh'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Add Students Modal */}
      {showBulkAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Nhập danh sách học sinh cả lớp (35–40 em)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dán danh sách họ và tên học sinh (mỗi học sinh một dòng)
                </p>
              </div>
              <button
                onClick={() => setShowBulkAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBulkAddStudents} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Danh sách họ và tên:
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    Đã nhập: {bulkStudentNames.split('\n').filter((n) => n.trim()).length} học sinh
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={bulkStudentNames}
                  onChange={(e) => setBulkStudentNames(e.target.value)}
                  placeholder={`1. Dương Hữu Quy\n2. Trần Thị Bảo Ngọc\n3. Lê Minh Khang\n4. Hoàng Gia Huy\n5. Nguyễn Thảo Linh\n...`}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  💡 Có thể giữ nguyên số thứ tự (1., 2.) hoặc chỉ dán tên. Hệ thống sẽ tự động tách số thứ tự, gán mã học sinh và tạo tài khoản học riêng.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBulkAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isAddingStudent || !bulkStudentNames.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs disabled:opacity-50"
                >
                  {isAddingStudent ? 'Đang nhập...' : 'Nhập vào danh sách lớp'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditStudentModal && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Chỉnh sửa thông tin học sinh
                </h3>
                <p className="text-xs text-slate-500">
                  {editingStudent.className || 'Lớp học'} · Mã HS: {editingStudent.studentCode}
                </p>
              </div>
              <button
                onClick={() => setShowEditStudentModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên học sinh *
                </label>
                <input
                  type="text"
                  required
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số thứ tự (STT):
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editStudentRoll}
                    onChange={(e) => setEditStudentRoll(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mã học sinh:
                  </label>
                  <input
                    type="text"
                    value={editStudentCode}
                    onChange={(e) => setEditStudentCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Giới tính:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditStudentGender('male')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      editStudentGender === 'male'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Nam 👦
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditStudentGender('female')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      editStudentGender === 'female'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    Nữ 👧
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm TB:
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    max={10}
                    value={editStudentScore}
                    onChange={(e) => setEditStudentScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm XP:
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editStudentXP}
                    onChange={(e) => setEditStudentXP(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chuỗi ngày:
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editStudentStreak}
                    onChange={(e) => setEditStudentStreak(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditStudentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isAddingStudent || !editStudentName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs disabled:opacity-50"
                >
                  {isAddingStudent ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
