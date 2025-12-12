'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RitualsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {/* Full screen for rituals - no nav */}
      <div className="fixed inset-0 flex items-center justify-center bg-[#1F1D24]">
        <div className="w-full max-w-[420px] h-[100dvh] sm:h-[90vh] sm:rounded-[48px] sm:shadow-2xl sm:border-[8px] sm:border-white relative overflow-hidden">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
