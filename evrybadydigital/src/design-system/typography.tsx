// Typography scale for Evrybady Digital
import * as React from 'react';


type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const Heading = ({ level = 1, children, className = '', ...props }: HeadingProps) => {
  const Tag = (`h${level}` as React.ElementType);
  const base =
    'font-extrabold text-[#0a1e0a] dark:text-white tracking-tight';
  const sizes = [
    'text-4xl md:text-5xl',
    'text-3xl md:text-4xl',
    'text-2xl md:text-3xl',
    'text-xl md:text-2xl',
    'text-lg md:text-xl',
    'text-base md:text-lg',
  ];
  return (
    <Tag className={`${base} ${sizes[(level ?? 1) - 1] || sizes[5]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

type BodyProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const Body = ({ children, className = '', ...props }: BodyProps) => (
  <p className={`text-lg text-[#0a1e0a] dark:text-white ${className}`} {...props}>
    {children}
  </p>
);
