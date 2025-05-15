import { NextResponse } from 'next/server';
import { createPasswordResetToken } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Create a password reset token
    const result = await createPasswordResetToken(email);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    // Send password reset email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;
    await sendPasswordResetEmail(email, result.token, baseUrl);

    return NextResponse.json({
      success: true,
      message: 'Password reset instructions sent to your email',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
