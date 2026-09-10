import { User, Post, Story, ChatThread } from '../types';

export const currentUser: User = {
  id: 'user_me',
  name: 'عمر الخالدي',
  handle: '@omar_khalidi',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  bio: 'مهتم بالخصوصية الرقمية والأمان السيبراني. أؤمن بأن بيانات المستخدم حق إنساني أصيل وليست سلعة تجارية.',
  isVerified: true,
  privacyBadge: 'درع النخبة (صفر تتبع)',
  publicFingerprint: '94A1-F032-B88E-52C9',
  followersCount: 1420,
  followingCount: 318,
  postsCount: 47,
  joinedDate: 'سبتمبر 2024'
};

export const sampleUsers: Record<string, User> = {
  sara: {
    id: 'user_sara',
    name: 'سارة المنصوري',
    handle: '@sara_cyber',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'باحثة في تشفير البيانات والأنظمة اللامركزية. كاتبة تقنية.',
    isVerified: true,
    privacyBadge: 'مشفر بالكامل',
    publicFingerprint: '3C89-AA12-9F01-77EE',
    followersCount: 3840,
    followingCount: 420,
    postsCount: 112,
    joinedDate: 'يناير 2024'
  },
  tariq: {
    id: 'user_tariq',
    name: 'طارق الأحمدي',
    handle: '@tariq_tech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'مطور واجهات ومصمم تجارب مستخدم تركز على السرعة القصوى وانعدام الإعلانات المزعجة.',
    isVerified: false,
    privacyBadge: 'حماية متقدمة',
    publicFingerprint: '7B10-55E3-D09A-1288',
    followersCount: 950,
    followingCount: 230,
    postsCount: 65,
    joinedDate: 'مارس 2024'
  },
  leila: {
    id: 'user_leila',
    name: 'د. ليلى نور',
    handle: '@dr_leila',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'أستاذة الذكاء الاصطناعي والأخلاقيات الرقمية في الجامعة التقنية.',
    isVerified: true,
    privacyBadge: 'درع موثوق',
    publicFingerprint: 'AA44-1109-88BC-0043',
    followersCount: 6200,
    followingCount: 190,
    postsCount: 204,
    joinedDate: 'نوفمبر 2023'
  },
  ghost: {
    id: 'user_ghost',
    name: 'شبح أثير مجهول',
    handle: '@ghost_anon',
    avatar: '',
    bio: 'هوية مجهولة تماماً بدون سجل ارتباط محلي.',
    isVerified: false,
    privacyBadge: 'تشفير شبح كامل',
    publicFingerprint: '0000-XXXX-0000-XXXX',
    followersCount: 0,
    followingCount: 0,
    postsCount: 14,
    joinedDate: 'غير محدد'
  }
};

