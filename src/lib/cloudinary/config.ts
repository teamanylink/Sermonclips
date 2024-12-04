export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
} as const;

// Validate required configuration
if (!CLOUDINARY_CONFIG.cloudName) {
  throw new Error('Missing VITE_CLOUDINARY_CLOUD_NAME environment variable');
}

if (!CLOUDINARY_CONFIG.uploadPreset) {
  throw new Error('Missing VITE_CLOUDINARY_UPLOAD_PRESET environment variable');
}