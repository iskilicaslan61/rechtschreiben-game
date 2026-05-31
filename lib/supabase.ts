import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const globalForSupabase = globalThis as unknown as { supabase: ReturnType<typeof createClient> };

export const supabase = globalForSupabase.supabase ?? createClient(url, key);

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase;
