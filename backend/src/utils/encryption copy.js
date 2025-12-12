// Got help from AI to figure out encryption and decryption logic
import crypto from 'crypto';

// Get encryption key from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET_KEY || 'your-32-character-secret-key-here!';

// Ensure the key is 32 bytes (256 bits) for AES-256
const getKey = () => {
  const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest();
  return key;
};

/**
 * Encrypt a Canvas API token before storing in database
 * @param {string} text - The Canvas API token to encrypt
 * @returns {string} - Encrypted token in format: iv:encryptedData
 */
export const encryptToken = (text) => {
  try {
    const algorithm = 'aes-256-cbc';
    const key = getKey();
    const iv = crypto.randomBytes(16); // Generate random initialization vector
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Return IV and encrypted data separated by colon
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt token');
  }
};

/**
 * Decrypt a Canvas API token retrieved from database
 * @param {string} encryptedText - Encrypted token in format: iv:encryptedData
 * @returns {string} - Decrypted Canvas API token
 */
export const decryptToken = (encryptedText) => {
  try {
    const algorithm = 'aes-256-cbc';
    const key = getKey();
    
    // Split IV and encrypted data
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt token');
  }
};