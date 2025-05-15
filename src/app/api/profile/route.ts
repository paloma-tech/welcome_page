import { NextResponse } from 'next/server';
import { validateAccessToken, updateUserProfile } from '@/lib/db';
import { formatPhone } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token is required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Validate the token and get the user
    const result = await validateAccessToken(token);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    });
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token is required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Validate the token and get the user
    const validationResult = await validateAccessToken(token);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: validationResult.message },
        { status: 401 }
      );
    }

    const { fullName, company, adresse, phone } = await request.json();
    const email = validationResult.user.email;

    // Log the phone number for debugging
    console.log('Profile update - Phone number received:', phone);

    // Update user profile
    await updateUserProfile({
      email,
      fullName,
      company,
      adresse,
      phone,
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
