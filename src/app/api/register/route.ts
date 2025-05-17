import { NextResponse } from 'next/server';
import { insertUser, createVerificationToken } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import bcrypt from 'bcryptjs';
import { formatPhone } from '@/lib/utils';

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

    try {
      // Send verification email
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;
      console.log('Using base URL for verification email:', baseUrl);
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('RESEND_API_KEY defined:', !!process.env.RESEND_API_KEY);
      console.log('EMAIL_FROM:', process.env.EMAIL_FROM);

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
      // Continue with registration even if email fails, but log detailed error information
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