"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

export default function StatsAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    adminFetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  const items = content.stats.items;

  const updateItem = (index: number, field: string, value: string | number) => {
    const updated = structuredClone(content);
    (updated.stats.items[index] as any)[field] = value;
    setContent(updated);
  };

  const handleSave = async () => {
    try {
      const res = await adminFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) toast.success("Estadísticas guardadas");
      else toast.error("Error al guardar");
    } catch { toast.error("Error de conexión"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-white">Editar Estadísticas</h1>
        <button onClick={handleSave} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 transition-all text-sm">Guardar Cambios</button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((stat, i) => (
          <div key={i} className="bg-navy-800/50 border border-white/5 rounded-xl p-5">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Valor</label>
                <input type="number" value={stat.value} onChange={(e) => updateItem(i, "value", Number(e.target.value))} className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Sufijo</label>
                <input value={stat.suffix} onChange={(e) => updateItem(i, "suffix", e.target.value)} className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Etiqueta</label>
                <input value={stat.label} onChange={(e) => updateItem(i, "label", e.target.value)} className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
