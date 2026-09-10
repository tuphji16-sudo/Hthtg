import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Clock, 
  Ghost, 
  CameraOff, 
  Sparkles, 
  Zap, 
  MoreHorizontal,
  Lock,
  CheckCircle2,
  Send
} from 'lucide-react';
import { Post, Comment, User } from '../types';

interface PostCardProps {
  post: Post;
  currentUser: User;
  ghostMode: boolean;
  onReact: (postId: string, reactionKey: 'like' | 'respect' | 'insight' | 'shield' | 'fast') => void;
  onVotePoll: (postId: string, optionId: string) => void;
  onAddComment: (postId: string, commentText: string, asGhost: boolean) => void;
  onToggleBookmark: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  ghostMode,
  onReact,
  onVotePoll,
  onAddComment,
  onToggleBookmark,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [commentAsGhost, setCommentAsGhost] = useState(ghostMode);
  const [shareToast, setShareToast] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Self-destruct countdown calculation
  useEffect(() => {
    if (!post.expiresAt) return;

    const updateTimer = () => {
      const remaining = post.expiresAt! - Date.now();
      if (remaining <= 0) {
        setTimeLeft('انتهت الصلاحية');
        return;
      }
      const mins = Math.floor(remaining / 60000);
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      if (hours > 0) {
        setTimeLeft(`${hours} س و ${remainingMins} د`);
      } else {
        setTimeLeft(`${mins} دقيقة`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 30000);
    return () => clearInterval(interval);
  }, [post.expiresAt]);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim(), commentAsGhost);
    setCommentInput('');
  };

  const totalVotes = post.pollOptions?.reduce((acc, curr) => acc + curr.votes, 0) || 0;

