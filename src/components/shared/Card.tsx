'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: string;
}

export default function Card({ children, onClick, className = '', delay = '' }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-regular rounded-[32px] p-5 relative overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A85846]/10 active:scale-[0.98] animate-enter ${delay} ${className}`}
    >
      {children}
    </div>
  );
}
