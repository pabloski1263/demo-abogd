"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/content";

interface TeamSectionProps {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export default function TeamSection({ title, subtitle, members }: TeamSectionProps) {
  return (
    <section id="equipo" className="relative py-16 sm:py-28 bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-gold-500 text-sm tracking-[4px] uppercase font-medium mb-4 block">Equipo</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">{title}</h2>
          <p className="text-gray-400 text-lg max-w-2xl">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              {/* Photo placeholder */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-navy-800 border border-white/5 mb-5 group-hover:border-gold-500/30 transition-all duration-500">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-700 to-navy-800">
                    <span className="font-serif text-5xl text-gray-600">
                      {member.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <h3 className="text-lg font-serif font-semibold text-white group-hover:text-gold-500 transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-gold-500 mb-2">{member.role}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
