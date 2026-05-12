import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? "set" : "not set";
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "set" : "not set";
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ? "set" : "not set";

  let content;
  let adminToken;
  let dbError;
  try {
    content = await getContent();
    adminToken = (content.admin as any)?.token || "MISSING";
  } catch (e: any) {
    content = null;
    adminToken = "ERROR";
    dbError = e.message;
  }

  const authHeader = req.headers.get("authorization") || "none";
  const authHeaderLower = req.headers.get("Authorization") || "none";

  let directDbToken;
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.from("site_content").select("data").eq("id", 1).single();
    if (error) directDbToken = "DB_ERR: " + error.message;
    else directDbToken = (data.data as any)?.admin?.token || "MISSING_IN_DB";
  } catch (e: any) {
    directDbToken = "EXCEPTION: " + e.message;
  }

  return NextResponse.json({
    env: { supabaseUrl, supabaseAnon, serviceRole },
    content_loaded: !!content,
    getContent_token: adminToken,
    header_authorization: authHeader.substring(0, 60),
    header_Authorization: authHeaderLower.substring(0, 60),
    direct_db_token: directDbToken,
    match: authHeader === `Bearer ${adminToken}`,
    match_lower: authHeaderLower === `Bearer ${adminToken}`,
  });
}
