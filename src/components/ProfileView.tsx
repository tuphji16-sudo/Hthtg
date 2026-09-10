import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Calendar, 
  Edit3, 
  Lock, 
  Copy, 
  Check, 
  Bookmark, 
  Sparkles, 
  Zap,
  User as UserIcon
} from 'lucide-react';
import { User, Post } from '../types';
import { PostCard } from './PostCard';

interface ProfileViewProps {
  currentUser: User;
  posts: Post[];
  ghostMode: boolean;
  onUpdateBio: (newBio: string, newName: string) => void;
  onReact: (postId: string, reactionKey: 'like' | 'respect' | 'insight' | 'shield' | 'fast') => void;
  onVotePoll: (postId: string, optionId: string) => void;
  onAddComment: (postId: string, commentText: string, asGhost: boolean) => void;
  onToggleBookmark: (postId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  posts,
  ghostMode,
  onUpdateBio,
  onReact,
  onVotePoll,
  onAddComment,
  onToggleBookmark,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  const [activeTab, setActiveTab] = useState<'my_posts' | 'bookmarks'>('my_posts');

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(currentUser.publicFingerprint);
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBio(bio, name);
    setIsEditing(false);
  };

  const myPosts = posts.filter(p => p.author.id === currentUser.id || (!p.isGhost && p.author.handle === currentUser.handle));
  const bookmarkedPosts = posts.filter(p => p.isBookmarked);

  const displayedPosts = activeTab === 'my_posts' ? myPosts : bookmarkedPosts;

  return (
    <div className="space-y-4">
      
      {/* Profile Cover & Header Card */}
      <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800 overflow-hidden shadow-xl">
        
        {/* Cover Image */}
        <div className="h-40 sm:h-52 w-full relative bg-gradient-to-r from-emerald-900 via-neutral-900 to-cyan-900">
          {currentUser.coverImage && (
            <img
              src={currentUser.coverImage}
              alt="الغلاف"
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/30" />
        </div>

        {/* Profile Details Bar */}
        <div className="px-4 sm:px-6 pb-6 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-neutral-900 shadow-2xl bg-neutral-950"
              />
              <div className="absolute -bottom-1 -left-1 p-1 bg-emerald-500 rounded-lg text-black" title="هوية موثقة ومشفرة">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* Edit / Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-semibold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}</span>
              </button>
            </div>
          </div>

          {/* User Info */}
          {!isEditing ? (
            <div className="space-y-2 text-right">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-black text-white">{currentUser.name}</h1>
                <span className="text-xs font-mono text-neutral-400">{currentUser.handle}</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                  {currentUser.privacyBadge}
                </span>
              </div>

              <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                {currentUser.bio}
              </p>

              {/* Cryptographic Key & Details */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-neutral-400 font-mono">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-emerald-500 text-emerald-400 transition-colors"
                  title="انقر لنسخ المفتاح العام"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>المفتاح العام: {currentUser.publicFingerprint}</span>
                  {copiedFingerprint ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
                </button>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>انضم في {currentUser.joinedDate}</span>
                </div>
              </div>

              {/* Social Counters */}
              <div className="flex items-center gap-6 pt-3 border-t border-neutral-800/80 text-xs">
                <div>
                  <span className="font-bold text-white font-mono ml-1">{currentUser.followersCount}</span>
                  <span className="text-neutral-400">متابع مشفر</span>
                </div>
                <div>
                  <span className="font-bold text-white font-mono ml-1">{currentUser.followingCount}</span>
                  <span className="text-neutral-400">يتابع</span>
                </div>
                <div>
                  <span className="font-bold text-white font-mono ml-1">{myPosts.length}</span>
                  <span className="text-neutral-400">منشور منشور</span>
                </div>
              </div>
            </div>
          ) : (
            /* Editing Form */
            <form onSubmit={handleSave} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">الاسم المستعار:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">النبذة الشخصية (Bio):</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-colors"
                >
                  حفظ التعديلات
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded-xl hover:bg-neutral-700"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('my_posts')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'my_posts'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          منشوراتي ({myPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            activeTab === 'bookmarks'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          المحفوظات في الخزنة ({bookmarkedPosts.length})
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {displayedPosts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center space-y-2">
            <Bookmark className="w-8 h-8 text-neutral-600 mx-auto" />
            <p className="text-sm font-semibold text-neutral-400">لا توجد منشورات في هذا القسم حالياً</p>
          </div>
        ) : (
          displayedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              ghostMode={ghostMode}
              onReact={onReact}
              onVotePoll={onVotePoll}
              onAddComment={onAddComment}
              onToggleBookmark={onToggleBookmark}
            />
          ))
        )}
      </div>

    </div>
  );
};