  return (
    <article className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 transition-all hover:border-neutral-700/80 shadow-lg relative backdrop-blur-sm">
      
      {/* Top Meta Bar: Privacy Scope & Self-Destruct */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800/60 text-xs">
        <div className="flex items-center gap-2">
          {/* Privacy Scope Pill */}
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] ${
            post.isGhost 
              ? 'bg-purple-950/80 text-purple-300 border border-purple-800/50' 
              : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
          }`}>
            {post.isGhost ? <Ghost className="w-3 h-3 text-purple-400" /> : <Lock className="w-3 h-3 text-emerald-400" />}
            <span>{post.isGhost ? 'هوية شبح مجهولة' : (post.privacyScope === 'public' ? 'عام مشفر' : 'أصدقاء موثوقين')}</span>
          </span>

          {/* EXIF Stripped Badge */}
          {post.strippedExif && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded-md border border-neutral-800">
              <CameraOff className="w-3 h-3 text-emerald-400" />
              <span>منزوع الـ EXIF</span>
            </span>
          )}
        </div>

        {/* Self-destruct warning */}
        {post.expiresAt && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-800/50">
            <Clock className="w-3 h-3 animate-spin" />
            <span>تدمير ذاتي بعد: {timeLeft}</span>
          </div>
        )}
      </div>

      {/* Author Details Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            {post.isGhost ? (
              <div className="w-11 h-11 rounded-xl bg-purple-950/90 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-md">
                <Ghost className="w-5 h-5" />
              </div>
            ) : (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-xl object-cover border border-emerald-500/40 shadow-md"
              />
            )}
            <div className={`absolute -bottom-1 -left-1 w-3.5 h-3.5 rounded-full border-2 border-neutral-900 ${
              post.isGhost ? 'bg-purple-500' : 'bg-emerald-500'
            }`}></div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                {post.author.name}
              </h4>
              {post.author.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span className="text-[10px] text-emerald-400/90 bg-emerald-950/70 border border-emerald-800/50 px-1.5 py-0.2 rounded font-mono">
                {post.author.privacyBadge}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mt-0.5">
              <span>{post.author.handle}</span>
              <span>•</span>
              <span className="text-[11px] text-neutral-500">{post.createdAt}</span>
            </div>
          </div>
        </div>

        <button className="text-neutral-500 hover:text-neutral-300 p-1.5 rounded-lg hover:bg-neutral-800/60 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Post Text Content */}
      <div className="text-sm text-neutral-200 leading-relaxed mb-3 whitespace-pre-line text-right font-normal selection:bg-emerald-500 selection:text-black">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono text-emerald-400/90 hover:text-emerald-300 bg-neutral-950/70 hover:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-neutral-800 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Media Image Attachment */}
      {post.mediaUrl && (
        <div className="relative rounded-xl overflow-hidden mb-3 border border-neutral-800 bg-neutral-950 max-h-96">
          <img
            src={post.mediaUrl}
            alt="صورة المنشور"
            className="w-full h-auto max-h-96 object-cover hover:scale-[1.01] transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex items-center gap-1 text-[10px] text-neutral-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
            <CameraOff className="w-3 h-3 text-emerald-400" />
            <span>بيانات EXIF محذوفة</span>
          </div>
        </div>
      )}

      {/* Interactive Poll */}
      {post.mediaType === 'poll' && post.pollOptions && (
        <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2 mb-3">
          <div className="text-xs font-bold text-neutral-300 mb-2 flex items-center justify-between">
            <span>استطلاع رأي سري (تصويت مجهول)</span>
            <span className="text-[10px] font-mono text-neutral-400">{totalVotes} صوت</span>
          </div>

          <div className="space-y-2">
            {post.pollOptions.map((option) => {
              const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
              const hasVoted = post.userVotedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => onVotePoll(post.id, option.id)}
                  className={`w-full relative overflow-hidden p-2.5 rounded-xl border text-right transition-all flex items-center justify-between text-xs font-semibold ${
                    hasVoted
                      ? 'border-emerald-500/60 bg-emerald-950/20 text-white'
                      : 'border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-800/70 text-neutral-300'
                  }`}
                >
                  {/* Progress Bar Background */}
                  <div
                    className={`absolute inset-y-0 right-0 transition-all duration-500 ${
                      hasVoted ? 'bg-emerald-500/25' : 'bg-neutral-800/40'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />

                  <span className="relative z-10">{option.text}</span>
                  <span className="relative z-10 font-mono text-[11px] text-neutral-400">
                    {percentage}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reaction Counts & Metrics */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 mb-2 border-b border-neutral-800/60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="text-emerald-400">🛡️</span>
            <span>{post.reactions.shield + post.reactions.like + post.reactions.respect + post.reactions.insight + post.reactions.fast} تفاعل</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>{post.comments.length} تعليق</span>
          <span>{post.sharesCount} مشاركة مشفرة</span>
        </div>
      </div>

      {/* Reaction Toolbar */}
      <div className="flex items-center justify-between gap-1 pt-1">
        
        {/* Shield / Respect Reaction */}
        <button
          onClick={() => onReact(post.id, 'shield')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
            post.userReaction === 'shield'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
              : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
          }`}
          title="درع الأمان / احترام"
        >
          <ShieldCheck className={`w-4 h-4 ${post.userReaction === 'shield' ? 'text-emerald-400 scale-110' : ''}`} />
          <span className="hidden sm:inline">درع</span>
          <span className="font-mono text-[10px]">{post.reactions.shield}</span>
        </button>

        {/* Like */}
        <button
          onClick={() => onReact(post.id, 'like')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
            post.userReaction === 'like'
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm shadow-rose-500/20'
              : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
          }`}
          title="إعجاب"
        >
          <Heart className={`w-4 h-4 ${post.userReaction === 'like' ? 'fill-rose-400 text-rose-400' : ''}`} />
          <span className="hidden sm:inline">إعجاب</span>
          <span className="font-mono text-[10px]">{post.reactions.like}</span>
        </button>

        {/* Fast Speed Reaction */}
        <button
          onClick={() => onReact(post.id, 'fast')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
            post.userReaction === 'fast'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
          }`}
          title="سرعة فائقة"
        >
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">سرعة</span>
          <span className="font-mono text-[10px]">{post.reactions.fast}</span>
        </button>

        {/* Comments Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
            showComments
              ? 'bg-neutral-800 text-white'
              : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">تعليق</span>
          <span className="font-mono text-[10px]">{post.comments.length}</span>
        </button>

        {/* Encrypted Share */}
        <button
          onClick={handleShare}
          className="p-2 rounded-xl text-neutral-400 hover:bg-neutral-800/60 hover:text-cyan-400 transition-colors relative"
          title="نسخ رابط مشفر"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Bookmark */}
        <button
          onClick={() => onToggleBookmark(post.id)}
          className={`p-2 rounded-xl transition-colors ${
            post.isBookmarked
              ? 'text-emerald-400 bg-emerald-950/60'
              : 'text-neutral-400 hover:bg-neutral-800/60 hover:text-white'
          }`}
          title="حفظ في الخزنة الخاصة"
        >
          <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-emerald-400' : ''}`} />
        </button>

      </div>

      {/* Share Toast Notification */}
      {shareToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-950 border border-emerald-500 text-emerald-300 px-3 py-1.5 rounded-xl text-xs shadow-2xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>تم نسخ الرابط المشفر للحافظة!</span>
        </div>
      )}

      {/* Comments Drawer */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-neutral-800/80 space-y-3 animate-in fade-in">
          
          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder={commentAsGhost ? "علّق كهوية شبح مجهولة..." : "اكتب تعليقك المشفر..."}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="p-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black rounded-xl transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Ghost comment switch */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1">
              <button
                type="button"
                onClick={() => setCommentAsGhost(!commentAsGhost)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] transition-colors ${
                  commentAsGhost 
                    ? 'bg-purple-950 border-purple-500/60 text-purple-300' 
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}
              >
                <Ghost className="w-3 h-3" />
                <span>{commentAsGhost ? 'التعليق كشبح مجهول 👻' : 'تعليق باسمي'}</span>
              </button>

              <span className="text-[10px] text-neutral-500">لا يتم تتبع المعلقين</span>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {post.comments.map((comment) => (
              <div key={comment.id} className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/60 text-right">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {comment.author.isGhost ? (
                      <div className="w-5 h-5 rounded bg-purple-900 text-purple-300 flex items-center justify-center">
                        <Ghost className="w-3 h-3" />
                      </div>
                    ) : (
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    )}
                    <span className="text-xs font-bold text-neutral-200">{comment.author.name}</span>
                    <span className="text-[10px] text-neutral-500 font-mono">{comment.author.handle}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">{comment.createdAt}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>

        </div>
      )}

    </article>
  );
};
