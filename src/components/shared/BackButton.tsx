'use client';

import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  dark?: boolean;
}

export default function BackButton({ onClick, dark = false }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 z-20 ${
        dark
          ? 'bg-[#E8E6E3]/10 text-[#E8E6E3] hover:bg-[#E8E6E3]/20'
          : 'bg-[var(--glass-bg-regular)] text-[var(--text-main)] border border-[var(--glass-border)] shadow-sm'
      }`}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  );
}
