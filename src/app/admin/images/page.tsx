'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileImage, LogOut, Trash2, Copy, ChevronLeft, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface UploadedImage {
  name: string;
  url: string;
}

export default function AdminImagesPage() {
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const fetchImages = useCallback(() => {
    setLoading(true);
    fetch('/api/upload')
      .then(r => r.json())
      .then(d => { setImages(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        fetchImages();
      } else {
        setUploadError(data.error ?? 'Upload failed.');
      }
    } catch {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (name: string) => {
    try {
      await fetch(`/api/upload?name=${encodeURIComponent(name)}`, { method: 'DELETE' });
      setDeleteTarget(null);
      fetchImages();
    } catch {
      /* no-op */
    }
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      /* clipboard access denied — no-op */
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-forest-dark shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/60 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </Link>
            <FileImage size={22} className="text-amber" />
            <p className="font-heading text-lg font-bold text-white">Image Manager</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/70 hover:text-white font-body text-sm transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold text-charcoal-dark">Manage Images</h1>
            <p className="font-body text-charcoal-light text-sm mt-0.5">
              Upload images to use across expeditions, gallery and testimonials.
            </p>
          </div>
          <label className="flex items-center gap-2 bg-forest hover:bg-forest-dark text-white font-body font-semibold px-4 py-2 rounded-xl transition-colors text-sm cursor-pointer">
            <Upload size={16} />
            {uploading ? 'Uploading…' : 'Upload Image'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {uploadError && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 font-body text-sm rounded-xl px-4 py-3">
            <span className="flex-1">{uploadError}</span>
            <button onClick={() => setUploadError('')}><X size={14} /></button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <FileImage size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="font-body text-charcoal-light">No images uploaded yet.</p>
            <p className="font-body text-charcoal-light text-sm mt-1">
              Click &quot;Upload Image&quot; to add your first photo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map(img => (
              <div
                key={img.name}
                className="relative group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 aspect-square"
              >
                <Image
                  src={img.url}
                  alt={img.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleCopy(img.url)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-charcoal-dark rounded-lg font-body text-xs font-semibold transition-colors"
                  >
                    <Copy size={12} />
                    {copiedUrl === img.url ? 'Copied!' : 'Copy Path'}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(img.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/90 hover:bg-red-500 text-white rounded-lg font-body text-xs font-semibold transition-colors"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="font-body text-white text-xs truncate">{img.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-heading text-lg font-bold text-charcoal-dark mb-2">Delete Image?</h3>
            <p className="font-body text-charcoal-light text-sm mb-1">
              <span className="font-semibold text-charcoal-dark">{deleteTarget}</span>
            </p>
            <p className="font-body text-charcoal-light text-sm mb-5">
              This will permanently remove the file. Any pages using this image will show a broken image.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl font-body font-semibold text-charcoal-dark hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-body font-semibold transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
