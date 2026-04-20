'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface ItineraryProps {
  itinerary: ItineraryDay[];
}

export default function Itinerary({ itinerary }: ItineraryProps) {
  const [openDay, setOpenDay] = useState<number | null>(1);

  return (
    <div className="space-y-3">
      {itinerary.map((item) => (
        <div
          key={item.day}
          className="border border-gray-200 rounded-xl overflow-hidden hover:border-forest transition-colors"
        >
          <button
            onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
            className="w-full flex items-center gap-4 p-4 text-left hover:bg-snow transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-heading font-bold text-sm transition-colors ${
              openDay === item.day ? 'bg-forest text-white' : 'bg-forest/10 text-forest'
            }`}>
              {item.day}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-amber font-semibold uppercase tracking-wide">
                  Day {item.day}
                </span>
              </div>
              <p className="font-heading text-sm font-semibold text-charcoal-dark mt-0.5 truncate">
                {item.title}
              </p>
            </div>
            <ChevronDown
              size={18}
              className={`text-charcoal-light flex-shrink-0 transition-transform duration-300 ${
                openDay === item.day ? 'rotate-180 text-forest' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {openDay === item.day && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-0">
                  <div className="ml-14 border-l-2 border-forest/20 pl-4">
                    <p className="font-body text-charcoal-light text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
