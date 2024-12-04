import React from 'react';
import { cn } from '../../lib/utils';

interface MagicalCardProps {
  className?: string;
  children: React.ReactNode;
}

export function MagicalCard({ className, children }: MagicalCardProps) {
  return (
    <div className="magical-card-wrapper">
      <div className={cn('magical-card', className)}>
        {children}
      </div>
      <a
        href="https://mythrill.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="mythrill-link"
      >
        Powered by Mythrill
      </a>
    </div>
  );
}