export const initialPosts: Post[] = [
  {
    id: 'post_1',
    author: sampleUsers.sara,
    content: '🚀 لماذا انتقلت كلياً إلى منصة "أثير" وتركت المنصات التقليدية؟\n\n1. لا يوجد خوارزميات تتلاعب بمشاعرك لزيادة وقت الشاشة.\n2. التايملاين زمني بحت: ما ينشره أصدقاؤك تراه مباشرة كما هو.\n3. يتم نزع بيانات الـ EXIF والموقع الجغرافي من أي صورة ترفعها تلقائياً لحماية أمانك الشخصي.\n4. سرعة الاستجابة فائقة (أقل من 3 ميلي ثانية) لأن التطبيق لا يحمل سكريبتات تجسس إعلانية.',
    createdAt: 'منذ 15 دقيقة',
    timestamp: Date.now() - 15 * 60 * 1000,
    mediaUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    strippedExif: true,
    privacyScope: 'public',
    isGhost: false,
    reactions: {
      like: 42,
      respect: 19,
      insight: 27,
      shield: 35,
      fast: 16
    },
    userReaction: 'shield',
    sharesCount: 14,
    tags: ['الخصوصية_الرقمية', 'أثير_الحرية', 'تقنية'],
    comments: [
      {
        id: 'c_1',
        author: {
          name: 'طارق الأحمدي',
          handle: '@tariq_tech',
          avatar: sampleUsers.tariq.avatar
        },
        content: 'الأجمل هو غياب الإعلانات الموجهة التي تتجسس على الميكروفون والبحث! السرعة هنا خيالية.',
        createdAt: 'منذ 10 دقائق',
        likes: 8
      },
      {
        id: 'c_2',
        author: {
          name: 'طالب تقني',
          handle: '@student_tech',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
        },
        content: 'التشفير وحذف البيانات الوصفية تلقائياً يجب أن يكون معياراً إجبارياً في كل الإنترنت.',
        createdAt: 'منذ 3 دقائق',
        likes: 3
      }
    ]
  },
  {
    id: 'post_2',
    author: sampleUsers.leila,
    content: 'استطلاع رأي سريع لمجتمع أثير: ما هي الخاصية الأكثر أهمية بالنسبة لك عند اختيار وسيلة التواصل الاجتماعي اليوم؟',
    createdAt: 'منذ ساعة',
    timestamp: Date.now() - 60 * 60 * 1000,
    mediaType: 'poll',
    pollOptions: [
      { id: 'opt_1', text: 'سرعة التصفح والاستجابة الفورية الخالية من البطء', votes: 84 },
      { id: 'opt_2', text: 'الخصوصية وعدم بيع البيانات للمعلنين', votes: 219 },
      { id: 'opt_3', text: 'إمكانية إرسال منشورات ذاتية التدمير', votes: 45 },
      { id: 'opt_4', text: 'خلاصة زمنية نقية بدون خوارزميات غامضة', votes: 160 }
    ],
    userVotedOptionId: 'opt_2',
    strippedExif: true,
    privacyScope: 'public',
    isGhost: false,
    reactions: {
      like: 68,
      respect: 31,
      insight: 54,
      shield: 40,
      fast: 12
    },
    sharesCount: 9,
    tags: ['استطلاع', 'أمان_المعلومات', 'مجتمع_أثير'],
    comments: []
  },
  {
    id: 'post_3',
    author: sampleUsers.ghost,
    content: '👻 [منشور شبح مجهول الهوية]\nهذا المنشور تم نشره عبر بروتوكول الشبح في منصة أثير. لم يتم تخزين أي عنوان IP أو اسم ناشر، وسيتم تدميره ذاتياً بعد انقضاء الوقت المحدد.',
    createdAt: 'منذ ساعتين',
    timestamp: Date.now() - 120 * 60 * 1000,
    selfDestructMinutes: 180,
    expiresAt: Date.now() + 180 * 60 * 1000,
    strippedExif: true,
    privacyScope: 'ghost',
    isGhost: true,
    reactions: {
      like: 89,
      respect: 44,
      insight: 18,
      shield: 92,
      fast: 25
    },
    userReaction: null,
    sharesCount: 31,
    tags: ['وضع_الشبح', 'تدمير_ذاتي', 'تشفير'],
    comments: [
      {
        id: 'c_3',
        author: {
          name: 'عضو أثير المستقل',
          handle: '@anon_member',
          avatar: '',
          isGhost: true
        },
        content: 'حرية التعبير الحقيقية تبدأ عندما لا يكون هناك ملف شخصي يسجل كل همسة ليبيعها لشركات الإعلانات.',
        createdAt: 'منذ ساعة',
        likes: 15
      }
    ]
  },
  {
    id: 'post_4',
    author: sampleUsers.tariq,
    content: 'واجهة المستخدم الجديدة لتطبيق أثير تم تصميمها من الصفر:\n- خطوط واضحة ومريحة للعين\n- مساحات سلبية مدروسة لمنع التشتت\n- شريط قياس السرعة والأداء اللحظي يوضح معدل نقل البيانات وحظر المتعقبات.\n\nما رأيكم في تجربة الاستخدام مقارنة بالتطبيقات التقليدية الزرقاء القديمة؟ ✨',
    createdAt: 'منذ 3 ساعات',
    timestamp: Date.now() - 180 * 60 * 1000,
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    strippedExif: true,
    privacyScope: 'friends',
    isGhost: false,
    reactions: {
      like: 51,
      respect: 22,
      insight: 37,
      shield: 19,
      fast: 48
    },
    sharesCount: 7,
    tags: ['تصميم_تطبيقات', 'تجربة_المستخدم', 'سرعة'],
    comments: []
  }
];

