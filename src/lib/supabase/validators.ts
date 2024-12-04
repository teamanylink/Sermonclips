const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_FILE_TYPES = ['mp3', 'wav', 'mp4', 'mov'];

export function validateFile(file: File): void {
  if (!file) {
    throw new Error('No file provided');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 500MB limit');
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase();
  if (!fileExt || !ALLOWED_FILE_TYPES.includes(fileExt)) {
    throw new Error(`File type .${fileExt} is not supported`);
  }
}

export function validateUploadData(data: { title?: string; url?: string }): void {
  if (!data.title?.trim()) {
    throw new Error('Title is required');
  }

  if (!data.url?.trim()) {
    throw new Error('URL is required');
  }

  try {
    new URL(data.url);
  } catch {
    throw new Error('Invalid URL format');
  }
}