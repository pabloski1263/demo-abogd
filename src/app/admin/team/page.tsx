"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ImageUploader from "@/components/admin/ImageUploader";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

export default function TeamAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    adminFetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  const members = content.team.members;

  const updateItem = (id: string, field: string, value: string) => {
    const updated = structuredClone(content);
    const item = updated.team.members.find((m) => m.id === id);
    if (item) (item as any)[field] = value;
    setContent(updated);
  };

  const addItem = () => {
    const updated = structuredClone(content);
    updated.team.members.push({ id: `member-${Date.now()}`, name: "Nuevo Miembro", role: "Cargo", description: "", image: "" });
    setContent(updated);
  };

  const removeItem = (id: string) => {
    const updated = structuredClone(content);
    updated.team.members = updated.team.members.filter((m) => m.id !== id);
    setContent(updated);
  };

  const handleSave = async () => {
    try {
      const res = await adminFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) toast.success("Equipo guardado");
      else toast.error("Error al guardar");
    } catch { toast.error("Error de conexión"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-white">Editar Equipo</h1>
        <div className="flex gap-3">
          <button onClick={addItem} className="px-4 py-2 border border-white/10 text-gray-300 rounded-lg hover:border-gold-500/50 text-sm">+ Agregar</button>
          <button onClick={handleSave} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 transition-all text-sm">Guardar Cambios</button>
        </div>
      </div>

      <div className="space-y-4">
        {members.map((member, i) => (
          <div key={member.id} className="bg-navy-800/50 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500">#{i + 1}</span>
              <button onClick={() => removeItem(member.id)} className="text-xs text-red-400 hover:text-red-300">Eliminar</button>
            </div>
            <div className="space-y-4">
              <ImageUploader
                currentImage={member.image}
                onImageChange={(url) => updateItem(member.id, "image", url)}
                label="Foto del miembro"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Nombre</label>
                  <input value={member.name} onChange={(e) => updateItem(member.id, "name", e.target.value)} className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Cargo</label>
                  <input value={member.role} onChange={(e) => updateItem(member.id, "role", e.target.value)} className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-400 mb-1">Descripción</label>
                  <textarea value={member.description} onChange={(e) => updateItem(member.id, "description", e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
