import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { ChevronLeft, Mountain, Clock, Users, Calendar, Check, X, Star } from 'lucide-react';
import { Expedition } from '@/lib/types';
import Itinerary from '@/components/expeditions/Itinerary';
import BookingForm from '@/components/expeditions/BookingForm';
import DifficultyBadge from '@/components/ui/DifficultyBadge';

async function getExpedition(slug: string): Promise<Expedition | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'expeditions.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const expeditions: Expedition[] = JSON.parse(content);
    return expeditions.find(e => e.slug === slug) || null;
  } catch { return null; }
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'expeditions.json');
    const content = await fs.readFile(filePath, 'utf-8');
    const expeditions: Expedition[] = JSON.parse(content);
    return expeditions.map(e => ({ slug: e.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const exp = await getExpedition(params.slug);
  if (!exp) return { title: 'Expedition Not Found' };
  return { title: exp.title, description: exp.description };
}

export default async function ExpeditionDetailPage({ params }: { params: { slug: string } }) {
  const exp = await getExpedition(params.slug);
  if (!exp) notFound();

  return (
    <div className="min-h-screen bg-snow">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image src={exp.coverImage} alt={exp.title} fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Link href="/expeditions" className="inline-flex items-center gap-1 text-white/70 hover:text-amber mb-4 font-body text-sm transition-colors">
            <ChevronLeft size={16} /> Back to Expeditions
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <DifficultyBadge difficulty={exp.difficulty} />
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-body">{exp.type}</span>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-body">{exp.region}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">{exp.title}</h1>
          <p className="font-body text-white/80 text-lg mt-1">{exp.tagline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 -mt-6 relative z-10">
          {[
            { icon: Mountain, label: 'Max Altitude', value: exp.altitudeText },
            { icon: Clock, label: 'Duration', value: exp.durationText },
            { icon: Users, label: 'Max Group', value: `${exp.maxGroupSize} People` },
            { icon: Calendar, label: 'Best Season', value: exp.bestSeason },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-md flex items-center gap-3">
              <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-forest" />
              </div>
              <div>
                <p className="font-body text-xs text-charcoal-light">{label}</p>
                <p className="font-heading text-sm font-bold text-charcoal-dark">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Price */}
            <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-body text-charcoal-light text-sm">Price per person</p>
                <p className="font-heading text-3xl font-bold text-amber">{exp.priceText}</p>
              </div>
              <a href={`https://wa.me/919876543210?text=Hi! I want to book ${exp.title}`} target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-body font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Book on WhatsApp
              </a>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal-dark mb-3">About This Trek</h2>
              <p className="font-body text-charcoal-light leading-relaxed">{exp.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal-dark mb-3">Highlights</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-charcoal-light text-sm">
                    <Star size={14} className="text-amber mt-0.5 flex-shrink-0 fill-amber" />{h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Included/Excluded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-charcoal-dark mb-3">✓ Included</h3>
                <ul className="space-y-1.5">
                  {exp.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-charcoal-light">
                      <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-charcoal-dark mb-3">✗ Not Included</h3>
                <ul className="space-y-1.5">
                  {exp.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-charcoal-light">
                      <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal-dark mb-4">Day-by-Day Itinerary</h2>
              <Itinerary itinerary={exp.itinerary} />
            </div>

            {/* Gallery */}
            {exp.galleryImages.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-charcoal-dark mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {exp.galleryImages.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <Image src={img} alt={`${exp.title} photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h3 className="font-heading text-xl font-bold text-charcoal-dark mb-5">Send an Enquiry</h3>
              <BookingForm trekName={exp.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
