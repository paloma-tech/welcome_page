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
      let baseUrl = '';

      // First try to get from environment variable
      if (process.env.NEXT_PUBLIC_APP_URL) {
        baseUrl = process.env.NEXT_PUBLIC_APP_URL;
        console.log('Using APP_URL from environment for redirect:', baseUrl);
      }
      // If not available, construct from request headers
      else {
        const host = request.headers.get('host') || 'www.paloma.tn';
        const proto = request.headers.get('x-forwarded-proto') || 'https';
        baseUrl = `${proto}://${host}`;
        console.log('Constructed base URL from headers for redirect:', baseUrl);
      }

      // Ensure the baseUrl has a protocol
      if (!baseUrl.startsWith('http')) {
        baseUrl = `https://${baseUrl}`;
        console.log('Added https protocol to base URL for redirect:', baseUrl);
      }

      // Ensure the baseUrl doesn't have a trailing slash
      if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
      }

      console.log('Final base URL for redirect:', baseUrl);
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
