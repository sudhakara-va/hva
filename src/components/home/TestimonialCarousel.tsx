'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import StarRating from '@/components/ui/StarRating';
import { Testimonial } from '@/lib/types';

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials?featured=true')
      .then((r) => r.json())
      .then((data) => setTestimonials(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-forest-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Trekker Stories"
            title="What Our Adventurers Say"
            description="Real stories from real trekkers who trusted us with their Himalayan dreams."
            light
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <Quote size={28} className="text-amber mb-4" />
              <p className="font-body text-white/80 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-white font-semibold text-sm truncate">{t.name}</p>
                  <p className="font-body text-white/50 text-xs truncate">{t.location}</p>
                  <p className="font-body text-amber text-xs mt-0.5">{t.trek}</p>
                </div>
                <StarRating rating={t.rating} size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.slice(0, 3).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-amber w-6' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
