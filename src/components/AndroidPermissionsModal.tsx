import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Camera, 
  Mic, 
  Bell, 
  Fingerprint, 
  MapPin, 
  Info 
} from 'lucide-react';
import { AndroidPermissions } from '../types';

interface AndroidPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  permissions: AndroidPermissions;
  onUpdatePermissions: (updated: AndroidPermissions) => void;
}

export const AndroidPermissionsModal: React.FC<AndroidPermissionsModalProps> = ({
  isOpen,
  onClose,
  permissions,
  onUpdatePermissions,
}) => {
  if (!isOpen) return null;

  const togglePermission = (key: keyof AndroidPermissions) => {
    onUpdatePermissions({
      ...permissions,
      [key]: !permissions[key],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0c0f14] border border-neutral-800 rounded-3xl max-w-md w-full p-5 sm:p-6 text-right shadow-2xl relative my-auto space-y-4">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-black text-white">إدارة أذونات أندرويد (Android Permissions)</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              تحكم كامل في وصول التطبيق لعتاد الهاتف حسب مبدأ الخصوصية الصارمة
            </p>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-3 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-2.5 text-xs text-neutral-300">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            وفقاً لسياسة <strong>أثير</strong> الخصوصية: إذن الموقع الجغرافي مُعطل افتراضياً لمنع أي تتبع مكاني.
          </p>
        </div>

        {/* Permissions list */}
        <div className="space-y-2.5">
          
          {/* Biometrics */}
          <div className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">البصمة ومستشعر الوجه</h4>
                <p className="text-[10px] text-neutral-400">لفتح التطبيق والرسائل المشفرة</p>
              </div>
            </div>
            <button
              onClick={() => togglePermission('biometrics')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                permissions.biometrics ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  permissions.biometrics ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Camera */}
          <div className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-500/30">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">الكاميرا</h4>
                <p className="text-[10px] text-neutral-400">لالتقاط الصور وقصص الأثير دون حفظ بيانات EXIF</p>
              </div>
            </div>
            <button
              onClick={() => togglePermission('camera')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                permissions.camera ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  permissions.camera ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Mic */}
          <div className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-500/30">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">الميكروفون</h4>
                <p className="text-[10px] text-neutral-400">لإرسال الرسائل الصوتية المشفرة طرفاً لطرف</p>
              </div>
            </div>
            <button
              onClick={() => togglePermission('microphone')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                permissions.microphone ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  permissions.microphone ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-500/30">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">إشعارات النظام (Android 13+)</h4>
                <p className="text-[10px] text-neutral-400">تنبيهات فورية بالرسائل مع تعتيم المعاينة للخصوصية</p>
              </div>
            </div>
            <button
              onClick={() => togglePermission('notifications')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                permissions.notifications ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  permissions.notifications ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

          {/* Location */}
          <div className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-red-950/60 text-red-400 border border-red-500/30">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">الموقع الجغرافي الدقيق</h4>
                <p className="text-[10px] text-neutral-400">موصى بإيقافه دائماً لحماية هويتك الجغرافية</p>
              </div>
            </div>
            <button
              onClick={() => togglePermission('location')}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                permissions.location ? 'bg-emerald-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  permissions.location ? 'left-1' : 'right-1'
                }`}
              />
            </button>
          </div>

        </div>

        {/* Footer button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors cursor-pointer"
          >
            تأكيد وحفظ أذونات أندرويد
          </button>
        </div>

      </div>
    </div>
  );
};
