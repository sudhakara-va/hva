'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';
import { GalleryPhoto } from '@/lib/types';

const CATEGORIES = ['All', 'Trek', 'Expedition', 'Camp', 'Wildlife', 'Culture'];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [category, setCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(d => setPhotos(Array.isArray(d) ? d : []));
  }, []);

  const filtered = category === 'All' ? photos : photos.filter(p => p.category === category);

  return (
    <div className="min-h-screen bg-snow">
      <div className="relative h-64 flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1559521783-1d1599583485?w=1920&q=80" alt="Gallery" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest-dark/70" />
        <div className="relative z-10 text-center">
          <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">Visual Stories</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Photo Gallery</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-body font-semibold whitespace-nowrap transition-all ${category === cat ? 'bg-forest text-white' : 'bg-white text-charcoal-light border border-gray-200 hover:border-forest'}`}>
              {cat}
            </button>
          ))}
        </div>
        <GalleryGrid photos={filtered} onPhotoClick={(_, i) => setLightboxIndex(i)} />
        <Lightbox photos={filtered} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
      </div>
    </div>
  );
}
