export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  duration?: number;
}

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}