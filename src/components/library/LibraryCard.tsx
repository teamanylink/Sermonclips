import React from 'react';
import { File, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Upload } from './types';

interface LibraryCardProps {
  upload: Upload;
}

export function LibraryCard({ upload }: LibraryCardProps) {
  return (
    <div className="bg-gray-750/50 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="p-2 bg-primary-500/10 rounded-lg">
            <File className="w-6 h-6 text-primary-500" />
          </div>
        </div>
        
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-gray-100 truncate">{upload.title}</h3>
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
            "text-sm px-3 py-1 rounded-full whitespace-nowrap",
            upload.status === "Transcribed" 
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          )}>
            {upload.status}
          </span>
        </div>
      </div>
    </div>
  );
}