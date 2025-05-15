import { NextResponse } from 'next/server';
import { verifyEmail, getUserByVerificationToken, generateAccessToken } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Get the token from the URL
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Get the user associated with this token before verification
    const user = await getUserByVerificationToken(token);

    if (!user) {
      return NextResponse.redirect(new URL('/verification-failed', request.url));
    }

    // Verify the email
    const result = await verifyEmail(token);

    if (result.success) {
      // Generate an access token for the user
      const tokenResult = await generateAccessToken(user.id);

      if (!tokenResult.success) {
        return NextResponse.redirect(new URL('/verification-failed', request.url));
      }

      // Redirect to a special verification success page with the token
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;
      const successUrl = new URL(`/email-verified?token=${tokenResult.token}`, baseUrl);
      return NextResponse.redirect(successUrl);
    } else {
      // Redirect to an error page
      return NextResponse.redirect(new URL('/verification-failed', request.url));
    }
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Email verification failed' },
      { status: 500 }
    );
  }
}
