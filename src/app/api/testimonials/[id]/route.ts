import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Testimonial } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'testimonials.json');

async function readTestimonials(): Promise<Testimonial[]> {
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonials = await readTestimonials();
    const index = testimonials.findIndex(t => t.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    const updated: Testimonial = await request.json();
    testimonials[index] = updated;
    await fs.writeFile(dataFilePath, JSON.stringify(testimonials, null, 2));
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const testimonials = await readTestimonials();
    const filtered = testimonials.filter(t => t.id !== params.id);
    if (filtered.length === testimonials.length) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
