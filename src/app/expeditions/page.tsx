'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FilterBar from '@/components/expeditions/FilterBar';
import ExpeditionCard from '@/components/expeditions/ExpeditionCard';
import { Expedition } from '@/lib/types';

interface Filters { difficulty: string; type: string; region: string; }

export default function ExpeditionsPage() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({ difficulty: 'All', type: 'All', region: 'All' });

  useEffect(() => {
    fetch('/api/expeditions').then(r => r.json()).then(d => { setExpeditions(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = expeditions.filter(e =>
    (filters.difficulty === 'All' || e.difficulty === filters.difficulty) &&
    (filters.type === 'All' || e.type === filters.type) &&
    (filters.region === 'All' || e.region === filters.region)
  );

  return (
    <div className="min-h-screen bg-snow">
      <div className="relative h-64 md:h-80 flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" alt="Expeditions" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest-dark/70" />
        <div className="relative z-10 text-center px-4">
          <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">Explore</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Our Expeditions</h1>
          <p className="font-body text-white/70 mt-2">Discover Garhwal Himalayan treks for every level</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8"><FilterBar filters={filters} onChange={setFilters} /></div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20"><p className="font-body text-charcoal-light text-lg">No expeditions match your filters.</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exp, i) => (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <ExpeditionCard expedition={exp} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
