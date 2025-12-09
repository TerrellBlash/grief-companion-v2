'use client';

import { Flame, X } from 'lucide-react';

interface NudgeBannerProps {
  onDismiss: () => void;
}

export default function NudgeBanner({ onDismiss }: NudgeBannerProps) {
  return (
    <div className="mx-5 mb-6 glass-thin border-l-4 border-l-[#DE9C52] p-4 rounded-r-[16px] rounded-l-[4px] relative animate-enter shadow-sm flex items-start gap-3">
      <div className="min-w-[24px] pt-0.5 text-[#A85846]">
        <Flame className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="font-serif text-[var(--text-main)] text-lg leading-tight mb-1">
          Your space is here whenever you need it.
        </p>
        <p className="text-[var(--text-muted)] text-xs">
          Tomorrow marks one year since Mom's passing.
        </p>
      </div>
      <button onClick={onDismiss} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
