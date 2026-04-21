'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, LogOut, Plus, Pencil, Trash2, X, ChevronLeft } from 'lucide-react';
import { Testimonial } from '@/lib/types';

const EMPTY: Partial<Testimonial> = {
  name: '', location: '', trek: '', date: '', rating: 5,
  review: '', photo: '', featured: false,
};

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchData = () => {
    setLoading(true);
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(d => { setTestimonials(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY);
    setError('');
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditTarget(t);
    setForm({ ...t });
    setError('');
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(p => ({
      ...p,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.review) { setError('Name and review are required.'); return; }
    setSaving(true);
    setError('');
    try {
      const payload: Testimonial = {
        id: editTarget?.id ?? `t-${Date.now()}`,
        name: form.name ?? '',
        location: form.location ?? '',
        trek: form.trek ?? '',
        date: form.date ?? '',
        rating: form.rating ?? 5,
        review: form.review ?? '',
        photo: form.photo ?? '',
        featured: form.featured ?? false,
      };

      let res: Response;
      if (editTarget) {
        res = await fetch(`/api/testimonials/${editTarget.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setShowForm(false);
        fetchData();
      } else {
        const data = await res.json();
        setError(data.error ?? 'Failed to save. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setDeleteId(null);
      fetchData();
    } catch {
      /* no-op */
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const StarRating = ({ value }: { value: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12} className={i <= value ? 'text-amber-500 fill-amber-500' : 'text-gray-300'} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-forest-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <Star size={22} className="text-amber" />
            <p className="font-heading text-lg font-bold text-white">Testimonials</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold text-charcoal-dark">Manage Testimonials</h1>
          <button onClick={openCreate} className="flex items-center gap-2 bg-forest hover:bg-forest-dark text-white font-body font-semibold px-4 py-2 rounded-xl transition-colors text-sm">
            <Plus size={16} /> Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl h-20 animate-pulse" />)}</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-charcoal-light font-body">No testimonials yet. Add your first one!</div>
        ) : (
          <div className="space-y-3">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-body font-bold text-charcoal-dark text-sm">{t.name}</p>
                    {t.featured && (
                      <span className="bg-amber/10 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="font-body text-charcoal-light text-xs mb-1">{t.trek} · {t.date}</p>
                  <StarRating value={t.rating} />
                  <p className="font-body text-charcoal-dark text-sm mt-2 line-clamp-2">{t.review}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(t)} className="p-2 rounded-lg bg-forest/10 text-forest hover:bg-forest hover:text-white transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => setDeleteId(t.id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-charcoal-dark mb-2">Delete Testimonial?</h3>
            <p className="font-body text-charcoal-light text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-body font-semibold text-charcoal-dark hover:bg-gray-50 transition-colors text-sm">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-body font-semibold transition-colors text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-heading text-lg font-bold text-charcoal-dark">
                  {editTarget ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-charcoal-light hover:text-charcoal-dark transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                {error && <p className="text-red-500 font-body text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Name *</label>
                    <input name="name" value={form.name ?? ''} onChange={handleChange} required className="input-field" placeholder="Traveller name" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Location</label>
                    <input name="location" value={form.location ?? ''} onChange={handleChange} className="input-field" placeholder="Mumbai, India" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Trek Name</label>
                    <input name="trek" value={form.trek ?? ''} onChange={handleChange} className="input-field" placeholder="Kedarkantha Trek" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Date</label>
                    <input name="date" value={form.date ?? ''} onChange={handleChange} className="input-field" placeholder="January 2024" />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Rating (1–5)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm(p => ({ ...p, rating: n }))}
                        className={`p-1 rounded-lg transition-colors ${(form.rating ?? 5) >= n ? 'text-amber-500' : 'text-gray-300'}`}
                      >
                        <Star size={22} className={(form.rating ?? 5) >= n ? 'fill-amber-500' : ''} />
                      </button>
                    ))}
                    <span className="font-body text-sm text-charcoal-light self-center ml-1">{form.rating}/5</span>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Review *</label>
                  <textarea name="review" value={form.review ?? ''} onChange={handleChange} required rows={4} className="input-field resize-none" placeholder="Share your experience…" />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Avatar URL</label>
                  <input name="photo" value={form.photo ?? ''} onChange={handleChange} className="input-field" placeholder="https://…" />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="t-featured" name="featured" checked={!!form.featured} onChange={handleChange} className="w-4 h-4 accent-forest" />
                  <label htmlFor="t-featured" className="font-body text-sm text-charcoal-dark">Featured testimonial</label>
                </div>
              </form>

              <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-body font-semibold text-charcoal-dark hover:bg-gray-50 transition-colors text-sm">
                  Cancel
                </button>
                <button
                  onClick={handleSubmit as unknown as React.MouseEventHandler}
                  disabled={saving}
                  className="flex-1 px-4 py-2 bg-forest hover:bg-forest-dark text-white rounded-xl font-body font-semibold transition-colors text-sm disabled:opacity-60"
                >
                  {saving ? 'Saving…' : editTarget ? 'Save Changes' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          font-family: var(--font-inter), sans-serif;
          font-size: 0.875rem;
          color: #292524;
          background: white;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input-field:focus {
          outline: none;
          border-color: #2d5a3f;
          box-shadow: 0 0 0 3px rgba(45,90,63,0.12);
        }
      `}</style>
    </div>
  );
}
