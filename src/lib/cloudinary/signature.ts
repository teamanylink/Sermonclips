import { CLOUDINARY_CONFIG } from './config';
import crypto from 'crypto';

export function generateSignature(params: Record<string, string | number>): string {
  const sortedKeys = Object.keys(params).sort();
  const sortedParams = sortedKeys.map(key => `${key}=${params[key]}`).join('&');
  
  return crypto
    .createHash('sha256')
    .update(sortedParams + CLOUDINARY_CONFIG.apiSecret)
    .digest('hex');
}