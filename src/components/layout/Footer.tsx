'use client';
import Link from 'next/link';
import { Mountain, MapPin, Phone, Mail, Clock } from 'lucide-react';

const expeditionLinks = [
  { label: 'Kedarkantha Trek', href: '/expeditions/kedarkantha-trek' },
  { label: 'Valley of Flowers', href: '/expeditions/valley-of-flowers' },
  { label: 'Roopkund Trek', href: '/expeditions/roopkund-trek' },
  { label: 'Har Ki Dun', href: '/expeditions/har-ki-dun' },
  { label: 'Brahmatal Trek', href: '/expeditions/brahmatal-trek' },
  { label: 'Pangarchulla Peak', href: '/expeditions/pangarchulla-peak' },
];

const pageLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact Us', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Cancellation Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber p-2 rounded-lg">
                <Mountain size={22} className="text-white" />
              </div>
              <div>
                <div className="font-heading text-xl font-bold tracking-wider">HVA</div>
                <div className="text-xs text-amber tracking-widest">HIMALAYAN VIEW ADVENTURE</div>
              </div>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-6">
              Your trusted guide to the breathtaking Himalayan peaks of Uttarakhand. 
              Certified guides, safe expeditions, unforgettable memories since 2014.
            </p>
            <div className="flex gap-3">
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: 'YouTube',
                  href: 'https://youtube.com',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                    </svg>
                  ),
                },
                {
                  label: 'Twitter / X',
                  href: 'https://twitter.com',
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-forest hover:bg-amber flex items-center justify-center rounded-lg transition-colors duration-200"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Expeditions */}
          <div>
            <h3 className="font-heading text-base font-semibold uppercase tracking-wider text-amber mb-5">
              Our Expeditions
            </h3>
            <ul className="space-y-2">
              {expeditionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-amber text-sm font-body transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-forest-light rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base font-semibold uppercase tracking-wider text-amber mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2 mb-6">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-amber text-sm font-body transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-forest-light rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40 mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-amber text-xs font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-base font-semibold uppercase tracking-wider text-amber mb-5">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-amber flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm font-body leading-relaxed">
                  Didsari, Uttarkashi<br />
                  Uttarakhand - 249193<br />
                  India
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-amber flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-white/60 hover:text-amber text-sm font-body transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={16} className="text-amber flex-shrink-0" />
                <a
                  href="mailto:info@himalayanviewadventure.com"
                  className="text-white/60 hover:text-amber text-sm font-body transition-colors break-all"
                >
                  info@himalayanviewadventure.com
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Clock size={16} className="text-amber flex-shrink-0" />
                <p className="text-white/60 text-sm font-body">
                  Mon–Sat: 9 AM – 7 PM IST
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-white/60 text-xs font-body mb-3">
                Subscribe for trek updates &amp; offers:
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-forest-dark border border-forest rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber font-body"
                />
                <button
                  type="submit"
                  className="bg-amber hover:bg-amber-dark text-white px-3 py-2 rounded-lg text-sm font-body font-semibold transition-colors"
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-body text-center sm:text-left">
            © {new Date().getFullYear()} Himalayan View Adventure. All rights reserved. | 
            Didsari, Uttarkashi, Uttarakhand
          </p>
          <Link
            href="/admin"
            className="text-white/20 hover:text-white/40 text-xs font-body transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
