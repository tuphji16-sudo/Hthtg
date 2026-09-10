import React, { useState } from 'react';
import { Plus, X, Shield, EyeOff, Lock, Sparkles } from 'lucide-react';
import { Story, User } from '../types';

interface StoriesRailProps {
  stories: Story[];
  currentUser: User;
  onAddStory: (mediaUrl: string, text: string) => void;
}

export const StoriesRail: React.FC<StoriesRailProps> = ({
  stories,
  currentUser,
  onAddStory,
}) => {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStoryText, setNewStoryText] = useState('');
  const [newStoryImage, setNewStoryImage] = useState('');

  const sampleBackgrounds = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
  ];

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryText.trim() && !newStoryImage) return;

    onAddStory(
      newStoryImage || sampleBackgrounds[0],
      newStoryText.trim()
    );

    setNewStoryText('');
    setNewStoryImage('');
    setShowAddModal(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        
        {/* Add Story Card */}
        <div
          onClick={() => setShowAddModal(true)}
          className="shrink-0 w-28 h-40 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 cursor-pointer overflow-hidden relative group transition-all duration-200 flex flex-col justify-between p-2.5 shadow-md"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>

          <div>
            <span className="text-xs font-bold text-white block">أضف صدى</span>
            <span className="text-[10px] text-emerald-400/80 font-mono block">تدمير بعد 24س</span>
          </div>

          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Existing Stories */}
        {stories.filter(s => s.id !== 'st_my').map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="shrink-0 w-28 h-40 rounded-2xl relative overflow-hidden cursor-pointer group border border-neutral-800 hover:border-emerald-400/60 transition-all duration-200 shadow-md flex flex-col justify-between p-2.5"
          >
            {/* Background Image */}
            <img
              src={story.mediaUrl}
              alt={story.author.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-[0.7]"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Top Author Avatar with neon ring */}
            <div className="relative z-10">
              <div className="w-9 h-9 rounded-xl p-0.5 bg-gradient-to-tr from-emerald-400 to-cyan-400 shadow-md">
                <img
                  src={story.author.avatar}
                  alt={story.author.name}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
            </div>

            {/* Bottom Text and info */}
            <div className="relative z-10 text-right">
              <p className="text-xs font-bold text-white truncate drop-shadow-md">
                {story.author.name}
              </p>
              <p className="text-[10px] font-mono text-emerald-300/90 flex items-center gap-1 drop-shadow-md">
                <EyeOff className="w-2.5 h-2.5" />
                <span>مشاهدة سرية</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm h-[580px] rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col justify-between p-4">
            
            {/* Background */}
            <img
              src={activeStory.mediaUrl}
              alt="Story"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80" />

            {/* Top Bar: Progress + Author info + Close */}
            <div className="relative z-10 space-y-3">
              {/* Progress bar */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="w-full h-full bg-emerald-400 rounded-full animate-[pulse_3s_ease-in-out_infinite]" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={activeStory.author.avatar}
                    alt={activeStory.author.name}
                    className="w-9 h-9 rounded-xl object-cover border border-emerald-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">{activeStory.author.name}</span>
                    <span className="text-[10px] text-neutral-300 font-mono">{activeStory.createdAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStory(null)}
                  className="p-1.5 rounded-full bg-black/60 hover:bg-black text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Caption text if available */}
            {activeStory.text && (
              <div className="relative z-10 bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-white text-sm text-center font-semibold">
                {activeStory.text}
              </div>
            )}

            {/* Bottom Privacy Guarantee Bar */}
            <div className="relative z-10 p-3 rounded-2xl bg-neutral-900/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <EyeOff className="w-4 h-4" />
                <span className="text-[11px] font-medium">مشاهدتك لم يتم تسجيلها (حماية هوية كاملة)</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">{activeStory.expiresAt}</span>
            </div>

          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 max-w-md w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>إضافة صدى جديد (مؤقت 24 ساعة)</span>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStory} className="space-y-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">الرسالة أو العبارة:</label>
                <textarea
                  value={newStoryText}
                  onChange={(e) => setNewStoryText(e.target.value)}
                  placeholder="اكتب لحظتك هنا..."
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1.5">اختر خلفية بصرية:</label>
                <div className="grid grid-cols-3 gap-2">
                  {sampleBackgrounds.map((bg, i) => (
                    <img
                      key={i}
                      src={bg}
                      alt="خلفية"
                      onClick={() => setNewStoryImage(bg)}
                      className={`h-16 w-full object-cover rounded-xl cursor-pointer border-2 transition-all ${
                        newStoryImage === bg ? 'border-emerald-500 scale-105' : 'border-neutral-800 hover:border-neutral-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>تحذف تلقائياً بعد 24 ساعة ولا يتم تتبع من قام بفتحها.</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors"
              >
                نشر الصدى فوراً
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
