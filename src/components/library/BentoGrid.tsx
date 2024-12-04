import React from 'react';
import { File, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Upload } from './types';

interface BentoGridProps {
  uploads: Upload[];
}

export function BentoGrid({ uploads }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {uploads.map((upload) => (
        <div
          key={upload.id}
          className="group relative bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#5ddcff] via-[#3c67e3] to-[#4e00c2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 p-6 bg-gray-800 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-700/50 rounded-lg">
                <File className="w-8 h-8 text-primary-500" />
              </div>
              <span className={cn(
                "text-sm px-3 py-1 rounded-full",
                upload.status === "Transcribed" 
                  ? "bg-green-500/10 text-green-400"
                  : "bg-yellow-500/10 text-yellow-400"
              )}>
                {upload.status}
              </span>
            </div>
            
            <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">
              {upload.title}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mt-4">
              <span>{upload.date}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {upload.duration}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#5ddcff] via-[#3c67e3] to-[#4e00c2] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );
}