import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Expedition } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'expeditions.json');

async function readExpeditions(): Promise<Expedition[]> {
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const expeditions = await readExpeditions();
    const expedition = expeditions.find(e => e.slug === params.slug);
    if (!expedition) {
      return NextResponse.json({ error: 'Expedition not found' }, { status: 404 });
    }
    return NextResponse.json(expedition);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch expedition' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const expeditions = await readExpeditions();
    const index = expeditions.findIndex(e => e.slug === params.slug);
    if (index === -1) {
      return NextResponse.json({ error: 'Expedition not found' }, { status: 404 });
    }
    const updated: Expedition = await request.json();
    expeditions[index] = updated;
    await fs.writeFile(dataFilePath, JSON.stringify(expeditions, null, 2));
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update expedition' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const expeditions = await readExpeditions();
    const filtered = expeditions.filter(e => e.slug !== params.slug);
    if (filtered.length === expeditions.length) {
      return NextResponse.json({ error: 'Expedition not found' }, { status: 404 });
    }
    await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete expedition' }, { status: 500 });
  }
}
