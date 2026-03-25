import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Create client with fallback - won't crash build
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// Server-side admin client - only use when credentials are available
export const createAdminClient = (): SupabaseClient<Database> => {
  const adminUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const adminKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!adminUrl || !adminKey) {
    console.warn(
      "Supabase admin credentials not configured. Admin features will be unavailable.",
    );
    // Return a dummy client - will fail gracefully
    return createClient<Database>(
      "https://placeholder.supabase.co",
      "placeholder-key",
    );
  }

  return createClient<Database>(adminUrl, adminKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
};
