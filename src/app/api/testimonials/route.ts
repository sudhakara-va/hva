import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Testimonial } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'testimonials.json');

async function readTestimonials(): Promise<Testimonial[]> {
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function GET(request: NextRequest) {
  try {
    const testimonials = await readTestimonials();
    const { searchParams } = new URL(request.url);
    
    let filtered = [...testimonials];
    
    const featured = searchParams.get('featured');
    if (featured === 'true') {
      filtered = filtered.filter(t => t.featured === true);
    }
    
    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const testimonials = await readTestimonials();
    const newTestimonial: Testimonial = await request.json();
    testimonials.push(newTestimonial);
    await fs.writeFile(dataFilePath, JSON.stringify(testimonials, null, 2));
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add testimonial' }, { status: 500 });
  }
}
