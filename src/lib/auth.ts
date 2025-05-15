'use client';

import jwt from 'jsonwebtoken';

// Token storage key
const TOKEN_KEY = 'paloma_auth_token';

// JWT secret key (should be in environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Save token to localStorage
export const saveToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

// Remove token from localStorage
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Logout user
export const logout = () => {
  removeToken();
  // Redirect to home page
  window.location.href = '/';
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    // In a real application, you would verify the token with your JWT secret
    // For this example, we'll simulate it by decoding the token
    // In a production environment, you would use jwt.verify

    // Decode the token (without verification for this example)
    const decoded = jwt.decode(token);

    if (!decoded) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
