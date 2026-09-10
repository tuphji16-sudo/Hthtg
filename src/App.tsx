import React, { useState, useEffect, useMemo } from 'react';
import { 
  currentUser as initialCurrentUser, 
  initialPosts, 
  initialStories, 
  initialChats 
} from './data/mockData';
import { Post, Story, ChatThread, User, PrivacyStats, AndroidProFeatures, AndroidPermissions } from './types';
import { Header } from './components/Header';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { PostComposer } from './components/PostComposer';
import { PostCard } from './components/PostCard';
import { StoriesRail } from './components/StoriesRail';
import { MessengerDrawer } from './components/MessengerDrawer';
import { PrivacyCenterModal } from './components/PrivacyCenterModal';
import { ProfileView } from './components/ProfileView';
import { CirclesView } from './components/CirclesView';
import { AndroidFrame } from './components/AndroidFrame';
import { AtheerProModal } from './components/AtheerProModal';
import { AndroidAPKModal } from './components/AndroidAPKModal';
import { AndroidPermissionsModal } from './components/AndroidPermissionsModal';
import { BiometricLockScreen } from './components/BiometricLockScreen';
import { GitHubExportModal } from './components/GitHubExportModal';
import { 
  ShieldCheck, 
  Zap, 
  Ghost, 
  Filter, 
  Flame, 
  Clock, 
  ImageIcon, 
  CheckCircle2, 
  AlertOctagon,
  RefreshCw,
  Sparkles,
  Smartphone,
  Download
} from 'lucide-react';

