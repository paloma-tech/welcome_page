import { NextResponse } from 'next/server';
import { insertUser, createVerificationToken } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { fullName, email, password, company, adresse, phone } = await request.json();

    // Basic validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Format phone number if present
    const formattedPhone = phone ? phone : null;

    // Log the phone number for debugging
    console.log('Phone number received:', phone);
    console.log('Formatted phone number:', formattedPhone);

    // Insert user into database
    const result: any = await insertUser({
      fullName,
      email,
      password: hashedPassword,
      company,
      adresse,
      phone: formattedPhone,
      email_verified_at: null, // This will be set when the user verifies their email
    });

    // Create a verification token
    const userId = result.insertId;
    const verificationToken = await createVerificationToken(userId);

    // Construct the base URL for verification link
    // In production, always use the NEXT_PUBLIC_APP_URL from environment
    // In development, fallback to constructing from headers
    let baseUrl = '';
    if (process.env.NODE_ENV === 'production') {
      baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
      console.log('Using production base URL from env:', baseUrl);
    } else {
      baseUrl = `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;
      console.log('Using development base URL from headers:', baseUrl);
    }

    console.log('Final base URL for verification email:', baseUrl);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('RESEND_API_KEY defined:', !!process.env.RESEND_API_KEY);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
    console.log('Request headers:', {
      host: request.headers.get('host'),
      'x-forwarded-proto': request.headers.get('x-forwarded-proto'),
      'x-forwarded-host': request.headers.get('x-forwarded-host'),
      'x-real-ip': request.headers.get('x-real-ip'),
    });

    // Log all environment variables (excluding sensitive ones)
    console.log('Environment variables:');
    Object.keys(process.env).forEach(key => {
      if (!key.includes('PASSWORD') && !key.includes('SECRET') && !key.includes('KEY')) {
        console.log(`${key}: ${process.env[key]}`);
      } else {
        console.log(`${key}: [REDACTED]`);
      }
    });

    try {
      // Send verification email
      await sendVerificationEmail(email, verificationToken, baseUrl);
      console.log('Verification email sent successfully to:', email);
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      if (emailError instanceof Error) {
        console.error('Error message:', emailError.message);
        console.error('Error stack:', emailError.stack);
      } else {
        console.error('Unknown error type:', typeof emailError);
      }

      // Log the error but continue with registration
      // In a production environment, we might want to notify admins about this issue
      console.error('Registration completed but verification email failed to send');
    }

    return NextResponse.json(
      { success: true, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);

    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    );
  }
}