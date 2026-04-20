import Image from 'next/image';
import { Mountain, Award, Heart, Leaf } from 'lucide-react';

const team = [
  { name: 'Ramesh Negi', role: 'Founder & Lead Guide', bio: 'IMF certified mountaineer with 15 years in the Garhwal Himalayas. Summited peaks over 6000m.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Sunita Rawat', role: 'Operations Manager', bio: 'Trek planning expert ensuring every expedition runs smoothly from logistics to safety protocols.', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&q=80' },
  { name: 'Deepak Bisht', role: 'Senior Mountain Guide', bio: 'ABVIMAS certified guide with expertise in winter treks and high-altitude rescue operations.', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  { name: 'Kavita Panwar', role: 'Trek Coordinator', bio: 'Wilderness first responder and passionate trekker committed to eco-friendly mountain practices.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
];

const values = [
  { icon: Mountain, title: 'Expert Guidance', desc: 'Every guide is IMF/ABVIMAS certified with years of high-altitude experience.' },
  { icon: Heart, title: 'Trekker First', desc: 'Your safety, comfort and experience is our highest priority on every trek.' },
  { icon: Leaf, title: 'Eco-Responsible', desc: 'We follow Leave No Trace and actively run trail clean-up drives.' },
  { icon: Award, title: 'Certified Excellence', desc: 'Recognized by IMF and affiliated with ABVIMAS for professional standards.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-snow">
      <div className="relative h-72 flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&q=80" alt="About HVA" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-forest-dark/70" />
        <div className="relative z-10 text-center px-4">
          <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">Our Story</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">About Himalayan View Adventure</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <p className="font-body text-amber text-sm tracking-widest uppercase mb-3">Est. 2014</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal-dark mb-4">Born in the Heart of Uttarkashi</h2>
            <p className="font-body text-charcoal-light leading-relaxed mb-4">
              Himalayan View Adventure was founded in 2014 by Ramesh Negi in the mountain town of Didsari, Uttarkashi. Growing up in the shadow of the Garhwal Himalayas, Ramesh developed a deep reverence for the mountains and a desire to share their magnificence with adventurers from around the world.
            </p>
            <p className="font-body text-charcoal-light leading-relaxed mb-4">
              Over a decade, we have guided thousands of trekkers through some of India&apos;s most breathtaking landscapes — from the snow-draped trails of Kedarkantha to the mystical Roopkund lake. Every expedition is crafted with the same dedication, safety standards, and love for the mountains that founded this company.
            </p>
            <p className="font-body text-charcoal-light leading-relaxed">
              Today, our team of 15 certified guides and support staff proudly carries forward the mission: to make the Himalayas accessible, safe, and unforgettable for every trekker.
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1540202404-1b927e27fa8b?w=800&q=80" alt="Our team in the mountains" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">What Drives Us</p>
            <h2 className="font-heading text-3xl font-bold text-charcoal-dark">Our Mission & Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-md text-center border border-gray-100 hover:border-forest transition-colors">
                <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-forest" />
                </div>
                <h3 className="font-heading text-base font-bold text-charcoal-dark mb-2">{title}</h3>
                <p className="font-body text-charcoal-light text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">The People</p>
            <h2 className="font-heading text-3xl font-bold text-charcoal-dark">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-base font-bold text-charcoal-dark">{member.name}</h3>
                  <p className="font-body text-amber text-xs font-semibold mb-2">{member.role}</p>
                  <p className="font-body text-charcoal-light text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-forest-dark rounded-2xl p-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-4">Certifications & Affiliations</h2>
          <p className="font-body text-white/70 mb-6">We operate to the highest industry standards, recognized by India&apos;s premier mountaineering bodies.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['IMF Certified', 'ABVIMAS Affiliated', 'Leave No Trace', 'First Aid Certified', 'SAR Trained'].map(cert => (
              <span key={cert} className="bg-amber/20 border border-amber/30 text-amber font-body font-semibold text-sm px-4 py-2 rounded-full">{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
