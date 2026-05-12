import { cookies } from "next/headers";
import { getContent, saveContent } from "./content";

const AUTH_COOKIE = "demo-abg-auth";

function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 40; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function verifyAuth(req?: Request): Promise<boolean> {
  const content = await getContent();
  const storedToken = (content.admin as any).token;

  if (!storedToken) return false;

  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader === `Bearer ${storedToken}`) return true;
  }

  try {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get(AUTH_COOKIE)?.value;
    if (cookieToken === storedToken) return true;
  } catch {
    // cookies() may throw
  }

  return false;
}

export async function createSession(): Promise<string> {
  const token = generateToken();
  const content = await getContent();
  (content.admin as any).token = token;
  await saveContent(content);

  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return token;
}

export async function destroySession(): Promise<void> {
  try {
    const content = await getContent();
    delete (content.admin as any).token;
    await saveContent(content);

    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE, "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  } catch {
    // ignore
  }
}

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  const content = await getContent();
  return email === content.admin.email && password === content.admin.password;
}
