'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import FloatingNav from '@/components/shared/FloatingNav';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide nav on candle ritual and settings
  const hideNav = pathname?.includes('/rituals') || pathname?.includes('/settings');

  return (
    <ThemeProvider>
      {/* App Container */}
      <div className="w-full max-w-[420px] mx-auto h-[100dvh] bg-[var(--bg-main)] relative overflow-hidden flex flex-col transition-colors duration-500">

        {/* Content Area - THIS SCROLLS */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-0">
          {children}
        </div>

        {/* Navigation */}
        {!hideNav && (
          <>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none">
              <FloatingNav />
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-main)] to-transparent pointer-events-none z-10" />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
