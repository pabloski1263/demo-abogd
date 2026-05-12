"use client";

import { motion } from "framer-motion";
import type { ServiceItem } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M3 21h18M3 21V3m18 18V3M7 14l4-4 4 4 4-4" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-8 8c0-2.67 4-4 8-4s8 1.33 8 4" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2v20M4 6l8 4 8-4M4 18l8-4 8 4" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 2l7 4v5c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V6l7-4z" />
    </svg>
  ),
};

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export default function ServicesSection({ title, subtitle, items }: ServicesSectionProps) {
  return (
    <section id="servicios" className="relative py-16 sm:py-28 bg-navy-800/50">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold-500 text-sm tracking-[4px] uppercase font-medium mb-4 block">Servicios</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">{title}</h2>
          <p className="text-gray-400 text-lg max-w-2xl">{subtitle}</p>
        </motion.div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-navy-900/60 border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-gold-500/30 transition-all duration-500"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors duration-300">
                  {iconMap[service.icon] || iconMap.building}
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-3 group-hover:text-gold-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
