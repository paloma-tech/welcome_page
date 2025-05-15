import { NextResponse } from 'next/server';
import { getUserByEmail, generateAccessToken } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await getUserByEmail(email);

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.email_verified_at) {
      return NextResponse.json(
        { success: false, message: 'Please verify your email before logging in' },
        { status: 401 }
      );
    }

    // Generate access token
    const tokenResult = await generateAccessToken(user.id);

    if (!tokenResult.success) {
      return NextResponse.json(
        { success: false, message: 'Failed to generate access token' },
        { status: 500 }
      );
    }

    // Don't include password in the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token: tokenResult.token,
      expires_at: tokenResult.expires_at,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}
