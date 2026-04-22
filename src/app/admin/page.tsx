'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mountain, Images, Star, LogOut, TrendingUp, ArrowRight, FileImage } from 'lucide-react';

interface Stats {
  expeditions: number;
  gallery: number;
  testimonials: number;
  images: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ expeditions: 0, gallery: 0, testimonials: 0, images: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/expeditions').then(r => r.json()),
      fetch('/api/gallery').then(r => r.json()),
      fetch('/api/testimonials').then(r => r.json()),
      fetch('/api/upload').then(r => r.json()),
    ]).then(([exps, gallery, testimonials, imgs]) => {
      setStats({
        expeditions: Array.isArray(exps) ? exps.length : 0,
        gallery: Array.isArray(gallery) ? gallery.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        images: Array.isArray(imgs) ? imgs.length : 0,
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const cards = [
    {
      label: 'Total Expeditions',
      value: stats.expeditions,
      icon: Mountain,
      color: 'bg-forest/10 text-forest',
      href: '/admin/expeditions',
    },
    {
      label: 'Gallery Photos',
      value: stats.gallery,
      icon: Images,
      color: 'bg-amber/10 text-amber-700',
      href: '/admin/gallery',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      icon: Star,
      color: 'bg-orange/10 text-orange-700',
      href: '/admin/testimonials',
    },
    {
      label: 'Uploaded Images',
      value: stats.images,
      icon: FileImage,
      color: 'bg-sky-500/10 text-sky-700',
      href: '/admin/images',
    },
  ];

  const quickLinks = [
    { label: 'Manage Expeditions', desc: 'Add, edit or remove trek listings', href: '/admin/expeditions', icon: Mountain },
    { label: 'Manage Gallery', desc: 'Upload and organise photos', href: '/admin/gallery', icon: Images },
    { label: 'Manage Testimonials', desc: 'Review and curate guest reviews', href: '/admin/testimonials', icon: Star },
    { label: 'Manage Images', desc: 'Upload and organise your photos', href: '/admin/images', icon: FileImage },
    { label: 'View Public Site', desc: 'Open the website in a new tab', href: '/', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-forest-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mountain size={24} className="text-amber" />
            <div>
              <p className="font-heading text-lg font-bold text-white leading-tight">HVA Admin</p>
              <p className="font-body text-white/50 text-xs">Himalayan View Adventure</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal-dark">Dashboard</h1>
          <p className="font-body text-charcoal-light mt-1">Welcome back! Here&apos;s an overview of your content.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map(card => (
            <Link key={card.label} href={card.href}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-body text-charcoal-light text-sm mb-1">{card.label}</p>
                    {loading ? (
                      <div className="w-12 h-8 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      <p className="font-heading text-4xl font-bold text-charcoal-dark">{card.value}</p>
                    )}
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                    <card.icon size={22} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <h2 className="font-heading text-xl font-bold text-charcoal-dark mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href === '/' ? '_blank' : undefined}
              rel={link.href === '/' ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-forest/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center group-hover:bg-forest transition-colors">
                  <link.icon size={18} className="text-forest group-hover:text-white transition-colors" />
                </div>
                <ArrowRight size={16} className="text-charcoal-light group-hover:text-forest transition-colors" />
              </div>
              <h3 className="font-heading text-sm font-bold text-charcoal-dark mb-1">{link.label}</h3>
              <p className="font-body text-charcoal-light text-xs">{link.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
