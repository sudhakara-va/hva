'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Expedition } from '@/lib/types';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ContactPage() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', trekInterest: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/expeditions')
      .then(r => r.json())
      .then(d => setExpeditions(Array.isArray(d) ? d : []));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', trekInterest: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-snow">
      {/* Hero */}
      <div className="relative h-64 md:h-80 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
          alt="Contact Us"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest-dark/70" />
        <div className="relative z-10 text-center px-4">
          <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="font-body text-white/70 mt-2">Plan your next Himalayan adventure with us</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left – Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <p className="font-body text-amber text-sm tracking-widest uppercase mb-2">Send an Enquiry</p>
            <h2 className="font-heading text-3xl font-bold text-charcoal-dark mb-6">Plan Your Trek</h2>

            {status === 'success' ? (
              <div className="bg-forest/10 border border-forest/30 rounded-2xl p-8 text-center">
                <CheckCircle className="text-forest w-12 h-12 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold text-charcoal-dark mb-2">Enquiry Received!</h3>
                <p className="font-body text-charcoal-light">
                  Thank you for your enquiry! We will contact you within 24 hours to help plan your adventure.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 bg-forest text-white font-body font-semibold rounded-full hover:bg-forest-dark transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm font-semibold text-charcoal-dark mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-charcoal-dark focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-charcoal-dark mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-charcoal-dark focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm font-semibold text-charcoal-dark mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-charcoal-dark focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-semibold text-charcoal-dark mb-1">Interested Trek</label>
                    <select
                      name="trekInterest"
                      value={form.trekInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-charcoal-dark focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-white transition-all"
                    >
                      <option value="">Select a trek…</option>
                      {expeditions.map(e => (
                        <option key={e.id} value={e.title}>{e.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-semibold text-charcoal-dark mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your group size, preferred dates, fitness level, or any questions…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-charcoal-dark focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 bg-white transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 font-body text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-white font-body font-bold py-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      Send Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right – Contact info + Map */}
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <h3 className="font-heading text-xl font-bold text-charcoal-dark mb-5">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest group-hover:text-white transition-colors">
                    <Phone size={18} className="text-forest group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-charcoal-light uppercase tracking-wide mb-0.5">Phone / WhatsApp</p>
                    <p className="font-body font-semibold text-charcoal-dark group-hover:text-forest transition-colors">+91-9876543210</p>
                  </div>
                </a>

                <a
                  href="mailto:info@himalayanviewadventure.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-forest transition-colors">
                    <Mail size={18} className="text-forest group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-charcoal-light uppercase tracking-wide mb-0.5">Email</p>
                    <p className="font-body font-semibold text-charcoal-dark group-hover:text-forest transition-colors break-all">
                      info@himalayanviewadventure.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-charcoal-light uppercase tracking-wide mb-0.5">Address</p>
                    <p className="font-body font-semibold text-charcoal-dark">
                      Didsari Village, Uttarkashi<br />Uttarakhand – 249 193, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-forest/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-charcoal-light uppercase tracking-wide mb-0.5">Office Hours</p>
                    <p className="font-body font-semibold text-charcoal-dark">
                      Mon – Sat: 9 AM – 6 PM IST<br />
                      Sunday: 10 AM – 2 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="rounded-2xl overflow-hidden shadow-md h-64"
            >
              <iframe
                src="https://maps.google.com/maps?q=30.7268,78.4354&z=12&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Himalayan View Adventure Location – Uttarkashi"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
