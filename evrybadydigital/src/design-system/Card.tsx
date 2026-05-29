import React from 'react';
import { colors } from './colors';

export function Card({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-[${colors.surface}] rounded-2xl shadow-lg border border-[${colors.border}] p-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
