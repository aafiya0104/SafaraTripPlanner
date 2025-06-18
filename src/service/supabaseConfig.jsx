import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_URL;

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
