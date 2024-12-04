import { toast } from 'react-hot-toast';
import type { UploadError } from './types';

export function handleStorageError(error: unknown): never {
  console.error('Storage error:', error);
  
  if (error instanceof Error) {
    const uploadError = error as UploadError;
    
    switch (uploadError.code) {
      case '23505': // Unique violation
        toast.error('A file with this name already exists');
        break;
      case '42501': // Permission denied
        toast.error('Permission denied. Please check your credentials.');
        break;
      case '413': // Payload too large
        toast.error('File size exceeds the maximum limit');
        break;
      default:
        toast.error(uploadError.message);
    }
  } else {
    toast.error('An unexpected error occurred during upload');
  }
  
  throw error;
}

export function handleDatabaseError(error: unknown): never {
  console.error('Database error:', error);
  
  if (error instanceof Error) {
    const dbError = error as UploadError;
    
    switch (dbError.code) {
      case '23505': // Unique violation
        toast.error('A record with this title already exists');
        break;
      case '23503': // Foreign key violation
        toast.error('Invalid reference. Please check your data.');
        break;
      default:
        toast.error(dbError.message);
    }
  } else {
    toast.error('Database operation failed');
  }
  
  throw error;
}