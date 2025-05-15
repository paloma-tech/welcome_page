import { NextResponse } from 'next/server';
import { validateAccessToken, checkUserLicense } from '@/lib/db';

export async function GET(request: Request) {
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
    
    // Check if the user has a valid license
    const licenseResult = await checkUserLicense(validationResult.user.id);
    
    return NextResponse.json({
      success: true,
      hasValidLicense: licenseResult.hasValidLicense,
      license: licenseResult.license
    });
  } catch (error) {
    console.error('License check error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check license' },
      { status: 500 }
    );
  }
}
