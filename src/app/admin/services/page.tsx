"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

const defaultIcon = "building";

export default function ServicesAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  const items = content.services.items;

  const updateItem = (id: string, field: string, value: string) => {
    const updated = structuredClone(content);
    const item = updated.services.items.find((i) => i.id === id);
    if (item) {
      (item as any)[field] = value;
    }
    setContent(updated);
  };

  const addItem = () => {
    const updated = structuredClone(content);
    const newId = `service-${Date.now()}`;
    updated.services.items.push({
      id: newId,
      title: "Nuevo Servicio",
      description: "Descripción del servicio",
      icon: defaultIcon,
    });
    setContent(updated);
  };

  const removeItem = (id: string) => {
    const updated = structuredClone(content);
    updated.services.items = updated.services.items.filter((i) => i.id !== id);
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
      if (res.ok) toast.success("Servicios guardados");
      else toast.error("Error al guardar");
    } catch {
      toast.error("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-white">Editar Servicios</h1>
        <div className="flex gap-3">
          <button onClick={addItem} className="px-4 py-2 border border-white/10 text-gray-300 rounded-lg hover:border-gold-500/50 transition-all text-sm">
            + Agregar
          </button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 disabled:opacity-50 transition-all text-sm">
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={item.id} className="bg-navy-800/50 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500">#{i + 1}</span>
              <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-300">
                Eliminar
              </button>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Título</label>
                <input
                  value={item.title}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Descripción</label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Icono</label>
                <select
                  value={item.icon}
                  onChange={(e) => updateItem(item.id, "icon", e.target.value)}
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm"
                >
                  <option value="building">Corporativo</option>
                  <option value="chart">Tributario</option>
                  <option value="users">Laboral</option>
                  <option value="scale">Civil</option>
                  <option value="briefcase">Comercial</option>
                  <option value="shield">Regulatorio</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
