import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { LibraryCard } from './library/LibraryCard';
import { LibraryGrid } from './library/LibraryGrid';
import { ViewToggle } from './library/ViewToggle';
import { cn } from '../lib/utils';
import type { Upload } from './library/types';

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
  const [view, setView] = useState<'grid' | 'list'>('list');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          <CardTitle>Your Uploads</CardTitle>
        </div>
      </CardHeader>
      
      <div className={cn(
        'p-4',
        view === 'list' 
          ? 'flex flex-col gap-3' 
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      )}>
        {mockUploads.map((upload) => (
          view === 'list' 
            ? <LibraryCard key={upload.id} upload={upload} />
            : <LibraryGrid key={upload.id} upload={upload} />
        ))}
      </div>

      <div className="flex justify-end px-4 pb-4">
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>
    </Card>
  );
}