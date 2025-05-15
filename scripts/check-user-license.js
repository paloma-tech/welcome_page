const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Get Minio configuration from environment variables
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'hXPG1lHBW3B6bwlgLmZo';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || 'b56q2HJmY4lSqynZG6dl5GPlLChLUXS0xJJKqE4X';
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION || 'us-east-1';
const AWS_ENDPOINT = process.env.AWS_ENDPOINT || 'http://data.paloma.tn:9000';
const AWS_BUCKET = process.env.AWS_BUCKET || 'data';
const AWS_USE_PATH_STYLE_ENDPOINT = process.env.AWS_USE_PATH_STYLE_ENDPOINT === 'true';

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'welcome_page',
};

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

// Function to list all license keys in the database
async function listLicenseKeys() {
  try {
    // Create MySQL connection
    const connection = await mysql.createConnection(dbConfig);
    
    // Query to get all license keys with user information
    const [rows] = await connection.execute(`
      SELECT lk.\`key\`, lk.user_id, lk.used, lk.expiration_date, u.email, u.fullName
      FROM license_keys lk
      LEFT JOIN users u ON lk.user_id = u.id
      WHERE lk.used = TRUE
      ORDER BY lk.created_at DESC
    `);
    
    // Close the connection
    await connection.end();
    
    return rows;
  } catch (error) {
    console.error('Error listing license keys:', error);
    throw error;
  }
}

// Function to list all files in the Minio bucket
async function listMinioFiles() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });
    
    const response = await s3Client.send(command);
    
    return response.Contents || [];
  } catch (error) {
    console.error('Error listing Minio files:', error);
    throw error;
  }
}

// Function to check if a license key has a corresponding file in Minio
async function checkLicenseKeyInMinio(licenseKey) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: `${licenseKey}.json`,
    });
    
    try {
      await s3Client.send(command);
      return true;
    } catch (error) {
      if (error.name === 'NoSuchKey') {
        return false;
      }
      throw error;
    }
  } catch (error) {
    console.error(`Error checking license key ${licenseKey} in Minio:`, error);
    throw error;
  }
}

// Main function
async function main() {
  try {
    // Get all license keys from the database
    const licenseKeys = await listLicenseKeys();
    console.log(`Found ${licenseKeys.length} license keys in the database`);
    
    // Get all files from Minio
    const minioFiles = await listMinioFiles();
    console.log(`Found ${minioFiles.length} files in Minio bucket ${bucketName}`);
    
    // Check each license key
    for (const licenseKey of licenseKeys) {
      const exists = await checkLicenseKeyInMinio(licenseKey.key);
      
      console.log(`License key: ${licenseKey.key}`);
      console.log(`  User: ${licenseKey.fullName || 'N/A'} (${licenseKey.email || 'N/A'})`);
      console.log(`  Used: ${licenseKey.used ? 'Yes' : 'No'}`);
      console.log(`  Expiration: ${licenseKey.expiration_date || 'Never'}`);
      console.log(`  File in Minio: ${exists ? 'Yes' : 'No'}`);
      
      if (!exists) {
        console.log(`  WARNING: No data file found for license key ${licenseKey.key}`);
        console.log(`  Run: node scripts/upload-to-minio.js ${licenseKey.key}`);
      }
      
      console.log('');
    }
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the main function
main();
