'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';

interface BookingFormProps {
  trekName?: string;
}

export default function BookingForm({ trekName = '' }: BookingFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    trekInterest: trekName,
    preferredDate: '',
    groupSize: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          groupSize: form.groupSize ? parseInt(form.groupSize) : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', trekInterest: trekName, preferredDate: '', groupSize: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center"
      >
        <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
        <h3 className="font-heading text-xl font-bold text-charcoal-dark mb-2">
          Enquiry Received!
        </h3>
        <p className="font-body text-charcoal-light">
          Thank you! Our team will contact you within 24 hours. You can also reach us on WhatsApp for a quick response.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-forest font-body text-sm underline hover:text-forest-dark"
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-charcoal-dark mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Rahul Sharma"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-charcoal-dark placeholder-gray-400 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-sm font-medium text-charcoal-dark mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="rahul@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-charcoal-dark placeholder-gray-400 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-charcoal-dark mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-charcoal-dark placeholder-gray-400 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-sm font-medium text-charcoal-dark mb-1">
            Trek Interest
          </label>
          <input
            type="text"
            value={form.trekInterest}
            onChange={(e) => setForm({ ...form, trekInterest: e.target.value })}
            placeholder="Kedarkantha Trek"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-charcoal-dark placeholder-gray-400 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-medium text-charcoal-dark mb-1">
            Preferred Date
          </label>
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-charcoal-dark focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
          />
        </div>
        <div>
          <label className="block font-body text-sm font-medium text-charcoal-dark mb-1">
            Group Size
          </label>
          <select
            value={form.groupSize}
            onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-charcoal-dark focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors"
          >
            <option value="">Select size</option>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-body text-sm font-medium text-charcoal-dark mb-1">
          Message *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your trekking experience, any special requirements, or questions..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-body text-sm text-charcoal-dark placeholder-gray-400 focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="font-body text-red-700 text-sm">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-forest hover:bg-forest-dark text-white font-body font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Enquiry
          </>
        )}
      </button>
    </form>
  );
}
