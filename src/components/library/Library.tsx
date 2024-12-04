import React, { useState } from 'react';
import { ViewToggle } from './ViewToggle';
import { BentoGrid } from './BentoGrid';
import { LibraryList } from './LibraryList';
import { cn } from '../../lib/utils';
import type { Upload } from './types';

const mockUploads: Upload[] = [
  {
    id: 1,
    title: "Sunday Morning Sermon - Faith and Purpose",
    date: "2024-03-10",
    duration: "45:23",
    status: "Transcribed"
  },
  {
    id: 2,
    title: "Wednesday Bible Study - Grace",
    date: "2024-03-08",
    duration: "32:15",
    status: "Processing"
  },
  {
    id: 3,
    title: "Youth Service - Living with Purpose",
    date: "2024-03-05",
    duration: "28:45",
    status: "Transcribed"
  }
];

export function Library() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          <h2 className="text-2xl font-semibold text-white">Your Uploads</h2>
        </div>
      </div>
      
      {view === 'list' ? (
        <LibraryList uploads={mockUploads} />
      ) : (
        <BentoGrid uploads={mockUploads} />
      )}
    </div>
  );
}