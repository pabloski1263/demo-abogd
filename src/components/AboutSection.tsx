"use client";

import { motion } from "framer-motion";

interface ValueItem {
  title: string;
  description: string;
}

interface AboutSectionProps {
  title: string;
  description: string;
  mission: string;
  vision: string;
  image: string;
  values: ValueItem[];
}

export default function AboutSection({ title, description, mission, vision, values }: AboutSectionProps) {
  return (
    <section id="nosotros" className="relative py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <span className="text-gold-500 text-sm tracking-[4px] uppercase font-medium mb-4 block">Nosotros</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">{title}</h2>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">{description}</p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-navy-800/50 border border-white/5 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl font-serif font-semibold text-gold-500 mb-3">Misión</h3>
            <p className="text-gray-300 leading-relaxed">{mission}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-navy-800/50 border border-white/5 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl font-serif font-semibold text-gold-500 mb-3">Visión</h3>
            <p className="text-gray-300 leading-relaxed">{vision}</p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-serif font-semibold text-white mb-8 text-center"
        >
          Nuestros Valores
        </motion.h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-500 font-serif font-bold">{i + 1}</span>
              </div>
              <h4 className="text-lg font-serif font-semibold text-white mb-2">{value.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
