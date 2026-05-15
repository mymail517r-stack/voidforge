import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-purple-900/30 rounded-2xl overflow-hidden',
        hover && 'hover:border-purple-700/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30',
        className
      )}
      {...props}
    />
  );
}
