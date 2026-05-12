"use client";

import { motion } from "framer-motion";

interface ContactSectionProps {
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export default function ContactSection({ title, subtitle, address, phone, email, hours }: ContactSectionProps) {
  return (
    <section id="contacto" className="relative py-16 sm:py-28 bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-gold-500 text-sm tracking-[4px] uppercase font-medium mb-4 block">Contacto</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">{title}</h2>
          <p className="text-gray-400 text-lg max-w-2xl">{subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Dirección</h3>
                <p className="text-gray-400">{address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Teléfono</h3>
                <p className="text-gray-400">{phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Email</h3>
                <p className="text-gray-400">{email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-gold-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Horario</h3>
                <p className="text-gray-400">{hours}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/50 border border-white/5 rounded-2xl p-8"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const mailto = `mailto:${email}?subject=Consulta desde web - ${data.get("name")}&body=Nombre: ${data.get("name")}%0AEmail: ${data.get("email")}%0ATeléfono: ${data.get("phone") || ""}%0A%0A${data.get("message")}`;
                window.open(mailto);
              }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  required
                  className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono (opcional)"
                className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
              />
              <textarea
                name="message"
                placeholder="¿En qué podemos ayudarte?"
                required
                rows={5}
                className="w-full px-4 py-3 bg-navy-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 transition-colors text-sm resize-none"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-gold-500 text-navy-900 font-medium rounded-lg hover:bg-gold-400 transition-all text-sm tracking-wide"
              >
                Enviar Mensaje
              </button>
              <p className="text-[10px] text-gray-600 text-center">
                Al enviar, se abrirá tu cliente de correo para completar el envío.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
