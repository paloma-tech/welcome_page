// Test script for Resend email service
const { Resend } = require('resend');

// Create a Resend client with the API key
const RESEND_API_KEY = 're_VQxH8Ecy_44xGnSXuiDu48eEAVnjT5K8f';
console.log('Test script: Initializing Resend with API key:', RESEND_API_KEY ? 'API key is defined' : 'API key is undefined');
const resend = new Resend(RESEND_API_KEY);

// Function to send a test email
async function sendTestEmail() {
  console.log('Attempting to send test email with Resend...');

  try {
    const { data, error } = await resend.emails.send({
      from: 'Paloma Tech Solutions <onboarding@resend.dev>', // Using Resend's default domain
      to: 'dalihmem47@gmail.com', // Using the allowed email from the error message
      subject: 'Test Email from Resend',
      html: '<h1>This is a test email from Resend</h1><p>If you can see this, Resend is working correctly!</p>',
      text: 'This is a test email from Resend. If you can see this, Resend is working correctly!',
    });

    if (error) {
      console.error('Error sending test email with Resend:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('Test email sent successfully with Resend. ID:', data?.id);
    }
  } catch (error) {
    console.error('Exception when sending test email with Resend:', error);
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
