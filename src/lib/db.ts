import mysql from 'mysql2/promise';

// MySQL connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'welcome_page',
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
}) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (fullName, email, password, company) VALUES (?, ?, ?, ?)',
      [data.fullName, data.email, data.password, data.company || null]
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