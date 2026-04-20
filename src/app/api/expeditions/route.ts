import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Expedition } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'expeditions.json');

async function readExpeditions(): Promise<Expedition[]> {
  const fileContent = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function GET(request: NextRequest) {
  try {
    const expeditions = await readExpeditions();
    const { searchParams } = new URL(request.url);
    
    let filtered = [...expeditions];
    
    const featured = searchParams.get('featured');
    if (featured === 'true') {
      filtered = filtered.filter(e => e.featured === true);
    }
    
    const difficulty = searchParams.get('difficulty');
    if (difficulty && difficulty !== 'All') {
      filtered = filtered.filter(e => e.difficulty === difficulty);
    }
    
    const type = searchParams.get('type');
    if (type && type !== 'All') {
      filtered = filtered.filter(e => e.type === type);
    }
    
    const region = searchParams.get('region');
    if (region && region !== 'All') {
      filtered = filtered.filter(e => e.region === region);
    }
    
    const status = searchParams.get('status');
    if (status && status !== 'All') {
      filtered = filtered.filter(e => e.status === status);
    }
    
    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch expeditions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const expeditions = await readExpeditions();
    const newExpedition: Expedition = await request.json();
    expeditions.push(newExpedition);
    await fs.writeFile(dataFilePath, JSON.stringify(expeditions, null, 2));
    return NextResponse.json(newExpedition, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create expedition' }, { status: 500 });
  }
}
