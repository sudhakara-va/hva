'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={centered ? 'text-center' : ''}
    >
      {eyebrow && (
        <p className={`font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 ${
          light ? 'text-amber-light' : 'text-amber'
        }`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${
        light ? 'text-white' : 'text-charcoal-dark'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg font-body max-w-2xl leading-relaxed ${
          centered ? 'mx-auto' : ''
        } ${light ? 'text-white/70' : 'text-charcoal-light'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
