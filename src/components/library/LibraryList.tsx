import React from 'react';
import { File, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Upload } from './types';

interface LibraryListProps {
  uploads: Upload[];
}

export function LibraryList({ uploads }: LibraryListProps) {
  return (
    <div className="space-y-3">
      {uploads.map((upload) => (
        <div
          key={upload.id}
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="p-2 bg-gray-700 rounded-lg">
                <File className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            
            <div className="flex-grow min-w-0">
              <h3 className="font-medium text-white truncate">{upload.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                <span>{upload.date}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {upload.duration}
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <span className={cn(
                "text-sm px-3 py-1 rounded-full",
                upload.status === "Transcribed" 
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              )}>
                {upload.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}