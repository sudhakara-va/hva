import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ContactForm } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'contacts.json');

export async function POST(request: NextRequest) {
  try {
    const formData: ContactForm = await request.json();
    
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    let contacts: Array<ContactForm & { id: string; createdAt: string }> = [];
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8');
      contacts = JSON.parse(fileContent);
    } catch {
      // File doesn't exist yet, start with empty array
    }
    
    const newContact = {
      ...formData,
      id: `contact-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    contacts.push(newContact);
    await fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your inquiry! We will contact you within 24 hours.' 
    });
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}
