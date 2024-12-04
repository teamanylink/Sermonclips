import { CLOUDINARY_CONFIG } from './config';
import type { CloudinaryResponse } from './types';
import { createSermonUpload } from '../supabase/db';
import { uploadToSupabaseStorage } from '../supabase/storage';
import { toast } from 'react-hot-toast';

export async function uploadToCloudinary({
  file
}: {
  file: File | string;
}): Promise<CloudinaryResponse> {
  try {
    // First upload to Supabase if it's a File
    let fileUrl: string;
    if (file instanceof File) {
      fileUrl = await uploadToSupabaseStorage(file);
    } else {
      fileUrl = file;
    }

    // Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append('file', fileUrl);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('resource_type', 'video');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/video/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      let errorDetail: string;
      try {
        const error = await response.json();
        errorDetail = error.error?.message || 'Unknown error from Cloudinary';
      } catch {
        errorDetail = await response.text();
      }
      console.error('Cloudinary error:', errorDetail);
      throw new Error(`Upload failed: ${errorDetail}`);
    }

    const data: CloudinaryResponse = await response.json();
    
    if (!data.secure_url) {
      throw new Error('Upload failed - no URL returned');
    }

    // Create sermon upload record
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
      status: 'processing',
      supabase_path: file instanceof File ? fileUrl : null
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