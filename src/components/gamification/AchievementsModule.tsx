import React from 'react';
import {
  Trophy,
  Award,
  Flame,
  Zap,
  Star,
  CheckCircle2,
  Lock,
  Sparkles,
  Users
} from 'lucide-react';
import { UserProfile } from '../../types';

interface AchievementsModuleProps {
  userProfile: UserProfile;
}

export const AchievementsModule: React.FC<AchievementsModuleProps> = ({ userProfile }) => {
  const badges = [
    {
      id: 1,
      name: 'Khởi Đầu Hoàn Hảo',
      desc: 'Hoàn thành bài học đầu tiên trên hệ thống',
      unlocked: true,
      icon: '🌱',
      date: 'Đã nhận'
    },
    {
      id: 2,
      name: 'Chiến Binh 5 Ngày',
      desc: 'Duy trì chuỗi học tập 5 ngày liên tiếp',
      unlocked: true,
      icon: '🔥',
      date: 'Đã nhận'
    },
    {
      id: 3,
      name: 'Chuyên Gia Luyện Nghe',
      desc: 'Đạt điểm tối đa bài nghe và hoàn thành chép chính tả',
      unlocked: true,
      icon: '🎧',
      date: 'Đã nhận'
    },
    {
      id: 4,
      name: 'Nhà Hùng Biện Nhí',
      desc: 'Ghi âm phát âm đạt chính xác trên 85%',
      unlocked: true,
      icon: '🎤',
      date: 'Đã nhận'
    },
    {
      id: 5,
      name: 'Vua Từ Vựng THCS',
      desc: 'Thuộc và ghi nhớ 50 thẻ từ vựng với SRS',
      unlocked: false,
      icon: '📚',
      date: 'Cần thêm 18 từ'
    },
    {
      id: 6,
      name: 'Thần Tốc 45 Giây',
      desc: 'Hoàn thành thử thách ghép cặp từ vựng trước 30 giây',
      unlocked: false,
      icon: '⚡',
      date: 'Chưa mở khóa'
    },
    {
      id: 7,
      name: 'Cây Bút Trẻ Xuất Sắc',
      desc: 'Được Giáo viên và AI chấm trên 9.0 điểm bài viết',
      unlocked: false,
      icon: '✍️',
      date: 'Chưa mở khóa'
    },
    {
      id: 8,
      name: 'Chiến Thần Đề Thi',
      desc: 'Đạt 100% điểm bài thi thử 45 phút giữa kỳ',
      unlocked: false,
      icon: '🏆',
      date: 'Chưa mở khóa'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Lê Hoàng Nam', school: 'THCS Giảng Võ', xp: 920, streak: 12, avatar: '🧑‍🎓' },
    { rank: 2, name: 'Trần Bảo Ngọc', school: 'THCS Cầu Giấy', xp: 840, streak: 9, avatar: '👩‍🎓' },
    { rank: 3, name: userProfile.name + ' (Bạn)', school: 'THCS Vĩnh Xuân', xp: userProfile.xp, streak: userProfile.streak, avatar: '⭐' },
    { rank: 4, name: 'Phạm Đức Minh', school: 'THCS Nguyễn Du', xp: 410, streak: 4, avatar: '🧑‍💻' },
    { rank: 5, name: 'Nguyễn Thảo Nguyên', school: 'THCS Lê Quý Đôn', xp: 390, streak: 3, avatar: '👧' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <span>Gamification & Đua top lành mạnh</span>
            <span aria-hidden="true">·</span>
            <span>Không gây áp lực</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Huy Hiệu & Bảng Xếp Hạng Tuần
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Hạng 3 Tuần Này</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Badges Collection (Col 1-2) */}
        <div className="lg:col-span-2 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Bộ sưu tập huy hiệu</h3>
              <p className="text-xs text-slate-500">Mở khóa khi đạt các cột mốc rèn luyện</p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {badges.filter((b) => b.unlocked).length} / {badges.length} Đã mở
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  b.unlocked
                    ? 'bg-amber-50/40 border-amber-200/80 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200 opacity-60'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-2xl shadow-2xs shrink-0">
                  {b.icon}
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{b.name}</h4>
                    {b.unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{b.desc}</p>
                  <span className="text-2xs font-semibold text-slate-400 block pt-1">
                    {b.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Leaderboard (Col 3) */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Bảng Vàng Học Tập</h3>
              <p className="text-xs text-slate-500">Cập nhật mỗi Chủ Nhật</p>
            </div>
            <Users className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {leaderboard.map((item) => (
              <div
                key={item.rank}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                  item.rank === 3
                    ? 'bg-indigo-50/70 border-indigo-200 ring-2 ring-indigo-500/10'
                    : 'bg-slate-50/60 border-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 text-center font-extrabold text-sm ${
                      item.rank === 1
                        ? 'text-amber-500'
                        : item.rank === 2
                        ? 'text-slate-400'
                        : item.rank === 3
                        ? 'text-amber-700'
                        : 'text-slate-500'
                    }`}
                  >
                    #{item.rank}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                    <span className="text-2xs text-slate-400">{item.school}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-xs text-indigo-700">{item.xp} XP</div>
                  <span className="text-2xs text-amber-600 font-semibold">{item.streak} ngày 🔥</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
