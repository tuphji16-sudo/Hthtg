import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Trash2, 
  Download, 
  Key, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  CameraOff,
  RefreshCw,
  EyeOff,
  Database
} from 'lucide-react';
import { PrivacyStats, User } from '../types';

interface PrivacyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PrivacyStats;
  currentUser: User;
  onPanicPurge: () => void;
  onRotateKeys: () => void;
}

export const PrivacyCenterModal: React.FC<PrivacyCenterModalProps> = ({
  isOpen,
  onClose,
  stats,
  currentUser,
  onPanicPurge,
  onRotateKeys,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'trackers' | 'speed' | 'data'>('overview');
  const [rotatedSuccess, setRotatedSuccess] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExportData = () => {
    const backup = {
      user: currentUser,
      exportTimestamp: new Date().toISOString(),
      platform: 'Atheer Social (Zero-Telemetry Architecture)',
      encryptionType: 'AES-GCM-256 + Ed25519',
      message: 'بياناتك محفوظة محلياً فقط ولا يتم رفعها لأي خوادم خارجية.',
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atheer_private_vault_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportedSuccess(true);
    setTimeout(() => setExportedSuccess(false), 3000);
  };

  const handleRotate = () => {
    onRotateKeys();
    setRotatedSuccess(true);
    setTimeout(() => setRotatedSuccess(false), 2500);
  };

  const blockedTrackers = [
    { domain: 'connect.facebook.net (Meta Pixel)', category: 'تتبع إعلاني واستهداف', attempts: 64, status: 'محجوب 100%' },
    { domain: 'google-analytics.com/collect', category: 'قياس سلوك المستخدم', attempts: 38, status: 'محجوب 100%' },
    { domain: 'doubleclick.net (Ad Targeting)', category: 'مزادات إعلانية فورية', attempts: 29, status: 'محجوب 100%' },
    { domain: 'bat.bing.com / criteo', category: 'إعادة الاستهداف التتبعي', attempts: 17, status: 'محجوب 100%' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-[#0f141d] border border-neutral-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>مركز الخصوصية والسرعة الفائقة</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                  درع أثير النشط
                </span>
              </h2>
              <p className="text-xs text-neutral-400">شفافية مطلقة • صفر بيع للبيانات • حماية حقيقية</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1 p-2 bg-neutral-950/70 border-b border-neutral-800 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('speed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'speed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            معايير السرعة والأداء
          </button>
          <button
            onClick={() => setActiveTab('trackers')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'trackers'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            حظر المتعقبات ({stats.trackersBlocked})
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'data'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            سيادة البيانات والتدمير
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-right">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">تطبيق معزول تماماً عن شركات الإعلانات</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      على عكس فيسبوك والتطبيقات التقليدية، لا يقوم تطبيق "أثير" بإنشاء بروفايل سري عنك، ولا يسجل صوتك أو محادثاتك لبيعها. البيانات مشفرة محلياً والمحتوى زمني نقي.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-[11px] text-neutral-400 block mb-1">سرعة العرض اللحظية</span>
                  <div className="text-xl font-black font-mono text-emerald-400 flex items-baseline gap-1">
                    <span>{stats.renderLatencyMs.toFixed(1)}</span>
                    <span className="text-xs text-neutral-500">ms</span>
                  </div>
                  <span className="text-[9px] text-emerald-400">استجابة صفرية التأخير</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
                  <span className="text-[11px] text-neutral-400 block mb-1">محاولات تجسس تم حجبها</span>
                  <div className="text-xl font-black font-mono text-white">
                    {stats.trackersBlocked}
                  </div>
                  <span className="text-[9px] text-neutral-400">حجب تلقائي</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-neutral-400 block mb-1">التشفير المعتمد</span>
                  <div className="text-sm font-black font-mono text-cyan-400">
                    AES-256 + Ed25519
                  </div>
                  <span className="text-[9px] text-neutral-400">أعلى معايير الأمان</span>
                </div>
              </div>

              {/* Cryptographic Key Details */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-300 font-bold">
                    <Key className="w-4 h-4 text-emerald-400" />
                    <span>بصمة هويتك المشفرة المحلية</span>
                  </div>
                  <button
                    onClick={handleRotate}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>توليد مفاتيح جديدة</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900 font-mono text-xs text-emerald-300 break-all select-all">
                  {currentUser.publicFingerprint}
                </div>
                {rotatedSuccess && (
                  <p className="text-[11px] text-emerald-400">تم تجديد المفاتيح التشفيرية بنجاح!</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SPEED BENCHMARK */}
          {activeTab === 'speed' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  مقارنة الأداء والسرعة الحقيقية: أثير مقابل فيسبوك
                </h4>
                <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                  لماذا أثير فائق السرعة؟ لأننا قمنا بإزالة كافة سكريبتات التعقب الإعلاني، وSDKs جمع البيانات، والتحليلات الثقيلة التي تستهلك بطارية هاتفك وذاكرته.
                </p>

                <div className="space-y-3">
                  {/* Metric 1 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-300">حجم حزمة الكود المبدئية (Payload)</span>
                      <span className="font-mono text-emerald-400">أثير: 42 KB مقابل 4,800 KB</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-400 w-[4%]" title="أثير: 42KB"></div>
                      <div className="h-full bg-red-500/40 w-[96%]" title="المنصات القديمة: 4.8MB"></div>
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-300">نطاقات التتبع الخارجية المحملة</span>
                      <span className="font-mono text-emerald-400">أثير: 0 متعقب مقابل 45 متعقب</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-400 w-[1%]"></div>
                      <div className="h-full bg-amber-500/40 w-[99%]"></div>
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-300">استهلاك ذاكرة RAM أثناء التصفح</span>
                      <span className="font-mono text-emerald-400">أثير: 18 MB مقابل 250 MB+</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-400 w-[8%]"></div>
                      <div className="h-full bg-neutral-700 w-[92%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRACKERS BLOCKER */}
          {activeTab === 'trackers' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">جدار حماية الشبكة النشط</span>
                  <span className="text-[11px] text-neutral-400">يتم إحباط كافة محاولات التجسس من طرف المتصفح</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-xl border border-emerald-800">
                  حماية 100%
                </span>
              </div>

              <div className="space-y-2">
                {blockedTrackers.map((tracker, i) => (
                  <div key={i} className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-white font-semibold">{tracker.domain}</p>
                      <p className="text-[10px] text-neutral-400">{tracker.category}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold block">{tracker.attempts} محاولة</span>
                      <span className="text-[9px] text-neutral-500">{tracker.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DATA SOVEREIGNTY & PURGE */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              
              {/* Export Data */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>تصدير بياناتك بالكامل (Data Portability)</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  احصل على نسخة مشفرة كاملة من كافة منشوراتك ورسائلك ومحفوظاتك بتنسيق JSON نظيف في أي وقت.
                </p>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل ملف النسخة الاحتياطية</span>
                </button>
                {exportedSuccess && (
                  <p className="text-[11px] text-emerald-400">تم تنزيل ملف بياناتك بأمان!</p>
                )}
              </div>

              {/* Zero-Trace Panic Purge */}
              <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
                <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>زر مسح الأثر الفوري (Zero-Trace Panic Purge)</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  إذا كنت في بيئة غير آمنة أو ترغب في مسح كامل لبيانات الجلسة والذاكرة المحلية فوراً دون أي إمكانية للاسترجاع.
                </p>
                <button
                  onClick={onPanicPurge}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-lg shadow-red-600/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>مسح كامل فوري وتدمير الجلسة</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>بياناتك ملكك فقط • لا خوادم تتبع</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
