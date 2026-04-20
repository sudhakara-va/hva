'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mountain, Clock, ArrowRight } from 'lucide-react';
import DifficultyBadge from '@/components/ui/DifficultyBadge';
import { Expedition } from '@/lib/types';

interface ExpeditionCardProps {
  expedition: Expedition;
}

export default function ExpeditionCard({ expedition }: ExpeditionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={expedition.coverImage}
          alt={expedition.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3">
          <DifficultyBadge difficulty={expedition.difficulty} />
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-body font-semibold px-2 py-1 rounded-full ${
            expedition.status === 'Upcoming' ? 'bg-green-500 text-white' :
            expedition.status === 'Ongoing' ? 'bg-amber text-white' :
            'bg-gray-500 text-white'
          }`}>
            {expedition.status}
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-body text-white/80 bg-black/40 px-2 py-0.5 rounded-full">
            {expedition.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-bold text-charcoal-dark leading-tight mb-1">
          {expedition.title}
        </h3>
        <p className="font-body text-charcoal-light text-xs leading-relaxed mb-3 line-clamp-2">
          {expedition.tagline}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center bg-snow rounded-lg py-1.5 px-1">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Mountain size={10} className="text-forest" />
            </div>
            <p className="font-heading text-xs font-bold text-charcoal-dark">{expedition.altitudeText}</p>
            <p className="font-body text-xs text-charcoal-light leading-none">Altitude</p>
          </div>
          <div className="text-center bg-snow rounded-lg py-1.5 px-1">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Clock size={10} className="text-amber" />
            </div>
            <p className="font-heading text-xs font-bold text-charcoal-dark">{expedition.duration}D</p>
            <p className="font-body text-xs text-charcoal-light leading-none">Duration</p>
          </div>
          <div className="text-center bg-amber/10 rounded-lg py-1.5 px-1">
            <p className="font-heading text-xs font-bold text-amber">{expedition.priceText}</p>
            <p className="font-body text-xs text-charcoal-light leading-none">per person</p>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            href={`/expeditions/${expedition.slug}`}
            className="flex items-center justify-center gap-2 w-full bg-forest hover:bg-forest-dark text-white font-body font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
          >
            View Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
