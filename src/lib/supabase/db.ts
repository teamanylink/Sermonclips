import { supabase } from './client';
import { validateUploadData } from './validators';
import { handleDatabaseError } from './errors';
import type { SermonUpload } from './types';

export async function createSermonUpload(data: Partial<SermonUpload>): Promise<SermonUpload> {
  try {
    // Remove any undefined values
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const { data: upload, error } = await supabase
      .from('sermon_uploads')
      .insert([{
        ...cleanData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: data.status || 'processing',
        duration: data.duration || '0:00',
        cloudinary_id: data.cloudinary_id || null,
        supabase_path: data.supabase_path || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    if (!upload) {
      throw new Error('Failed to create upload record');
    }

    return upload;
  } catch (error) {
    console.error('Database error:', error);
    return handleDatabaseError(error);
  }
}

export async function getSermonUploads(): Promise<SermonUpload[]> {
  try {
    const { data: uploads, error } = await supabase
      .from('sermon_uploads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database query error:', error);
      throw error;
    }

    return uploads || [];
  } catch (error) {
    console.error('Database error:', error);
    return handleDatabaseError(error);
  }
}

export async function updateSermonUpload(id: string, data: Partial<SermonUpload>): Promise<void> {
  try {
    if (!id) throw new Error('Missing upload ID');

    const { error } = await supabase
      .from('sermon_uploads')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Database update error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Database error:', error);
    return handleDatabaseError(error);
  }
}

export async function deleteSermonUpload(id: string): Promise<void> {
  try {
    if (!id) throw new Error('Missing upload ID');

    const { error } = await supabase
      .from('sermon_uploads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database delete error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Database error:', error);
    return handleDatabaseError(error);
  }
}