import { NextResponse } from 'next/server';
import { insertContact, initDatabase } from '@/lib/db';

// Initialize database on first request
let isInitialized = false;

export async function POST(req: Request) {
  try {
    // Initialize database if not already done
    if (!isInitialized) {
      await initDatabase();
      isInitialized = true;
    }

    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert contact into database
    await insertContact({
      name: data.name,
      company: data.company || '',
      email: data.email,
      message: data.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}