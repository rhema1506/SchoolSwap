// ==========================
// User Types
// ==========================

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  school?: string;
  createdAt: string;
  updatedAt: string;
}

// For registration and login forms
export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterUserData extends UserCredentials {
  username: string;
  school?: string;
}

// ==========================
// Auth Types
// ==========================

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterUserData) => Promise<void>;
  logout: () => void;
}

// ==========================
// Product Types
// ==========================

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  ownerId: string;
  ownerName?: string;
  createdAt: string;
}

export interface CreateProductPayload {
  title: string;
  description: string;
  category: string;
  image?: File | null;
}

// ==========================
// Chat / Messaging Types
// ==========================

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  user1: User;
  user2: User;
  lastMessage?: ChatMessage;
}

// ==========================
// Notifications
// ==========================

export interface Notification {
  id: string;
  type: "message" | "trade" | "system";
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

// ==========================
// Reviews & Ratings
// ==========================

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  stars: number;
  comment: string;
  createdAt: string;
}

export interface RatingSummary {
  average: number;
  count: number;
}

// ==========================
// Generic API Response Types
// ==========================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ==========================
// Generic Fetch State Type
// ==========================

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// ==========================
// Language support types (i18next)
// ==========================

export type SupportedLanguage = "en" | "ar" | "fr" | "de";
