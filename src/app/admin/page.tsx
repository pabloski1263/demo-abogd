"use client";

import { useState, useEffect } from "react";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("/api/content")
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;
  }

  if (!content) return <p className="text-red-400">Error al cargar contenido</p>;

  const cards = [
    { label: "Hero", desc: "Texto, botones y tarjetas animadas", href: "/admin/hero", count: content.hero.cards.length },
    { label: "Servicios", desc: "6 áreas de práctica", href: "/admin/services", count: content.services.items.length },
    { label: "Nosotros", desc: "Historia, misión, visión, valores", href: "/admin/about", count: 4 },
    { label: "Equipo", desc: "Miembros del equipo", href: "/admin/team", count: content.team.members.length },
    { label: "Contacto", desc: "Dirección, teléfono, email", href: "/admin/contact", count: 4 },
    { label: "Estadísticas", desc: "Contadores numéricos", href: "/admin/stats", count: content.stats.items.length },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Bienvenido al panel de administración de ABG Abogados.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="block bg-navy-800/50 border border-white/5 rounded-xl p-6 hover:border-gold-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold group-hover:text-gold-500 transition-colors">{card.label}</h3>
              <span className="text-xs text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded-full">{card.count}</span>
            </div>
            <p className="text-sm text-gray-500">{card.desc}</p>
          </a>
        ))}
      </div>

      <div className="mt-12 p-4 bg-navy-800/30 border border-white/5 rounded-xl">
        <h3 className="text-sm font-semibold text-white mb-2">Credenciales de Admin</h3>
        <p className="text-xs text-gray-500">
          Email: {content.admin.email} | Contraseña: {content.admin.password}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          Puedes cambiar estas credenciales editando el archivo data/content.json directamente.
        </p>
      </div>
    </div>
  );
}
