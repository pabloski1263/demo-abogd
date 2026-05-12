import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export async function GET(req: NextRequest) {
  const content = await getContent();
  const storedToken = (content.admin as any)?.token || "none";
  const authHeader = req.headers.get("authorization") || "none";
  const cookieHeader = req.headers.get("cookie") || "none";

  return NextResponse.json({
    stored_token_prefix: storedToken.substring(0, 10),
    auth_header_prefix: authHeader.substring(0, 25),
    cookie_prefix: cookieHeader.substring(0, 50),
    match_header: authHeader === `Bearer ${storedToken}`,
  });
}
