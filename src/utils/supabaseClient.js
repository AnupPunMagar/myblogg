import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Doesn't throw, so the site still renders with a clear console warning
  // rather than a blank screen if env vars haven't been set yet.
  console.warn(
    "[supabase] REACT_APP_SUPABASE_URL and/or REACT_APP_SUPABASE_ANON_KEY are not set. " +
      "Copy .env.example to .env.local and fill in your project's values (see README)."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
