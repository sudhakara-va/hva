'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-forest-dark/95 backdrop-blur-md shadow-xl py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-amber text-white p-2 rounded-lg group-hover:bg-amber-dark transition-colors">
                <Mountain size={24} />
              </div>
              <div>
                <div className="font-heading text-xl font-bold text-white tracking-wider leading-none">HVA</div>
                <div className="text-xs text-amber font-body tracking-widest uppercase leading-none mt-0.5">
                  Himalayan View Adventure
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-amber bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-white/70 hover:text-amber transition-colors text-sm"
              >
                <Phone size={16} />
                <span className="font-body">+91 98765 43210</span>
              </a>
              <Link
                href="/contact"
                className="bg-amber hover:bg-amber-dark text-white font-body font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 text-sm"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-forest-dark shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-forest">
                <div className="flex items-center gap-2">
                  <Mountain size={20} className="text-amber" />
                  <span className="font-heading text-white text-lg">HVA</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-6 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-body font-medium transition-all ${
                        pathname === link.href
                          ? 'bg-amber text-white'
                          : 'text-white/80 hover:text-white hover:bg-forest'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-6 border-t border-forest">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full bg-amber hover:bg-amber-dark text-white font-body font-semibold py-3 rounded-lg text-center transition-colors"
                >
                  Book Now
                </Link>
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 mt-3 text-white/60 hover:text-amber text-sm transition-colors"
                >
                  <Phone size={14} />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
