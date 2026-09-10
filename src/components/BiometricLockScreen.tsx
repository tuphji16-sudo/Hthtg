import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  KeyRound, 
  AlertCircle 
} from 'lucide-react';

interface BiometricLockScreenProps {
  isLocked: boolean;
  onUnlock: () => void;
  userName: string;
}

export const BiometricLockScreen: React.FC<BiometricLockScreenProps> = ({
  isLocked,
  onUnlock,
  userName,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [pinMode, setPinMode] = useState(false);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isLocked) return null;

  // Realistic Biometric Sensor touch simulation
  const handleTouchSensor = () => {
    if (scanning) return;
    setScanning(true);
    setErrorMsg('');

    // Haptic vibration feedback if device supports
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([20, 50, 20]);
    }

    setTimeout(() => {
      setScanning(false);
      setScanSuccess(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(60);
      }
      setTimeout(() => {
        setScanSuccess(false);
        onUnlock();
      }, 500);
    }, 900);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN for test or any 4-digit code
    if (pin.length === 4) {
      onUnlock();
    } else {
      setErrorMsg('رمز PIN يجب أن يتكون من 4 أرقام');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#07090c]/98 backdrop-blur-2xl flex flex-col items-center justify-between p-6 text-center select-none animate-in fade-in duration-200">
      
      {/* Top Lock Status */}
      <div className="pt-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>حماية أندرويد الحيوية (Android Biometrics)</span>
        </div>

        <h1 className="text-2xl font-black text-white tracking-tight mt-2">
          تطبيق أثير مُقفل
        </h1>
        <p className="text-xs text-neutral-400 max-w-xs mx-auto">
          مرحباً {userName}، ضع إصبعك على مستشعر البصمة أو أدخل رمز المرور السري للمتابعة
        </p>
      </div>

      {/* Center Biometric Sensor Simulation */}
      <div className="my-auto flex flex-col items-center">
        {!pinMode ? (
          <div className="flex flex-col items-center space-y-4">
            
            {/* The In-Display Fingerprint Sensor */}
            <button
              onClick={handleTouchSensor}
              className={`w-28 h-28 rounded-full border-2 flex items-center justify-center relative transition-all duration-300 shadow-2xl cursor-pointer ${
                scanSuccess
                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 scale-105 shadow-emerald-500/50'
                  : scanning
                  ? 'border-teal-400 bg-teal-500/20 text-teal-300 animate-pulse shadow-teal-500/40'
                  : 'border-neutral-700 bg-neutral-900/80 text-neutral-300 hover:border-emerald-500/60 hover:text-emerald-400'
              }`}
              title="اضغط هنا لمحاكاة قراءة البصمة"
            >
              {scanSuccess ? (
                <Unlock className="w-12 h-12 text-emerald-400 animate-in zoom-in" />
              ) : (
                <Fingerprint className={`w-14 h-14 ${scanning ? 'animate-bounce' : ''}`} />
              )}

              {/* Sensor Ripple Rings */}
              {scanning && (
                <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-60" />
              )}
            </button>

            <div className="text-xs">
              {scanning ? (
                <span className="text-emerald-400 font-mono animate-pulse">جاري التحقق من البصمة البيومترية...</span>
              ) : scanSuccess ? (
                <span className="text-emerald-400 font-bold">تم التعرف على البصمة بنجاح!</span>
              ) : (
                <span className="text-neutral-400 font-medium">المس أيقونة البصمة للمطابقة السريعة</span>
              )}
            </div>

          </div>
        ) : (
          <form onSubmit={handlePinSubmit} className="space-y-4 w-full max-w-xs">
            <div className="flex justify-center gap-2" dir="ltr">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-lg font-mono font-bold transition-all ${
                    pin[idx]
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-500'
                  }`}
                >
                  {pin[idx] ? '•' : ''}
                </div>
              ))}
            </div>

            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="أدخل 4 أرقام"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-center text-white font-mono tracking-widest text-sm focus:outline-none focus:border-emerald-500"
              autoFocus
            />

            {errorMsg && (
              <p className="text-red-400 text-xs flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors cursor-pointer"
            >
              فتح القفل
            </button>
          </form>
        )}
      </div>

      {/* Bottom Switch Method */}
      <div className="pb-4 flex flex-col items-center gap-3">
        <button
          onClick={() => {
            setPinMode(!pinMode);
            setErrorMsg('');
          }}
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
          <span>{pinMode ? 'استخدام مستشعر البصمة' : 'استخدام رمز PIN السري'}</span>
        </button>

        <span className="text-[10px] text-neutral-600 font-mono">
          Android Hardware Security Module • FIPS 140-3 Level 3
        </span>
      </div>

    </div>
  );
};
