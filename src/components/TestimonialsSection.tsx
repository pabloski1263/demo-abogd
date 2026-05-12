"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialItem {
  text: string;
  author: string;
  company: string;
}

interface TestimonialsSectionProps {
  title: string;
  items: TestimonialItem[];
}

export default function TestimonialsSection({ title, items }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);

  if (items.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  return (
    <section className="relative py-16 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold-500 text-sm tracking-[4px] uppercase font-medium mb-4 block">Testimonios</span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-12 sm:mb-16">{title}</h2>
        </motion.div>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Quote icon */}
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gold-500/30 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>

              <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed mb-8 font-serif italic">
                &ldquo;{items[current].text}&rdquo;
              </p>

              <p className="text-gold-500 font-medium">{items[current].author}</p>
              <p className="text-sm text-gray-500">{items[current].company}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-gold-500 hover:border-gold-500/50 transition-all"
              aria-label="Anterior"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-gold-500 w-6" : "bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-gold-500 hover:border-gold-500/50 transition-all"
              aria-label="Siguiente"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
