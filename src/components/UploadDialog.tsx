import React, { useState, useCallback } from 'react';
import { Upload, Youtube, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Dialog, DialogContent } from './ui/Dialog';
import { uploadToSupabaseStorage } from '../lib/supabase/storage';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase/client';

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadDialog({ isOpen, onClose }: UploadDialogProps) {
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  
  const handleUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null || prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      await uploadToSupabaseStorage(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Reset and close dialog after successful upload
      setTimeout(() => {
        onClose();
        setUrl('');
        setUploadProgress(null);
      }, 1000);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress(null);
    } finally {
      setUploading(false);
    }
  };

  const handleYouTubeUpload = async () => {
    if (!url) return;
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const { error } = await supabase
        .from('sermon_uploads')
        .insert({
          title: 'YouTube Video',
          url: url,
          duration: '0:00',
          status: 'processing',
          cloudinary_id: '',
          supabase_path: null
        });

      if (error) throw error;

      toast.success('YouTube URL saved successfully!');
      
      setTimeout(() => {
        onClose();
        setUrl('');
        setUploadProgress(null);
      }, 1000);
    } catch (error) {
      console.error('YouTube save failed:', error);
      toast.error('Failed to save YouTube URL');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav'],
      'video/*': ['.mp4', '.mov']
    },
    maxSize: 500 * 1024 * 1024, // 500MB
    disabled: uploading,
    multiple: false
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <h2 className="text-xl font-semibold mb-6">Upload Sermon</h2>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-200">
              Upload from YouTube
            </label>
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Youtube className="h-5 w-5 text-red-500" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter YouTube URL"
                  disabled={uploading}
                />
              </div>
              <Button
                onClick={handleYouTubeUpload}
                disabled={!url || uploading}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Save YouTube URL
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 text-sm text-gray-500 bg-gray-800">or</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-200">
              Upload from your device
            </label>
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragActive
                  ? 'border-primary-500 bg-primary-500/5'
                  : uploading
                  ? 'border-gray-600 bg-gray-700/10'
                  : 'border-gray-700 hover:border-gray-600'
              } ${uploading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <div className="space-y-4">
                  <Loader2 className="w-10 h-10 mx-auto animate-spin text-primary-500" />
                  <div className="space-y-2">
                    <p className="text-base text-gray-300">Uploading...</p>
                    {uploadProgress !== null && (
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                  <div className="space-y-2">
                    <p className="text-base text-gray-300">
                      {isDragActive ? (
                        "Drop your files here"
                      ) : (
                        "Drag & drop files here, or click to select"
                      )}
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports MP3, WAV, MP4 (max 500MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}