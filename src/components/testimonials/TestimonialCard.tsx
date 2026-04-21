import Image from 'next/image';
import { MapPin, Calendar } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import StarRating from '@/components/ui/StarRating';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-forest/20">
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-base font-bold text-charcoal-dark truncate">
            {testimonial.name}
          </h3>
          <div className="flex items-center gap-1 text-charcoal-light">
            <MapPin size={12} />
            <p className="font-body text-xs truncate">{testimonial.location}</p>
          </div>
          <StarRating rating={testimonial.rating} size={14} />
        </div>
      </div>

      {/* Review */}
      <p className="font-body text-charcoal-light text-sm leading-relaxed mb-4 italic">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="bg-forest/10 text-forest text-xs font-body font-semibold px-3 py-1 rounded-full truncate max-w-[60%]">
          {testimonial.trek}
        </div>
        <div className="flex items-center gap-1 text-charcoal-light">
          <Calendar size={12} />
          <span className="font-body text-xs">{testimonial.date}</span>
        </div>
      </div>
    </div>
  );
}
