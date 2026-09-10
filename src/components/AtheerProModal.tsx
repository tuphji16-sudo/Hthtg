import React from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  WifiOff, 
  Fingerprint, 
  EyeOff, 
  Smartphone, 
  Calculator,
  FileText,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { AndroidProFeatures } from '../types';

interface AtheerProModalProps {
  isOpen: boolean;
  onClose: () => void;
  features: AndroidProFeatures;
  onUpdateFeatures: (updated: AndroidProFeatures) => void;
  onOpenBiometricTest: () => void;
}

export const AtheerProModal: React.FC<AtheerProModalProps> = ({
  isOpen,
  onClose,
  features,
  onUpdateFeatures,
  onOpenBiometricTest,
}) => {
  if (!isOpen) return null;

  const toggleFeature = (key: keyof AndroidProFeatures) => {
    onUpdateFeatures({
      ...features,
      [key]: !features[key],
    });
  };

  const handleSelectIcon = (cloak: 'default' | 'calculator' | 'notes' | 'clock') => {
    onUpdateFeatures({
      ...features,
      iconCloak: cloak,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0e1218] border border-emerald-500/40 rounded-3xl max-w-lg w-full p-5 sm:p-6 text-right shadow-2xl relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-neutral-900/90 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Pro Banner */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-black shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">نسخة أثير برو الماسية للأندرويد</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                مفتوحة بالكامل 💎
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              الإصدار: {features.unlockedVersion} • جميع المزايا المتقدمة بدون أي اشتراك أو قيود
            </p>
          </div>
        </div>

        {/* Status Highlights */}
        <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 mb-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">حالة الترخيص: دائم ومفتوح مدى الحياة</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded">
            VIP ACTIVE
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-3 max-h-[58vh] overflow-y-auto pr-1">
          
          {/* Feature 1: Quantum Encryption */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 mt-0.5">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>تشفير ما بعد الكم (Kyber-1024)</span>
                  <span className="text-[10px] text-purple-400 font-normal bg-purple-950/80 px-1.5 py-0.2 rounded border border-purple-800/40">مفتوح</span>
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  حماية متقدمة ضد خوارزميات الحوسبة الكمومية المستقبلية مع مفاتيح عشوائية عالية الإنتروبيا.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleFeature('quantumEncryptionEnabled')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                features.quantumEncryptionEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  features.quantumEncryptionEnabled ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Feature 2: Offline Mesh Relay */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-500/30 text-blue-400 mt-0.5">
                <WifiOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>شبكة أثير الشبكية بدون إنترنت (Mesh P2P)</span>
                  <span className="text-[10px] text-blue-400 font-normal bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-800/40">مفتوح</span>
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  إرسال الرسائل عبر هواتف أندرويد القريبة بالبلوتوث و Wi-Fi Direct في حال انقطاع الإنترنت.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleFeature('meshP2PEnabled')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                features.meshP2PEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  features.meshP2PEnabled ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Feature 3: Biometric In-Display Lock */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 mt-0.5">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>قفل البصمة البيومتري المدمج بالشاشة</span>
                  <span className="text-[10px] text-emerald-400 font-normal bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800/40">مفتوح</span>
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  قفل التطبيق فور تصغيره أو إغلاق الشاشة وفتحه عبر مستشعر البصمة المحلي.
                </p>
                {features.biometricLockEnabled && (
                  <button
                    onClick={onOpenBiometricTest}
                    className="mt-1.5 text-[10px] font-bold text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>تجربة مستشعر البصمة الآن</span>
                    <span>←</span>
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleFeature('biometricLockEnabled')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                features.biometricLockEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  features.biometricLockEnabled ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Feature 4: Anti-Screenshot */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400 mt-0.5">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>درع منع لقطات الشاشة (FLAG_SECURE)</span>
                  <span className="text-[10px] text-amber-400 font-normal bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-800/40">مفتوح</span>
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  تعتيم المحادثات والمنشورات السرية لمنع تصويرها أو تسجيل الشاشة في أندرويد.
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleFeature('antiScreenshot')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer ${
                features.antiScreenshot ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  features.antiScreenshot ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Feature 5: Stealth Launcher Icon Cloak */}
          <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-teal-950/60 border border-teal-500/30 text-teal-400 mt-0.5">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>تمويه الأيقونة في لانشر أندرويد (App Cloak)</span>
                  <span className="text-[10px] text-teal-400 font-normal bg-teal-950/80 px-1.5 py-0.2 rounded border border-teal-800/40">مفتوح</span>
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  إخفاء هوية التطبيق وتغيير اسمه وأيقونته في شاشة الهاتف الرئيسية للتمويه التام.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => handleSelectIcon('default')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] transition-all cursor-pointer ${
                  features.iconCloak === 'default'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>أثير الأصلي</span>
              </button>

              <button
                onClick={() => handleSelectIcon('calculator')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] transition-all cursor-pointer ${
                  features.iconCloak === 'calculator'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>آلة حاسبة</span>
              </button>

              <button
                onClick={() => handleSelectIcon('notes')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] transition-all cursor-pointer ${
                  features.iconCloak === 'notes'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                <FileText className="w-5 h-5 text-blue-400" />
                <span>ملاحظات</span>
              </button>

              <button
                onClick={() => handleSelectIcon('clock')}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] transition-all cursor-pointer ${
                  features.iconCloak === 'clock'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                }`}
              >
                <Clock className="w-5 h-5 text-purple-400" />
                <span>ساعة منبه</span>
              </button>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            تم حفظ تفضيلات أندرويد برو محلياً
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            تطبيق وحفظ الإعدادات
          </button>
        </div>

      </div>
    </div>
  );
};
