import React, { useState } from 'react';
import { 
  X, 
  GitBranch, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Terminal, 
  ArrowUpRight,
  GitCommit,
  Share2
} from 'lucide-react';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/USERNAME/atheer-social.git');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedCommand = `git remote add origin ${repoUrl || 'https://github.com/USERNAME/atheer-social.git'}
git branch -M main
git push -u origin main`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0d1117] border border-neutral-700 rounded-3xl max-w-lg w-full p-5 sm:p-6 text-right shadow-2xl relative my-auto space-y-4">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#24292e] text-white border border-neutral-600 shadow-md">
            <GitBranch className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white">تصدير ورفع تلقائي إلى GitHub</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                مستودع مهيأ جاهز
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              تمت تهيئة Git وعمل الـ Commit الأولي بنجاح على الفرع <code className="text-emerald-400 font-mono">main</code>
            </p>
          </div>
        </div>

        {/* Option 1: AI Studio One-Click Native Export */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded">الطريقة الأسهل والأنسب</span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>التصدير التلقائي من واجهة AI Studio</span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            اضغط على زر <strong>المشاركة / الإعدادات (⚙️ Export)</strong> في أعلى شريط AI Studio واختر <strong>«Export to GitHub»</strong>، وسيقوم النظام بإنشاء المستودع ورفع كافة الملفات إلى حسابك فوراً!
          </p>
        </div>

        {/* Option 2: Automated Git Push Command */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">أو اربط برابط مستودعك الخاص:</span>
            <span className="text-xs font-bold text-white flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>أمر الرفع الفوري</span>
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo.git"
              className="w-full bg-[#161b22] border border-neutral-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 text-left dir-ltr focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Terminal Box */}
          <div className="p-3 rounded-2xl bg-[#090d13] border border-neutral-800 text-left font-mono text-xs text-neutral-300 space-y-1 relative group" dir="ltr">
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px]">نسخ</span>
                </>
              )}
            </button>
            <div className="text-neutral-500 select-none"># Git Automated Push Commands:</div>
            <div className="text-emerald-400 font-semibold">{`git remote add origin ${repoUrl}`}</div>
            <div className="text-neutral-300">git branch -M main</div>
            <div className="text-cyan-400">git push -u origin main</div>
          </div>
        </div>

        {/* Option 3: Download Complete Repository Archive */}
        <div className="pt-1 flex items-center justify-between gap-2 border-t border-neutral-800">
          <a
            href="/atheer-social-source.tar.gz"
            download="atheer-social-source.tar.gz"
            className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>تنزيل أرشيف المشروع كاملاً (.tar.gz)</span>
          </a>

          <a
            href="https://github.com/new"
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-4 rounded-xl bg-[#24292e] hover:bg-[#2f363d] border border-neutral-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>إنشاء مستودع</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Git status indicator */}
        <div className="flex items-center justify-between text-[11px] text-neutral-400 bg-neutral-950 p-2.5 rounded-xl border border-neutral-900 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <GitCommit className="w-3.5 h-3.5" />
            <span>Latest: feat(android): initial commit</span>
          </div>
          <span className="text-neutral-500">33 files tracked</span>
        </div>

      </div>
    </div>
  );
};
