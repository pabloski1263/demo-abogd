import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function POST() {
  try {
    await destroySession();
  } catch {
    // ignore
  }
  return NextResponse.json({ success: true });
}
