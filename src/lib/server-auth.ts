import { validateAccessToken } from './db';

// Verify token on the server side by checking it against the database
export const verifyTokenServer = async (token: string): Promise<any> => {
  try {
    // Log the token for debugging (remove in production)
    console.log('Verifying token:', token.substring(0, 10) + '...');

    // Validate the token against the database
    const result = await validateAccessToken(token);

    if (!result.success) {
      console.log('Token validation failed:', result.message);
      return null;
    }

    // Log the user information for debugging (remove in production)
    console.log('Token validated successfully. User ID:', result.user.id);

    // Return the user information
    return result.user;
  } catch (error) {
    console.error('Error verifying token on server:', error);
    return null;
  }
};
