'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GalleryPhoto } from '@/lib/types';

interface GalleryGridProps {
  photos: GalleryPhoto[];
  onPhotoClick: (photo: GalleryPhoto, index: number) => void;
}

export default function GalleryGrid({ photos, onPhotoClick }: GalleryGridProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-body text-charcoal-light text-lg">No photos in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
          onClick={() => onPhotoClick(photo, index)}
        >
          <div className="relative w-full" style={{ paddingBottom: index % 3 === 0 ? '133%' : index % 3 === 1 ? '75%' : '100%' }}>
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3">
              <span className="inline-block bg-amber text-white text-xs font-body font-semibold px-2 py-0.5 rounded-full mb-1">
                {photo.category}
              </span>
              <p className="text-white text-sm font-body font-medium leading-tight line-clamp-2">
                {photo.title}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
