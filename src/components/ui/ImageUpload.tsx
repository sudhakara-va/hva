'use client';
import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  placeholder = 'https://… or upload an image',
  label,
  required,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

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
        onChange(data.url);
      } else {
        setUploadError(data.error ?? 'Upload failed. Please try again.');
      }
    } catch {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block font-body text-xs font-semibold text-charcoal-dark mb-1">
          {label}{required && ' *'}
        </label>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="input-field flex-1"
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 bg-forest/10 hover:bg-forest text-forest hover:text-white rounded-xl font-body text-xs font-semibold transition-colors disabled:opacity-60 whitespace-nowrap flex-shrink-0"
        >
          <Upload size={14} />
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {uploadError && (
        <p className="text-red-500 font-body text-xs">{uploadError}</p>
      )}
      {value && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            unoptimized
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X size={12} />
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
