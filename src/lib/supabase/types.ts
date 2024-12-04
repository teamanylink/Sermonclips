export interface SermonUpload {
  id: string;
  title: string;
  url: string;
  duration: string;
  status: 'processing' | 'transcribed';
  created_at: string;
  updated_at: string;
  cloudinary_id: string | null;
  supabase_path: string | null;
  transcript?: string;
  summary?: string;
  key_points?: Record<string, any>;
  thumbnail_url?: string;
}

export interface UploadError extends Error {
  code?: string;
  details?: string;
}

export type UploadStatus = 'idle' | 'uploading' | 'processing' | 'error' | 'success';