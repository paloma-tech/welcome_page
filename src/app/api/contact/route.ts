import { NextResponse } from 'next/server';
import { insertContact, initDatabase } from '@/lib/db';
import { Resend } from 'resend';

// Initialize database on first request
let isInitialized = false;

// Create a Resend client with the API key
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_VQxH8Ecy_44xGnSXuiDu48eEAVnjT5K8f';
console.log('Contact route: Initializing Resend with API key:', RESEND_API_KEY ? 'API key is defined' : 'API key is undefined');
const resend = new Resend(RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Initialize database if not already done
    if (!isInitialized) {
      await initDatabase();
      isInitialized = true;
    }

    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert contact into database
    await insertContact({
      name: data.name,
      company: data.company || '',
      email: data.email,
      message: data.message,
    });

    // Send email notification
    try {
      // Prepare the email HTML content
      const htmlContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #4a5568;">Support Request from Dashboard</h2>

  <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
  </div>

  <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px;">
    <h3 style="color: #4a5568; margin-top: 0;">Message:</h3>
    <p style="white-space: pre-line;">${data.message}</p>
  </div>

  <p style="color: #718096; font-size: 12px; margin-top: 20px;">
    This email was sent from the support form on the Paloma dashboard.
  </p>
</div>
      `;

      // Prepare the plain text content
      const textContent = `
Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}

Message:
${data.message}
      `;

      // Send the email using Resend
      console.log('Attempting to send contact form email with Resend...');
      console.log('API Key defined:', !!process.env.RESEND_API_KEY);
      console.log('From address:', process.env.EMAIL_FROM || 'Paloma Tech Solutions <dalihmeminfo@gmail.com>');
      console.log('To address:', 'contact@paloma.tn');
      console.log('ReplyTo:', data.email);

      try {
        // In development/testing, we can only send to dalihmem47@gmail.com
        // In production, this restriction would be removed after domain verification
        const toEmail = process.env.NODE_ENV === 'production' ? 'contact@paloma.tn' : 'dalihmem47@gmail.com';

        const { data: emailData, error } = await resend.emails.send({
          from: 'Paloma Tech Solutions <onboarding@resend.dev>', // Using Resend's default domain
          to: toEmail,
          replyTo: data.email,
          subject: `Support Request from ${data.name}`,
          html: htmlContent,
          text: textContent,
        });

        if (error) {
          console.error('Error sending support request email with Resend:', error);
          console.error('Error details:', JSON.stringify(error, null, 2));
        } else {
          console.log('Contact form email sent successfully with Resend. ID:', emailData?.id);
        }
      } catch (resendError) {
        console.error('Exception when sending contact form email with Resend:', resendError);
        if (resendError instanceof Error) {
          console.error('Error message:', resendError.message);
          console.error('Error stack:', resendError.stack);
        } else {
          console.error('Unknown error type:', typeof resendError);
        }
      }
    } catch (emailError) {
      // Log the error but don't fail the request
      console.error('Error sending support request email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}