"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { adminFetch } from "@/lib/admin-fetch";
import type { SiteContent } from "@/lib/content";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "email" | "tel";
  path: string; // dot notation path in content object
}

interface AdminEditorProps {
  title: string;
  content: SiteContent;
  fields: Field[];
  onSave: (updated: SiteContent) => void;
}

function getNestedValue(obj: any, path: string): string {
  return path.split(".").reduce((acc, key) => acc?.[key] ?? "", obj);
}

function setNestedValue(obj: any, path: string, value: string | number): void {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

export default function AdminEditor({ title, content, fields, onSave }: AdminEditorProps) {
  const [data, setData] = useState<SiteContent>(structuredClone(content));
  const [saving, setSaving] = useState(false);

  const handleChange = (path: string, value: string | number) => {
    const updated = structuredClone(data);
    setNestedValue(updated, path, value);
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
      if (res.ok) {
        toast.success("Contenido guardado");
        onSave(data);
      } else {
        toast.error("Error al guardar");
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">{title}</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 disabled:opacity-50 transition-all text-sm"
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>

      <div className="space-y-4 max-w-2xl">
        {fields.map((field) => (
          <div key={field.path}>
            <label className="block text-sm text-gray-400 mb-1.5">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                value={getNestedValue(data, field.path)}
                onChange={(e) => handleChange(field.path, e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm resize-none"
              />
            ) : field.type === "number" ? (
              <input
                type="number"
                value={getNestedValue(data, field.path)}
                onChange={(e) => handleChange(field.path, Number(e.target.value))}
                className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
              />
            ) : (
              <input
                type={field.type}
                value={getNestedValue(data, field.path)}
                onChange={(e) => handleChange(field.path, e.target.value)}
                className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
