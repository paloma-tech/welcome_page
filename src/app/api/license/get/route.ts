import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenServer } from '@/lib/server-auth';
import { getUserLicenseKey } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Verify the token using server-side function (async)
    const userData = await verifyTokenServer(token);

    if (!userData) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get the user's license key from the database
    const userId = userData.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID not found in token' },
        { status: 400 }
      );
    }

    console.log(`Getting license key for user ID: ${userId}`);

    try {
      console.log(`Attempting to get license key for user ID: ${userId}`);

      // Get the license key from the database
      const licenseResult = await getUserLicenseKey(userId);
      console.log('License key result:', licenseResult);

      if (!licenseResult.success) {
        console.log(`No license key found for user ID: ${userId}`);

        // If no license key is found, return an error
        return NextResponse.json({
          success: false,
          message: `No license key found for user ID: ${userId}. Please contact support to assign a license key to your account.`,
          source: 'database'
        }, { status: 404 });
      }

      console.log(`Found license key for user ID ${userId}: ${licenseResult.licenseKey}`);

      return NextResponse.json({
        success: true,
        licenseKey: licenseResult.licenseKey,
        source: 'database'
      });
    } catch (dbError) {
      console.error('Error accessing database:', dbError);

      // If there's a database error, return an error
      return NextResponse.json({
        success: false,
        message: 'Error accessing database. Please try again later.',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error getting license key:', error);

    // Return a detailed error message
    return NextResponse.json({
      success: false,
      message: 'Error processing license key request',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
