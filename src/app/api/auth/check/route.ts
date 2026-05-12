import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "none";

  // Direct comparison without verifyAuth
  const content = await getContent();
  const storedToken = content.admin.token;

  const expected = `Bearer ${storedToken}`;
  const exactMatch = authHeader === expected;

  return NextResponse.json({
    direct: {
      authHeaderLen: authHeader.length,
      expectedLen: expected.length,
      authHeader: authHeader,
      expected: expected,
      exactMatch: exactMatch,
      charByChar: authHeader.split("").map((c, i) => ({
        i,
        a: c.charCodeAt(0),
        e: i < expected.length ? expected.charCodeAt(i) : null,
      })).filter(x => x.a !== x.e && x.e !== null).slice(0, 5),
    },
    contentToken: storedToken || "MISSING",
    envUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "MISSING",
    envKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "MISSING",
  });
}
