import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Wifi, 
  Lock, 
  TrendingUp, 
  Hash, 
  MessageSquare,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { trendingCircles, sampleUsers } from '../data/mockData';
import { User, PrivacyStats } from '../types';

interface SidebarRightProps {
  stats: PrivacyStats;
  onOpenChatWith: (user: User) => void;
  onSelectTag: (tag: string) => void;
  selectedTag: string | null;
}

export const SidebarRight: React.FC<SidebarRightProps> = ({
  stats,
  onOpenChatWith,
  onSelectTag,
  selectedTag,
}) => {
  const onlineContacts = [
    sampleUsers.sara,
    sampleUsers.tariq,
    sampleUsers.leila,
  ];

  return (
    <aside className="w-full space-y-4">
      
      {/* Live Speed & Privacy HUD (عداد السرعة والخصوصية الحي) */}
      <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>لوحة الأداء والأمان الحي</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800/40">
            فائق السرعة
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Latency */}
          <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/60 text-right">
            <div className="flex items-center justify-between text-neutral-400 text-[11px] mb-1">
              <span>زمن الاستجابة</span>
              <Zap className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg font-mono font-black text-emerald-400 flex items-baseline gap-1">
              <span>{stats.renderLatencyMs.toFixed(1)}</span>
              <span className="text-xs font-normal text-neutral-400">ms</span>
            </div>
            <span className="text-[9px] text-neutral-500 font-medium">أسرع بـ 15x من فيسبوك</span>
          </div>

          {/* Trackers Blocked */}
          <div className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/60 text-right">
            <div className="flex items-center justify-between text-neutral-400 text-[11px] mb-1">
              <span>محاولات تتبع تم حجبها</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-mono font-black text-white">
              {stats.trackersBlocked}
            </div>
            <span className="text-[9px] text-emerald-400/90 font-medium">صفر تتبع إعلاني</span>
          </div>
        </div>

        {/* Security Specs */}
        <div className="space-y-1.5 text-[11px] border-t border-neutral-800/60 pt-2.5">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>معيار التشفير:</span>
            </span>
            <span className="font-mono text-neutral-200 text-[10px]">{stats.encryptionKeyStrength}</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span>البيانات الموفرة:</span>
            </span>
            <span className="font-mono text-emerald-400 text-[10px] font-semibold">{stats.bandwidthSavedKB} KB</span>
          </div>
        </div>
      </div>

      {/* Trending Pure Circles / المجتمعات بدون إعلانات مدفوعة */}
      <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/70 space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            الدوائر والوسوم الحرة
          </h4>
          <span className="text-[10px] text-neutral-500">زمني فقط</span>
        </div>

        <div className="space-y-1.5">
          {trendingCircles.map((circle) => {
            const isSelected = selectedTag === circle.tag.replace('#', '');
            return (
              <div
                key={circle.id}
                onClick={() => onSelectTag(isSelected ? '' : circle.tag.replace('#', ''))}
                className={`p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between text-right border ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-white'
                    : 'bg-neutral-950/40 hover:bg-neutral-800/50 border-neutral-800/40 text-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1 font-semibold text-xs text-neutral-200">
                    <Hash className="w-3 h-3 text-emerald-400" />
                    <span>{circle.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{circle.members} متفاعل</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Encrypted Instant Contacts / جهات الاتصال المشفرة */}
      <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/70 space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            محادثات مشفرة مباشرة (P2P)
          </h4>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            متاح
          </span>
        </div>

        <div className="space-y-1">
          {onlineContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onOpenChatWith(contact)}
              className="p-2 rounded-xl hover:bg-neutral-800/60 transition-colors cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-8 h-8 rounded-lg object-cover border border-neutral-700 group-hover:border-emerald-500/50"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-neutral-900"></div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-300 transition-colors">
                    {contact.name}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500">{contact.handle}</p>
                </div>
              </div>

              <div className="p-1 rounded-lg bg-neutral-800/80 group-hover:bg-emerald-950 text-neutral-400 group-hover:text-emerald-400 transition-colors">
                <Lock className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
