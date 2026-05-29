import * as React from 'react';

export function AnimatedSection({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={`transition-all duration-700 ease-in-out opacity-0 translate-y-8 will-change-transform animate-fade-in-up ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
