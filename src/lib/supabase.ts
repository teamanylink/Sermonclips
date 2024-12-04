import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SermonUpload {
  id: string;
  title: string;
  url: string;
  duration: string;
  status: 'processing' | 'transcribed';
  created_at: string;
  cloudinary_id: string;
}

export async function createSermonUpload(data: Partial<SermonUpload>) {
  const { data: upload, error } = await supabase
    .from('sermon_uploads')
    .insert([data])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return upload;
}

export async function getSermonUploads() {
  const { data: uploads, error } = await supabase
    .from('sermon_uploads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return uploads;
}

export async function updateSermonStatus(id: string, status: SermonUpload['status']) {
  const { error } = await supabase
    .from('sermon_uploads')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw error;
  }
}