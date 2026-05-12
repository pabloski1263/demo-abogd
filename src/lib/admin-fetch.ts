export async function adminFetch(url: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("abg_token") : null;

  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...options, headers });

  // If 401, the token/cookie expired
  if (res.status === 401 && typeof window !== "undefined") {
    sessionStorage.removeItem("abg_token");
    window.location.href = "/admin/login";
    throw new Error("No autorizado");
  }

  return res;
}
