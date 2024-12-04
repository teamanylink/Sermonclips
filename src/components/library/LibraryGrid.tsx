import React from 'react';
import { File, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Upload } from './types';

interface LibraryGridProps {
  upload: Upload;
}

export function LibraryGrid({ upload }: LibraryGridProps) {
  return (
    <div className="group relative p-[3px] rounded-xl bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-[#5ddcff] hover:via-[#3c67e3] hover:to-[#4e00c2] transition-all duration-500">
      <div className="relative z-10 h-full bg-gray-800/95 backdrop-blur-xl rounded-lg p-6">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-colors duration-500" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 transition-colors duration-500">
              <File className="w-8 h-8 text-primary-500" />
            </div>
            <span className={cn(
              "text-sm px-3 py-1 rounded-full transition-colors duration-300",
              upload.status === "Transcribed" 
                ? "bg-green-500/10 text-green-400 group-hover:bg-green-500/20"
                : "bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20"
            )}>
              {upload.status}
            </span>
          </div>
          
          <h3 className="font-medium text-gray-100 mb-2 line-clamp-2 group-hover:text-white transition-colors duration-300">
            {upload.title}
          </h3>
          
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <span>{upload.date}</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {upload.duration}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -inset-[1px] rounded-xl blur-xl bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-[#5ddcff] group-hover:via-[#3c67e3] group-hover:to-[#4e00c2] opacity-0 group-hover:opacity-20 transition-all duration-500" />
    </div>
  );
}