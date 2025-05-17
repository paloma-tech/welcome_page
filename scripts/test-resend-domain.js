// Test script for Resend email service with domain verification
const { Resend } = require('resend');
require('dotenv').config({ path: '.env.production' });

// Log environment variables for debugging
console.log('Environment variables:');
console.log('RESEND_API_KEY defined:', !!process.env.RESEND_API_KEY);
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);

// Create a Resend client with the API key from environment
const RESEND_API_KEY = process.env.RESEND_API_KEY;
console.log('Test script: Initializing Resend with API key:', RESEND_API_KEY ? 'API key is defined' : 'API key is undefined');
const resend = new Resend(RESEND_API_KEY);

// Function to send a test email with different from addresses
async function sendTestEmail() {
  console.log('Attempting to send test emails with Resend using different from addresses...');

  // Test with default Resend domain
  await testWithFromAddress('PalomaERP <onboarding@resend.dev>', 'Default Resend domain');
  
  // Test with paloma.tn domain
  await testWithFromAddress('PalomaERP <noreply@paloma.tn>', 'Paloma.tn domain');
  
  // Test with gmail domain
  await testWithFromAddress('Paloma Tech Solutions <dalihmeminfo@gmail.com>', 'Gmail domain');
}

async function testWithFromAddress(fromAddress, description) {
  console.log(`\nTesting with ${description}: ${fromAddress}`);
  
  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: 'dalihmem47@gmail.com', // Replace with your email
      subject: `Test Email from Resend (${description})`,
      html: `<h1>This is a test email from Resend using ${description}</h1><p>If you can see this, Resend is working correctly with ${fromAddress}!</p>`,
      text: `This is a test email from Resend using ${description}. If you can see this, Resend is working correctly with ${fromAddress}!`,
    });

    if (error) {
      console.error(`Error sending test email with ${description}:`, error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log(`Test email sent successfully with ${description}. ID:`, data?.id);
    }
  } catch (error) {
    console.error(`Exception when sending test email with ${description}:`, error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error('Unknown error type:', typeof error);
    }
  }
}

// Run the test
sendTestEmail();
