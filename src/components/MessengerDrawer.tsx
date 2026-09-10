import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Lock, 
  ShieldCheck, 
  Clock, 
  Key, 
  CheckCheck,
  Ghost,
  PhoneOff,
  Sparkles
} from 'lucide-react';
import { ChatThread, User } from '../types';

interface MessengerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chats: ChatThread[];
  currentUser: User;
  onSendMessage: (chatId: string, text: string, selfDestructSec?: number) => void;
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export const MessengerDrawer: React.FC<MessengerDrawerProps> = ({
  isOpen,
  onClose,
  chats,
  currentUser,
  onSendMessage,
  activeChatId,
  onSelectChat,
}) => {
  const [messageInput, setMessageInput] = useState('');
  const [disappearingSec, setDisappearingSec] = useState<number | undefined>(undefined);

  if (!isOpen) return null;

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChat) return;
    onSendMessage(activeChat.id, messageInput.trim(), disappearingSec);
    setMessageInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="w-full max-w-lg h-full bg-[#0e121a] border-r border-neutral-800 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>الرسائل المشفرة طرف لطرف</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                  E2EE
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400">مفاتيح التشفير مخزنة على جهازك فقط (لا خوادم وسيطة)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contacts Horizontal Switcher */}
        <div className="p-2.5 bg-neutral-950/60 border-b border-neutral-800/80 flex items-center gap-2 overflow-x-auto">
          {chats.map((c) => {
            const isSelected = c.id === activeChat?.id;
            return (
              <button
                key={c.id}
                onClick={() => onSelectChat(c.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <img
                  src={c.contact.avatar}
                  alt={c.contact.name}
                  className="w-5 h-5 rounded-md object-cover"
                />
                <span>{c.contact.name}</span>
                {c.unreadCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Contact Security Banner */}
        {activeChat && (
          <div className="px-4 py-2 bg-emerald-950/20 border-b border-emerald-500/20 flex items-center justify-between text-[11px] text-neutral-300">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <Key className="w-3 h-3" />
              <span>مفتاح الجلسة:</span>
              <span className="text-neutral-300 font-mono text-[10px]">{activeChat.contact.publicFingerprint}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <select
                value={disappearingSec ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setDisappearingSec(val ? Number(val) : undefined);
                }}
                className="bg-neutral-900 text-neutral-300 border border-neutral-800 rounded px-1.5 py-0.5 text-[10px]"
              >
                <option value="">دائم</option>
                <option value="30">مسح بعد 30 ث</option>
                <option value="300">مسح بعد 5 د</option>
                <option value="86400">مسح بعد 24 س</option>
              </select>
            </div>
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {activeChat?.messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed text-right relative shadow-md ${
                    isMe
                      ? 'bg-emerald-600 text-black font-medium rounded-br-none'
                      : 'bg-neutral-800 text-neutral-100 rounded-bl-none border border-neutral-700/50'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                    isMe ? 'text-black/70' : 'text-neutral-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    <Lock className="w-2.5 h-2.5" />
                    {isMe && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="اكتب رسالة مشفرة..."
            className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-bold transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
