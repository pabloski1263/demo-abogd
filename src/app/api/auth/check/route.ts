import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authenticated = await verifyAuth(req);

  let tokenInDb;
  try {
    const c = await getContent();
    tokenInDb = c.admin.token || "MISSING";
  } catch {
    tokenInDb = "ERROR";
  }

  const authHeader = req.headers.get("authorization") || "none";

  if (!authenticated) {
    return NextResponse.json({
      error: "No autorizado",
      debug: {
        authHeaderPrefix: authHeader.substring(0, 50),
        tokenInDb: tokenInDb,
        envUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "MISSING",
        envKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "MISSING",
      },
    }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
