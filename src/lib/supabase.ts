import { createClient, SupabaseClient } from "@supabase/supabase-js";

function getUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

function getServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

export function getSupabaseAdmin(): SupabaseClient {
  return createClient(getUrl(), getServiceKey(), {
    auth: { persistSession: false },
    global: {
      headers: { "Cache-Control": "no-cache, no-store" },
      fetch: (url, opts) =>
        fetch(url, { ...opts, cache: "no-store" }),
    },
  });
}

export function getSupabase(): SupabaseClient {
  return createClient(getUrl(), process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "", {
    auth: { persistSession: false },
  });
}
