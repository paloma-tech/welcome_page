import { NextResponse } from 'next/server';
import { generateLicenseKey } from '@/lib/db';

// This is an admin-only endpoint for generating license keys
// In a production environment, this should be protected with proper authentication
export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'standard';
    const expirationDays = searchParams.get('days') ? parseInt(searchParams.get('days')!) : null;

    // Generate a license key
    const result = await generateLicenseKey(type, expirationDays);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to generate license key' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      key: result.key,
      type: result.type,
      expiration_date: result.expiration_date,
      message: "License key generated successfully. This key is pre-activated (used=true) and ready to be assigned to a user."
    });
  } catch (error) {
    console.error('License key generation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate license key' },
      { status: 500 }
    );
  }
}
