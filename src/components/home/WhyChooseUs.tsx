'use client';

import { motion } from 'framer-motion';
import { Mountain, Users, Leaf, Shield, Map, HeartPulse } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const reasons = [
  {
    icon: Mountain,
    title: 'Expert Mountain Guides',
    description: 'All our guides are IMF (Indian Mountaineering Foundation) certified with 5+ years of high-altitude experience.',
    color: 'bg-forest text-white',
  },
  {
    icon: Users,
    title: 'Small Groups (Max 12)',
    description: 'We keep groups small for a personalized experience, better safety ratios, and minimal environmental impact.',
    color: 'bg-amber text-white',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Practices',
    description: 'Leave No Trace principles, bio-degradable camping gear, and active participation in trail clean-up drives.',
    color: 'bg-emerald-600 text-white',
  },
  {
    icon: Shield,
    title: 'Safety First Always',
    description: 'First aid trained guides, emergency evacuation protocols, satellite phones, and acclimatization schedules.',
    color: 'bg-blue-600 text-white',
  },
  {
    icon: Map,
    title: 'Local Expertise',
    description: 'Born and raised in Uttarkashi, our team has intimate knowledge of every trail, village, and weather pattern.',
    color: 'bg-purple-600 text-white',
  },
  {
    icon: HeartPulse,
    title: '24/7 Emergency Support',
    description: 'Round-the-clock emergency assistance, medical support, and real-time communication with our base camp.',
    color: 'bg-orange text-white',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeader
            eyebrow="Why Trek With Us"
            title="The HVA Difference"
            description="We don't just guide treks — we create life-changing mountain experiences built on trust, expertise, and a deep love for the Himalayas."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-snow hover:bg-forest-dark rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-transparent"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon size={22} />
              </div>
              <h3 className="font-heading text-lg font-bold text-charcoal-dark group-hover:text-white mb-2 transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-charcoal-light text-sm group-hover:text-white/70 leading-relaxed transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
