'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RitualsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {/* EXACT Aura.build structure for rituals - dark background, no nav */}
      <div className="flex items-center justify-center min-h-screen bg-black/90">
        <div className="flex w-full justify-center">
          {/* Phone frame - NO border on mobile, only on sm: (desktop preview) */}
          <div className="w-full max-w-[420px] h-[100dvh] bg-[#1F1D24] sm:h-[90vh] sm:rounded-[48px] sm:shadow-2xl sm:border-[8px] sm:border-white relative overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
