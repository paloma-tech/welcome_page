import { NextResponse } from 'next/server';
import { getContacts } from '@/lib/db';

export async function GET() {
  try {
    const contacts = await getContacts();
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}