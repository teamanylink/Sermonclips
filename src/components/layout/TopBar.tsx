import React, { useState } from 'react';
import { Bell, Search, User, Upload } from 'lucide-react';
import { UploadDialog } from '../UploadDialog';

export function TopBar() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <div className="h-16 bg-gray-900 border-b border-gray-800 px-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="max-w-md w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search sermons..."
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 transition-opacity"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      <UploadDialog 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </>
  );
}