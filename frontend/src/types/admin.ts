export interface AdminStats {
  total_users: number;
  total_products: number;
  total_chats: number;
  total_messages: number;
  users_last_7_days: {
    date: string;
    users: number;
  }[];
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
}
