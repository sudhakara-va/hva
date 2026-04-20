import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { GalleryPhoto } from '@/lib/types';
import SectionHeader from '@/components/ui/SectionHeader';

async function getFeaturedPhotos(): Promise<GalleryPhoto[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const photos: GalleryPhoto[] = JSON.parse(content);
    return photos.filter((p) => p.featured).slice(0, 6);
  } catch {
    return [];
  }
}

export default async function PhotoGrid() {
  const photos = await getFeaturedPhotos();

  return (
    <section className="py-20 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Visual Journey"
            title="Himalayan Moments"
            description="A glimpse into the raw beauty of the mountains we call home."
            light
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, i) => (
            <Link
              key={photo.id}
              href="/gallery"
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
            >
              <Image
                src={photo.url}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-amber text-white text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                  {photo.category}
                </span>
                <p className="text-white text-sm font-body mt-1">{photo.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 border-2 border-amber text-amber hover:bg-amber hover:text-white font-body font-semibold px-8 py-3 rounded-xl transition-all duration-300"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
