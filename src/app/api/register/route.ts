import { NextResponse } from 'next/server';
import { insertUser } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { fullName, email, password, company } = await request.json();

    // Basic validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    await insertUser({
      fullName,
      email,
      password: hashedPassword,
      company,
    });

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