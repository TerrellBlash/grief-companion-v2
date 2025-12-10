'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import FloatingNav from '@/components/shared/FloatingNav';

interface MobileAppShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

export default function MobileAppShell({ children, hideNav = false }: MobileAppShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [pathname]);

  // Determine if nav should be hidden based on route
  const shouldHideNav = hideNav || pathname?.includes('/rituals/candle') || pathname?.includes('/settings');

  return (
    <div
      className="w-full max-w-[420px] mx-auto h-[100dvh] bg-[var(--bg-main)] relative overflow-hidden flex flex-col font-sans transition-colors duration-500"
    >
      {/* Scrollable Content Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-0"
      >
        {children}
      </div>

      {/* Floating Navigation */}
      <div className={`absolute bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none transition-transform duration-500 ${
        shouldHideNav ? 'translate-y-32' : 'translate-y-0'
      }`}>
        <FloatingNav />
      </div>

      {/* Bottom Gradient Fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-main)] to-transparent pointer-events-none z-10 transition-opacity ${
        shouldHideNav ? 'opacity-0' : 'opacity-100'
      }`} />
    </div>
  );
}
