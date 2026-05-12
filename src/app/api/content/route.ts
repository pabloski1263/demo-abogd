import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { verifyAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAuth(req))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await req.json();
    await saveContent(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
