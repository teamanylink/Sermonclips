import { supabase } from './client';
import { v4 as uuidv4 } from 'uuid';
import { createSermonUpload } from './db';
import { validateFile } from './validators';
import { handleStorageError } from './errors';
import { toast } from 'react-hot-toast';
import type { SermonUpload } from './types';

export async function uploadToSupabaseStorage(file: File): Promise<string> {
  try {
    validateFile(file);

    const fileName = `${uuidv4()}.${file.name.split('.').pop()?.toLowerCase()}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('sermonclips')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) throw uploadError;
    if (!data) throw new Error('Upload failed - no data returned');

    const { data: { publicUrl } } = supabase.storage
      .from('sermonclips')
      .getPublicUrl(filePath);

    if (!publicUrl) throw new Error('Failed to get public URL');

    await createSermonUpload({
      title: file.name.replace(/\.[^/.]+$/, ''),
      url: publicUrl,
      duration: '0:00',
      status: 'processing',
      supabase_path: filePath,
      cloudinary_id: ''
    });

    toast.success('File uploaded successfully');
    return publicUrl;
  } catch (error) {
    return handleStorageError(error);
  }
}

export async function deleteFromStorage(path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from('sermonclips')
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    return handleStorageError(error);
  }
}