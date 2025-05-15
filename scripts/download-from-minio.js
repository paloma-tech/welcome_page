const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

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

// Get license key from command line arguments
const licenseKey = process.argv[2];

// Validate license key
if (!licenseKey) {
  console.error('Error: License key is required');
  console.error('Usage: node download-from-minio.js <license-key>');
  process.exit(1);
}

// Download the file from Minio
async function downloadFromMinio() {
  try {
    console.log(`Downloading data from Minio for license key: ${licenseKey}`);

    // Construct the file path - the JSON files are stored directly in the data bucket
    const filePath = `${licenseKey}.json`;
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
    console.log('Successfully retrieved data from Minio');

    // Read the stream
    const streamReader = response.Body?.transformToString();
    if (streamReader) {
      const streamData = await streamReader;
      console.log(`File content length: ${streamData.length} characters`);
      console.log('First 50 characters:', streamData.substring(0, 50));

      // Save the file to the data directory
      const outputPath = path.join(__dirname, '..', 'data', `${licenseKey}.json`);
      fs.writeFileSync(outputPath, streamData);
      console.log(`File saved to: ${outputPath}`);
    }
  } catch (error) {
    console.error('Error downloading data from Minio:', error);

    // Provide more detailed error information
    if (error.name === 'NoSuchKey') {
      console.error(`File not found in Minio: ${bucketName}/${licenseKey}.json`);
    } else if (error.name === 'CredentialsProviderError') {
      console.error('Invalid Minio credentials. Check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.');
    } else if (error.name === 'NetworkError') {
      console.error('Network error connecting to Minio. Check your AWS_ENDPOINT.');
    } else if (error.name === 'NoSuchBucket') {
      console.error(`Bucket "${bucketName}" does not exist. Check your AWS_BUCKET.`);
    }
  }
}

// Run the download function
downloadFromMinio();
