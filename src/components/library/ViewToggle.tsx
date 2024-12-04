import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-lg bg-gray-900/50 p-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'p-1.5',
          view === 'list' && 'bg-gray-700'
        )}
        onClick={() => onViewChange('list')}
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'p-1.5',
          view === 'grid' && 'bg-gray-700'
        )}
        onClick={() => onViewChange('grid')}
      >
        <LayoutGrid className="w-4 h-4" />
      </Button>
    </div>
  );
}