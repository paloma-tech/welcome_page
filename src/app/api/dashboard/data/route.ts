import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenServer } from '@/lib/server-auth';
import { fetchDashboardData } from '@/lib/minio';

export async function GET(request: NextRequest) {
  try {
    // Get the license key from the query parameters
    const url = new URL(request.url);
    const licenseKey = url.searchParams.get('key');

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, message: 'License key is required' },
        { status: 400 }
      );
    }

    // In development mode, we'll skip authentication for certain license keys
    // In production, we always verify the token
    let userData = null;

    // Special case for development mode with test license key
    if (process.env.NODE_ENV === 'development' && licenseKey === 'test-license') {
      console.log('Development mode with test license key - skipping authentication');
    } else {
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
      userData = await verifyTokenServer(token);

      if (!userData) {
        return NextResponse.json(
          { success: false, message: 'Invalid token' },
          { status: 401 }
        );
      }
    }

    try {
      // Fetch data from Minio for this user's license key
      console.log(`Attempting to fetch data from Minio for license key: ${licenseKey}`);

      // Fetch the dashboard data from Minio
      const minioData = await fetchDashboardData(licenseKey);

      console.log('Successfully fetched data from Minio');

      // Check if the data has the new structure with dashboard_data property
      if (minioData && minioData.dashboard_data) {
        console.log('Found dashboard_data property, using new data structure');

        // Extract the dashboard data and last_updated information
        const { dashboard_data, last_updated, internet_connected, sync_mode } = minioData;

        // Return the dashboard data along with metadata
        return NextResponse.json({
          ...dashboard_data,
          metadata: {
            last_updated,
            internet_connected,
            sync_mode
          }
        });
      } else {
        console.log('Using legacy data structure');
        // Return the data directly as it's already in the expected format
        return NextResponse.json(minioData);
      }
    } catch (minioError: any) {
      console.error('Error fetching from Minio:', minioError);

      // Log detailed error information
      if (minioError.name) {
        console.error(`Error type: ${minioError.name}`);
      }

      if (minioError.message) {
        console.error(`Error message: ${minioError.message}`);
      }

      // Return a proper error response
      return NextResponse.json(
        {
          success: false,
          message: `No dashboard data found for license key: ${licenseKey}`,
          error: minioError.message || 'Unknown error'
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error processing dashboard data request:', error);

    // Return a detailed error message
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing dashboard data request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
