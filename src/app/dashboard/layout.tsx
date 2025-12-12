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

  // Hide nav on these screens (matching Aura.build exactly)
  const hideNav = pathname?.includes('/rituals') ||
                  pathname?.includes('/settings') ||
                  pathname?.includes('/memories/create') ||
                  pathname?.includes('/streak') ||
                  pathname?.includes('/community');

  return (
    <ThemeProvider>
      {/*
        Mobile: Full screen edge-to-edge, no frame
        Desktop (sm:): Centered phone preview with frame
      */}
      <div className="h-[100dvh] w-full sm:min-h-screen sm:flex sm:items-center sm:justify-center selection:bg-[var(--color-amber)]/30 selection:text-[var(--text-main)]">
        <div className="h-full w-full sm:flex sm:w-full sm:justify-center">
          {/* Phone frame container */}
          <div
            data-theme="light"
            className="w-full h-full bg-[var(--bg-main)] sm:max-w-[420px] sm:h-[90vh] sm:rounded-[48px] sm:shadow-2xl sm:border-[8px] sm:border-white relative overflow-hidden flex flex-col font-sans sm:ring-1 sm:ring-black/5 transition-colors duration-500"
          >
            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-0">
              {children}
            </div>

            {/* Floating nav - positioned at bottom */}
            <div
              className={`absolute bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none transition-transform duration-500 ${hideNav ? 'translate-y-32' : 'translate-y-0'}`}
            >
              <FloatingNav />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
