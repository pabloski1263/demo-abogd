"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

export default function ChatAdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminFetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  if (!content) return <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />;

  const chat = content.chat || { api_key: "", model: "gemini-2.5-flash-lite", enabled: true, greeting: "" };

  const update = (field: string, value: any) => {
    const updated = structuredClone(content);
    if (!updated.chat) {
      updated.chat = { api_key: "", model: "gemini-2.5-flash-lite", enabled: true, greeting: "" };
    }
    const keys = field.split(".");
    let obj: any = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (obj[keys[i]] === undefined) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
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
        <h1 className="text-2xl font-serif font-bold text-white">Chat Inteligente</h1>
        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 disabled:opacity-50 transition-all text-sm">
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">API Key de Gemini</h2>
          <p className="text-xs text-gray-500 mb-3">
            Ingresa tu API key de Google Gemini Flash Lite. Puedes obtener una en{" "}
            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">Google AI Studio</a>.
          </p>
          <input
            value={chat.api_key}
            onChange={(e) => update("chat.api_key", e.target.value)}
            type="password"
            className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm font-mono"
            placeholder="AIzaSy..."
          />
        </div>

        <div className="bg-navy-800/50 border border-white/5 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Configuración</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Modelo</label>
              <select
                value={chat.model}
                onChange={(e) => update("chat.model", e.target.value)}
                className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm"
              >
                <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</option>
                <option value="gemini-2.0-flash-lite">Gemini 2.0 Flash Lite</option>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => update("chat.enabled", !chat.enabled)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  chat.enabled ? "bg-gold-500" : "bg-gray-700"
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  chat.enabled ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
              <span className="text-sm text-gray-300">{chat.enabled ? "Chat activado" : "Chat desactivado"}</span>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Mensaje de bienvenida</label>
              <textarea
                value={chat.greeting}
                onChange={(e) => update("chat.greeting", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500/50 text-sm resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-navy-800/30 border border-white/5 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-2">¿Cómo funciona?</h2>
          <ul className="text-xs text-gray-400 space-y-1.5">
            <li>• El widget flotante aparece en la esquina inferior derecha del sitio.</li>
            <li>• El asistente conoce toda la información del sitio (servicios, equipo, contacto, etc.).</li>
            <li>• Cuando actualices el contenido desde el admin, el chat lo reflejará automáticamente.</li>
            <li>• Las respuestas se generan con Gemini Flash Lite y se muestran en tiempo real.</li>
            <li>• Si desactivas el chat, el widget desaparecerá del sitio.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
