import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const admin = getSupabaseAdmin();

  // Test 1: Read current data
  const { data: readData, error: readError } = await admin
    .from("site_content")
    .select("data")
    .eq("id", 1)
    .single();

  const currentToken = readData?.data?.admin?.token || "MISSING";

  // Test 2: Write a test marker
  const testId = Date.now().toString(36);
  const testContent = { ...readData?.data, _test: testId };
  const { error: writeError } = await admin
    .from("site_content")
    .upsert({ id: 1, data: testContent, updated_at: new Date().toISOString() });

  // Test 3: Read back to verify write
  const { data: verifyData } = await admin
    .from("site_content")
    .select("data")
    .eq("id", 1)
    .single();
  const verifyTest = verifyData?.data?._test;

  return NextResponse.json({
    currentToken,
    testId,
    verifyTest,
    writeError: writeError?.message || null,
    readError: readError?.message || null,
    writeWorked: testId === verifyTest,
  });
}
