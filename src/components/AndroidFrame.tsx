import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  BatteryMedium, 
  Signal, 
  Smartphone, 
  Monitor, 
  Lock, 
  Sparkles, 
  Download, 
  ShieldCheck,
  ChevronLeft,
  Circle,
  Square,
  GitBranch
} from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  onLockScreen: () => void;
  onOpenProModal: () => void;
  onOpenAPKModal: () => void;
  onOpenGitHubModal?: () => void;
  quantumEnabled?: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  onLockScreen,
  onOpenProModal,
  onOpenAPKModal,
  onOpenGitHubModal,
  quantumEnabled = true,
}) => {
  const [deviceMode, setDeviceMode] = useState<'phone' | 'full'>('phone');
  const [currentTime, setCurrentTime] = useState('');
  const [navStyle, setNavStyle] = useState<'gesture' | 'buttons'>('gesture');

  // Live Android Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090d] text-neutral-100 flex flex-col items-center justify-start py-0 sm:py-3 transition-colors">
      
      {/* Top Android Platform Switcher Bar (Desktop & Tablet Helpers) */}
      <header className="w-full max-w-5xl px-3 py-2 flex items-center justify-between gap-2 text-xs border-b border-neutral-900 mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>نظام أثير أندرويد v2.5 (Pro Unlocked)</span>
          </div>

          <button
            onClick={() => {
              triggerHaptic();
              onOpenProModal();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold hover:brightness-110 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>جميع الميزات مفتوحة 💎</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              triggerHaptic();
              onOpenAPKModal();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">تثبيت APK</span>
          </button>

          {onOpenGitHubModal && (
            <button
              onClick={() => {
                triggerHaptic();
                onOpenGitHubModal();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#24292e] hover:bg-[#2f363d] text-white border border-neutral-700 transition-colors cursor-pointer"
              title="تصدير ومزامنة GitHub التلقائية"
            >
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">تلقائي على GitHub</span>
            </button>
          )}

          <button
            onClick={() => {
              triggerHaptic();
              onLockScreen();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors cursor-pointer"
            title="قفل التطبيق بالبصمة"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">قفل الشاشة</span>
          </button>

          {/* Toggle Device Frame / Full Window */}
          <div className="flex items-center bg-neutral-900 p-0.5 rounded-xl border border-neutral-800">
            <button
              onClick={() => {
                triggerHaptic();
                setDeviceMode('phone');
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                deviceMode === 'phone'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="هاتف أندرويد"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">هاتف</span>
            </button>
            <button
              onClick={() => {
                triggerHaptic();
                setDeviceMode('full');
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                deviceMode === 'full'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="ملء الشاشة"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">شامل</span>
            </button>
          </div>
        </div>
      </header>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceMode === 'phone'
            ? 'max-w-[430px] rounded-[48px] border-[10px] border-[#1e232d] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.12)] ring-1 ring-neutral-700/50 relative overflow-hidden bg-[#0c0f14]'
            : 'max-w-full bg-[#0c0f14]'
        }`}
      >
        
        {/* Android Status Bar (Native Style) */}
        <div className="w-full bg-[#0c0f14]/95 backdrop-blur-md px-5 pt-2.5 pb-1 flex items-center justify-between text-[11px] text-neutral-300 select-none z-30 sticky top-0 border-b border-neutral-800/40">
          
          {/* Clock & Notification icons */}
          <div className="flex items-center gap-2 font-semibold">
            <span className="font-mono tracking-tight text-white">{currentTime || '09:41'}</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-mono">5G+</span>
            </div>
            {quantumEnabled && (
              <span className="text-[9px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded border border-purple-800/50">
                Kyber🔒
              </span>
            )}
          </div>

          {/* Android Punch-hole Camera Lens (Centered in Phone Mode) */}
          {deviceMode === 'phone' && (
            <div className="w-4 h-4 rounded-full bg-black border-2 border-neutral-800 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-[#06151f]/90" />
            </div>
          )}

          {/* System status icons (Wi-Fi, Cellular, Battery) */}
          <div className="flex items-center gap-2">
            <Signal className="w-3 h-3 text-neutral-300" />
            <Wifi className="w-3 h-3 text-neutral-300" />
            <div className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-400">
              <span>98%</span>
              <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Child Applet View */}
        <div className="w-full min-h-[780px] overflow-x-hidden">
          {children}
        </div>

        {/* Android Gesture Navigation Bar (Bottom) */}
        <div className="w-full bg-[#0c0f14] py-2 flex items-center justify-center select-none border-t border-neutral-900 sticky bottom-0 z-30">
          {navStyle === 'gesture' ? (
            <div 
              onClick={() => {
                triggerHaptic();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="شريط التمرير والإيماءات بأندرويد - اضغط للعودة للأعلى"
              className="cursor-pointer group flex flex-col items-center py-1 px-8"
            >
              <div className="w-32 h-1 bg-neutral-600 group-hover:bg-emerald-400 rounded-full transition-all" />
            </div>
          ) : (
            <div className="flex items-center justify-around w-full max-w-xs text-neutral-400">
              <button 
                onClick={() => {
                  triggerHaptic();
                  window.history.back();
                }}
                className="p-1 hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  triggerHaptic();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-1 hover:text-white cursor-pointer"
              >
                <Circle className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => {
                  triggerHaptic();
                  onOpenProModal();
                }}
                className="p-1 hover:text-white cursor-pointer"
              >
                <Square className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Outer Phone Mockup Physical Volume/Power Buttons decoration */}
      {deviceMode === 'phone' && (
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-neutral-500 mt-2">
          <span>وضع محاكاة هاتف أندرويد 15 الحقيقي</span>
          <span>•</span>
          <button 
            onClick={() => setNavStyle(navStyle === 'gesture' ? 'buttons' : 'gesture')}
            className="hover:text-emerald-400 underline cursor-pointer"
          >
            تبديل شريط التنقل ({navStyle === 'gesture' ? 'إيماءات' : 'أزرار'})
          </button>
        </div>
      )}

    </div>
  );
};
