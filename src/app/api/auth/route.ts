import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 });
    }

    if (await validateCredentials(email, password)) {
      const token = await createSession();
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
