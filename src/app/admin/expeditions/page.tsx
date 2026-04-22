'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mountain, LogOut, Plus, Pencil, Trash2, X, ChevronLeft } from 'lucide-react';
import { Expedition } from '@/lib/types';
import ImageUpload from '@/components/ui/ImageUpload';

const EMPTY: Partial<Expedition> = {
  title: '', slug: '', tagline: '', description: '', difficulty: 'Moderate',
  type: 'Trek', region: 'Garhwal', altitude: 0, altitudeText: '',
  duration: 0, durationText: '', price: 0, priceText: '',
  startMonth: '', endMonth: '', bestSeason: '', featured: false,
  status: 'Upcoming', coverImage: '', galleryImages: [],
  itinerary: [], included: [], excluded: [], highlights: [],
  maxGroupSize: 12, minAge: 12, meetingPoint: '',
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminExpeditionsPage() {
  const router = useRouter();
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Expedition | null>(null);
  const [form, setForm] = useState<Partial<Expedition>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchData = () => {
    setLoading(true);
    fetch('/api/expeditions')
      .then(r => r.json())
      .then(d => { setExpeditions(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY);
    setError('');
    setShowForm(true);
  };

  const openEdit = (exp: Expedition) => {
    setEditTarget(exp);
    setForm({ ...exp });
    setError('');
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(p => ({
      ...p,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value),
    }));
    if (name === 'title' && !editTarget) {
      setForm(p => ({ ...p, slug: slugify(value) }));
    }
  };

  const handleArrayField = (field: keyof Expedition, value: string) => {
    setForm(p => ({ ...p, [field]: value.split('\n').filter(Boolean) }));
  };

  const handleItinerary = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setForm(p => ({ ...p, itinerary: parsed }));
      setError('');
    } catch {
      setError('Itinerary JSON is invalid. Please check formatting.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) { setError('Title and slug are required.'); return; }
    setSaving(true);
    setError('');
    try {
      const payload: Expedition = {
        id: editTarget?.id ?? `exp-${Date.now()}`,
        ...EMPTY,
        ...form,
      } as Expedition;

      let res: Response;
      if (editTarget) {
        res = await fetch(`/api/expeditions/${editTarget.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/expeditions', {
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

  const handleDelete = async (slug: string) => {
    try {
      await fetch(`/api/expeditions/${slug}`, { method: 'DELETE' });
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

  const difficultyOptions = ['Easy', 'Easy/Moderate', 'Moderate', 'Difficult'];
  const typeOptions = ['Trek', 'Expedition', 'Fun Activity'];
  const regionOptions = ['Garhwal', 'Kumaon'];
  const statusOptions = ['Upcoming', 'Ongoing', 'Completed'];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-forest-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <Mountain size={22} className="text-amber" />
            <p className="font-heading text-lg font-bold text-white">Expeditions</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold text-charcoal-dark">Manage Expeditions</h1>
          <button onClick={openCreate} className="flex items-center gap-2 bg-forest hover:bg-forest-dark text-white font-body font-semibold px-4 py-2 rounded-xl transition-colors text-sm">
            <Plus size={16} /> Add Expedition
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="bg-white rounded-xl h-16 animate-pulse" />)}</div>
        ) : expeditions.length === 0 ? (
          <div className="text-center py-20 text-charcoal-light font-body">No expeditions yet. Add your first one!</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-charcoal-light font-semibold">Title</th>
                    <th className="px-4 py-3 text-left text-charcoal-light font-semibold hidden md:table-cell">Type</th>
                    <th className="px-4 py-3 text-left text-charcoal-light font-semibold hidden md:table-cell">Difficulty</th>
                    <th className="px-4 py-3 text-left text-charcoal-light font-semibold hidden lg:table-cell">Price</th>
                    <th className="px-4 py-3 text-left text-charcoal-light font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-charcoal-light font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {expeditions.map(exp => (
                    <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-charcoal-dark">{exp.title}</td>
                      <td className="px-4 py-3 text-charcoal-light hidden md:table-cell">{exp.type}</td>
                      <td className="px-4 py-3 text-charcoal-light hidden md:table-cell">{exp.difficulty}</td>
                      <td className="px-4 py-3 text-charcoal-light hidden lg:table-cell">{exp.priceText}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${exp.status === 'Upcoming' ? 'bg-forest/10 text-forest' : exp.status === 'Ongoing' ? 'bg-amber/10 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                          {exp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(exp)} className="p-1.5 rounded-lg bg-forest/10 text-forest hover:bg-forest hover:text-white transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => setDeleteId(exp.slug)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-charcoal-dark mb-2">Delete Expedition?</h3>
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-heading text-lg font-bold text-charcoal-dark">
                  {editTarget ? 'Edit Expedition' : 'Add New Expedition'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-charcoal-light hover:text-charcoal-dark transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
                {error && <p className="text-red-500 font-body text-sm bg-red-50 rounded-xl px-4 py-3">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Title *</label>
                    <input name="title" value={form.title ?? ''} onChange={handleChange} required className="input-field" placeholder="Trek title" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Slug *</label>
                    <input name="slug" value={form.slug ?? ''} onChange={handleChange} required className="input-field" placeholder="trek-slug" />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Tagline</label>
                  <input name="tagline" value={form.tagline ?? ''} onChange={handleChange} className="input-field" placeholder="Short tagline" />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Description</label>
                  <textarea name="description" value={form.description ?? ''} onChange={handleChange} rows={3} className="input-field resize-none" placeholder="Full description…" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Difficulty</label>
                    <select name="difficulty" value={form.difficulty ?? 'Moderate'} onChange={handleChange} className="input-field">
                      {difficultyOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Type</label>
                    <select name="type" value={form.type ?? 'Trek'} onChange={handleChange} className="input-field">
                      {typeOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Region</label>
                    <select name="region" value={form.region ?? 'Garhwal'} onChange={handleChange} className="input-field">
                      {regionOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Status</label>
                    <select name="status" value={form.status ?? 'Upcoming'} onChange={handleChange} className="input-field">
                      {statusOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Altitude (ft)</label>
                    <input type="number" name="altitude" value={form.altitude ?? 0} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Altitude Text</label>
                    <input name="altitudeText" value={form.altitudeText ?? ''} onChange={handleChange} className="input-field" placeholder="12,500 ft" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Duration (days)</label>
                    <input type="number" name="duration" value={form.duration ?? 0} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Duration Text</label>
                    <input name="durationText" value={form.durationText ?? ''} onChange={handleChange} className="input-field" placeholder="6 Days / 5 Nights" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Price (₹)</label>
                    <input type="number" name="price" value={form.price ?? 0} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Price Text</label>
                    <input name="priceText" value={form.priceText ?? ''} onChange={handleChange} className="input-field" placeholder="₹8,500" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Max Group Size</label>
                    <input type="number" name="maxGroupSize" value={form.maxGroupSize ?? 12} onChange={handleChange} className="input-field" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Start Month</label>
                    <input name="startMonth" value={form.startMonth ?? ''} onChange={handleChange} className="input-field" placeholder="December" />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">End Month</label>
                    <input name="endMonth" value={form.endMonth ?? ''} onChange={handleChange} className="input-field" placeholder="April" />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Best Season</label>
                  <input name="bestSeason" value={form.bestSeason ?? ''} onChange={handleChange} className="input-field" placeholder="December to April" />
                </div>

                <div>
                  <ImageUpload
                    label="Cover Image"
                    value={form.coverImage ?? ''}
                    onChange={url => setForm(p => ({ ...p, coverImage: url }))}
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Gallery Image URLs (one per line)</label>
                  <textarea
                    rows={3}
                    value={(form.galleryImages ?? []).join('\n')}
                    onChange={e => handleArrayField('galleryImages', e.target.value)}
                    className="input-field resize-none"
                    placeholder="https://…&#10;https://…"
                  />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Highlights (one per line)</label>
                  <textarea rows={3} value={(form.highlights ?? []).join('\n')} onChange={e => handleArrayField('highlights', e.target.value)} className="input-field resize-none" placeholder="360° panoramic views…" />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Included (one per line)</label>
                  <textarea rows={3} value={(form.included ?? []).join('\n')} onChange={e => handleArrayField('included', e.target.value)} className="input-field resize-none" placeholder="All meals…" />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Excluded (one per line)</label>
                  <textarea rows={3} value={(form.excluded ?? []).join('\n')} onChange={e => handleArrayField('excluded', e.target.value)} className="input-field resize-none" placeholder="Personal gear…" />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">Meeting Point</label>
                  <input name="meetingPoint" value={form.meetingPoint ?? ''} onChange={handleChange} className="input-field" placeholder="Dehradun ISBT" />
                </div>

                <div>
                  <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">
                    Itinerary (JSON array)
                  </label>
                  <textarea
                    rows={5}
                    defaultValue={JSON.stringify(form.itinerary ?? [], null, 2)}
                    onChange={e => handleItinerary(e.target.value)}
                    className="input-field resize-none font-mono text-xs"
                    placeholder={'[\n  {"day": 1, "title": "Day 1", "description": "…"}\n]'}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured" name="featured" checked={!!form.featured} onChange={handleChange} className="w-4 h-4 accent-forest" />
                  <label htmlFor="featured" className="font-body text-sm text-charcoal-dark">Featured on homepage</label>
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
                  {saving ? 'Saving…' : editTarget ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