export default function App() {
  // Main states
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('atheer_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('atheer_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('atheer_stories');
    return saved ? JSON.parse(saved) : initialStories;
  });

  const [chats, setChats] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('atheer_chats');
    return saved ? JSON.parse(saved) : initialChats;
  });

  // Settings & Navigation
  const [currentTab, setCurrentTab] = useState<string>('feed');
  const [ghostMode, setGhostMode] = useState<boolean>(false);
  const [autoStripExif, setAutoStripExif] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'friends' | 'ghost' | 'destruct'>('all');

  // Modals & Android States
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showPanicConfirm, setShowPanicConfirm] = useState(false);
  const [panicSuccessToast, setPanicSuccessToast] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isAPKModalOpen, setIsAPKModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [isBiometricLocked, setIsBiometricLocked] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Android Pro Features (All Unlocked)
  const [androidPro, setAndroidPro] = useState<AndroidProFeatures>(() => {
    const saved = localStorage.getItem('atheer_android_pro');
    return saved ? JSON.parse(saved) : {
      quantumEncryptionEnabled: true,
      meshP2PEnabled: true,
      biometricLockEnabled: true,
      iconCloak: 'default',
      offlineSyncEnabled: true,
      hdZeroCompression: true,
      antiScreenshot: true,
      unlockedVersion: 'v2.5.0-PRO (Unlocked)',
    };
  });

  // Android Hardware Permissions
  const [androidPermissions, setAndroidPermissions] = useState<AndroidPermissions>(() => {
    const saved = localStorage.getItem('atheer_android_permissions');
    return saved ? JSON.parse(saved) : {
      camera: true,
      microphone: true,
      notifications: true,
      biometrics: true,
      location: false,
    };
  });

  // Save Android Pro features & Permissions to local storage
  useEffect(() => {
    localStorage.setItem('atheer_android_pro', JSON.stringify(androidPro));
  }, [androidPro]);

  useEffect(() => {
    localStorage.setItem('atheer_android_permissions', JSON.stringify(androidPermissions));
  }, [androidPermissions]);

  // Live Stats
  const [stats, setStats] = useState<PrivacyStats>({
    trackersBlocked: 142,
    bandwidthSavedKB: 3420,
    renderLatencyMs: 1.2,
    encryptionKeyStrength: 'AES-256-GCM + Ed25519',
    ghostModeActive: false,
    zeroTelemetryVerified: true,
  });

  // Save to local storage for realistic persistence
  useEffect(() => {
    localStorage.setItem('atheer_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('atheer_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Periodic simulated tracker blocking increments to reflect speed & privacy protection
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        trackersBlocked: prev.trackersBlocked + 1,
        bandwidthSavedKB: prev.bandwidthSavedKB + 18,
        renderLatencyMs: Number((1.1 + Math.random() * 0.4).toFixed(1)),
      }));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Post Actions
  const handleAddPost = (newPostData: Omit<Post, 'id' | 'createdAt' | 'timestamp' | 'reactions' | 'comments' | 'sharesCount'>) => {
    const start = performance.now();
    const newPost: Post = {
      ...newPostData,
      id: `post_${Date.now()}`,
      createdAt: 'الآن',
      timestamp: Date.now(),
      reactions: {
        like: 0,
        respect: 0,
        insight: 0,
        shield: 1,
        fast: 1,
      },
      userReaction: 'shield',
      comments: [],
      sharesCount: 0,
    };

    setPosts([newPost, ...posts]);
    const duration = performance.now() - start;
    setStats(prev => ({ ...prev, renderLatencyMs: Math.max(0.6, duration) }));
  };

  const handleReact = (postId: string, reactionKey: 'like' | 'respect' | 'insight' | 'shield' | 'fast') => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const isCurrent = post.userReaction === reactionKey;
      const newReaction = isCurrent ? null : reactionKey;
      
      const updatedReactions = { ...post.reactions };
      if (post.userReaction) {
        updatedReactions[post.userReaction as keyof typeof updatedReactions] = Math.max(0, updatedReactions[post.userReaction as keyof typeof updatedReactions] - 1);
      }
      if (!isCurrent) {
        updatedReactions[reactionKey] = (updatedReactions[reactionKey] || 0) + 1;
      }

      return {
        ...post,
        reactions: updatedReactions,
        userReaction: newReaction,
      };
    }));
  };

  const handleVotePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId || !post.pollOptions) return post;
      if (post.userVotedOptionId) return post; // already voted

      const updatedOptions = post.pollOptions.map(opt => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });

      return {
        ...post,
        pollOptions: updatedOptions,
        userVotedOptionId: optionId,
      };
    }));
  };

  const handleAddComment = (postId: string, commentText: string, asGhost: boolean) => {
    const newComment = {
      id: `c_${Date.now()}`,
      author: asGhost ? {
        name: 'شبح أثير',
        handle: '@ghost',
        avatar: '',
        isGhost: true,
      } : {
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
      },
      content: commentText,
      createdAt: 'الآن',
      likes: 0,
    };

    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      return {
        ...post,
        comments: [newComment, ...post.comments],
      };
    }));
  };

  const handleToggleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      return {
        ...post,
        isBookmarked: !post.isBookmarked,
      };
    }));
  };

  // Stories Action
  const handleAddStory = (mediaUrl: string, text: string) => {
    const newStory: Story = {
      id: `st_${Date.now()}`,
      author: {
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
      },
      mediaUrl,
      text,
      createdAt: 'الآن',
      expiresAt: '24 ساعة',
      viewsCount: 0,
    };
    setStories([newStory, ...stories]);
  };

  // Messenger Actions
  const handleSendMessage = (chatId: string, text: string, selfDestructSec?: number) => {
    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: 'الآن',
      isEncrypted: true,
      selfDestructInSeconds: selfDestructSec,
    };

    setChats(prev => prev.map(chat => {
      if (chat.id !== chatId) return chat;
      return {
        ...chat,
        lastMessage: text,
        lastTime: 'الآن',
        messages: [...chat.messages, newMsg],
      };
    }));

    // Automated encrypted simulated reply for rich demonstration
    setTimeout(() => {
      const replyMsg = {
        id: `m_rep_${Date.now()}`,
        senderId: 'contact',
        text: 'تم استلام رسالتك المشفرة وفك تشفيرها بنجاح عبر بروتوكول أثير الآمن 🔒',
        timestamp: 'الآن',
        isEncrypted: true,
      };
      setChats(prev => prev.map(chat => {
        if (chat.id !== chatId) return chat;
        return {
          ...chat,
          lastMessage: replyMsg.text,
          lastTime: 'الآن',
          messages: [...chat.messages, replyMsg],
        };
      }));
    }, 1200);
  };

  const handleOpenChatWith = (user: User) => {
    const existing = chats.find(c => c.contact.id === user.id);
    if (existing) {
      setActiveChatId(existing.id);
    } else {
      const newChat: ChatThread = {
        id: `chat_${user.id}`,
        contact: user,
        lastMessage: 'بدء جلسة محادثة مشفرة جديدة',
        lastTime: 'الآن',
        unreadCount: 0,
        messages: [],
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChat.id);
    }
    setIsMessengerOpen(true);
  };

  // Panic Zero-Trace Purge (Wipes everything immediately)
  const executePanicPurge = () => {
    localStorage.clear();
    setPosts(initialPosts);
    setChats(initialChats);
    setGhostMode(true);
    setCurrentTab('feed');
    setShowPanicConfirm(false);
    setPanicSuccessToast(true);
    setStats(prev => ({
      ...prev,
      trackersBlocked: 0,
      bandwidthSavedKB: 0,
    }));
    setTimeout(() => setPanicSuccessToast(false), 3500);
  };

  const handleRotateKeys = () => {
    const randomKey = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')
    ).join('-');
    setCurrentUser(prev => ({
      ...prev,
      publicFingerprint: randomKey,
    }));
  };

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.content.toLowerCase().includes(q) ||
        p.author.name.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter(p => p.tags?.some(t => t.includes(selectedTag)));
    }

    // Feed sub-filter
    if (feedFilter === 'friends') {
      result = result.filter(p => p.privacyScope === 'friends');
    } else if (feedFilter === 'ghost') {
      result = result.filter(p => p.isGhost);
    } else if (feedFilter === 'destruct') {
      result = result.filter(p => p.expiresAt !== undefined);
    }

    return result;
  }, [posts, searchQuery, selectedTag, feedFilter]);

  const bookmarkedCount = posts.filter(p => p.isBookmarked).length;
  const unreadMessagesCount = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <AndroidFrame
      onLockScreen={() => setIsBiometricLocked(true)}
      onOpenProModal={() => setIsProModalOpen(true)}
      onOpenAPKModal={() => setIsAPKModalOpen(true)}
      onOpenGitHubModal={() => setIsGitHubModalOpen(true)}
      quantumEnabled={androidPro.quantumEncryptionEnabled}
    >
      <div className="min-h-screen bg-[#0c0f14] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
        
        {/* Top Header */}
        <Header
          currentUser={currentUser}
          ghostMode={ghostMode}
          onToggleGhostMode={() => setGhostMode(!ghostMode)}
          onOpenPrivacyCenter={() => setIsPrivacyModalOpen(true)}
          onOpenMessenger={() => setIsMessengerOpen(true)}
          onOpenProfile={() => setCurrentTab('profile')}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          unreadMessagesCount={unreadMessagesCount}
          onOpenProModal={() => setIsProModalOpen(true)}
          onOpenAPKModal={() => setIsAPKModalOpen(true)}
          onLockBiometric={() => setIsBiometricLocked(true)}
        />

        {/* Main Container Layout */}
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 flex-1">
          
          {/* Active Tag Filter Banner */}
          {selectedTag && (
            <div className="mb-3 p-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <span>تصفح الوسم:</span>
                <span className="font-bold text-white font-mono">#{selectedTag}</span>
              </div>
              <button
                onClick={() => setSelectedTag(null)}
                className="text-neutral-400 hover:text-white text-[11px] underline"
              >
                إلغاء التصفية
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Sidebar (Col 3 on Large) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <SidebarLeft
                  currentTab={currentTab}
                  onSelectTab={setCurrentTab}
                  currentUser={currentUser}
                  ghostMode={ghostMode}
                  onToggleGhostMode={() => setGhostMode(!ghostMode)}
                  autoStripExif={autoStripExif}
                  onToggleAutoStripExif={() => setAutoStripExif(!autoStripExif)}
                  onPanicPurge={() => setShowPanicConfirm(true)}
                  bookmarkedCount={bookmarkedCount}
                  onOpenProModal={() => setIsProModalOpen(true)}
                  onOpenAPKModal={() => setIsAPKModalOpen(true)}
                  onOpenPermissionsModal={() => setIsPermissionsModalOpen(true)}
                />
              </div>
            </div>

            {/* Main Feed / Content Center (Col 6 on Large) */}
            <main className="col-span-1 lg:col-span-6 space-y-4">
              
              {/* TAB: FEED */}
              {currentTab === 'feed' && (
                <>
                  {/* Android Pro Unlocked Status Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-neutral-900 to-teal-950/70 border border-emerald-500/40 shadow-lg flex items-center justify-between gap-3 text-right">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs font-black text-white">تطبيق أندرويد: نسخة برو مفتوحة بالكامل 💎</h3>
                          <span className="text-[10px] bg-emerald-500 text-black font-extrabold px-1.5 py-0.2 rounded">VIP</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          تشفير Kyber كمومي • اتصال Mesh بدون إنترنت • قفل بالبصمة • مانع تصوير الشاشة
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setIsProModalOpen(true)}
                        className="py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md"
                      >
                        عرض الميزات
                      </button>
                      <button
                        onClick={() => setIsAPKModalOpen(true)}
                        className="py-1.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors hidden sm:inline-flex items-center gap-1"
                      >
                        <Download className="w-3 h-3 text-emerald-400" />
                        <span>APK</span>
                      </button>
                    </div>
                  </div>

                  {/* Stories Rail (Echoes) */}
                  <StoriesRail
                  stories={stories}
                  currentUser={currentUser}
                  onAddStory={handleAddStory}
                />

                {/* Inline Post Composer */}
                <PostComposer
                  currentUser={currentUser}
                  ghostMode={ghostMode}
                  autoStripExif={autoStripExif}
                  onAddPost={handleAddPost}
                />

                {/* Filter Pills */}
                <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 text-xs overflow-x-auto">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setFeedFilter('all')}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        feedFilter === 'all'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      الكل (زمني)
                    </button>
                    <button
                      onClick={() => setFeedFilter('friends')}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        feedFilter === 'friends'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      الأصدقاء فقط
                    </button>
                    <button
                      onClick={() => setFeedFilter('ghost')}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        feedFilter === 'ghost'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      منشورات الشبح 👻
                    </button>
                    <button
                      onClick={() => setFeedFilter('destruct')}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        feedFilter === 'destruct'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      مؤقت التدمير ⏳
                    </button>
                  </div>

                  <span className="hidden sm:inline-block text-[10px] text-neutral-500 font-mono px-2">
                    {filteredPosts.length} منشور
                  </span>
                </div>

                {/* Posts Stream */}
                <div className="space-y-4">
                  {filteredPosts.length === 0 ? (
                    <div className="p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800 text-center space-y-2">
                      <ShieldCheck className="w-10 h-10 text-emerald-500/60 mx-auto" />
                      <h4 className="text-sm font-bold text-neutral-300">لا توجد منشورات تطابق بحثك حالياً</h4>
                      <p className="text-xs text-neutral-500">جرب البحث بكلمة أخرى أو مسح فلاتر التصفية</p>
                    </div>
                  ) : (
                    filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        ghostMode={ghostMode}
                        onReact={handleReact}
                        onVotePoll={handleVotePoll}
                        onAddComment={handleAddComment}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))
                  )}
                </div>
              </>
            )}

            {/* TAB: CIRCLES */}
            {currentTab === 'circles' && (
              <CirclesView
                onSelectTag={(tag) => {
                  setSelectedTag(tag);
                  setCurrentTab('feed');
                }}
              />
            )}

            {/* TAB: BOOKMARKS */}
            {currentTab === 'bookmarks' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 text-right">
                  <h3 className="text-base font-black text-white mb-1">الخزنة المشفرة للمحفوظات</h3>
                  <p className="text-xs text-neutral-400">
                    هذه المنشورات محفوظة محلياً على جهازك ومحكومة بتشفير AES-256. لا يمكن لأحد معرفة ما تحفظه.
                  </p>
                </div>

                {posts.filter(p => p.isBookmarked).length === 0 ? (
                  <div className="p-10 rounded-3xl bg-neutral-900/40 border border-neutral-800 text-center space-y-2">
                    <p className="text-sm text-neutral-400 font-medium">لم تحفظ أي منشور في الخزنة حتى الآن</p>
                  </div>
                ) : (
                  posts.filter(p => p.isBookmarked).map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      currentUser={currentUser}
                      ghostMode={ghostMode}
                      onReact={handleReact}
                      onVotePoll={handleVotePoll}
                      onAddComment={handleAddComment}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))
                )}
              </div>
            )}

            {/* TAB: MESSAGES */}
            {currentTab === 'messages' && (
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">دردشة أثير المشفرة E2EE</h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  محادثات محمية ومباشرة بدون خوادم مراقبة. انقر على الزر بالأسفل لفتح درج المحادثات الفورية.
                </p>
                <button
                  onClick={() => setIsMessengerOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors"
                >
                  فتح المحادثات المشفرة
                </button>
              </div>
            )}

            {/* TAB: PRIVACY */}
            {currentTab === 'privacy' && (
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 text-center space-y-3">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-white">مركز الخصوصية والأداء</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  تحكم كامل في حظر المتعقبات، إزالة بيانات EXIF، وتصدير أو تدمير بياناتك بالكامل بضغطة واحدة.
                </p>
                <button
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors"
                >
                  فتح لوحة تحكم الخصوصية
                </button>
              </div>
            )}

            {/* TAB: PROFILE */}
            {currentTab === 'profile' && (
              <ProfileView
                currentUser={currentUser}
                posts={posts}
                ghostMode={ghostMode}
                onUpdateBio={(bio, name) => {
                  setCurrentUser(prev => ({ ...prev, bio, name }));
                }}
                onReact={handleReact}
                onVotePoll={handleVotePoll}
                onAddComment={handleAddComment}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

          </main>

          {/* Right Sidebar (Col 3 on Large) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <SidebarRight
                stats={stats}
                onOpenChatWith={handleOpenChatWith}
                onSelectTag={(tag) => setSelectedTag(tag === selectedTag ? null : tag)}
                selectedTag={selectedTag}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0e121a]/95 backdrop-blur-md border-t border-neutral-800 p-2 z-40 flex items-center justify-around text-xs">
        <button
          onClick={() => setCurrentTab('feed')}
          className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'feed' ? 'text-emerald-400' : 'text-neutral-400'}`}
        >
          <span className="text-xs font-bold">الرئيسية</span>
        </button>
        <button
          onClick={() => setCurrentTab('circles')}
          className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'circles' ? 'text-emerald-400' : 'text-neutral-400'}`}
        >
          <span className="text-xs font-bold">الدوائر</span>
        </button>
        <button
          onClick={() => setIsMessengerOpen(true)}
          className="flex flex-col items-center gap-1 p-1 text-neutral-400"
        >
          <span className="text-xs font-bold">الرسائل</span>
        </button>
        <button
          onClick={() => setIsPrivacyModalOpen(true)}
          className="flex flex-col items-center gap-1 p-1 text-emerald-400"
        >
          <span className="text-xs font-bold">الدرع</span>
        </button>
        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center gap-1 p-1 ${currentTab === 'profile' ? 'text-emerald-400' : 'text-neutral-400'}`}
        >
          <span className="text-xs font-bold">ملفي</span>
        </button>
      </div>

      {/* Messenger Drawer Component */}
      <MessengerDrawer
        isOpen={isMessengerOpen}
        onClose={() => setIsMessengerOpen(false)}
        chats={chats}
        currentUser={currentUser}
        onSendMessage={handleSendMessage}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
      />

      {/* Privacy Center Modal */}
      <PrivacyCenterModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        stats={stats}
        currentUser={currentUser}
        onPanicPurge={executePanicPurge}
        onRotateKeys={handleRotateKeys}
      />

      {/* Panic Purge Confirmation Modal */}
      {showPanicConfirm && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-red-500/40 rounded-3xl p-6 max-w-sm w-full text-right space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto">
              <AlertOctagon className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-base font-black text-white">تأكيد مسح الأثر الفوري (Zero-Trace)</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                سيتم مسح كافة البيانات والمنشورات والمحادثات والذاكرة المؤقتة من هذا المتصفح فوراً ولن يمكن استعادتها أبداً.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={executePanicPurge}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors"
              >
                نعم، امسح كل شيء فوراً
              </button>
              <button
                onClick={() => setShowPanicConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Panic Success Toast */}
      {panicSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-emerald-500 text-emerald-300 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تم مسح كافة الآثار والبيانات المحلية بنجاح (سجل نظيف 100%)</span>
        </div>
      )}

      {/* Biometric In-Display Lock Screen */}
      <BiometricLockScreen
        isLocked={isBiometricLocked}
        onUnlock={() => setIsBiometricLocked(false)}
        userName={currentUser.name}
      />

      {/* Atheer Pro Unlocked Features Modal */}
      <AtheerProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        features={androidPro}
        onUpdateFeatures={setAndroidPro}
        onOpenBiometricTest={() => {
          setIsProModalOpen(false);
          setIsBiometricLocked(true);
        }}
      />

      {/* Android APK & PWA Center Modal */}
      <AndroidAPKModal
        isOpen={isAPKModalOpen}
        onClose={() => setIsAPKModalOpen(false)}
      />

      {/* Android System Permissions Modal */}
      <AndroidPermissionsModal
        isOpen={isPermissionsModalOpen}
        onClose={() => setIsPermissionsModalOpen(false)}
        permissions={androidPermissions}
        onUpdatePermissions={setAndroidPermissions}
      />

      {/* GitHub Automated Export & Push Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      </div>
    </AndroidFrame>
  );
}
