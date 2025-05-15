import { NextResponse } from 'next/server';
import { validateAccessToken, assignLicenseKey } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token is required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Validate the token and get the user
    const validationResult = await validateAccessToken(token);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: validationResult.message },
        { status: 401 }
      );
    }

    // Get the license key from the request body
    const { licenseKey } = await request.json();

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, message: 'License key is required' },
        { status: 400 }
      );
    }

    // Assign the license key to the user
    const assignResult = await assignLicenseKey(licenseKey, validationResult.user.id);

    if (!assignResult.success) {
      return NextResponse.json(
        { success: false, message: assignResult.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'License key assigned successfully'
    });
  } catch (error) {
    console.error('License assignment error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to assign license key' },
      { status: 500 }
    );
  }
}
