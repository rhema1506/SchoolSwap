
export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;     // ISO string date
  read: boolean;
  type: "text" | "image" | "file"; 
  fileUrl?: string;       // only used if type !== text
  fileName?: string;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastOnline?: string;
}

export interface ChatConversation {
  id: string;
  user1: ChatUser;
  user2: ChatUser;
  lastMessage: ChatMessage | null;
  updatedAt: string;
}

export interface SendMessagePayload {
  chatId: string;
  receiverId: string;
  content: string;
  type?: "text" | "image" | "file";
  file?: File;
}

export interface TypingStatus {
  chatId: string;
  userId: string;
  isTyping: boolean;
}

export interface MessageStatusUpdate {
  messageId: string;
  chatId: string;
  userId: string;
  status: "sent" | "delivered" | "read";
}

export interface CreateChatPayload {
  userId: string; // create chat with user
}

export interface ChatApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
