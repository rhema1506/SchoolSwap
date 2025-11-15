export interface Rating {
  id: number;
  user: number | string;
  score: number;
  comment?: string;
  created_at?: string;
}

export interface Product {
  id: number;
  seller: number | string;
  title: string;
  description?: string;
  condition: "new" | "used";
  category: "books" | "stationery" | "uniforms" | "gadgets" | "other";
  image?: string | null;
  city?: string;
  created_at?: string;
  ratings?: Rating[];
}
