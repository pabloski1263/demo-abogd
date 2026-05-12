"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) sessionStorage.setItem("abg_token", data.token);
        router.push("/admin");
      } else {
        const data = await res.json();
        toast.error(data.error || "Credenciales inválidas");
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-gold-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-navy-900 font-serif font-bold text-xl">ABG</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">Panel de Administración</h1>
          <p className="text-sm text-gray-500 mt-1">Acceso restringido solo para administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
              placeholder="admin@abgabogados.cl"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 disabled:opacity-50 transition-all text-sm"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
