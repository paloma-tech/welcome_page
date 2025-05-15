import mysql from 'mysql2/promise';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'welcome_page',
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Generate a random verification token
export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Initialize database and tables
export const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        adresse VARCHAR(255),
        phone VARCHAR(50),
        email_verified_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS verification_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS access_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS license_keys (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(255) NOT NULL UNIQUE,
        user_id INT NULL,
        used BOOLEAN DEFAULT FALSE,
        activated_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        expiration_date TIMESTAMP NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'standard',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    console.log('Database and tables initialized successfully');
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Insert contact form data
export const insertContact = async (data: {
  name: string;
  company: string;
  email: string;
  message: string;
}) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, company, email, message) VALUES (?, ?, ?, ?)',
      [data.name, data.company, data.email, data.message]
    );
    return result;
  } catch (error) {
    console.error('Error inserting contact:', error);
    throw error;
  }
};

// Insert new user
export const insertUser = async (data: {
  fullName: string;
  email: string;
  password: string;
  company?: string;
  adresse?: string;
  phone?: string;
  email_verified_at?: Date | null;
}) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (fullName, email, password, company, adresse, phone, email_verified_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        data.fullName,
        data.email,
        data.password,
        data.company || null,
        data.adresse || null,
        data.phone || null,
        data.email_verified_at || null
      ]
    );
    return result;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};

// Get all contacts
export const getContacts = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return rows;
  } catch (error) {
    console.error('Error getting contacts:', error);
    throw error;
  }
};

// Get user by email (for authentication)
export const getUserByEmail = async (email: string) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

// Create email verification token
export const createVerificationToken = async (userId: number) => {
  try {
    const token = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token expires in 24 hours

    await pool.execute(
      'INSERT INTO verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt]
    );

    return token;
  } catch (error) {
    console.error('Error creating verification token:', error);
    throw error;
  }
};

// Get user by verification token
export const getUserByVerificationToken = async (token: string) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.* FROM users u
       JOIN verification_tokens vt ON u.id = vt.user_id
       WHERE vt.token = ? AND vt.expires_at > NOW()`,
      [token]
    );

    if (!rows || (rows as any[]).length === 0) {
      return null;
    }

    return (rows as any[])[0];
  } catch (error) {
    console.error('Error getting user by verification token:', error);
    throw error;
  }
};

// Verify email with token
export const verifyEmail = async (token: string) => {
  try {
    // Get the token from the database
    const [tokens] = await pool.query(
      'SELECT * FROM verification_tokens WHERE token = ? AND expires_at > NOW()',
      [token]
    );

    if (!tokens || (tokens as any[]).length === 0) {
      return { success: false, message: 'Invalid or expired token' };
    }

    const verificationToken = (tokens as any[])[0];

    // Update the user's email_verified_at field
    await pool.execute(
      'UPDATE users SET email_verified_at = NOW() WHERE id = ?',
      [verificationToken.user_id]
    );

    // Delete the used token
    await pool.execute(
      'DELETE FROM verification_tokens WHERE id = ?',
      [verificationToken.id]
    );

    return { success: true, message: 'Email verified successfully' };
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

// Create password reset token
export const createPasswordResetToken = async (email: string) => {
  try {
    // Check if the email exists
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, message: 'Email not found' };
    }

    // Generate a token
    const token = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    // Delete any existing tokens for this email
    await pool.execute(
      'DELETE FROM password_reset_tokens WHERE email = ?',
      [email]
    );

    // Insert the new token
    await pool.execute(
      'INSERT INTO password_reset_tokens (email, token, expires_at) VALUES (?, ?, ?)',
      [email, token, expiresAt]
    );

    return { success: true, token };
  } catch (error) {
    console.error('Error creating password reset token:', error);
    throw error;
  }
};

// Verify password reset token
export const verifyPasswordResetToken = async (token: string) => {
  try {
    // First check if the token exists at all
    const [allTokens] = await pool.query(
      'SELECT *, NOW() > expires_at AS is_expired FROM password_reset_tokens WHERE token = ?',
      [token]
    );

    if (!allTokens || (allTokens as any[]).length === 0) {
      return { success: false, message: 'Invalid reset token. Please request a new password reset link.' };
    }

    const resetToken = (allTokens as any[])[0];

    // Check if token is expired
    if (resetToken.is_expired) {
      return {
        success: false,
        message: 'Your password reset link has expired. Please request a new one.'
      };
    }

    // Token is valid and not expired
    return { success: true, email: resetToken.email };
  } catch (error) {
    console.error('Error verifying password reset token:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (token: string, newPassword: string) => {
  try {
    // Verify the token
    const verifyResult = await verifyPasswordResetToken(token);
    if (!verifyResult.success) {
      return verifyResult;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await pool.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, verifyResult.email]
    );

    // Delete the used token
    await pool.execute(
      'DELETE FROM password_reset_tokens WHERE token = ?',
      [token]
    );

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Generate access token for a user
export const generateAccessToken = async (userId: number) => {
  try {
    const token = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // Token expires in 30 days

    // Delete any existing tokens for this user
    await pool.execute(
      'DELETE FROM access_tokens WHERE user_id = ?',
      [userId]
    );

    // Insert the new token
    await pool.execute(
      'INSERT INTO access_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt]
    );

    return { success: true, token, expires_at: expiresAt };
  } catch (error) {
    console.error('Error generating access token:', error);
    throw error;
  }
};

// Validate access token
export const validateAccessToken = async (token: string) => {
  try {
    const [tokens] = await pool.query(
      `SELECT at.*, u.* FROM access_tokens at
       JOIN users u ON at.user_id = u.id
       WHERE at.token = ? AND at.expires_at > NOW()`,
      [token]
    );

    if (!tokens || (tokens as any[]).length === 0) {
      return { success: false, message: 'Invalid or expired token' };
    }

    const tokenData = (tokens as any[])[0];

    // Don't include password in the response
    const { password, ...userWithoutPassword } = tokenData;

    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Error validating access token:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId: number) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

    if (!rows || (rows as any[]).length === 0) {
      return null;
    }

    const user = (rows as any[])[0];

    // Don't include password in the response
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
};

// Check if user has a valid license key
export const checkUserLicense = async (userId: number) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM license_keys
       WHERE user_id = ?
       AND used = TRUE
       AND (expiration_date IS NULL OR expiration_date > NOW())`,
      [userId]
    );

    return {
      success: true,
      hasValidLicense: (rows as any[]).length > 0,
      license: (rows as any[]).length > 0 ? (rows as any[])[0] : null
    };
  } catch (error) {
    console.error('Error checking user license:', error);
    throw error;
  }
};

