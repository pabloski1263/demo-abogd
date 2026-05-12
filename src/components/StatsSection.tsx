"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  items: StatItem[];
}

function AnimatedCounter({ value, suffix, label }: StatItem) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 30;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gold-500 mb-2">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-gray-400 uppercase tracking-[2px]">{label}</p>
    </div>
  );
}

export default function StatsSection({ items }: StatsSectionProps) {
  return (
    <section className="relative py-16 sm:py-20 border-y border-white/5">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
