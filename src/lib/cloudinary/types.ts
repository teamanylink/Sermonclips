export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  duration?: number;
  error?: {
    message: string;
  };
}

export interface CloudinaryUploadParams {
  file: File | string;
}