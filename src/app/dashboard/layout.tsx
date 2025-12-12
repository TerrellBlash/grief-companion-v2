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
      {/* Full screen container - centers the phone frame */}
      <div className="fixed inset-0 w-full h-full bg-[#F5F2ED] flex items-center justify-center">
        {/* Phone frame - EXACT Aura.build structure */}
        <div
          data-theme="light"
          className="w-full max-w-[420px] h-[100dvh] bg-[var(--bg-main)] sm:h-[90vh] sm:rounded-[48px] sm:shadow-2xl sm:border-[8px] sm:border-white relative overflow-hidden flex flex-col font-sans ring-1 ring-black/5 transition-colors duration-500"
        >
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-0">
            {children}
          </div>

          {/* Floating nav - EXACT Aura.build position: bottom-8 */}
          <div
            className={`absolute bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none transition-transform duration-500 ${hideNav ? 'translate-y-32' : 'translate-y-0'}`}
          >
            <FloatingNav />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
