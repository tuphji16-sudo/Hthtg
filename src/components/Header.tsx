import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Ghost, 
  Search, 
  Bell, 
  MessageSquareLock, 
  SlidersHorizontal,
  Lock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  currentUser: User;
  ghostMode: boolean;
  onToggleGhostMode: () => void;
  onOpenPrivacyCenter: () => void;
  onOpenMessenger: () => void;
  onOpenProfile: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  unreadMessagesCount: number;
  onOpenProModal?: () => void;
  onOpenAPKModal?: () => void;
  onLockBiometric?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  ghostMode,
  onToggleGhostMode,
  onOpenPrivacyCenter,
  onOpenMessenger,
  onOpenProfile,
  searchQuery,
  onSearchChange,
  unreadMessagesCount,
  onOpenProModal,
  onOpenAPKModal,
  onLockBiometric,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 'n1', title: 'تم تفعيل التشفير التلقائي', desc: 'تم تحديث مفاتيح الجلسة المحلية بنجاح.', time: 'الآن', icon: Lock },
    { id: 'n2', title: 'حظر محاولة تتبع', desc: 'تم حجب طلب تتبع إعلاني خارجي تلقائياً.', time: 'منذ 5 د', icon: ShieldCheck },
    { id: 'n3', title: 'تفاعل جديد من سارة', desc: 'أضافت درع الحماية لمنشورك الأخير.', time: 'منذ 20 د', icon: Sparkles },
  ]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d1117]/95 backdrop-blur-md border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            title="منصة أثير - تواصل حر وفائق السرعة"
          >
            {/* Custom Unique Logo: Geometric Shield & Orbit */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0a0d12] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-60"></div>
                <div className="relative flex items-center justify-center">
                  <span className="text-emerald-400 font-extrabold text-xl tracking-tighter">أ</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  أثـيـر
                </span>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400/90 uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Aura
                </span>
              </div>
              <span className="hidden sm:inline-block text-[11px] text-neutral-400 font-medium">
                شبكة حرة • صفر تتبع • سرعة فائقة
              </span>
            </div>
          </div>
        </div>

        {/* Instant Search Bar (with zero-history guarantee) */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
              <Search className="w-4 h-4 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="بحث آمن في التايملاين (بدون تسجيل سجل البحث)..."
              className="w-full pl-9 pr-9 py-2 text-sm bg-neutral-900/90 hover:bg-neutral-900 focus:bg-neutral-950 border border-neutral-800 focus:border-emerald-500/60 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none transition-all duration-200"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-neutral-500 hover:text-neutral-300"
              >
                مسح
              </button>
            )}
            {!searchQuery && (
              <div className="absolute inset-y-0 left-0 pl-2.5 hidden md:flex items-center pointer-events-none">
                <span className="text-[10px] text-emerald-400/80 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                  مشفر
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Icons & Status Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Ghost Mode Toggle */}
          <button
            onClick={onToggleGhostMode}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
              ghostMode
                ? 'bg-purple-950/70 border-purple-500/50 text-purple-200 shadow-sm shadow-purple-500/30'
                : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
            }`}
            title={ghostMode ? 'وضع الشبح نشط: نشاطك مخفي كلياً' : 'تفعيل وضع الشبح'}
          >
            <Ghost className={`w-4 h-4 ${ghostMode ? 'text-purple-400 animate-bounce' : 'text-neutral-400'}`} />
            <span className="hidden lg:inline text-xs">
              {ghostMode ? 'وضع الشبح 👻' : 'تصفح كشبح'}
            </span>
            {ghostMode && (
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping absolute -top-1 -right-1"></span>
            )}
          </button>

          {/* Privacy & Speed Center Button */}
          <button
            onClick={onOpenPrivacyCenter}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-500/60 transition-all duration-200 shadow-sm shadow-emerald-950"
            title="مركز الخصوصية والأداء اللحظي"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline font-mono text-[11px] text-emerald-300">
              درع الأمان
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400/80 font-mono bg-emerald-900/60 px-1 rounded">
              <Zap className="w-2.5 h-2.5" /> 1.2ms
            </span>
          </button>

          {/* Encrypted Messenger Drawer Button */}
          <button
            onClick={onOpenMessenger}
            className="relative p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
            title="الرسائل المشفرة طرف لطرف"
          >
            <MessageSquareLock className="w-4 h-4 text-neutral-300" />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="الإشعارات المشفرة"
            >
              <Bell className="w-4 h-4 text-neutral-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-[#12161f] border border-neutral-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-neutral-200">تنبيهات النظام الآمن</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">بدون تتبع خارجي</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div key={n.id} className="p-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/60 transition-colors flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-neutral-800 text-emerald-400 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-xs font-semibold text-neutral-200 truncate">{n.title}</p>
                          <p className="text-[11px] text-neutral-400 leading-snug">{n.desc}</p>
                          <span className="text-[9px] text-neutral-500 font-mono mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Ghost Avatar */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-neutral-800/80 transition-all border border-transparent hover:border-neutral-800"
            title="الملف الشخصي"
          >
            {ghostMode ? (
              <div className="w-8 h-8 rounded-lg bg-purple-900/70 border border-purple-500/50 flex items-center justify-center text-purple-300">
                <Ghost className="w-4 h-4" />
              </div>
            ) : (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-emerald-500/40"
              />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
