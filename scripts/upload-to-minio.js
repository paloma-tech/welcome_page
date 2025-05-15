const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
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
  console.error('Usage: node upload-to-minio.js <license-key>');
  process.exit(1);
}

// Path to the data file to upload
// This script expects a JSON file with the same name as the license key in the data directory
const dataPath = path.join(__dirname, '..', 'data', `${licenseKey}.json`);

// Check if the data file exists
if (!fs.existsSync(dataPath)) {
  console.error(`Error: Data file not found at ${dataPath}`);
  console.error(`Please create a JSON file for license key ${licenseKey} in the data directory`);
  process.exit(1);
}

// Read the data file
const userData = fs.readFileSync(dataPath, 'utf8');

// Validate the user data
function validateUserData(data) {
  try {
    // Parse the data to ensure it's valid JSON
    const parsedData = JSON.parse(data);

    // Check if the data has the new structure with dashboard_data property
    if (parsedData.dashboard_data) {
      console.log('Found dashboard_data property, validating new data structure');

      // Check if the dashboard_data has the expected structure
      if (!parsedData.dashboard_data.summary) {
        console.warn('Warning: dashboard_data is missing the "summary" property');
      }

      if (!parsedData.dashboard_data.salesChart) {
        console.warn('Warning: dashboard_data is missing the "salesChart" property');
      }

      if (!parsedData.dashboard_data.inventoryChart) {
        console.warn('Warning: dashboard_data is missing the "inventoryChart" property');
      }
    } else {
      console.log('Using legacy data structure');

      // Check if the data has the expected structure
      if (!parsedData.summary) {
        console.warn('Warning: User data is missing the "summary" property');
      }

      if (!parsedData.salesChart) {
        console.warn('Warning: User data is missing the "salesChart" property');
      }

      if (!parsedData.inventoryChart) {
        console.warn('Warning: User data is missing the "inventoryChart" property');
      }
    }

    return true;
  } catch (error) {
    console.error('Error validating user data:', error);
    return false;
  }
}

// Upload the user data to Minio
async function uploadToMinio() {
  try {
    console.log(`Uploading user data to Minio for license key: ${licenseKey}`);

    // Validate the user data
    if (!validateUserData(userData)) {
      console.error('User data is invalid. Aborting upload.');
      return;
    }

    // Construct the file path - the JSON files are stored directly in the data bucket
    const filePath = `${licenseKey}.json`;
    console.log(`File path: ${filePath}`);
    console.log(`Full Minio path: ${AWS_ENDPOINT}/${bucketName}/${filePath}`);

    // Create the command to put the object
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filePath,
      Body: userData,
      ContentType: 'application/json',
    });

    // Execute the command
    console.log('Sending request to Minio...');
    const response = await s3Client.send(command);
    console.log('Successfully uploaded user data to Minio:', response);

    // Verify the upload
    console.log('Verifying upload...');
    try {
      const { GetObjectCommand } = require('@aws-sdk/client-s3');
      const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: filePath,
      });

      const getResponse = await s3Client.send(getCommand);
      console.log('Verification successful. File exists in Minio.');

      // Read the first few bytes to ensure it's readable
      const streamReader = getResponse.Body?.transformToString();
      if (streamReader) {
        const streamData = await streamReader;
        console.log(`File content length: ${streamData.length} characters`);
        console.log('First 50 characters:', streamData.substring(0, 50));
      }
    } catch (verifyError) {
      console.error('Verification failed. File may not have been uploaded correctly:', verifyError);
    }
  } catch (error) {
    console.error('Error uploading user data to Minio:', error);

    // Provide more detailed error information
    if (error.name === 'CredentialsProviderError') {
      console.error('Invalid Minio credentials. Check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.');
    } else if (error.name === 'NetworkError') {
      console.error('Network error connecting to Minio. Check your AWS_ENDPOINT.');
    } else if (error.name === 'NoSuchBucket') {
      console.error(`Bucket "${bucketName}" does not exist. Check your AWS_BUCKET.`);
    }
  }
}

// Run the upload function
uploadToMinio();
