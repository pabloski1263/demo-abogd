"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { adminFetch } from "@/lib/admin-fetch";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }
    adminFetch("/api/content")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
        }
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setChecking(false));
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 border-r border-white/5 p-6 hidden lg:block">
        <a href="/admin" className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center">
            <span className="text-navy-900 font-serif font-bold text-xs">ABG</span>
          </div>
          <div>
            <p className="text-sm font-serif font-semibold text-white leading-tight">Admin</p>
            <p className="text-[8px] text-gold-500 tracking-[3px] uppercase">Panel</p>
          </div>
        </a>

        <nav className="space-y-1">
          {[
            { label: "Dashboard", href: "/admin" },
            { label: "Sitio", href: "/admin/site" },
            { label: "Chat", href: "/admin/chat" },
            { label: "Hero", href: "/admin/hero" },
            { label: "Servicios", href: "/admin/services" },
            { label: "Nosotros", href: "/admin/about" },
            { label: "Equipo", href: "/admin/team" },
            { label: "Contacto", href: "/admin/contact" },
            { label: "Estadísticas", href: "/admin/stats" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-gold-500/10 text-gold-500"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <a
            href="/"
            target="_blank"
            className="block text-center px-4 py-2 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white hover:border-gold-500/50 transition-all"
          >
            Ver sitio →
          </a>
        </div>
      </aside>

      <Toaster position="top-right" toastOptions={{ style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between lg:hidden mb-6">
          <a href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center">
              <span className="text-navy-900 font-serif font-bold text-xs">ABG</span>
            </div>
            <span className="text-sm font-semibold text-white">Admin</span>
          </a>
          <div className="flex gap-2">
            <a href="/" target="_blank" className="px-3 py-1.5 border border-white/10 rounded text-xs text-gray-400">
              Sitio
            </a>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
