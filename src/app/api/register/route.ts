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

    try {
      // Send verification email
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${request.headers.get('x-forwarded-proto') || 'http'}://${request.headers.get('host')}`;
      console.log('Using base URL for verification:', baseUrl);
      console.log('Email configuration:', {
        username: process.env.SMTP_USER ? 'Set (SMTP_USER)' :
                  process.env.MAIL_USERNAME ? 'Set (MAIL_USERNAME)' : 'Not set (using fallback)',
        password: process.env.SMTP_PASSWORD ? 'Set (SMTP_PASSWORD)' :
                  process.env.MAIL_PASSWORD ? 'Set (MAIL_PASSWORD)' : 'Not set (using fallback)',
        from: process.env.EMAIL_FROM || '"Paloma Tech Solutions" <no-reply@palomaerp.com>',
      });
      await sendVerificationEmail(email, verificationToken, baseUrl);
      console.log('Verification email sent successfully to:', email);
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      console.error('Error details:', JSON.stringify(emailError, null, 2));
      // Continue with registration even if email fails
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