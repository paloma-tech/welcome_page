import nodemailer from 'nodemailer';

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

// Initialize the transporter
const initTransporter = async () => {
  try {
    // Log SMTP configuration (without sensitive data)
    console.log('SMTP Configuration:', {
      host: 'in-v3.mailjet.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME ? 'Set (hidden)' : 'Using fallback',
        pass: process.env.MAIL_PASSWORD ? 'Set (hidden)' : 'Using fallback',
      },
    });

    // Verify the connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');
  } catch (error) {
    console.error('SMTP connection verification failed:', error);

    // Create a safe error object for logging
    const errorObj = {};
    if (error instanceof Error) {
      errorObj['name'] = error.name;
      errorObj['message'] = error.message;
      errorObj['stack'] = error.stack;
    } else {
      errorObj['error'] = String(error);
    }

    console.error('Error details:', JSON.stringify(errorObj, null, 2));
  }

  return transporter;
};

// Send verification email
export const sendVerificationEmail = async (
  email: string,
  token: string,
  baseUrl: string
) => {
  const transport = await initTransporter();

  const verificationLink = `${baseUrl}/api/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Paloma Tech Solutions" <no-reply@palomaerp.com>',
    to: email,
    subject: 'Verify Your Email Address - Paloma Tech Solutions',
    text: `Please verify your email address by clicking on the following link: ${verificationLink}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4A6CF7; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Paloma Tech Solutions</h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #333; margin-top: 0;">Verify Your Email Address</h2>
          <p style="color: #555; line-height: 1.5;">Thank you for registering with Paloma Tech Solutions. To complete your registration and access your dashboard, please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="background-color: #4A6CF7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email</a>
          </div>
          <p style="color: #555; line-height: 1.5;">If the button doesn't work, you can also click on the link below or copy and paste it into your browser:</p>
          <p style="word-break: break-all;"><a href="${verificationLink}" style="color: #4A6CF7;">${verificationLink}</a></p>
          <p style="color: #555; line-height: 1.5;">This link will expire in 24 hours.</p>
          <p style="color: #555; line-height: 1.5;">If you did not create an account, please ignore this email.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Paloma Tech Solutions. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log('Attempting to send verification email to:', email);
    console.log('Verification link:', verificationLink);

    const info = await transport.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending verification email:', error);

    // Create a safe error object for logging
    const errorObj = {};
    if (error instanceof Error) {
      errorObj['name'] = error.name;
      errorObj['message'] = error.message;
      errorObj['stack'] = error.stack;
    } else {
      errorObj['error'] = String(error);
    }

    console.error('Email error details:', JSON.stringify(errorObj, null, 2));
    throw error;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  baseUrl: string
) => {
  const transport = await initTransporter();

  const resetLink = `${baseUrl}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Paloma Tech Solutions" <no-reply@palomaerp.com>',
    to: email,
    subject: 'Reset Your Password - Paloma Tech Solutions',
    text: `Please reset your password by clicking on the following link: ${resetLink}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4A6CF7; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Paloma Tech Solutions</h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #333; margin-top: 0;">Reset Your Password</h2>
          <p style="color: #555; line-height: 1.5;">You requested to reset your password. Please click the button below to set a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #4A6CF7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #555; line-height: 1.5;">If the button doesn't work, you can also click on the link below or copy and paste it into your browser:</p>
          <p style="word-break: break-all;"><a href="${resetLink}" style="color: #4A6CF7;">${resetLink}</a></p>
          <p style="color: #555; line-height: 1.5;">This link will expire in 1 hour.</p>
          <p style="color: #555; line-height: 1.5;">If you did not request a password reset, please ignore this email.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Paloma Tech Solutions. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log('Attempting to send password reset email to:', email);
    console.log('Reset link:', resetLink);

    const info = await transport.sendMail(mailOptions);
    console.log('Password reset email sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending password reset email:', error);

    // Create a safe error object for logging
    const errorObj = {};
    if (error instanceof Error) {
      errorObj['name'] = error.name;
      errorObj['message'] = error.message;
      errorObj['stack'] = error.stack;
    } else {
      errorObj['error'] = String(error);
    }

    console.error('Email error details:', JSON.stringify(errorObj, null, 2));
    throw error;
  }
};
