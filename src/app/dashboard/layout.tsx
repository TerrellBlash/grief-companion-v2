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

  // Hide nav on these screens (matching Aura.build)
  const hideNav = pathname?.includes('/rituals') ||
                  pathname?.includes('/settings') ||
                  pathname?.includes('/memories/create') ||
                  pathname?.includes('/streak') ||
                  pathname?.includes('/community');

  return (
    <ThemeProvider>
      {/* Full screen container */}
      <div className="fixed inset-0 w-full h-full bg-[#F5F2ED] flex items-center justify-center">
        {/* Phone frame - max 420px on mobile, centered */}
        <div className="relative w-full h-full max-w-[420px] bg-[#F5F2ED] overflow-hidden">

          {/* Scrollable content area - MUST have padding bottom for nav */}
          <main className="absolute inset-0 overflow-y-auto overflow-x-hidden overscroll-none">
            {children}
          </main>

          {/* Floating nav - ABSOLUTELY positioned at bottom */}
          {!hideNav && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none px-4">
              <FloatingNav />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
