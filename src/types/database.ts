export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string; created_at: string; name: string; slug: string;
          description: string; price: number; original_price: number | null;
          images: string[]; category: string; weight: string; stock: number;
          is_active: boolean; is_featured: boolean; tags: string[];
          ingredients: string | null; nutritional_info: Json | null;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string; created_at: string; order_number: string; user_id: string | null;
          customer_name: string; customer_email: string; customer_phone: string;
          shipping_address: Json; items: Json; subtotal: number; shipping: number;
          tax: number; total: number; status: string; payment_status: string;
          razorpay_order_id: string | null; razorpay_payment_id: string | null;
          notes: string | null;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      blogs: {
        Row: {
          id: string; created_at: string; updated_at: string; title: string;
          slug: string; excerpt: string; content: string; cover_image: string;
          author: string; category: string; tags: string[]; is_published: boolean;
          views: number; read_time: number;
        };
        Insert: Omit<Database['public']['Tables']['blogs']['Row'], 'id' | 'created_at' | 'updated_at' | 'views'>;
        Update: Partial<Database['public']['Tables']['blogs']['Insert']>;
      };
      site_content: {
        Row: { id: string; page: string; section: string; key: string; value: Json; updated_at: string };
        Insert: Omit<Database['public']['Tables']['site_content']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_content']['Insert']>;
      };
      subscribers: {
        Row: { id: string; created_at: string; email: string; is_active: boolean };
        Insert: Omit<Database['public']['Tables']['subscribers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['subscribers']['Insert']>;
      };
      reviews: {
        Row: {
          id: string; created_at: string; product_id: string; customer_name: string;
          rating: number; comment: string; is_approved: boolean;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
    };
  };
}

export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type Blog = Database['public']['Tables']['blogs']['Row'];
export type SiteContent = Database['public']['Tables']['site_content']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
