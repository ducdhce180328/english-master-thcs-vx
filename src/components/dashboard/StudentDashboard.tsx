import React from 'react';
import {
  Flame,
  Zap,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Headphones,
  Mic,
  BookOpen,
  PenTool,
  Bookmark,
  Layers,
  Sparkles,
  Award,
  Users,
  GraduationCap,
  UserCheck
} from 'lucide-react';
import { GradeLevel, UserProfile, UnitModule } from '../../types';
import { NavTab } from '../layout/Sidebar';

interface StudentDashboardProps {
  userProfile: UserProfile;
  activeGrade: GradeLevel;
  currentUnit: UnitModule;
  onNavigate: (tab: NavTab) => void;
  onOpenStudentSelector?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  userProfile,
  activeGrade,
  currentUnit,
  onNavigate,
  onOpenStudentSelector
}) => {
  const dailyMissions = [
    { id: 1, title: 'Học 5 từ vựng mới Unit ' + currentUnit.unitNumber, completed: true, reward: '+20 XP', tab: 'vocabulary' },
    { id: 2, title: 'Hoàn thành 1 bài Luyện nghe', completed: false, reward: '+30 XP', tab: 'listening' },
    { id: 3, title: 'Hoàn thành bài đọc hiểu', completed: false, reward: '+30 XP', tab: 'reading' },
    { id: 4, title: 'Làm bài kiểm tra trắc nghiệm 10 câu', completed: false, reward: '+50 XP', tab: 'quiz' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 shadow-lg shadow-indigo-200">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
            <span>Chương trình GDPT 2018</span>
            <span aria-hidden="true">·</span>
            <span>Tiếng Anh Lớp {activeGrade}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Chào mừng trở lại, {userProfile.name}! 👋
          </h1>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Hôm nay bạn đang theo học <strong>{currentUnit.title}</strong>. Lựa chọn kỹ năng và hoàn thành các bài tập của Unit nhé!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('roadmap')}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 shadow-sm transition-all active:scale-98 flex items-center gap-2"
            >
              <span>Vào bài học hôm nay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Class & Student Roster Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                {userProfile.className || `Lớp ${activeGrade}A1`}
              </span>
              <span className="text-xs text-slate-500">
                STT: <strong className="text-slate-800">{userProfile.rollNumber || '01'}</strong> · Mã HS: <strong className="text-slate-800">{userProfile.studentCode || 'HS-601'}</strong>
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1.5 flex-wrap">
              <span>Học sinh: {userProfile.name}</span>
              <span className="text-xs font-normal text-emerald-600 font-medium">✓ Tất cả các học sinh của lớp đều học và lưu tiến độ riêng</span>
            </div>
          </div>
        </div>

        {onOpenStudentSelector && (
          <button
            onClick={onOpenStudentSelector}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Users className="w-4 h-4" />
            <span>Đổi học sinh trong lớp / Chuyển lớp</span>
          </button>
        )}
      </div>

      {/* Stats summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Chuỗi học tập</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{userProfile.streak} ngày</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Đang hoạt động 🔥</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Kinh nghiệm</span>
            <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{userProfile.xp} XP</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Cấp độ {userProfile.level}</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
            <span>Thời gian học</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{userProfile.studyTimeMinutes} phút</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Trong tuần này</div>
        </div>
      </div>

      {/* Main Grid: 4 Core Skills + Today's Missions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: 4 Kỹ Năng & Luyện Tập */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Kỹ năng & Bài tập</h2>
            <span className="text-xs text-slate-500">Chuẩn đầu ra GDPT 2018</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Listening */}
            <div
              onClick={() => onNavigate('listening')}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Headphones className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                  Tiến độ: 75%
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Luyện Nghe (Listening)
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Giọng Anh-Anh & Anh-Mỹ chuẩn, tốc độ 0.75x–1.25x, chép chính tả & tra từ transcript.
                </p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            {/* Reading */}
            <div
              onClick={() => onNavigate('reading')}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Tiến độ: 85%
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Luyện Đọc (Reading)
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Đoạn văn 150-300 từ, bấm vào từ bất kỳ để tra nghĩa & lưu thẻ nhớ, dẫn chứng đáp án.
                </p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Writing */}
            <div
              onClick={() => onNavigate('writing')}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PenTool className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  Tiến độ: 70%
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Luyện Viết (Writing)
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Dàn ý gợi ý, bài mẫu, AI nhận xét 4 tiêu chí & sửa lỗi trước - sau khi nộp cho giáo viên.
                </p>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>

          {/* Vocabulary & Grammar Quick Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div
              onClick={() => onNavigate('vocabulary')}
              className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white text-indigo-600 shadow-2xs">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Từ vựng & Thẻ nhớ SRS</h4>
                  <p className="text-xs text-slate-500">Lặp lại ngắt quãng & Mini-games</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-500" />
            </div>

            <div
              onClick={() => onNavigate('grammar')}
              className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 hover:border-purple-200 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white text-purple-600 shadow-2xs">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Ngữ pháp THCS</h4>
                  <p className="text-xs text-slate-500">Công thức, dấu hiệu & lỗi học sinh Việt</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Right Col: Today's Missions & Study Streak */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Nhiệm vụ hôm nay</h3>
              <span className="text-xs font-semibold text-indigo-600">1/4 Hoàn thành</span>
            </div>

            <div className="space-y-3">
              {dailyMissions.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onNavigate(m.tab as NavTab)}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  {m.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium ${
                        m.completed ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {m.title}
                    </p>
                    <span className="text-2xs font-semibold text-amber-600">{m.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly progress chart representation */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Tiến độ tuần này</h3>
              <span className="text-xs text-slate-500">Mục tiêu: 120 phút</span>
            </div>

            <div className="flex items-end justify-between h-28 pt-4 pb-2 px-1">
              {[
                { day: 'T2', height: '60%', active: true },
                { day: 'T3', height: '40%', active: true },
                { day: 'T4', height: '85%', active: true },
                { day: 'T5', height: '100%', active: true },
                { day: 'T6', height: '70%', active: true },
                { day: 'T7', height: '20%', active: false },
                { day: 'CN', height: '0%', active: false }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-7 bg-slate-100 rounded-t-md h-20 flex items-end justify-center overflow-hidden">
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        bar.active ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                      style={{ height: bar.height }}
                    />
                  </div>
                  <span className="text-2xs font-medium text-slate-500">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
