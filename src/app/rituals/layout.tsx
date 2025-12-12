'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RitualsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {/*
        Mobile: Full screen edge-to-edge dark mode
        Desktop (sm:): Centered phone preview with frame
      */}
      <div className="h-[100dvh] w-full bg-black/90 sm:min-h-screen sm:flex sm:items-center sm:justify-center">
        <div className="h-full w-full sm:flex sm:w-full sm:justify-center">
          {/* Phone frame - NO border on mobile, only on sm: (desktop preview) */}
          <div className="w-full h-full bg-[#1F1D24] sm:max-w-[420px] sm:h-[90vh] sm:rounded-[48px] sm:shadow-2xl sm:border-[8px] sm:border-white relative overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
