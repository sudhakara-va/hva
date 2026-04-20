import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';
import { Testimonial } from '@/lib/types';
import TestimonialCard from '@/components/testimonials/TestimonialCard';

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const content = await fs.readFile(path.join(process.cwd(), 'src', 'data', 'testimonials.json'), 'utf-8');
    return JSON.parse(content);
  } catch { return []; }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const avgRating = testimonials.length ? (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1) : '5.0';
  return (
    <div className="min-h-screen bg-snow">
      <div className="relative h-64 flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1531761535209-180857e963b9?w=1920&q=80" alt="Testimonials" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest-dark/70" />
        <div className="relative z-10 text-center">
          <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">Trekker Stories</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">What Our Adventurers Say</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8 justify-center mb-10">
          <div className="text-center"><p className="font-heading text-4xl font-bold text-amber">{testimonials.length}+</p><p className="font-body text-charcoal-light text-sm">Reviews</p></div>
          <div className="text-center"><p className="font-heading text-4xl font-bold text-amber">{avgRating}</p><p className="font-body text-charcoal-light text-sm">Avg Rating</p></div>
          <div className="text-center"><p className="font-heading text-4xl font-bold text-amber">5★</p><p className="font-body text-charcoal-light text-sm">Google Rating</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>
      </div>
    </div>
  );
}
