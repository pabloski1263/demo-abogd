"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ImageUploader from "@/components/admin/ImageUploader";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent, HeroCard } from "@/lib/content";

export default function HeroAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    adminFetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  const hero = content.hero;

  const updateField = (field: string, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const updated = structuredClone(prev);
      const keys = field.split(".");
      let obj: any = updated.hero;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const updateCard = (id: string, field: string, value: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const updated = structuredClone(prev);
      const card = updated.hero.cards.find((c: HeroCard) => c.id === id);
      if (card) (card as any)[field] = value;
      return updated;
    });
  };

  const addCard = () => {
    setContent((prev) => {
      if (!prev) return prev;
      const updated = structuredClone(prev);
      updated.hero.cards.push({ id: `card-${Date.now()}`, title: "Nueva Área", description: "Descripción...", image: "" });
      return updated;
    });
  };

  const removeCard = (id: string) => {
    setContent((prev) => {
      if (!prev) return prev;
      const updated = structuredClone(prev);
      updated.hero.cards = updated.hero.cards.filter((c: HeroCard) => c.id !== id);
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      const res = await adminFetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) toast.success("Contenido guardado");
      else toast.error("Error al guardar");
    } catch { toast.error("Error de conexión"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-bold text-white">Editar Hero</h1>
        <button onClick={handleSave} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 transition-all text-sm">
          Guardar Cambios
        </button>
      </div>

      <div className="space-y-6 max-w-3xl mb-12">
        <h2 className="text-lg font-serif text-white/80 border-b border-white/5 pb-2">Contenido Principal</h2>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Título principal (usa &lt;br/&gt; para saltos)</label>
          <input value={hero.title} onChange={(e) => updateField("title", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Subtítulo</label>
          <textarea value={hero.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} rows={3} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Texto botón principal</label>
            <input value={hero.cta_primary.text} onChange={(e) => updateField("cta_primary.text", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Link botón principal</label>
            <input value={hero.cta_primary.link} onChange={(e) => updateField("cta_primary.link", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Texto botón secundario</label>
            <input value={hero.cta_secondary.text} onChange={(e) => updateField("cta_secondary.text", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Link botón secundario</label>
            <input value={hero.cta_secondary.link} onChange={(e) => updateField("cta_secondary.link", e.target.value)} className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-400 mb-1.5">Imagen de fondo del hero</label>
            <ImageUploader
              currentImage={hero.background_image}
              onImageChange={(url) => updateField("background_image", url)}
            />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 max-w-4xl mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif text-white/80 border-b border-white/5 pb-2">Tarjetas del Hero (CardStack)</h2>
          <button onClick={addCard} className="px-4 py-2 border border-white/10 text-gray-300 rounded-lg hover:border-gold-500/50 text-sm">
            + Agregar tarjeta
          </button>
        </div>
        <p className="text-xs text-gray-500">Estas tarjetas se muestran en una animación tipo abanico en el lado derecho del hero.</p>

        {hero.cards.map((card: HeroCard, i: number) => (
          <div key={card.id} className="bg-navy-800/50 border border-white/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500">Tarjeta #{i + 1}</span>
              <button onClick={() => removeCard(card.id)} className="text-xs text-red-400 hover:text-red-300">Eliminar</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <ImageUploader
                  currentImage={card.image}
                  onImageChange={(url) => updateCard(card.id, "image", url)}
                  label="Imagen de fondo"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Título</label>
                <input value={card.title} onChange={(e) => updateCard(card.id, "title", e.target.value)}
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">ID (identificador interno)</label>
                <input value={card.id} onChange={(e) => updateCard(card.id, "id", e.target.value)}
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-400 mb-1">Descripción</label>
                <textarea value={card.description} onChange={(e) => updateCard(card.id, "description", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
