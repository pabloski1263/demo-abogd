"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ImageUploader from "@/components/admin/ImageUploader";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

export default function AboutAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
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
    setSaving(true);
    try {
      const res = await adminFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { toast.success("Contenido guardado"); setContent(data); }
      else toast.error("Error al guardar");
    } catch { toast.error("Error de conexión"); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-white">Editar Nosotros</h1>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 disabled:opacity-50 transition-all text-sm">
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="space-y-4 max-w-2xl mb-8">
        <ImageUploader
          currentImage={data.about.image}
          onImageChange={(url) => updateField("about.image", url)}
          label="Imagen de la sección"
        />
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Título</label>
          <input value={data.about.title} onChange={(e) => updateField("about.title", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Descripción</label>
          <textarea value={data.about.description} onChange={(e) => updateField("about.description", e.target.value)} rows={5} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Misión</label>
          <textarea value={data.about.mission} onChange={(e) => updateField("about.mission", e.target.value)} rows={3} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Visión</label>
          <textarea value={data.about.vision} onChange={(e) => updateField("about.vision", e.target.value)} rows={3} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none" />
        </div>
      </div>
    </div>
  );
}
