"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ImageUploader from "@/components/admin/ImageUploader";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

export default function SiteAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  const site = content.site;

  const update = (field: string, value: string) => {
    const updated = structuredClone(content);
    const keys = field.split(".");
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
    obj[keys[keys.length - 1]] = value;
    setContent(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await adminFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) toast.success("Configuración guardada");
      else toast.error("Error al guardar");
    } catch { toast.error("Error de conexión"); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-white">Configuración del Sitio</h1>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 disabled:opacity-50 transition-all text-sm">
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Nombre del sitio</label>
          <input value={site.name} onChange={(e) => update("site.name", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Subtítulo</label>
          <input value={site.subtitle} onChange={(e) => update("site.subtitle", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Nombre legal (copyright)</label>
          <input value={site.legal_name} onChange={(e) => update("site.legal_name", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <ImageUploader
            currentImage={site.favicon}
            onImageChange={(url) => update("site.favicon", url)}
            label="Favicon (icono de pestaña)"
          />
        </div>
        <div>
          <ImageUploader
            currentImage={site.logo}
            onImageChange={(url) => update("site.logo", url)}
            label="Logo del sitio"
          />
        </div>

        <div className="pt-6 border-t border-white/5">
          <h2 className="text-sm font-semibold text-white mb-3">Credenciales de Admin</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input value={content.admin.email} onChange={(e) => update("admin.email", e.target.value)} className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Contraseña</label>
              <input value={content.admin.password} onChange={(e) => update("admin.password", e.target.value)} type="text" className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">Al cambiar la contraseña, deberás iniciar sesión nuevamente.</p>
        </div>
      </div>
    </div>
  );
}
