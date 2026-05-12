"use client";

import { useState, useRef } from "react";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  currentImage: string;
  onImageChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ currentImage, onImageChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        onImageChange(data.url);
        toast.success("Imagen subida");
      } else {
        toast.error(data.error || "Error al subir");
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      {label && <label className="block text-xs text-gray-400 mb-1.5">{label}</label>}
      <div className="flex items-start gap-4">
        {currentImage ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
            <img src={currentImage} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border border-dashed border-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 text-xs">Sin imagen</span>
          </div>
        )}
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 bg-navy-800 border border-white/10 rounded-lg text-xs text-gray-300 hover:border-gold-500/50 hover:text-white transition-all disabled:opacity-50"
          >
            {uploading ? "Subiendo..." : "Subir imagen"}
          </button>
          {currentImage && (
            <button
              type="button"
              onClick={() => onImageChange("")}
              className="px-4 py-2 border border-red-500/20 rounded-lg text-xs text-red-400 hover:border-red-500/50 ml-2 transition-all"
            >
              Quitar
            </button>
          )}
          <input
            type="text"
            value={currentImage}
            onChange={(e) => onImageChange(e.target.value)}
            placeholder="O pega URL externa..."
            className="w-full px-3 py-2 bg-navy-900 border border-white/10 rounded-lg text-white text-xs placeholder-gray-500 focus:outline-none focus:border-gold-500/50"
          />
        </div>
      </div>
    </div>
  );
}
