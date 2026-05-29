import React from 'react';
import { colors } from './colors';


type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  as?: 'button' | 'a';
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  children,
  variant = 'primary',
  className = '',
  as = 'button',
  href,
  ...props
}: ButtonProps) {
  let base =
    'px-8 py-3 rounded-full font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variants = {
    primary: `bg-[${colors.secondary}] text-white hover:bg-[#a68a2a]`,
    secondary: `bg-white text-[${colors.primary}] border border-[${colors.secondary}] hover:bg-[${colors.secondary}] hover:text-white`,
    outline: `bg-transparent text-[${colors.primary}] border border-[${colors.secondary}] hover:bg-[${colors.secondary}] hover:text-white`,
  };
  if (as === 'a' && href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
