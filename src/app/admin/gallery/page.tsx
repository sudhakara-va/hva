'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Images, LogOut, Plus, Trash2, X, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { GalleryPhoto } from '@/lib/types';

const EMPTY: Partial<GalleryPhoto> = {
  title: '', category: 'Trek', expedition: '', url: '', featured: false,
};

const CATEGORIES: GalleryPhoto['category'][] = ['Trek', 'Expedition', 'Camp', 'Wildlife', 'Culture'];

export default function AdminGalleryPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<GalleryPhoto>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const fetchData = () => {
    setLoading(true);
    fetch('/api/gallery')
      .then(r => r.json())
      .then(d => { setPhotos(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) { setError('Image URL is required.'); return; }
    setSaving(true);
    setError('');
    try {
      const payload: GalleryPhoto = {
        id: `photo-${Date.now()}`,
        title: form.title ?? '',
        category: form.category ?? 'Trek',
        expedition: form.expedition ?? '',
        url: form.url ?? '',
        featured: form.featured ?? false,
      };
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setShowForm(false);
        setForm(EMPTY);
        fetchData();
      } else {
        const data = await res.json();
        setError(data.error ?? 'Failed to add photo.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
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

  const filtered = filterCategory === 'All' ? photos : photos.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-forest-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <Images size={22} className="text-amber" />
            <p className="font-heading text-lg font-bold text-white">Gallery</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="font-heading text-2xl font-bold text-charcoal-dark">Manage Gallery</h1>
          <button
            onClick={() => { setForm(EMPTY); setError(''); setShowForm(true); }}
            className="flex items-center gap-2 bg-forest hover:bg-forest-dark text-white font-body font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <Plus size={16} /> Add Photo
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-semibold whitespace-nowrap transition-all ${filterCategory === cat ? 'bg-forest text-white' : 'bg-white text-charcoal-light border border-gray-200 hover:border-forest'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <div key={i} className="bg-white rounded-xl aspect-square animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-charcoal-light font-body">No photos yet. Add your first one!</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(photo => (
              <div key={photo.id} className="relative group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
                <Image
                  src={photo.url}
                  alt={photo.title || 'Gallery photo'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="font-body text-white text-xs font-semibold truncate">{photo.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-white/70 text-xs">{photo.category}</span>
                      <button
                        onClick={() => setDeleteId(photo.id)}
                        className="p-1 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
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
            <h3 className="font-heading text-lg font-bold text-charcoal-dark mb-2">Delete Photo?</h3>
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

      {/* Add photo modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-heading text-lg font-bold text-charcoal-dark">Add Photo</h3>
              <button onClick={() => setShowForm(false)} className="text-charcoal-light hover:text-charcoal-dark transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {error && <p className="text-red-500 font-body text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

              <div>
                <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Image URL *</label>
                <input name="url" value={form.url ?? ''} onChange={handleChange} required className="input-field" placeholder="https://…" />
              </div>

              <div>
                <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Title</label>
                <input name="title" value={form.title ?? ''} onChange={handleChange} className="input-field" placeholder="Photo title" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Category</label>
                  <select name="category" value={form.category ?? 'Trek'} onChange={handleChange} className="input-field">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Expedition Tag</label>
                  <input name="expedition" value={form.expedition ?? ''} onChange={handleChange} className="input-field" placeholder="kedarkantha-trek" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured-photo" name="featured" checked={!!form.featured} onChange={handleChange} className="w-4 h-4 accent-forest" />
                <label htmlFor="featured-photo" className="font-body text-sm text-charcoal-dark">Featured photo</label>
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
                {saving ? 'Saving…' : 'Add Photo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
