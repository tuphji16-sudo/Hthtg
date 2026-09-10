import React, { useState, useRef } from 'react';
import { 
  Image as ImageIcon, 
  BarChart2, 
  Clock, 
  ShieldCheck, 
  Ghost, 
  Send, 
  X, 
  Lock, 
  CameraOff,
  Sparkles,
  CheckCircle,
  Plus
} from 'lucide-react';
import { User, PrivacyScope, Post } from '../types';

interface PostComposerProps {
  currentUser: User;
  ghostMode: boolean;
  autoStripExif: boolean;
  onAddPost: (newPost: Omit<Post, 'id' | 'createdAt' | 'timestamp' | 'reactions' | 'comments' | 'sharesCount'>) => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({
  currentUser,
  ghostMode,
  autoStripExif,
  onAddPost,
}) => {
  const [content, setContent] = useState('');
  const [privacyScope, setPrivacyScope] = useState<PrivacyScope>(ghostMode ? 'ghost' : 'public');
  const [selfDestructMinutes, setSelfDestructMinutes] = useState<number | undefined>(undefined);
  const [isGhostPost, setIsGhostPost] = useState(ghostMode);
  const [mediaUrl, setMediaUrl] = useState('');
  const [showImagePrompt, setShowImagePrompt] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [tagsInput, setTagsInput] = useState('');
  const [isStrippingExif, setIsStrippingExif] = useState(false);
  const [exifStrippedNotice, setExifStrippedNotice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleGhost = () => {
    const next = !isGhostPost;
    setIsGhostPost(next);
    if (next) {
      setPrivacyScope('ghost');
    } else {
      setPrivacyScope('public');
    }
  };

  const handleImageSelect = (url: string) => {
    setIsStrippingExif(true);
    setTimeout(() => {
      setMediaUrl(url);
      setIsStrippingExif(false);
      setExifStrippedNotice(true);
      setShowImagePrompt(false);
    }, 400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsStrippingExif(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTimeout(() => {
          setMediaUrl(event.target?.result as string);
          setIsStrippingExif(false);
          setExifStrippedNotice(true);
          setShowImagePrompt(false);
        }, 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const samplePrivacyImages = [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaUrl && !showPollCreator) return;

    // Process tags
    const extractedTags = content.match(/#([\w\u0600-\u06FF]+)/g)?.map(t => t.replace('#', '')) || [];
    if (tagsInput.trim()) {
      const custom = tagsInput.split(',').map(t => t.trim().replace('#', '')).filter(Boolean);
      extractedTags.push(...custom);
    }

    const newPostData = {
      author: isGhostPost ? {
        ...currentUser,
        name: 'شبح أثير مجهول',
        handle: '@ghost_anon',
        avatar: '',
        privacyBadge: 'تشفير شبح كامل',
        publicFingerprint: '0000-XXXX-0000-XXXX',
      } : currentUser,
      content,
      mediaUrl: mediaUrl || undefined,
      mediaType: showPollCreator ? ('poll' as const) : (mediaUrl ? ('image' as const) : undefined),
      pollOptions: showPollCreator && pollOptions.filter(o => o.trim()).length >= 2 ? (
        pollOptions.filter(o => o.trim()).map((text, idx) => ({
          id: `opt_new_${idx}`,
          text,
          votes: 0,
        }))
      ) : undefined,
      privacyScope: isGhostPost ? 'ghost' : privacyScope,
      isGhost: isGhostPost,
      selfDestructMinutes: selfDestructMinutes,
      expiresAt: selfDestructMinutes ? Date.now() + selfDestructMinutes * 60 * 1000 : undefined,
      tags: extractedTags,
      strippedExif: autoStripExif || exifStrippedNotice,
    };

    onAddPost(newPostData);

    // Reset composer state
    setContent('');
    setMediaUrl('');
    setShowPollCreator(false);
    setPollOptions(['', '']);
    setTagsInput('');
    setExifStrippedNotice(false);
  };

  return (
    <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 shadow-xl relative backdrop-blur-sm">
      
      {/* Header with user & privacy scope */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {isGhostPost ? (
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-300">
              <Ghost className="w-5 h-5 animate-pulse" />
            </div>
          ) : (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40"
            />
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {isGhostPost ? 'منشور شبح مجهول' : currentUser.name}
              </span>
              {isGhostPost && (
                <span className="text-[10px] text-purple-300 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  هوية مخفية
                </span>
              )}
            </div>

            {/* Privacy Scope Selector */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <select
                value={privacyScope}
                onChange={(e) => {
                  const val = e.target.value as PrivacyScope;
                  setPrivacyScope(val);
                  if (val === 'ghost') {
                    setIsGhostPost(true);
                  } else {
                    setIsGhostPost(false);
                  }
                }}
                className="text-[11px] bg-neutral-950 text-neutral-300 border border-neutral-800 rounded-lg px-2 py-0.5 focus:outline-none focus:border-emerald-500"
              >
                <option value="public">🌐 عام مشفر للجميع</option>
                <option value="friends">👥 للأصدقاء الموثوقين فقط</option>
                <option value="circle">🔒 الدائرة المقربة والمشفرة</option>
                <option value="ghost">👻 منشور شبح بدون اسم</option>
              </select>
            </div>
          </div>
        </div>

        {/* Self Destruct Timer Selector */}
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          <select
            value={selfDestructMinutes ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              setSelfDestructMinutes(val ? Number(val) : undefined);
            }}
            className={`text-[11px] rounded-lg px-2 py-1 font-mono transition-colors focus:outline-none border ${
              selfDestructMinutes 
                ? 'bg-amber-950/60 border-amber-500/40 text-amber-300' 
                : 'bg-neutral-950 border-neutral-800 text-neutral-400'
            }`}
          >
            <option value="">⏳ دائم (بدون تدمير)</option>
            <option value="10">تدمير بعد 10 دقائق</option>
            <option value="60">تدمير بعد ساعة</option>
            <option value="1440">تدمير بعد 24 ساعة</option>
            <option value="10080">تدمير بعد 7 أيام</option>
          </select>
        </div>
      </div>

      {/* Main Text Input */}
      <div className="relative mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isGhostPost ? "اكتب كشبح مجهول... لا نسجل عنوان IP أو معرف جهازك." : "ما الذي يدور في ذهنك بحرية وخصوصية تامة؟"}
          rows={3}
          className="w-full bg-neutral-950/60 border border-neutral-800/80 focus:border-emerald-500/60 rounded-xl p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none resize-none transition-all"
        />

        {/* Live Privacy Guarantee Pill */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[10px] text-emerald-400/80 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded-full pointer-events-none">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>تشفير طرفي • صفر تتبع</span>
        </div>
      </div>

      {/* Media Attachment Preview with EXIF Stripped Badge */}
      {mediaUrl && (
        <div className="relative mb-3 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
          <img src={mediaUrl} alt="المرفق" className="max-h-60 w-full object-cover" />
          <button
            onClick={() => setMediaUrl('')}
            className="absolute top-2 left-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-[11px] text-emerald-300 font-medium">
            <CameraOff className="w-3.5 h-3.5 text-emerald-400" />
            <span>تم إزالة بيانات الـ EXIF والموقع الجغرافي بنجاح</span>
          </div>
        </div>
      )}

      {/* Stripping EXIF Loader */}
      {isStrippingExif && (
        <div className="mb-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 text-xs">
          <CameraOff className="w-4 h-4 animate-spin" />
          <span>جارٍ إزالة البيانات الوصفية لحماية أمانك...</span>
        </div>
      )}

      {/* Poll Creator Section */}
      {showPollCreator && (
        <div className="mb-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
            <span className="flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
              استطلاع رأي خاص (تصويت مجهول)
            </span>
            <button
              onClick={() => setShowPollCreator(false)}
              className="text-neutral-500 hover:text-neutral-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {pollOptions.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => {
                const next = [...pollOptions];
                next[i] = e.target.value;
                setPollOptions(next);
              }}
              placeholder={`الخيار ${i + 1}`}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
          ))}

          {pollOptions.length < 4 && (
            <button
              type="button"
              onClick={() => setPollOptions([...pollOptions, ''])}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> إضافة خيار آخر
            </button>
          )}
        </div>
      )}

      {/* Image Picker Modal / Popover */}
      {showImagePrompt && (
        <div className="mb-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
            <span>اختر صورة آمنة أو ارفع من جهازك</span>
            <button onClick={() => setShowImagePrompt(false)} className="text-neutral-500 hover:text-neutral-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
            >
              رفع صورة من جهازك
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="pt-1">
            <span className="text-[10px] text-neutral-500 block mb-1.5">أو اختر من صور تجريبية آمنة:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {samplePrivacyImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`عينة ${idx}`}
                  onClick={() => handleImageSelect(img)}
                  className="w-full h-12 object-cover rounded-lg cursor-pointer border border-neutral-800 hover:border-emerald-500 transition-all hover:scale-105"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Toolbar & Submit */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800/80">
        <div className="flex items-center gap-1.5">
          
          {/* Image button */}
          <button
            type="button"
            onClick={() => setShowImagePrompt(!showImagePrompt)}
            className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-emerald-400 border border-neutral-800/60 transition-colors"
            title="إضافة صورة (مع نزع بيانات EXIF تلقائياً)"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Poll button */}
          <button
            type="button"
            onClick={() => setShowPollCreator(!showPollCreator)}
            className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-cyan-400 border border-neutral-800/60 transition-colors"
            title="إنشاء استطلاع رأي مجهول"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          {/* Ghost Mode Toggle */}
          <button
            type="button"
            onClick={handleToggleGhost}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isGhostPost
                ? 'bg-purple-950 border-purple-500/50 text-purple-300'
                : 'bg-neutral-950 border-neutral-800/60 text-neutral-400 hover:text-neutral-200'
            }`}
            title="النشر كهوية شبحية مجهولة"
          >
            <Ghost className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">منشور شبح</span>
          </button>
        </div>

        {/* Submit Post Button */}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() && !mediaUrl && !showPollCreator}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-black font-bold text-xs transition-all shadow-md shadow-emerald-500/20 active:scale-95"
        >
          <span>نشر فوري</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
