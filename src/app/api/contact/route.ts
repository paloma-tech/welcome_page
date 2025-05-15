import { NextResponse } from 'next/server';
import { insertContact, initDatabase } from '@/lib/db';
import nodemailer from 'nodemailer';

// Initialize database on first request
let isInitialized = false;

// Create a transporter using Mailjet SMTP
const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME || 'fa1f1331116cf7bbf1aaf00e4cbd3238',
    pass: process.env.MAIL_PASSWORD || 'b9b7701c4fbad139c63d335e1a39771e',
  },
});

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
      // Prepare the email
      const mailOptions = {
        from: {
          name: 'Paloma Tech Solutions',
          address: 'dalihmeminfo@gmail.com',
        },
        to: 'contact@paloma.tn',
        replyTo: data.email,
        subject: `Support Request from ${data.name}`,
        text: `
Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}

Message:
${data.message}
        `,
        html: `
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
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Support request email sent successfully');
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