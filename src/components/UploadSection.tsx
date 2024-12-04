import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

export function UploadSection() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Sermon</CardTitle>
        <Button variant="ghost" size="sm">
          View History
        </Button>
      </CardHeader>
      
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary-500 bg-primary-500/5"
            : "border-gray-600 hover:border-primary-500"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-primary-500" />
        <h3 className="text-xl font-semibold mb-2">Drop your sermon file here</h3>
        <p className="text-gray-400">
          or click to select files
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supports MP3, WAV, MP4 (max 500MB)
        </p>
      </div>
    </Card>
  );
}