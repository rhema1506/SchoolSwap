export interface Notification {
  id: number;
  type: string;
  title: string;
  body: string;
  chat_id: number;
  text: string;
  is_read: boolean;
  created_at: string;
  sender_username: string;
}