// Verify license key
export const verifyLicenseKey = async (key: string) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM license_keys WHERE \`key\` = ?`,
      [key]
    );

    if ((rows as any[]).length === 0) {
      return { success: false, message: 'Invalid license key' };
    }

    const license = (rows as any[])[0];

    // Check if the key is used (must be true)
    if (!license.used) {
      return { success: false, message: 'This license key is not activated yet' };
    }

    // Check if the key is already assigned to a user
    if (license.user_id !== null) {
      return { success: false, message: 'This license key is already assigned to another user' };
    }

    // Check if the key is expired
    if (license.expiration_date && new Date(license.expiration_date) < new Date()) {
      return { success: false, message: 'This license key has expired' };
    }

    return { success: true, license };
  } catch (error) {
    console.error('Error verifying license key:', error);
    throw error;
  }
};

// Assign license key to user
export const assignLicenseKey = async (key: string, userId: number) => {
  try {
    // First verify the key
    const verifyResult = await verifyLicenseKey(key);

    if (!verifyResult.success) {
      return verifyResult;
    }

    // Update the license key to assign it to the user
    await pool.execute(
      `UPDATE license_keys
       SET user_id = ?
       WHERE \`key\` = ?`,
      [userId, key]
    );

    return { success: true, message: 'License key assigned successfully' };
  } catch (error) {
    console.error('Error assigning license key:', error);
    throw error;
  }
};

// Generate a license key
export const generateLicenseKey = async (type: string = 'standard', expirationDays: number | null = null) => {
  try {
    // Generate a random key
    const key = crypto.randomBytes(16).toString('hex');

    // Calculate expiration date if provided
    let expirationDate = null;
    if (expirationDays !== null) {
      expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);
    }

    // Insert the key with used=true by default
    await pool.execute(
      `INSERT INTO license_keys (\`key\`, type, expiration_date, used, activated_at)
       VALUES (?, ?, ?, TRUE, NOW())`,
      [key, type, expirationDate]
    );

    return {
      success: true,
      key,
      type,
      expiration_date: expirationDate
    };
  } catch (error) {
    console.error('Error generating license key:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (data: {
  email: string;
  fullName?: string;
  company?: string;
  adresse?: string;
  phone?: string;
}) => {
  try {
    // Build the query dynamically based on provided fields
    let query = 'UPDATE users SET ';
    const params = [];
    const fields = [];

    if (data.fullName !== undefined) {
      fields.push('fullName = ?');
      params.push(data.fullName);
    }

    if (data.company !== undefined) {
      fields.push('company = ?');
      params.push(data.company || null);
    }

    if (data.adresse !== undefined) {
      fields.push('adresse = ?');
      params.push(data.adresse || null);
    }

    if (data.phone !== undefined) {
      fields.push('phone = ?');
      params.push(data.phone || null);
    }

    // If no fields to update, return early
    if (fields.length === 0) {
      return { success: true, message: 'No fields to update' };
    }

    query += fields.join(', ') + ' WHERE email = ?';
    params.push(data.email);

    // Execute the update query
    await pool.execute(query, params);

    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Get license key for a user
export const getUserLicenseKey = async (userId: number) => {
  try {
    console.log(`Executing SQL query to get license key for user ID: ${userId}`);

    // Log the SQL query for debugging
    const sql = `SELECT \`key\` FROM license_keys
       WHERE user_id = ?
       AND used = TRUE
       AND (expiration_date IS NULL OR expiration_date > NOW())
       ORDER BY created_at DESC
       LIMIT 1`;
    console.log('SQL Query:', sql);

    const [rows] = await pool.query(sql, [userId]);

    console.log('Query result:', rows);

    if (!rows || (rows as any[]).length === 0) {
      console.log(`No license keys found for user ID: ${userId}`);

      // If no license key is found, let's try to find any license key for this user
      // even if it's not marked as used or is expired
      console.log('Trying to find any license key for this user...');

      const [allKeys] = await pool.query(
        `SELECT \`key\`, used, expiration_date FROM license_keys
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
      );

      console.log('All keys for user:', allKeys);

      if (!allKeys || (allKeys as any[]).length === 0) {
        return {
          success: false,
          message: 'No license key found for this user'
        };
      }

      // Return information about the keys found but not valid
      return {
        success: false,
        message: 'No valid license key found for this user',
        availableKeys: allKeys
      };
    }

    const licenseKey = (rows as any[])[0].key;
    console.log(`Found valid license key for user ID ${userId}: ${licenseKey}`);
    return { success: true, licenseKey };
  } catch (error) {
    console.error('Error getting user license key:', error);
    throw error;
  }
};