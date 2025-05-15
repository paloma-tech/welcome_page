import { NextResponse } from 'next/server';
import { validateAccessToken } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Basic validation
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    // Validate the token
    const result = await validateAccessToken(token);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    // Return the user data
    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
