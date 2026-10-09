import React from 'react';
import {
  LayoutDashboard,
  Headphones,
  Mic,
  BookOpen,
  PenTool,
  Bookmark,
  Layers,
  HelpCircle,
  Trophy,
  Map,
  Users,
  Settings
} from 'lucide-react';
import { Role } from '../../types';

export type NavTab =
  | 'dashboard'
  | 'roadmap'
  | 'listening'
  | 'reading'
  | 'writing'
  | 'vocabulary'
  | 'grammar'
  | 'quiz'
  | 'question_manager'
  | 'class_manager'
  | 'unit_manager';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  role: Role;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  role
}) => {
  const studentNavItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Lộ trình bài học', icon: Map },
    { id: 'listening', label: 'Luyện Nghe (Listening)', icon: Headphones },
    { id: 'reading', label: 'Luyện Đọc (Reading)', icon: BookOpen },
    { id: 'writing', label: 'Luyện Viết (Writing)', icon: PenTool },
    { id: 'vocabulary', label: 'Từ vựng & Thẻ nhớ', icon: Bookmark },
    { id: 'grammar', label: 'Ngữ pháp (Grammar)', icon: Layers },
    { id: 'quiz', label: 'Trắc nghiệm & Thi thử', icon: HelpCircle },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200 shrink-0 p-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Kỹ năng & Học tập
          </div>
          <nav className="space-y-1">
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as NavTab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dedicated role-based quick views */}
        {role === 'teacher' && <button onClick={() => onTabChange('unit_manager')} className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${currentTab === 'unit_manager' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}>
          <Layers className="h-4 w-4" /><span>Tạo Unit & Chủ đề</span>
        </button>}
        {role === 'teacher' && <button onClick={() => onTabChange('class_manager')} className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${currentTab === 'class_manager' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
          <Users className="h-4 w-4" /><span>Quản lý lớp & Học sinh</span>
        </button>}
        {role === 'teacher' && <button onClick={() => onTabChange('question_manager')} className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium ${currentTab === 'question_manager' ? 'bg-purple-50 text-purple-700' : 'text-slate-600 hover:bg-slate-50'}`}>
          <Settings className="h-4 w-4" /><span>Soạn câu hỏi & Học liệu</span>
        </button>}


      </aside>

      {role === 'teacher' && <div className="lg:hidden fixed bottom-16 right-4 z-40 flex gap-2">
        <button onClick={() => onTabChange('unit_manager')} className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-lg">Unit</button>
        <button onClick={() => onTabChange('class_manager')} className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-lg">Quản lý lớp</button>
        <button onClick={() => onTabChange('question_manager')} className="rounded-xl bg-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-lg">Soạn câu hỏi</button>
      </div>}
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center py-1 px-2 text-2xs ${
            currentTab === 'dashboard' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Trang chủ</span>
        </button>
        <button
          onClick={() => onTabChange('listening')}
          className={`flex flex-col items-center py-1 px-2 text-2xs ${
            currentTab === 'listening' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <Headphones className="w-5 h-5" />
          <span>Nghe</span>
        </button>
        <button
          onClick={() => onTabChange('reading')}
          className={`flex flex-col items-center py-1 px-2 text-2xs ${
            currentTab === 'reading' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Đọc</span>
        </button>
        <button
          onClick={() => onTabChange('quiz')}
          className={`flex flex-col items-center py-1 px-2 text-2xs ${
            currentTab === 'quiz' ? 'text-indigo-600 font-semibold' : 'text-slate-500'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span>Thi thử</span>
        </button>
      </div>
    </>
  );
};
