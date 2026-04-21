import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { GalleryPhoto } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'gallery.json');

async function readGallery(): Promise<GalleryPhoto[]> {
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const photos = await readGallery();
    const index = photos.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }
    const updated: GalleryPhoto = await request.json();
    photos[index] = updated;
    await fs.writeFile(dataFilePath, JSON.stringify(photos, null, 2));
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const photos = await readGallery();
    const filtered = photos.filter(p => p.id !== id);
    if (filtered.length === photos.length) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }
    await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
  }
}
