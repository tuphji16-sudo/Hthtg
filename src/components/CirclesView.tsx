import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Cpu, 
  Lock, 
  Plus, 
  Check, 
  Search,
  MessageSquare
} from 'lucide-react';
import { trendingCircles } from '../data/mockData';

interface CirclesViewProps {
  onSelectTag: (tag: string) => void;
}

export const CirclesView: React.FC<CirclesViewProps> = ({ onSelectTag }) => {
  const [joinedCircles, setJoinedCircles] = useState<string[]>(['c1', 'c2']);
  const [filterQuery, setFilterQuery] = useState('');

  const circlesData = [
    {
      id: 'c1',
      name: 'مجتمع الخصوصية والتشفير العربي',
      description: 'مساحة متخصصة في نشر ثقافة حماية البيانات، تشفير الاتصالات، وأدوات الحماية ضد التجسس التجاري والحكومي.',
      members: '14,200',
      tag: 'تشفير_حر',
      icon: ShieldCheck,
      badge: 'مشفر بالكامل',
      postsToday: 38,
    },
    {
      id: 'c2',
      name: 'هندسة الأداء والسرعة القصوى',
      description: 'نقاشات حول تسريع التطبيقات، تقليل استهلاك الذاكرة، وبناء واجهات خفيفة لا تثقل كاهل الأجهزة.',
      members: '8,950',
      tag: 'تطوير_نظيف',
      icon: Zap,
      badge: 'أداء فائق',
      postsToday: 21,
    },
    {
      id: 'c3',
      name: 'الذكاء الاصطناعي المحلي والمفتوح',
      description: 'تشغيل نماذج الذكاء الاصطناعي محلياً على جهازك دون إرسال بياناتك لخوادم طرف ثالث سحابية.',
      members: '11,400',
      tag: 'ذكاء_مفتوح',
      icon: Cpu,
      badge: 'مفتوح المصدر',
      postsToday: 45,
    },
    {
      id: 'c4',
      name: 'عشاق لينكس والأنظمة الحرة',
      description: 'تبادل الخبرات حول توزيعات لينكس الآمنة (Debian, Arch, Qubes, Tails) والتخلص من احتكار الشركات.',
      members: '6,780',
      tag: 'لينكس_عربي',
      icon: Terminal,
      badge: 'حرية كاملة',
      postsToday: 19,
    },
  ];

  const toggleJoin = (id: string) => {
    if (joinedCircles.includes(id)) {
      setJoinedCircles(joinedCircles.filter(c => c !== id));
    } else {
      setJoinedCircles([...joinedCircles, id]);
    }
  };

  const filtered = circlesData.filter(c => 
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-500/20 text-right">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-white">الدوائر والمجتمعات الحرة</h2>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
          انضم إلى مجتمعات تناسب اهتماماتك. في منصة أثير، لا نستخدم خوارزميات لترتيب المنشورات لخدمة المعلنين؛ أنت من يحدد ما يراه بحرية تامة.
        </p>
      </div>

      {/* Filter search */}
      <div className="relative">
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="ابحث عن دائرة أو اهتمام معين..."
          className="w-full bg-neutral-900/80 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Circles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {filtered.map((circle) => {
          const Icon = circle.icon;
          const isJoined = joinedCircles.includes(circle.id);
          return (
            <div
              key={circle.id}
              className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between text-right space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/40">
                    {circle.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">{circle.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {circle.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-neutral-500">
                  {circle.members} عضو • {circle.postsToday} منشور اليوم
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectTag(circle.tag)}
                    className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] transition-colors"
                  >
                    استعراض
                  </button>

                  <button
                    onClick={() => toggleJoin(circle.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                      isJoined
                        ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/30'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>منضم</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>انضمام</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
