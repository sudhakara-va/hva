import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { GalleryPhoto } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'gallery.json');

async function readGallery(): Promise<GalleryPhoto[]> {
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function GET(request: NextRequest) {
  try {
    const photos = await readGallery();
    const { searchParams } = new URL(request.url);
    
    let filtered = [...photos];
    
    const category = searchParams.get('category');
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    const expedition = searchParams.get('expedition');
    if (expedition) {
      filtered = filtered.filter(p => p.expedition === expedition);
    }
    
    const featured = searchParams.get('featured');
    if (featured === 'true') {
      filtered = filtered.filter(p => p.featured === true);
    }
    
    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const photos = await readGallery();
    const newPhoto: GalleryPhoto = await request.json();
    photos.push(newPhoto);
    await fs.writeFile(dataFilePath, JSON.stringify(photos, null, 2));
    return NextResponse.json(newPhoto, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 });
  }
}
