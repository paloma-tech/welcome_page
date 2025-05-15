import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

// Get Minio configuration from environment variables
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'hXPG1lHBW3B6bwlgLmZo';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'b56q2HJmY4lSqynZG6dl5GPlLChLUXS0xJJKqE4X';
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION || 'us-east-1';
const AWS_ENDPOINT = process.env.AWS_ENDPOINT || 'http://data.paloma.tn:9000';
const AWS_BUCKET = process.env.AWS_BUCKET || 'data';
const AWS_USE_PATH_STYLE_ENDPOINT = process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'true';

// Log Minio configuration (without sensitive data)
console.log('Minio Configuration:');
console.log(`- Endpoint: ${AWS_ENDPOINT}`);
console.log(`- Region: ${AWS_DEFAULT_REGION}`);
console.log(`- Bucket: ${AWS_BUCKET}`);
console.log(`- Path Style Endpoint: ${AWS_USE_PATH_STYLE_ENDPOINT}`);

// Initialize the S3 client with Minio configuration
const s3Client = new S3Client({
  region: AWS_DEFAULT_REGION,
  endpoint: AWS_ENDPOINT,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: AWS_USE_PATH_STYLE_ENDPOINT,
});

// Bucket name
const bucketName = AWS_BUCKET;

/**
 * Fetches a JSON file from Minio storage
 * @param key - The license key used as the filename
 * @returns The parsed JSON data
 */
export async function fetchDashboardData(key: string): Promise<any> {
  try {
    console.log(`Fetching dashboard data for key: ${key}`);

    if (!key) {
      throw new Error('License key is required');
    }

    // Construct the file path - the JSON files are stored directly in the data bucket
    const filePath = `${key}.json`;
    console.log(`File path: ${filePath}`);
    console.log(`Full Minio path: ${AWS_ENDPOINT}/${bucketName}/${filePath}`);

    // Create the command to get the object
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: filePath,
    });

    // Execute the command
    console.log('Sending request to Minio...');
    const response = await s3Client.send(command);
    console.log('Successfully received response from Minio');

    // Read the stream
    console.log('Reading data stream...');
    const streamReader = response.Body?.transformToString();
    if (!streamReader) {
      throw new Error('Failed to read data stream');
    }

    // Parse the JSON data
    console.log('Parsing JSON data...');
    const streamData = await streamReader;
    console.log(`Received data length: ${streamData.length} characters`);

    try {
      const jsonData = JSON.parse(streamData);
      console.log('Successfully parsed JSON data');
      return jsonData;
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      console.error('First 100 characters of data:', streamData.substring(0, 100));
      throw new Error('Invalid JSON data in file');
    }
  } catch (error: any) {
    console.error('Error fetching dashboard data from Minio:', error);

    // Provide more detailed error information
    if (error.name === 'NoSuchKey') {
      console.error(`File not found in Minio: ${bucketName}/${key}.json`);
      throw new Error(`Dashboard data file not found for license key: ${key}. Please ensure your data has been uploaded to Minio.`);
    } else if (error.name === 'CredentialsProviderError') {
      console.error('Invalid Minio credentials');
      throw new Error('Failed to authenticate with Minio service. Please check your credentials.');
    } else if (error.name === 'NetworkError') {
      console.error('Network error connecting to Minio');
      throw new Error('Failed to connect to Minio service. Please check your network connection.');
    } else if (error.name === 'AccessDenied') {
      console.error('Access denied to Minio bucket or object');
      throw new Error('Access denied to your dashboard data. Please contact support.');
    }

    // For any other errors, provide a generic message
    throw new Error(`Failed to retrieve dashboard data: ${error.message || 'Unknown error'}`);

  }
}
