'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-[-20%] w-full">
        <Image
          src="https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=1920&q=80"
          alt="Trek the Himalayas"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4 sm:px-8 py-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-amber text-sm tracking-[0.2em] uppercase font-semibold mb-3"
        >
          Ready for the Mountains?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
        >
          Your Next Adventure Awaits
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-white/70 text-lg mb-8 leading-relaxed"
        >
          Join us for a journey that will challenge your limits and reward you with vistas 
          that words cannot describe. Flexible dates, customized itineraries.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-dark text-white font-body font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Plan Your Trek
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20plan%20a%20trek"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-body font-bold px-8 py-4 rounded-xl transition-all duration-300"
          >
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