export const initialStories: Story[] = [
  {
    id: 'st_my',
    author: {
      name: 'أنت (إضافة صدى)',
      handle: currentUser.handle,
      avatar: currentUser.avatar
    },
    mediaUrl: '',
    createdAt: 'الآن',
    expiresAt: '24 ساعة',
    viewsCount: 0
  },
  {
    id: 'st_1',
    author: {
      name: sampleUsers.sara.name,
      handle: sampleUsers.sara.handle,
      avatar: sampleUsers.sara.avatar
    },
    mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    text: 'مراجعة خوارزميات التشفير غير المتماثل في مختبر أثير اليوم 🔐',
    createdAt: 'منذ ساعتين',
    expiresAt: 'بعد 22 ساعة',
    viewsCount: 142
  },
  {
    id: 'st_2',
    author: {
      name: sampleUsers.tariq.name,
      handle: sampleUsers.tariq.handle,
      avatar: sampleUsers.tariq.avatar
    },
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    text: 'كود نظيف = سرعة استجابة لا تتعدى 2ms ⚡',
    createdAt: 'منذ 4 ساعات',
    expiresAt: 'بعد 20 ساعة',
    viewsCount: 89
  },
  {
    id: 'st_3',
    author: {
      name: sampleUsers.leila.name,
      handle: sampleUsers.leila.handle,
      avatar: sampleUsers.leila.avatar
    },
    mediaUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    text: 'الخصوصية ليست خياراً إضافياً، بل هي البنية التحتية لحرية الفكر.',
    createdAt: 'منذ 6 ساعات',
    expiresAt: 'بعد 18 ساعة',
    viewsCount: 260
  }
];

export const initialChats: ChatThread[] = [
  {
    id: 'chat_sara',
    contact: sampleUsers.sara,
    lastMessage: 'تم تفعيل التشفير من طرف لطرف بالمفتاح المشترك بنجاح.',
    lastTime: '11:42 ص',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'user_sara',
        text: 'أهلاً عمر، هل قمت بتجربة فحص تسرب البيانات الوصفية الأخير؟',
        timestamp: '11:30 ص',
        isEncrypted: true
      },
      {
        id: 'm2',
        senderId: 'user_me',
        text: 'نعم سارة! تم حجب جميع إحداثيات GPS ونموذج الهاتف تلقائياً قبل الرفع.',
        timestamp: '11:35 ص',
        isEncrypted: true
      },
      {
        id: 'm3',
        senderId: 'user_sara',
        text: 'تم تفعيل التشفير من طرف لطرف بالمفتاح المشترك بنجاح.',
        timestamp: '11:42 ص',
        isEncrypted: true
      }
    ]
  },
  {
    id: 'chat_tariq',
    contact: sampleUsers.tariq,
    lastMessage: 'مؤقت الحذف التلقائي للمحادثة مضبوط على 24 ساعة.',
    lastTime: 'أمس',
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'user_tariq',
        text: 'مرحباً، أرسلت لك مسودة واجهة المستخدم بتدرجات الرمادي الكربوني والأخضر الزمردي.',
        timestamp: 'أمس 04:15 م',
        isEncrypted: true
      },
      {
        id: 'm5',
        senderId: 'user_me',
        text: 'رائعة جداً وتناسب فلسفة الخصوصية والسرعة!',
        timestamp: 'أمس 04:20 م',
        isEncrypted: true
      }
    ]
  }
];

export const trendingCircles = [
  { id: 'c1', name: 'الخصوصية الرقمية والتشفير', members: '14.2 ألف', tag: '#تشفير_حر', icon: 'Shield' },
  { id: 'c2', name: 'البرمجة عالية الأداء والسرعة', members: '8.9 ألف', tag: '#تطوير_نظيف', icon: 'Zap' },
  { id: 'c3', name: 'الذكاء الاصطناعي المفتوح', members: '11.5 ألف', tag: '#ذكاء_مفتوح', icon: 'Cpu' },
  { id: 'c4', name: 'أنظمة التشغيل المفتوحة ولينكس', members: '6.7 ألف', tag: '#لينكس_عربي', icon: 'Terminal' }
];
