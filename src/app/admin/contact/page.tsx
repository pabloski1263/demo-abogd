"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

export default function ContactAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [data, setData] = useState<SiteContent | null>(null);

  useEffect(() => {
    adminFetch("/api/content").then((r) => r.json()).then((c) => { setContent(c); setData(c); });
  }, []);

  if (!content || !data) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  const updateField = (path: string, value: string) => {
    const updated = structuredClone(data);
    const keys = path.split(".");
    let current: any = updated;
    for (let i = 0; i < keys.length - 1; i++) current = current[keys[i]];
    current[keys[keys.length - 1]] = value;
    setData(updated);
  };

  const handleSave = async () => {
    try {
      const res = await adminFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { toast.success("Contacto guardado"); setContent(data); }
      else toast.error("Error al guardar");
    } catch { toast.error("Error de conexión"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-white">Editar Contacto</h1>
        <button onClick={handleSave} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 transition-all text-sm">Guardar Cambios</button>
      </div>

      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Dirección</label>
          <input value={data.contact.address} onChange={(e) => updateField("contact.address", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Teléfono</label>
          <input value={data.contact.phone} onChange={(e) => updateField("contact.phone", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Email</label>
          <input value={data.contact.email} onChange={(e) => updateField("contact.email", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">WhatsApp (número para botón en navbar)</label>
          <input value={data.contact.whatsapp} onChange={(e) => updateField("contact.whatsapp", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" placeholder="+56912345678" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Horario</label>
          <input value={data.contact.hours} onChange={(e) => updateField("contact.hours", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
      </div>
    </div>
  );
}
