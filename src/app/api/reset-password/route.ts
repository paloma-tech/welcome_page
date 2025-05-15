import { NextResponse } from 'next/server';
import { resetPassword, verifyPasswordResetToken } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    // Basic validation
    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check for password complexity
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must include uppercase and lowercase letters, numbers, and special characters'
        },
        { status: 400 }
      );
    }

    // Verify token
    const verifyResult = await verifyPasswordResetToken(token);
    if (!verifyResult.success) {
      return NextResponse.json(
        { success: false, message: verifyResult.message },
        { status: 400 }
      );
    }

    // Reset password
    const result = await resetPassword(token, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
