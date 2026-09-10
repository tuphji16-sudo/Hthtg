export type PrivacyScope = 'public' | 'friends' | 'circle' | 'ghost';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  isVerified?: boolean;
  privacyBadge: string;
  publicFingerprint: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  joinedDate: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    isGhost?: boolean;
  };
  content: string;
  createdAt: string;
  likes: number;
  userLiked?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'poll';
  pollOptions?: PollOption[];
  userVotedOptionId?: string;
  createdAt: string;
  timestamp: number;
  reactions: {
    like: number;
    respect: number;
    insight: number;
    shield: number;
    fast: number;
  };
  userReaction?: string | null;
  comments: Comment[];
  sharesCount: number;
  privacyScope: PrivacyScope;
  isGhost: boolean;
  selfDestructMinutes?: number;
  expiresAt?: number;
  tags: string[];
  strippedExif: boolean;
  isBookmarked?: boolean;
}

export interface Story {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    isGhost?: boolean;
  };
  mediaUrl: string;
  text?: string;
  createdAt: string;
  expiresAt: string;
  hasViewed?: boolean;
  viewsCount: number;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isEncrypted: boolean;
  selfDestructInSeconds?: number;
}

export interface ChatThread {
  id: string;
  contact: User;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: DirectMessage[];
  isLockedWithPin?: boolean;
}

export interface PrivacyStats {
  trackersBlocked: number;
  bandwidthSavedKB: number;
  renderLatencyMs: number;
  encryptionKeyStrength: string;
  ghostModeActive: boolean;
  zeroTelemetryVerified: boolean;
}

export interface AndroidProFeatures {
  quantumEncryptionEnabled: boolean;
  meshP2PEnabled: boolean;
  biometricLockEnabled: boolean;
  iconCloak: 'default' | 'calculator' | 'notes' | 'clock';
  offlineSyncEnabled: boolean;
  hdZeroCompression: boolean;
  antiScreenshot: boolean;
  unlockedVersion: string;
}

export interface AndroidPermissions {
  camera: boolean;
  microphone: boolean;
  notifications: boolean;
  biometrics: boolean;
  location: boolean;
}

