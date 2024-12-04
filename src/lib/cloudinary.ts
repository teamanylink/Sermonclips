import { CLOUDINARY_CONFIG } from './config';
import type { CloudinaryResponse } from './types';
import { createSermonUpload } from './supabase';
import { toast } from 'react-hot-toast';

interface UploadParams {
  file: File | string;
  useFilename?: boolean;
}

export async function uploadToCloudinary({
  file,
  useFilename = true
}: UploadParams): Promise<CloudinaryResponse> {
  const formData = new FormData();
  
  // Required parameters
  formData.append('upload_preset', 'caiedit');
  
  // Handle file upload
  if (file instanceof File) {
    formData.append('file', file);
  } else if (typeof file === 'string' && file.startsWith('http')) {
    formData.append('file', file);
  } else {
    throw new Error('Invalid file source');
  }

  // Optional parameters
  if (useFilename) {
    formData.append('use_filename', 'true');
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Cloudinary error:', error);
      throw new Error(error.error?.message || 'Upload failed');
    }

    const data: CloudinaryResponse = await response.json();
    
    if (!data.secure_url) {
      throw new Error('Upload failed - no URL returned');
    }

    // Create sermon upload record in Supabase
    const title = file instanceof File 
      ? file.name.replace(/\.[^/.]+$/, '')
      : new URL(file).pathname.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Untitled';

    await createSermonUpload({
      title,
      url: data.secure_url,
      cloudinary_id: data.public_id,
      duration: data.duration 
        ? `${Math.floor(data.duration / 60)}:${String(data.duration % 60).padStart(2, '0')}` 
        : '0:00',
      status: 'processing'
    });

    return data;
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error 
      ? error.message 
      : 'Upload failed. Please try again.';
    toast.error(message);
    throw error;
  }
}