import React from 'react';
import { 
  Home, 
  Users, 
  Bookmark, 
  MessageSquareLock, 
  ShieldAlert, 
  UserCheck, 
  Ghost, 
  Flame, 
  Key, 
  Lock, 
  CameraOff,
  Trash2,
  Smartphone,
  Sparkles,
  Download,
  ShieldCheck
} from 'lucide-react';
import { User } from '../types';

interface SidebarLeftProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUser: User;
  ghostMode: boolean;
  onToggleGhostMode: () => void;
  autoStripExif: boolean;
  onToggleAutoStripExif: () => void;
  onPanicPurge: () => void;
  bookmarkedCount: number;
  onOpenProModal?: () => void;
  onOpenAPKModal?: () => void;
  onOpenPermissionsModal?: () => void;
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  ghostMode,
  onToggleGhostMode,
  autoStripExif,
  onToggleAutoStripExif,
  onPanicPurge,
  bookmarkedCount,
  onOpenProModal,
  onOpenAPKModal,
  onOpenPermissionsModal,
}) => {
  const navItems = [
    { id: 'feed', label: 'الخلاصة المباشرة', icon: Home, badge: 'زمنية' },
    { id: 'circles', label: 'الدوائر والمجتمعات', icon: Users, badge: 'حرة' },
    { id: 'bookmarks', label: 'الخزنة المحفوظة', icon: Bookmark, count: bookmarkedCount },
    { id: 'messages', label: 'الرسائل المشفرة', icon: MessageSquareLock, badge: 'E2EE' },
    { id: 'privacy', label: 'خزنة الخصوصية والأداء', icon: ShieldAlert, highlight: true },
    { id: 'profile', label: 'الملف الشخصي والمفاتيح', icon: UserCheck },
  ];

  return (
    <aside className="w-full space-y-4">
      
      {/* Identity & Encryption Status Card */}
      <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            {ghostMode ? (
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/60 flex items-center justify-center text-purple-300">
                <Ghost className="w-6 h-6 animate-pulse" />
              </div>
            ) : (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-500/40"
              />
            )}
            <div className={`absolute -bottom-1 -left-1 w-4 h-4 rounded-full border-2 border-neutral-900 flex items-center justify-center ${
              ghostMode ? 'bg-purple-500' : 'bg-emerald-500'
            }`}>
              <Lock className="w-2.5 h-2.5 text-black" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate flex items-center gap-1.5">
              {ghostMode ? 'مستخدم مجهول (شبح)' : currentUser.name}
            </h3>
            <p className="text-xs text-neutral-400 font-mono truncate">
              {ghostMode ? '@ghost_mode_active' : currentUser.handle}
            </p>
          </div>
        </div>

        {/* Cryptographic Badge */}
        <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800/60 text-xs flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <Key className="w-3.5 h-3.5" />
            <span>بصمة التشفير:</span>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono truncate max-w-[110px]" title={currentUser.publicFingerprint}>
            {currentUser.publicFingerprint}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/60">
          <span>درجة الخصوصية:</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            100% مشفر بالكامل
          </span>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="p-2 rounded-2xl bg-neutral-900/50 border border-neutral-800/70 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-right ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {item.badge}
                </span>
              )}

              {typeof item.count === 'number' && item.count > 0 && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500 text-black font-bold">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Security & Privacy Controls */}
      <div className="p-3.5 rounded-2xl bg-neutral-900/50 border border-neutral-800/70 space-y-3">
        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-emerald-400" />
          تحكم الخصوصية الفوري
        </h4>

        {/* Ghost Mode Toggle */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/50">
          <div className="flex items-center gap-2">
            <Ghost className={`w-4 h-4 ${ghostMode ? 'text-purple-400' : 'text-neutral-500'}`} />
            <div className="text-right">
              <span className="text-xs font-semibold text-neutral-200 block">وضع الشبح</span>
              <span className="text-[10px] text-neutral-500 block">لا تسجيل للظهور أو الهوية</span>
            </div>
          </div>
          <button
            onClick={onToggleGhostMode}
            className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
              ghostMode ? 'bg-purple-600' : 'bg-neutral-800'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              ghostMode ? '-translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Auto EXIF Stripping Toggle */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/50">
          <div className="flex items-center gap-2">
            <CameraOff className={`w-4 h-4 ${autoStripExif ? 'text-emerald-400' : 'text-neutral-500'}`} />
            <div className="text-right">
              <span className="text-xs font-semibold text-neutral-200 block">نزع بيانات EXIF</span>
              <span className="text-[10px] text-neutral-500 block">حذف GPS ومعلومات الكاميرا</span>
            </div>
          </div>
          <button
            onClick={onToggleAutoStripExif}
            className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
              autoStripExif ? 'bg-emerald-600' : 'bg-neutral-800'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              autoStripExif ? '-translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Panic / Emergency Zero-Footprint Button */}
        <button
          onClick={onPanicPurge}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-semibold transition-all group"
          title="مسح فوري لجميع البيانات والذاكرة المؤقتة وإغلاق الجلسة دون ترك أثر"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-400 group-hover:animate-bounce" />
          <span>مسح الأثر الفوري (Zero-Trace)</span>
        </button>
      </div>

      {/* Android Native Pro Card */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-500/30 text-right space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] bg-emerald-500 text-black font-extrabold px-1.5 py-0.2 rounded">PRO UNLOCKED</span>
          <div className="flex items-center gap-1 text-xs font-bold text-white">
            <span>أندرويد برو VIP</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 leading-snug">
          كافة مزايا نظام أندرويد مفتوحة: تشفير Kyber، شبكة Mesh، قفل البصمة، وتمويه الأيقونة.
        </p>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={onOpenProModal}
            className="py-1.5 px-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] text-center transition-colors cursor-pointer"
          >
            الميزات المفتوحة
          </button>
          <button
            onClick={onOpenAPKModal}
            className="py-1.5 px-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-[11px] text-center border border-neutral-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3 text-emerald-400" />
            <span>تنزيل APK</span>
          </button>
        </div>

        {onOpenPermissionsModal && (
          <button
            onClick={onOpenPermissionsModal}
            className="w-full text-center text-[10px] text-neutral-400 hover:text-emerald-300 underline pt-0.5 cursor-pointer"
          >
            إدارة أذونات أندرويد (الكاميرا / البصمة)
          </button>
        )}
      </div>

      {/* Speed & Clean Architecture Note */}
      <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-950/20 to-neutral-900 border border-emerald-500/20 text-center">
        <p className="text-[11px] text-emerald-300 font-medium">
          🚀 لا خوارزميات إدمانية • لا إعلانات • سرعة كود أصلية
        </p>
      </div>

    </aside>
  );
};
